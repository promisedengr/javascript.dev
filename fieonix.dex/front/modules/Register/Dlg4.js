import React from "react";
import { useTheme } from 'next-themes'

import Image from 'next/image'

export default function Dlg4() {
  const {theme} = useTheme();

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={`w-full`}>
      <div className={`text-center text-xl font-medium`}>Verification</div>
      <div className={`mx-auto my-10`} style={{width:'540px'}}>
        <Image
          src={`/img/register/verify.png`}
          width={540} height={341} alt={`Verification`}
        ></Image>
      </div>
      <div className={`text-center relative -top-36 px-28 h-0`}>
        Thanks, we’ll review your documents shortly.
        You’ll receive an email confirmation upon completion.
      </div>
    </div>
  );
}
