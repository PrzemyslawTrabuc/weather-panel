import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ToggleMobileMenu {
    value: boolean
  }
  
  const initialState: ToggleMobileMenu = {
    value: false,
  }
  
  export const ToggleMobileMenu = createSlice({
    name: 'ToggleMobileMenu',
    initialState,
    reducers: {
        toggleMobileMenu: (state : any) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.value = !state.value;
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { toggleMobileMenu } = ToggleMobileMenu.actions
  
  export default ToggleMobileMenu.reducer