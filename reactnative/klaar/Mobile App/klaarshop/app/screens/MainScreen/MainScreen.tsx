import React, {
  useState,
  FC,
  useEffect,
  memo,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Navigation } from "react-native-navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { CartActions } from "~/logic/cart/CartRedux";
import { cartSelector } from "~/logic/cart/CartSelectors";
import { CategoriesReducerActions } from "~/logic/categories/categories/CategoriesRedux";
import { categoriesSelector } from "~/logic/categories/categories/CategoriesSelectors";
import { ChatActions, MessageT } from "~/logic/chats/ChatsRedux";
import { chatSelector } from "~/logic/chats/ChatsSelectors";
import {
  CurrencyT,
  productActions,
  ProductsSearchPayload,
} from "~/logic/product/ProductRedux";
import { productSelector } from "~/logic/product/ProductSelectors";
import { ProductType, ProfileActions } from "~/logic/profile/ProfileRedux";
import { profileSelector } from "~/logic/profile/ProfileSelectors";
import { UserActions } from "~/logic/user/UserRedux";
import { userSelector } from "~/logic/user/UserSelectors";
import { Header } from "~/ui/components/Header";
import { NavigationBar } from "~/ui/components/NavigationBar";
import { Preloader } from "~/ui/components/Preloader/Preloader";
import { ProductItem } from "~/ui/components/ProductItem";
import { SearchInput } from "~/ui/components/SearchInput";
import { defineCurrency } from "~/ui/renderHelpers/defineCurrency";
import { useThemeContext, Theme } from "~/ui/theme";
import { gradients } from "~/ui/theme/default/colors";
import { AddProductScreen } from "../AddProductScreen";
import { ClientProfileScreen } from "../ClientProfileScreen";
import { DialogScreen } from "../DialogScreen/DialogScreen";
import { navigationService } from "../NavigationService";
import { ProductsItemsScreen } from "../ProductsItemsScreen";
import CartIcon from "./assets/CartIcon";
import { ToolBar } from "./blocks/ToolBar";

export type CategoryT = {
  name: string;
  id: string;
};

interface Props { }

type MainScreenProps = {
  sellerId?: string;
};

export type RoutesT =
  | `home`
  | `sell`
  | `profile`
  | `notifications`
  | `search`
  | undefined;

type SysMessT = {
  message: `Successfully authenticated` | `Successfully connected to chats`;
  error: boolean;
};

type MessType = {
  chatId: string;
  message: MessageT;
};

type NewOrderT = {
  orderId: string;
  message: string;
};

