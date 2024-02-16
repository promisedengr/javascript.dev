import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);

import setting_styles from './Support.module.css'
import cn from 'classnames'

import { useTheme } from 'next-themes'

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

export default function Setting() {
  const classes = useStyles();
  const {theme} = useTheme();

  const [expanded, setExpanded] = React.useState('panel2');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={classes.container}>
      <div id="navigation-pills">
        <div className={classes.title}>
          <h3>Frequently Asked Questions</h3>
        </div>
        <div className={setting_styles.accordian}>
          <MuiAccordion disableGutters expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <MuiAccordionSummary
              expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
              aria-controls="panel1d-content" id="panel1d-header"
            >
              <div>Why should I use Fieonix?</div>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </div>
            </MuiAccordionDetails>
          </MuiAccordion>

          <MuiAccordion disableGutters expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <MuiAccordionSummary
              expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
              aria-controls="panel2d-content" id="panel2d-header"
            >
              <div>Can I switch from my existing wallet app like Metamask, MyEtherWallet, etc.?</div>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
              <div>
                Yes, you can. Every wallet uses a private key to secure its assets which you can import into Fieonix Wallet. Just look for the 12 word recovery phrase or mnemonic in the settings menu of your current wallet and then use that same 12 word phrase to sign into Fieonix Wallet
              </div>
            </MuiAccordionDetails>
          </MuiAccordion>

          <MuiAccordion disableGutters expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <MuiAccordionSummary
              expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
              aria-controls="panel1d-content" id="panel1d-header"
            >
              <div>How do I protect against losing access to my funds?</div>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </div>
            </MuiAccordionDetails>
          </MuiAccordion>

          <MuiAccordion disableGutters expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <MuiAccordionSummary
              expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
              aria-controls="panel1d-content" id="panel1d-header"
            >
              <div>What should I remember when sending or receiving cryptocurrency?</div>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </div>
            </MuiAccordionDetails>
          </MuiAccordion>
        </div>
      </div>
    </div>
  );
}
