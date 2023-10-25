import { CustomCommand } from 'reactotron-core-client';
import { productActions } from '~/logic/product/ProductRedux';
import { store } from '~/store/store';

const AddProductCommand: CustomCommand = {
    command: 'AddProduct',
    description: 'Add new product',
    handler: () => {
      
      store.dispatch(
        productActions.add_product.request({
            name: 'Default product name2',            
            description: 'Default decription1',
            category: 'test1',
            subcategory: 'test2',            
            delivery: ['Deutsche_Post_DHL'],
            currency: 'rub',
            price: 123,  
            numBuyersForGroupBuy: 4,
            groupPrice: 100,          
            amount: 12,
            endDate: "1598029644"
        }),
      );
    },
  };

  const DeleteProductCommand: CustomCommand = {
    command: 'Delete Product',
    description: 'Delete product by id',
    handler: () => {
      store.dispatch(
        productActions.deleteProduct.request({
          productId: '60c7b85e673c466883d05cd3'
        }),
      );
    },
  };

  const commands = [
    AddProductCommand,
    DeleteProductCommand
  ];
  export { commands };