const MainScreen: FC<MainScreenProps> = memo(({ sellerId = undefined }) => {
  const { s } = useThemeContext(createStyle);
  const dispatch = useDispatch();
  //const prevRoute = usePrevious<RoutesT>(route)

  const {
    getChatLogin: { data: chatLoginData, fetching: chatLoginFetching },
    usersInDialog,
    isSocketConnected,
  } = useSelector(chatSelector, shallowEqual);

  const {
    getSelfProfile: { fetching: selfProfileFetching },
  } = useSelector(profileSelector, shallowEqual);

  const { mainScreenRoute } = useSelector(userSelector, shallowEqual);

  const onSelect = useCallback(
    (route: RoutesT) => {
      dispatch(UserActions.mainScreenRoute(route));
    },
    [mainScreenRoute]
  );

  useEffect(() => {
    if (!chatLoginData && !isSocketConnected)
      dispatch(ChatActions.getChatLogin.request());
    dispatch(ProfileActions.getSelfProfile.request());
    dispatch(ProfileActions.deliveryAddresses.request());
  }, []);

  useEffect(() => {
    if (chatLoginData && usersInDialog && !isSocketConnected) {
      const connectionOptions = {
        reconnectionDelay: 5000,
        reconnectionDelayMax: 10000,
        path: `/chat/socket.io`,
        transports: [`websocket`],
      };

      const baseURL = `http://167.99.41.6`;

      const socket = io(baseURL, connectionOptions);

      socket.on(`connect`, () => {
        console.log(`Socket:`, socket.connected);
      });

      socket.io.on("reconnection_attempt", () => {
        console.log(`Reconnecting...`);
      });

      socket.on(`disconnect`, () => {
        console.log(`Socket:`, socket.connected);
      });

      const loginData = {
        userId: chatLoginData.userId,
        key: chatLoginData.key,
        checkUsersOnline: usersInDialog,
      };

      console.log(`loginData:`, loginData);

      socket.emit(`join`, loginData);

      socket.on("msg", (messageData: MessType) => {
        console.log(`messageData`, messageData);
        dispatch(ChatActions.addOnlineUser(messageData.message.fromUserId));
        dispatch(
          ChatActions.addToChatListMess({
            message: messageData.message,
            chatId: messageData.chatId,
          })
        );
        dispatch(ChatActions.addMessage(messageData.message));
      });

      socket.on("online", ({ userId }: { userId: string }) => {
        console.log(`Online: `, userId);
        dispatch(ChatActions.addOnlineUser(userId));
      });

      socket.on("offline", ({ userId }: { userId: string }) => {
        console.log(`Offline: `, userId);
        dispatch(ChatActions.deleteOnlineUser(userId));
      });

      socket.on("sysmsg", (arg: SysMessT) => {
        console.log(`sysmsg:`, arg);
        if (!arg.error && arg.message === `Successfully authenticated`) {
          dispatch(ChatActions.isSocketConnected(true));
        }
      });

      socket.on("newOrder", ({ orderId }: NewOrderT) => {
        console.log(`newOrder:`, orderId);
        dispatch(CartActions.payment({ lastOrderId: orderId }));
      });
    }
  }, [chatLoginData]);

  return (
    <>
      <LinearGradient style={{ flex: 1 }} colors={gradients.g3}>
        {selfProfileFetching || chatLoginFetching || !chatLoginData ? (
          <Preloader />
        ) : (
          <>
            {mainScreenRoute === `home` && <MainComponent />}
            {mainScreenRoute === `search` && <ProductsItemsScreen />}
            {mainScreenRoute === `sell` && <AddProductScreen />}
            {mainScreenRoute === `notifications` && (
              <DialogScreen sellerId={sellerId} />
            )}
            {mainScreenRoute === `profile` && <ClientProfileScreen />}
            <View style={s?.footer}>
              <NavigationBar route={mainScreenRoute} onSelect={onSelect} />
            </View>
          </>
        )}
      </LinearGradient>
    </>
  );
});

