import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
StyleSheet.create({
  cardPhoto: {
    width: 64,
    height: 64,
    borderRadius: theme.metrics.x6,    
    left: -theme.metrics.x2,
    backgroundColor: theme.colors.silver,
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    borderRadius: theme.metrics.x6
  },
  baseContainer: {
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray,
    paddingLeft: theme.metrics.x4
  },
  infoContainer: {
    height: '100%',
    justifyContent: 'center'
  },
  lastDigitsText: {
    fontSize: theme.fonts.sizes.h2,
    fontWeight: '600'
  },
  endDateText: {
    color: theme.colors.silver,
    fontSize: theme.fonts.sizes.h3
  }
});