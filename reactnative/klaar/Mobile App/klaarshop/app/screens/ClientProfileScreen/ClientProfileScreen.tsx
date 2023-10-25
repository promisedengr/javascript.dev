import * as React from "react";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteTokenFromAsyncStorage } from "~/logic/asyncStorage/asyncStorageHelper";
import { ProfileActions } from "~/logic/profile/ProfileRedux";
import { profileSelector } from "~/logic/profile/ProfileSelectors";
import { UserActions } from "~/logic/user/UserRedux";
import { DESTROY_STORE } from "~/store/reducers";
import { ArrowButton } from "~/ui/components/ArrowButton";
import { BaseItem } from "~/ui/components/BaseItem";
import { Header } from "~/ui/components/Header";
import { ImageWithLoader } from "~/ui/components/ImageWithLoader/ImageWithLoader";
import { Preloader } from "~/ui/components/Preloader/Preloader";
import { RenderStars } from "~/ui/components/RenderStars/renderStars";
import { Separator } from "~/ui/components/Separator";
import { TitleDescription } from "~/ui/components/TitleDescription";
import { Theme, useThemeContext } from "~/ui/theme";
import { metrics } from "~/ui/theme/default/metrics";
import { theme } from "~/ui/theme/default/theme";
import { navigationService } from "../NavigationService";

type ClientProfileScreenProps = {
  componentId?: string;
};

const ClientProfileScreen: React.FC<ClientProfileScreenProps> = (props) => {

  const { s } = useThemeContext(createStyle);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    getSelfProfile: {
      data: selfProfileData,
      fetching: selfProfileFetching
    },
  } = useSelector(profileSelector);

  useEffect(() => {
    if (!selfProfileData)
      dispatch(ProfileActions.getSelfProfile.request());
  }, []);

  const [imageLoad, setimageLoad] = useState(false);

  const onImageLoad = () => setimageLoad(true);

  const onImageLoadEnd = () => setimageLoad(false);

  const navigationEvent = (screenName: string) => {
    Navigation.push(navigationService.getCurrentScreenId(), {
      component: {
        name: screenName,
        options: {
          animations: { push: { enabled: true } },
        },
      },
    });
  };

  const onLogoutPress = () => {
    dispatch(UserActions.logout.request());
    dispatch(DESTROY_STORE());
    deleteTokenFromAsyncStorage(); // If token invalid
  };

  return (
    <View style={s?.container}>
      <Header
        bgColor={theme.colors.transparent}
        headerTitleFontSize={17}
        headerTitle={t("profile.profileTitle")}
      // borderBottomWidth={1}
      />
      {!selfProfileData || selfProfileFetching ? (
        <Preloader />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <BaseItem
            leftStyle={s?.clientPhoto}
            left={
              <ImageWithLoader
                imageLoad={imageLoad}
                onLoadStart={onImageLoad}
                onLoadEnd={onImageLoadEnd}
                photoStyle={s?.photoStyle}
                photoContainerStyle={s?.photoStyle}
                source={selfProfileData?.photo}
              />
            }
            centerStyle={s?.centerStyle}
          >
            <TitleDescription
              title={`${selfProfileData?.fn} ${selfProfileData?.ln}`}
            />
            <View style={s?.starsContainer}>
              <RenderStars rating={selfProfileData?.rating} />
              <Text
                style={s?.reviewsCountText}
              >{`(${selfProfileData?.numReviews})`}</Text>
            </View>
          </BaseItem>

          <ArrowButton
            title={t("profile.favorites")}
            onPress={() => navigationEvent("FavoriteScreen")}
          />
          <Separator />
          <ArrowButton
            title={t("profile.myAnnouncm")}
            onPress={() => navigationEvent("MyAdsScreen")}
          />
          <ArrowButton
            title={t("profile.purchaseHistory")}
            onPress={() => navigationEvent("BuyHistoryScreen")}
            borderTop
          />
          <ArrowButton
            title={t("profile.reviews")}
            onPress={() => navigationEvent("ReviewsScreen")}
            borderTop
          />
          <ArrowButton
            title={t("profile.purchaseStatus")}
            onPress={() => navigationEvent("PurchaseStatusScreen")}
            borderTop
          />
          {selfProfileData?.role === `admin` && (
            <ArrowButton
              title={t("profile.approveProduct")}
              onPress={() => navigationEvent("AdminApproveScreen")}
              borderTop
            />
          )}

          <ArrowButton
            title={t("profile.giveFeedback")}
            onPress={() => navigationEvent("LeftReviewScreen")}
            borderTop
          />
          <Separator />
          <Separator />
          <ArrowButton
            title={t("profile.deliveryAddress")}
            onPress={() => navigationEvent("AddAdressScreen")}
          />
          {/* <ArrowButton
                    title={t('Оплата')}
                    onPress={onPayPress}
                    borderTop
                /> */}
          <Separator />
          <ArrowButton
            title={t("profile.personalData")}
            onPress={() => navigationEvent("PersonalDataScreen")}
          />
          <ArrowButton
            title={t("profile.settings")}
            onPress={() => navigationEvent("ClientSettingsScreen")}
            borderTop
          />
          <ArrowButton
            title={t("profile.logOut")}
            onPress={onLogoutPress}
            borderTop
          />
          <Separator />
        </ScrollView>
      )}
    </View>
  );
};

const MClientProfileScreen = memo(ClientProfileScreen);
export { MClientProfileScreen as ClientProfileScreen };

const createStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    spinner: {
      flex: 1,
    },
    clientPhoto: {
      width: 80,
      height: 80,
      borderRadius: metrics.x6,
      left: metrics.x2,
    },
    centerStyle: {
      alignItems: "flex-start",
      marginLeft: metrics.x6,
    },
    toolBar: {
      paddingHorizontal: 24,
    },
    reviewsCountText: {
      color: theme.colors.silver,
      fontSize: theme.fonts.sizes.h2,
    },
    starsContainer: {
      flexDirection: `row`,
      marginTop: theme.metrics.x2,
      alignItems: `center`,
    },
    photoStyle: {
      width: `100%`,
      height: `100%`,
      borderRadius: theme.metrics.x6,
    },
  });