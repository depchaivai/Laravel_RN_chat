/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { Provider } from 'react-redux';
import Rootnav from './Fragment/Rootnav';
import { store } from './reduxif/store';


const queryClient = new QueryClient()
// const navigation = useNavigation();
 const App = () => {
  //  const [echoid,setechoid] = useState('');
  // useEffect(() => {
    
    
  // setechoid(echo.socketId());
  // }, [])
   return (
    <Provider store={store}>
     <QueryClientProvider client={queryClient}>
       <Rootnav/>
     </QueryClientProvider>
    </Provider>
   );
 };
 export default App;
 