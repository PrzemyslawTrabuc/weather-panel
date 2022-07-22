import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {apiKey, baseUrl} from '../../api/WeatherAPI';

import convertUnixTime from '../../tools/convertUnixTime';

export interface WeatherData {
    cityName: string,
    temp: number,
    sunrise: string,
    sunset: string,
    weatherIconId: string
  }
  
  const initialState: WeatherData = {
    cityName: "",
    temp: 0,
    sunrise: '',
    sunset: '',
    weatherIconId: ''
  }
  
  const fetchWeatherThunk = createAsyncThunk(
    'weather/getWeather',
    async (city:string, thunkAPI) => {
        const response = await fetch(`${baseUrl}q=${city}&appid=${apiKey}`);
        const data = await response.json();
        console.log(data)
        return data;       
    }
  )

  export const WeatherData = createSlice({
    name: 'WeatherData',
    initialState,
    reducers: {
      getWeather: (state: any, action: PayloadAction<WeatherData>) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
      }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchWeatherThunk.fulfilled, (state, action) => {
          // Add user to the state array
          state.cityName = action.payload.name;     
          state.temp = action.payload.main.temp;     
          state.sunrise = convertUnixTime(action.payload.sys.sunrise);  
          state.sunset = convertUnixTime(action.payload.sys.sunset);  
          state.weatherIconId = action.payload.weather[0].icon;
        })
      },
    })
  
  // Action creators are generated for each case reducer function
  export const { getWeather } = WeatherData.actions;
  export {fetchWeatherThunk};
  
  export default WeatherData.reducer