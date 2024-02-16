import React from "react";

import setting_styles from './Dashboard.module.css'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import Image from 'next/image'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Bar, Doughnut } from 'react-chartjs-2';

export default function ThreeChart() {
  const {theme} = useTheme();
  const [chatOpt, setChatOpt] = React.useState(1);
  const [chartType, setChartType] = React.useState(1);
  const [wWidth, setWWidth] = React.useState(260);
  const [wOffset, setWOffset] = React.useState(80);
  const [hOffset, setHOffset] = React.useState(20);

  const chart_opt_cls = "flex-none mx-2 my-3 px-4 py-2 rounded-lg cursor-pointer border border-solid border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
  const chart_opt_sel = "bg-blue-700 text-white dark:bg-purple-900 dark:border-gray-900"
  const chart_type_cls = "flex-none mx-2 my-3 w-10 h-10 rounded-xl cursor-pointer"

  const Chart = dynamic(
    () => import('react-apexcharts'),
    { ssr: false }
  )
  
  // const optionL2 = {
  //   series: [{
  //     name: 'Interest',
  //     color: "#3480FF",
  //     data: [1500, 700, 2250, -2800, -1400, -600, -800, -1700, -1500, -700, 900].map(value=>Math.abs(value)*-1)
  //   }, {
  //     name: 'Pension',
  //     color: "#5E5CE6",
  //     data: [1500, 2800, 1400, -1500, -1500, -1500, -1400, -2800, -1400, -2800, 1600].map(value=>Math.abs(value))
  //   }],
  //   options: {
  //     chart: {
  //       type: 'column',
  //       stacked: true,
  //       offsetX: -10,
  //       offsetY: 0,
  //       toolbar: {
  //         show: false
  //       }
  //     },
  //     plotOptions: {
  //       bar: {
  //         columnWidth: '40%',
  //         s̶t̶a̶r̶t̶i̶n̶g̶S̶h̶a̶p̶e̶: 'rounded',
  //         e̶n̶d̶i̶n̶g̶S̶h̶a̶p̶e̶: 'rounded',
  //         borderRadius: 10
  //       }
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     legend: {
  //       show: false
  //     },
  //     tooltip: {
  //       theme: (theme==='dark'?'dark':'light')
  //     },
  //     yaxis: {
  //       title: {
  //         show: false
  //       },
  //       labels: {
  //         style: {
  //           colors: "#8388A8"
  //         }
  //       }
  //     },
  //     xaxis: {
  //       type: 'category',
  //       categories: [
  //       '2021-09-11', '2021-09-12', '2021-09-13', '2021-09-14', '2021-09-15', '2021-09-16',
  //       '2021-09-17', '2021-09-18', '2021-09-19', '2021-09-20', '2021-09-21',
  //       ],
  //       tickPlacement: 'on',
  //       labels: {
  //         style: {
  //           colors: "#8388A8"
  //         },
  //         formatter: function (val) {
  //           var date = new Date(val)
  //           return date.getDate();
  //         }
  //       }
  //     }
  //   }
  // }

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

  const optionL3 = {
    series: [16, 50],
    options: {
      chart: {
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          offsetX: wOffset,
          offsetY: hOffset,
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
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Total Interest", "Total Pension "],
      colors: ["#3480FF", "#5E5CE6"]
    }
  };

  const optionR = {      
    series: [75, 25],
    options: {
      chart: {
        type: 'donut'
      },
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
            labels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                show: true,
                fontSize: '24px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: (theme==='dark'?'#F9FAFF':'#070A20'),
              },
              total: {
                showAlways: true,
                show: true,
                formatter: function (w) {
                  return '+15%'
                }
              }
            }
          }
        }
      },
      stroke: {
        lineCap: "round",
        width: 0
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      colors: ["#3480FF", "#5E5CE6"]
    },
  };

  const optionL2 = {
    labels: [ '11', '12', '13', '14', '15', '16',
              '17', '18', '19', '20', '21'],
    datasets: [
      {
        label: 'Interest',
        backgroundColor: '#3480FF',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 0,
        borderRadius: 10,
        borderSkipped: false,
        maxBarThickness: 18,
        data: [1500, 700, 2250, -2800, -1400, -600, -800, -1700, -1500, -700, 900].map(value=>Math.abs(value)*-1)
      },
      {
        label: 'Pension',
        backgroundColor: '#5E5CE6',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 0,
        borderRadius: 10,
        borderSkipped: false,
        maxBarThickness: 18,
        data: [1500, 2800, 1400, -1500, -1500, -1500, -1400, -2800, -1400, -2800, 1600].map(value=>Math.abs(value))
      }
    ]
  }


  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
    var graph_h = (window.innerWidth - 126 - 344 - 40) * 3 / 5 * 260 / 550
    var offsetW = (window.innerWidth - 126 - 344 - 40) * 3 / 5 * 80 / 550
    var offsetH = (window.innerWidth - 126 - 344 - 40) * 3 / 5 * 20 / 550
    setWWidth(graph_h)
    setWOffset(offsetW)
    setHOffset(offsetH)
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
        <div className={`flex-grow`}></div>
        <div
          className={`${chart_type_cls}`}
          onClick={(event) => setChartType(1)}
        >
          <Image
            src={`/img/dashboard/grp_line_${theme==='dark'?'d':'l'}${chartType===1?'_s':''}.png`}
            width={42} height={42} alt={`Bar`}
          ></Image>
        </div>
        <div
          className={`${chart_type_cls}`}
          onClick={(event) => setChartType(2)}
        >
          <Image
            src={`/img/dashboard/grp_bar_${theme==='dark'?'d':'l'}${chartType===2?'_s':''}.png`}
            width={42} height={42} alt={`Bar`}
          ></Image>
        </div>
        <div
          className={`${chart_type_cls}`}
          onClick={(event) => setChartType(3)}
        >
          <Image
            src={`/img/dashboard/grp_circle_${theme==='dark'?'d':'l'}${chartType===3?'_s':''}.png`}
            width={42} height={42} alt={`Bar`}
          ></Image>
        </div>
      </div>
      <div className={`grid grid-cols-5 -mb-4`}>
        <div className="col-span-3 border-t border-r border-solid border-gray-300 dark:border-gray-700">
            {chartType===3 &&
              <div className={`absolute top-1/4 left-5`}>
                <div className={`flex`}>
                  <div className={`w-2 h-2 mr-4 mt-2 rounded-md bg-blue-500`}></div>
                  <div className={`text-lg font-medium`}><span className={`text-sm`}>£</span>{` `}825.89</div>
                </div>
                <div className={`flex`}>
                  <div className={`w-6`}></div>
                  <div className={`text-sm text-gray-500 dark:text-gray-400`}>Total Interest</div>
                </div>
                <div className={`flex mt-4`}>
                  <div className={`w-2 h-2 mr-4 mt-2 rounded-md bg-indigo-700`}></div>
                  <div className={`text-lg font-medium`}><span className={`text-sm`}>£</span>{` `}20.125.00</div>
                </div>
                <div className={`flex`}>
                  <div className={`w-6`}></div>
                  <div className={`text-sm text-gray-500 dark:text-gray-400`}>Total Pension </div>
                </div>
              </div>
            }
            {chartType===2 &&
              <Bar
                data={optionL2}
                options={{
                  title:{
                    display:false,
                    text:'Average Rainfall per month',
                    fontSize:20
                  },
                  plugins: {
                    legend: {
                        display: false
                    }
                  },
                  scales: {
                    x: {
                      stacked: true,
                      grid: {
                        display: false
                      }
                    },
                    y: {
                      stacked: true,
                      grid: {
                        drawBorder: false,
                        color: function(context) {
                          return theme==='dark'?'#333B6A':'#C6C8D7';
                        },
                        borderDash: [5]
                      }
                    }
                  }
                }}
              />
            }
            {(chartType===1||chartType===3) &&
              <Chart
                className="mx-auto"
                options={(chartType===1?optionL1.options:optionL3.options)}
                series={(chartType===1?optionL1.series:optionL3.series)}
                height={wWidth}
                type={`${chartType===1?'area':"radialBar"}`}
              />
            }
        </div>
        <div className="col-span-2 border-t border-solid border-gray-300 dark:border-gray-700">
          <div className={`w-6/12 mx-auto py-2`}>
            {/* <Chart
              className="mx-auto"
              options={optionR.options}
              series={optionR.series}
              type="donut"
            /> */}
            <div className={`relative  left-1/2 -ml-6 text-2xl font-medium`} style={{top:(wWidth/2 - 24)+'px'}}>+15%</div>
            <Doughnut
              data={{
                maintainAspectRatio: false,
                responsive: false,
                labels: ["Accrued Interest", "Total Interest Paid"],
                datasets: [
                  {
                    data: [75, 25],
                    backgroundColor: ['#3480FF', '#5E5CE6'],
                    hoverBackgroundColor: ['#4490FF', '#6E6CF6'],
                    borderRadius:10,
                    spacing:2
                  }
                ]
              }}
              options={{
                plugins: {
                  legend: {
                      display: false
                  },
                },
                cutout: '80%',
                elements: {
                  arc: {
                    borderWidth: 0
                  }
                }
              }}
            />
          </div>
          <div className={`flex`}>
            <div className={`w-1/2 pl-4 pr-2`}>
              <div className={`flex`}>
                <div className={`w-2 h-5 mt-1 mr-4 rounded-md bg-blue-500`}></div>
                <div className={`text-lg font-medium`}><span className={`text-sm`}>£</span>{` `}2,725.89</div>
              </div>
              <div className={`flex`}>
                <div className={`w-6`}></div>
                <div className={`text-sm text-gray-500 dark:text-gray-400`}>Total Interest Paid</div>
                <div className={`-mt-1`}>
                  <KeyboardArrowUpIcon
                    className={`text-blue-500`}
                  />
                </div>
              </div>
            </div>
            <div className={`w-1/2 pl-2 pr-4`}>
              <div className={`flex`}>
                <div className={`w-2 h-5 mt-1 mr-4 rounded-md bg-indigo-700`}></div>
                <div className={`text-lg font-medium`}><span className={`text-sm`}>£</span>{` `}29,725.89</div>
              </div>
              <div className={`flex`}>
                <div className={`w-6`}></div>
                <div className={`text-sm text-gray-500 dark:text-gray-400`}>Accrued Interest</div>
                <div className={`-mt-1`}>
                  <KeyboardArrowDownIcon
                    className={`text-indigo-700`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
