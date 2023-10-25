import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { ProductDescription } from './ProductDescription';
import styles from './ProductDescriptionStoryStyles';

const ProductDescriptionStory = () => {

return(
  <View style={styles.container}>
      <View style={styles.componentContainer}>
        <ProductDescription
          productCategory={'кроссовки'}
          productName={'Nike Air Zoom Pegasus 37'}
          productDescription={'Mollit nulla sunt commodo aliqua veniam. Mollit commodo id anim irure tempor est cillum non laboris veniam. Nisi eu nisi Mollit nulla sunt commodo aliqua veniam. Mollit commodo id anim irure tempor est cillum non laboris veniam. Nisi eu nisi'}
        />
      </View>
    </View>
)}

storiesOf('ProductDescription', module)
.add('Product default', () => <ProductDescriptionStory/>)