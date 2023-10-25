import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { useThemeContext } from '~/ui/theme';
import { createStyle } from './LoginButtonStyles';

export type LoginButtonProps = {
  icon: Component | Element;
  disabled?: boolean;
  onPress?: () => void;
};

const LoginButton: React.FC<LoginButtonProps> = React.memo(props => {

  const { s } = useThemeContext(createStyle);
  
  const {
    icon,
    onPress,
    disabled
  } = props;
  const { buttonStyle } = React.useMemo(() => {
    return {
      buttonStyle: [s?.button]
    };
  }, [disabled]);  

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled}
      onPress={onPress}> 
        {icon}
    </TouchableOpacity>
  );
});

LoginButton.defaultProps={
  disabled: false
}

export { LoginButton };
