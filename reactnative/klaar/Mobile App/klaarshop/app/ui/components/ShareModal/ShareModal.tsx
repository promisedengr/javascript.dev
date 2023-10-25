import React, { memo } from 'react';
import {
  Modal, Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useThemeContext } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';
import { createStyle } from './ShareModalStyles';
import CloseIcon from './assets/close';
import FacebookIcon from '~/ui/components/Button/assets/facebook';
import VkIcon from '~/ui/components/Button/assets/vk';
import WhatsappIcon from '~/ui/components/Button/assets/whatsapp';
import TelegramIcon from '~/ui/components/Button/assets/telegram';
import LinkIcon from '~/ui/components/Button/assets/link';
import { Button } from '~/ui/components/Button';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


export type ShareModalProps = {
  modalVisible: boolean;
  onModalClose: () => void
};

const ShareModal: React.FC<ShareModalProps> = ({
  modalVisible,
  onModalClose
}) => {  
  
  const { s } = useThemeContext(createStyle);
  
  return (
    <Modal transparent={true} visible={modalVisible} animationType={'fade'}>
      <View style={s?.modalStyles}>
        <View style={s?.contentContainer}>
          <View style={s?.defaultContainer}>
            <View style={s?.closeIconContainer}>
              <TouchableOpacity onPress={() => onModalClose()}>
                <CloseIcon />
              </TouchableOpacity>
            </View>
            <Text style={s?.boldText}>
              {'Поделитесь с друзьями!'}
            </Text>
            <Text style={s?.additionalText}>
              {'Мы рады, что вы воспользовались нашим приложением! Поделитесь товаром с друзьями, чтобы увеличить шанс на покупку по коллективной цене!'}
            </Text>
          </View>
          <View style={s?.defaultContainer}>
            <CountdownCircleTimer
              isPlaying={true}
              duration={10}
              strokeWidth={1}
              size={109}
              onComplete={() => onModalClose()}
              colors={[
                [colors.orange, 1],
                // ['#0f0', 0.4],
                // ['#00f', 0.2],
              ]}
            >
              {({ remainingTime }) => (
                <Text>
                  {remainingTime}
                </Text>
              )}
            </CountdownCircleTimer>
          </View>
          <View style={s?.defaultContainer}>
            <View style={s?.buttonLink}>
              <Button
                onPress={()=> console.log('1123123')}
                title="Facebook"
                color={'#395185'}
                icon={<FacebookIcon w={24} h={24}/>}
              />
            </View>
            <View style={s?.buttonLink}>
              <Button
                onPress={()=> console.log('1123123')}
                title="ВКонтакте"
                color={'#5181B8'}
                icon={<VkIcon w={24} h={14}/>}
              />
            </View>
            <View style={s?.buttonLink}>
              <Button
                onPress={()=> console.log('1123123')}
                title="Whatsapp"
                color={'#3ADF57'}
                icon={<WhatsappIcon w={24} h={24}/>}
              />
            </View>
            <View style={s?.buttonLink}>
              <Button
                onPress={()=> console.log('1123123')}
                title="Telegram"
                color={'#1E96C8'}
                icon={<TelegramIcon w={24} h={24}/>}
              />
            </View>
            <View style={s?.buttonLink}>
              <Button
                onPress={()=> console.log('1123123')}
                title="Поделиться ссылкой"
                color={'#FF8500'}
                icon={<LinkIcon w={24} h={24}/>}
              />
            </View>
          </View>
        </View>
      </View>

    </Modal>
  );
};

ShareModal.defaultProps={
  modalVisible: false
}


const ShareModalM = memo(ShareModal);
export { ShareModalM as ShareModal };