import * as React from 'react';
import { memo, useMemo, useState } from 'react';
import { View, ViewStyle, Text, Image, TouchableOpacity } from 'react-native';
import { createStyle } from './ReviewItemStyles';
import { useThemeContext } from '~/ui/theme';
import { useTranslation } from 'react-i18next';
import { BaseItem } from '~/ui/components/BaseItem';
import EmptyStar from './assets/emptyStar';
import Star from './assets/star';
import More from './assets/more';
import EmptyLike from './assets/emptyLike';
import EmptyComment from './assets/emptyComment';
import Like from './assets/like';
import Comment from './assets/comment';
import { RenderStars } from '~/ui/components/RenderStars/renderStars';
import { ImageWithLoader } from '../ImageWithLoader/ImageWithLoader';

export type ReviewItemProps = {
   userName: string;
   userCity: string;
   rate: number;
   dateText: string;
   reviewText: string;
   like: boolean;
   comment: boolean;
   likeCount: string;
   commentCount: string;
   onPressLike: () => void
   photo: string
};

const ReviewItem: React.FC<ReviewItemProps> = ({
   userName,
   userCity,
   rate,
   dateText,
   reviewText,
   like,
   comment,
   likeCount,
   commentCount,
   onPressLike,
   photo
}) => {

   const { s } = useThemeContext(createStyle)
   const { t } = useTranslation()

   const [imageLoad, setimageLoad] = useState(false)



   return (
      <View style={s?.container}>

         <BaseItem
            leftStyle={s?.clientPhoto}
            marginTop={false}
            left={
               <ImageWithLoader onLoadStart={() => setimageLoad(true)}
                  onLoadEnd={() => setimageLoad(false)}
                  imageLoad={imageLoad}
                  source={photo}
                  photoStyle={s?.userPic}
                  photoContainerStyle={s?.userPic} />
            }
            right={
               <View style={s?.rightContainerColumn}>
                  {/* <TouchableOpacity style={s?.moreContainer}>
                     <More />
                  </TouchableOpacity>
                  <Text style={s?.userCityText}>{dateText}</Text> */}
               </View>
            }
         >
            <View style={s?.shortColumn}>
               <Text style={s?.userNameText}>{userName}</Text>
               <Text style={s?.userCityText}>{userCity}</Text>
               <View style={s?.starsContainer}>
                  <RenderStars rating={rate} />
               </View>
            </View>
         </BaseItem>
         <Text style={s?.reviewTextStyle}>
            {reviewText}
         </Text>
      {/* <View style={s?.reviewPicContainer}>
         <Image source={require('./assets/reviewTest.png')} style={s?.reviewPic} />
      </View>
      <View style={[s?.btnsContainer, s?.marginx4]}>
         <View style={s?.btnsContainer}>
            <TouchableOpacity onPress={onPressLike}>
               {like === true ? <Like /> : <EmptyLike />}
            </TouchableOpacity>
            <Text style={s?.counterText}>{likeCount}</Text>
         </View>
         <View style={[s?.btnsContainer, s?.marginLeftx6]}>
            <TouchableOpacity>
               {comment === true ? <Comment /> : <EmptyComment />}
            </TouchableOpacity>
            <Text style={s?.counterText}>{commentCount}</Text>
         </View>
      </View> */}
      </View>
   );
};

const MReviewItem = memo(ReviewItem);

export { MReviewItem as ReviewItem };