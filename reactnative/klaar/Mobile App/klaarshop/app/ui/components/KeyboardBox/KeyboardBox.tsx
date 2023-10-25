import React, { memo, FC, useEffect, useRef } from 'react';
import { Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type PropsTypes = {
    scrollDistance:  number
}

const KeyboardBox: FC<PropsTypes> = memo((props) => {
    
    const refScroll = useRef<any>(null);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        };
    }, []);
    
    const _keyboardDidShow = () => {          
        refScroll.current.scrollTo({ y: props.scrollDistance })
    };

    return (
        <ScrollView 
            style={{backgroundColor: 'white'}}
            ref={refScroll} 
            showsVerticalScrollIndicator={false}
        >
            {props.children}
        </ScrollView>
    )
});

export { KeyboardBox }