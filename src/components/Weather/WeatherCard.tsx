import React, {useEffect} from "react";
import { Card, Image, Text, Button, Group, Modal, LoadingOverlay } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import {doc, getDoc, setDoc } from "firebase/firestore";
import db from "../../api/firebase";
import {selectCityFromUsersList} from "../UserData/UserDataSlice"

import WeatherIcon from './WeatherIcon';
import {toggleModal, hideModal} from '../Modal/ModalSlice';
import {moveItemLeftInArray, moveItemRightInArray} from "../WeatherData/WeatherDataSlice";
import {setUserFavCities} from "../UserData/UserDataSlice"

const WeatherCardStyle:React.CSSProperties = { 
  maxWidth:'400px',
}

const WeatherCardTextStyle:React.CSSProperties = {
  fontSize:"1.5rem"
}

const WeatherCard = (props:any) =>{
  const isDesktop = useSelector((state: RootState) => state.MobileMenuSwitch.isDesktop);
  const isWeatherDataFetched = useSelector((state: RootState) => state.WeatherData.isFetched);
  const cityNumber = useSelector((state: RootState) => state.UserData.citySelectedByUserOnHisList);
  const userId = useSelector((state: RootState) => state.GoogleAuth.userId);
  const weatherData = useSelector((state: RootState) => state.WeatherData.cities);
  const userFavCities = useSelector((state: RootState) => state.UserData.userFavCities)
  const dispatch = useDispatch(); 
 
 
  const handleDetailsClick = () =>{
    dispatch(selectCityFromUsersList(props.cityNumber))
    dispatch(toggleModal());
  }

  const pushFavListOrderToFirebase = async(userId: string)=>{
    console.log(userId);
    let dataToInsert:Array<string> = []
    const document = await getDoc(doc(db, "UsersData", userId))
    weatherData.forEach((element)=>{
      dataToInsert.push(element.cityName);
    })
    await setDoc(doc(db, "UsersData", userId),{
      favCities: dataToInsert
    }
    )   
  }

  useEffect(() =>{
    if(userId)
    pushFavListOrderToFirebase(userId)
  },[weatherData])

  
    return (
      <div style={WeatherCardStyle}>        
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
            onClick={handleDetailsClick}
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
            Details
          </Button>
          <Group spacing="xs" grow>
          <Button
            onClick={() => dispatch(moveItemLeftInArray({cityIndexInArrayToChange:props.cityNumber, cityDataToUseAsTemp:props.weatherData}))}
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </Button>
          <Button
            onClick={() => dispatch(moveItemRightInArray({cityIndexInArrayToChange:props.cityNumber, cityDataToUseAsTemp:props.weatherData}))}
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
              <i className="fa-solid fa-arrow-right"></i>
          </Button>
          </Group>
        </Card>  
   
      </div>
      
    );
}

export default WeatherCard;