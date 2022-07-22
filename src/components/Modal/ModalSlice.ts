import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Modal {
    isOpen: boolean,
  }
  
  const initialState: Modal = {
    isOpen: false
  }
  
  export const Modal = createSlice({
    name: 'Modal',
    initialState,
    reducers: {
        toggleModal: (state : any) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.isOpen = !state.isOpen;
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { toggleModal } = Modal.actions
  
  export default Modal.reducer