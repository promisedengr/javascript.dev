import React from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import { colors } from '~/ui/theme/default/colors';
import MarkIcon from './assets/mark';
import styles from './CheckboxStyles';

export type CheckboxProps = {
  size: any;
  isChecked: boolean;
  borderColor?: string;
  borderWidth?: any;
  checkedColor?: string;
  disabled?: boolean;
  circle?: boolean;
  onPress?: () => void;
};

const Checkbox: React.FC<CheckboxProps> = React.memo(props => {
  
  const {
    onPress,
    size,
    borderColor,
    isChecked,
    checkedColor,
    disabled,
    circle,
    borderWidth
  } = props;
  const { viewStyle } = React.useMemo(() => {
    return {
      viewStyle: [
        styles.checkboxStyle, 
        {
          borderRadius: circle? size*0.5: size*0.25, borderColor: isChecked? checkedColor: borderColor, borderWidth: borderWidth,
          width: size, height: size, 
          backgroundColor: isChecked? checkedColor: '#fff',
          marginHorizontal: 8
        }
      ],
    };
  }, [size, borderColor, isChecked, checkedColor]);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}>
      <View style={viewStyle}>
        <MarkIcon w={size*0.7} h={size*0.7}/>
      </View>
    </TouchableOpacity>
  );
});

Checkbox.defaultProps = {
  size: 20,
  borderColor: '#e1e1e1',
  isChecked: false,
  checkedColor: colors.mainBlue,
  disabled: false,
  circle: false,
  borderWidth: 3
}

export { Checkbox };