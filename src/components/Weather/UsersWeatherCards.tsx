import React from 'react';
import WeatherCard from './WeatherCard';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import {Loader, Center} from "@mantine/core";
import { selectCity } from '../CitySelectedByUser/CitySelectedByUserSlice';

const UsersWeatherCards = (props:any) =>{
  const dispatch = useDispatch();
  const numberOfFavUsersCities = useSelector((state: RootState) => state.UserData.numberOfFavUsersCities);
  
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
                // onDetailsClick={dispatch(selectCity({cityNumber: counter, cityName: props.weatherData[counter].cityName }))}
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
            items.push(<WeatherCard key={counter} weatherData={props.weatherData[0]}></WeatherCard>)
            counter++;     
          }
          return items;
        }
      }

    const renderWeatherCards = () =>{
        if(props.isWeatherDataFetched)
          return(
            <>
              {buildWeatherCardsList(props.numberOfCitiesStored)}             
            </>
          ) 
        if(props.isWeatherDataFetched === false)
          return(   
            <Center>
              <Loader size="xl"></Loader>
            </Center>            
          )

      }

      return(
        <>
            {renderWeatherCards()}
        </>
      )
}

export default UsersWeatherCards