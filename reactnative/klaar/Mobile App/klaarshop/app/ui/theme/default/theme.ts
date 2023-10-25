import { colors, gradients } from './colors';
import { docIcons } from './docIcons';
import { emoji } from './emoji';
import { fonts } from './fonts';
import { icons } from './icons';
import { metrics } from './metrics';
import { shadows } from './shadows';

const hitSlop = { top: 10, left: 10, bottom: 10, right: 10 } as const;

const theme = {
  fonts,
  colors,
  gradients,
  metrics,
  icons,
  docIcons,
  hitSlop,
  shadows,
  emoji,
} as const;

export { theme };
