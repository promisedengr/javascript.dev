import { RoundPanel } from '../components/Panels/RoundPanel';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes'

import Link from 'next/link';
import Image from 'next/image'

import Step from "../modules/Register/Step";
import Dlg1 from "../modules/Register/Dlg1";
import Dlg2 from "../modules/Register/Dlg2";
import Dlg3 from "../modules/Register/Dlg3";
import Dlg4 from "../modules/Register/Dlg4";

import http from "../modules/http"

export default function DashBoard() {
    const { theme } = useTheme();
    const [regStep, setRegStep] = useState(1);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [nation, setNation] = useState('');
    const [country, setCountry] = useState('');
    const [addr1, setAddr1] = useState('');
    const [addr2, setAddr2] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');

    const register = () => {
        if(email=='' || email!=email2) {
            alert('Please type correct email')
            return;
        }
        var res2 = http.post(
        '/user',
        {
            firstName:firstName,
            lastName:lastName,
            email:email,
            birthDay:birthDay,
            nation:nation.label,
            country:country.label,
            addr1:addr1,
            addr2:addr2,
            city:city,
            postcode:postcode
        }
        ).then((response) => {
            console.log(response);
            if(response.data == 'ok') {
                setRegStep(4)
            }
        }, (error) => {
            console.log(error);
        });
    }

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return(
        <div className="flex h-screen flex-col">
            <div
                style={{position:'fixed', top:'10px', left:'10px', cursor:'pointer'}}
            >
                <Link href="/dashboard">
                    <span className="flex-shrink-0">
                        <Image
                            src={`/logo${theme === "dark"?"":"_l"}.png`}
                            height={50} width={166} alt="FIEONIX"
                        ></Image>
                    </span>
                </Link>
            </div>
            <div className="regcontainer">
                <Step step={regStep}></Step>
                <RoundPanel className="w-full mt-4">
                    {regStep==1 &&
                        <Dlg1
                            step={regStep} setStep={setRegStep}
                            firstName={firstName} setFirstName={setFirstName}
                            lastName={lastName} setLastName={setLastName}
                            birthDay={birthDay} setBirthDay={setBirthDay}
                            nation={nation} setNation={setNation}
                        ></Dlg1>
                    }
                    {regStep==2 &&
                        <Dlg2
                            step={regStep} setStep={setRegStep}
                            country={country} setCountry={setCountry}
                            addr1={addr1} setAddr1={setAddr1}
                            addr2={addr2} setAddr2={setAddr2}
                            city={city} setCity={setCity}
                            postcode={postcode} setPostcode={setPostcode}
                        ></Dlg2>
                    }
                    {regStep==3 &&
                        <Dlg3
                            step={regStep} setStep={setRegStep}
                            email={email} setEmail={setEmail}
                            email2={email2} setEmail2={setEmail2}
                            register={register}
                        ></Dlg3>
                    }
                    {regStep==4 &&
                        <Dlg4></Dlg4>
                    }
                </RoundPanel>
            </div>
        </div>
    )
}