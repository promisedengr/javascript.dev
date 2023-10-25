import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const renderLoader = (marginTop: number, color: string) => {
  let indents = [];
  indents.push(
    <View style={{width: '100%', alignItems: 'center', marginTop: marginTop}}>
      <ActivityIndicator size={'large'} color={color}/>
    </View>
  );
  return indents;
}