import React, { useContext, useMemo } from 'react';
import { theme as defaultTheme } from './default/theme';

const ThemeContext = React.createContext(defaultTheme);

export type Theme = typeof defaultTheme;

type ThemeResult<S> = {
  theme: Theme;
  s: S | undefined;
};

type Keys<T, P = keyof T> = P;
export type IconNames = Keys<typeof defaultTheme.icons>;
export type ThemeColors = Keys<typeof defaultTheme.colors>;
export type DocIconsNames = Keys<typeof defaultTheme.docIcons>;

function useThemeContext<S>(
  createStyleSheet?: (theme: Theme) => S,
): ThemeResult<S> {
  const currentTheme = useContext(ThemeContext) || defaultTheme;
  const result = useMemo(() => {
    if (typeof createStyleSheet === 'function') {
      const styles = createStyleSheet(currentTheme);
      return {
        theme: currentTheme,
        s: styles,
      };
    }
    return {
      theme: currentTheme,
      s: undefined,
    };
  }, [currentTheme, createStyleSheet]);
  return result;
}

export { ThemeContext, useThemeContext };
