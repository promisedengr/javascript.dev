import { StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';
import { metrics } from '~/ui/theme/default/metrics';

export const createStyle = (theme: Theme) => 
StyleSheet.create({
  containerStyle:{
    width: '100%',
    height: 60,
    borderRadius: 10,
    borderWidth: metrics.x0125,
    paddingLeft: metrics.x6,
    paddingRight: metrics.x2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textField: {
    width: '100%',
  },
  dropdown: {
    borderWidth: 0,
    marginLeft: -theme.metrics.x2
  },
  textFieldPadding: {
    paddingBottom: metrics.x5,
  },
  requiredMark: {
    color: theme.colors.red
  },
  iconContainer: {
    position: 'absolute',
    right: 5,
    top: -metrics.x05
  },
  timeInput: {
    borderWidth: 0,
    alignItems: 'flex-start'
  },
  timeText: {
    color: '#091B4D',
    fontSize: metrics.x4
  },
  iconTime: {
    marginRight: 5
  },
  dropDownContainerStyle: {
    backgroundColor: theme.colors.paleBlue,
    borderWidth: 0,
    borderRadius: theme.metrics.x3
  },
  placeholder: {
    color: theme.colors.gray7,
    fontSize: 16
  },
  label: {
    fontSize: 16
  }
});