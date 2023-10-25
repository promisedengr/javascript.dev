import React from 'react'
import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native'
import { Theme, useThemeContext } from '~/ui/theme'
import { BlurView } from '@react-native-community/blur'
import CloseIcon from '~/ui/components/ShareModal/assets/close.js'
import { useTranslation } from 'react-i18next'


interface Props {
    status: boolean,
    onClose: () => void
    onAccept: () => void
}

const { width: w, height: h } = Dimensions.get(`screen`)

const Notification = (props: Props) => {
    const { status, onClose, onAccept } = props

    const { s } = useThemeContext(createStyle);

    const { t } = useTranslation();

    const subTitleText = t(`notification.subtitle`)

    const titleText = t(`notification.title`)

    return (
        <Modal visible={status} transparent={true} animationType={`fade`}>
            <BlurView
                style={s?.absolute}
                blurType='dark'
                blurAmount={1}
                reducedTransparencyFallbackColor="white"
            />
            <View style={s?.container}>
                <View style={s?.content}>
                    <View style={s?.closeWrapper}>
                        <TouchableOpacity onPress={onClose} >
                            <CloseIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={[s?.centerStyle, s?.titleWrapper]}>
                        <Text style={s?.titleText}>{titleText}</Text>
                    </View>
                    <View style={[s?.centerStyle, s?.titleWrapper]}>
                        <Text style={[s?.subTitleText]}>{subTitleText}</Text>
                    </View>
                    <View style={s?.buttons}>
                        <TouchableOpacity onPress={onClose} style={[s?.button1, s?.centerStyle]}>
                            <Text style={s?.button1Text}>{t(`notification.no`)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onAccept} style={[s?.button2, s?.centerStyle]}>
                            <Text style={s?.button2Text}>{t(`notification.yes`)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export { Notification }

export const createStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: `center`,
            alignItems: `center`
        },
        content: {
            width: w - theme.metrics.x4 * 2,
            position: `absolute`,
            backgroundColor: theme.colors.white,
            borderRadius: theme.metrics.x5
        },
        absolute: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        closeWrapper: {
            justifyContent: `center`,
            alignItems: `flex-end`,
            paddingRight: theme.metrics.x4,
            paddingTop: theme.metrics.x4
        },
        close: {
            borderWidth: theme.metrics.x05,
            borderColor: theme.colors.lightBlue2,
            width: theme.metrics.x4 * 2,
            height: theme.metrics.x4 * 2,
            borderRadius: theme.metrics.x4

        },
        centerStyle: {
            justifyContent: `center`,
            alignItems: `center`
        },
        titleWrapper: {
            paddingTop: theme.metrics.x4,
            paddingHorizontal: theme.metrics.x4,
        },
        titleText: {
            fontSize: theme.metrics.x6,
            fontWeight: "500",
            color: theme.colors.black,
            textAlign: `center`
        },
        subTitleText: {
            fontWeight: "400",
            fontSize: theme.metrics.x3,
            color: theme.colors.gray5,
            textAlign: `center`
        },
        buttons: {
            flexDirection: `row`,
            width: `100%`,
            marginTop: theme.metrics.x6,
            height: 60
        },
        button1: {
            borderBottomLeftRadius: theme.metrics.x4,
            borderWidth: 1,
            borderColor: theme.colors.lightGray,
            flex: 1,
        },
        button2: {
            backgroundColor: theme.colors.lightBlue2,
            borderBottomRightRadius: theme.metrics.x4,
            flex: 1,
        },
        button1Text: {
            color: theme.colors.black,
            fontSize: 18,
            fontWeight: "400"
        },
        button2Text: {
            color: theme.colors.white,
            fontSize: 18,
            fontWeight: "400"
        }

    })
