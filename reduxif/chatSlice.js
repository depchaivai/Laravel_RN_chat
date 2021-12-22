import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRoom } from '../libs/api/roomAPI';
import { createSelector } from 'reselect'

export const chatThunk = createAsyncThunk(
    'chat/room',
    async (id) => {
      const response = await getRoom(id);
      return response;
    },
  );

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
      room: [],
      status: 'idle'
    },
    reducers: {
      updateMes: (state,{ payload }) => {
        state.room[payload.index].message.unshift(payload.ms);
      },
      seenMess: (state,{ payload }) => {
        // console.log(state.room[payload.ri]);
        state.room[payload.ri].message[0].read_at='seen';
      }
    },
    extraReducers: {
        [chatThunk.pending](state){
            state.status = 'fetching'
        },
        [chatThunk.fulfilled](state,{ payload }){
          state.status = 'success'
          state.room = payload
      },
      [chatThunk.pending](state){
          state.status = 'rejected'
      }
    }
  })

  export const { updateMes,seenMess } = chatSlice.actions;
  const selectRoom = state=>state.chat.room
  export const roommess = createSelector([selectRoom],(room,{roomid}) => {
    const mess = room.map(it=>roomid);
    return mess;
  });

export default chatSlice.reducer