const MainComponent: FC<Props> = memo((props) => {
  const dispatch = useDispatch();

  const { s } = useThemeContext(createStyle);
  const { t } = useTranslation();
  const [filter, setFilter] = useState(``);
  const [loadMore, setLoadMore] = useState(false);
  const [itemsIndex, setItemsIndex] = useState(15);
  const [isMore, setisMore] = useState(true);
  const [localLoading, setlocalLoading] = useState(false);

  const mainCategory = t(`All`);

  const [category, setCategory] = useState<CategoryT>({
    name: mainCategory,
    id: ``,
  });

  const {
    productsSearch: { data: productsData, fetching: productsFetching },
  } = useSelector(productSelector, shallowEqual);

  const {
    getCategoriesList: { data: categoriesData, fetching: categoriesFetching },
  } = useSelector(categoriesSelector, shallowEqual);

  const {
    getCartList: { data: cartData, fetching: cartFetching },
  } = useSelector(cartSelector, shallowEqual);

  useEffect(() => {
    if (!productsFetching) {
      setlocalLoading(false);
    }
  }, [productsFetching]);

  if (!productsFetching && loadMore) {
    setLoadMore(false);
  }

  useEffect(() => {
    if (!categoriesFetching) {
      dispatch(CategoriesReducerActions.getCategoriesList.request({ index: `0` }));
    }
    if (!cartFetching) {
      dispatch(CartActions.getCartList.request());
    }
  }, []);

  const onRefresh = () => {
    if (!productsFetching) {
      setItemsIndex(0);
      const payload =
        {
          category: category.id,
          nameRegex: filter.toLowerCase(),
        } as ProductsSearchPayload;

      if (!category.id) delete payload.category;
      if (!filter) delete payload.nameRegex;
      dispatch(productActions.productsSearch.request(payload));
    }
  }

  useEffect(() => {
    onRefresh();
  }, [category]);

  const onFilterChange = (text: string) => {
    setFilter(text);

    setItemsIndex(0);
    const payload =
      {
        category: category.id,
        nameRegex: text.toLowerCase(),
      } as ProductsSearchPayload;

    if (!category.id) delete payload.category;
    if (!text) delete payload.nameRegex;
    dispatch(productActions.productsSearch.request(payload));
  };

  const onLoadMore = () => {
    setItemsIndex(itemsIndex + 15);

    const payload =
      {
        index: itemsIndex,
        category: category.id,
        nameRegex: filter,
        priceSort: 0,
      } as ProductsSearchPayload;

    if (!category.id) delete payload.category;
    if (!filter) delete payload.nameRegex;

    dispatch(productActions.productsSearch.request(payload));
  };

  const onIconPress = (category: CategoryT) => {
    setCategory(
      category.name === mainCategory ? { id: ``, name: mainCategory } : category
    );
    setlocalLoading(true);
  };

  const onCartPress = () => {
    Navigation.push(navigationService.getCurrentScreenId(), {
      component: {
        name: "CartScreen",
        passProps: {},
        options: {
          animations: {
            push: {
              enabled: true,
            },
          },
        },
      },
    });
  };

  const onMorePress = () => {
    setisMore(!isMore);
  };

  let categoriesArray =
    categoriesData && categoriesData.categories
      ? categoriesData.categories.map((c) => ({ name: c.name, id: c._id }))
      : [];
  categoriesArray = categoriesArray
    ? [{ name: mainCategory, id: `` }, ...categoriesArray]
    : [];

  const onPressFavorite = (productID: string, favorite: boolean) => {
    dispatch(
      productActions.subscribe.request({
        productId: productID,
        isFavorite: favorite,
        reducerName: `Products`,
      })
    );
  };

  const onSellerPress = (sellerId: string) => {
    Navigation.push(navigationService.getCurrentScreenId(), {
      component: {
        name: "SellerScreen",
        passProps: { sellerId },
        options: {
          animations: {
            push: {
              enabled: true,
            },
          },
        },
      },
    });
  };

  const onEndReached = () => {
    if (!loadMore && productsData!.products.length % 15 === 0 && isMore) {
      onLoadMore();
      setLoadMore(true);
    }
  };

  const onProductPress = useCallback((productId: string) => {
    dispatch(productActions.getProductById.request({ productId }));
    Navigation.push(navigationService.getCurrentScreenId(), {
      component: {
        name: "ProductInfoScreen",
        passProps: { reducerName: `Products` },
        options: {
          animations: {
            push: {
              enabled: true,
            },
          },
        },
      },
    });
  }, []);

  const renderItems = ({
    item,
    index,
  }: {
    item: ProductType;
    index: number;
  }) => {
    if (!isMore && category.name === t(`All`) && index > 1) {
      return null;
    }

    if (!item) {
      return null;
    }

    return (
      <>
        <View key={index} style={s?.itemContainer}>
          <ProductItem
            sellerId={item.seller._id}
            productID={item._id}
            productImage={{ uri: item.mainPhoto }}
            sellerImage={{ uri: item.seller.photo }}
            productRating={item.seller.rating}
            productFollowers={item.seller.numReviews}
            productCategory={item.category.name}
            productName={item.name}
            productColorsArray={item.colors}
            productPriceCurrency={defineCurrency(item.currency as CurrencyT)}
            productPriceDefault={`0`}
            productSizeMin={item.sizes[0]}
            productSizeMax={item.sizes[item.sizes.length - 1]}
            productPriceGroup={`${item.price}`}
            favorite={item.youSubscribed}
            onPressFavorite={onPressFavorite}
            //  newProduct={item.new}
            onItemSelect={onProductPress}
            youOwner={item.youOwner}
            onSellerPress={onSellerPress}
            isRequiredSizes={item.category.requiredFields.sizes}
            isRequiredColors={item.category.requiredFields.colors}
          />
        </View>
        {productsData &&
          productsData?.products.length % 2 !== 0 &&
          productsData.products.length - 1 === index ? (
          <View style={s?.itemContainer} />
        ) : null}
      </>
    );
  };

  const memoizeRenderItem = useMemo(() => renderItems, [isMore, productsData]);

  const footerLoader = (loading: boolean) =>
    loading ? (
      <View style={{ paddingVertical: 10 }}>
        <Preloader />
      </View>
    ) : productsData && productsData?.products.length % 15 === 0 ? (
      <View style={{ height: 50 }} />
    ) : null;

  return (
    <View style={s?.container}>
      <Header
        headerCenterWidth={`80%`}
        headerLeftWidth={`0%`}
        headerCenter={
          <SearchInput
            height={45}
            value={filter}
            onChangeText={onFilterChange}
          />
        }
        headerRight={
          <View style={s?.cartIconContainer}>
            <CartIcon
              onCartPress={onCartPress}
              count={cartData ? cartData.products.length : 0}
            />
          </View>
        }
        headerRightWidth={`20%`}
        borderBottomWidth={0}
      />

      {/* <Button onPress={onButtonPress} /> */}
      <View style={s?.toolbar}>
        {categoriesFetching || !categoriesData ? null : (
          <ToolBar
            activeCategory={category.name}
            categories={categoriesArray}
            onIconPress={onIconPress}
          />
        )}
      </View>
      {((productsFetching || localLoading) && !loadMore) ||
        !productsData ||
        !productsData.products ? (
        <Preloader />
      ) : (
        <>
          {/* <View style={s?.titleWrapper}>
            <Text style={s?.titleText}>{category.name}</Text>
            {productsData.products.length > 1 && category.name === t(`All`) ? (
              <TouchableOpacity style={s?.moreWrapper} onPress={onMorePress}>
                <Text style={s?.moreText}>
                  {isMore ? t(`buttons.less`) : t(`buttons.more`)}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View> */}
          {/* Duplicate Toolbar and show more/less Text */}
          <FlatList
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={s?.itemsContainer}
            data={productsData.products}
            renderItem={memoizeRenderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.3}
            onRefresh={onRefresh}
            refreshing={productsFetching}
            ListFooterComponent={footerLoader(productsFetching && loadMore)}
          />
        </>
      )}
    </View>
  );
});
export { MainScreen };

const createStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    itemsContainer: {
      flexGrow: 1,
      marginHorizontal: theme.metrics.x2,
    },
    itemContainer: {
      flex: 0.5,
      margin: theme.metrics.x2,
    },
    toolbar: {
      marginTop: theme.metrics.x,
      marginBottom: theme.metrics.x3
    },
    titleText: {
      fontSize: 28,
      color: theme.colors.black,
      fontWeight: "500",
    },
    titleWrapper: {
      flexDirection: `row`,
      justifyContent: `space-between`,
      alignItems: `center`,
      marginHorizontal: `4%`,
    },
    moreWrapper: {},
    moreText: {
      color: theme.colors.silver,
      fontWeight: "400",
      fontSize: 12,
    },
    footer: {
      height: 60,
      alignSelf: `flex-end`,
      width: `100%`,
    },
    cartIconContainer: {
      marginRight: theme.metrics.x4_5
    }
  });
