import { RoundPanel } from '../components/Panels/RoundPanel';

import { Navbar } from '../modules/Navbar';
import Sidebar from '../modules/Sidebar';
import Allchart from '../modules/Admin/Allchart'
import Transaction from '../modules/Admin/Transaction'
import Fee from '../modules/Admin/Fee'
import Assets from '../modules/Admin/Assets'
import Account from '../modules/Admin/Account'


import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

import useStorage from '../modules/hook';
import http from '../modules/http';

export default function DashBoard() {
    const { getItem } = useStorage();
    const router = useRouter()
    const {theme, setTheme} = useTheme();

    const tmp_token = getItem('token')
    

    const [mounted, setMounted] = useState(false)
    useEffect(async() => {
        if(tmp_token == '' || tmp_token==null) {
            alert('Please login');
            router.push('/dashboard')
        }
        setMounted(true)
        var ret = await http.post('/is_admin', {token:tmp_token});
        console.log(ret)
        if(ret.data!=1) {
            alert('You can\'t access admin page');
            router.push('/dashboard')
        }
    }, [])
    if (!mounted) return null

    return(
        <div className="flex h-screen flex-col">
            <Navbar>
            </Navbar>
            <div className="mycontainer flex">
                <Sidebar></Sidebar>
                <div className="flex-shrink-1 py-6 w-full">
                    <RoundPanel className="w-full">
                        <Allchart />
                    </RoundPanel>

                    <RoundPanel className="mt-5">
                        <Transaction />
                    </RoundPanel>

                    <RoundPanel className="mt-5">
                        <Fee />
                    </RoundPanel>
                </div>
                <div className={`flex-shrink-0 w-80 h-full p-5 ml-6 right_side ${theme==='dark'?'dark':'light'}`}>
                    <Assets />
                    <Account />
                </div>
            </div>
        </div>
    )
}