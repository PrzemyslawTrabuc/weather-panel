import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css';
import AppContainer from './components/AppContainer/AppContainer';
import { MantineProvider, ColorSchemeProvider, ColorScheme} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import type { RootState, AppDispatch } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import {fetchWeatherThunk, fetchForecastThunk} from './components/WeatherData/WeatherDataSlice';
import {setNumberOfFavUsersCities, setUserFavCities} from './components/UserData/UserDataSlice'
import {doc, getDoc, setDoc } from "firebase/firestore";
import db from "./api/firebase";
import {initializeDarkModefromCookie} from "./components/DarkModeSwitch/DarkModeSwitchSlice";
import getCookie from "./utils/getCookie";


const App =()=> {
  const dispatch:AppDispatch = useDispatch();
  const isDarkModeOn = useSelector((state: RootState) => state.DarkModeSwitch.isDarkModeOn);
 
  useEffect(() => {
    if(getCookie("isDark") === "true")
      dispatch(initializeDarkModefromCookie(true));
    if(getCookie("isDark") === "false")
      dispatch(initializeDarkModefromCookie(false));
  },[])

  const getUserFavCities = async(userId:string) =>{
    const docRef = doc(db, "UsersData", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().favCities.length);
      return docSnap.data().favCities;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  const getFavCitiesWeatherByUserId = async(userId: string) =>{
    let citiesArray:Array<string> = await saveFavUsersCitiesInStore(userId);
    dispatch(fetchWeatherThunk(citiesArray));  
    dispatch(fetchForecastThunk(citiesArray)); 
  }
  
  const saveFavUsersCitiesInStore = async(userId: string)=>{
    let citiesArray = await getUserFavCities(userId);
    dispatch(setNumberOfFavUsersCities(citiesArray.length))
    dispatch(setUserFavCities(citiesArray))
    return citiesArray;
  }

  return (     
        <MantineProvider theme={{colorScheme: isDarkModeOn ? "dark" : "light"}} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <AppContainer saveFavUsersCitiesInStore={saveFavUsersCitiesInStore} getFavCitiesWeatherByUserId={getFavCitiesWeatherByUserId} />             
          </NotificationsProvider>
        </MantineProvider>
  )
}

export default App
