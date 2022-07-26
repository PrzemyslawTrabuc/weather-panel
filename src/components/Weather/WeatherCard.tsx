import React, {useEffect, useState, useMemo} from "react";
import { Card, Image, Text, Button, Group, Modal, LoadingOverlay, Transition } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import {doc, getDoc, setDoc } from "firebase/firestore";
import db from "../../api/firebase";
import {selectCityFromUsersList} from "../UserData/UserDataSlice";
import {toggleModal, hideModal} from '../Modal/ModalSlice';

import WeatherIcon from './WeatherIcon';
import {moveItemLeftInArray, moveItemRightInArray} from "../WeatherData/WeatherDataSlice";

const WeatherCardStyle:React.CSSProperties = { 
  maxWidth:'400px',
}

const WeatherCardTextStyle:React.CSSProperties = {
  fontSize:"1.5rem"
}

const WeatherCard = (props:any) =>{
  const isDesktop = useSelector((state: RootState) => state.MobileMenuSwitch.isDesktop);
  const isWeatherDataFetched = useSelector((state: RootState) => state.WeatherData.isFetched);
  const userId = useSelector((state: RootState) => state.GoogleAuth.userId);
  const weatherData = useSelector((state: RootState) => state.WeatherData.cities);
  const isOpenModal = useSelector((state: RootState) => state.Modal.isOpen);
  const numberOfselectedCity = useSelector((state: RootState) => state.UserData.citySelectedByUserOnHisList);
  const dispatch = useDispatch(); 
  const [test, setTest] = useState(true);
 
  const handleMoveCardLeft = () =>{
    setTest(false); 
    setTimeout(()=>setTest(true),300)
    setTimeout(()=>dispatch(moveItemLeftInArray({cityIndexInArrayToChange:props.cityNumber, cityDataToUseAsTemp:props.weatherData})), 300)
  }

  const handleMoveCardRight = () =>{
    setTest(false); 
    setTimeout(()=>setTest(true),300)
    setTimeout(()=>dispatch(moveItemRightInArray({cityIndexInArrayToChange:props.cityNumber, cityDataToUseAsTemp:props.weatherData})), 300)
  }

  const pushFavListOrderToFirebase = async(userId: string)=>{
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

  const renderCard = () =>{
    return(
         <Transition mounted={test} transition="fade" duration={300} timingFunction="ease">{
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
        </Card>  
      </div>      
       }
      </Transition>
    )
  }


  useEffect(() =>{
    if(userId)
    pushFavListOrderToFirebase(userId)
  },[weatherData])

    console.log("weatherCard")

    return (
      <>
      {renderCard()}
      </>
    )
}

export default WeatherCard;