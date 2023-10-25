import _ from 'lodash';
import * as React from 'react';
import { memo } from 'react';
import { View, Text } from 'react-native';
import { createStyle } from './FatalErrorScreenStyles';
import { useThemeContext } from '~/ui/theme';
import { useTranslation } from 'react-i18next';
import { Button } from './../../ui/components/Button/Button';

type FatalErrorScreenProps = {

}

const FatalErrorScreen: React.FC<FatalErrorScreenProps> = props => {
  
  const { s } = useThemeContext(createStyle);
  const { t } = useTranslation();

  return (
    <View style={s?.container}>
      
      <Text style={s?.fatalErrorText}>
        {t('fatalError')}
      </Text>
      <Text style={[s?.grayText, s?.marginX4]}>
        {t('fatalErrorDescription')}
      </Text>
      <View style={s?.largeButtonContainer}>
        <Button
          onPress={() => {}}
          title={t('next')}
        />
      </View>
    </View>
  );
};

const MFatalErrorScreen = memo(FatalErrorScreen);
export { MFatalErrorScreen as FatalErrorScreen };