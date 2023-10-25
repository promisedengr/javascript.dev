import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';
import { fonts } from '~/ui/theme/default/fonts';


const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: theme.colors.white,
      },
      bigText: {
         fontWeight: 'bold',
         textAlign: 'center',
         marginBottom: theme.metrics.x3,
         marginTop: 60
      },
      descText: {
         textAlign: 'center',
         color: theme.colors.gray1,
         fontSize: fonts.sizes.h2,
         marginBottom: theme.metrics.x7
      },
      itemBox: {
         width: '100%',
         justifyContent: 'space-between',
      },
      headerAbsolute: {
         position: 'absolute',
         zIndex: 10
      },
      containerCenter: {
         height: height * 0.86,
         paddingTop: height * 0.035, 
         justifyContent: 'space-between',
         backgroundColor: theme.colors.white
      },
      containerOtp: {
         height: '80%',
         paddingBottom: height * 0.025,
         width: '100%',
         paddingHorizontal: theme.metrics.x4,
         alignItems: 'center',
      },
      horizontalLarge: {
         width: '100%',
         flexDirection: 'row',
         alignItems: 'center'
      },
      widthSpaceBetween: {
         justifyContent: 'space-between'
      },
      widthCenter: {
         justifyContent: 'center'
      },
      horizontalSmall: {
         flexDirection: 'row',
         alignItems: 'center'
      },
      blackText: {
         fontSize: theme.fonts.sizes.h3,
         color: colors.gray1,
         fontWeight: 'bold'
      },
      lightGrayText: {
         fontSize: theme.fonts.sizes.h3,
         color: theme.colors.gray3
      },
      orangeText: {
         fontSize: theme.fonts.sizes.h3,
      },
      textedButtonPadding: {
         padding: theme.metrics.x
      },
      largeButtonContainer: {
         width: '100%',
         height: 56,
      },
      largeButtonLogin: {
         marginTop: height * 0.04
      },
      decorLine: {
         height: theme.metrics.x025,
         width: '80%',
         backgroundColor: theme.colors.lightGray,
         marginVertical: height * 0.03
      },
      grayText: {
         color: theme.colors.silver,
         fontSize: theme.fonts.sizes.h3
      },
      loginButtonContainer: {
         width: '30%',
         marginTop: height * 0.03
      },
      marginX4: {
         width: '100%',
         marginTop: theme.metrics.x4
      },
      forgotPasswordLargeText: {
         textAlign: 'center'
      },
      otpImageStyles: {
         width: 300,
         height: 280
      },
      otpImageContainer: {
         paddingVertical: theme.metrics.x2
      },
      semiText: {
         fontWeight: '600'
      },
      dateText: {
         ...theme.fonts.h4.secondary,
         color: theme.colors.black,
         letterSpacing: -0.2,
      },
      buttonWrapper: {
         marginBottom: theme.metrics.x5
      },
      checkboxWrapper: {
         marginHorizontal: theme.metrics.x4,
         flexDirection: `row`,
         marginTop: theme.metrics.x3,
         alignItems: `center`
      },
      termsText: {
         fontSize: 13,
         fontWeight: "600",

      },
      gray7Text: {
         color: theme.colors.gray7
      },
      mainBueText: {
         color: theme.colors.mainBlue,
         fontWeight: `bold`
      },
      forgotPassword: {
         fontWeight: `bold`,
         fontSize: 13  
      }
   });