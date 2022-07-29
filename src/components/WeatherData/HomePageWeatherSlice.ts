import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import type {WeatherDetailsForCity} from "./WeatherDataSlice";
import {baseUrl, apiKey} from "../../api/WeatherAPI";
import convertUnixTime from '../../tools/convertUnixTime'
  
  export interface WeahterDataWithForecast{
    weahter: WeatherDetailsForCity;
    forecast: any;
    cityOnHomePage: string
  }

  const initialState = {
   weather: {
    cityName: "loading...",
    temp: 99999,
    sunrise: {hour: '21', minutes: '37'},
    sunset: {hour: '21', minutes: '37'},
    weatherIconId: "11d",
   }, 
   forecast: {},
   cityOnHomePage: "Paryż"
  }

  const fetchWeatherForHomePage = createAsyncThunk(
    "weather/HomePageWeather",
    async (cityName: string) => {
      let weather: any = [];
      let responseOkStatus: boolean = false;
      let responseToReturn: any = null;
        const response = await fetch(
          `${baseUrl}weather?&units=metric&q=${cityName}&appid=${apiKey}`
        );
        const data = await response.json();
        if (response.ok === true) {
          responseOkStatus = true;
          weather.push(data);
        } else {
          responseToReturn = data;
        }
      if (responseOkStatus === false) {
        return { responseToReturn, responseOkStatus };
      }
      if (responseOkStatus === true) return { weather, responseOkStatus };
    }
  );

  const fetchForecastForHomePage = createAsyncThunk(
    "weather/HomePageforecast",
    async (cityName: string) => {
      let forecast: any = [];
      let responseOkStatus: boolean = false;
      let responseToReturn: any = null;
        const response = await fetch(
          `${baseUrl}forecast?&units=metric&q=${cityName}&appid=${apiKey}`
        );
        const data = await response.json();
        if (response.ok === true) {
          responseOkStatus = true;
          forecast.push(data);
        } else {
          responseToReturn = data;
        }
      if (responseOkStatus === false) {
        return { responseToReturn, responseOkStatus };
      }
      if (responseOkStatus === true) return { forecast, responseOkStatus };
    }
  );
  
  export const WeahterDataWithForecastSlice = createSlice({
    name: 'WeahterDataWithForecast',
    initialState,
    reducers: {
      setCityOnHomePage: (state:any, action: PayloadAction<string>) => {
       state.cityOnHomePage = action.payload;
      },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeatherForHomePage.fulfilled, (state, action) => {
            let dataToStore: WeatherDetailsForCity;
            console.log(action.payload?.weather[0])
            if(action.payload && action.payload.responseOkStatus){
              dataToStore ={
                cityName:action.payload.weather[0].name,
                temp: action.payload.weather[0].main.temp,
                sunrise: convertUnixTime(
                  action.payload.weather[0].sys.sunrise
                ),
                sunset: convertUnixTime(
                  action.payload.weather[0].sys.sunset
                ),
                weatherIconId:
                  action.payload.weather[0].weather[0].icon,
                
              }
              state.weather = dataToStore;
            }
        });

        builder.addCase(fetchForecastForHomePage.fulfilled, (state, action) => {
         state.forecast = action.payload.forecast;
      });
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { setCityOnHomePage } = WeahterDataWithForecastSlice.actions
  export {fetchWeatherForHomePage, fetchForecastForHomePage}
  
  export default WeahterDataWithForecastSlice.reducer