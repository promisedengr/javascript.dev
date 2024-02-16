import React from "react";

import setting_styles from './Dashboard.module.css'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'


export default function SubChart() {
  const {theme} = useTheme();

  const Chart = dynamic(
    () => import('react-apexcharts'),
    { ssr: false }
  )

  var options1 = {
    series: [75],
    options: {
      chart: {
        height: 200,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          offsetX:-50,
          offsetY:-10,
          hollow: {
            size: "50%"
          },
          track: {
            background: (theme==='dark'?'#2C3360':'#D6D7E1'),
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              fontSize: '18px',
              fontWeight: 600,
              offsetY: 8,
              color:"#3480FF",
              formatter: function (w) {
                return '£800'
              }
            }
          }
        }
      },
      stroke: {
        lineCap: "round",
      },
      labels: [""],
      colors: ["#3480FF"]
    }
  };

  var options2 = {
    series: [49],
    options: {
      chart: {
        height: 200,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          offsetX:-50,
          offsetY:-10,
          hollow: {
            size: "50%"
          },
          track: {
            background: (theme==='dark'?'#2C3360':'#D6D7E1'),
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              fontSize: '18px',
              fontWeight: 600,
              offsetY: 8,
              color:"#5E5CE6"
            }
          }
        }
      },
      stroke: {
        lineCap: "round",
      },
      labels: [""],
      colors: ["#5E5CE6"]
    }
  };

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <>
      <div className={`flex pr-4 overflow-x-hidden`}>
        <div className={`w-1/2 p-4 mr-2 rounded-2xl h-56 ${setting_styles.h_block_area} ${theme==='dark' ? 'dark' : 'light'}`}>
          <Chart
            className="mx-auto"
            options={options1.options}
            series={options1.series}
            type="radialBar"
            width={200}
          />
          <div className={`text-center p-2 text-xs -mt-3`}>
            Total Interest Paid
          </div>
        </div>
        <div className={`w-1/2 p-4 ml-2 rounded-2xl h-56 ${setting_styles.h_block_area} ${theme==='dark' ? 'dark' : 'light'}`}>
          <Chart
            className="mx-auto"
            options={options2.options}
            series={options2.series}
            type="radialBar"
            width={200}
          />
          <div className={`text-center py-2 px-0 -mt-3 -mx-4`}>
            <div className={`text-sm`}>£939.44 /</div>
            <div className={`text-sm text-gray-400 dark:text-gray-500`}>60,000</div>
            <div className={`text-xs`}>Accrued Interest</div>
          </div>
        </div>
      </div>
    </>
  );
}
