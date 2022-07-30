import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SwapCities } from '../WeatherData/WeatherDataSlice'

export interface UserData {
    numberOfFavUsersCities: number,
    citySelectedByUserOnHisList: number,
    userFavCities: Array<string>
  }
  
  const initialState: UserData = {
    numberOfFavUsersCities: 0, 
    citySelectedByUserOnHisList: 0,
    userFavCities: []
  }
  
  export const UserData = createSlice({
    name: 'UserData',
    initialState,
    reducers: {
      setNumberOfFavUsersCities: (state:any, action: PayloadAction<number>) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
       state.numberOfFavUsersCities = action.payload;
      },
      selectCityFromUsersList: (state:any, action:PayloadAction<number>) => {
        state.citySelectedByUserOnHisList = action.payload;
      },
      setUserFavCities:(state:any, action: PayloadAction<Array<string>>) => {
        state.userFavCities = action.payload;
      },
      clearUserData: (state:any) => {
        state.numberOfFavUsersCities = 0;
        state.citySelectedByUserOnHisList = 0;
        state.userFavCities = "add some cities"
      },
      deleteUserFavCity:(state:any, action:PayloadAction<number>)=>{
        state.userFavCities.splice(action.payload,1);
      },
      moveFavCityLeftInArray(state: any, action: PayloadAction<SwapCities>){
        if(state.userFavCities[action.payload.cityIndexInArrayToChange-1]){
          state.userFavCities[action.payload.cityIndexInArrayToChange] = state.userFavCities[action.payload.cityIndexInArrayToChange-1]
          state.userFavCities[action.payload.cityIndexInArrayToChange-1] = action.payload.cityDataToUseAsTemp.name
        }
      },
      moveFavCityRightInArray(state: any, action: PayloadAction<SwapCities>){
        console.log(action.payload)
        if(state.userFavCities[action.payload.cityIndexInArrayToChange+1]){
          state.userFavCities[action.payload.cityIndexInArrayToChange] = state.userFavCities[action.payload.cityIndexInArrayToChange+1]
          state.userFavCities[action.payload.cityIndexInArrayToChange+1] = action.payload.cityDataToUseAsTemp.name
        }
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setNumberOfFavUsersCities, selectCityFromUsersList, clearUserData, setUserFavCities, deleteUserFavCity, moveFavCityLeftInArray, moveFavCityRightInArray} = UserData.actions
  
  export default UserData.reducer