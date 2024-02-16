import { RoundPanel } from '../components/Panels/RoundPanel';

import { Navbar } from '../modules/Navbar';
import Sidebar from '../modules/Sidebar';
import ThreeChart from '../modules/Dashboard/ThreeChart'
import Transaction from '../modules/Dashboard/Transaction'
import Send from '../modules/Dashboard/Send'
import Account from '../modules/Dashboard/Account'
import Wallet from '../modules/Dashboard/Wallet'
import SubChart from '../modules/Dashboard/SubChart'

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes'

export default function DashBoard() {
    const {theme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return(
        <div className="flex h-screen flex-col">
            <Navbar>
            </Navbar>
            <div className="mycontainer flex">
                <Sidebar></Sidebar>
                <div className="flex-shrink-1 py-6 w-full">
                    <RoundPanel className="w-full">
                        <ThreeChart />
                    </RoundPanel>

                    <RoundPanel className="log_container mt-5">
                        <Transaction />
                    </RoundPanel>
                    <RoundPanel className="send_container mt-5">
                        <Send />
                    </RoundPanel>
                </div>
                <div className={`flex-shrink-0 w-80 h-full p-5 ml-6 right_side ${theme==='dark'?'dark':'light'}`}>
                    <Account />
                    <Wallet />
                    <SubChart />
                </div>
            </div>
        </div>
    )
}