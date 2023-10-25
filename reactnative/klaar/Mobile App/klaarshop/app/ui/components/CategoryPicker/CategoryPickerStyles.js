import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  scrollView: {
    paddingVertical: 10
  },
  item: {
    marginRight: 14,
    borderRadius: 12,
    padding: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 14,
    color: '#979CA0',
    textTransform: 'capitalize',
    marginTop: 15
  }
});