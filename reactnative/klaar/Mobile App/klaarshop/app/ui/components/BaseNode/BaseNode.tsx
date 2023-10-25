import _ from 'lodash';
import * as React from 'react';
import { memo } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

type RC = (...args: any[]) => any;
export type BaseNodeType = React.ReactNode | RC;
export type BaseNodeStyle<C> = C extends string ? TextStyle : ViewStyle;

type BaseNodeProps<C = BaseNodeType, S = BaseNodeStyle<C>> = {
  style?: S | S[];
  children: C;
};

const BaseNode: React.FC<BaseNodeProps> = ({ children, style }) => {
  if (typeof children === 'string') {
    return <Text style={style}>{children}</Text>;
  } else if (_.isFunction(children)) {
    return <View style={style}>{children({ style })}</View>;
  }
  return <View style={style}>{children}</View>;
};

const MBaseNode = memo(BaseNode);

export { MBaseNode as BaseNode };
