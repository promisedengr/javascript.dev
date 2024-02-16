import React from "react";
import { useTheme } from 'next-themes'

import Button from '../../components/CustomButtons/Button.js';

import http from '../http'
import validate from "validate.js";

export default function Dlg3({step, setStep, email, setEmail, email2, setEmail2, register}) {
  const {theme} = useTheme();

  const validateFinal = () => {
    console.log(validate.validators.email.PATTERN);
    if(validate.validators.email.PATTERN.test(email) != true) {
      alert('Please enter correct email address')
      setEmail('')
      setEmail2('')
      return
    }
    register()
  }

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={``}>
      <div className={`text-center text-xl font-medium`}>Email Address</div>
      <div className="form_fontrol">
        <span className="form_label">Email Address</span>
        <input
          className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
          value={email} onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="form_fontrol">
        <span className="form_label">Confirm Email Address</span>
        <input
          className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
          value={email2} onChange={(e) => setEmail2(e.target.value)}
        ></input>
      </div>
      <div className="form_fontrol flex flex-row-reverse">
        <div>
          <Button
            className={"btn btn_"+(theme === 'dark'?'dark':'light')}
            type="button" color="primary"
            onClick={() => validateFinal()}
          >NEXT</Button>
        </div>
        <div className={`mr-4`}>
          <Button
            className={"btn btn_outline_primary_"+(theme === 'dark'?'dark':'light')}
            type="button" color="primary"
            onClick={() => setStep(step-1)}
          >PREV</Button>
        </div>
      </div>
    </div>
  );
}
