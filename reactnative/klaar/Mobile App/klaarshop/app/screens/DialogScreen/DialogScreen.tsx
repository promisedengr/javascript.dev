import React, { FC, memo, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ChatActions, MessageT } from '~/logic/chats/ChatsRedux'
import { chatSelector } from '~/logic/chats/ChatsSelectors'
import { ChatDialog } from '~/ui/components/ChatDialog/ChatDialog'
import { Preloader } from '~/ui/components/Preloader/Preloader'
import { SearchInput } from '~/ui/components/SearchInput'
import { Theme, useThemeContext } from '~/ui/theme'
import { navigationService } from '../NavigationService'
import { colors } from '~/ui/theme/default/colors'
import { metrics } from '~/ui/theme/default/metrics'
import { Header } from '~/ui/components/Header'
import { UserActions } from '~/logic/user/UserRedux'

interface Props {
   sellerId?: string
}

const DialogScreen: FC<Props> = memo((props) => {

   const { sellerId = undefined } = props

   const dispatch = useDispatch()
   const {
      getChatList: {
         data: chatListData,
         fetching: chatListFetching
      },
      getChatLogin: {
         fetching: chatLoginFetching
      },
      myUserId,
      onlineUsers
   } = useSelector(chatSelector)

   const { t } = useTranslation()


   useEffect(() => {
      if (sellerId) {
         chatListData?.chats.map(c => {
            c.members.map(d => {
               if (d._id === sellerId) {
                  //console.log(`d._id`, d._id)
                  //console.log(`sellerId`, sellerId)
                  onChatPress({
                     name: `${d.fn} ${d.ln}`,
                     source: d.photo,
                     chatId: c._id
                  })
               }
            })
         })
      }
   }, [sellerId])


   useEffect(() => {
      if (!chatListFetching)
         dispatch(ChatActions.getChatList.request({ index: 0 }))//here 1
      // return () => {
      //    dispatch(ChatActions.deleteAllOnlineUsers())
      // }
   }, [])

   const onChatPress = (props: {
      name: string,
      source: string,
      chatId: string,
      companionId: string
   }) => {
      console.log(`ChatScreen`)
      Navigation.push(navigationService.getCurrentScreenId(), {
         component: {
            name: 'ChatScreen',
            passProps: props
         },

      });

   }

   const onCancelPress = () => {
      setSearchValue(``)
   }

   const onBackPress = () => {
      dispatch(UserActions.mainScreenRoute(`home`))
   }

   const { s } = useThemeContext(createStyle);

   const [searchValue, setSearchValue] = useState(``)

   return (
      <View style={s?.container}>
         <View style={s?.container}>
            <Header
               onPressBack={onBackPress}
               headerCenterWidth={`80%`}
               headerLeftWidth={`15%`}
               headerLeft={`arrow`}
               headerCenter={
                  <SearchInput
                     onClearPress={onCancelPress} height={45}
                     value={searchValue}
                     onChangeText={(text) => setSearchValue(text)}
                  />
               }
               borderBottomWidth={0}
            />

            {chatListFetching || !chatListData || chatLoginFetching
               ? <Preloader />
               : (<ScrollView showsVerticalScrollIndicator={false}>
                  <View style={s?.dialogs}>
                     {chatListData?.chats.map(d => {
                        let fromUserName = '';
                        let userPhoto = '';
                        let userId = '';
                        d.members.map(i => {
                           if (i._id !== myUserId) {
                              fromUserName = `${i.fn} ${i.ln}`;
                              userPhoto = i.photo;
                              userId = i._id;
                           }
                        })

                        const lastMessage = d.messages.length > 0 ? d.messages[0].text : ``
                        const lastMessageDate = d.messages.length > 0 ? d.messages[0].date : 0

                        if (fromUserName.toLowerCase().includes(searchValue.toLowerCase())) {
                           return (
                              <View style={s?.chatDialog} key={d._id}>
                                 <ChatDialog
                                    source={userPhoto}
                                    isOnline={onlineUsers.includes(userId)}
                                    message={lastMessage}
                                    title={fromUserName}
                                    messCounter={d.newMessCounter}
                                    time={lastMessageDate}
                                    onPress={() => onChatPress({
                                       name: fromUserName,
                                       source: userPhoto,
                                       chatId: d._id,
                                       companionId: userId
                                    })} />
                              </View>
                           )
                        }
                     })}
                  </View>
               </ScrollView>
               )
            }
         </View>
      </View>
   )
}
)
export { DialogScreen }

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1,
      },
      headerContainer: {
         width: '100%',
         height: 60,
         flexDirection: `row`,
         alignItems: `center`,

      },
      searchInput: {
         flex: 17,
      },
      backIcon: {
         flex: 3,
         justifyContent: `center`,
         alignItems: `center`,
         paddingLeft: metrics.x
      },
      backIconWrapper: {
         paddingLeft: metrics.x6,
         width: `100%`,
         height: `100%`,
         justifyContent: `center`
      },
      dialogs: {
         marginHorizontal: theme.metrics.x4
      },
      chatDialog: {
         marginTop: theme.metrics.x4
      },
      cancelText: {
         fontSize: 17,
         fontWeight: "400",
         color: colors.black,
      },
      cancelWrapper: {
         flex: 5,
         justifyContent: `center`,
         alignItems: `center`
      }
   })