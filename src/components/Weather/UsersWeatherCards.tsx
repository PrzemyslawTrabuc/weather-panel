import React from 'react';
import WeatherCard from './WeatherCard';

const UsersWeatherCards = (props:any) =>{

    const buildWeatherCardsList = (numberOfCitiesStored:number) =>{
        let counter:number = 1;
        if(numberOfCitiesStored == 3){
          const items:any[] = [];
          while(counter < numberOfCitiesStored){      
            items.push(<WeatherCard key={counter} weatherData={props.weatherData[counter]}></WeatherCard>)
            counter++;     
          }
          return items;
        }
        if(numberOfCitiesStored != 3){
          const items:any[] = [];
          while(counter <= props.numberOfUserCites){      
            items.push(<WeatherCard key={counter} weatherData={props.weatherData[0]}></WeatherCard>)
            counter++;     
          }
          return items;
        }
      }

    const renderWeatherCards = () =>{
        if(props.numberOfCitiesStored !== props.numberOfUserCites){
          return(
            <>
               {buildWeatherCardsList(props.numberOfCitiesStored)}
            </>
          ) 
        }
    
        if(props.weatherData.length == 3)
        return(
          <>
            {buildWeatherCardsList(props.numberOfCitiesStored)}
          </>
        ) 
      }

      return(
        <>
            {renderWeatherCards()}
        </>
      )
}

export default UsersWeatherCards