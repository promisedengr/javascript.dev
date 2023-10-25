import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useThemeContext } from '~/ui/theme';
import { FilterBtn } from './assets/FilterBtn';
import { SortBtn } from './assets/SortBtn';
import { createStyle } from './styles';


type SortBoxProps = {
   onSortPress: () => void
   onFilterPress: () => void
}

const SortBox: FC<SortBoxProps> = memo((props) => {
    const { s } = useThemeContext(createStyle);
    const { t } = useTranslation();
    const {onSortPress, onFilterPress} = props

    return (
        <View style={s?.container}>
            <TouchableOpacity style={s?.btn} onPress={onSortPress}>
                <SortBtn />
                <Text style={s?.btnText}>
                    {t('buttons.sort')}
                </Text>
            </TouchableOpacity>
            <View style={s?.separator} />
            <TouchableOpacity style={s?.btn} onPress={onFilterPress}>
                <FilterBtn />
                <Text style={s?.btnText}>
                    {t('buttons.filters')}
                </Text>
            </TouchableOpacity>
        </View>
    )
});

export { SortBox }