import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);

import Button from '../../components/CustomButtons/Button.js';
import setting_styles from './Trade.module.css'

import { useTheme } from 'next-themes'

import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Image from 'next/image'


export default function Trade() {
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

  const [colReq, colReqSet] = React.useState(null);
  const openColReq = Boolean(colReq);
  const colReqOpen = (event) => {
    colReqSet(event.currentTarget);
  };
  const colReqClose = (pm) => {
    console.log(pm)
    colReqSet(null);
  };

  const [tradeDoneModal, setTradeDoneModal] = React.useState(false);
  
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={classes.container}>
      <div id="navigation-pills">
        <div className={classes.title}>
          <h3>Trade</h3>
        </div>
        <div>
          <div className="form_fontrol">
            <span className="form_label">Available</span>
            <span className={`form_txt form_txt_${(theme === 'dark'?'dark':'light')}`}>1.22 <span className="unitTxt">BTC</span></span>
          </div>
          <div className="form_fontrol">
            <div className={setting_styles.form_fontrol_half}>
              <span className="form_label">From</span>
              <input className={`form_input form_input_${(theme === 'dark'?'dark':'light')} ${setting_styles.paddingRbig}`}></input>
              <Button
                className={`${setting_styles.loanAmountSel} ${(theme==='dark'?setting_styles.loanAmountSelDark:setting_styles.loanAmountSelLight)}`}
                id="loanAmount"
                aria-controls="loanAmountMenu"
                aria-haspopup="true"
                aria-expanded={openLoanAmount ? 'true' : undefined}
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
                className={`${(theme==='dark'?setting_styles.loanAmountMenu:"")}`}
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
                <MenuItem onClick={() => loanAmountClose('sol')}>
                  <Image
                    src="/img/coin/sol.png"
                    height={24} width={24} alt="SOL"
                  ></Image>
                  &nbsp;&nbsp;&nbsp;SOL
                </MenuItem>
              </Menu>
            </div>

            <div className={`${setting_styles.form_fontrol_mid} ${(theme === 'dark'?'dark':'light')}`}>
              <SyncAltIcon />
            </div>
            
            <div className={setting_styles.form_fontrol_half}>
              <span className="form_label">To (estimated)</span>
              <input className={`form_input form_input_${(theme === 'dark'?'dark':'light')} ${setting_styles.paddingRbig}`}></input>
              <Button
                className={`${setting_styles.loanAmountSel} ${(theme==='dark'?setting_styles.loanAmountSelDark:setting_styles.loanAmountSelLight)}`}
                id="colReq"
                aria-controls="colReqMenu"
                aria-haspopup="true"
                aria-expanded={openColReq ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={colReqOpen}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <Image
                  src="/img/coin/eth.png"
                  height={24} width={24} alt="ETH"
                ></Image>
                <span className={setting_styles.selTxt}>ETH</span>
              </Button>
              <Menu
                className={`${(theme==='dark'?setting_styles.loanAmountMenu:"")}`}
                id="colReqMenu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={colReq}
                open={openColReq}
                onClose={() => colReqClose('')}
              >
                <MenuItem onClick={() => colReqClose('btc')}>
                  <Image
                    src="/img/coin/btc.png"
                    height={24} width={24} alt="BTC"
                  ></Image>
                  &nbsp;&nbsp;&nbsp;BTC
                </MenuItem>
                <MenuItem onClick={() => colReqClose('eth')}>
                  <Image
                    src="/img/coin/eth.png"
                    height={24} width={24} alt="ETH"
                  ></Image>
                  &nbsp;&nbsp;&nbsp;ETH
                </MenuItem>
                <MenuItem onClick={() => colReqClose('usdc')}>
                  <Image
                    src="/img/coin/usdc.png"
                    height={24} width={24} alt="USDC"
                  ></Image>
                  &nbsp;&nbsp;&nbsp;USDC
                </MenuItem>
                <MenuItem onClick={() => colReqClose('sol')}>
                  <Image
                    src="/img/coin/sol.png"
                    height={24} width={24} alt="SOL"
                  ></Image>
                  &nbsp;&nbsp;&nbsp;SOL
                </MenuItem>
              </Menu>
            </div>
          </div>

          <hr className={`form_fontrol marginM20 ${setting_styles.spliter} ${(theme === 'dark'?'dark':'light')}`} />

          <div className="form_fontrol">
            <span className="form_label">Price</span>
            <span className={`form_txt form_txt_${(theme === 'dark'?'dark':'light')}`}>0.00194747 per ETH per BTC</span>
          </div>
          <div className={`${setting_styles.meta_table} ${(theme === 'dark'?'dark':'light')}`}>
            <div>
              <div>Minimum Received</div>
              <div>0.0</div>
            </div>
            <div>
              <div>Price Impact</div>
              <div>{`<0.01%`}</div>
            </div>
            <div>
              <div>Liquidity Provider Fee</div>
              <div>0.003 ETH</div>
            </div>
          </div>
          <div className={`saveSetting ${setting_styles.submitContainer}`}>
            {/* <Button
              className={"btn btn_"+(theme === 'dark'?'dark':'light')}
              type="button" color="primary"
              onClick={() => setTradeDoneModal(true)}
            >TRADE</Button> */}
            <Link href="/smarttrade">
            <Button
              className={"btn btn_"+(theme === 'dark'?'dark':'light')}
              type="button" color="primary"
            >TRADE</Button>
            </Link>
          </div>
        </div>

        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal,
          }}
          open={tradeDoneModal}
          keepMounted
          onClose={() => setTradeDoneModal(false)}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogContent
            id="classic-modal-slide-description"
            className={`${classes.modalBody} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
          >
            <div className="modalLogo">
              <Image
                src={"/img/setting/tradedone"+(theme==='dark'?"":"_l")+".png"}// Route of the image file
                height={109} // Desired size with correct aspect ratio
                width={109} // Desired size with correct aspect ratio
                alt="Success"
              />
            </div>
            <p className={`modalCenterTxt`}>Your exchange was completed successfully.</p>
          </DialogContent>
          <DialogActions
            className={`${classes.modalFooter} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
          >
            <Button
              className={"modalCenterBtn btn_"+(theme === 'dark'?'dark':'light')}
              onClick={() => setTradeDoneModal(false)}
              color="danger"
              simple
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
