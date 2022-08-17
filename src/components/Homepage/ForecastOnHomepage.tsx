import React from 'react'
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const ForecastOnHomepage = (props:any) =>{
  
    const buildDaysForecastList = (numberOfCards:number) =>{
       const reducedForecast = props.forecastData.list.slice(0, numberOfCards) 
       const listToRender = reducedForecast.map((item:any) => (
            <li key={item.dt}>{item.dt_txt}</li>
        ));
       return listToRender
    }

    if(Object.keys(props.forecastData).length > 0)
    return (
        <>
            {buildDaysForecastList(5)}
        </>
    )
    else return <>Forecast</>
}

export default ForecastOnHomepage;