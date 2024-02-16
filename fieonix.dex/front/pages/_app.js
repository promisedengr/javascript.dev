import '../styles/globals.css'
import '../styles/custom/css/setting.css'
import { ThemeProvider } from 'next-themes'

import store from '../modules/store'
import { Provider } from 'react-redux'

import "styles/scss/nextjs-material-kit.scss?v=1.2.0";
import 'react-phone-input-2/lib/style.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider> 
  )
}

export default MyApp
