import  * as React from 'react';
import { Image } from 'react-native';

const RussianPost = () => {
    return (
        <Image 
            style={{width: 32, height: 32}}
            source={require('./post.png')}
        />
    )
};

export default RussianPost