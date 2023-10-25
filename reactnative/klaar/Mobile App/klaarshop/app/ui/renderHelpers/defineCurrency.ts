import { CurrencyT } from "~/logic/product/ProductRedux";

export const defineCurrency = (textCurrency: CurrencyT) => {
   switch (textCurrency) {
      case 'usd':
         return '$';
      case 'rub':
         return '₽';
      default:
         return '₽'
   }
}

export const reverseDefineCurrency = (textCurrency: '$' | '₽') => {
   switch (textCurrency) {
      case '$':
         return `usd`;
      case '₽':
         return `rub`;
      default:
         return `rub`
   }
}



export const definePrice = ({ currency, price, usd = 73.93 }: { currency: `$` | `₽`, price: number, usd?: number }) => {
   switch (currency) {
      case `$`: {
         return +(price * usd).toFixed(2)
      }
      case `₽`: {
         return +(price / usd).toFixed(2)
      }
      default: {
         return +(price / usd).toFixed(2)
      }
   }
}