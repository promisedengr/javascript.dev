import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Theme, useThemeContext } from '~/ui/theme';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
StyleSheet.create({
  container: {
    height: height,
    width: width,
    paddingVertical: height*0.05,
    backgroundColor: '#f7f7f7'
  },
  componentContainer: {
    width: '100%',
    marginVertical: height*0.02
  }
});