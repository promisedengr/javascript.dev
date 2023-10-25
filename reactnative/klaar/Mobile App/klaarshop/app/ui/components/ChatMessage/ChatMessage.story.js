import React from "react";
import { View } from "react-native"

import { storiesOf } from '@storybook/react-native';
import { ChatMessage } from "./ChatMessage";

const ChatMessageStory = () => {

    const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Nihil explicabo odit harum unde animi maiores accusamus ea, culpa voluptatum temporibus!`

    return (
        <View style={{ flex: 1, marginHorizontal: 16 }}>
            <ChatMessage
                source={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmumUKOWYPP8BxPDJc954EVPscLWBL9oqawA&usqp=CAU`}
                message={message} />
                <View style={{marginTop: 32}}/>
            <ChatMessage
                type={1}
                source={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmumUKOWYPP8BxPDJc954EVPscLWBL9oqawA&usqp=CAU`}
                message={message} />
        </View>
    )
}



storiesOf('Chat', module)
    .add('ChatMessage', () => <ChatMessageStory />);
