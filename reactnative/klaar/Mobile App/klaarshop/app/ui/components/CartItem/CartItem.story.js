import React, {useState} from 'react';
import { View, ScrollView } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { CartItem } from './CartItem';
import { createStyle } from './CartItemStoryStyles';
import { useThemeContext } from '~/ui/theme';
import { FlatList } from 'react-native-gesture-handler';

const CartItemStory = () => {
  const defaultItems = [
    {
      key: 0,
      groupBuy: false,
      price: '24',
      minSize: '36',
      maxSize: '42',
      productName: 'Nike Sneakers',
      timeLeft: 50,
      productColorsArray: [
        require('./assets/small1.png'),
        require('./assets/small2.png'),
        require('./assets/small3.png'),
        require('./assets/small3.png')
      ],
      productImage: require('~/ui/components/ProductItem/assets/productImage.png')
    },
    { 
      key: 1,
      groupBuy: false,
      price: '482',
      minSize: '36',
      maxSize: '42',
      productName: 'Adidas mad bounce 2018',
      timeLeft: 500,
      productColorsArray: [
        require('./assets/small1.png'),
        require('./assets/small2.png'),
        require('./assets/small3.png'),
        require('./assets/small3.png')
      ],
      productImage: require('~/ui/components/ProductItem/assets/productImage.png')
    },
    {
      key: 2,
      groupBuy: false,
      price: '48',
      minSize: '36',
      maxSize: '42',
      productName: 'Nike Sneakers',
      timeLeft: 5000,
      productColorsArray: [
        require('./assets/small1.png'),
        require('./assets/small2.png'),
        require('./assets/small3.png'),
        require('./assets/small3.png')
      ],
      productImage: require('~/ui/components/ProductItem/assets/productImage.png')
    },
    {
      key: 3,
      groupBuy: true,
      price: '101',
      minSize: '36',
      maxSize: '42',
      productName: 'Nike Sneakers',
      timeLeft: 50000,
      productColorsArray: [
        require('./assets/small1.png'),
        require('./assets/small2.png'),
        require('./assets/small3.png'),
        require('./assets/small3.png')
      ],
      productImage: require('~/ui/components/ProductItem/assets/productImage.png')
    },
  ];

  const { s } = useThemeContext(createStyle);
  const [cartItems, setCartItems] = useState(defaultItems);

  return(
    <View style={s?.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item, index }) => 
          <CartItem 
            borderBottom={index === cartItems.length - 1}
            onSwipe={() => {
              const newCartItems = [...cartItems];
              newCartItems.splice(newCartItems.indexOf(item), 1);
              setCartItems(newCartItems);
            }} {...{ item }} 
          />
        }
        />
    </View>
  )
}

storiesOf('CartItem', module)
.add('Default', () => <CartItemStory />);