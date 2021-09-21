import { createSlice } from '@reduxjs/toolkit'

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})

export const { incremented, decremented } = keyboardSlice.actions
export default keyboardSlice.reducer