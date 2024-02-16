import React from "react";

import { useTheme } from 'next-themes'

import http from "../http"

export default function Transaction() {
  const {theme} = useTheme();

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return (
    <div className={`${theme==='dark' ? 'dark' : 'light'}`}>
      <div className={`text-xl font-medium mb-6`}>Fieonix Fee’s</div>

      <div className={`flex`}>
        <div className={`flex-grow p-1`}>Dex Trade Fee Rate:</div>
        <div className={`rounded-2xl py-1 px-3 border border-gray-400 dark:border-gray-600`}>0.2%</div>
      </div>
      <hr className={`my-4 border-gray-400 dark:border-gray-600`}></hr>
      <div className={`flex`}>
        <div className={`flex-grow p-1`}>Withdrawal Fee Rate:</div>
        <div className={`rounded-2xl py-1 px-3 border border-gray-400 dark:border-gray-600`}>0.2%</div>
      </div>
      <hr className={`my-4 border-gray-400 dark:border-gray-600`}></hr>
      <div className={`flex`}>
        <div className={`flex-grow p-1`}>Early Pension Account Withdrawal Fee:</div>
        <div className={`rounded-2xl py-1 px-3 border border-gray-400 dark:border-gray-600`}>1.0%</div>
      </div>
      <hr className={`my-4 border-gray-400 dark:border-gray-600`}></hr>
      <div className={`flex`}>
        <div className={`flex-grow p-1`}>Retail Client Annual Management Fee:</div>
        <div className={`rounded-2xl py-1 px-3 border border-gray-400 dark:border-gray-600`}>0.4%</div>
      </div>

    </div>
  );
}
