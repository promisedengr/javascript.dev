import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    paddingVertical: height*0.05,
    alignItems: 'center'
  },
  bgYellow: {
    backgroundColor: '#F1FF9D'
  },
  bgWhite: {
    backgroundColor: '#fff'
  },
  componentContainer: {
    width: '100%',
    marginVertical: height*0.01,
    paddingHorizontal: 16
  },
  componentContainerRow: {
    width: '100%',
    marginVertical: height*0.01,
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
  largeButtonContainer: {
    width: '100%',
    height: 56
  },
  mediumButtonContainer: {
    width: '50%',
    height: 56
  },
  semiButtonContainer: {
    width: '33%',
    height: 30
  },
  smallButtonContainer: {
    width: '15%',
    height: 35
  },
  marginRightx2: {
    marginRight: 8
  },
  buttonWithIconContainer: {
    width: 44,
    height: 44
  },
  addRecipeButtonContainer: {
    width: '40%',
    height: height*0.25
  },
  descContainer: {
    flexDirection: 'row'
  },
  grayDescText: {
    color: '#8E8E93',
    fontSize: 15
  },
  blackDescText: {
    fontWeight: '600',
    fontSize: 15
  }
});