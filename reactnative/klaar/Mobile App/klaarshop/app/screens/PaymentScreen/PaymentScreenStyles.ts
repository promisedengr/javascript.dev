import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';
import { color } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
StyleSheet.create({
  container: {
    width: width,
    height: height
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
    width: width
  },
  paddingH: {
    paddingHorizontal: theme.metrics.x4
  },
  inputWidth: {
    width: '100%'
  },
  inputMargin: {
    marginTop: theme.metrics.x4
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.metrics.x4,
    paddingVertical: theme.metrics.x3
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: theme.colors.gray
  },
  leftGrayText: {
    fontSize: theme.fonts.sizes.h4,
    color: theme.colors.silver,
    textTransform: 'uppercase'
  },
  rightGrayText: {
    fontSize: 14,
    color: theme.colors.silver,
  },
  boldBlackText: {
    fontWeight: '500',
    fontSize: 18
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
  }
});