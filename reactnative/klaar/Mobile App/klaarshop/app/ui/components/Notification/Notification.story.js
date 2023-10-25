import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { storiesOf } from '@storybook/react-native';
import { Notification } from './Notification'


const NotificationStory = (props) => {
    const [modal, setModal] = useState(true)

    const onAccept = () => {
        console.log(`Accept!`)
        setModal(false)
    }

    const onClose = () => {
        setModal(false)
    }

    return (<>
        <TouchableOpacity onPress={() => setModal(true)}>
            <View style={{ width: `100%`, height: 60, backgroundColor: `blue`, justifyContent: `center`, alignItems: `center` }}>
                <Text style={{ color: `white` }}>PRESS</Text>
            </View>
        </TouchableOpacity>
        <Notification status={modal} onAccept={onAccept} onClose={onClose} />
    </>
    )
}


storiesOf('Notification', module)
    .add('NotificationRatePls', () => <NotificationStory />)
