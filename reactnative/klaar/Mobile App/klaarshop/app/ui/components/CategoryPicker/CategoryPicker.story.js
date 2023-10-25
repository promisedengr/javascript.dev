import React, {useState} from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { CategoryPicker } from './CategoryPicker';
import GiftIcon from './assets/gift';
import BagIcon from './assets/bag';
import CoffeIcon from './assets/coffe';
import UmbrellaIcon from './assets/umbrella';
import TvIcon from './assets/tv';
import styles from './CategoryPickerStoryStyles';

const CategoryPickerStory = () => {
const [arr, setArr] = useState([
  {icon: <GiftIcon w={24} h={24}/>, name: 'gifts'},
  {icon: <BagIcon w={24} h={24}/>, name: 'bag'},
  {icon: <CoffeIcon w={24} h={24}/>, name: 'coffe'},
  {icon: <UmbrellaIcon w={24} h={24}/>, name: 'umbrella'},
  {icon: <TvIcon w={24} h={24}/>, name: 'tv'}
]);

const handleClick = (name) => {
  console.log(name)
}

return(
  <View style={styles.container}>
      <View style={styles.componentContainer}>
        <CategoryPicker
          items={arr}
          onItemSelect={handleClick}
        />
      </View>
    </View>
)}

storiesOf('CategoryPicker', module)
.add('Default categories', () => <CategoryPickerStory />);