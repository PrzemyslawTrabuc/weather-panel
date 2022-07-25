import React, { useState, useEffect, useRef } from 'react'
import logo from './logo.svg'
import './App.css';
import AppContainer from './components/AppContainer';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import type { RootState, AppDispatch } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import {fetchWeatherThunk} from './components/WeatherData/WeatherDataSlice';
import UsersWeatherCards from './components/Weather/UsersWeatherCards';

const App =()=> {
  const shouldEffect = useRef(true);
  const dispatch:AppDispatch = useDispatch();
  const isDarkModeOn = useSelector((state: RootState) => state.DarkModeSwitch.isDarkModeOn);
  const weatherData:Array<any> = useSelector((state: RootState) => state.WeatherData.cities);
  const numberOfCitiesStored:number = useSelector((state: RootState) => state.WeatherData.numberOfCities);
  const numberOfUserCites:number = 2;

  useEffect(() => {
    if(shouldEffect.current){
      console.log("done");
      shouldEffect.current = false;
      dispatch(fetchWeatherThunk(["Opole", "Gdańsk"]));   
    }   
  },[])

  return (     
        <MantineProvider theme={{colorScheme: isDarkModeOn ? "dark" : "light"}} withGlobalStyles withNormalizeCSS>
            <AppContainer>
              <UsersWeatherCards numberOfUserCites={numberOfUserCites} numberOfCitiesStored={numberOfCitiesStored} weatherData={weatherData} />
            </AppContainer>
        </MantineProvider>
  )
}

export default App
