import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserData {
    numberOfFavUsersCities: number,
    citySelectedByUserOnHisList: number
  }
  
  const initialState: UserData = {
    numberOfFavUsersCities: 0, 
    citySelectedByUserOnHisList: 0
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
      clearUserData: (state:any) => {
        state.numberOfFavUsersCities = 0;
        state.citySelectedByUserOnHisList = 0
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setNumberOfFavUsersCities, selectCityFromUsersList, clearUserData } = UserData.actions
  
  export default UserData.reducer