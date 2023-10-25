import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { SizePicker } from './SizePicker';
import styles from './SizePickerStoryStyles';

const { useState } = React;

const SizePickerStory = () => {
const [arr, setArr] = useState([
  {value: "35", picked: true, id: "0"}, {value: "36", picked: true, id: "1"}, {value: "37", picked: false, id: "2"},
  {value: "38", picked: true, id: "3"}, {value: "39", picked: true, id: "4"}, {value: "40", picked: false, id: "5"},
  {value: "41", picked: true, id: "6"}, {value: "42", picked: true, id: "7"}, {value: "43", picked: false, id: "8"},
  {value: "44", picked: true, id: "9"}
]);

const updateState = (id) => {
  let newArr = arr.map(item => {
    if(item.id !== id) return item 
    return {...item, picked: !item.picked}
  })
  setArr(newArr); 
}

return(
  <View style={styles.container}>
      <View style={styles.componentContainer}>
        <SizePicker
          items={arr}
          onItemSelect={updateState}
        />
      </View>
    </View>
)}

const SizePickerBuyerStory = () => {
  const [arr2, setArr2] = useState([
    {value: "35", picked: false, id: "0"}, {value: "36", picked: true, id: "1"}, {value: "37", picked: false, id: "2"}
  ]);
  
  const updateState = (id) => {
    let newArr = arr2.map(item => {
      if(item.id !== id) return {...item, picked: false} 
      return {...item, picked: !item.picked}
    })
    setArr2(newArr); 
  }
  
  return(
    <View style={styles.container}>
        <View style={styles.componentContainer}>
          <SizePicker
            items={arr2}
            onItemSelect={updateState}
          />
        </View>
      </View>
  )}

storiesOf('SizePicker', module)
.add('Seller mode', () => <SizePickerStory />)
.add('Buyer mode', () => <SizePickerBuyerStory/>);