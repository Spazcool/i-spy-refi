import React, { useState, createContext } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';


// todo play around with these values
export const light = {
  palette: {
    type: 'light',
    primary: {
      main: '#1976d2',  
    },
    secondary: {
      main: '#0044ff'
    }
  },
}

export const dark = {
  palette: {
    type: 'dark',
  },
}

export const CustomThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkMode);
  const appliedTheme = createMuiTheme(theme ? light : dark)

  const toggleTheme = () => {
    const _theme = theme ? false : true; 
    setTheme(_theme)
  }
  createMuiTheme({
    palette: {
      type: theme,
    },
  })

  return (
    <CustomThemeContext.Provider value={{ theme, toggleTheme }}>
      <CssBaseline/>
      <ThemeProvider theme={appliedTheme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
};
