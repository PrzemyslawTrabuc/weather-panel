// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import {apiKey, baseUrl} from '../../api/WeatherAPI';

// import convertUnixTime from '../../tools/convertUnixTime';

// export interface WeatherData {
//     isFetched:boolean;
//     cityName: string,
//     temp: number,
//     sunrise: string,
//     sunset: string,
//     weatherIconId: string
//   }

//   const initialState: WeatherData = {
//     isFetched: false,
//     cityName: "",
//     temp: 0,
//     sunrise: '',
//     sunset: '',
//     weatherIconId: ''
//   }

//   const fetchWeatherThunk = createAsyncThunk(
//     'weather/getWeather',
//     async (city:string, thunkAPI) => {
//         const response = await fetch(`${baseUrl}q=${city}&appid=${apiKey}`);
//         const data = await response.json();
//         console.log(data)
//         return data;
//     }
//   )

//   export const WeatherData = createSlice({
//     name: 'WeatherData',
//     initialState,
//     reducers: {
//       getWeather: (state: any, action: PayloadAction<WeatherData>) => {
//         // Redux Toolkit allows us to write "mutating" logic in reducers. It
//         // doesn't actually mutate the state because it uses the Immer library,
//         // which detects changes to a "draft state" and produces a brand new
//         // immutable state based off those changes
//       }
//     },
//     extraReducers: (builder) => {
//         // Add reducers for additional action types here, and handle loading state as needed
//         builder.addCase(fetchWeatherThunk.fulfilled, (state, action) => {
//           state.isFetched = true;
//           state.cityName = action.payload.name;
//           state.temp = action.payload.main.temp;
//           state.sunrise = convertUnixTime(action.payload.sys.sunrise);
//           state.sunset = convertUnixTime(action.payload.sys.sunset);
//           state.weatherIconId = action.payload.weather[0].icon;
//         }),
//         builder.addCase(fetchWeatherThunk.pending, (state, action) => {
//           state.isFetched = false;
//         })
//       },
//     })

//   // Action creators are generated for each case reducer function
//   export const { getWeather } = WeatherData.actions;
//   export {fetchWeatherThunk};

//   export default WeatherData.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { apiKey, baseUrl } from "../../api/WeatherAPI";

import convertUnixTime from "../../tools/convertUnixTime";

export interface SwapCities{
  cityIndexInArrayToChange: number,
  cityDataToUseAsTemp: any
}

export interface Time{
  hour: string,
  minutes:string
}

export interface WeatherData {
  isFetched: boolean;
  numberOfCities: number;
  fetchError: string;
  weather:any;
  forecast:any;
  highestTemperature:number | null;
  lowestTemperature:number | null;
}

const initialState: WeatherData = {
  isFetched: false,
  numberOfCities: 0,
  fetchError: "no error",
  weather: {gatheredData: []},
  forecast: {gatheredData: []},
  highestTemperature: null,
  lowestTemperature: null
};

const fetchWeatherThunk = createAsyncThunk(
  "weather/getWeather",
  async (cities: Array<string>) => {
    let gatheredData: any = [];
    let responseOkStatus: boolean = false;
    let responseToReturn: any = null;
    for (const element of cities) {
      const response = await fetch(
        `${baseUrl}weather?&units=metric&q=${element}&appid=${apiKey}`
      );
      const data = await response.json();
      if (response.ok === true) {
        responseOkStatus = true;
        gatheredData.push(data);

      } else {
        responseToReturn = data;
      }
    }
    if (responseOkStatus === false) {
      return { responseToReturn, responseOkStatus };
    }
    console.log(gatheredData);
    if (responseOkStatus === true) return { gatheredData, responseOkStatus };
  }
);

const fetchForecastThunk = createAsyncThunk(
  "weather/getForecast",
  async (cities: Array<string>) => {
    let gatheredData: any = [];
    let responseOkStatus: boolean = false;
    let responseToReturn: any = null;
    for (const element of cities) {
      const response = await fetch(
        `${baseUrl}forecast?&units=metric&q=${element}&appid=${apiKey}`
      );
      const data = await response.json();
      if (response.ok === true) {
        responseOkStatus = true;
        gatheredData.push(data);

      } else {
        responseToReturn = data;
      }
    }
    if (responseOkStatus === false) {
      return { responseToReturn, responseOkStatus };
    }
    if (responseOkStatus === true) 
      return { gatheredData, responseOkStatus };
  }
);

