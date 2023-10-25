import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  scrollView: {
    paddingVertical: 5
  },
  item: {
    height: 32,
    width: 32,
    marginRight: 2,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  colorContainer: {
    width: 24,
    height: 24,
    borderRadius: 100
  }
});