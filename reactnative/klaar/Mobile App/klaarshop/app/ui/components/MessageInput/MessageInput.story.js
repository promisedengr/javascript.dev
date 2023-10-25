import React from "react";
import { KeyboardAvoidingView, SafeAreaView, View, ScrollView } from "react-native"

import { storiesOf } from '@storybook/react-native';
import { MessageInput } from "./MessageInput";

const MessageInputStory = () => {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{ flex: 1 }}
        >
            <View style={{ position: `absolute`, bottom: 0 }}>
                <MessageInput />
            </View>

        </KeyboardAvoidingView>

    )
}



storiesOf('Chat', module)
    .add('MessageInput', () => <MessageInputStory />);
