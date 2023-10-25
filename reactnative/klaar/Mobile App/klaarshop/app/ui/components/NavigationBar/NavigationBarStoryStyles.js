import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  componentContainer: {
    width: '100%'
  }
});