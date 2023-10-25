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
    height: '35%',
    marginTop: height*0.05,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    paddingTop: theme.metrics.x4,
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
  defaultContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: theme.metrics.x4
  },
  bottomContainer: {
    width: '100%',
    height: '28%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomButton: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftButton: {
    borderWidth: 0.5,
    borderColor: theme.colors.lightGray,
    borderBottomLeftRadius: 20
  },
  rightButton: {
    backgroundColor: theme.colors.orange,
    borderBottomRightRadius: 20
  },
  buttonText: {
    fontSize: theme.fonts.sizes.h2
  },
  rightText: {
    color: theme.colors.white
  },
  leftText: {
    color: theme.colors.black
  }
});