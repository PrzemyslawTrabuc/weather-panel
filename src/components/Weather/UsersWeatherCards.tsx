import React, {useMemo, useEffect, useRef} from 'react';
import WeatherCard from './WeatherCard';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import {Loader, Center, Modal, Text} from "@mantine/core";
import {toggleModal, hideModal} from '../Modal/ModalSlice';
import {selectCityFromUsersList} from "../UserData/UserDataSlice";
import {doc, getDoc, setDoc} from "firebase/firestore";
import db from "../../api/firebase";
import {fetchWeatherThunk, clearWeatherData, fetchForecastThunk} from '../WeatherData/WeatherDataSlice';
import { setNumberOfFavUsersCities} from "../UserData/UserDataSlice"


const UsersWeatherCards = (props:any) =>{
  const dispatch:AppDispatch = useDispatch();
  const numberOfFavUsersCities = useSelector((state: RootState) => state.UserData.numberOfFavUsersCities);
  const isOpenModal = useSelector((state: RootState) => state.Modal.isOpen);
  const numberOfselectedCity = useSelector((state: RootState) => state.UserData.citySelectedByUserOnHisList);
  const weatherData = useSelector((state: RootState) => state.WeatherData.cities);
  const userFavCities = useSelector((state: RootState) => state.UserData.userFavCities);
  const userId = useSelector((state: RootState) => state.GoogleAuth.userId);
  const test = useRef(false);
  const test2 = useRef(false);

  const handleDetailsClick = (cityNumber:number) =>{
    dispatch(selectCityFromUsersList(cityNumber))
    dispatch(toggleModal());
  }

  const toggleTest = ()=>{
    test.current=true;
  }

  const handleCloseModal = () =>{
    dispatch(hideModal())
  }


  useEffect(()=>{
    console.log(test.current)
    if(userId && props.numberOfCitiesStored === weatherData.length && test.current===true){
      console.log("effect!");
      props.pushFavListOrderToFirebase(userId);
    }
  },[weatherData])


  useEffect(()=>{
    if(userId && userFavCities && test2.current===false)
      dispatch(fetchWeatherThunk(userFavCities));
      dispatch(fetchForecastThunk(userFavCities));
      test2.current = true;
  },[location.pathname])


    const buildWeatherCardsList = () =>{
        let counter:number = 0;
        if(props.isWeatherDataFetched){
          const items:any[] = [];
          while(counter < weatherData.length){      
            items.push(
              <WeatherCard 
                key={counter}
                cityNumber={counter} 
                weatherData={props.weatherData[counter]}
                handleDetailsClick={handleDetailsClick} 
                pushFavListOrderToFirebase={()=>props.pushFavListOrderToFirebase(userId)}
                toggleTest={toggleTest}
              >
              </WeatherCard>
            )
            counter++;     
          }
          return items;
        }
        if(props.isWeatherDataFetched === false){
          const items:any[] = [];
          while(counter <= weatherData.length){      
            items.push(<WeatherCard key={counter} weatherData={props.weatherData[0]} cityNumber={counter}></WeatherCard>)
            counter++;     
          }
          return items;
        }
      }

    const renderWeatherCards = () =>{
      console.log("userWeatherCards")
        if(props.isWeatherDataFetched && numberOfFavUsersCities > 0)
          return(
            <>
              {buildWeatherCardsList()}             
            </>
          ) 
        if(props.isWeatherDataFetched === false && numberOfFavUsersCities > 0)
          return(   
            <Center>
              <Loader size="xl"></Loader>
            </Center>            
          )
          if(numberOfFavUsersCities === 0){
            return(   
              <Center>
                <Text>
                  Add Some Cities
                </Text>
              </Center>            
            )
          }
      }

      const MemoizedCards = useMemo(()=>{
          return renderWeatherCards()
      },[weatherData, numberOfFavUsersCities])

      return(
        <>
            {MemoizedCards}
            {weatherData[numberOfselectedCity]?
            <Modal
              opened={isOpenModal}
              onClose={handleCloseModal}
              title={`Details About: ${weatherData[numberOfselectedCity].cityName}`}
              overlayOpacity={0.1}
              overlayBlur={3}
            >
              {weatherData[numberOfselectedCity].cityName}
            </Modal>
            : 
            <Modal
            opened={false}
            onClose={handleCloseModal}
            overlayOpacity={0.1}
            overlayBlur={3}
          >
            </Modal>
            }
        </>
      )
}

export default UsersWeatherCards