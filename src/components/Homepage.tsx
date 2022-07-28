import React, {useEffect, useRef} from "react";
import SearchForm from "./SearchForm";
import {fetchWeatherForHomePage, fetchForecastForHomePage, setCityOnHomePage} from "./WeatherData/HomePageWeatherSlice";
import type { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import getCookie from "../tools/getCookie"

const Homepage=()=>{
    const dispatch:AppDispatch = useDispatch();
    const test = useRef(true)
    const cityToFetchFromStore = useSelector((state:RootState)=> state.HomePageWeather.cityOnHomePage);
     

    useEffect(()=>{
        let cityOnHomePageCookie:string = getCookie("cityOnHomePage")
        if(test.current === true){
            if(cityOnHomePageCookie){
                dispatch(setCityOnHomePage(cityOnHomePageCookie))
                dispatch(fetchWeatherForHomePage(cityOnHomePageCookie));
                dispatch(fetchForecastForHomePage(cityOnHomePageCookie));
            }
            if(!cityOnHomePageCookie){
                dispatch(setCityOnHomePage(cityToFetchFromStore))
                dispatch(fetchWeatherForHomePage(cityToFetchFromStore));
                dispatch(fetchForecastForHomePage(cityToFetchFromStore));
            }
        }
        test.current = false;
    },[])

    return(
        <>
            <SearchForm></SearchForm>
            <div>{cityToFetchFromStore}</div>
        </>
    )
}

export default Homepage