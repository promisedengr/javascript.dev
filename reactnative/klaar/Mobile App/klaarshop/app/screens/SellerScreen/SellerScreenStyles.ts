import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';

const { width: w, height: h } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         width: w,
         height: h,
         alignItems: 'center', 
      },
      settingsIconContainer: {
         height: 22
      },
      scrollviewStyle: {
         width: w,
         paddingBottom: theme.metrics.x4
      },
      clientPhoto: {
         width: 64,
         height: 64,
         borderRadius: theme.metrics.x6,
         backgroundColor: theme.colors.silver,
         marginRight: theme.metrics.x3
      },
      userPic: {
         width: '100%',
         height: '100%',
         borderRadius: theme.metrics.x6
      },
      moreContainer: {
         paddingLeft: theme.metrics.x,
         paddingVertical: theme.metrics.x05
      },
      rightContainerColumn: {
         height: 64,
         alignItems: 'flex-end',
         justifyContent: 'space-between',
         marginRight: -theme.metrics.x4
      },
      userCityText: {
         fontSize: theme.fonts.sizes.h3,
         color: theme.colors.silver
      },
      starIconMargin: {
         marginRight: 3
      },
      starsContainer: {
         flexDirection: 'row'
      },
      shortColumn: {
         height: 64,
         justifyContent: 'center'
      },
      userNameText: {
         textTransform: 'capitalize',
         fontSize: theme.fonts.sizes.h2,
         fontWeight: '600',
         marginBottom: theme.metrics.x2
      },
      defaultContainer: {
         width: '100%',
         paddingBottom: theme.metrics.x4,
         paddingHorizontal: theme.metrics.x4
      },
      itemsContainer: {
         flexGrow: 1,
         marginHorizontal: theme.metrics.x
      },
      reviewsCountText: {
         color: theme.colors.silver,
         fontSize: theme.fonts.sizes.h2
      },
      horizontalFlex: {
         flexDirection: 'row',
         alignItems: `flex-start`,
      },
      spaceBetween: {
         justifyContent: 'space-between'
      },
      mediumButtonContainer: {
         width: '40%',
         height: 40,
         marginRight: theme.metrics.x4
      },
      smallButtonContainer: {
         width: '25%',
         height: 40,
      },
      spaceAround: {
         justifyContent: 'space-around'
      },
      marginTopx4: {
         marginTop: theme.metrics.x4
      },
      shortInfoContainer: {
         paddingVertical: theme.metrics.x3,
         borderTopWidth: 1,
         borderBottomWidth: 1,
         borderColor: theme.colors.gray2,
         width: '100%'
      },
      smallColumn: {
         alignItems: 'center',
         justifyContent: 'space-between',
         height: 50,
         width: '33%'
      },
      orangeText: {
         color: theme.colors.orange,
         fontSize: 20,
         fontWeight: '700'
      },
      grayText: {
         color: theme.colors.silver,
         fontSize: theme.fonts.sizes.h4
      },
      half: {
         width: '48%'
      },
      preloader: {
         width: `100%`,
         height: h * .25,
      },
      itemContainer: {
         flex: .5,
         margin: theme.metrics.x2,
      },
   });