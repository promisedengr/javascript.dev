/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '~/ui/theme';
import { theme } from '~/ui/theme/default/theme';
import { TitleDescription } from '~/ui/components/TitleDescription';
import { CircleIcon } from '~/ui/components/CircleIcon';
import { BaseItem } from './BaseItem';

const Left = () => (
  <View
    style={{
      borderRadius: 4,
      borderColor: 'black',
      borderWidth: 1,
      borderStyle: 'dashed',
      width: 24,
      height: 24,
    }}
  />
);

const newTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: theme.colors.red,
    border: theme.colors.black,
  },
};

const BaseItemStory = () => {
  const [t, setTheme] = useState(theme);
  const themeRef = useRef(t);
  const handleToggleTheme = useCallback(() => {
    const nextTheme = themeRef.current === newTheme ? theme : newTheme;
    themeRef.current = nextTheme;
    setTheme(nextTheme);
  }, [setTheme, themeRef]);

  return (
    <ThemeContext.Provider value={t}>
      <TouchableOpacity
        style={{ backgroundColor: 'red', padding: 20, borderRadius: 10 }}
        onPress={handleToggleTheme}>
        <Text>Toggle theme</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <BaseItem left="Text" right="right">
          <View>
            <Text>Center</Text>
          </View>
        </BaseItem>
        <BaseItem left={<Left />} right="right" bordered>
          <View>
            <Text>Center</Text>
          </View>
        </BaseItem>
        <BaseItem left={<Left />} right="right" bordered>
          <TitleDescription
            title={'TitleDescription'}
            description={'description'}
          />
        </BaseItem>
        <BaseItem left={<Left />} right="right" bordered>
          <TitleDescription
            title={'Inverted TitleDescription'}
            description={'description'}
            invert
          />
        </BaseItem>
        <BaseItem
          left={<CircleIcon icon="applePay" color="white" background="red" />}
          right="right"
          bordered>
          <TitleDescription
            title={'Inverted TitleDescription'}
            description={'description'}
            invert
          />
        </BaseItem>
        <BaseItem right="right" bordered>
          <TitleDescription
            title={'Inverted TitleDescription'}
            description={'description'}
            invert
          />
        </BaseItem>
        <BaseItem
          left={<CircleIcon icon="applePay" color="white" background="red" />}
          leftStyle={{ justifyContent: 'center' }}
          right={
            <TitleDescription title={'Inverted'} description={'description'} />
          }
          bordered>
          <TitleDescription
            title={
              'Inverted TitleDescription very long title for special test case'
            }
            description={
              'description description description description description description description '
            }
          />
        </BaseItem>
      </View>
    </ThemeContext.Provider>
  );
};

storiesOf('BaseItem', module).add('BaseItem cases', () => <BaseItemStory />);
