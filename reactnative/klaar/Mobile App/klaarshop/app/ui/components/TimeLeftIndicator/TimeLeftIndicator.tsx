import React, { memo, useEffect, useState } from 'react';
import {
  Text,
  View
} from 'react-native';
import { useThemeContext } from '~/ui/theme';
import { createStyle } from './TimeLeftIndicatorStyles';

export type TimeLeftIndicatorProps = {
  text?: string;
  timeLeft: number;
  height?: number;
};

const TimeLeftIndicator: React.FC<TimeLeftIndicatorProps> = ({
  timeLeft,
  text,
  height
}) => {

  const { s } = useThemeContext(createStyle);
  
  const [timer, setTimer] = useState(!!timeLeft? timeLeft: 0);
  useEffect(
    () => {
      if (timer > 0) {
        setTimeout(() => {
          let newTime = Math.round(timer-1);
          setTimer(newTime);
        }, 1000);
      }
    }, [timer]
  );

  const convertTime = (allSeconds: number) => {
    let stringTime = new Date(allSeconds * 1000).toISOString().substr(11, 8);
    return stringTime;
  }

  return (
    <View style={[s?.container, {height: height}]}>
      <Text style={s?.defaultText}>{text}</Text>
      <View style={s?.timerContainer}>
        <Text style={s?.timerText}>{convertTime(timer)}</Text>
      </View>
    </View>
  );
};

TimeLeftIndicator.defaultProps={
  text: 'До окончания осталось',
  height: 46
}


const TimeLeftIndicatorM = memo(TimeLeftIndicator);
export { TimeLeftIndicatorM as TimeLeftIndicator };
