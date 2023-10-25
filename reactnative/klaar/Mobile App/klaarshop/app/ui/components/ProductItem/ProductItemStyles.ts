import { StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';
import { metrics } from '~/ui/theme/default/metrics';

const grayColor = '#979CA0';

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         width: '100%',
         borderRadius: 10,
         backgroundColor: theme.colors.white,
         alignItems: 'center',
         overflow: 'hidden'
      },
      top: {
         width: '100%',
         height: 160,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: theme.colors.gray2
      },
      productImageStyles: {
         width: '100%',
         height: '100%',
      },
      sellerImageContainer: {
         width: 40,
         height: 40,
         borderWidth: metrics.borderWidth,
         borderRadius: 100,
         borderColor: theme.colors.white,
         backgroundColor: theme.colors.white,
         justifyContent: 'center',
         alignItems: 'center',
         position: 'absolute',
         
         right: metrics.x,
         bottom: 0,
         transform: [{translateY: theme.metrics.x5}],
      },
      sellerImageStyles: {
         width: '100%',
         height: '100%',
         borderRadius: 100
      },
      bottom: {
         width: '100%',
         paddingTop: 5,
         borderColor: theme.colors.lightGray,
         borderWidth: metrics.borderWidth,
         borderTopWidth: 0,
         borderBottomLeftRadius: 10,
         borderBottomRightRadius: 10,
         zIndex: -1
      },
      starsContainer: {
         flexDirection: 'row',
         alignItems: 'flex-end',
         transform: [{ scaleX: .91 }, { scaleY: .91 }]
      },
      starIconMargin: {
         marginRight: 3
      },
      reviewsNumberText: {
         color: theme.colors.gray7,
         fontSize: 10
      },
      productCategoryText: {
         color: theme.colors.gray7,
         fontSize: metrics.x3,
         marginTop: 5,
         textTransform: 'uppercase'
      },
      productNameText: {
         fontSize: metrics.x4,
         marginTop: 3
      },
      optionsContainer: {
         flexDirection: 'row',
         width: '100%',
         alignItems: 'center',
         marginTop: metrics.x2,

      },
      optionsColumn: {
         justifyContent: 'space-between',
      },
      optionsColumnMargin: {
         width: '54%'
      },
      optionsRow: {
         flexDirection: 'row',
         alignItems: 'flex-end'
      },
      productGrayText: {
         color: theme.colors.gray7,
         fontSize: metrics.x3
      },
      colorPreviewContainer: {
         height: metrics.x4,
         width: metrics.x4,
         borderRadius: 50,
         borderColor: '#fff',
         justifyContent: 'center',
         alignItems: 'center',
         borderWidth: metrics.borderWidth,
      },
      colorImage: {
         height: '100%',
         width: '100%',
         borderRadius: 50
      },
      blackTextSmall: {
         fontSize: metrics.x3,
         marginLeft: metrics.x05
      },
      currencyText: {
         fontSize: 14,
         color: theme.colors.mainBlue,
         marginLeft: 5,
         marginRight: metrics.x05
      },
      priceText: {
         fontSize: 18,
         color: theme.colors.white
      },
      secondRowMargin: {
         marginTop: metrics.x2
      },
      favoriteContainer: {
         width: metrics.x6,
         height: metrics.x6,
         borderRadius: 50,
         backgroundColor: '#fff',
         position: 'absolute',
         top: metrics.x2,
         right: metrics.x2,
         justifyContent: 'center',
         alignItems: 'center'
      },
      favoriteIconContainer: {
         marginTop: metrics.x05
      },
      newLabelContainer: {
         backgroundColor: '#000',
         width: 46,
         height: metrics.x6,
         borderRadius: 50,
         position: 'absolute',
         left: metrics.x2,
         top: metrics.x2,
         justifyContent: 'center',
         alignItems: 'center'
      },
      timeLeftContainer: {
         backgroundColor: theme.colors.mainBlue,
         height: metrics.x6,
         width: 80,
         borderRadius: 50,
         position: 'absolute',
         left: metrics.x2,
         top: metrics.x2,
         justifyContent: 'center',
         alignItems: 'center'
      },
      newText: {
         textTransform: 'uppercase',
         color: '#fff',
         fontSize: 14
      },
      priceButton: {
         backgroundColor: theme.colors.lightBlue2,
         justifyContent: `center`,
         alignItems: `center`,
         height: 40,
         borderBottomLeftRadius: 10,
         borderBottomRightRadius: 10,
         flexDirection: `row`,
         marginTop: theme.metrics.x3
      },
      acceptDeclineBut: {
         flexDirection: `row`
      },
      acceptButton: {
         flex: 1,
         borderBottomRightRadius: 0,
      },
      declineButton: {
         flex: 1,
         borderBottomLeftRadius: 0,
         backgroundColor: colors.red2,
      },
      disabledButton: {
         backgroundColor: colors.silver
      },
      acceptText: {
         color: colors.white,
         fontSize: 18,
         fontWeight: "500"
      }
   });