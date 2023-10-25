import React, {useState} from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { ColorPicker } from './ColorPicker';
import styles from './ColorPickerStoryStyles';

const ColorPickerStory = () => {
const [arr, setArr] = useState([
  {color: '#D2D1D1', picked: false, id: "0"}, {color: '#6766B5', picked: true, id: "1"}, {color: '#CD5050', picked: false, id: "2"},
  {color: '#349138', picked: true, id: "3"}, {color: '#3EB8BF', picked: true, id: "4"}, {color: '#146E74', picked: false, id: "5"}, 
  {color: '#364142', picked: false, id: "6"}, {color: '#FAE956', picked: false, id: "7"}, {color: '#F4406B', picked: false, id: "8"},
  {color: '#F24E29', picked: false, id: "9"}, {color: '#F06E6E', picked: false, id: "10"}, {color: '#F85DCC', picked: false, id: "11"}
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
        <ColorPicker
          items={arr}
          onItemSelect={updateState}
        />
      </View>
    </View>
)}

const ColorPickerBuyerStory = () => {
  const [arr2, setArr2] = useState([
    {color: '#D2D1D1', picked: false, id: "0"}, {color: '#6766B5', picked: true, id: "1"}, {color: '#CD5050', picked: false, id: "2"}
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
          <ColorPicker
            items={arr2}
            onItemSelect={updateState}
          />
        </View>
      </View>
  )}

storiesOf('ColorPicker', module)
.add('Seller mode', () => <ColorPickerStory />)
.add('Buyer mode', () => <ColorPickerBuyerStory />);