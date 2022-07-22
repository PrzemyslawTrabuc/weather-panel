import React from "react";
import {Image} from '@mantine/core';

import {weatherImageBaseUrl} from '../../api/WeatherAPI';

interface WeatherIcon{
    iconId: string,
}

const WeatherIcon = (props:WeatherIcon) =>{
    console.log()
    return(
        <Image src={`${weatherImageBaseUrl}${props.iconId}@2x.png`}></Image>
    )
}

export default WeatherIcon;