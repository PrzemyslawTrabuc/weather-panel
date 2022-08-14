import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import {baseUrl, apiKey} from "../../api/WeatherAPI";
import convertUnixTime from '../../tools/convertUnixTime'
  
  export interface WeahterDataWithForecast{
    weahter: any;
    forecast: any;
    error: string;
    isFetched: boolean;
  }

  const initialState = {
   weather: {},
   forecast: {},
   error: "no error",
   isFetched: false,
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
          weather = data;
          document.cookie = `cityOnHomePage=${cityName}`;
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
          forecast = data;
          document.cookie = `cityOnHomePage=${cityName}`;
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
            if(action.payload && action.payload.responseOkStatus){
              state.error = "no error";
              state.weather = action.payload.weather;
              state.isFetched = true;
              return
            }
            if(action.payload && !action.payload.responseOkStatus){
              state.error = action.payload.responseToReturn;
              state.isFetched = false
            }
        });

        builder.addCase(fetchForecastForHomePage.fulfilled, (state, action) => {
          if(action.payload && action.payload.responseOkStatus){
            //state.error = "no error";
            state.forecast = action.payload.forecast;
            state.isFetched = true;
            return
          }           
          if(action.payload && !action.payload.responseOkStatus){
            //state.error = action.payload.responseToReturn;
            //state.isFetched = false
          } 
           
      });
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { setCityOnHomePage } = WeahterDataWithForecastSlice.actions
  export {fetchWeatherForHomePage, fetchForecastForHomePage}
  
  export default WeahterDataWithForecastSlice.reducer