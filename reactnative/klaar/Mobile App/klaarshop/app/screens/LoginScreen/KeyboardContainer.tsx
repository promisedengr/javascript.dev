import * as React from 'react';
import { memo } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Colors } from '~/styles';

const {height} = Dimensions.get('window');

const KeyboardContainer: React.FC<{children: React.ReactNode}> = props => {
  return (
    <View style={s.container}>
      <View style={s.blueTop}>
        <View style={s.blueTopWhite} />
      </View>
      <SafeAreaView style={s.safeArea}>
        <KeyboardAvoidingView
          {...Platform.select({
            android: {behavior: 'padding'},
            ios: {behavior: 'padding'},
          })}
          enabled
          style={s.keyboardView}>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={s.scroll}
            keyboardShouldPersistTaps="handled">
            {props.children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const MKeyboardContainer = memo(KeyboardContainer);
export { MKeyboardContainer as KeyboardContainer };

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
  blueTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height / 2,
    paddingHorizontal: 20,
    backgroundColor: Colors.blue,
  },
  blueTopWhite: {flex: 1, backgroundColor: 'white'},
  safeArea: {backgroundColor: 'transparent', flex: 1},
  keyboardView: {
    flexGrow: 1,
  },
  scroll: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexGrow: 1,
  },
});
