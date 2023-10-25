import React from 'react';
import { View, Dimensions } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import styles from './CheckboxStoryStyles';
import { Checkbox } from './Checkbox';

const { width, height } = Dimensions.get('window');

const CheckboxSquareStory = () => {
  
  const [checked_1, setChecked_1] = React.useState(false);
  const [checked_2, setChecked_2] = React.useState(false);
  const [checked_3, setChecked_3] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.componentContainer}>
        <Checkbox
          onPress={() => {setChecked_1(!checked_1)}}
          size={width*0.05}
          isChecked={checked_1}
          borderColor={'#e1e1e1'}
          checkedColor={'#ff8402'}
        />
      </View>
      <View style={styles.componentContainer}>
        <Checkbox
          onPress={() => {setChecked_2(!checked_2)}}
          size={width*0.1}
          isChecked={checked_2}
          borderColor={'#e1e1e1'}
          checkedColor={'#ff8402'}
        />
      </View>
      <View style={styles.componentContainer}>
        <Checkbox
          onPress={() => {setChecked_3(!checked_3)}}
          size={width*0.2}
          isChecked={checked_3}
          borderColor={'#e1e1e1'}
          checkedColor={'#ff8402'}
        />
      </View>
    </View>
  );
};

const CheckboxCircleStory = () => {
  
  const [checked_1, setChecked_1] = React.useState(false);
  const [checked_2, setChecked_2] = React.useState(false);
  const [checked_3, setChecked_3] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.componentContainer}>
        <Checkbox
          onPress={() => {setChecked_1(!checked_1)}}
          size={width*0.05}
          isChecked={checked_1}
          borderColor={'#e1e1e1'}
          checkedColor={'#ff8402'}
          circle={true}
        />
      </View>
      <View style={styles.componentContainer}>
        <Checkbox
          onPress={() => {setChecked_2(!checked_2)}}
          size={width*0.1}
          isChecked={checked_2}
          circle={true}
          borderColor={'#e1e1e1'}
          checkedColor={'#ff8402'}
        />
      </View>
      <View style={styles.componentContainer}>
        <Checkbox
          onPress={() => {setChecked_3(!checked_3)}}
          size={width*0.2}
          isChecked={checked_3}
          borderColor={'#e1e1e1'}
          checkedColor={'#ff8402'}
          circle={true}
        />
      </View>
    </View>
  );
};

storiesOf('Checkbox', module)
  .add('Checkbox_square', () => <CheckboxSquareStory />)
  .add('Checkbox_circle', () => <CheckboxCircleStory />)