import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '~/ui/theme/default/colors';
import { metrics } from '~/ui/theme/default/metrics';

type PropsType = {
    onPress(): void
}

const CircleWrapper: React.FC<PropsType> = React.memo((props) => {

    return (
        <TouchableOpacity style={styles.wrapper} onPress={props.onPress} activeOpacity={0.5} >
            {props.children}
        </TouchableOpacity>
    )
})

export { CircleWrapper }

const styles = StyleSheet.create({
    wrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,        
    }
})