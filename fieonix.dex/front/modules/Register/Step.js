import React from "react";
import { useTheme } from 'next-themes'
import Image from 'next/image'


export default function Step({step}) {
  const {theme} = useTheme();

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={`reg_step`}>
      <div className={`flex`}>
        <div className={`flex-grow`}></div>
        <div className={`flex-grow-0`}>
          <div className={`flex`}>
            <div>
              <Image
                src={`/img/register/r1${step>1?2:(step==1?1:0)}.png`}
                width={`73`} height={`73`} alt="Person"
              ></Image>
              {step>1 &&
                <div className={`relative -top-7 left-12 h-0`}>
                  <Image
                    src={`/img/register/r0.png`}
                    width={`21`} height={`21`} alt="Person"
                  ></Image>
                </div>
              }
            </div>
            <div
              className={`w-10 pt-9`}
            >
              <hr></hr>
            </div>
            <div>
              <Image
                src={`/img/register/r2${step>2?2:(step==2?1:0)}.png`}
                width={`73`} height={`73`} alt="Address"
              ></Image>
              {step>2 &&
                <div className={`relative -top-7 left-12 h-0`}>
                  <Image
                    src={`/img/register/r0.png`}
                    width={`21`} height={`21`} alt="Person"
                  ></Image>
                </div>
              }
            </div>
            <div
              className={`w-10 pt-9`}
            >
              <hr></hr>
            </div>
            <div>
              <Image
                src={`/img/register/r3${step>3?2:(step==3?1:0)}.png`}
                width={`73`} height={`73`} alt="Email"
              ></Image>
              {step>3 &&
                <div className={`relative -top-7 left-12 h-0`}>
                  <Image
                    src={`/img/register/r0.png`}
                    width={`21`} height={`21`} alt="Person"
                  ></Image>
                </div>
              }
            </div>
            <div
              className={`w-10 pt-9`}
            >
              <hr></hr>
            </div>
            <div>
              <Image
                src={`/img/register/r4${step>4?2:(step==4?1:0)}.png`}
                width={`73`} height={`73`} alt="Confirm"
              ></Image>
            </div>
          </div>
        </div>
        <div className={`flex-grow`}></div>
      </div>
    </div>
  );
}
