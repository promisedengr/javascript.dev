import React from "react";

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

export default function Allchart() {
  const {theme} = useTheme();
  const [chatOpt, setChatOpt] = React.useState(1);
  const [wWidth, setWWidth] = React.useState(260);

  const chart_opt_cls = "flex-none mx-2 my-3 px-4 py-2 rounded-lg cursor-pointer border border-solid border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
  const chart_opt_sel = "bg-blue-700 text-white dark:bg-purple-900 dark:border-gray-900"

  const Chart = dynamic(
    () => import('react-apexcharts'),
    { ssr: false }
  )

  const optionL1 = {
    series: [{
      name: 'Total Interest Paid',
      color: "#3480FF",
      data: [15000, 20050, 14500, 16050, 15000, 16100, 13090, 21500, 14000, 16800, 12500]
    }, {
      name: 'Accrued Interest',
      color: "#5E5CE6",
      data: [9000, 15000, 10050, 12010, 9800, 19800, 11200, 14725, 10000, 15000, 10000]
    }],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        offsetX: -10,
        offsetY: 0,
        toolbar: {
          show: false
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      stroke: {
        curve: 'straight',
        width: 2
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      tooltip: {
        theme: (theme==='dark'?'dark':'light')
      },
      yaxis: {
        title: {
          show: false
        },
        labels: {
          style: {
            colors: "#8388A8"
          },
          formatter: function (val) {
            if(val >= 10000) {
              val /= 1000
              val += ' k'
            }
            return '£ ' + val;
          }
        }
      },
      xaxis: {
        type: 'category',
        categories: [
        '2021-09-11', '2021-09-12', '2021-09-13', '2021-09-14', '2021-09-15', '2021-09-16',
        '2021-09-17', '2021-09-18', '2021-09-19', '2021-09-20', '2021-09-21',
        ],
        tickPlacement: 'on',
        labels: {
          style: {
            colors: "#8388A8"
          },
          formatter: function (val) {
            var date = new Date(val)
            return date.getDate();
          }
        }
      }
    }
  }

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
    var graph_h = (window.innerWidth - 126 - 344 - 40) * 3 / 5 * 460 / 550
    setWWidth(graph_h)
  }, [])
  if (!mounted) return null

  return (
    <div>
      <div className={`text-xl font-medium`}>Statistics</div>
      <div className={`flex`}>
        <div
          className={`${chart_opt_cls} ${chatOpt===1?chart_opt_sel:''}`}
          onClick={(event) => setChatOpt(1)}
        >Day</div>
        <div
          className={`${chart_opt_cls} ${chatOpt===2?chart_opt_sel:''}`}
          onClick={(event) => setChatOpt(2)}
        >Week</div>
        <div
          className={`${chart_opt_cls} ${chatOpt===3?chart_opt_sel:''}`}
          onClick={(event) => setChatOpt(3)}
        >Month</div>
        <div
          className={`${chart_opt_cls} ${chatOpt===4?chart_opt_sel:''}`}
          onClick={(event) => setChatOpt(4)}
        >Year</div>
      </div>
      <div className={`-mb-2`}>
        <div className="border-solid border-gray-300 dark:border-gray-700">
            <Chart
              className="mx-auto"
              options={optionL1.options}
              series={optionL1.series}
              height={wWidth}
              type={`area`}
            />
        </div>
      </div>
    </div>
  );
}
