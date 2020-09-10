import React, { useState, createContext } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { blue } from '@material-ui/core/colors';
//TODO Kill

// todo play around with these values
export const light = {
  palette: {
    type: 'light',
    primary: {
      main: '#437779',
    },
    secondary: {
      main: '#000',
    },
  },
};

export const dark = {
  palette: {
    type: 'dark',
    primary: {
      main: '#437779',
    },
    secondary: {
      main: '#437779',
    },
  },
};

export const CustomThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkMode);
  const appliedTheme = createMuiTheme(theme ? light : dark);

  const toggleTheme = () => {
    const _theme = theme ? false : true;
    setTheme(_theme);
  };
  createMuiTheme(theme ? light : dark);

  return (
    <CustomThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={appliedTheme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
