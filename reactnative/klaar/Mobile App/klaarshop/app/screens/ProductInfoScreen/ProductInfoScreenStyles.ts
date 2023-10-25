import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';
import { metrics } from '~/ui/theme/default/metrics';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1
      },
      buyBtn: {
         minWidth: 150,
         position: 'relative',
         right: -theme.metrics.x6
      },
      fullWidthWhiteContainer: {
         width: '100%',
         backgroundColor: theme.colors.white
      },
      box: {
         alignSelf: 'stretch',
         marginHorizontal: theme.metrics.x4
      },
      containerWithBorder: {
         width: '100%',
         borderTopWidth: 1,
         // borderBottomWidth: 1,
         borderColor: theme.colors.gray4,
         paddingHorizontal: theme.metrics.x4
      },
      paddingx4: {
         paddingVertical: theme.metrics.x4
      },
      paddingx6: {
         paddingVertical: theme.metrics.x6
      },
      colorsContainer: {
         alignSelf: 'center',
         width: `100%`,
         flexDirection: 'row',
         flexWrap: 'wrap',
         //marginBottom: 16        
      },
      clientPhoto: {
         width: 64,
         height: 64,
         borderRadius: theme.metrics.x6,
         left: -theme.metrics.x2,
         backgroundColor: theme.colors.silver,
      },
      userPic: {
         width: '100%',
         height: '100%',
         borderRadius: theme.metrics.x6
      },
      userNameText: {
         textTransform: 'capitalize',
         fontSize: theme.fonts.sizes.h2,
         fontWeight: '600',
         marginBottom: 6
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
      colorsBox: {
         width: 60,
         height: 60,
         borderRadius: metrics.x6,
         marginLeft: theme.metrics.x2,
         borderColor: theme.colors.mainBlue
      },
      colorPhoto: {
         width: `100%`,
         height: `100%`,
         borderRadius: metrics.x6
      },
      uppercaseText: {
         textTransform: 'uppercase',
         fontSize: theme.fonts.sizes.h4,
         color: theme.colors.silver,
         marginBottom: theme.metrics.x4
      },
      widthSpaceBetween: {
         width: '100%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'flex-end'
      },
      footer: {
         height: 50,
         backgroundColor: theme.colors.lightGray3,
         borderTopWidth: 1,
         borderTopColor: theme.colors.gray4,
         flexDirection: `row`,
         justifyContent: `space-between`,
         paddingHorizontal: theme.metrics.x4,
         alignItems: `center`,
      },
      footerText: {
         fontSize: 13,
         color: theme.colors.gray7,
         fontWeight: "400"
      },
      starText: {
         color: theme.colors.lightBlue2
      },
      picker: {
         color: theme.colors.silver,
         paddingRight: `5%`,
         fontSize: 16

      },
      pickerWrapper: {
         flexDirection: `row`,
         alignItems: `center`
      },
      reviewsLabel: {
         alignItems: `center`,
         paddingHorizontal: theme.metrics.x4,
         paddingTop: theme.metrics.x4,
         borderTopWidth: 1,
         borderTopColor: theme.colors.gray4,
      },
      productPreloader: {
         width: `100%`,
         height: height
      },
      reviewsPreloader: {
         width: `100%`,
         height: height / 4
      }

   });