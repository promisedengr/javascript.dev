import _ from "lodash";
import * as React from "react";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Navigation } from "react-native-navigation";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "~/Hooks/useInputs";
import { usePhotoBoxes } from "~/Hooks/usePhotoBoxes";
import { useSelect } from "~/Hooks/useSelect";
import { showError, showDialogWithCallBack, showSuccessWithCallback } from "~/logic/AlertService/AlertService";
import { CategoriesReducerActions } from "~/logic/categories/categories/CategoriesRedux";
import { categoriesSelector } from "~/logic/categories/categories/CategoriesSelectors";
import { productSelector } from "~/logic/product/ProductSelectors";
import { ProductType, ProfileActions } from "~/logic/profile/ProfileRedux";
import { profileSelector } from "~/logic/profile/ProfileSelectors";
import { UserActions } from "~/logic/user/UserRedux";
import { BoxDescription } from "~/ui/components/BoxDescription";
import { Button } from "~/ui/components/Button/Button";
import { DeliveryPicker } from "~/ui/components/DeliveryPicker";
import { Header } from "~/ui/components/Header";
import { OurDropdown } from "~/ui/components/OurDropdown";
import { Preloader } from "~/ui/components/Preloader/Preloader";
import { ProductsPhotoBox } from "~/ui/components/ProductsPhotoBox";
import { SizePicker } from "~/ui/components/SizePicker";
import { ColorPicker } from '~/ui/components/ColorPicker';
import { TextInput } from "~/ui/components/TextInput";
import { defineCurrency } from "~/ui/renderHelpers/defineCurrency";
import { Theme, useThemeContext } from "~/ui/theme";
import { colors } from "~/ui/theme/default/colors";
import { metrics } from "~/ui/theme/default/metrics";
import { navigationService } from "../NavigationService";
import { CustomButton } from '~/ui/components/CustomButton';
import { theme } from '~/ui/theme/default/theme';

import {
  validateCategory,
  validateCurrency,
  validateDescriptionProduct,
  validateNameProduct,
  validatePrice,
} from "~/logic/product/validationHelper";
import {
  productActions,
  ProductDataPayload,
} from "~/logic/product/ProductRedux";
import GeoTag from "~/ui/components/DeliveryPicker/assets/geotag";
import RussianPost from "~/ui/components/DeliveryPicker/assets/russianPost";
import DeleteIcon from './assets/delete';

const { width: w, height: h } = Dimensions.get("window");

export type AddProductScreenProps =
  | (ProductType & {
    productId: string;
    componentId?: string;
    rootTag?: number;
    payload?: ProductDataPayload;
  })
  | undefined;

