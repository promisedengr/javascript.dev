import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);
import setting_styles from './Dashboard.module.css'

import { useTheme } from 'next-themes'

import Image from 'next/image'

import http from "../http"
import useStorage from "../hook";

import { useSelector } from 'react-redux'
import { auth, token } from '../JwtSlice';
import { _formatMoney } from "../formater";

export default function Transaction() {
  const reduxAuth = useSelector(auth)
  const reduxToken = useSelector(token)
  
  const {theme} = useTheme();
  const classes = useStyles();

  const [walletSel_1, setWalletSel_1] = React.useState(null);

  const { getItem } = useStorage();
  const wallet = getItem('wallet');
  var initVal = null;
  if(wallet) {
      initVal = JSON.parse(wallet)
  }
  const _isMyAddr = (address) => {
    if(initVal == null) return false
    if(address == initVal.interest.btc || 
       address == initVal.interest.eth ||
       address == initVal.interest.sol || 
       address == initVal.pension.btc || 
       address == initVal.pension.eth || 
       address == initVal.pension.sol)
      return true
    return false
  }
  const _monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  const _converDate = (str) => {
    var data = new Date(str)
    var ret = _monthNames[data.getMonth()] + ' ' + data.getDate() + ', ' + data.getFullYear() + ', ' + data.getHours() + ':' + data.getMinutes()
    return ret
  }

  const [transactions, setTransactions] = React.useState([]);

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
    if(reduxAuth) {
      http.post('/trasaction', {token:reduxToken})
      .then((response) => {
          var tmp = response.data
          setTransactions(tmp.logs)
          console.log(tmp)
      }, (error) => {
          console.log(error);
      });
    }
    else {
      http.get('/trasaction')
      .then((response) => {
          var tmp = response.data
          setTransactions(tmp.logs)
          console.log(tmp)
      }, (error) => {
          console.log(error);
      });
    }
  }, [])
  if (!mounted) return null

  return (
    <div className={`${theme==='dark' ? 'dark' : 'light'}`}>
      <div className={`text-xl font-medium`}>Transactions</div>

      {transactions.map((item) => 
        <div className={`my-6`} key={item.id}>
          <div className={`flex`}>
            <div className={`flex-none w-12 p-2 mr-2 ${setting_styles.io_symbol} ${theme==='dark' ? 'dark' : 'light'}`}>
              <Image
                src={`/img/dashboard/${_isMyAddr(item.addr_from)?'arrow_down':'arrow_up'}.png`}
                width="28" height="28" alt="From"
              ></Image>
            </div>
            <div className={`flex-grow`}>
              <div><span className={`${_isMyAddr(item.addr_from)?setting_styles.receive_color:setting_styles.send_color}`}>{_isMyAddr(item.addr_from)?'Received from':'Sent to'}</span>{` `}{item.addr_to}</div>
              <div className={`text-sm text-gray-500 dark:text-gray-400`}>{_converDate(item.createdAt)}</div>
            </div>
            <div className={`flex-none w-20 text-right mr-1 pt-2`}>{_isMyAddr(item.addr_from)?'+':''}{_formatMoney(item.amount, 4)}</div>
            <div className={`flex-none w-auto font-medium pt-2 ${setting_styles.unit_txt}`}>{item.coin.toUpperCase()}</div>
          </div>
        </div>
      )}

    </div>
  );
}
