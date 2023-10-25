import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(active) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Path
        d="M4.008 44l2.704-9.936A19.908 19.908 0 014 24C4 12.954 12.954 4 24 4s20 8.954 20 20-8.954 20-20 20a19.909 19.909 0 01-10.06-2.71L4.008 44zm12.774-29.384c-.258.016-.51.084-.742.2a2.587 2.587 0 00-.588.456c-.24.226-.376.422-.522.612a5.458 5.458 0 00-1.13 3.356c.004.98.26 1.934.66 2.826.818 1.804 2.164 3.714 3.942 5.484.428.426.846.854 1.296 1.252a18.896 18.896 0 007.68 4.092l1.138.174c.37.02.74-.008 1.112-.026a3.98 3.98 0 001.666-.462c.262-.135.517-.282.766-.44 0 0 .086-.056.25-.18.27-.2.436-.342.66-.576.166-.172.31-.374.42-.604.156-.326.312-.948.376-1.466.048-.396.034-.612.028-.746-.008-.214-.186-.436-.38-.53l-1.164-.522s-1.74-.758-2.802-1.242a.997.997 0 00-.354-.082.963.963 0 00-.756.254v-.004c-.01 0-.144.114-1.59 1.866a.7.7 0 01-.736.26 2.845 2.845 0 01-.382-.132c-.248-.104-.334-.144-.504-.218l-.01-.004a12.022 12.022 0 01-3.14-2c-.252-.22-.486-.46-.726-.692a12.593 12.593 0 01-2.04-2.536l-.118-.19a1.848 1.848 0 01-.204-.41c-.076-.294.122-.53.122-.53s.486-.532.712-.82c.188-.24.364-.488.526-.746.236-.38.31-.77.186-1.072-.56-1.368-1.14-2.73-1.736-4.082-.118-.268-.468-.46-.786-.498a8.877 8.877 0 00-.324-.032 6.752 6.752 0 00-.806.008v.002z"
        fill={active === true? "#3ADF57": "#c0c0c0"}
      />
    </Svg>
  )
}

export default SvgComponent