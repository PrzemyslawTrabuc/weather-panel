import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GoogleAuth {
    userName: string | null,
    userId: string | null
  }
  
  const initialState: GoogleAuth = {
    userName: null,
    userId: null
  }
  
  export const GoogleAuth = createSlice({
    name: 'GoogleAuth',
    initialState,
    reducers: {
      signIn: (state:any, action: PayloadAction<GoogleAuth>) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
       state.userName = action.payload.userName;
       state.userId = action.payload.userId;
      },
      signOut:(state:any) =>{
        state.userName = null
        state.userId = null;
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { signIn, signOut } = GoogleAuth.actions
  
  export default GoogleAuth.reducer