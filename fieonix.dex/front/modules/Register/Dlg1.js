import React from "react";
import { useTheme } from 'next-themes'

import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import Button from '../../components/CustomButtons/Button.js';

import ReCAPTCHA from "react-google-recaptcha";
import Select from "react-select";
import countryList from "react-select-country-list";

import setting_styles from './Register.module.css'

export default function Dlg1({step, setStep, firstName, setFirstName, lastName, setLastName, birthDay, setBirthDay, nation, setNation}) {
  const {theme} = useTheme();

  const countryLists = countryList().getData();
  const [notBot, setNotBot] = React.useState(false)

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const onChangeCaptCha = (value) => {
    setNotBot(true)
    console.log("Captcha value:", value);
  }

  return (
    <div className={``}>
      <div className={`text-center text-xl font-medium`}>Personal Details</div>
      <div className="form_fontrol">
        <span className="form_label">First Name</span>
        <input
          className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
          value={firstName} onChange={(e) => setFirstName(e.target.value)}
        ></input>
      </div>
      <div className="form_fontrol">
        <span className="form_label">Last Name</span>
        <input
          className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
          value={lastName} onChange={(e) => setLastName(e.target.value)}
        ></input>
      </div>
      <div className="form_fontrol">
        <span className="form_label">Date of Birth</span>
        {/* <input
          className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
          value={birthDay} onChange={(e) => setBirthDay(e.target.value)}
        ></input> */}
        <FormControl fullWidth className={`${setting_styles.birthday} ${(theme === 'dark'?setting_styles.birthday_dark:setting_styles.birthday_light)}`}>
          <Datetime
            value = {birthDay}
            timeFormat={false}
            onChange={setBirthDay}
            dateFormat={`MM/DD/YYYY`}
          />
        </FormControl>
      </div>
      <div className="form_fontrol">
        <span className="form_label">Nationality</span>
        {/* <input
          className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
          value={nation} onChange={(e) => setNation(e.target.value)}
        ></input> */}
        <Select
          className = {`${theme === 'dark'?'dark':'light'} ${setting_styles.cus_countrySel}`}
          isSearchable={true}
          options={countryLists}
          value={nation}
          onChange={(val) => setNation(val)}
        />
      </div>
      <div className="form_fontrol flex flex-row-reverse">
        <div>
          <Button
            className={"btn btn_"+(theme === 'dark'?'dark':'light')+' '+(notBot==true&&firstName!=''&&lastName!=''&&nation!=''?'false':'true')}
            type="button" color="primary"
            onClick={() => setStep(step+1)}
            disabled={notBot==true&&firstName!=''&&lastName!=''&&nation!=''?false:true}
          >NEXT</Button>
        </div>
        <div className={`mr-8`}>
          <ReCAPTCHA
            sitekey="6LfMQdYcAAAAAJboKcUodF8-3aRGMrdl2PKLSlig"
            onChange={onChangeCaptCha}
            theme={`${theme==='dark'?'dark':'light'}`}
          />
        </div>
      </div>
    </div>
  );
}
