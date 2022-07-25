import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserData {
    numberOfFavUsersCities: number,
    citySelectedByUserOnHisList: number,
    userFavCities: Array<string>
  }
  
  const initialState: UserData = {
    numberOfFavUsersCities: 0, 
    citySelectedByUserOnHisList: 0,
    userFavCities: ["add some cities"]
  }
  
  export const UserData = createSlice({
    name: 'UserData',
    initialState,
    reducers: {
      setNumberOfFavUsersCities: (state:any, action: PayloadAction<UserData>) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
       state.numberOfFavUsersCities = action.payload;
      },
      selectCityFromUsersList: (state:any, action:PayloadAction<UserData>) => {
        state.citySelectedByUserOnHisList = action.payload;
      },
      setUserFavCities:(state:any, action: PayloadAction<UserData>) =>{
        state.userFavCities = action.payload;
      },
      clearUserData: (state:any) => {
        state.numberOfFavUsersCities = 0;
        state.citySelectedByUserOnHisList = 0;
        state.userFavCities = "add some cities"
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setNumberOfFavUsersCities, selectCityFromUsersList, clearUserData, setUserFavCities} = UserData.actions
  
  export default UserData.reducer