import React from "react";
import QRCode from "qrcode.react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);
import setting_styles from './Dashboard.module.css'

import { useTheme } from 'next-themes'

import Popover from "@material-ui/core/Popover";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Image from 'next/image'

import { coinToChain } from '../const'
import { useSelector } from 'react-redux'
import { getiBal, getpBal, getRate } from '../NavbalanceSlice';
import { _formatMoney } from "../formater";
import useStorage from "../hook";

export default function Wallet() {
  const iBal = useSelector(getiBal)
  const pBal = useSelector(getpBal)
  const bRate = useSelector(getRate)
  
  const {theme} = useTheme();
  const classes = useStyles();

  const [walletSel_1, setWalletSel_1] = React.useState(null);
  const [walletSel_2, setWalletSel_2] = React.useState(null);

  const [mounted, setMounted] = React.useState(false)
  const [accoutType, setAccoutType] = React.useState('interest')
  const [coinCateg, setCoinCateg] = React.useState('btc')

  const { getItem } = useStorage();
  const wallet = getItem('wallet');
  var initVal = null;
  if(wallet) {
      initVal = JSON.parse(wallet)
  }
  
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const coinCategLists = [
    {
      symbol: 'btc',
      title: 'Bitcoin',
      bottom_title: 'BTC',
      logo: 'btc'
    },
    {
      symbol: 'eth',
      title: 'Ethereum',
      bottom_title: 'ETH',
      logo: 'eth'
    },
    {
      symbol: 'usdc',
      title: 'USD Coin',
      bottom_title: 'USDC',
      logo: 'usdc'
    },
    {
      symbol: 'sol',
      title: 'Solana',
      bottom_title: 'SOL',
      logo: 'sol'
    }
  ]

  return (
    <div className={`${setting_styles.block_area} ${theme==='dark' ? 'dark' : 'light'}`}>
      <div className={`text-xl font-medium`}>Wallet Info</div>
      <div className={`${setting_styles.qr_area}`}>
        <QRCode
          value = {initVal&&initVal[accoutType][coinToChain[coinCateg].chain]?initVal[accoutType][coinToChain[coinCateg].chain]:' '}
          bgColor = {`${theme==='dark'?'#21243B':'#FCFCFF'}`}
          fgColor = "#5A84F0"
          size = {97}
        />
      </div>
      <div className={`${setting_styles.wallet_txt} ${theme==='dark' ? 'dark' : 'light'} mt-1.5`}>
        <div className={`text-sm text-center text-gray-500 dark:text-gray-400`}>Receive wallet address:</div>
        <div>{initVal&&initVal[accoutType][coinToChain[coinCateg].chain]?initVal[accoutType][coinToChain[coinCateg].chain]:' '}</div>
      </div>

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
              src={`/img/dashboard/${accoutType}.png`}
              width="18" height="18" alt={`${accoutType}`}
            ></Image>
          </div>
          <div
            className={`flex-grow pl-1`}
          >Fieonix {accoutType=='interest'?'Interest':'Pension'} Account</div>
          <div className={`flex-none w-6`}><KeyboardArrowDownIcon /></div>
        </div>
        <Popover
          classes={{
            paper: classes.popover,
          }}
          className={`${setting_styles.wallet_sel_sub} ${theme==='dark' ? 'dark' : 'light'}`}
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
           onClick = {() => {setAccoutType('interest'); setWalletSel_1(null)} }
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
            onClick = {() => {setAccoutType('pension'); setWalletSel_1(null)} }
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

      <div className={`mt-3 text-sm text-gray-500 dark:text-gray-400`}>
        Digital Assets{` `}
        <ErrorOutlineIcon
          className={`${setting_styles.info_icon}`}
        ></ErrorOutlineIcon>
      </div>
      <div
        className={`${setting_styles.wallet_sel} ${theme==='dark' ? 'dark' : 'light'} p-2 mt-2`}
      >
        <div
          className={`flex cursor-pointer`}
          onClick={(event) => setWalletSel_2(event.currentTarget)}
        >
          <div className={`flex-none w-5 h-5 pt-0.5`}>
            <Image
              src={`/img/coin/${coinToChain[coinCateg].logo}.png`}
              width="18" height="18" alt={coinToChain[coinCateg].logo}
            ></Image>
          </div>
          <div
            className={`flex-grow pl-1`}
          >{coinToChain[coinCateg].title}</div>
          <div className={`flex-none w-6`}><KeyboardArrowDownIcon /></div>
        </div>
        <Popover
          classes={{
            paper: classes.popover,
          }}
          className={`${setting_styles.wallet_sel_sub} ${theme==='dark' ? 'dark' : 'light'}`}
          open={Boolean(walletSel_2)}
          anchorEl={walletSel_2}
          onClose={() => setWalletSel_2(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {coinCategLists.map((item) =>
            <div className={`flex p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-purple-600 ${setting_styles.wallet_sel_txt}`}
              key = {item.symbol}
              onClick = {() => {setCoinCateg(`${item.symbol}`); setWalletSel_2(null)} }
            >
              <div className={`flex-none w-5 pt-0.5`}>
                <Image
                  src={`/img/coin/${item.symbol}.png`}
                  width="18" height="18" alt={item.bottom_title}
                ></Image>
              </div>
              <div className={`flex-grow pl-2`}>
                <div className={`grid grid-cols-2`}>
                  <div className={`text-base`}>{item.title}</div>
                  <div className={`text-base text-right`}>{ accoutType=='interest'?iBal[item.symbol]:pBal[item.symbol] }</div>
                </div>
                <div className={`grid grid-cols-2`}>
                  <div className={`text-sm dark:text-gray-400 text-gray-500`}>{item.bottom_title}</div>
                  <div className={`text-sm dark:text-gray-400 text-gray-500 text-right`}>£ { accoutType=='interest'?_formatMoney(iBal[item.symbol]*bRate[item.symbol], 2):_formatMoney(pBal[item.symbol]*bRate[item.symbol], 2) }</div>
                </div>
              </div>
            </div>
          )}
        </Popover>
      </div>

    </div>
  );
}
