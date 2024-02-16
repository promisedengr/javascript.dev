import React from "react";
import { useState } from 'react';
import Datetime from "react-datetime";

import PhoneInput from 'react-phone-input-2'

import Image from 'next/image'

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import NavPills from "../../components/NavPills/NavPills.js";
import Button from '../../components/CustomButtons/Button.js';
import Toggle from '../../components/Buttons/ToggleButton';

import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);

import setting_styles from './Setting.module.css'
import cn from 'classnames'

import http from "../http"
import useStorage from "../hook";

import { useTheme } from 'next-themes'
import { useDispatch, useSelector } from 'react-redux'
import { token, avata, setReduxAvata } from '../JwtSlice';

export default function Setting() {
  const dispatch = useDispatch()
  const reduxToken = useSelector(token)
  const reduxAvata = useSelector(avata)

  const classes = useStyles();
  const {theme, setTheme} = useTheme();
  const [classicModal, setClassicModal] = React.useState(false);

  const { getItem, setItem } = useStorage();
  // setTheme('dark');

  const setPassword = (pm) => {
    setClassicModal(true)
  }

  const [mtName, setMtName] = useState('')
  const [mtEmail, setMtEmail] = useState('')
  const [mtPhone, setMtPhone] = useState('')
  const [mtBirth, setMtBirth] = useState('')
  const [mtNation, setMtNation] = useState('')
  const [mtAddr, setMtAddr] = useState('')

  const [selectedImage, setSelectedImage] = useState();
  const [selectedImgUrl, setSelectedImgUrl] = useState(reduxAvata);

  var avataInput = React.createRef();

  const handleChange = event => {
    // console.log('-----------------')
    setSelectedImage(event.target.files[0]);
    let reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImgUrl(reader.result)
      console.log(reader.result)
      console.log(selectedImgUrl)
      // console.log('***************************************')
    }
    reader.readAsDataURL(event.target.files[0])
  }

  const handleImageUpload = () => {
    if (!selectedImage) return
    dispatch(setReduxAvata(selectedImgUrl))
    setItem('avata', selectedImgUrl)
    http.post('/set_avata', {token:getItem('token'), avata:selectedImgUrl})
    .then((response) => {
      // console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  const openAvataSelect = () => {
    avataInput.click();
    // console.log('---------------')
  }

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
    http.post('/get_user', {token:reduxToken})
    .then((response) => {
      console.log(response);
      var tmp = response.data;
      if(tmp.state == 'ok') {
        tmp = tmp.user;
        setMtName(tmp.firstName + ' ' + tmp.lastName)
        setMtEmail(tmp.email)
        setMtPhone(tmp.phone)
        setMtBirth(tmp.birthDay)
        setMtNation(tmp.country)
        setMtAddr(tmp.addr1 + tmp.addr2)
      }
    }, (error) => {
      console.log(error);
    });
  }, [])
  if (!mounted) return null

  return (
    <div className={classes.container}>
      <div id="navigation-pills">
        <div className={classes.title}>
          <h3>Settings</h3>
        </div>
          <NavPills
            color="success"
            tabs={[
              {
                tabButton: "Account",
                tabContent: (
                  <div>
                    <div className="form_fontrol">
                      <span className="form_label">Photo</span>
                      <div className={setting_styles.changeAvata}>
                        <Image
                          className={setting_styles.roundImg}
                          src={selectedImgUrl?selectedImgUrl:"/img/setting/default.png"}
                          height={58} width={58} alt="Success"
                          onClick={openAvataSelect}
                        />
                        {` `}
                        <input
                          ref={(input) => { avataInput = input; }} 
                          onChange={handleChange}
                          accept=".jpg, .png, .jpeg"
                          className="fileInput mb-2"
                          type="file"
                          hidden>
                        </input>
                        <Button
                          className={"btn btn_outline_grey_"+(theme === 'dark'?'dark':'light')}
                          onClick={handleImageUpload}
                          type="button"
                        >
                          CHANGE
                        </Button>
                        <Button
                          className={"btn btn_remove"}
                          onClick={handleImageUpload}
                          disabled={!selectedImgUrl}
                          type="button"
                        >
                          REMOVE
                        </Button>
                      </div>
                    </div>
                    <div className="form_fontrol">
                      <span className="form_label">Name</span>
                      <input className={"form_input form_input_"+(theme === 'dark'?'dark':'light')} value={mtName}></input>
                    </div>
                    <div className="form_fontrol">
                      <span className="form_label">Email</span>
                      <input className={"form_input form_input_"+(theme === 'dark'?'dark':'light')} value={mtEmail}></input>
                    </div>
                    <div className="form_fontrol">
                      <span className="form_label">Mobile Number</span>
                      <FormControl fullWidth className={`${setting_styles.phonenum} ${(theme === 'dark'?setting_styles.phonenum_dark:setting_styles.phonenum_light)}`}>
                        <PhoneInput
                          specialLabel={''}
                          country={'th'}
                          inputStyle={{
                            borderColor: "red"
                          }}
                          value={mtPhone}
                        />
                      </FormControl>
                    </div>
                    <div className="form_fontrol">
                      <span className="form_label">Date of Birth</span>
                      <FormControl fullWidth className={`${setting_styles.birthday} ${(theme === 'dark'?setting_styles.birthday_dark:setting_styles.birthday_light)}`}>
                        <Datetime
                          timeFormat={false}
                          inputProps={{ placeholder: "Enter your date of Birth" }}
                          value={mtBirth}
                        />
                      </FormControl>
                    </div>
                    <div className="form_fontrol">
                      <span className="form_label">Nationality</span>
                      <input className={"form_input form_input_"+(theme === 'dark'?'dark':'light')} value={mtNation}></input>
                    </div>
                    <div className="form_fontrol">
                      <span className="form_label">Residential Address</span>
                      <textarea className={"form_input form_input_"+(theme === 'dark'?'dark':'light')}>{mtAddr}</textarea>
                    </div>
                    <div className={setting_styles.saveProfile}>
                      <Button
                        className={"btn btn_"+(theme === 'dark'?'dark':'light')}
                        type="button" color="primary"
                      >SAVE</Button>
                      <Button
                        className={"btn btn_outline_primary_"+(theme === 'dark'?'dark':'light')}
                        type="button" color="primary"
                      >CANCEL</Button>
                    </div>
                  </div>
                ),
              },
              {
                tabButton: "General",
                tabContent: (
                  <div
                    className={cn({
                      [setting_styles.toggleBlock]: true
                    })}
                  >
                    <div>
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8.50001 0C3.81309 0 0 3.81309 0 8.50001C0 13.1869 3.81309 17 8.50001 17C13.1869 17 17 13.1869 17 8.50001C17 3.81309 13.1869 0 8.50001 0ZM0.839412 8.49998C0.839412 4.27583 4.27586 0.839412 8.50001 0.839412V16.1606C4.27597 16.1606 0.839412 12.7242 0.839412 8.49998Z" fill="#8388A8"/> </svg>
                      <span>Dark Mode</span>
                      <Toggle onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}/>
                    </div>
                    <div>
                      <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 7H3M11 7C12.1046 7 13 7.89543 13 9V14C13 15.1046 12.1046 16 11 16H3C1.89543 16 1 15.1046 1 14V9C1 7.89543 1.89543 7 3 7M11 7V5C11 2.79086 9.20914 1 7 1C4.79086 1 3 2.79086 3 5L3 7M7 11V13M8 11H6" stroke="#8388A8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>
                      <span>2 Factor Authentication</span>
                      <Toggle onChange={() => console.log('a')}/>
                    </div>
                    <div>
                      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10 8.00093L8.04044 9.96049C7.64991 10.351 7.01675 10.351 6.62623 9.96049L6 9.33426M15 5.16083V8.75912C15 11.9986 13.0464 14.9183 10.0519 16.1541L8.76298 16.6861C8.27431 16.8877 7.72569 16.8877 7.23702 16.6861L5.9481 16.1541C2.95362 14.9183 1 11.9986 1 8.75912V5.16083C1 4.22343 1.65106 3.4118 2.56614 3.20845L3.02026 3.10754C4.00285 2.88918 4.95406 2.54807 5.85148 2.09224L7.09427 1.46098C7.66348 1.17186 8.33652 1.17186 8.90573 1.46098L10.1485 2.09224C11.0459 2.54807 11.9971 2.88918 12.9797 3.10754L13.4339 3.20845C14.3489 3.4118 15 4.22343 15 5.16083Z" stroke="#8388A8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>
                      <span>Privacy Policy</span>
                    </div>
                    <div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6H15.75V5.68934L15.5303 5.46967L15 6ZM10 1L10.5303 0.46967L10.3107 0.25H10V1ZM6 9C6.41421 9 6.75 8.66421 6.75 8.25C6.75 7.83579 6.41421 7.5 6 7.5V9ZM4 7.5C3.58579 7.5 3.25 7.83579 3.25 8.25C3.25 8.66421 3.58579 9 4 9V7.5ZM7.5 6C7.91421 6 8.25 5.66421 8.25 5.25C8.25 4.83579 7.91421 4.5 7.5 4.5V6ZM4 4.5C3.58579 4.5 3.25 4.83579 3.25 5.25C3.25 5.66421 3.58579 6 4 6V4.5ZM10 12C10.4142 12 10.75 11.6642 10.75 11.25C10.75 10.8358 10.4142 10.5 10 10.5V12ZM4 10.5C3.58579 10.5 3.25 10.8358 3.25 11.25C3.25 11.6642 3.58579 12 4 12V10.5ZM13 14.25H3V15.75H13V14.25ZM1.75 13V3H0.25V13H1.75ZM14.25 6V13H15.75V6H14.25ZM10 0.25H3V1.75H10V0.25ZM3 14.25C2.30964 14.25 1.75 13.6904 1.75 13H0.25C0.25 14.5188 1.48122 15.75 3 15.75V14.25ZM13 15.75C14.5188 15.75 15.75 14.5188 15.75 13H14.25C14.25 13.6904 13.6904 14.25 13 14.25V15.75ZM1.75 3C1.75 2.30964 2.30964 1.75 3 1.75V0.25C1.48122 0.25 0.25 1.48122 0.25 3H1.75ZM15 5.25H12V6.75H15V5.25ZM10.75 4V1H9.25V4H10.75ZM12 5.25C11.3096 5.25 10.75 4.69036 10.75 4H9.25C9.25 5.51878 10.4812 6.75 12 6.75V5.25ZM6 7.5H4V9H6V7.5ZM7.5 4.5H4V6H7.5V4.5ZM10 10.5H4V12H10V10.5ZM9.46967 1.53033L14.4697 6.53033L15.5303 5.46967L10.5303 0.46967L9.46967 1.53033Z" fill="#8388A8"/></svg>
                      <span>Terms of Use</span>
                    </div>
                    <div>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.6807 3.58786L13.012 3.92748L13.6807 3.58786ZM14.2101 4.09537L14.5212 3.41296L14.2101 4.09537ZM11.2963 1.07044L11.5589 1.77299V1.77299L11.2963 1.07044ZM12.675 1.60777L13.3437 1.26814L12.675 1.60777ZM8.4828 1.86327L8.71549 1.15028L8.4828 1.86327ZM9.21599 1.84782L8.95346 1.14527V1.14527L9.21599 1.84782ZM5.0167 1.7692L4.33429 1.45806V1.45806L5.0167 1.7692ZM6.37155 1.17425L6.13886 1.88724L6.37155 1.17425ZM3.58786 4.31929L3.92748 4.98798L3.58786 4.31929ZM4.09537 3.78991L4.77779 4.10106L4.09537 3.78991ZM1.07044 6.70367L1.77299 6.44114L1.07044 6.70367ZM1.60777 5.32495L1.26814 4.65626H1.26814L1.60777 5.32495ZM1.86327 9.5172L2.57626 9.74989L1.86327 9.5172ZM1.84782 8.78401L2.55037 8.52148L1.84782 8.78401ZM1.7692 12.9833L2.08035 12.3009H2.08035L1.7692 12.9833ZM1.17425 11.6284L0.461261 11.3958L1.17425 11.6284ZM4.31929 14.4121L4.98799 14.0725H4.98799L4.31929 14.4121ZM3.78991 13.9046L3.47877 14.587H3.47877L3.78991 13.9046ZM6.70367 16.9296L6.44114 16.227L6.70367 16.9296ZM5.32495 16.3922L4.65626 16.7319H4.65626L5.32495 16.3922ZM9.5172 16.1367L9.74989 15.4237L9.5172 16.1367ZM8.78401 16.1522L9.04654 16.8547L8.78401 16.1522ZM12.9833 16.2308L12.3009 15.9197L12.9833 16.2308ZM11.6284 16.8257L11.3958 17.5387L11.6284 16.8257ZM14.4121 13.6807L14.0725 13.012L14.4121 13.6807ZM13.9046 14.2101L14.587 14.5212L13.9046 14.2101ZM16.9296 11.2963L16.227 11.5589L16.9296 11.2963ZM16.3922 12.675L16.0526 12.0063L16.3922 12.675ZM16.1367 8.4828L15.4237 8.25011L16.1367 8.4828ZM16.1522 9.21599L15.4496 9.47852L16.1522 9.21599ZM16.8257 6.37155L17.5387 6.60424L16.8257 6.37155ZM16.2308 5.0167L15.9197 5.69912L16.2308 5.0167ZM5.46967 11.4697C5.17678 11.7626 5.17678 12.2374 5.46967 12.5303C5.76256 12.8232 6.23744 12.8232 6.53033 12.5303L5.46967 11.4697ZM12.5303 6.53033C12.8232 6.23744 12.8232 5.76256 12.5303 5.46967C12.2374 5.17678 11.7626 5.17678 11.4697 5.46967L12.5303 6.53033ZM16.1128 6.13886L15.4237 8.25011L16.8497 8.71549L17.5387 6.60424L16.1128 6.13886ZM15.4496 9.47852L16.227 11.5589L17.6321 11.0338L16.8547 8.95346L15.4496 9.47852ZM16.0526 12.0063L14.0725 13.012L14.7518 14.3494L16.7319 13.3437L16.0526 12.0063ZM13.2222 13.8989L12.3009 15.9197L13.6657 16.5419L14.587 14.5212L13.2222 13.8989ZM11.8611 16.1128L9.74989 15.4237L9.28451 16.8497L11.3958 17.5387L11.8611 16.1128ZM8.52148 15.4496L6.44114 16.227L6.9662 17.6321L9.04654 16.8547L8.52148 15.4496ZM5.99365 16.0526L4.98799 14.0725L3.65059 14.7518L4.65626 16.7319L5.99365 16.0526ZM4.10106 13.2222L2.08035 12.3009L1.45806 13.6657L3.47877 14.587L4.10106 13.2222ZM1.88724 11.8611L2.57626 9.74989L1.15028 9.28451L0.461261 11.3958L1.88724 11.8611ZM2.55037 8.52148L1.77299 6.44114L0.367886 6.9662L1.14527 9.04654L2.55037 8.52148ZM1.94739 5.99365L3.92748 4.98798L3.24823 3.65059L1.26814 4.65626L1.94739 5.99365ZM4.77779 4.10106L5.69912 2.08035L4.33429 1.45806L3.41296 3.47877L4.77779 4.10106ZM6.13886 1.88724L8.25011 2.57626L8.71549 1.15028L6.60424 0.461261L6.13886 1.88724ZM9.47852 2.55037L11.5589 1.77299L11.0338 0.367886L8.95346 1.14527L9.47852 2.55037ZM12.0063 1.94739L13.012 3.92748L14.3494 3.24823L13.3437 1.26814L12.0063 1.94739ZM13.8989 4.77779L15.9197 5.69912L16.5419 4.33429L14.5212 3.41296L13.8989 4.77779ZM13.012 3.92748C13.2028 4.30318 13.5155 4.60297 13.8989 4.77779L14.5212 3.41296C14.447 3.37909 14.3864 3.32101 14.3494 3.24823L13.012 3.92748ZM11.5589 1.77299C11.7307 1.70879 11.9233 1.78386 12.0063 1.94739L13.3437 1.26814C12.915 0.423995 11.9207 0.0364755 11.0338 0.367886L11.5589 1.77299ZM8.25011 2.57626C8.6507 2.707 9.0838 2.69787 9.47852 2.55037L8.95346 1.14527C8.877 1.17384 8.79309 1.17561 8.71549 1.15028L8.25011 2.57626ZM5.69912 2.08035C5.77521 1.91346 5.9645 1.83034 6.13886 1.88724L6.60424 0.461261C5.70418 0.167518 4.72707 0.596597 4.33429 1.45806L5.69912 2.08035ZM3.92748 4.98798C4.30318 4.79717 4.60298 4.48447 4.77779 4.10106L3.41296 3.47877C3.37909 3.55305 3.32101 3.61363 3.24823 3.65059L3.92748 4.98798ZM1.77299 6.44114C1.70879 6.26933 1.78386 6.07671 1.94739 5.99365L1.26814 4.65626C0.423994 5.08499 0.0364756 6.07932 0.367886 6.9662L1.77299 6.44114ZM2.57626 9.74989C2.707 9.3493 2.69787 8.9162 2.55037 8.52148L1.14527 9.04654C1.17384 9.12301 1.17561 9.20691 1.15028 9.28451L2.57626 9.74989ZM2.08035 12.3009C1.91346 12.2248 1.83034 12.0355 1.88724 11.8611L0.461261 11.3958C0.167519 12.2958 0.596597 13.2729 1.45806 13.6657L2.08035 12.3009ZM4.98799 14.0725C4.79717 13.6968 4.48446 13.397 4.10106 13.2222L3.47877 14.587C3.55305 14.6209 3.61363 14.679 3.65059 14.7518L4.98799 14.0725ZM6.44114 16.227C6.26933 16.2912 6.07671 16.2161 5.99365 16.0526L4.65626 16.7319C5.08499 17.576 6.07932 17.9635 6.9662 17.6321L6.44114 16.227ZM9.74989 15.4237C9.3493 15.293 8.9162 15.3021 8.52148 15.4496L9.04654 16.8547C9.12301 16.8262 9.20691 16.8244 9.28451 16.8497L9.74989 15.4237ZM12.3009 15.9197C12.2248 16.0865 12.0355 16.1697 11.8611 16.1128L11.3958 17.5387C12.2958 17.8325 13.2729 17.4034 13.6657 16.5419L12.3009 15.9197ZM14.0725 13.012C13.6968 13.2028 13.397 13.5155 13.2222 13.8989L14.587 14.5212C14.6209 14.447 14.679 14.3864 14.7518 14.3494L14.0725 13.012ZM16.227 11.5589C16.2912 11.7307 16.2161 11.9233 16.0526 12.0063L16.7319 13.3437C17.576 12.915 17.9635 11.9207 17.6321 11.0338L16.227 11.5589ZM15.4237 8.25011C15.293 8.6507 15.3021 9.0838 15.4496 9.47852L16.8547 8.95346C16.8262 8.87699 16.8244 8.79309 16.8497 8.71549L15.4237 8.25011ZM17.5387 6.60424C17.8325 5.70418 17.4034 4.72707 16.5419 4.33429L15.9197 5.69912C16.0865 5.77521 16.1697 5.9645 16.1128 6.13886L17.5387 6.60424ZM6.53033 12.5303L12.5303 6.53033L11.4697 5.46967L5.46967 11.4697L6.53033 12.5303ZM6 7.25C5.86193 7.25 5.75 7.13807 5.75 7H4.25C4.25 7.9665 5.0335 8.75 6 8.75V7.25ZM5.75 7C5.75 6.86193 5.86193 6.75 6 6.75V5.25C5.0335 5.25 4.25 6.0335 4.25 7H5.75ZM6 6.75C6.13807 6.75 6.25 6.86193 6.25 7H7.75C7.75 6.0335 6.9665 5.25 6 5.25V6.75ZM6.25 7C6.25 7.13807 6.13807 7.25 6 7.25V8.75C6.9665 8.75 7.75 7.9665 7.75 7H6.25ZM12 11.25C11.8619 11.25 11.75 11.1381 11.75 11H10.25C10.25 11.9665 11.0335 12.75 12 12.75V11.25ZM11.75 11C11.75 10.8619 11.8619 10.75 12 10.75V9.25C11.0335 9.25 10.25 10.0335 10.25 11H11.75ZM12 10.75C12.1381 10.75 12.25 10.8619 12.25 11H13.75C13.75 10.0335 12.9665 9.25 12 9.25V10.75ZM12.25 11C12.25 11.1381 12.1381 11.25 12 11.25V12.75C12.9665 12.75 13.75 11.9665 13.75 11H12.25Z" fill="#8388A8"/> </svg>
                      <span>Fees</span>
                    </div>
                  </div>
                ),
              },
              {
                tabButton: "Notification",
                tabContent: (
                  <div
                    className={cn({
                      [setting_styles.toggleBlock]: true,
                      [setting_styles.toggleBlock2]: true
                    })}
                  >
                    <div>
                      <span>Transaction</span>
                      <Toggle onChange={() => console.log('a')}/>
                    </div>
                    <div>
                      <span>Price Change</span>
                      <Toggle onChange={() => console.log('a')}/>
                    </div>
                    <div>
                      <span>Price Update</span>
                      <Toggle onChange={() => console.log('a')}/>
                    </div>
                  </div>
                ),
              },
              {
                tabButton: "Password",
                tabContent: (
                  <div>
                    <div className="form_fontrol">
                      <span className="form_label">Enter old password</span>
                      <input className={"form_input form_input_"+(theme === 'dark'?'dark':'light')} type="password"></input>
                    </div>
                    <div className="form_fontrol">
                      <span className="form_label">Type your new password</span>
                      <input className={"form_input form_input_"+(theme === 'dark'?'dark':'light')} type="password"></input>
                    </div>
                    <div className="form_fontrol">
                      <span className="form_label">Confirm new password</span>
                      <input className={"form_input form_input_"+(theme === 'dark'?'dark':'light')} type="password"></input>
                    </div>
                    <div className={`saveSetting ${setting_styles.savePassword}`}>
                      <Button
                        className={"btn btn_"+(theme === 'dark'?'dark':'light')}
                        type="button" color="primary"
                        onClick={() => setPassword() }
                      >Change your password</Button>
                      <Dialog
                        classes={{
                          root: classes.center,
                          paper: classes.modal,
                        }}
                        open={classicModal}
                        keepMounted
                        onClose={() => setClassicModal(false)}
                        aria-labelledby="classic-modal-slide-title"
                        aria-describedby="classic-modal-slide-description"
                      >
                        <DialogContent
                          id="classic-modal-slide-description"
                          className={`${classes.modalBody} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
                        >
                          <div className="modalLogo">
                            <Image
                              src={"/img/setting/password"+(theme==='dark'?"":"_l")+".png"}// Route of the image file
                              height={109} // Desired size with correct aspect ratio
                              width={109} // Desired size with correct aspect ratio
                              alt="Success"
                            />
                          </div>
                          <p className={`modalCenterTxt`}>Your password has been changed successfully.</p>
                        </DialogContent>
                        <DialogActions
                          className={`${classes.modalFooter} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
                        >
                          <Button
                            className={"modalCenterBtn btn_"+(theme === 'dark'?'dark':'light')}
                            onClick={() => setClassicModal(false)}
                            color="danger"
                            simple
                          >
                            Done
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                ),
              }
            ]}
          />
      </div>
    </div>
  );
}
