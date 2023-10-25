import React from "react";
import { View } from "react-native"
import { ChatDialog } from "./ChatDialog";
import { storiesOf } from '@storybook/react-native';

const ChatDialogStory = () => {
    return (
        <View style={{flex:1, alignItems: `center`, marginTop: 16}}>
            <ChatDialog source={`https://static.wikia.nocookie.net/cyberpunk8149/images/f/fc/Johny_2077.png/revision/latest?cb=20190616112955&path-prefix=ru`}
                title={`Johny Silver`}
                time={`20:77`}
                message={`Wake the fuck up, Samurai. We have a city to burn`}
                messCounter={1}
                isOnline />
        </View>
    )
}



storiesOf('Chat', module)
    .add('ChatDialog', () => <ChatDialogStory />);
