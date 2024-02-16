import { Navbar } from '../modules/Navbar';
import Sidebar from '../modules/Sidebar';
import Buy from "../modules/Buy/Buy";

import { useState, useEffect } from 'react';

export default function (){
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return(
        <div className="flex h-screen flex-col">
            <Navbar>
            </Navbar>
            <div className="mycontainer flex">
                <Sidebar></Sidebar>
                <div className="flex-shrink-1 py-6 w-full max-w-7xl mx-auto">
                    <Buy />
                </div>
            </div>
        </div>
    )
}