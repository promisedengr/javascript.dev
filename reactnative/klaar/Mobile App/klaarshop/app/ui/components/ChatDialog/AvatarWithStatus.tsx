import { size } from 'lodash';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image';
import { useThemeContext, Theme } from '~/ui/theme';

interface Props {
    source: string
    isOnline?: boolean
    size?: number
    onlineStatusSize?: number
    borderRadiusSize?: number
}

const AvatarWithStatus = (props: Props) => {


    const { s } = useThemeContext(createStyle);

    const { source, isOnline = false,
        size = 56, onlineStatusSize = 14,
        borderRadiusSize = 20 } = props

    const onlineStatusStyle = [s?.onlineStatus,
    { width: onlineStatusSize, height: onlineStatusSize, borderRadius: onlineStatusSize / 2 }]

    const avatarWrapperStyle = [s?.avatarWrapper, { width: size, height: size, borderRadius: borderRadiusSize }]

    const absoluteStyle = [s?.absolute, { borderRadius: borderRadiusSize }]

    return (
        <View style={avatarWrapperStyle}>
            <FastImage style={absoluteStyle} source={{ uri: source }} />
            {!!isOnline
                && <View style={onlineStatusStyle} />
            }
        </View>
    )
}

export { AvatarWithStatus }


const createStyle = (theme: Theme) =>
    StyleSheet.create({
        avatarWrapper: {
            width: 56,
            height: 56,
            borderRadius: 20,
        },
        absolute: {
            position: `absolute`,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: 20
        },
        onlineStatus: {
            backgroundColor: theme.colors.lightBlue2,
            alignSelf: `flex-end`,
            width: 14,
            height: 14,
            borderRadius: 7,
            borderWidth: 1,
            borderColor: theme.colors.lightGray3
        }
    })
