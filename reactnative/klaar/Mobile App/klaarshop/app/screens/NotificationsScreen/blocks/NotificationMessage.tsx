import React, { FC } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

import { AvatarWithStatus } from '~/ui/components/ChatDialog/AvatarWithStatus';
import ArrowIcon from '~/ui/components/Header/assets/arrow';
import { useThemeContext, Theme } from '~/ui/theme';
import { theme } from '~/ui/theme/default/theme';
import ShopBagIcon from '../assets/ShopBagIcon';

interface Props {
    title: string
    subTitle: string
    source?: string
    time?: string
    onPress?: (...args: any) => void
    isIcon?: boolean
}

const { width: w } = Dimensions.get(`screen`)

const NotificationMessage: FC<Props> = (props) => {

    const { title, time, source, subTitle, onPress = () => 1, isIcon = false } = props

    const { s } = useThemeContext(createStyle);


    return (
        <TouchableOpacity onPress={() => onPress()} style={s?.container}>
            <View style={[s?.avatarWrapper]}>
                {isIcon
                    ? <View style={s?.iconWrapper}><ShopBagIcon /></View>
                    : <AvatarWithStatus size={56} source={source} />
                }
            </View>
            <View style={s?.titleWrapper}>
                <Text style={s?.titleText} numberOfLines={1}>{title}</Text>
                <Text style={s?.subTitleText} numberOfLines={isIcon ? 10 : 1}>{subTitle}</Text>
            </View>
            {!!time
                ? (
                    <>
                        <View style={s?.timeWrapper}>
                            <Text style={s?.timeText}>{time}</Text>
                        </View>
                        <View style={s?.arrowWrapper}>
                            <ArrowIcon color={theme.colors.silver} />
                        </View>
                    </>
                )
            : <View style={{flex: 3}}/>}
        </TouchableOpacity>
    )
}

export { NotificationMessage }


const createStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            width: w,
            backgroundColor: theme.colors.white,
            paddingVertical: theme.metrics.x2,
            paddingHorizontal: theme.metrics.x4,
            flexDirection: `row`,
            alignItems: `center`
        },
        avatarWrapper: {
            flex: 3,
        },
        titleWrapper: {
            flex: 10,
        },
        timeWrapper: {
            flex: 2,
            alignItems: `center`
        },
        arrowWrapper: {
            flex: 1,
            transform: [{ rotate: `180deg` }]
        },
        titleText: {
            fontSize: theme.metrics.x4,
            color: theme.colors.black,
            fontWeight: "500"
        },
        subTitleText: {
            fontSize: theme.metrics.x3 + theme.metrics.x05,
            color: theme.colors.silver,
            fontWeight: "400"
        },
        timeText: {
            fontSize: theme.metrics.x3 + theme.metrics.x025,
            color: theme.colors.silver,
            fontWeight: "400"
        },
        iconWrapper: {
            justifyContent: `center`,
            alignItems: `center`,
            width: 56,
            height: 56,
            backgroundColor: theme.colors.lightGray3,
            borderRadius: theme.metrics.x5
        }


    })