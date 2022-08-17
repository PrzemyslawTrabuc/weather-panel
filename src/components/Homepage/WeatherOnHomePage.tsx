import React from 'react';
import {LoadingOverlay, Container, Title, Center, Space, Group, Text, Stack} from "@mantine/core"
import WeatherIcon from "../Weather/WeatherIcon";

const WeahterOnHomePage = (props:any) =>{
   if(Object.keys(props.weatherData).length > 0)
        return(
            <Container>
                <Space h="xl" />
                    <Stack align="center" justify="center" spacing="xs">
                        <WeatherIcon iconId={props.weatherData.weather[0].icon} />       
                        <Title order={2}>{props.weatherData.main.temp} °C</Title>                
                    </Stack>                                    
            </Container>
        )
    return(
        <LoadingOverlay visible={true}></LoadingOverlay>
    )    

}

export default WeahterOnHomePage; 