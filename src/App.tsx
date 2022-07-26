import React, { useState, useEffect, useRef } from 'react'
import logo from './logo.svg'
import './App.css';
import AppContainer from './components/AppContainer';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import type { RootState, AppDispatch } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import {fetchWeatherThunk} from './components/WeatherData/WeatherDataSlice';
import {setNumberOfFavUsersCities} from './components/UserData/UserDataSlice'
import {doc, getDoc } from "firebase/firestore";
import db from "./api/firebase";
import {initializeDarkModefromCookie} from "./components/DarkModeSwitch/DarkModeSwitchSlice";
import getCookie from "./tools/getCookie";
import Modal from "./components/Modal"


const App =()=> {
  const dispatch:AppDispatch = useDispatch();
  const isDarkModeOn = useSelector((state: RootState) => state.DarkModeSwitch.isDarkModeOn);
  const [test, setTest] = useState([]);
 
  useEffect(() => {
    if(getCookie("isDark") === "true")
      dispatch(initializeDarkModefromCookie(true));
    if(getCookie("isDark") === "false")
      dispatch(initializeDarkModefromCookie(false));
  },[])

  const getUsersFavCities = async(userId:string) =>{
    const docRef = doc(db, "UsersData", userId);
    console.log("FIREBASE!!")
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
    let citiesArray = await saveNumberOfFavUsersCitieInStore(userId);
    dispatch(fetchWeatherThunk(citiesArray));   
  }

  const saveNumberOfFavUsersCitieInStore = async(userId: string)=>{
    let citiesArray = await getUsersFavCities(userId);
    dispatch(setNumberOfFavUsersCities(citiesArray.length))
    return citiesArray
  }

  return (     
        <MantineProvider theme={{colorScheme: isDarkModeOn ? "dark" : "light"}} withGlobalStyles withNormalizeCSS>
            <AppContainer saveNumberOfFavUsersCitieInStore={saveNumberOfFavUsersCitieInStore} getFavCitiesWeatherByUserId={getFavCitiesWeatherByUserId}>              
            </AppContainer>
        </MantineProvider>
  )
}

export default App
