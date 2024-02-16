import React from "react";
import Image from 'next/image'

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '../../components/CustomButtons/Button.js';

import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);

import setting_styles from './Support.module.css'

import { useTheme } from 'next-themes'

import http from '../http'
import { useSelector } from 'react-redux'
import { token } from '../JwtSlice';

export default function Setting() {
  const classes = useStyles();
  const {theme} = useTheme();

  const reduxToken = useSelector(token)

  const [classicModal, setClassicModal] = React.useState(false);
  const [supportSubject, setSupportSubject] = React.useState('');
  const [supportContent, setSupportContent] = React.useState('');

  const sendSupport = (pm) => {
    http.post('/send_support', {token:reduxToken, subject:supportSubject, content:supportContent })
    .then((response) => {
      console.log(response);
      document.getElementById("support_subject").value = '';
      document.getElementById("support_content").value = '';
    }, (error) => {
      console.log(error);
    });
    
    setClassicModal(true)
  }

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={classes.container}>
      <div id="navigation-pills">
        <div className={classes.title}>
          <h3>Help Support</h3>
        </div>
          
        <div>
          <div className="form_fontrol">
            <span className="form_label">Subject</span>
            <input
              id="support_subject"
              className={"form_input form_grey form_input_"+(theme === 'dark'?'dark':'light')}
              onChange={(e) => setSupportSubject(e.target.value)}
            ></input>
          </div>
          <div className="form_fontrol">
            <span className="form_label">Message</span>
            <textarea
              id = "support_content"
              className={"form_input form_grey form_input_"+(theme === 'dark'?'dark':'light')}
              onChange={(e) => setSupportContent(e.target.value)}
            ></textarea>
          </div>
          <div className={`saveSetting ${setting_styles.saveProfile}`}>
            <Button
              className={"btn btn_"+(theme === 'dark'?'dark':'light')}
              type="button" color="primary"
              onClick={() => sendSupport() }
            >SUBMIT</Button>
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
                    src={"/img/setting/support"+(theme==='dark'?"":"_l")+".png"}// Route of the image file
                    height={109} // Desired size with correct aspect ratio
                    width={109} // Desired size with correct aspect ratio
                    alt="Success"
                  />
                </div>
                <p className={`modalCenterTxt`}>Your support request has been submitted<br />successfully.</p>
              </DialogContent>
              <DialogActions
                className={`${classes.modalFooter} ${theme==='dark' ? 'modalBodyDark' : 'modalBodyLight'}`}
              >
                <Button
                  className={`modalCenterBtn btn_${(theme === 'dark'?'dark':'light')}`}
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
                
      </div>
    </div>
  );
}