const fetchSingleWeatherThunk = createAsyncThunk(
  "weather/getSingleWeather",
  async (cityName: string) => {
    let cityData: any = [];
    let responseOkStatus: boolean = false;
    let responseToReturn: any = null;
      const response = await fetch(
        `${baseUrl}weather?&units=metric&q=${cityName}&appid=${apiKey}`
      );
      const data = await response.json();
      if (response.ok === true) {
        responseOkStatus = true;
        cityData.push(data);
      } else {
        responseToReturn = data;
      }
    if (responseOkStatus === false) {
      return { responseToReturn, responseOkStatus };
    }
    if (responseOkStatus === true) return { cityData, responseOkStatus };
  }
);

export const WeatherData = createSlice({
  name: "WeatherData",
  initialState,
  reducers: {
    deleteCityFromCities: (state: any, action: PayloadAction<number>) => {
      state.numberOfCities -= 1;
      state.weather.gatheredData.splice(action.payload,1);
      state.forecast.gatheredData.splice(action.payload,1);
    },
    clearWeatherData:(state:any)=>{
      state.numberOfCities = 0;
      state.isFetched = false;
    },
    moveItemLeftInArray(state: any, action: PayloadAction<SwapCities>){
      if(state.weather.gatheredData[action.payload.cityIndexInArrayToChange-1]){
        state.weather.gatheredData[action.payload.cityIndexInArrayToChange] = state.weather.gatheredData[action.payload.cityIndexInArrayToChange-1]
        state.weather.gatheredData[action.payload.cityIndexInArrayToChange-1] = action.payload.cityDataToUseAsTemp
      }
    },
    moveItemRightInArray(state: any, action: PayloadAction<SwapCities>){
      console.log(action.payload)
      if(state.weather.gatheredData[action.payload.cityIndexInArrayToChange+1]){
        state.weather.gatheredData[action.payload.cityIndexInArrayToChange] = state.weather.gatheredData[action.payload.cityIndexInArrayToChange+1]
        state.weather.gatheredData[action.payload.cityIndexInArrayToChange+1] = action.payload.cityDataToUseAsTemp
      }
    },
    addNewCityToWeatherData(state:any, action:PayloadAction<any>){
      console.log(action.payload)
      state.weather.gatheredData.push(action.payload.weather);
      state.forecast.gatheredData.push(action.payload.forecast);
      state.numberOfCities++;
    },
    setHighestTemperature(state:any, action:PayloadAction<number>){
      state.highestTemperature = action.payload;
    },
    setLowestTemperature(state:any, action:PayloadAction<number>){
      state.lowestTemperature = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchWeatherThunk.fulfilled, (state, action) => {
      console.log(action.payload)
      if (action.payload && action.payload.responseOkStatus) {
        state.weather = action.payload;
        state.numberOfCities = action.payload.gatheredData.length;
        state.isFetched = true;
        return
      }
      if (action.payload && !action.payload.responseOkStatus){
        state.fetchError = action.payload.responseToReturn;
        state.isFetched = false;   
      }
    });
    builder.addCase(fetchWeatherThunk.pending, (state, action) => {
      state.isFetched = false;
    });
    builder.addCase(fetchWeatherThunk.rejected, (state, action) => {
      state.isFetched = false;
    });
    builder.addCase(fetchForecastThunk.fulfilled, (state, action) => {
      console.log(action.payload)
      if (action.payload && action.payload.responseOkStatus) {
        state.forecast = action.payload;
        state.numberOfCities = action.payload.gatheredData.length;
        state.isFetched = true;
        return
      }
      if (action.payload && !action.payload.responseOkStatus)
        state.fetchError = action.payload.responseToReturn;   
        state.isFetched = false;
    });
  },  
});

// Action creators are generated for each case reducer function
export const { deleteCityFromCities, clearWeatherData, moveItemLeftInArray, moveItemRightInArray, addNewCityToWeatherData, setHighestTemperature, setLowestTemperature } = WeatherData.actions;
export { fetchWeatherThunk, fetchForecastThunk };

export default WeatherData.reducer;
