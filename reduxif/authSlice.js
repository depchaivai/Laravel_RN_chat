import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signing } from '../libs/api/authAPI';
import * as Keychain from 'react-native-keychain';

export const loginthunk = createAsyncThunk(
    'auth/login',
    async () => {
        const userinfo = await Keychain.getGenericPassword();
        const dv_tk = await Keychain.getInternetCredentials('dv_token');
        const newuser = {
          name: userinfo.username,
          password: userinfo.password,
          dv_token: dv_tk.password
        }
      const response = await signing(newuser);
      await Keychain.setInternetCredentials('token','token',response.access_token);
      return response;
    },
  );

const authSlice = createSlice({
    name: 'login',
    initialState: {
      isLoged: false,
      user: null,
      status: 'idle'
    },
    reducers: {
      toLogout: (state) => {
        state.user = null;
        state.status = 'idle'
        state.isLoged = false
      },
      setLogin: (state,{payload}) => {
        state.user = payload;
        state.status = 'success'
        state.isLoged = true
      }
    },
    extraReducers: {
        [loginthunk.pending](state){
            state.status = 'logging'
        },
        [loginthunk.fulfilled](state,{ payload }){
          state.status = 'logged'
          state.isLoged = true
          state.user = payload.user
      },
      [loginthunk.pending](state){
          state.status = 'rejected'
      }
    }
  })

export const { toLogout,setLogin } = authSlice.actions;
export default authSlice.reducer