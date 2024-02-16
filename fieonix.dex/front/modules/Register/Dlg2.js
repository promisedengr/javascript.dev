import React from "react";
import { useTheme } from 'next-themes'

import Button from '../../components/CustomButtons/Button.js';
import Select from "react-select";
import countryList from "react-select-country-list";

import setting_styles from './Register.module.css'

export default function Dlg2({step, setStep, country, setCountry, addr1, setAddr1, addr2, setAddr2, city, setCity, postcode, setPostcode}) {
  const {theme} = useTheme();
  const countryLists = countryList().getData();

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={``}>
      <div className={`text-center text-xl font-medium`}>Personal Details</div>
      <div className="form_fontrol">
        <span className="form_label">Country</span>
        {/* <input
          className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
          value={country} onChange={(e) => setCountry(e.target.value)}
        ></input> */}
        <Select
          className = {`${theme === 'dark'?'dark':'light'} ${setting_styles.cus_countrySel}`}
          isSearchable={true}
          options={countryLists}
          value={country}
          onChange={(val) => setCountry(val)}
        />
      </div>
      <div className="form_fontrol">
        <span className="form_label">Address 1</span>
        <input
          className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
          value={addr1} onChange={(e) => setAddr1(e.target.value)}
        ></input>
      </div>
      <div className="form_fontrol">
        <span className="form_label">Address 2</span>
        <input
          className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
          value={addr2} onChange={(e) => setAddr2(e.target.value)}
        ></input>
      </div>
      <div className="form_fontrol">
        <span className="form_label">City</span>
        <input
          className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
          value={city} onChange={(e) => setCity(e.target.value)}
        ></input>
      </div>
      <div className="form_fontrol">
        <span className="form_label">Postal Code / Zip Code</span>
        <input
          className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}
          value={postcode} onChange={(e) => setPostcode(e.target.value)}
        ></input>
      </div>
      <div className="form_fontrol flex flex-row-reverse">
        <div>
          <Button
            className={"btn btn_"+(theme === 'dark'?'dark':'light')}
            type="button" color="primary"
            onClick={() => setStep(step+1)}
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
