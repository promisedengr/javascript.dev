import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);

import Button from '../../components/CustomButtons/Button.js';
import setting_styles from './Trade.module.css'

import { useTheme } from 'next-themes'


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
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Image from 'next/image'


export default function SmartTrade() {
  const classes = useStyles();
  const {theme} = useTheme();

  const [smartModal, setSmartModal] = React.useState(false);
  const [tradeDoneModal, setTradeDoneModal] = React.useState(false);

  const [openPensionAccount, setOpenPensionAccount] = React.useState(false);

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={classes.container}>
      <div id="navigation-pills">
        <div className={classes.title}>
          <h3>Smart Trade</h3>
        </div>
        <div>
          <div className="form_fontrol">
            <span className="form_label">Available</span>
            <span className={`form_txt form_txt_${(theme === 'dark'?'dark':'light')}`}>1.22 <span class="unitTxt">BTC</span></span>
          </div>

          <div className="form_fontrol">
            <span className="form_label">From</span>
            <div className={setting_styles.coin_table}>
              <div>
                <Image
                  src="/img/coin/btc.png"
                  height={39} width={39} alt="BTC"
                ></Image>
              </div>
              <div>
                <span>BTC</span>
                <span>Bitcoin</span>
              </div>
              <div>0.002269</div>
            </div>
          </div>

          <div className="form_fontrol">
            <hr className={`${setting_styles.spliter} ${(theme === 'dark'?'dark':'light')}`} />
            <div className={`${setting_styles.v_swap_icon} ${(theme === 'dark'?'dark':'light')}`}>
              <SwapVertIcon />
            </div>
          </div>

          <div className="form_fontrol marginM20">
            <span className="form_label">To (estimated)</span>
            <div className={setting_styles.coin_table}>
              <div>
                <Image
                  src="/img/coin/eth.png"
                  height={39} width={39} alt="ETH"
                ></Image>
              </div>
              <div>
                <span>ETH</span>
                <span>Ethereum</span>
              </div>
              <div>0.057572</div>
            </div>
          </div>
          
          <div className="form_fontrol">
            <hr className={`${setting_styles.spliter} ${(theme === 'dark'?'dark':'light')}`} />
          </div>

          <div className="form_fontrol">
            <span className="form_label">Live Rate</span>
            <span className={`form_txt form_txt_colored`}>1 BTC = 25.37 ETH</span>
          </div>
          <div className={`${setting_styles.tabled_form}`}>
            <div>
              <div>Service Fee</div>
              <div>£0.99</div>
            </div>
            <div>
              <div>GBP</div>
              <div>0.0005757 ETH</div>
            </div>
          </div>
          <div className={`${setting_styles.tabled_form}`}>
            <div>
              <div>Estimated Amount</div>
              <div>£98.84</div>
            </div>
            <div>
              <div>GBP</div>
              <div>0.0005757 ETH</div>
            </div>
          </div>
          <div className={`saveSetting ${setting_styles.submitContainer}`}>
            <Button
              className={"btn btn_"+(theme === 'dark'?'dark':'light')}
              type="button" color="primary"
              onClick={() => setSmartModal(true)}
            >EXCHANGE</Button>
          </div>
        </div>

        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal,
          }}
          open={smartModal}
          keepMounted
          onClose={() => setSmartModal(false)}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            disableTypography
            className={`${classes.modalHeader} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
          >
            <h3 className={classes.modalTitle}>Buy</h3>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={`${classes.modalBody} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
          >
            <div
              className={`${setting_styles.block_area}`}
            >
              <div
                className={`${setting_styles.notice_txt}`}
              >Select which account for your deposit.</div>
              <div
                className={`${setting_styles.notice_meta}`}
              >Our provider will send <span>Bitcoin</span> to your chosen account after you complete payment</div>
            </div>
            
            <div className={`${setting_styles.account_area} ${theme==='dark' ? 'dark' : 'light'}`}>
              <div
                onClick={() => setOpenPensionAccount(!openPensionAccount)}
                aria-controls="pension_account"
                aria-expanded={openPensionAccount}
                className={`${setting_styles.account_area_header} ${theme==='dark' ? 'dark' : 'light'}`}
              >
                <div>
                  <Image
                    src={"/img/dashboard/pension.png"}
                    height={30}
                    width={30}
                    alt="Pension"
                  ></Image>
                </div>
                <div>
                  <span>Fieonix Pension Account</span>
                  <span>£29,725.89</span>
                </div>
                <div>
                  <KeyboardArrowDownIcon />
                </div>
              </div>
              <Collapse in={openPensionAccount}>
                <div id="pension_account" className={setting_styles.collaped_area}>
                  <div className={setting_styles.total_bal_area}>
                    <div>
                      <span>Total Portfolio</span>
                      <span><span className={setting_styles.total_bal_unit}>£</span>12,401.68</span>
                    </div>
                    <div>
                      <span>Total Interest Paid</span>
                      <span><span className={setting_styles.total_bal_unit}>£</span>800.00</span>
                    </div>
                  </div>
                  <hr />
                  <div className={setting_styles.total_coin_bal}>
                    <div className={setting_styles.marginR10}>
                      <Image
                        src={"/img/coin/btc.png"}
                        height={24}
                        width={24}
                        alt="BTC"
                      ></Image>
                    </div>
                    <div className={setting_styles.total_coin_meta}>
                      <div>
                        <div>Bitcoin</div>
                        <div>0,000456</div>
                      </div>
                      <div>
                        <div>BTC</div>
                        <div>£5,031.00</div>
                      </div>
                    </div>
                  </div>
                  <div className={setting_styles.total_coin_bal}>
                    <div className={setting_styles.marginR10}>
                      <Image
                        src={"/img/coin/eth.png"}
                        height={24}
                        width={24}
                        alt="ETH"
                      ></Image>
                    </div>
                    <div className={setting_styles.total_coin_meta}>
                      <div>
                        <div>Ethereum</div>
                        <div>1,0045</div>
                      </div>
                      <div>
                        <div>ETH</div>
                        <div>£2,031.00</div>
                      </div>
                    </div>
                  </div>
                  <div className={setting_styles.total_coin_bal}>
                    <div className={setting_styles.marginR10}>
                      <Image
                        src={"/img/coin/usdc.png"}
                        height={24}
                        width={24}
                        alt="USDC"
                      ></Image>
                    </div>
                    <div className={setting_styles.total_coin_meta}>
                      <div>
                        <div>USD Coin</div>
                        <div>234,76</div>
                      </div>
                      <div>
                        <div>USDC</div>
                        <div>£631.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
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
              className={`${setting_styles.block_area}`}
            >
              <Checkbox
                inputProps={{ 'aria-label': 'controlled' }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
              />
              <div className={setting_styles.agree_txt}>
                I agree with Terms of Use, Privacy Policy and AML/KYC.
              </div>
            </div>
          </DialogContent>
          <DialogActions
            className={`${classes.modalFooter} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
          >
            <Button
              className={"btn btn_outline_primary_"+(theme === 'dark'?'dark':'light')}
              type="button" color="primary"
              onClick={() => setSmartModal(false)}
            >CANCEL</Button>
            <Button
              className={"btn btn_"+(theme === 'dark'?'dark':'light')}
              type="button" color="primary"
              onClick={() => setTradeDoneModal(true)}
            >GO TO PAYMENT</Button>
          </DialogActions>
        </Dialog>

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
