import * as React from 'react';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme, useThemeContext } from '~/ui/theme';

type TitleDescriptionProps = {
    title: string;
    description?: string;
    invert?: boolean;
};
const TitleDescription: React.FC<TitleDescriptionProps> = memo(
    ({ title, description, invert }) => {
        const { s } = useThemeContext(createStyle);
        const fnln = title?.split(` `)

        const titleC = title
            ? <View style={{ flexWrap: `wrap`, flexDirection: `row`, marginRight: 80 }}>
                <Text style={s?.title}>{fnln[0] + ` `}
                </Text>
                <Text style={s?.title}>{fnln[1]}
                </Text>
            </View>
            : null;
        const descriptionC = description ? (
            <Text style={s?.description}>{description}</Text>
        ) : null;
        return invert ? (
            <View >
                {descriptionC}
                {titleC}
            </View>
        ) : (
                <View style={{ flexWrap: `wrap` }}>
                    {titleC}
                    {descriptionC}
                </View>
            );
    },
);

export { TitleDescription };

const createStyle = (theme: Theme) =>
    StyleSheet.create({
        title: theme.fonts.h1.semi,
        description: theme.fonts.h2.light,
    });
