import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Keyboard} from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Header } from './../Header/Header';
import { SearchInput } from './SearchInput';
import SettingsIcon from './../Header/assets/settings';
import styles from './SearchInputStoryStyles';

const SearchInputStory = () => {
const [value, setValue] = useState('');
const [modalVisible, setModalVisible] = useState(false);
return(
  <View style={styles.container}>
      <View style={styles.componentContainer}>
        <Header
          headerCenterWidth={'0%'}
          headerLeftWidth={'78%'}
          headerRightWidth={'22%'}
          paddingLeft={20}
          paddingRight={16}
          borderBottomWidth={0}
          headerLeft={
            <SearchInput
              fontSize={17}
              textColor={'#000'}
              value={value}
              onChangeText={(text) => setValue(text)}
              onFocus={() => setModalVisible(true)}
              onBlur={() => setModalVisible(false)}
            />
          }
          headerRight={
            modalVisible?

            <TouchableOpacity onPress={() => {
                setModalVisible(false);
                Keyboard.dismiss();
              }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            :
           
            <TouchableOpacity style={styles.settingsIconContainer}>
              <SettingsIcon w={30} h={30}/>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
)}


storiesOf('SearchInput', module)
.add('With_modal', () => <SearchInputStory />)