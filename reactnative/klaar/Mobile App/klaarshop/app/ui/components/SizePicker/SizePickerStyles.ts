import { Dimensions, StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';

const { width} = Dimensions.get('window');
export const createStyle = (theme:Theme) =>
 StyleSheet.create({
  container: {
    width: width *0.92,
    alignSelf: 'center',
    flexDirection: 'row',    
    alignItems: 'center',
    //marginBottom: metrics.x2
  },
  scrollView: {
    paddingVertical: 5,
    //flex: 1,
    justifyContent: 'space-between'
  },
  item: {    
    marginRight: 2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {

  }
});