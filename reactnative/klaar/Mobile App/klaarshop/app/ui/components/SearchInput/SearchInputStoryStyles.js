import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    alignItems: 'center'
  },
  componentContainer: {
    width: '100%'
  },
  settingsIconContainer: {
    paddingHorizontal: 5
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 17
  }
})