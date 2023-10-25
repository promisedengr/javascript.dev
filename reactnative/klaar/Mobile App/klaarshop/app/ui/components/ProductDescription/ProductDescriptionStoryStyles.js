import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    paddingVertical: height*0.05,
    alignItems: 'center'
  },
  componentContainer: {
    width: '100%',
    marginVertical: height*0.02
  }
});