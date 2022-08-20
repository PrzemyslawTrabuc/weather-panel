import React, {useEffect, useRef} from "react";
import SearchForm from "./SearchForm";
import {fetchWeatherForHomePage, fetchForecastForHomePage} from "../Weather/HomePageWeatherSlice";
import type { RootState, AppDispatch } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import getCookie from "../../utils/getCookie";
import {Container, Button, Title, Center, Space, Group} from "@mantine/core";
import WeatherOnHomePage from "./WeatherOnHomePage";
import ForecastOnHomepage from "./ForecastCards";

const Homepage=(props:any)=>{
    const dispatch:AppDispatch = useDispatch();
    const test = useRef(true)
    const homepageWeather:any = useSelector((state:RootState)=> state.HomePageWeather.weather);
    const homepageForecast:any = useSelector((state:RootState)=> state.HomePageWeather.forecast);
    const userFavCities = useSelector((state:RootState)=> state.UserData.userFavCities);
    const userId = useSelector((state:RootState)=> state.GoogleAuth.userId);

    useEffect(()=>{
        let cityOnHomePageCookie:string = getCookie("cityOnHomePage")
        if(test.current === true){
            if(cityOnHomePageCookie){
                dispatch(fetchWeatherForHomePage(cityOnHomePageCookie));
                dispatch(fetchForecastForHomePage(cityOnHomePageCookie));
            }
            if(!cityOnHomePageCookie){
                dispatch(fetchWeatherForHomePage("Londyn"));
                dispatch(fetchForecastForHomePage("Londyn"));
            }            
        }
        test.current = false;
    },[])

    const checkIfCityIsInUsersFav = ():boolean =>{
        if(userFavCities.includes(homepageWeather.name))
            return true;
        else return false;    
    }

    const handleAddToFavButtonClick = async() =>{
         const response = await props.addFavCity(userId,homepageWeather.name);
    }

    return(
        <>
            <SearchForm></SearchForm>
            <Space h="xl"></Space>
            <Container size="xl">
                <Center>
                    <Group>
                        <Title>{homepageWeather.name}</Title>
                        {userId ? <Button color={checkIfCityIsInUsersFav() ? "red" : ""}compact size="xs" onClick={handleAddToFavButtonClick}><i className="fa-solid fa-heart"></i></Button> : null}
                    </Group>
                </Center>
                <WeatherOnHomePage forecastData={homepageForecast} weatherData={homepageWeather}/>
                <ForecastOnHomepage forecastData={homepageForecast}/>
            </Container>
            
        </>
    )
}

export default Homepage