import React, { useState } from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import styles from './CustomButtonStoryStyles';
import { CustomButton } from './CustomButton';
import SettingsIcon from './assets/settings';
import LargePlusIcon from './assets/largePlus';

const { width, height } = Dimensions.get('window');

const CustomButtonLargeStory = () => {

  return (
    <View style={[styles.container, styles.bgYellow]}>
      <View style={styles.componentContainer}>
        <View style={styles.largeButtonContainer}>
          <CustomButton
            title={'Sign In'}
            bgColorUnactive={'#000'}
            bgColorActive={'#4CD964'}
            disabled={true}
            titleColor={'#fff'}
          />
        </View>
      </View>
      <View style={styles.componentContainer}>
        <View style={styles.largeButtonContainer}>
          <CustomButton
            title={'Sign In'}
            bgColorUnactive={'#000'}
            bgColorActive={'#4CD964'}
            disabled={false}
            titleColor={'#fff'}
          />
        </View>
      </View>
      <View style={styles.componentContainer}>
        <View style={styles.largeButtonContainer}>
          <CustomButton
            spinner={true}
            bgColorUnactive={'#000'}
            bgColorActive={'#4CD964'}
            titleColor={'#fff'}
          />
        </View>
      </View>
      <View style={styles.componentContainer}>
        <View style={styles.largeButtonContainer}>
          <CustomButton
            title={'Sign In'}
            bgColorUnactive={'#000'}
            bgColorActive={'#4CD964'}
            titleColor={'#fff'}
            error={true}
            disabled={true}
          />
        </View>
      </View>
      <View style={styles.componentContainer}>
        <View style={styles.largeButtonContainer}>
          <CustomButton
            title={'Pay'}
            bgColorUnactive={'#c4c4c4'}
            bgColorActive={'#007AFF'}
            titleColor={'#fff'}
            disabled={false}
          />
        </View>
      </View>
      <View style={styles.componentContainer}>
        <View style={styles.largeButtonContainer}>
          <CustomButton
            title={'Pay'}
            bgColorUnactive={'#fff'}
            bgColorActive={'#fff'}
            titleColor={'#007AFF'}
            borderColorActive={'#007AFF'}
            borderColorUnactive={'#c4c4c4'}
            borderWidth={1}
            disabled={false}
          />
        </View>
      </View>
      <View style={styles.componentContainer}>
        <View style={styles.largeButtonContainer}>
          <CustomButton
            title={'Done'}
            bgColorUnactive={'#000'}
            bgColorActive={'#4CD964'}
            disabled={true}
            titleColor={'#fff'}
            buttonDescription={
              <View style={styles.descContainer}>
                <Text style={styles.grayDescText}>
                  {'Dont have a time? '}
                </Text>
                <TouchableOpacity>
                  <Text style={styles.blackDescText}>
                    {'Skip'}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
};

const CustomButtonMediumStory = () => {

  return(
    <View style={[styles.container, styles.whiteBg]}>
      <View style={styles.componentContainer}>
        <View style={styles.mediumButtonContainer}>
          <CustomButton
            title={'Coupon code'}
            bgColorActive={'#F3F1F1'}
            titleColor={'#C2BDBD'}
            borderRadius={10}
          />
        </View>
      </View>
      <View style={styles.componentContainer}>
        <View style={styles.mediumButtonContainer}>
          <CustomButton
            title={'Pay'}
            bgColorActive={'#007AFF'}
            titleColor={'#fff'}
            borderRadius={10}
          />
        </View>
      </View>
      <View style={styles.componentContainer}>
        <View style={styles.semiButtonContainer}>
          <CustomButton
            title={'Choose'}
            bgColorActive={'#EBF2FF'}
            borderColorActive={'#CEDFFF'}
            titleColor={'#007AFF'}
            borderRadius={5}
            borderWidth={1}
          />
        </View>
      </View>
      <View style={styles.componentContainerRow}>
        <View style={[styles.smallButtonContainer, styles.marginRightx2]}>
          <CustomButton
            title={'Add'}
            bgColorActive={'#EBF2FF'}
            borderColorActive={'#CEDFFF'}
            titleColor={'#007AFF'}
            borderRadius={5}
            borderWidth={1}
          />
        </View>
        <View style={[styles.smallButtonContainer]}>
          <CustomButton
            title={'Share'}
            bgColorActive={'#F6FDF3'}
            borderColorActive={'#DAFFCA'}
            titleColor={'#42D70D'}
            borderRadius={5}
            borderWidth={1}
          />
        </View>
      </View>
    </View>
  );
}

const CustomButtonWithIconStory = () => {

  return(
    <View style={[styles.container, styles.whiteBg]}>
      <View style={styles.componentContainer}>
        <View style={styles.buttonWithIconContainer}>
          <CustomButton
            bgColorActive={'rgba(18, 18, 29, 0.05)'}
            borderRadius={30}
            icon={<SettingsIcon />}
          />
        </View>
      </View>
      <View style={styles.componentContainer}>
        <View style={styles.addRecipeButtonContainer}>
          <CustomButton
            bgColorActive={'#fff'}
            borderRadius={20}
            borderWidth={1}
            borderColorActive={'#E0E0E0'}
            icon={<LargePlusIcon color={'#000'}/>}
          />
        </View>
      </View>
    </View>
  );
}

storiesOf('CustomButton', module)
  .add('Large Button', () => <CustomButtonLargeStory />)
  .add('Medium and small Buttons', () => <CustomButtonMediumStory />)
  .add('With icon', () => <CustomButtonWithIconStory />)