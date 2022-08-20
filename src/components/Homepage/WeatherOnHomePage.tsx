import React from 'react';
import {LoadingOverlay, Container, Title, Center, Space, Group, Text, Stack} from "@mantine/core"
import WeatherIcon from "../Weather/WeatherIcon";
import {Windsock, Cloud, Thermometer, DropletFilled2, CloudRain } from "tabler-icons-react";

import metersPerSecToKilometersPerH from "../../utils/metersPerSecToKilometersPerH"

const WeahterOnHomePage = (props:any) =>{
   if(Object.keys(props.weatherData).length > 0)
        return(
            <>
            <Container>
                <Space h="xl" />
                    <Stack align="center" justify="center" spacing="xs">
                        <WeatherIcon iconId={props.weatherData.weather[0].icon} />       
                        <Title size="h1">{props.weatherData.main.temp} °C</Title>     
                        <Group>
                            <Cloud size={45} /> 
                                <Title size="h4">
                                    {props.weatherData.clouds.all} %
                            </Title>   
                            <Thermometer size={45} />
                                <Title size="h4">
                                    {props.weatherData.main.feels_like} °C
                                </Title>  
                            <Windsock size={45} /> 
                                <Title size="h4">
                                    {metersPerSecToKilometersPerH(props.weatherData.wind.speed).toFixed(2)} km/h
                            </Title>  
                          
                                <DropletFilled2 size={45} />
                                <Title size="h4">
                                    {props.weatherData.main.humidity} %
                                </Title>  
                        </Group>        
                    </Stack>                                    
            </Container>
            <Space h="xl" />
            </>
            
        )
    return(
        <LoadingOverlay visible={true}></LoadingOverlay>
    )    

}

export default WeahterOnHomePage; 