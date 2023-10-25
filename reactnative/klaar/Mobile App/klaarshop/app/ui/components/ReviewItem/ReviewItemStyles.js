import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: theme.metrics.x4,
  },
  uppercaseText: {
    textTransform: 'uppercase',
    fontSize: theme.fonts.sizes.h4,
    color: theme.colors.silver,
    marginBottom: theme.metrics.x4
  },
  widthSpaceBetween: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  clientPhoto: {
    width: 64,
    height: 64,
    borderRadius: theme.metrics.x6,    
    left: -theme.metrics.x2,
    backgroundColor: theme.colors.silver,
  },
  userPic: {
    width: '100%',
    height: '100%',
    borderRadius: theme.metrics.x6
  },
  userNameText: {
    textTransform: 'capitalize',
    fontSize: theme.fonts.sizes.h2,
    fontWeight: '600'
  },
  userCityText: {
    fontSize: theme.fonts.sizes.h3,
    color: theme.colors.silver
  },
  starIconMargin: {
    marginRight: 3
  },
  starsContainer: {
    flexDirection: 'row'
  },
  shortColumn: {
    height: 64,
    justifyContent: 'space-between'
  },
  moreContainer: {
    paddingLeft: theme.metrics.x,
    paddingVertical: theme.metrics.x05
  },
  rightContainerColumn: {
    height: 64,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginRight: -theme.metrics.x4
  },
  reviewTextStyle: {
    fontSize: theme.fonts.sizes.h3,
    color: theme.colors.black2
  },
  reviewPic: {
    width: '100%',
    resizeMode: 'cover',
    height: 200,
    borderRadius: 10
  },
  reviewPicContainer: {
    marginTop: theme.metrics.x6
  },
  btnsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  marginx4: {
    marginTop: theme.metrics.x4
  },
  marginLeftx6: {
    marginLeft: theme.metrics.x6
  },
  counterText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: theme.metrics.x2
  }
});