const AddProductScreen: React.FC<AddProductScreenProps> = (props?) => {

  const { componentId, rootTag, payload = undefined, ...restProps } = props;
  const isProps = !_.isEmpty(restProps);

  const { s } = useThemeContext(createStyle);
  const { t } = useTranslation();

  const NOT_SELECTED = t('notSelected');

  const dispatch = useDispatch();
  const [allowDPDAlert, setAllowDPDAlert] = useState<boolean>(false);
  const [categ, setCateg] = useState<string>(NOT_SELECTED)
  const [currency, setCurrency] = useState<string>(NOT_SELECTED);
  const [subcateg, setSubcateg] = useState<string>(NOT_SELECTED);
  const [currencyDropdown, setCurrencyDropdown] = useState([
    {
      label: defineCurrency(`rub`),
      value: "rub",
    },
    {
      label: defineCurrency(`usd`),
      value: "usd",
    },
  ]);

  const {
    add_product: {
      fetching: addProductFetching,
      error: addProductError,
    },
    addPhoto: {
      fetching: addPhotoFetching,
      error: addPhotoError,
    },
    editProduct: {
      fetching: editProductFetching
    },
    deleteProduct: {
      data: deleteProductData,
      fetching: deleteProductFetching,
      error: deleteProductError
    }
  } = useSelector(productSelector);

  const {
    deliveryAddresses: {
      data: delieveryAdressData,
      fetching: delieveryAdressFetching,
    },
    addOrChangeDeliveryAddress: {
      fetching: addOrChangeDelAddrFetching
    },
    getSelfProfile: {
      data: selfProfileData
    },
  } = useSelector(profileSelector);

  const {
    getCategoriesList: {
      data: categoriesData,
      fetching: categoriesFetching
    },
  } = useSelector(categoriesSelector);

  const [categoriesDropDown, setCategoriesDropDown] = useState();
  const [subCategoriesDropDown, setSubCategoriesDropDown] = useState([]);

  useEffect(() => {
    const a = categoriesData?.categories?.map((c) => {
      return { label: c.name, value: c.name };
    });
    setCategoriesDropDown(a);
  }, [categoriesData]);

  useEffect(() => {
    if (categoriesData?.categories && categ !== NOT_SELECTED) {
      for (let c of categoriesData.categories)
        if (c.name === categ) {
          let subCategoryData = c.subcategories.map((d) => ({ label: d, value: d }));
          setSubCategoriesDropDown(subCategoryData);
          setRequiredColors(c.requiredFields.colors);
          setRequiredSizes(c.requiredFields.sizes);
          break;
        }
    }
  }, [categ]);

  const loading = addPhotoFetching || addProductFetching;

  useEffect(() => {
    if (!addProductError?.fields && addProductError?.description)
      showError(addProductError.description);
  }, [addProductError]);

  useEffect(() => {
    if (deleteProductError?.description) {
      showError(deleteProductError.description);
      setAllowDPDAlert(false);
    }
  }, [deleteProductError]);

  useEffect(() => {
    if (allowDPDAlert) {
      showSuccessWithCallback('Product deleted!', () => {
        onPressBack();
      })
      setAllowDPDAlert(false);
    }
  }, [deleteProductData]);

  useEffect(() => {
    if (!addOrChangeDelAddrFetching)
      dispatch(ProfileActions.deliveryAddresses.request());
  }, [addOrChangeDelAddrFetching]);

  useEffect(() => {
    if (selfProfileData?.role === `buyer`) {
      showError(t(`errors.uNeedToBeSeller`), t(`errors.role`), () => {
        Navigation.setStackRoot(navigationService.getCurrentScreenId(), [
          {
            component: {
              name: "MainScreen",
            },
          },
          {
            component: {
              name: "PersonalDataScreen",
            },
          },
        ]);
        dispatch(UserActions.mainScreenRoute(`profile`));
      });
    }
    if (!categoriesFetching)
      dispatch(CategoriesReducerActions.getCategoriesList.request({ index: `0` }));

    return () => {
      dispatch(productActions.add_product.success(undefined));
      dispatch(productActions.addPhoto.success(undefined));
    };
  }, []);

  const deliveryTypesInitial = [
    {
      picked: false,
      id: "1",
      value: "ruPost",
      title: t("addProduct.Post"),
      icon: <RussianPost />,
    },
    {
      picked: false,
      id: "3",
      value: "pickup",
      title: t("addProduct.pickup"),
      icon: <GeoTag />,
    },
  ];

  const sizesDataInitial = [
    { value: "35", picked: false, id: "0" },
    { value: "36", picked: false, id: "1" },
    { value: "37", picked: false, id: "2" },
    { value: "38", picked: false, id: "3" },
    { value: "39", picked: false, id: "4" },
    { value: "40", picked: false, id: "5" },
    { value: "41", picked: false, id: "6" },
    { value: "42", picked: false, id: "7" },
    { value: "43", picked: false, id: "8" },
    { value: "44", picked: false, id: "9" },
  ];

  const sizesData = isProps
    ? sizesDataInitial.map((s) =>
      props.sizes.includes(+s.value) ? { ...s, picked: true } : s
    )
    : payload
      ? sizesDataInitial.map((s) =>
        payload.sizes?.includes(+s.value) ? { ...s, picked: true } : s
      )
      : sizesDataInitial;

  const deliveryTypes = isProps
    ? deliveryTypesInitial.map((d) =>
      d.value === `ruPost`
        ? { ...d, picked: props.deliveryMethods.ruPost }
        : { ...d, picked: props.deliveryMethods.pickup }
    )
    : payload
      ? deliveryTypesInitial.map((d) =>
        d.value === `ruPost`
          ? { ...d, picked: payload.deliveryMethods.ruPost }
          : { ...d, picked: payload.deliveryMethods.pickup }
      )
      : deliveryTypesInitial;

  const sizes = useSelect(sizesData);
  const delivery = useSelect(deliveryTypes);

  const sizeArr = sizes.array.filter((item: any) => item.picked === true);
  const deliveryArr = delivery.array.filter(
    (item: any) => item.picked === true
  );

  const [hideErrors, setHideErrors] = useState(true);

  const [photoToDelete, setphotoToDelete] = useState<number[]>([]);
  const [colorToDelete, setcolorToDelete] = useState<number[]>([]);

  const initialName = isProps ? restProps.name : payload ? payload.name : "";
  const initialDescription = isProps ? restProps.description : payload ? payload.description : "";
  const initialPrice = isProps ? `${restProps.price}` : payload ? `${payload.price}` : "";

  const name = useInput(initialName);
  const description = useInput(initialDescription);
  const price = useInput(initialPrice);

  const [requiredColors, setRequiredColors] = useState(false);
  const [requiredSizes, setRequiredSizes] = useState(false);

  const allPhotos = isProps ? props.photos : [];
  const productsBoxes = usePhotoBoxes(allPhotos);
  const colorPhoto = isProps ? props.colors!.map((c) => c.photo) : [];
  const colorsBoxes = usePhotoBoxes(colorPhoto);

  let allValidation =
    validateNameProduct(name.value) &&
    validateDescriptionProduct(description.value) &&
    validateCategory(categ === NOT_SELECTED ? `Not selected` : categ) &&
    validateCategory(subcateg === NOT_SELECTED ? `Not selected` : subcateg) &&
    validatePrice(price.value) &&
    deliveryArr.length > 0 &&
    validateCurrency(currency);

  const handleAddProduct = () => {
    setHideErrors(false);

    if (allValidation && delieveryAdressData) {
      let categoryId: string | undefined;

      categoriesData?.categories.map((c) => {
        if (c.name === categ)
          categoryId = c._id;
      });

      const deliveryMethods = {
        ruPost: false,
        pickup: false,
      };

      for (let i = 0; i < deliveryArr.length; i++) {
        if (deliveryArr[i].value === `pickup`)
          deliveryMethods.pickup = true;

        if (deliveryArr[i].value === `ruPost`)
          deliveryMethods.ruPost = true;
      }

      const pickupAddress =
        deliveryMethods.pickup &&
          delieveryAdressData.deliveryAddresses.length > 0
          ? delieveryAdressData.deliveryAddresses[0]
          : undefined;

      const payload = {
        name: name.value,
        description: description.value,
        category: categoryId ?? ``,
        subcategory: subcateg,
        sizes: sizeArr.map((item: any) => Number(item.value)),
        deliveryMethods,
        pickupAddress,
        currency: currency,
        price: +price.value,
      };

      if (payload.sizes.length === 0)
        delete payload.sizes;

      if (deliveryMethods.pickup && delieveryAdressData.deliveryAddresses.length === 0) {
        Navigation.push(navigationService.getCurrentScreenId(), {
          component: {
            name: "AddAdressScreen",
            passProps: { payload },
            options: {
              animations: { push: { enabled: true } },
            },
          },
        });
      } else {
        if (isProps && props.productId) {
          dispatch(
            productActions.editProduct.request({
              ...payload,
              productId: props.productId,
            })
          );

          const notToDeletePhoto = [] as number[];

          for (let idx = 0; idx < productsBoxes.boxes.length; idx++) {
            const d = productsBoxes.boxes[idx];

            if (d.photo && !(d.photo.includes(`http://`) || d.photo.includes(`https://`)) && !photoToDelete.includes(d.num)) {
              dispatch(
                productActions.addPhoto.request({
                  mimeType: "image/jpeg",
                  productId: props.productId,
                  data: d.photo,
                  index: `${idx}`,
                })
              );
              notToDeletePhoto.push(idx + 1);
            } else if (photoToDelete.includes(d.num) && !notToDeletePhoto.includes(d.num) && !d.photo) {
              dispatch(
                productActions.deletePhoto.request({
                  productId: props.productId,
                  index: `${d.num - 1}`,
                })
              );
            }
          }

          const notToDeleteColor = [] as number[];

          for (let idx = 0; idx < colorsBoxes.boxes.length; idx++) {
            const d = colorsBoxes.boxes[idx];

            if (d.photo && !(d.photo.includes(`http://`) || d.photo.includes(`https://`)) && !colorToDelete.includes(d.num)) {
              dispatch(
                productActions.setColor.request({
                  mimeType: "image/jpeg",
                  productId: props.productId,
                  data: d.photo,
                  index: `${idx}`,
                  colorName: `example`,
                })
              );
              notToDeleteColor.push(idx + 1);
            } else if (colorToDelete.includes(d.num) && !notToDeleteColor.includes(d.num) && !d.photo) {
              dispatch(
                productActions.unSetColor.request({
                  productId: props.productId,
                  index: `${d.num - 1}`,
                })
              );
            }
          }
        } else {
          const colors = colorsBoxes.boxes.map((d, idx) => ({
            mimeType: `image/jpeg` as const,
            data: d.photo,
            index: `${idx}`,
            colorName: `example`,
          }));

          const photos = productsBoxes.boxes.map((d, idx) => ({
            mimeType: `image/jpeg` as const,
            data: d.photo,
            index: `${idx}`,
          }));

          dispatch(productActions.add_product.request({ ...payload, photos, colors }));
        }
      }
    }
  };

  const onPressBack = () => {
    if (isProps || payload) {
      Navigation.pop(navigationService.getCurrentScreenId());
      dispatch(ProfileActions.getSelfProducts.request({ index: "0" }));
    } else {
      dispatch(UserActions.mainScreenRoute(`home`));
    }
  };

  const onAddPhoto = (items: { photo: string; role: string; num: number }[], index: number) => {
    productsBoxes.handlerAddPhoto(items, index);
  };

  const onDeletePhoto = (items: { photo: string; role: string; num: number }[], index: number) => {
    setphotoToDelete([...photoToDelete, index]);
    productsBoxes.handlerDeletePhoto(items, index);
  };

  const onColorDelete = (items: { photo: string; role: string; num: number }[], index: number) => {
    setcolorToDelete([...photoToDelete, index]);
    colorsBoxes.handlerDeletePhoto(items, index);
  };

  const onPricePress = (text: string) => price.handleChange(text);

  const handleDeleteProduct = () => {
    let idToDelete = props._id;
    showDialogWithCallBack('Are you sure you want to delete this product?',
      () => {
        setAllowDPDAlert(true);
        dispatch(productActions.deleteProduct.request({ productId: idToDelete }));
      })
  }

  return (
    <View style={s?.container}>
      <Header
        headerLeft={"arrow"}
        onPressBack={onPressBack}
        headerTitle={isProps ? t(`addProduct.editProduct`) : t("addProduct.addProduct")}
        headerRight={
          isProps &&
          <View style={s?.deleteBtnContainer}>
            <CustomButton
              onPress={() => handleDeleteProduct()}
              spinner={deleteProductFetching}
              spinnerSize={'small'}
              spinnerColor={theme.colors.black}
              icon={<DeleteIcon />}
            />
          </View>
        }
      />
      {addProductFetching || delieveryAdressFetching || editProductFetching ? (
        <Preloader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} >
          <BoxDescription
            title={t("addProduct.changePhoto")}
            marginTop={26}
            marginBottom={metrics.x4}
          />
          <ProductsPhotoBox
            items={productsBoxes.boxes}
            addPhoto={onAddPhoto}
            deletePhoto={onDeletePhoto}
          />
          <View style={s?.componentContainer}>
            <TextInput
              inputLabel={t("addProduct.productsTitle")}
              value={name.value}
              required
              validationOk={validateNameProduct(name.value) || hideErrors}
              errorMsg={t("errors.correctData")}
              onChangeText={name.handleChange}
            />
          </View>
          <View style={[s?.componentContainer, { zIndex: 4, elevation: 1 }]}>
            <OurDropdown
              inputLabel={t("addProduct.categories")}
              required
              validationOk={true}
              value={categ}
              setValue={setCateg}
              data={categoriesDropDown}
              setItems={setCategoriesDropDown}
            />
          </View>
          {categ !== NOT_SELECTED &&
            <View style={[s?.componentContainer, { zIndex: 3 }]}>
              <OurDropdown
                inputLabel={t("addProduct.subcategories")}
                value={subcateg} // t()`toolbar.${categ}.${subcateg}`
                setValue={setSubcateg}
                data={subCategoriesDropDown}
                setItems={setSubCategoriesDropDown}
              />
            </View>
          }

          <View style={[s?.componentContainer, { zIndex: 2 }]}>
            <TextInput
              inputLabel={t("addProduct.description")}
              value={description.value}
              multiline={true}
              maxSymbols={1024}
              required
              errorMsg={t("errors.correctData")}
              validationOk={validateDescriptionProduct(description.value) || hideErrors}
              bgColor={colors.white}
              unactiveColor={colors.lightGray}
              onChangeText={description.handleChange}
            />
          </View>
          <View style={[s?.shortInputsBox, { zIndex: 1 }]}>
            <View style={s?.shortInput}>
              <TextInput
                keyboardType={`number-pad`}
                inputLabel={t("addProduct.price")}
                value={price.value}
                bgColor={colors.white}
                required
                errorMsg={t("errors.correctData")}
                validationOk={validatePrice(price.value)}
                onChangeText={onPricePress}
              />
            </View>
            <View style={[s?.shortInput]}>
              <OurDropdown
                inputLabel={t("addProduct.currency")}
                required
                value={currency}
                setValue={setCurrency}
                data={currencyDropdown}
                setItems={setCurrencyDropdown}
              />
            </View>
          </View>

          {(requiredColors) && (
            <>
              <BoxDescription
                title={t("addProduct.loadColor")}
                marginTop={metrics.x4}
                marginBottom={metrics.x4}
              />
              <ProductsPhotoBox
                items={colorsBoxes.boxes}
                addPhoto={colorsBoxes.handlerAddPhoto}
                deletePhoto={onColorDelete}
              />
            </>
          )}

          {requiredSizes && (
            <>
              <BoxDescription
                title={t("addProduct.size")}
                marginBottom={metrics.x4}
              />
              <SizePicker items={sizes.array} onItemSelect={sizes.select} />
            </>
          )}
          {/* {requiredColors && 
            // <ColorPicker items={}/>

          } */}
          <BoxDescription
            title={t("addProduct.delivery")}
            marginTop={metrics.x3}
            marginBottom={metrics.x2}
          />
          {delivery.array.map((item: any) => {
            return (
              <DeliveryPicker
                key={item.id}
                value={item.picked}
                reset={() => delivery.select(item.id)}
                title={item.title}
                // description={t("addProduct.fromPrice")}
                icon={item.icon}
              />
            );
          })}
          <Button
            onPress={handleAddProduct}
            title={t("buttons.save")}
            spinner={addProductFetching}
            color={colors.mainBlue}
            disabled={!allValidation || loading}
          />
        </ScrollView>
      )}
    </View>
  );
};

const MAddProductScreen = memo(AddProductScreen);
export { MAddProductScreen as AddProductScreen };

const createStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    shortInputsBox: {
      width: "100%",
      marginVertical: h * 0.02,
      paddingHorizontal: w * 0.04,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    componentContainer: {
      width: "100%",
      marginVertical: h * 0.02,
      paddingHorizontal: w * 0.04,
    },
    shortInput: {
      width: w * 0.44,
    },
    addCityText: {
      color: theme.colors.lightOrange,
      letterSpacing: -0.3,
      marginLeft: metrics.x4,
      marginVertical: h * 0.02,
    },
    absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    center: {
      justifyContent: `center`,
      alignItems: `center`,
      flex: 1,
    },
    deleteBtnContainer: {
      width: theme.metrics.x6,
      height: theme.metrics.x6
    }
  });