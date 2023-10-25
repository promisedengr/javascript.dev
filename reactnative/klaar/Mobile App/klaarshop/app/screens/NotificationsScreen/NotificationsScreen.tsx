import React, { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import {  SafeAreaView, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Navigation } from 'react-native-navigation'

import { Header } from '~/ui/components/Header'
import { Separator } from '~/ui/components/Separator'
import { Theme, useThemeContext } from '~/ui/theme'
import { theme } from '~/ui/theme/default/theme'
import { navigationService } from '../NavigationService'
import { NotificationMessage } from './blocks/NotificationMessage'

interface Props {

}

const NotificationsScreen: FC<Props> = memo((props) => {

    const { } = props

    const { s } = useThemeContext(createStyle);
    const { t } = useTranslation();

    const defaultData = [{
        title: `Keeanu Reeves`,
        subTitle: `Оставил вам отзыв`,
        source: `https://www.biography.com/.image/t_share/MTE5NTU2MzE2MzU1NzI0ODEx/keanu-reeves-9454211-1-402.jpg`,
        time: `12:30`
    }]

    const onBackPress = () => {
        Navigation.pop(navigationService.getCurrentScreenId())
    }

    return (
        <View style={s?.container}>
            <Header
                bgColor={theme.colors.white}
                headerTitleFontSize={17}
                headerTitle={t('Уведомления')}
                headerLeft={`arrow`}
                onPressBack={onBackPress}
                borderBottomWidth={0}
            />
            <ScrollView style={s?.content}>
                <Separator title={`TODAY`} />
                <NotificationMessage {...defaultData[0]} onPress={() => console.log(`Pressed`)} />
                <Separator title={`13 MAY`} />
                <NotificationMessage isIcon title={`Shopping Bag`} subTitle={`Добро пожаловать в наш магазин! Мы рады что вы выбрали именно нас. Пользуйтесь им всегда!`} onPress={() => console.log(`Pressed`)} />
            </ScrollView>
        </View>
    )
})

export { NotificationsScreen }


const createStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.lightGray3
        },
        content: {
            marginTop: theme.metrics.x4
        }
    })