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
  cityDataToUseAsTemp: WeatherDetailsForCity
}
export interface WeatherDetailsForCity {
  cityName: string;
  temp: number;
  sunrise: string;
  sunset: string;
  weatherIconId: string;
}

export interface WeatherData {
  cities: [
    WeatherDetailsForCity
  ];
  isFetched: boolean;
  numberOfCities: number;
  fetchError: string;
  currentCityWeather: WeatherDetailsForCity
}

const initialState: WeatherData = {
  cities: [
    {
      cityName: "loading...",
      temp: 99999,
      sunrise: "loading...",
      sunset: "loading...",
      weatherIconId: "11d",
    },
  ],
  isFetched: false,
  numberOfCities: 0,
  fetchError: ":)",
  currentCityWeather: {
      cityName: "loading...",
      temp: 99999,
      sunrise: "loading...",
      sunset: "loading...",
      weatherIconId: "11d",
  }
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

const fetchSingleWeatherThunk = createAsyncThunk(
  "weather/getSingleWeather",
  async (cityName: string) => {
    console.log("dupa2")
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
      state.cities.splice(action.payload,1);
    },
    clearWeatherData:(state:any)=>{
      state.cities = [{
        cityName: "loading...",
        temp: 99999,
        sunrise: "loading...",
        sunset: "loading...",
        weatherIconId: "11d",
      }];
      state.numberOfCities = 0;
      state.isFetched = false;
    },
    moveItemLeftInArray(state: any, action: PayloadAction<SwapCities>){
      if(state.cities[action.payload.cityIndexInArrayToChange-1]){
        state.cities[action.payload.cityIndexInArrayToChange] = state.cities[action.payload.cityIndexInArrayToChange-1]
        state.cities[action.payload.cityIndexInArrayToChange-1] = action.payload.cityDataToUseAsTemp
      }
    },
    moveItemRightInArray(state: any, action: PayloadAction<SwapCities>){
      console.log(action.payload)
      if(state.cities[action.payload.cityIndexInArrayToChange+1]){
        state.cities[action.payload.cityIndexInArrayToChange] = state.cities[action.payload.cityIndexInArrayToChange+1]
        state.cities[action.payload.cityIndexInArrayToChange+1] = action.payload.cityDataToUseAsTemp
      }
    },
    addNewCityToWeatherData(state:any, action:PayloadAction<WeatherDetailsForCity>){
      state.cities.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchWeatherThunk.fulfilled, (state, action) => {
      let data: WeatherDetailsForCity;
      state.numberOfCities = 0;
      let gatheredData:[WeatherDetailsForCity] = 
      [
        {
          cityName: "loading...",
          temp: 99999,
          sunrise: "loading...",
          sunset: "loading...",
          weatherIconId: "11d"
        }
      ];
      let counter: number = 0;
      if (action.payload && action.payload.responseOkStatus) {
        while (action.payload.gatheredData[counter]) {
          if (action.payload.gatheredData[counter]) {
            data = {
              cityName: action.payload.gatheredData[counter].name,
              temp: action.payload.gatheredData[counter].main.temp,
              sunrise: convertUnixTime(
                action.payload.gatheredData[counter].sys.sunrise
              ),
              sunset: convertUnixTime(
                action.payload.gatheredData[counter].sys.sunset
              ),
              weatherIconId:
                action.payload.gatheredData[counter].weather[0].icon,
            };
            if(counter === 0)
              gatheredData[0] = (data);
            if(counter !== 0)
              gatheredData.push(data);
              state.numberOfCities++;
          }
          counter++;
        }
        console.log(gatheredData)
        state.cities = gatheredData;
        state.isFetched = true;
      }
      if (action.payload && action.payload.responseOkStatus === false && action.payload.responseOkStatus)
        state.fetchError = action.payload.responseToReturn.message;   
        state.cities=gatheredData;
    });
    builder.addCase(fetchWeatherThunk.pending, (state, action) => {
      state.isFetched = false;
    });
    builder.addCase(fetchWeatherThunk.rejected, (state, action) => {
      state.isFetched = false;
    });
    builder.addCase(fetchSingleWeatherThunk.fulfilled, (state, action) => {
      let dataToStore: WeatherDetailsForCity;
      console.log(action.payload?.cityData[0])
      if(action.payload && action.payload.responseOkStatus){
        dataToStore ={
          cityName:action.payload.cityData[0].name,
          temp: action.payload.cityData[0].main.temp,
          sunrise: convertUnixTime(
            action.payload.cityData[0].sys.sunrise
          ),
          sunset: convertUnixTime(
            action.payload.cityData[0].sys.sunset
          ),
          weatherIconId:
            action.payload.cityData[0].weather[0].icon,
          
        }
        state.currentCityWeather = dataToStore;
      }
      if(action.payload && action.payload.responseOkStatus===false)
        state.fetchError = action.payload.responseToReturn.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { deleteCityFromCities, clearWeatherData, moveItemLeftInArray, moveItemRightInArray, addNewCityToWeatherData } = WeatherData.actions;
export { fetchWeatherThunk, fetchSingleWeatherThunk };

export default WeatherData.reducer;
