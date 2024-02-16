import Link from 'next/link';
import { ReactNode, useState, useEffect } from 'react';
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import Image from 'next/image'

import useStorage from './hook';
import http from "./http"

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '../components/CustomButtons/Button.js';
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);

// interface NavbarInterface {
//     children?: ReactNode,
//     mode: "light" | "dark"
// }

import { useDispatch, useSelector } from 'react-redux'
import { setiBal, setpBal, setRate, setiApy, setpApy, initBalDic } from './NavbalanceSlice';
import { auth, token, avata, reduxLogin, reduxLogout, setReduxToken, setReduxAdminState, setReduxAvata } from './JwtSlice';

export const Navbar = () => {
    const dispatch = useDispatch()
    const reduxAuth = useSelector(auth)
    const reduxToken = useSelector(token)
    const reduxAvata = useSelector(avata)

    const classes = useStyles();

    const ran = Math.ceil(100 * Math.random());
    // let userAvatarUrl = `https://i.pravatar.cc/${99}`;
    const [openPopup, togglePopup] = useState(false);
    const {theme, setTheme} = useTheme();
    const router = useRouter()

    // const [ session, loading ] = useSession()
    const { getItem, setItem, removeItem } = useStorage();
    const [loginModal, setLoginModal] = useState(false);
    const [logineMail, setLogineMail] = useState('');

    const tmp_iBal = getItem('iBal')
    const tmp_pBal = getItem('pBal')
    const tmp_iApy = getItem('iApy')
    const tmp_pApy = getItem('pApy')
    const tmp_bRate = getItem('bRate')
    const userName = getItem('userName')
    if(tmp_iBal) dispatch(setiBal(JSON.parse(tmp_iBal)))
    if(tmp_pBal) dispatch(setpBal(JSON.parse(tmp_pBal)))
    if(tmp_iApy) dispatch(setiApy(JSON.parse(tmp_iApy)))
    if(tmp_pApy) dispatch(setpApy(JSON.parse(tmp_pApy)))
    if(tmp_bRate) dispatch(setRate(JSON.parse(tmp_bRate)))
    const tmp_token = getItem('token')
    const tmp_avata = getItem('avata')
    if(tmp_token && reduxToken=='') {
        dispatch(setReduxToken(tmp_token))
        dispatch(reduxLogin())
        dispatch(setReduxAvata(tmp_avata))
    }
    
    const login = () => {
        var res = http.post(
            '/login',
            {
                email: logineMail
            }
            ).then((response) => {
                if(response.data.state == 'ok') {
                    setItem('token', response.data.token)
                    setItem('avata', response.data.avata)
                    var wallet = {}
                    for (var x in response.data.wallet) {
                        var tmp = response.data.wallet[x]
                        if (wallet[tmp.account_categ] == null) {
                            wallet[tmp.account_categ] = {}
                        }
                        wallet[tmp.account_categ][tmp.blockchain] = tmp.address
                        if(tmp.blockchain == 'eth') {
                            wallet[tmp.account_categ][tmp.blockchain] = '0x'+wallet[tmp.account_categ][tmp.blockchain];
                        }
                    }
                    setItem('isAdmin', response.data.isAdmin)
                    setItem('userName', response.data.name)
                    setItem('wallet', JSON.stringify(wallet))
                    dispatch(reduxLogin())
                    dispatch(setReduxToken(JSON.stringify(wallet)))
                    dispatch(setReduxAdminState(response.data.isAdmin))
                    getBalance()
                }
                else if(response.data.state == 'locked') {
                    alert('This account is locked');
                }
                else if(response.data.state == 'deleted') {
                    alert('This account is deleted');
                }
                else {
                    alert('User is not registered');
                }
            }, (error) => {
                console.log(error);
            });
        setLoginModal(false)
    }
    const logout = () => {
        removeItem('token')
        removeItem('avata')
        removeItem('wallet')
        removeItem('isAdmin')
        removeItem('userName')
        removeItem('iBal')
        removeItem('pBal')
        removeItem('iApy')
        removeItem('pApy')
        removeItem('bRate')
        // http.post('/logout', {})
        dispatch(initBalDic())
        dispatch(reduxLogout())
        togglePopup(false)
    }
    const test = () => {
        http.post('/sess_test', {token:reduxToken})
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
        togglePopup(false)

        console.log('----------------')
    }
    const getBalance = async() => {
        http.post('/get_balance', {token:getItem('token')})
        .then((response) => {
            var bal = response.data.bal
            var apy = response.data.apy
            dispatch(setiBal(bal.interest))
            dispatch(setpBal(bal.pension))
            dispatch(setiApy(apy.interest))
            dispatch(setpApy(apy.pension))
            setItem('iBal', JSON.stringify(bal.interest))
            setItem('pBal', JSON.stringify(bal.pension))
            setItem('iApy', JSON.stringify(apy.interest))
            setItem('pApy', JSON.stringify(apy.pension))
        }, (error) => {
            console.log(error);
        });
        http.post('/get_rate', {token:getItem('token')})
        .then((response) => {
            var tmp = response.data
            dispatch(setRate(tmp))
            setItem('bRate', JSON.stringify(tmp))
        }, (error) => {
            console.log(error);
        });
    }

    const [mounted, setMounted] = useState(false)
    useEffect(() => { 
        setMounted(true);
        if(reduxAuth && (getItem('iBal')==null || getItem('bRate')==null)) {
            getBalance()
        }
        // dispatch(setBalance(token)) 
    }, [])
    if (!mounted) return null

    // setTimeout(() => {
    //     getBalance()
    // }, 500);


    return (
        <>
            <header className="w-full fixed top-0 flex-shrink-0 border-b-2 border-light-color-main-3 dark:border-dark-color-main-3 header_bar">
                <nav className={`bg-light-color-main-1 dark:bg-dark-color-main-1 shadow py-4 `}>
                    <div className="mx-auto px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center cursor-pointer">
                                <Link href="/dashboard">
                                    <span className="flex-shrink-0">
                                        <Image
                                            src={`/logo${theme === "dark"?"":"_l"}.png`}
                                            height={50} width={166} alt="FIEONIX"
                                        ></Image>
                                    </span>
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-center space-x-4">
                                </div>
                                <div className="ml-4 flex items-center md:ml-6">
                                    <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        <Image
                                            src={`/img/topnav/1${theme === "dark"?"":"_l"}.png`}
                                            height={24} width={24} alt="help"
                                        ></Image>
                                        </a>
                                    <a 
                                        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        
                                    >
                                        <Image
                                            src={`/img/topnav/2${theme === "dark"?"":"_l"}.png`}
                                            height={24} width={24} alt="help"
                                        ></Image>
                                    </a>
                                    <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        <Image
                                            src={`/img/topnav/3${theme === "dark"?"":"_l"}.png`}
                                            height={24} width={24} alt="help"
                                        ></Image>
                                    </a>
                                    <a onClick={() => togglePopup(!openPopup)} className="block relative">
                                        <img alt="profile" src={`${(!reduxAuth || reduxAvata=='')?'/img/setting/default.png':reduxAvata}`} className="mx-auto object-cover rounded-full h-14 w-14 "/>
                                        <span
                                            className={`text-sm font-medium dark:text-purple-400`}
                                        >{userName}</span>
                                    </a>
                                    { openPopup ? 
                                    <div className="relative mt-12">
                                        <div className="relative inline-block text-left">
                                            <div className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                                                <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                    <span className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                                        <span className="flex flex-col">
                                                            <span>
                                                                Settings
                                                            </span>
                                                        </span>
                                                    </span>
                                                    <span className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 cursor-pointer" role="menuitem" onClick={() => test()}>
                                                        <span className="flex flex-col">
                                                            <span>
                                                                Account
                                                            </span>
                                                        </span>
                                                    </span>
                                                    {reduxAuth &&
                                                        <span className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 cursor-pointer" role="menuitem" onClick={() => logout()}>
                                                            <span className="flex flex-col">
                                                                <span>
                                                                    Logout
                                                                </span>
                                                            </span>
                                                        </span>
                                                    }
                                                    {!reduxAuth &&
                                                        <span className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 cursor-pointer" role="menuitem" onClick={() => { togglePopup(false); setLoginModal(true) } }>
                                                            <span className="flex flex-col">
                                                                <span>
                                                                    Login
                                                                </span>
                                                            </span>
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div> : "" }
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                    <svg width="20" height="20" fill="currentColor" className="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                Home
                            </a>
                            <a className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium">
                                Gallery
                            </a>
                            <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                Content
                            </a>
                            <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                Contact
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
            <Dialog
                classes={{
                    root: classes.center,
                    paper: classes.modal,
                }}
                open={loginModal}
                keepMounted
                onClose={() => setLoginModal(false)}
                aria-labelledby="classic-modal-slide-title"
                aria-describedby="classic-modal-slide-description"
                >
                <DialogTitle
                    className={`${classes.modalHeader} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
                >
                    <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setLoginModal(false)}
                    >
                        <Close className={classes.modalClose} />
                    </IconButton>
                    <span className={classes.modalTitle}>Login</span>
                </DialogTitle>
                <DialogContent
                    id="classic-modal-slide-description"
                    className={`${classes.modalBody} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
                >
                    <div className="form_fontrol w-80">
                        <span className="form_label">Email</span>
                        <input
                            className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
                            value={logineMail} onChange={(e) => setLogineMail(e.target.value)}
                        ></input>
                    </div>
                </DialogContent>
                <DialogActions
                    className={`${classes.modalFooter} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
                >
                    <Button
                        className={"btn_"+(theme === 'dark'?'dark':'light')}
                        onClick={() => login()}
                        color="danger"
                        simple
                    >
                        Login
                    </Button>
                    <Button
                        className={"btn_outline_primary_"+(theme === 'dark'?'dark':'light')+" btn_"+(theme === 'dark'?'dark':'light')}
                        color="primary"
                        simple
                        onClick={() => { setLoginModal(false); router.push('/register') }}
                    >
                        Sign up
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}