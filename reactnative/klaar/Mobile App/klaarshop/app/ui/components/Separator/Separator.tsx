import * as React from 'react';
import { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Theme, useThemeContext } from '~/ui/theme';



type Props = {
    title?: string
}

const Separator: React.FC<Props> = ({ title }) => {

    const { s } = useThemeContext(createStyle);

    return <View style={[s?.separator, (!!title ? s?.paddingVer : {})]}>
        {!!title && <Text style={s?.textStyle}>{title}</Text>}
    </View>;
};

const MSeparator = memo(Separator)
export { MSeparator as Separator };

const createStyle = (theme: Theme) =>
    StyleSheet.create({
        separator: {
            marginLeft: theme.metrics.x4,
            height: theme.metrics.x5,
            justifyContent: `center`
        },
        textStyle: {
            fontSize: 13,
            fontWeight: "400",
            color: theme.colors.silver
        },
        paddingVer: {
            paddingVertical: 16
        }
    });
