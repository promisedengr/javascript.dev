import React, { FC, memo, useEffect, useRef, useState } from 'react'
import {
   Dimensions, NativeScrollEvent, NativeSyntheticEvent,
   ScrollView, StyleSheet, Text, View
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { ChatHeader } from '~/ui/components/ChatHeader/ChatHeader'
import { ChatMessage } from '~/ui/components/ChatMessage/ChatMessage'
import { MessageInput } from '~/ui/components/MessageInput/MessageInput'
import { Theme, useThemeContext } from '~/ui/theme'
import { navigationService } from '../NavigationService'
import { chatSelector } from '~/logic/chats/ChatsSelectors'
import { ChatActions, MessageT } from '~/logic/chats/ChatsRedux'
import { dateDayMonthYear, dateFormater } from '~/store/restHelper'
import { colors } from '~/ui/theme/default/colors'
import { profileSelector } from '~/logic/profile/ProfileSelectors'
import { Preloader } from '~/ui/components/Preloader/Preloader'
import { FlatList } from 'react-native-gesture-handler'

interface Props {
   name: string
   status: boolean
   source: string
   chatId: string
   companionId: string
}

const { width: w } = Dimensions.get(`screen`)

const ChatScreen: FC<Props> = memo((props: Props) => {
   const { s } = useThemeContext(createStyle);

   const dispatch = useDispatch()
   const { name, status, source, chatId, companionId } = props;
   const [isUserScroll, setIsUserScroll] = useState(false);
   const [itemsIndex, setItemsIndex] = useState(15);
   const [loadMore, setLoadMore] = useState(false);
   const [online, setOnline] = useState(false);

   const {
      getMessagesList: {
         data: messagesListData,
         fetching: messagesListFetching
      },
      onlineUsers: onlineUsers
   } = useSelector(chatSelector)

   const {
      getSelfProfile: {
         data: myProfileData,
         fetching: myProfileFetching
      }
   } = useSelector(profileSelector)

   const myUserId = myProfileData?._id

   useEffect(() => {
      setItemsIndex(15)
      dispatch(ChatActions.getMessagesList.request({ chatId, index: `0` }))
      dispatch(ChatActions.currentChat(chatId))
      return () => {
         dispatch(ChatActions.currentChat(``))
         // dispatch(ChatActions.addNewMessCounter({ chatId, value: 0 }))
      }
   }, [])

   const onLoadMore = () => {
      setItemsIndex(itemsIndex + 15)
      dispatch(ChatActions.getMessagesList.request({ chatId, index: `${itemsIndex}` }))
   }

   const dateFormater_HH_MM = dateFormater(`HH-MM`)

   const [message, setMessage] = useState(``)

   useEffect(() => {
      if (!isUserScroll) {
         flatList.current?.scrollToOffset({ animated: true, offset: 0 })
      }
   }, [messagesListData])


   let flatList = useRef<FlatList<{}>>(null)
   let scrollHor = useRef<ScrollView>(null)

   const onBackPress = () => {
      dispatch(ChatActions.currentChat(``))
      dispatch(ChatActions.addNewMessCounter({ chatId, value: 0 }))
      Navigation.pop(navigationService.getCurrentScreenId())
   }

   const onSendMessage = (value: string) => {
      setMessage(``)
      dispatch(ChatActions.sendMessage.request({
         chatId,
         text: message
      }))
   }

   const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {

      const { contentOffset } = e.nativeEvent

      const userScroll = contentOffset.y > 100

      if (!isUserScroll === userScroll)
         setIsUserScroll(userScroll)
   }

   const messageDate = (timeStamp: number) => {
      const date = dateDayMonthYear(timeStamp * 1000)
      return `${date[2]} ${date[1]}`
   }

   const addDate = () => {
      let datesArr: string[] = []

      const newMessagesListData: any = messagesListData
         ? { ...messagesListData, messages: [...messagesListData.messages] }
         : null

      if (newMessagesListData && newMessagesListData.messages) {
         for (let i = newMessagesListData?.messages.length - 1; i >= 0; i--) {
            if (!datesArr.includes(messageDate(newMessagesListData?.messages[i].date))) {
               newMessagesListData.messages[i] = {
                  ...newMessagesListData.messages[i], elem: (<View style={s?.dateWrapper}>
                     <Text style={s?.dateText}>
                        {messageDate(newMessagesListData?.messages[i].date)}
                     </Text>
                  </View>)
               }
               datesArr.push(messageDate(newMessagesListData?.messages[i].date))
            }
         }
      }

      return newMessagesListData
   }

   const newMessagesListData = addDate()

   const _renderItems = ({ item: m, index: idx }: { item: MessageT & { elem: JSX.Element }, index: number }) => {

      return (
         <View style={s?.messageWrapper} >
            {m.elem ?? null}
            <View >
               <ChatMessage message={m.text}
                  source={myUserId === m.fromUserId ? myProfileData!.photo : source}
                  type={myUserId !== m.fromUserId} />
               <View style={s?.timeWrapper}>
                  <Text style={s?.timeText}>
                     {dateFormater_HH_MM(m.date)}
                  </Text>
               </View>
            </View>
         </View>
      )
   }

   const onEndReached = () => {
      if (!loadMore && (messagesListData!.messages.length % 15 === 0)) {
         onLoadMore()
         setLoadMore(true)
      }
   }

   const footerLoader = (loading: boolean) => (
      loading
         ? <View style={{ paddingVertical: 10 }}><Preloader /></View>
         : messagesListData && (messagesListData?.messages.length % 15 === 0) ? <View style={{ height: 50 }} /> : null
   )

   useEffect(() => {
      setOnline(onlineUsers.includes(companionId));
   }, [onlineUsers]);

   return (
      <View style={s?.container} >
         <ChatHeader name={name} status={online} source={source} onBack={onBackPress} />
         {(myProfileFetching || messagesListFetching) && !loadMore
            ? <Preloader />
            : <>
               <ScrollView
                  showsHorizontalScrollIndicator={false}
                  alwaysBounceHorizontal={false}
                  horizontal
                  pagingEnabled
                  ref={scrollHor}
                  contentContainerStyle={{ width: w + 60 }}
               >
                  <FlatList
                     ref={flatList}
                     onScroll={onScroll}
                     data={newMessagesListData?.messages}
                     keyExtractor={(item: MessageT & { elem: JSX.Element }) => `${item.date}`}
                     renderItem={_renderItems}
                     showsVerticalScrollIndicator={false}
                     keyboardDismissMode={'on-drag'}
                     style={s?.chatContainer}
                     contentContainerStyle={s?.chatContent}
                     inverted
                     onEndReached={onEndReached}
                     onEndReachedThreshold={.1}
                     ListFooterComponent={<View style={{ width: w }}>{footerLoader(messagesListFetching && loadMore)}</View>}

                  />
               </ScrollView>
               <MessageInput
                  onSendMessage={onSendMessage}
                  value={message}
                  onChangeText={(m: string) => setMessage(m)} />
            </>
         }
      </View>
   )
})

export { ChatScreen }

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1,
      },
      chatContainer: {
         backgroundColor: theme.colors.lightGray3,
         transform: [{ rotateX: `180deg` }]
      },
      chatContent: {
         flexGrow: 1,
      },
      messageWrapper: {
         marginBottom: theme.metrics.x3,
         width: w,
         paddingHorizontal: theme.metrics.x4
      },
      timeWrapper: {
         position: `absolute`,
         right: -50,
         bottom: `50%`,
      },
      timeText: {
         fontSize: 12,
         fontWeight: `500`,
         color: theme.colors.gray7
      },
      dateWrapper: {
         width: `100%`,
         alignItems: `center`,
         marginVertical: theme.metrics.x4
      },
      dateText: {
         color: colors.gray7,
         fontWeight: "bold"
      }
   })