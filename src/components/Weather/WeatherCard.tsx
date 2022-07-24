import React, {useEffect} from "react";
import { Card, Image, Text, Button, Group, Modal, LoadingOverlay } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';

import WeatherIcon from './WeatherIcon';
import {toggleModal} from '../Modal/ModalSlice';

const WeatherCardStyle:React.CSSProperties = { 
  maxWidth:'400px',
}

const WeatherCardTextStyle:React.CSSProperties = {
  fontSize:"1.5rem"
}

const WeatherCard = (props:any) =>{
  const isDesktop = useSelector((state: RootState) => state.MobileMenuSwitch.isDesktop);
  const isOpen = useSelector((state: RootState) => state.Modal.isOpen);
  const isWeatherDataFetched:boolean = useSelector((state: RootState) => state.WeatherData.isFetched);
  
  const dispatch = useDispatch();  
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
          <Modal
            opened={isOpen}
            onClose={() => dispatch(toggleModal())}
            title="Introduce yourself!"
            overlayBlur={3}
            overlayColor="none"
          >
            {/* Modal content */}
          </Modal>
          <Button
            onClick={() => dispatch(toggleModal())}
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
            Details
          </Button>
        </Card>        
      </div>
    );
}

export default WeatherCard;