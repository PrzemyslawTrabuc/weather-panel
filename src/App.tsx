import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css';
import AppContainer from './components/AppContainer';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import type { RootState } from './store/store';
import { useSelector, useDispatch } from 'react-redux';

const App =()=> {
  const dark = useSelector((state: RootState) => state.DarkModeSwitch.value);

  return (     
        <MantineProvider theme={{colorScheme: dark}} withGlobalStyles withNormalizeCSS>
          <AppContainer />
        </MantineProvider>
  )
}

export default App
