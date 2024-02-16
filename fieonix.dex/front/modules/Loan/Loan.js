import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);

import Button from '../../components/CustomButtons/Button.js';
import setting_styles from './Loan.module.css'

import { useTheme } from 'next-themes'


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image'


export default function Setting() {
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

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={classes.container}>
      <div id="navigation-pills">
        <div className={classes.title}>
          <h3>Loan</h3>
        </div>
        <div>
          <div className={`form_control`}>
            <div className="form_fontrol">
              <span className="form_label">Enter desired loan amount & currency</span>
              <input className={`form_input form_grey form_input_${(theme === 'dark'?'dark':'light')} ${setting_styles.paddingLbig}`}></input>
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
                  src="/img/coin/usdc.png"
                  height={24} width={24} alt="USDC"
                ></Image>
                <span className={setting_styles.selTxt}>USDC</span>
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
              </Menu>
            </div>
            <div className="form_fontrol marginM28">
              <span className="form_label">Loan term in months</span>
              <div className={`input_${(theme === 'dark'?'dark':'light')} ${setting_styles.term_container}`}>
                <input id='loan_term_6' name='loan_term' type='radio' value='6' />
                <label for='loan_term_6'>6</label>
                <input id='loan_term_12' name='loan_term' type='radio' value='12' />
                <label for='loan_term_12'>12</label>
                <input id='loan_term_18' name='loan_term' type='radio' value='18' />
                <label for='loan_term_18'>18</label>
                <input id='loan_term_24' name='loan_term' type='radio' value='24' />
                <label for='loan_term_24'>24</label>
                <input id='loan_term_36' name='loan_term' type='radio' value='36' />
                <label for='loan_term_36'>36</label>
              </div>
            </div>
            <div className="form_fontrol">
              <span className="form_label">Loan to value (LTV)</span>
              <div className={`form_input form_input_${(theme === 'dark'?'dark':'light')} ${setting_styles.ltv_container}`}>
                <input id='loan_ltv_25' name='loan_ltv' type='radio' value='25' />
                <label for='loan_ltv_25'>25%</label>
                <input id='loan_ltv_33' name='loan_ltv' type='radio' value='33' />
                <label for='loan_ltv_33'>33%</label>
                <input id='loan_ltv_50' name='loan_ltv' type='radio' value='50' />
                <label for='loan_ltv_50'>50%</label>
              </div>
            </div>
            <div className="form_fontrol">
              <span className="form_label">Collateral required</span>
              <input className={`form_input form_grey form_input_${(theme === 'dark'?'dark':'light')} ${setting_styles.paddingLbig}`}></input>
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
                  src="/img/coin/btc.png"
                  height={24} width={24} alt="BTC"
                ></Image>
                <span className={setting_styles.selTxt}>BTC</span>
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
              </Menu>
            </div>
            <div className="form_fontrol marginM28">
              <span className="form_label">Total interest when paid in cash</span>
              <input className={`form_input form_grey form_input_${(theme === 'dark'?'dark':'light')} ${setting_styles.total_interest}`}></input>
              <span className={setting_styles.total_interest_amount}>Amount</span>
              <span className={setting_styles.total_interest_unit}>BTC</span>
            </div>
            <div className={`${setting_styles.meta_table} ${(theme === 'dark'?'dark':'light')}`}>
              <div>
                <div>APR</div>
                <div>6.95%</div>
              </div>
              <div>
                <div>Cost Month</div>
                <div>£57.92</div>
              </div>
            </div>
            <div className={`saveSetting ${setting_styles.submitContainer}`}>
              <Button
                className={"btn btn_"+(theme === 'dark'?'dark':'light')}
                type="button" color="primary"
              >APPLY</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
