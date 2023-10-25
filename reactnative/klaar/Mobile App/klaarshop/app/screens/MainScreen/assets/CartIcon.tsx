import * as React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import Svg, { SvgProps, Path, } from "react-native-svg"
import { theme } from "~/ui/theme/default/theme"


type Props = {
    count?: number
    onCartPress?: () => void
}

function CartIcon(props: SvgProps & Props) {

    const { count, onCartPress } = props


    return (
        <TouchableOpacity onPress={onCartPress}>
            <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                {...props}
            >
                {!!count && <View style={{
                    position: `absolute`,
                    backgroundColor: theme.colors.lightBlue2,
                    borderRadius: 10,
                    paddingHorizontal: 3,
                    top: 0, right: +count < 10 ? -4 : -8
                }} >
                    <Text style={{ color: `white`, fontSize: 10, fontWeight: "500" }}>
                        {count > 99 ? `+99` : count}
                    </Text>
                </View>}
                <Path
                    d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2z"
                    fill="#000"
                    stroke="#000"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
                    stroke="#000"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    )
}

export default CartIcon

