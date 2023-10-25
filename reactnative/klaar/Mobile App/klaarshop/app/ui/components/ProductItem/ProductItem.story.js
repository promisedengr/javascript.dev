import React, {useState} from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { ProductItem } from './ProductItem';
import styles from './ProductItemStoryStyles';

const ProductItemStory = () => {
const [products, setProducts] = useState([
  {productID: '1', favorite: false}, {productID: '2', favorite: false}, {productID: '3', favorite: false}
]);

const updateState = (id) => {
  let newArr = products.map(item => {
    if(item.productID !== id) return item 
    return {...item, favorite: !item.favorite}
  })
  setProducts(newArr)
}

return(
  <View style={styles.container}>
      <View style={styles.componentContainer}>
        <View style={styles.half}>
          <ProductItem
            productID={products[0].productID}
            productImage={require('./assets/productImage.png')}
            sellerImage={require('./assets/sellerImage.png')}
            productRating={4}
            productFollowers={'2'}
            productCategory={'shoes'}
            productName={'Nike sneakers'}
            productColorsArray={[
              require('./assets/small1.png'),
              require('./assets/small2.png'),
              require('./assets/small3.png'),
              require('./assets/small3.png')
            ]}
            productPriceCurrency={'₽'}
            productPriceDefault={'300'}
            productSizeMin={'36'}
            productSizeMax={'42'}
            productPriceGroup={'230'}
            favorite={products[0].favorite}
            onPressFavorite={updateState}
            newProduct={true}
            onItemSelect={() => {}}
          />
        </View>
        <View style={styles.half}>
          <ProductItem
            productID={products[1].productID}
            productImage={require('./assets/productImage.png')}
            sellerImage={require('./assets/sellerImage.png')}
            productRating={5}
            productFollowers={'3'}
            productCategory={'shoes'}
            productName={'Nike sneakers'}
            productColorsArray={'White'}
            productPriceCurrency={'$'}
            productPriceDefault={'30'}
            productSizeMin={'36'}
            productSizeMax={'42'}
            productPriceGroup={'23'}
            favorite={products[1].favorite}
            onPressFavorite={updateState}
            onItemSelect={() => {}}
          />
        </View>
      </View>
      <View style={styles.componentContainer}>
        <View style={styles.half}>
          <ProductItem
            productID={products[2].productID}
            productImage={require('./assets/productImage.png')}
            sellerImage={require('./assets/sellerImage.png')}
            productRating={4}
            productFollowers={'2'}
            productCategory={'shoes'}
            productName={'Adidas boots'}
            productColorsArray={[
              require('./assets/small1.png'),
              require('./assets/small2.png'),
              require('./assets/small3.png'),
              require('./assets/small3.png')
            ]}
            productPriceCurrency={'₽'}
            productPriceDefault={'300'}
            productSizeMin={'36'}
            productSizeMax={'42'}
            productPriceGroup={'230'}
            favorite={products[2].favorite}
            onPressFavorite={updateState}
            timeLeft={39600}
            onItemSelect={() => {}}
          />
        </View>
      </View>
    </View>
)}

storiesOf('ProductItem', module)
.add('Product_item', () => <ProductItemStory />);