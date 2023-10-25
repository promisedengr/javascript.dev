import React, {useState} from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { OurDropdown } from './OurDropdown';
import styles from './OurDropdownStoryStyles';

const OurDropdownStory = () => {
  const [value1, setValue1] = useState('Не выбрано');
  const [value2, setValue2] = useState('Не выбрано');
  const [value3, setValue3] = useState(undefined);

  return (
    <View style={styles.container}>
      <View style={styles.componentContainer}>
        <OurDropdown
          inputLabel={'Выберите способ доставки'} 
          required={true}
          value={value1}
          onChangeText={(text) => setValue1(text)}
          data={[
            {
              value: 'Доставка по Берлину'
            },
            {
              value: 'Доставка по Гамбургу'
            },
            {
              value: 'Доставка по Франкфурту'
            }
          ]}
          bgColor={'#fff'}
          validationOk={true}
        />
      </View>
      <View style={styles.componentContainer}>
        <OurDropdown
          inputLabel={'Выберите что-то еще'}
          value={value2}
          onChangeText={(text) => setValue2(text)}
          data={[
            {
              value: 'Доставка по Берлину'
            },
            {
              value: 'Доставка по Гамбургу'
            },
            {
              value: 'Доставка по Франкфурту'
            }
          ]}
        />
      </View>
      <View style={styles.componentContainer}>
        <OurDropdown
          inputLabel={'Таймер'}
          value={value3}
          required={true}
          onChangeValue={(text) => setValue3(text)}
          timePickerMode={true}
        />
      </View>
    </View>
  );
};
  
  storiesOf('OurDropdown', module)
    .add('Dropdown', () => <OurDropdownStory />);