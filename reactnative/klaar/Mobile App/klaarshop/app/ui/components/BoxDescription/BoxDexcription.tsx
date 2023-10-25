import * as React from 'react';
import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Theme, useThemeContext } from '~/ui/theme';
import { fonts } from '~/ui/theme/default/fonts';
import { metrics } from '~/ui/theme/default/metrics';

export type BoxDescriptionType = {
    title?: string
    marginTop?: number,
    marginBottom?: number
};

const BoxDescription: React.FC<BoxDescriptionType> = props => {
    const {
        title, 
        marginBottom,
        marginTop,    
    } = props;

    const titleStyle = {
        marginTop,
        marginBottom
    };
    
    const { s } = useThemeContext(createStyle);

    return (
        <>
            <Text style={[s?.textStyle, fonts.h3.light, titleStyle]}>
                {title}
            </Text>
        </>
    )
};

const MBoxDescription = memo(BoxDescription);
export { MBoxDescription as BoxDescription };

const createStyle = (theme: Theme) =>
  StyleSheet.create({
    textStyle: {
        textTransform: 'uppercase',
        color: theme.colors.boxDescription,
        marginLeft: metrics.x4,        
        letterSpacing: -0.078
    }     
  });