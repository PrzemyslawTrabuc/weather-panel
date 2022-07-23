import React from "react";
import {Image, LoadingOverlay} from '@mantine/core';

import {weatherImageBaseUrl} from '../../api/WeatherAPI';

interface WeatherIcon{
    iconId: string,
}

const WeatherIcon = (props:WeatherIcon) =>{
        return(
            <div>
            <Image src={`${weatherImageBaseUrl}${props.iconId}@2x.png`}></Image>
            </div>
        )
}

export default WeatherIcon;