import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);

import Button from '../../components/CustomButtons/Button.js';
import setting_styles from './Buy.module.css'

import { useTheme } from 'next-themes'


import Popover from "@material-ui/core/Popover";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Collapse, Checkbox } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
// import { CheckCircleIcon, RadioButtonUncheckedIcon } from '@mui/icons-material';
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Image from 'next/image'

import { useSelector } from 'react-redux'
import { getiBal, getpBal, getRate } from '../NavbalanceSlice';
import { _formatMoney } from "../formater";

export default function Buy() {
  const iBal = useSelector(getiBal)
  const pBal = useSelector(getpBal)
  const bRate = useSelector(getRate)
  const classes = useStyles();
  const {theme} = useTheme();

  const [loanAmount, setLoanAmount] = React.useState(null);
  const openLoanAmount = Boolean(loanAmount);
  const loanAmountOpen = (event) => {
    setLoanAmount(event.currentTarget);
  };
  const loanAmountClose = (pm) => {
    console.log(pm)
    setLoanAmount(null);
  };

  const [walletSel_1, setWalletSel_1] = React.useState(null);
  const [sendAccount, setSendAccount] = React.useState('interest');
  const [openBuyModal, setOpenBuyModal] = React.useState(false);

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div>
      <div
        className={`p-10 rounded-3xl bg-light-color-main-1 dark:bg-dark-color-main-1 text-dark-color-main-1 dark:text-light-color-main-1`}
        id="navigation-pills" 
      >
        <div
          className={`text-center mx-auto w-72 text-2xl -mt-10 rounded-b-xl ${setting_styles.buy_title} ${theme==='dark'?'dark':'light'}`}
        >
          Compare & Buy Crypto
        </div>

        <div className={`flex mt-10`}>
          <div className={`w-1/2`}>
            <div className={`text-xl pl-2 mb-3`}>
              1. Account Selection:
            </div>
            <div
              className={`${setting_styles.notice_txt}`}
            >Select which account for your deposit.</div>
            <div
              className={`${setting_styles.notice_meta}`}
            >Our provider will send <span>Bitcoin</span> to your chosen account after you complete payment</div>
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


            <div className={`text-xl pl-2 mb-3 mt-10`}>
              2. Cryptocurrency:
            </div>

            <div className={`${setting_styles.form_fontrol_half} w-72`}>
              <span className="form_label">Amount:</span>
              <input className={`form_input form_input_${(theme === 'dark'?'dark':'light')} ${setting_styles.paddingRbig}`}></input>
              <Button
                className={`${setting_styles.loanAmountSel} ${(theme==='dark'?setting_styles.loanAmountSelDark:setting_styles.loanAmountSelLight)}`}
                id="loanAmount"
                aria-controls="loanAmountMenu"
                aria-haspopup="true"
                aria-expanded={openLoanAmount ? 'true' : 'false'}
                variant="contained"
                disableElevation
                onClick={loanAmountOpen}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <Image
                  src="/img/coin/btc.png"
                  height={24} width={24} alt="BTC"
                ></Image>
                <span className={setting_styles.selTxt}>BTC</span>
              </Button>
              <Menu
                className={`customDropdownMenu ${(theme==='dark'?setting_styles.loanAmountMenu:"")}`}
                id="loanAmountMenu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={loanAmount}
                open={openLoanAmount}
                onClose={loanAmountClose}
              >
                <MenuItem onClick={() => loanAmountClose('usdc')}>
                  <Image
                    src="/img/coin/usdc.png"
                    height={24} width={24} alt="USDC"
                  ></Image>
                  &nbsp;&nbsp;&nbsp;USDC
                </MenuItem>
                <MenuItem onClick={() => loanAmountClose('btc')}>
                  <Image
                    src="/img/coin/btc.png"
                    height={24} width={24} alt="BTC"
                  ></Image>
                  &nbsp;&nbsp;&nbsp;BTC
                </MenuItem>
                <MenuItem onClick={() => loanAmountClose('eth')}>
                  <Image
                    src="/img/coin/eth.png"
                    height={24} width={24} alt="ETH"
                  ></Image>
                  &nbsp;&nbsp;&nbsp;ETH
                </MenuItem>
              </Menu>
            </div>
          </div>

          <div className={`w-1/2`}>
            <div
              className={`${setting_styles.account_area} ${setting_styles.pay_area} ${theme==='dark' ? 'dark' : 'light'}`}
            >
              <div>
                <Image
                  src={"/img/dashboard/moonpay"+(theme==='dark'?"":"_l")+".png"}
                  height={30}
                  width={97}
                  alt="Pension"
                ></Image>
              </div>
              <div>
                <div>
                  <span>You Get - </span>
                  <span>0.00341 BTC</span>
                </div>
                <div>1 BTC = 44117.64 GBP・All fees included</div>
              </div>
            </div>
            <div
              className={`${setting_styles.account_area} ${setting_styles.pay_area} ${theme==='dark' ? 'dark' : 'light'}`}
            >
              <div>
                <Image
                  src={"/img/dashboard/moonpay"+(theme==='dark'?"":"_l")+".png"}
                  height={30}
                  width={97}
                  alt="Pension"
                ></Image>
              </div>
              <div>
                <div>
                  <span>You Get - </span>
                  <span>0.00341 BTC</span>
                </div>
                <div>1 BTC = 44117.64 GBP・All fees included</div>
              </div>
            </div>
            <div
              className={`${setting_styles.account_area} ${setting_styles.pay_area} ${theme==='dark' ? 'dark' : 'light'}`}
            >
              <div>
                <Image
                  src={"/img/dashboard/moonpay"+(theme==='dark'?"":"_l")+".png"}
                  height={30}
                  width={97}
                  alt="Pension"
                ></Image>
              </div>
              <div>
                <div>
                  <span>You Get - </span>
                  <span>0.00341 BTC</span>
                </div>
                <div>1 BTC = 44117.64 GBP・All fees included</div>
              </div>
            </div>
            <div
              className={`${setting_styles.account_area} ${setting_styles.pay_area} ${theme==='dark' ? 'dark' : 'light'}`}
            >
              <div>
                <Image
                  src={"/img/dashboard/moonpay"+(theme==='dark'?"":"_l")+".png"}
                  height={30}
                  width={97}
                  alt="Pension"
                ></Image>
              </div>
              <div>
                <div>
                  <span>You Get - </span>
                  <span>0.00341 BTC</span>
                </div>
                <div>1 BTC = 44117.64 GBP・All fees included</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-row-reverse ${setting_styles.pay_agree}`}
        >
          <div className={setting_styles.agree_txt}>
            I agree with Terms of Use, Privacy Policy and AML/KYC.
          </div>
          <Checkbox
            inputProps={{ 'aria-label': 'controlled' }}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
          />
        </div>
        <div className={`flex flex-row-reverse w-full`}>
          <div>
            <Button
              className={"btn btn_outline_primary_"+(theme === 'dark'?'dark':'light')}
              type="button" color="primary"
              onClick={() => {}}
            >CANCEL</Button>
            {` `}
            <Button
              className={"btn btn_"+(theme === 'dark'?'dark':'light')}
              type="button" color="primary"
              onClick={() => {setOpenBuyModal(true)}}
            >GO TO PAYMENT</Button>
          </div>
        </div>

        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal,
          }}
          open={openBuyModal}
          keepMounted
          onClose={() => setOpenBuyModal(false)}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            // className={`${classes.modalHeader} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
          >
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="black"
              onClick={() => setOpenBuyModal(false)}
            >
              <Close className={classes.modalClose} />
            </IconButton>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            // className={`${classes.modalBody} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
          >
            <iframe
              classes={`dark`}
              title="Onramper widget"
              frameborder="no"
              allow="accelerometer; autoplay; camera; gyroscope; payment;"
              style={{width:'600px',height:'560px',marginLeft:'-24px'}}
              src={`https://widget.onramper.com?color=9696F8&apiKey=${process.env.NEXT_PUBLIC_ONRAMPER_KEY}`}>
            </iframe>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}
