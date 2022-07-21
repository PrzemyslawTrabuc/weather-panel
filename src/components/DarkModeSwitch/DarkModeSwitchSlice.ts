import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DarkModeSwitch {
    value: string
  }
  
  const initialState: DarkModeSwitch = {
    value: 'dark',
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
        if(state.value === 'dark')
        state.value = 'light';
        else if(state.value === 'light')
        state.value = 'dark';        
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { toggleDarkMode } = DarkModeSwitch.actions
  
  export default DarkModeSwitch.reducer