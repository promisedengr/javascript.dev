import React, {useState} from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { BuyNowButton } from './BuyNowButton';


const BuyNowButtonStory = () => {

return(
  <View style={styles.container}>
      <View style={styles.componentContainer}>
        <BuyNowButton
          productPriceCurrency={'$'}
          productPriceDefault={'32'}
          productPriceGroup={'24'}
          groupCountFrom={'14'}
          groupCountTo={'20'}
          height={60}
          onBuyDefaultPressed={() => console.log('buy def')}
          onBuyGroupPressed={() => console.log('buy group')}
        />
      </View>
    </View>
)}

storiesOf('BuyNowButton', module)
.add('BuyNow component', () => <BuyNowButtonStory />);