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
    marginVertical: height*0.02,
    paddingHorizontal: width*0.04,
    height: 60
  },
  smallBntsContainer: {
    height: 40,
    width: '100%',
    marginVertical: height*0.02,
    paddingHorizontal: width*0.04,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mediumWidth: {
    width: '35%'
  },
  smallWidth: {
    width: '20%'
  }
});