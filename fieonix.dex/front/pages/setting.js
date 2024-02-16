import { RoundPanel } from '../components/Panels/RoundPanel';
import { IconButton } from '../components/Buttons/IconButton';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { ExpandDropdown } from '../components/Dropdown/ExpandDropdown';
// import { ToggleButton } from '../components/Buttons/ToggleButton';

import { Navbar } from '../modules/Navbar';
import Sidebar from '../modules/Sidebar';
import SettingTabs from "../modules/Setting/Setting"

// import { Collapse } from 'react-collapse';

import { useState, useEffect } from 'react';
import useStorage from '../modules/hook';

export default function (){
    // ---------------------------------------------------------
    const { getItem } = useStorage();
    const wallet = getItem('wallet');
    var initVal = null;
    if(wallet) {
        initVal = JSON.parse(wallet)
    }
    const [accountAddress, setAccountAddress] = useState(initVal);
    // ---------------------------------------------------------

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return(
        <div className="flex h-screen flex-col">
            <Navbar
                updateAccAddrs={setAccountAddress}
            >
            </Navbar>
            <div className="mycontainer flex">
                <Sidebar></Sidebar>
                <div className="flex-shrink-1 py-6 w-3/5 mx-auto">
                    <RoundPanel className="w-full">
                        <SettingTabs />
                    </RoundPanel>
                </div>
            </div>
        </div>
    )
}