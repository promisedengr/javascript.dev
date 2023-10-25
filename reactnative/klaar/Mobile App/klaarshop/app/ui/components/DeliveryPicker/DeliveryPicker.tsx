import * as React from 'react';
import { memo } from 'react';
import { Dimensions, StyleSheet, Switch, Text, View } from 'react-native';
import { Theme, useThemeContext } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';
import { fonts } from '~/ui/theme/default/fonts';
import { metrics } from '~/ui/theme/default/metrics';

const { width, height } = Dimensions.get('window');

export type DeliveryPickerType = {
    title: string,
    description?: string
    icon: object,
    value: boolean
    reset(): void
};

const DeliveryPicker: React.FC<DeliveryPickerType> = (props) => {
    const { title, description, icon, value, reset} = props;
    const { s } = useThemeContext(createStyle);    

    return(
        <View style={s?.box}>
            <View style={s?.leftBox}>
                <View style={{alignItems: 'center', width: 30}}>
                    {icon}
                </View>                
                <View style={s?.descriptionBox}>
                    <Text style={[s?.titleStyle, fonts.h3.light]}>
                        {title}
                    </Text>
                    {description
                    ?   <Text style={[s?.descriptionText, fonts.h3.light]}>
                            {description}
                        </Text>
                    : null
                    }

                </View>
            </View>
            <Switch
                trackColor={{ false: colors.white, true: colors.green1 }}
                thumbColor={colors.white}
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                onValueChange={()=> reset()}
                value={value}
            />
        </View>
    )
}

const MDeliveryPicker = memo(DeliveryPicker);
export { MDeliveryPicker as DeliveryPicker };

const createStyle = (theme: Theme) =>
  StyleSheet.create({
    box: {        
        alignSelf: 'center',
        alignContent: 'center',
        width: width * 0.92,       
        justifyContent: 'space-between',
        flexDirection: 'row',       
        marginVertical: height*0.02,      
    },
    leftBox: {        
        flexDirection: 'row',
        alignItems: 'center',        
    },
    descriptionBox: {        
        marginLeft: metrics.x3,
    },
    titleStyle: {
        color: theme.colors.darkGray,
        letterSpacing: 0.16
    },
    descriptionText: {
        color: theme.colors.silver,
        letterSpacing: 0.16
    } 
  });

