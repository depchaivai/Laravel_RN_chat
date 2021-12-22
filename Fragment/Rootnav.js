import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginthunk } from '../reduxif/authSlice';
import Findlist from './Findlist';
import Findnew from './Findnew';
import Homescr from './Homescr';
import Login from './Login';
import Messcr from './Messcr';
import messaging from "@react-native-firebase/messaging";




const Stack = createNativeStackNavigator();

const deepLinksConf = {

        screens: {
            Message: 'Message/:room',
            Home: 'Home',
        },

  };
const linking = {
    prefixes: ['foodfeed://'],
    config: deepLinksConf,
    async getInitialURL() {
        // Check if app was opened from a deep link
        const url = await Linking.getInitialURL();
    
        if (url != null) {
          return url;
        }
    
        // Check if there is an initial firebase notification
        const message = await messaging().getInitialNotification();
    
        // Get deep link from data
        // if this is undefined, the app will open the default/home page
        return message?.data?.link;
      },
      subscribe(listener) {
        const onReceiveURL = ({url}) => listener(url);
    
        // Listen to incoming links from deep linking
        const sub = Linking.addEventListener('url', onReceiveURL);
    
        // Listen to firebase push notifications
        const unsubscribeNotification = messaging().onNotificationOpenedApp(
          (message) => {
            const url = message?.data?.link;
    
            if (url) {
              // Any custom logic to check whether the URL needs to be handled
              // Call the listener to let React Navigation handle the URL
              listener(url);
            }
          },
        );
    
        return () => {
          // Clean up the event listeners
          sub.remove();
          unsubscribeNotification();
        };
      },
    }


const Rootnav = () => {
    const dispatch = useDispatch();
    const logged = useSelector(state=>state.login.isLoged);
    useEffect(() => {
        if(!logged)
        dispatch(loginthunk());
    }, [logged]);
    return (
        <NavigationContainer linking={linking}>
        <Stack.Navigator>
            {logged ? <>
                <Stack.Screen name="Home" component={Homescr} options={{headerShown: false}}/>
                <Stack.Screen name="Message" component={Messcr} />
                <Stack.Screen name="Findnew" component={Findnew}/>
                <Stack.Screen name="Findlist" component={Findlist}/>
            </> : <>
                <Stack.Screen name="Signin" component={Login} options={{headerShown: false}}/>
            </>}
        </Stack.Navigator>
     </NavigationContainer>
    )
}

export default Rootnav
