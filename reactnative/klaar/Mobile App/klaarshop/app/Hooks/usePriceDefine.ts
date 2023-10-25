import { useSelector } from "react-redux"
import { CurrencyT } from "~/logic/product/ProductRedux"
import { userSelector } from "~/logic/user/UserSelectors"
import { defineCurrency } from "~/ui/renderHelpers/defineCurrency"


const definePrice = ({ currency, price, usd = 73.93 }: { currency: `$` | `₽`, price: number, usd?: number }) => {
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

export const usePriceDefine = () => {

   const {
      currentCurrency
   } = useSelector(userSelector)

   return ({ price, currency }: { price: number, currency: CurrencyT, }) =>
   (
      currency === currentCurrency
         ? +price
         : definePrice({ currency: defineCurrency(currency), price: +price })
   )

}