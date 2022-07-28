import React, {useEffect, useState, useRef} from "react";
import { Card, Text, Button, Group, Modal, LoadingOverlay, Transition } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';

import WeatherIcon from './WeatherIcon';
import {moveItemLeftInArray, moveItemRightInArray, deleteCityFromCities} from "../WeatherData/WeatherDataSlice";

const WeatherCardStyle:React.CSSProperties = { 
  maxWidth:'400px',
}

const WeatherCardTextStyle:React.CSSProperties = {
  fontSize:"1.5rem"
}


const WeatherCard = (props:any) =>{
  const isDesktop = useSelector((state: RootState) => state.MobileMenuSwitch.isDesktop);
  const isWeatherDataFetched = useSelector((state: RootState) => state.WeatherData.isFetched);
  const dispatch = useDispatch(); 

  const [animate, setAnimate] = useState(true);


  const deleteFavCityFromFirebase = (cityId : number)=>{
    setAnimate(false); 
    setTimeout(()=>setAnimate(true),300);
    setTimeout(()=> dispatch(deleteCityFromCities(cityId)),300); 
    props.toggleTest();
  }
 
  const handleMoveCardLeft = () =>{  
    setAnimate(false); 
    setTimeout(()=>setAnimate(true),300);
    setTimeout(()=>dispatch(moveItemLeftInArray({cityIndexInArrayToChange:props.cityNumber, cityDataToUseAsTemp:props.weatherData})), 300);   
    props.toggleTest(); 
  }

  const handleMoveCardRight = () =>{    
    setAnimate(false); 
    setTimeout(()=>setAnimate(true),300)
    setTimeout(()=>dispatch(moveItemRightInArray({cityIndexInArrayToChange:props.cityNumber, cityDataToUseAsTemp:props.weatherData})), 300); 
    props.toggleTest();
  }

  const renderCard = () =>{
    console.log("weatherCard")
    return(
         <Transition mounted={animate} transition="fade" duration={300} timingFunction="ease">{
      (styles) =>   
      <div style={styles}>        
        <Card shadow="sm" p="lg">
        <LoadingOverlay visible={!isWeatherDataFetched} /> 
          <Card.Section>
            <Group position="left" spacing="xs">
              <WeatherIcon iconId={props.weatherData.weatherIconId} />
              <Text
                style={WeatherCardTextStyle}
                sx={
                  isDesktop ? { paddingLeft: "0px" } : { paddingLeft: "20px" }
                }
                weight={700}
              >
                {props.weatherData.temp} °C
              </Text>
            </Group>
          </Card.Section>
          <Group position="apart" style={{ marginBottom: 5 }}>
            <Text size="xl" weight={700}>
              {props.weatherData.cityName}
            </Text>
          </Group>
          <Text size="sm" style={{ lineHeight: 1.5 }}>
            Do dodania prognoza godzinowa
            {/* TODO: dodaj prognoze */}
          </Text>
          <Button
            onClick={()=>props.handleDetailsClick(props.cityNumber)}
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
            Details
          </Button>
          <Group spacing="xs" grow>
          <Button
            onClick={handleMoveCardLeft}
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
            {isDesktop ? <i className="fa-solid fa-arrow-left"></i> : <i className="fa-solid fa-arrow-up"></i>}
          </Button>
          <Button
            onClick={handleMoveCardRight}
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
              {isDesktop ? <i className="fa-solid fa-arrow-right"></i> : <i className="fa-solid fa-arrow-down"></i>}
          </Button>
          </Group>
          <button onClick={() => deleteFavCityFromFirebase(props.cityNumber)}>DEL_DUPA</button>
        </Card>  
      </div>      
       }
      </Transition>
    )
  }

    return (
      <>
        {renderCard()}
        {}
      </>
    )
}

export default WeatherCard;