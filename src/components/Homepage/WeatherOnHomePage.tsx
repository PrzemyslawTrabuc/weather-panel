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
                            <Group>
                                <Center>
                                <WeatherIcon iconId={props.weatherData.weather[0].icon} />       
                                <Title order={1}>{props.weatherData.main.temp} °C</Title>  
                                </Center>
                            </Group>                                              
                        <Group>
                            <div>
                            <Cloud size={30} /> 
                                <Title order={5}>
                                    {props.weatherData.clouds.all} %
                            </Title>  
                            </div> 
                            <div>
                            <Thermometer size={30} />
                                <Title order={5}>
                                    {props.weatherData.main.feels_like} °C
                                </Title>  
                            </div>
                            <div>  
                            <Windsock size={30} /> 
                                <Title order={5}>
                                    {metersPerSecToKilometersPerH(props.weatherData.wind.speed).toFixed(2)} km/h
                            </Title>  
                            </div>  
                            <div>
                                <DropletFilled2 size={30} />
                                <Title order={5}>
                                    {props.weatherData.main.humidity} %
                                </Title>  
                            </div>
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