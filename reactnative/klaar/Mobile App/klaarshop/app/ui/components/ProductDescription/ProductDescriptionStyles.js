import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 20,
    paddingTop: 25,
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    paddingHorizontal: 16 // add Theme
  },
  categoryText: {
    color: '#979CA0',
    fontSize: 13,
    textTransform: 'uppercase'
  },
  nameText: {
    fontSize: 24,
    marginTop: 15,
    marginBottom: 30
  },
  descriptionText: {
    color: '#292929',
    fontSize: 14,
    marginTop: 15
  },
  showMoreToogleText: {
    color: '#ff8500',
    fontSize: 14
  },
  flexEndContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});