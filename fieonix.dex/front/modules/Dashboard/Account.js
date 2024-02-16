import React from "react";

import setting_styles from './Dashboard.module.css'

import { useTheme } from 'next-themes'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Collapse } from '@mui/material';
import Image from 'next/image'

import { useSelector } from 'react-redux'
import { getiBal, getpBal, getRate, getiApy, getpApy } from '../NavbalanceSlice';
import { _formatMoney } from "../formater";

export default function Account() {
  const iBal = useSelector(getiBal)
  const pBal = useSelector(getpBal)
  const iApy = useSelector(getiApy)
  const pApy = useSelector(getpApy)
  const bRate = useSelector(getRate)
  const {theme} = useTheme();

  const [openInterestAccount, setOpenInterestAccount] = React.useState(false);
  const [openPensionAccount, setOpenPensionAccount] = React.useState(false);

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={`${setting_styles.block_area} ${theme==='dark' ? 'dark' : 'light'}`}>
      <div className={`text-xl font-medium`}>
        Accounts{` `}
        <ErrorOutlineIcon
          className={`${setting_styles.info_icon}`}
        ></ErrorOutlineIcon>
      </div>
      <div className={`${setting_styles.account_interest_area}`}>
        <div
          onClick={() => setOpenInterestAccount(!openInterestAccount)}
          aria-controls="interest_account"
          aria-expanded={openInterestAccount}
          className={`${setting_styles.account_area_header} cursor-pointer`}
        >
          <div>
            <Image
              src={"/img/dashboard/interest.png"}
              height={30}
              width={30}
              alt="Interest"
            ></Image>
          </div>
          <div>
            <span>Fieonix Interest Account</span>
            <span className={`font-medium`}>£ {_formatMoney(iBal.btc*bRate.btc+iBal.eth*bRate.eth+iBal.sol*bRate.sol+iBal.usdc*bRate.usdc, 2)}</span>
          </div>
          <div>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <Collapse in={openInterestAccount}>
          <div id="interest_account" className={setting_styles.collaped_area}>
            <div className={setting_styles.total_bal_area}>
              <div>
                <span>Total Portfolio</span>
                <span><span className={setting_styles.total_bal_unit}>£ </span>{_formatMoney(iBal.btc*bRate.btc+iBal.eth*bRate.eth+iBal.sol*bRate.sol+iBal.usdc*bRate.usdc, 2)}</span>
              </div>
              <div>
                <span>Total Interest Paid</span>
                <span><span className={setting_styles.total_bal_unit}>£ </span>0</span>
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
                  <div>{iBal.btc}</div>
                </div>
                <div>
                  <div>BTC</div>
                  <div className={`${iBal.btc>0?setting_styles.activeAPY:''}`}>+{iApy.btc}% APY</div>
                  <div className={`green text-right`}>+8.12%</div>
                  <div>£ {_formatMoney(iBal.btc*bRate.btc, 2)}</div>
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
                  <div>{iBal.eth}</div>
                </div>
                <div>
                  <div>ETH</div>
                  <div className={`${iBal.eth>0?setting_styles.activeAPY:''}`}>+{iApy.eth}% APY</div>
                  <div className={`green text-right`}>+3.51%</div>
                  <div>£ {_formatMoney(iBal.eth*bRate.eth, 2)}</div>
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
                  <div>{iBal.usdc}</div>
                </div>
                <div>
                  <div>USDC</div>
                  <div className={`${iBal.usdc>0?setting_styles.activeAPY:''}`}>+{iApy.usdc}% APY</div>
                  <div className={`red text-right`}>-0.04%</div>
                  <div>£ {_formatMoney(iBal.usdc*bRate.usdc, 2)}</div>
                </div>
              </div>
            </div>
            <div className={setting_styles.total_coin_bal}>
              <div className={setting_styles.marginR10}>
                <Image
                  src={"/img/coin/sol.png"}
                  height={24}
                  width={24}
                  alt="SOL"
                ></Image>
              </div>
              <div className={setting_styles.total_coin_meta}>
                <div>
                  <div>Solana</div>
                  <div>{iBal.sol}</div>
                </div>
                <div>
                  <div>SOL</div>
                  <div className={`${iBal.sol>0?setting_styles.activeAPY:''}`}>+{iApy.sol}% APY</div>
                  <div className={`green text-right`}>+0.14%</div>
                  <div>£ {_formatMoney(iBal.sol*bRate.sol, 2)}</div>
                </div>
              </div>
            </div>
          </div>
        </Collapse>           
      </div>

      <div className={`${setting_styles.account_pension_area} ${theme==='dark' ? 'dark' : 'light'}`}>
        <div
          onClick={() => setOpenPensionAccount(!openPensionAccount)}
          aria-controls="pension_account"
          aria-expanded={openPensionAccount}
          className={`${setting_styles.account_area_header} cursor-pointer`}
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
            <span className={`font-medium`}>£ {_formatMoney(pBal.btc*pBal.btc+pBal.eth*bRate.eth+pBal.sol*bRate.sol+pBal.usdc*bRate.usdc, 2)}</span>
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
                <span><span className={setting_styles.total_bal_unit}>£ </span>{_formatMoney(pBal.btc*pBal.btc+pBal.eth*bRate.eth+pBal.sol*bRate.sol+pBal.usdc*bRate.usdc, 2)}</span>
              </div>
              <div>
                <span>Total Interest Paid</span>
                <span><span className={setting_styles.total_bal_unit}>£ </span>0</span>
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
                  <div>{pBal.btc}</div>
                </div>
                <div>
                  <div>BTC</div>
                  <div className={`${pBal.btc>0?setting_styles.activeAPY:''}`}>+{pApy.btc}% APY</div>
                  <div className={`green text-right`}>+8.12%</div>
                  <div>£ {_formatMoney(pBal.btc*bRate.btc, 2)}</div>
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
                  <div>{pBal.eth}</div>
                </div>
                <div>
                  <div>ETH</div>
                  <div className={`${pBal.eth>0?setting_styles.activeAPY:''}`}>+{pApy.eth}% APY</div>
                  <div className={`green text-right`}>+3.51%</div>
                  <div>£ {_formatMoney(pBal.eth*bRate.eth, 2)}</div>
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
                  <div>{pBal.usdc}</div>
                </div>
                <div>
                  <div>USDC</div>
                  <div className={`${pBal.usdc>0?setting_styles.activeAPY:''}`}>+{pApy.usdc}% APY</div>
                  <div className={`red text-right`}>-0.04%</div>
                  <div>£ {_formatMoney(pBal.usdc*bRate.usdc, 2)}</div>
                </div>
              </div>
            </div>
            <div className={setting_styles.total_coin_bal}>
              <div className={setting_styles.marginR10}>
                <Image
                  src={"/img/coin/sol.png"}
                  height={24}
                  width={24}
                  alt="SOL"
                ></Image>
              </div>
              <div className={setting_styles.total_coin_meta}>
                <div>
                  <div>Solana</div>
                  <div>{pBal.sol}</div>
                </div>
                <div>
                  <div>SOL</div>
                  <div className={`${pBal.sol>0?setting_styles.activeAPY:''}`}>+{pApy.sol}% APY</div>
                  <div className={`green text-right`}>+0.14%</div>
                  <div>£ {_formatMoney(pBal.sol*bRate.sol, 2)}</div>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>

    </div>
  );
}
