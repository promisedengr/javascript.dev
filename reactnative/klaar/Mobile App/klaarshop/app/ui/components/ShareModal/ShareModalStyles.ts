import { Dimensions, StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';

const { width, height } = Dimensions.get('window');
export const createStyle = (theme: Theme) =>
 StyleSheet.create({
  modalStyles: {
    height: height,
    width: width,
    paddingHorizontal: theme.metrics.x4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(3, 3, 3, 0.5)'
  },
  contentContainer: {
    width: '100%',
    height: '80%',
    marginTop: height*0.05,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.metrics.x4,
    paddingTop: theme.metrics.x4,
    paddingBottom: theme.metrics.x7,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  closeIconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  boldText: {
    fontSize: theme.fonts.sizes.h1,
    fontWeight: '500',
    marginTop: theme.metrics.x4
  },
  additionalText: {
    color: theme.colors.gray5,
    textAlign: 'center',
    marginTop: theme.metrics.x4
  },
  buttonLink: {
    width: '100%',
    marginTop: theme.metrics.x2,
    height: 56
  },
  defaultContainer: {
    width: '100%',
    alignItems: 'center'
  }
});