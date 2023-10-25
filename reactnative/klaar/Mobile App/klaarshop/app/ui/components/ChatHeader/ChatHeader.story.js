import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native';

import { ChatHeader } from './ChatHeader'


const ChatHeaderStory = (props) => {
    return (
        <View>
            <ChatHeader
                name={`Kristin Williamson`}
                source={`https://cdn.eso.org/images/thumb300y/eso1907a.jpg`}
                status={true}
                onBack={() => 1}
            />
        </View>
    )
}





storiesOf('Chat', module)
    .add('ChatHeaderStory', () => <ChatHeaderStory />);
