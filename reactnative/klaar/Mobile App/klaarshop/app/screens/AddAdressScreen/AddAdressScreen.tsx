import React, { memo, FC, useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { createStyle } from "../CartScreen/CartScreenStyles";
import { useThemeContext } from "~/ui/theme";
import { useTranslation } from "react-i18next";
import { OurDropdown } from "~/ui/components/OurDropdown";
import { TextInput } from "~/ui/components/TextInput";
import { Button } from "~/ui/components/Button";
import { colors } from "~/ui/theme/default/colors";
import { Navigation } from "react-native-navigation";
import { navigationService } from "../NavigationService";
import { Header } from "~/ui/components/Header";
import { useDispatch, useSelector } from "react-redux";
import { ProfileActions } from "~/logic/profile/ProfileRedux";
import { profileSelector } from "~/logic/profile/ProfileSelectors";
import { TextField } from "react-native-material-textfield";
import { Preloader } from "~/ui/components/Preloader/Preloader";
import { ProductDataPayload } from "~/logic/product/ProductRedux";

export type AddAdressProps = {
  payload: ProductDataPayload;
};

const AddAdressScreen: FC<AddAdressProps> = ({ payload }) => {
  const { s } = useThemeContext(createStyle);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    deliveryAddresses: { data: delAdrData, fetching: delAdrFetching },
  } = useSelector(profileSelector);

  const [city, setCity] = useState(``);
  const [region, setRegion] = useState(``);
  const [street, setStreet] = useState(``);
  const [houseNum, setHouseNum] = useState(``);
  const [appart, setAppart] = useState(``);
  const [index, setIndex] = useState(``);
  const [townData, setTownData] = useState([
    { value: "New York", label: "New York" },
    { value: "Washington", label: "Washington" },
    { value: "Chicago", label: "Chicago" }
  ]);
  const [regionData, setRegionData] = useState([
    { value: "New York", label: "New York" },
    { value: "Ohio", label: "Ohio" },
    { value: "Kansas", label: "Kansas" },
  ]);

  const streetRef = useRef<TextField>(null);
  const houseNumRef = useRef<TextField>(null);
  const appartRef = useRef<TextField>(null);
  const indexRef = useRef<TextField>(null);

  const allValidation =
    city &&
    region &&
    street &&
    houseNum &&
    appart &&
    index.length > 5;

  useEffect(() => {
    if (delAdrData && !allValidation && delAdrData.deliveryAddresses) {
      if (delAdrData.deliveryAddresses.length > 0) {
        setCity(delAdrData?.deliveryAddresses[0].city);
        setRegion(delAdrData?.deliveryAddresses[0].region);
        setStreet(delAdrData?.deliveryAddresses[0].street);
        setHouseNum(delAdrData?.deliveryAddresses[0].houseNumber);
        setAppart(delAdrData?.deliveryAddresses[0].squareNumberOrOffice);
        setIndex(delAdrData?.deliveryAddresses[0].mailIndex);

        streetRef.current?.setValue(delAdrData?.deliveryAddresses[0].street);
        houseNumRef.current?.setValue(
          delAdrData?.deliveryAddresses[0].houseNumber
        );
        appartRef.current?.setValue(
          delAdrData?.deliveryAddresses[0].squareNumberOrOffice
        );
        indexRef.current?.setValue(delAdrData?.deliveryAddresses[0].mailIndex);
      }
    }
  }, [delAdrData]);

  if (!delAdrData && !delAdrFetching) {
    dispatch(ProfileActions.deliveryAddresses.request());
  }

  const onSaveAdressPress = () => {
    if (allValidation) {
      const address = {
        index: "0",
        region,
        city,
        street,
        houseNumber: houseNum,
        squareNumberOrOffice: appart,
        mailIndex: index,
      };

      dispatch(ProfileActions.addOrChangeDeliveryAddress.request(address));
      dispatch(ProfileActions.deliveryAddresses.request());

      if (payload) {
        Navigation.push(navigationService.getCurrentScreenId(), {
          component: {
            name: "AddProductScreen",
            passProps: { payload: { ...payload, pickupAddress: address } },
            options: { animations: { push: { enabled: true } } },
          },
        });
      }
    }
  };

  const backFunc = () => Navigation.pop(navigationService.getCurrentScreenId());

  return (
    <View style={[s?.flexGrow]}>
      <Header
        onPressBack={() => backFunc()}
        bgColor={colors.transparent}
        headerTitle={t(`profile.deliveryAddress`)}
        headerLeft={"arrow"}
      />
      {delAdrFetching ? (
        <Preloader />
      ) : (
        <KeyboardAvoidingView
          style={s?.inputsContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={60}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, justifyContent: `flex-end` }}>
              <View style={[s?.inputMargin, s?.inputWidth, { zIndex: 4 }]}>
                <OurDropdown
                  inputLabel={t("profile.town")}
                  required={true}
                  value={city}
                  setValue={setCity}
                  data={townData}
                  setItems={setTownData}
                  bgColor={"#fff"}
                  validationOk={true}
                />
              </View>
              <View style={[s?.inputMargin, s?.inputWidth, { zIndex: 3 }]}>
                <OurDropdown
                  inputLabel={t("profile.region")}
                  required={true}
                  value={region}
                  setValue={setRegion}
                  data={regionData}
                  setItems={setRegionData}
                  bgColor={"#fff"}
                  validationOk={true}
                />
              </View>
              <View style={[s?.inputMargin, s?.inputWidth]}>
                <TextInput
                  value={street}
                  inputLabel={t("profile.street")}
                  ref={streetRef}
                  validationOk={!!street}
                  required
                  onChangeText={(text) => setStreet(text)}
                />
              </View>
              <View style={[s?.inputMargin, s?.inputWidth]}>
                <TextInput
                  ref={houseNumRef}
                  value={houseNum}
                  validationOk={!!houseNum}
                  inputLabel={t("profile.houseNumber")}
                  required
                  onChangeText={(text) => setHouseNum(text)}
                />
              </View>
              <View style={[s?.inputMargin, s?.inputWidth]}>
                <TextInput
                  ref={appartRef}
                  validationOk={!!appart}
                  value={appart}
                  inputLabel={t("profile.ap")}
                  required
                  onChangeText={(text) => setAppart(text)}
                />
              </View>
              <View style={[s?.inputMargin, s?.inputWidth]}>
                <TextInput
                  ref={indexRef}
                  validationOk={index.length > 5}
                  value={index}
                  inputLabel={t("profile.postcode")}
                  required
                  onChangeText={(text) => setIndex(text)}
                />
              </View>

              <View style={[s?.alignItemsCenter, s?.marginTopx4]}>
                <View style={s?.buttonContainer}>
                  <Button
                    onPress={onSaveAdressPress}
                    title={t("buttons.save")}
                    disabled={!allValidation}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const MemorizedComponent = memo(AddAdressScreen);
export { MemorizedComponent as AddAdressScreen };
