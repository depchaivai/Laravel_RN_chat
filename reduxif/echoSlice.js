import { createSlice } from '@reduxjs/toolkit';


const echoSlice = createSlice({
    name: 'echo',
    initialState: {
      echo: null,
      status: 'idle'
    },
    reducers: {
        echoinit: (state, action) => {
            state.status = 'ready',
            state.echo=action.payload
        },
      },
  })

export const { echoinit } = echoSlice.actions;
export default echoSlice.reducer