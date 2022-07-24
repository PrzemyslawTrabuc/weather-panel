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

export interface Test {
  cityName: string;
  temp: number;
  sunrise: string;
  sunset: string;
  weatherIconId: string;
}
export interface WeatherData {
  cities: [
    {
      cityName: string;
      temp: number;
      sunrise: string;
      sunset: string;
      weatherIconId: string;
    }
  ];
  isFetched: boolean;
  numberOfCities: number;
  fetchError: string;
}

const initialState: WeatherData = {
  cities: [
    {
      cityName: "loading...",
      temp: -0,
      sunrise: "loading...",
      sunset: "loading...",
      weatherIconId: "11d",
    },
  ],
  isFetched: false,
  numberOfCities: 1,
  fetchError: ":)",
};

// const fetchWeatherThunk = createAsyncThunk(
//   'weather/getWeather',
//     async (cities:[], thunkAPI) => {
//     console.log(cities);
//     let gatheredData:any = [];
//     let data = {};
//     await cities.forEach(async(city)=>{
//       const response = await fetch(`${baseUrl}q=${city}&appid=${apiKey}`);
//       data = await response.json();
//       gatheredData.push(data);
//       console.log(gatheredData)
//     });
//   }
// )
const fetchWeatherThunk = createAsyncThunk(
  "weather/getWeather",
  async (cities: Array<string>, thunkAPI) => {
    console.log(cities);
    let gatheredData: any = [];
    let responseOkStatus: boolean = false;
    let responseToReturn: any = null;
    for (const element of cities) {
      const response = await fetch(
        `${baseUrl}weather?&units=metric&q=${element}&appid=${apiKey}`
      );
      const data = await response.json();
      console.log(response);
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
    if (responseOkStatus === true) return { gatheredData, responseOkStatus };
  }
);

export const WeatherData = createSlice({
  name: "WeatherData",
  initialState,
  reducers: {
    setCities: (state: any, action: PayloadAction<WeatherData>) => {
      state.cities = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchWeatherThunk.fulfilled, (state, action) => {
      let data: Test;
      let counter: number = 0;
      if (action.payload && action.payload.responseOkStatus) {
        while (counter < 2) {
          if (action.payload.gatheredData[counter]) {
            data = {
              cityName: action.payload.gatheredData[counter].name,
              temp: action.payload.gatheredData[counter].main.temp,
              sunrise: convertUnixTime(
                action.payload.gatheredData[counter].sys.sunrise
              ),
              sunset: convertUnixTime(
                action.payload.gatheredData[0].sys.sunset
              ),
              weatherIconId:
                action.payload.gatheredData[counter].weather[0].icon,
            };
            state.cities.push(data);
            state.numberOfCities += 1;
          }
          counter++;
        }
        state.isFetched = true;
      }
      if (action.payload && action.payload.responseOkStatus === false)
        state.fetchError = action.payload.responseToReturn.message;
    });
    builder.addCase(fetchWeatherThunk.pending, (state, action) => {
      state.isFetched = false;
    });
    builder.addCase(fetchWeatherThunk.rejected, (state, action) => {
      state.isFetched = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setCities } = WeatherData.actions;
export { fetchWeatherThunk };

export default WeatherData.reducer;
