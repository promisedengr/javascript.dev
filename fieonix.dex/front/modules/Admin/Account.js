import React from "react";

import { useTheme } from 'next-themes'

import Image from 'next/image'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '../../components/CustomButtons/Button.js';
import { Collapse } from '@mui/material';

import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);
import setting_styles from './Admin.module.css'


import { useSelector } from 'react-redux'
import { getRate } from '../NavbalanceSlice';
import { _formatMoney, _formatDate } from "../formater";
import http from "../http";
import useStorage from "../hook";

export default function Account() {
  const bRate = useSelector(getRate)
  const {theme} = useTheme();
  const classes = useStyles();
  const { getItem } = useStorage();

  const [confirmModal, setConfirmModal] = React.useState(false);
  const [searchUser, setSearchUser] = React.useState('');
  const [userInfo, setUserInfo] = React.useState({});
  const [walletInfo, setWalletInfo] = React.useState({});

  const [confirmState, setConfirmState] = React.useState(0);

  const [openInterestAccount, setOpenInterestAccount] = React.useState(true);
  const [openPensionAccount, setOpenPensionAccount] = React.useState(true);

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
  const accoutType = 'interest'

  const filterUser = async(evt) => {
    if(evt.keyCode == 13) {
      http.post('/filter_user', {token:getItem('token'), filter:searchUser})
      .then((response) => {
        var tmp = response.data
        if(tmp.state == 'ok') {
          setUserInfo(tmp.user)
          var buf = {}
          for(var x in tmp.wallets) {
            if( ! buf[tmp.wallets[x].account_categ]) {
              buf[tmp.wallets[x].account_categ] = {}
            }
            buf[tmp.wallets[x].account_categ][tmp.wallets[x].blockchain] = tmp.wallets[x].balance
          }
          setWalletInfo(buf)
        }
        else {
          setUserInfo({})
          setWalletInfo({})
        }
      }, (error) => {
        console.log(error);
      });
    }
    
  }

  const confirmAction = async() => {
    if(userInfo.id==null) {
      alert('Select Account')
      return
    }
    if(confirmState == 3) {
      var tmp = userInfo
      tmp.locked = 1 - tmp.locked
      setUserInfo(tmp)
    }
    http.post('/action_user', {token:getItem('token'), action:confirmState, user:userInfo.id})
    .then((response) => {
      var tmp = response.data
      console.log(tmp)
    }, (error) => {
      console.log(error);
    });
  }

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={`${setting_styles.block_area} ${theme==='dark' ? 'dark' : 'light'}`}>
      <div className={`flex`}>
        <div className={`text-xl font-medium`}>
          Accounts
        </div>
        <div className="flex-grow ml-3">
          <input
            className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
            onChange={(e) => setSearchUser(e.target.value)}
            style={{padding:'2px 8px'}}
            placeholder={`User ID Search..`}
            // onChange={(e) => filterUser(e.target.value)}
            onKeyDown = {(e) => filterUser(e)}
          ></input>
        </div>
      </div>

      <div className={`p-2 mx-0 my-2 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-900`}>
        <div className={`flex`}>
          <div>
            <PersonOutlineIcon
              fontSize='large'
              className={`text-gray-400 dark:text-gray-500`}
            ></PersonOutlineIcon>
          </div>
          <div className={`flex-grow ml-1`}>
            <div className={`text-sm`}>{userInfo.firstName?userInfo.firstName:''} {userInfo.lastName?userInfo.lastName:''}</div>
            <div className={`text-xs text-gray-400 dark:text-gray-500`}>Account Created {userInfo.createdAt?_formatDate(userInfo.createdAt):' '}</div>
            <div className={`text-xs text-gray-400 dark:text-gray-500`}>User ID {userInfo.uuid?userInfo.uuid:''}</div>
          </div>
          <div>
            <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
          </div>
        </div>
        <div className={`px-2`}>
          <div className={`flex`}>
            <div className={`text-sm flex-grow`}>Email:</div>
            <div className={`text-sm text-right`}>Country:</div>
          </div>
          <div className={`flex`}>
            <div className={`text-xs flex-grow text-gray-400 dark:text-gray-500`}>{userInfo.email?userInfo.email:''}</div>
            <div className={`text-xs text-right text-gray-400 dark:text-gray-500`}>{userInfo.country?userInfo.country:' '}</div>
          </div>
        </div>
        <div className={`px-2 mt-2`}>
          <div className={`flex`}>
            <div className={`text-sm flex-grow`}>Contact No:</div>
            <div className={`text-sm text-right`}>Activity:</div>
          </div>
          <div className={`flex`}>
            <div className={`text-xs flex-grow text-gray-400 dark:text-gray-500`}>{userInfo.phone?userInfo.phone:''}</div>
            <div className={`text-xs text-right text-gray-400 dark:text-gray-500`}>{userInfo.activedAt?_formatDate(userInfo.activedAt):' '}</div>
          </div>
        </div>
      </div>
      
      <div className={`p-2 mx-0 my-2 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-900`}>
        <div className={`text-lg ml-2 flex cursor-pointer`} onClick={() => setOpenInterestAccount(!openInterestAccount)}>
          <div className={`flex-grow`}>Fieonix Interest Account</div>
          <div>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <Collapse in={openInterestAccount}>
          {coinCategLists.map((item) =>
            <div className={`flex p-2 ${setting_styles.wallet_sel_txt}`}
              key = {item.symbol}
            >
              <div className={`flex-none w-6 pt-1.5`}>
                <Image
                  src={`/img/coin/${item.symbol}.png`}
                  width="28" height="28" alt={item.bottom_title}
                ></Image>
              </div>
              <div className={`flex-grow pl-2`}>
                <div className={`grid grid-cols-2`}>
                  <div className={`text-base`}>{item.title}</div>
                  <div className={`text-base text-right`}>{ walletInfo['interest']!=null&&walletInfo['interest'][item.symbol]!=null?_formatMoney(walletInfo['interest'][item.symbol], (item.symbol=='btc'?6:(item.symbol=='eth'?4:2))):0 }</div>
                </div>
                <div className={`grid grid-cols-2`}>
                  <div className={`text-sm dark:text-gray-400 text-gray-500`}>{item.bottom_title}</div>
                  <div className={`text-sm dark:text-gray-400 text-gray-500 text-right`}>£ { walletInfo['interest']!=null&&walletInfo['interest'][item.symbol]!=null?_formatMoney(walletInfo['interest'][item.symbol]*bRate[item.symbol], 2):0 }</div>
                </div>
              </div>
            </div>
          )}
        </Collapse>

        <div className={`text-lg ml-2 mt-8 flex cursor-pointer`} onClick={() => setOpenPensionAccount(!openPensionAccount)}>
          <div className={`flex-grow`}>Fieonix Pension Account</div>
          <div>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <Collapse in={openPensionAccount}>
          {coinCategLists.map((item) =>
            <div className={`flex p-2 ${setting_styles.wallet_sel_txt}`}
              key = {item.symbol}
            >
              <div className={`flex-none w-6 pt-1.5`}>
                <Image
                  src={`/img/coin/${item.symbol}.png`}
                  width="28" height="28" alt={item.bottom_title}
                ></Image>
              </div>
              <div className={`flex-grow pl-2`}>
                <div className={`grid grid-cols-2`}>
                  <div className={`text-base`}>{item.title}</div>
                  <div className={`text-base text-right`}>{ walletInfo['pension']!=null&&walletInfo['pension'][item.symbol]!=null?_formatMoney(walletInfo['pension'][item.symbol], (item.symbol=='btc'?6:(item.symbol=='eth'?4:2))):0 }</div>
                </div>
                <div className={`grid grid-cols-2`}>
                  <div className={`text-sm dark:text-gray-400 text-gray-500`}>{item.bottom_title}</div>
                  <div className={`text-sm dark:text-gray-400 text-gray-500 text-right`}>£ { walletInfo['pension']!=null&&walletInfo['pension'][item.symbol]!=null?_formatMoney(walletInfo['pension'][item.symbol]*bRate[item.symbol], 2):0 }</div>
                </div>
              </div>
            </div>
          )}
        </Collapse>
      </div>

      <div
        className={`p-2 mx-0 mt-10 cursor-pointer text-center rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-900`}
        onClick={() => {setConfirmModal(true); setConfirmState(1)} }
      >
        Remove 2-Factor-Authentication
      </div>
      <div
        className={`p-2 mx-0 my-2 cursor-pointer text-center rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-900`}
        onClick={() => {setConfirmModal(true); setConfirmState(2)} }
      >
        Request Password Change
      </div>
      <div
        className={`p-2 mx-0 my-2 cursor-pointer text-center text-red-500 dark:text-red-400 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-900`}
        onClick={() => {setConfirmModal(true); setConfirmState(3)} }
      >
        {
          (userInfo==null || userInfo!=null && userInfo.locked!=1)&&
          <>Freeze Account</>
        }
        {
          (userInfo!=null && userInfo.locked==1)&&
          <>Unfreeze User Account</>
        }
        
      </div>
      <div
        className={`p-2 mx-0 my-2 cursor-pointer text-center text-red-500 dark:text-red-400 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-900`}
        onClick={() => {setConfirmModal(true); setConfirmState(4)} }
      >
        Delete User Account
      </div>

      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={confirmModal}
        keepMounted
        onClose={() => setConfirmModal(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogContent
          id="classic-modal-slide-description"
          className={`${classes.modalBody} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
        >
          <div
            className={`w-96 text-lg text-center mx-10`}
          >
            {confirmState==1&&
              <>
                Are You Sure You Want To Remove 2FA?
              </>
            }
            {confirmState==2&&
              <>
                Are You Sure You Want To Request Password Change?
              </>
            }
            {(confirmState==3 && (userInfo==null || userInfo!=null && userInfo.locked==0)) &&
              <>
                Please Confirm Account Freeze
              </>
            }
            {(confirmState==3 && (userInfo!=null && userInfo.locked==1)) &&
              <>
                Please Confirm Account Unfreeze
              </>
            }
            {confirmState==4&&
              <>
                Please Confirm Account Deletion
              </>
            }
          </div>
        </DialogContent>
        <DialogActions
          className={`${classes.modalFooter} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
          style={{justifyContent:'center'}}
        >
          <Button
            className={`${setting_styles.confirm_btn}`}
            onClick={() => {setConfirmModal(false); confirmAction()} }
            color="success"
            // simple
          >
            Confirm
          </Button>
          <Button
            className={`${setting_styles.confirm_btn}`}
            onClick={() => setConfirmModal(false)}
            color="google"
            // simple
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
