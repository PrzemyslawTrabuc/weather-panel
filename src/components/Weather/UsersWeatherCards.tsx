import React, {useMemo, useEffect} from 'react';
import WeatherCard from './WeatherCard';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import {Loader, Center, Modal, Text} from "@mantine/core";
import {toggleModal, hideModal} from '../Modal/ModalSlice';
import {selectCityFromUsersList} from "../UserData/UserDataSlice";

const UsersWeatherCards = (props:any) =>{
  const dispatch = useDispatch();
  const numberOfFavUsersCities = useSelector((state: RootState) => state.UserData.numberOfFavUsersCities);
  const isOpenModal = useSelector((state: RootState) => state.Modal.isOpen);
  const numberOfselectedCity = useSelector((state: RootState) => state.UserData.citySelectedByUserOnHisList);
  const weatherData = useSelector((state: RootState) => state.WeatherData.cities);
  const userFavCities = useSelector((state: RootState) => state.UserData.userFavCities);

  const handleDetailsClick = (cityNumber:number) =>{
    dispatch(selectCityFromUsersList(cityNumber))
    dispatch(toggleModal());
  }

  const handleCloseModal = () =>{
    dispatch(hideModal())
  }

  useEffect(() => {
  },[weatherData])
  
    const buildWeatherCardsList = (numberOfCitiesStored:number) =>{
        let counter:number = 0;
        if(props.isWeatherDataFetched){
          const items:any[] = [];
          while(counter < numberOfCitiesStored){      
            items.push(
              <WeatherCard 
                key={counter}
                cityNumber={counter} 
                weatherData={props.weatherData[counter]}
                handleDetailsClick={handleDetailsClick} 
              >
              </WeatherCard>
            )
            counter++;     
          }
          return items;
        }
        if(props.isWeatherDataFetched === false){
          const items:any[] = [];
          while(counter <= numberOfFavUsersCities){      
            items.push(<WeatherCard key={counter} weatherData={props.weatherData[0]} cityNumber={counter}></WeatherCard>)
            counter++;     
          }
          return items;
        }
      }

    const renderWeatherCards = () =>{
      console.log(userFavCities.length)
      console.log("userWeatherCards")
        if(props.isWeatherDataFetched && numberOfFavUsersCities > 0)
          return(
            <>
              {buildWeatherCardsList(props.numberOfCitiesStored)}             
            </>
          ) 
        if(props.isWeatherDataFetched === false && userFavCities.length !== 0)
          return(   
            <Center>
              <Loader size="xl"></Loader>
            </Center>            
          )
          if(props.isWeatherDataFetched === false && userFavCities.length === 0){
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
            <Modal
              opened={isOpenModal}
              onClose={handleCloseModal}
              title={`Details About: ${weatherData[numberOfselectedCity].cityName}`}
              overlayOpacity={0.1}
              overlayBlur={3}
            >
              {weatherData[numberOfselectedCity].cityName}
            </Modal>
        </>
      )
}

export default UsersWeatherCards