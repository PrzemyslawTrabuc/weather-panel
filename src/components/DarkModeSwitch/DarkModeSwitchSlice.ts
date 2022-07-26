import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DarkModeSwitch {
    isDarkModeOn: boolean
  }
  
  const initialState: DarkModeSwitch = {
    isDarkModeOn: true,
  }
  
  export const DarkModeSwitch = createSlice({
    name: 'DarkModeSwitch',
    initialState,
    reducers: {
      toggleDarkMode: (state : any) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        if(state.isDarkModeOn === true){
        state.isDarkModeOn = false;
          document.cookie = "isDark=false"
        }
        else if(state.isDarkModeOn === false){
          document.cookie = "isDark=true"
        state.isDarkModeOn = true;  
        }      
      },
      initializeDarkModefromCookie: (state:any, action: PayloadAction<boolean>) => {
        state.isDarkModeOn = action.payload;
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { toggleDarkMode, initializeDarkModefromCookie } = DarkModeSwitch.actions
  
  export default DarkModeSwitch.reducer