import {StyleSheet} from 'react-native';
import { Theme } from '~/ui/theme';

export const createStyle = (theme: Theme) =>
StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: '3%',
    paddingRight: '5%'
  },
  buttonLeft: {
    borderWidth: 0.5,
    borderColor: theme.colors.lightGray,
    backgroundColor: theme.colors.white
  },
  buttonRight: {
    backgroundColor: theme.colors.orange
  },
  currencyText: {
    fontSize: 16,
    marginLeft: 4
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLarge: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 24,
    marginLeft: 4
  },
  iconContainerPosition: {
    marginBottom: 18
  },
  column: {
    alignItems: 'flex-end'
  },
  buyNowText: {
    fontSize: 18
  },
  buyNowTextDefault: {
    color: theme.colors.black
  },
  whiteText: {
    color: theme.colors.white
  },
  groupCountContainer: {
    backgroundColor: theme.colors.white,
    width: 35,
    height: 16,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4
  },
  groupCountText: {
    fontSize: 10,
    color: theme.colors.orange,
    fontWeight: '500'
  }
  });