import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ToggleMobileMenu {
    isOpen: boolean,
    isDesktop: boolean
  }
  
  const initialState: ToggleMobileMenu = {
    isOpen: false,
    isDesktop: true
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
        state.isOpen = !state.isOpen;
      },
        toggleDesktop: (state : any, action: PayloadAction<boolean>) =>{
        state.isDesktop = action.payload
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { toggleMobileMenu, toggleDesktop } = ToggleMobileMenu.actions
  
  export default ToggleMobileMenu.reducer