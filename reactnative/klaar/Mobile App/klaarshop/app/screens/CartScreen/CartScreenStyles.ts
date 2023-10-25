import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1
      },
      scrollViewStyle: {
         paddingTop: theme.metrics.x4,
         marginBottom: theme.metrics.x4
      },
      marginTopx4: {
         marginTop: theme.metrics.x4
      },
      scrollViewContainerStyle: {
         flexGrow: 1,
         justifyContent: 'space-between'
      },
      headerRight: {
         flexDirection: 'row',
         alignItems: 'center',
         width: width * 0.15,
         justifyContent: 'space-between'
      },
      flexGrow: {
         height: height - 95,
         flexGrow: 1,
         marginBottom: theme.metrics.x4
      },
      buttonContainer: {
         height: 56,
         width: width - theme.metrics.x4 * 2,
         marginBottom: 34
      },
      alignItemsCenter: {
         alignItems: 'center'
      },
      inputsContainer: {
         width: width,
         paddingHorizontal: theme.metrics.x4,
         flex: 1
      },
      inputWidth: {
         width: '100%',
      },
      inputMargin: {
         marginTop: theme.metrics.x4
      },
      policyContainer: {
         flexDirection: 'row',
         alignItems: 'flex-end',
         marginTop: theme.metrics.x7
      },
      policyText: {
         fontSize: theme.fonts.sizes.h4
      },
      orangeText: {
         color: theme.colors.orange
      },
      footer: {
         height: 44,
         backgroundColor: theme.colors.lightGray3,
         borderBottomWidth: 1,
         borderBottomColor: theme.colors.gray,
         flexDirection: `row`,
         justifyContent: `space-between`,
         paddingHorizontal: theme.metrics.x4,
         alignItems: `center`
      },
      footerValue: {
         width: `100%`,
         flexDirection: `row`,
         justifyContent: `space-between`,
         paddingHorizontal: theme.metrics.x4,
         backgroundColor: theme.colors.lightGray3,
         alignItems: `center`,
         marginVertical: theme.metrics.x4
      },
      footerTextValue: {
         fontSize: 18,
         fontWeight: "500",
         color: theme.colors.black
      },
      footerText: {
         fontSize: 13,
         color: theme.colors.gray7,
         fontWeight: "400"
      },

   });