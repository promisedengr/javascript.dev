import React, { memo } from 'react';
import {
  Modal, Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useThemeContext } from '~/ui/theme';
import { createStyle } from './GroupBuyModalStyles';
import CloseIcon from '~/ui/components/ShareModal/assets/close';
import { useTranslation } from 'react-i18next';


export type GroupBuyModalProps = {
  modalVisible: boolean;
  onModalClose: () => void
};

const GroupBuyModal: React.FC<GroupBuyModalProps> = ({
  modalVisible,
  onModalClose
}) => {  
  
  const { t } = useTranslation();
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
              {'Вы можете купить дешевле!'}
            </Text>
            <Text style={s?.additionalText}>
              {'В нашем приложении есть функция коллективной покупки! Это значит, что вы и ваши друзья могут взять тот же товар, но с отличной скидкой! Хотите использовать коллективную покупку?'}
            </Text>
          </View>
          <View style={s?.bottomContainer}>
            <TouchableOpacity style={[s?.bottomButton, s?.leftButton]}>
              <Text style={[s?.buttonText, s?.leftText]}>
                {t('noThanks')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s?.bottomButton, s?.rightButton]}>
              <Text style={[s?.buttonText, s?.rightText]}>
                {t('okay')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </Modal>
  );
};

GroupBuyModal.defaultProps={
  modalVisible: false
}


const GroupBuyModalM = memo(GroupBuyModal);
export { GroupBuyModalM as GroupBuyModal };