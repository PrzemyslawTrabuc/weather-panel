import React from "react";

import {weatherImageBaseUrl} from '../../api/WeatherAPI';

interface WeatherIcon{
    iconId: string,
}

const WeatherIcon = (props:WeatherIcon) =>{
        return(
            <div style={{width:'100px'}}>
                <img draggable="false"  src={`${weatherImageBaseUrl}${props.iconId}@2x.png`}></img>
            </div>
        )
}

export default WeatherIcon;