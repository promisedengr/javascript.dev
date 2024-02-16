import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);
import setting_styles from './Dashboard.module.css'

import { useTheme } from 'next-themes'

import Popover from "@material-ui/core/Popover";
import Snackbar from '@mui/material/Snackbar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Image from 'next/image'
import Button from '../../components/CustomButtons/Button.js';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import useStorage from "../hook"
import http from "../http"
import { coinDict } from '../const'
import { useSelector } from 'react-redux'
import { getiBal, getpBal, getRate } from '../NavbalanceSlice';
import { auth } from '../JwtSlice';
import { _formatMoney } from "../formater";

export default function Send() {
  const iBal = useSelector(getiBal)
  const pBal = useSelector(getpBal)
  const bRate = useSelector(getRate)
  const reduxAuth = useSelector(auth)
  
  const {theme} = useTheme();
  const classes = useStyles();
  const { getItem } = useStorage();

  const [walletSel_1, setWalletSel_1] = React.useState(null);
  const [sendUnit, setSendUnit] = React.useState(false);

  const [sendAccount, setSendAccount] = React.useState('interest');
  const [sendCoin, setSendCoin] = React.useState('btc');
  const [sendAmount, setSendAmount] = React.useState('');
  const [sendAddress, setSendAddress] = React.useState('');
  
  const [msgPending, setMsgPending] = React.useState(false)
  const [msgComplete, setMsgComplete] = React.useState(false)
  const [msgError, setMsgError] = React.useState(false)

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const sendReq = async () => {
    setMsgPending(true)
    var res = await http.post(
      '/send_assets',
      {
        token:getItem('token'),
        account: sendAccount,
        coin: sendCoin,
        address: sendAddress,
        amount: sendAmount
      }
    )
    setMsgPending(false)
    if(res.data.state=='ok')
      setMsgComplete(true)
    else
      setMsgError(true)
    console.log(res)
  }

  return (
    <div className={`${theme==='dark' ? 'dark' : 'light'}`}>
      <div className={`text-xl font-medium`}>Send</div>

      <div className={`mt-3 text-sm text-gray-500 dark:text-gray-400`}>
        Account{` `}
        <ErrorOutlineIcon
          className={`${setting_styles.info_icon}`}
        ></ErrorOutlineIcon>
      </div>
      <div
        className={`${setting_styles.wallet_sel} ${theme==='dark' ? 'dark' : 'light'} p-2 mt-2`}
      >
        <div
          className={`flex cursor-pointer`}
          onClick={(event) => setWalletSel_1(event.currentTarget)}
        >
          <div className={`flex-none w-5 h-5 pt-0.5`}>
            <Image
              src={`/img/dashboard/${sendAccount}.png`}
              width="18" height="18" alt={sendAccount}
            ></Image>
          </div>
          <div
            className={`flex-grow pl-1`}
          >Fieonix {sendAccount.charAt(0).toUpperCase() + sendAccount.slice(1)} Account</div>
          <div className={`flex-none w-6`}><KeyboardArrowDownIcon /></div>
        </div>
        <Popover
          classes={{
            paper: classes.popover,
          }}
          className={`${setting_styles.wallet_sel_sub} ${setting_styles.send_sel_sub} ${theme==='dark' ? 'dark' : 'light'}`}
          open={Boolean(walletSel_1)}
          anchorEl={walletSel_1}
          onClose={() => setWalletSel_1(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className={`flex p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-purple-600 ${setting_styles.wallet_sel_txt}`}
            onClick = {() => {setSendAccount('interest'); setWalletSel_1(null)} }
          >
            <div className={`flex-none w-5 pt-0.5`}>
              <Image
                src="/img/dashboard/interest.png"
                width="18" height="18" alt="Interest"
              ></Image>
            </div>
            <div className={`flex-grow pl-2`}>
              <div className={`text-sm`}>Fieonix Interest Account</div>
              <div className={`text-base`}>£ {_formatMoney(iBal.btc*bRate.btc+iBal.eth*bRate.eth+iBal.sol*bRate.sol+iBal.usdc*bRate.usdc, 2)}</div>
            </div>
          </div>
          <div className={`flex p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-purple-600 ${setting_styles.wallet_sel_txt}`}
            onClick = {() => {setSendAccount('pension'); setWalletSel_1(null)} }
          >
            <div className={`flex-none w-5 pt-0.5`}>
              <Image
                src="/img/dashboard/pension.png"
                width="18" height="18" alt="Pension"
              ></Image>
            </div>
            <div className={`flex-grow pl-2`}>
              <div className={`text-sm`}>Fieonix Pension Account</div>
              <div className={`text-base`}>£ {_formatMoney(pBal.btc*pBal.btc+pBal.eth*bRate.eth+pBal.sol*bRate.sol+pBal.usdc*bRate.usdc, 2)}</div>
            </div>
          </div>
        </Popover>
      </div>

      <div className={`mt-5 text-sm text-gray-500 dark:text-gray-400`}>
        Payment Receiver{` `}
        <ErrorOutlineIcon
          className={`${setting_styles.info_icon}`}
        ></ErrorOutlineIcon>
      </div>

      <div>
        <input
          className={`mt-5 placeholder-gray-500::placeholder form_input form_grey form_input_${(theme === 'dark'?'dark':'light')}`}
          style={{paddingRight:'32px'}}
          placeholder="Enter wallet address..."
          onChange = {(e) => setSendAddress(e.target.value)}
        ></input>
        <div className={`flex h-0 relative -top-9`}>
          <div className={`flex-grow h-0`}></div>
          <div className={`flex-none w-8 cursor-pointer`}>
            <KeyboardArrowDownIcon />
          </div>
        </div>
      </div>

      <div>
        <input className={`mt-8 text-lg text-right form_input form_grey form_input_${(theme === 'dark'?'dark':'light')} ${setting_styles.total_send}`} onChange = {(e) => setSendAmount(e.target.value)}></input>
        <div className={`flex h-0 relative -top-8`}>
          <div className={`flex-none w-16 text-right text-sm text-gray-500 dark:text-gray-400`}>Amount</div>
          <div className={`flex-grow h-0`}></div>
          <div className={`flex-none w-10 text-right pt-1 text-sm`}>{sendCoin.toUpperCase()}</div>
          <div
            className={`flex-none w-8 cursor-pointer`}
            onClick={(event) => setSendUnit(event.currentTarget)}
          >
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <Popover
          classes={{
            paper: classes.popover,
          }}
          className={`${setting_styles.send_unit_sel} ${theme==='dark' ? 'dark' : 'light'}`}
          open={Boolean(sendUnit)}
          anchorEl={sendUnit}
          onClose={() => setSendUnit(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {coinDict.map((item)=>
            <div
              className={`flex p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-purple-600`}
              onClick = {() => { setSendUnit(null); setSendCoin(`${item}`) }}
              key = {item}
            >
              {item.toUpperCase()}
            </div>
          )}
        </Popover>
      </div>

      <div className={`mt-10`}>
        <Button
          className={"w-full btn btn_"+(theme === 'dark'?'dark':'light')+" "}
          type="button" color="primary"
          disabled={!reduxAuth}
          onClick = {() => sendReq() }
        >SEND</Button>
      </div>

      <Snackbar
        open={msgPending}
        className={`${theme==='dark'?'dark':'light'} custom_snack`}
        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
        autoHideDuration={60000}
        onClose={() => setMsgPending(false)}
        action={() => setMsgPending(false)}
      >
        <Alert onClose={() => setMsgPending(false)} severity="info" sx={{ width: '100%' }}>
          Pending...
        </Alert>
      </Snackbar>

      <Snackbar
        open={msgComplete}
        className={`${theme==='dark'?'dark':'light'} custom_snack`}
        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
        autoHideDuration={6000}
        onClose={() => setMsgComplete(false)}
        action={() => setMsgComplete(false)}
      >
        <Alert onClose={() => setMsgComplete(false)} severity="success" sx={{ width: '100%' }}>
          Error
        </Alert>
      </Snackbar>

      <Snackbar
        open={msgError}
        className={`${theme==='dark'?'dark':'light'} custom_snack`}
        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
        autoHideDuration={6000}
        onClose={() => setMsgError(false)}
        action={() => setMsgError(false)}
      >
        <Alert onClose={() => setMsgError(false)} severity="error" sx={{ width: '100%' }}>
          Complete
        </Alert>
      </Snackbar>
    </div>
  );
}
