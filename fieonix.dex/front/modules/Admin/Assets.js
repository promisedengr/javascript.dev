import React from "react";

import setting_styles from './Admin.module.css'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import Image from 'next/image'

import { useSelector } from 'react-redux'
import { getiBal, getpBal, getRate } from '../NavbalanceSlice';
import { _formatMoney } from "../formater";

export default function Assets() {
  const iBal = useSelector(getiBal)
  const pBal = useSelector(getpBal)
  const bRate = useSelector(getRate)

  const {theme} = useTheme();

  const Chart = dynamic(
    () => import('react-apexcharts'),
    { ssr: false }
  )

  var options1 = {
    series: [100],
    options: {
      chart: {
        height: 200,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          offsetX: -47,
          offsetY: -16,
          hollow: {
            size: "60%"
          },
          track: {
            background: (theme==='dark'?'#FA5349':'#FA5349'),
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              fontSize: '14px',
              fontWeight: 600,
              offsetY: 8,
              color:"#FA5349",
              formatter: function (w) {
                return '£80,002'
              }
            }
          }
        }
      },
      stroke: {
        lineCap: "round",
      },
      labels: [""],
      colors: ["#FA5349"]
    }
  };

  var options2 = {
    series: [100],
    options: {
      chart: {
        height: 200,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          offsetX:-47,
          offsetY:-16,
          hollow: {
            size: "60%"
          },
          track: {
            background: (theme==='dark'?'#3AC15B':'#3AC15B'),
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              fontSize: '14px',
              fontWeight: 600,
              offsetY: 8,
              color:"#3AC15B",
              formatter: function (w) {
                return '£1,000,085'
              }
            }
          }
        }
      },
      stroke: {
        lineCap: "round",
      },
      labels: [""],
      colors: ["#3AC15B"]
    }
  };

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={`${setting_styles.block_area} ${theme==='dark' ? 'dark' : 'light'}`}>
      <div className={`text-xl font-medium`}>
        Total Assets
      </div>

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
            <div className={`green text-right`}>+0.14%</div>
            <div>£ {_formatMoney(iBal.sol*bRate.sol, 2)}</div>
          </div>
        </div>
      </div>

      <div className={`text-base font-medium mt-8`}>
        Fieonix Accounts
      </div>
      <div className={`flex px-6 -ml-8 overflow-x-hidden`}>
        <div className={`w-1/2 p-2 m-2 rounded-2xl h-48 bg-gray-200 dark:bg-gray-900`}>
          <Chart
            className="mx-auto"
            options={options1.options}
            series={options1.series}
            type="radialBar"
            width={190}
          />
          <div className={`text-center p-2 text-xs -mt-3`}>
            <div className={`text-sm text-gray-400 dark:text-gray-500`}>Total Interest Paid Out</div>
          </div>
        </div>
        <div className={`w-1/2 p-2 m-2 rounded-2xl h-48 bg-gray-200 dark:bg-gray-900`}>
          <Chart
            className="mx-auto"
            options={options2.options}
            series={options2.series}
            type="radialBar"
            width={190}
          />
          <div className={`text-center py-2 px-0 -mt-3 -mx-4`}>
            <div className={`text-sm text-gray-400 dark:text-gray-500`}>Total Account Balance</div>
          </div>
        </div>
      </div>

    </div>
  );
}
