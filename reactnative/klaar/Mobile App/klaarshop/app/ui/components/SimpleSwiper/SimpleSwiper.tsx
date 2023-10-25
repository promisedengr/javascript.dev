import React, { useState, useCallback } from 'react'
import { View, Image, Dimensions, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { Model } from 'react-model'
import Like from '../ReviewItem/assets/like';
import { CircleWrapper } from '../CircleWrapper/CircleWrapper';
import { colors } from '~/ui/theme/default/colors';
import EmptyLike from '../ReviewItem/assets/emptyLike';
import { metrics } from '~/ui/theme/default/metrics';
import DownloadIcon from './assets/DownloadIcon';

const { width, height } = Dimensions.get('window');

interface SlideState {
    imgList: string[]
    loadQueue: number[]
}

interface SlideActions {
    loaded: number
}

const Slide = (props: any) => {
    
    console.log('rehe', props)
    return (
        <View style={styles.slide}>
           
            <Image
                onLoad={() => {
                    props.loadHandle(props.i)
                }}
                style={styles.image}
                source={{ uri: props.uri}}
            />
             
            {!props.loaded && (
                <View style={styles.loadingView}>
                    
                    <View style={styles.loadingImage} />
                </View>
            )}
        </View>
    )
}

type PropsTypes = {
    imgList: string[],
    like: boolean,
    handleLike(): void,
    handleUpload(): void
}

const SimpleSwiper: React.FC<PropsTypes> = React.memo(({
    imgList,
    like,
    handleLike,
    handleUpload
}) => {

    const SlideSchema: ModelType<SlideState, SlideActions> = {
        state: {
            imgList,
            loadQueue: []
        },
        actions: {
            loaded: index => {
                return state => {
                    state.loadQueue[index] = 1
                }
            }
        }
    }

    const [{ useStore }] = useState(() => Model(SlideSchema))
    const [state, actions] = useStore();
    
    const loadHandle = useCallback((i: number) => {
        actions.loaded(i)
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.btnBox}>
                <CircleWrapper onPress={handleLike}>
                    {like ? <Like /> : <EmptyLike />}
                </CircleWrapper>
                {/* <CircleWrapper onPress={handleUpload}>
                    <DownloadIcon />
                </CircleWrapper> */}
            </View>
            <Swiper
                loadMinimal
                loadMinimalSize={1}
                // index={0}
                style={styles.wrapper}
                loop={true}
            >            
                {state.imgList.map((item, i) => (
                    <Slide
                        loadHandle={loadHandle}
                        uri={item}
                        i={i}
                        key={i}
                        loaded={state.loadQueue[i]}
                    />
                ))}
            </Swiper>
        </View>
    )
})

export { SimpleSwiper };

const styles = StyleSheet.create({
    wrapper: {
        height: height * 0.45
    },
    slide: {
        flex: 1,
        justifyContent: 'center'
    },
    btnBox: {
        position: 'absolute',
        top: metrics.x3,
        left: width * 0.8,
        zIndex: 1, 
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 70      
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        zIndex: 2
    },
    loadingView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.5)'
    },

    loadingImage: {
        width: 60,
        height: 60
    }
})