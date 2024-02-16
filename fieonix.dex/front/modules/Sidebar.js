import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router'

import Image from 'next/image'

// interface SidebarInterface {
//     mode: "dark" | "light",
//     open: boolean,
// }

import useStorage from './hook';
import { useTheme } from 'next-themes'
// import Popover from "@material-ui/core/Popover";

import { useDispatch, useSelector } from 'react-redux'
import { reduxIsAdmin, setReduxAdminState } from './JwtSlice';

const Sidebar = ({open = false}) => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(reduxIsAdmin)

    const {theme} = useTheme();
    const [tradeSideTab, setTradeSideTab] = useState(null);

    const { getItem } = useStorage();
    const tmpIsAdmin = getItem('isAdmin')
    if(tmpIsAdmin) dispatch(setReduxAdminState(tmpIsAdmin))

    // const [toggle, setToggle] = useState(props.checked);
    const router = useRouter()
    let locationHref = 0;
    switch ( router.pathname.split("/").pop()) {
        case "dashboard":
            locationHref = 0
            break;
        case "trade":
        case "smarttrade":
            locationHref = 1
            break;
        case "loan":
            locationHref = 2
            break;
        case "support":
            locationHref = 3
            break;
        case "setting":
            locationHref = 4
            break;
        case "buy":
            locationHref = 5
            break;
        case "admin":
            locationHref = 6
            break;
                
        default:
            break;
    }
    const inactiveClass = "w-14 h-14 flex items-center p-2 transition-colors hover:text-gray-800 dark:hover:text-white hover:bg-gray-400 dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg my-2";
    const activeClass = "w-14 h-14 flex items-center p-2 transition-colors hover:text-gray-800 dark:hover:text-white hover:bg-blue-400 dark:hover:bg-purple-400 duration-200 text-gray-600 dark:text-gray-400 rounded-lg my-2 bg-blue-500 dark:bg-purple-500";

    return (
        <aside className="flex flex-col sm:flex-row sm:justify-around side_bar">
            <div className={`${ open ? "w-60" : "w-20"} h-full bg-light-color-main-1 dark:bg-dark-color-main-1 rounded-2xl flex flex-col justify-between`}>
                <nav className="p-3">
                    <Link href="/dashboard">
                        <div className="sidebar_icon">
                            <Image
                                className={`cursor-pointer rounded-lg duration-200 ${locationHref===0?"":(theme==='dark'?"hover:bg-gray-600":"hover:bg-gray-400")}`}
                                src={`/img/sidebar/dashboard${theme==='dark'?"_d":"_l"}${locationHref===0?"_s":""}.png`}
                                height={56}
                                width={56}
                                alt="Dash"
                            />
                            <div>Dash</div>
                        </div>
                    </Link>
                    <Link href="/trade">
                    {/* <span className={locationHref===1?activeClass:inactiveClass}
                        onClick={(event) => setTradeSideTab(event.currentTarget)}
                    > */}
                        <div className="sidebar_icon">
                            <Image
                                className={`cursor-pointer rounded-lg duration-200 ${locationHref===1?"":(theme==='dark'?"hover:bg-gray-600":"hover:bg-gray-400")}`}
                                src={`/img/sidebar/trade${theme==='dark'?"_d":"_l"}${locationHref===1?"_s":""}.png`}
                                height={56}
                                width={56}
                                alt="Trade"
                            />
                            <div>Trade</div>
                        </div>
                    </Link>
                    {/* </span>
                    <Popover
                        className={`sideBarPopOver ${theme==='dark'?'dark':'light'}`}
                        open={Boolean(tradeSideTab)}
                        anchorEl={tradeSideTab}
                        onClose={() => setTradeSideTab(null)}
                        anchorOrigin={{
                            vertical: "center",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "center",
                            horizontal: "left",
                        }}
                        >
                        <span>
                            <Link href="/trade">Trade</Link>
                        </span>
                        <span>
                            <Link href="/smarttrade">Smart Trade</Link>
                        </span>
                    </Popover> */}
                    <Link href="/buy">
                        <div className="sidebar_icon">
                            <Image
                                className={`cursor-pointer rounded-lg duration-200 ${locationHref===5?"":(theme==='dark'?"hover:bg-gray-600":"hover:bg-gray-400")}`}
                                src={`/img/sidebar/buy${theme==='dark'?"_d":"_l"}${locationHref===5?"_s":""}.png`}
                                height={56}
                                width={56}
                                alt="Buy"
                            />
                            <div>Buy</div>
                        </div>
                    </Link>
                    <Link href="/loan">
                        <div className="sidebar_icon">
                            <Image
                                className={`cursor-pointer rounded-lg duration-200 ${locationHref===2?"":(theme==='dark'?"hover:bg-gray-600":"hover:bg-gray-400")}`}
                                src={`/img/sidebar/loan${theme==='dark'?"_d":"_l"}${locationHref===2?"_s":""}.png`}
                                height={56}
                                width={56}
                                alt="Loan"
                            />
                            <div>Loan</div>
                        </div>
                    </Link>
                    <Link href="/setting">
                        <div className="sidebar_icon">
                            <Image
                                className={`cursor-pointer rounded-lg duration-200 ${locationHref===4?"":(theme==='dark'?"hover:bg-gray-600":"hover:bg-gray-400")}`}
                                src={`/img/sidebar/setting${theme==='dark'?"_d":"_l"}${locationHref===4?"_s":""}.png`}
                                height={56}
                                width={56}
                                alt="Setting"
                            />
                            <div>Setting</div>
                        </div>
                    </Link>
                    <Link href="/support">
                        <div className="sidebar_icon">
                            <Image
                                className={`cursor-pointer rounded-lg duration-200 ${locationHref===3?"":(theme==='dark'?"hover:bg-gray-600":"hover:bg-gray-400")}`}
                                src={`/img/sidebar/support${theme==='dark'?"_d":"_l"}${locationHref===3?"_s":""}.png`}
                                height={56}
                                width={56}
                                alt="Help"
                            />
                            <div>Help</div>
                        </div>
                    </Link>
                    {(isAdmin!=null && isAdmin==1)&&
                        <Link href="/admin">
                            <div className="sidebar_icon">
                                <Image
                                    className={`cursor-pointer rounded-lg duration-200 ${locationHref===6?"":(theme==='dark'?"hover:bg-gray-600":"hover:bg-gray-400")}`}
                                    src={`/img/sidebar/admin${theme==='dark'?"_d":"_l"}${locationHref===6?"_s":""}.png`}
                                    height={56}
                                    width={56}
                                    alt="Admin"
                                />
                                <div>Admin</div>
                            </div>
                        </Link>
                    }
                </nav>
                {/* <div className="px-3 py-3 -mt-9">
                    <a className="w-14 h-14 hover:text-gray-800 hover:bg-indigo-400 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center p-2 rounded-lg" href="#">
                        <img className="w-8 h-8 m-auto" src="/icons/icon_logout.png" />
                        { open ? 
                        <span className="mx-4 font-medium">
                            Support
                        </span> : ""}
                    </a>
                    <div
                        className={`logout_icon cursor-pointer rounded-lg duration-200 ${theme==='dark'?"hover:bg-gray-600":"hover:bg-gray-400"}`}
                    >
                        <Image
                            
                            src={`/img/sidebar/logout${theme==='dark'?"_d":"_l"}.png`}
                            height={36}
                            width={36}
                            alt="Help"
                        />
                    </div>
                </div> */}
            </div>
        </aside>
    )
}

export default Sidebar;