import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chatsrc from './Chatscr';
import Findchat from './Findchat';
import Icon from 'react-native-vector-icons/Ionicons';
import Topapp from '../components/Top/Topapp';
import Findnew from './Findnew';
import Waillist from './Waillist';
import { useDispatch, useSelector } from 'react-redux';
import { chatThunk } from '../reduxif/chatSlice';
import { Text } from 'react-native';


const Tab = createBottomTabNavigator();

const Homescr = () => {
    const user = useSelector(state=>state.login.user);
    const chatstt = useSelector(state=>state.chat.status);
    const dispatch = useDispatch();
    // const [got,setGot] = useState(false);
    useEffect(() => {
        dispatch(chatThunk(user.id));
        // setGot(true);
    }, [])
    if (chatstt !== 'success') {
        return <Text>loadding...</Text>
    }
    return (
       <Tab.Navigator
        initialRouteName='Chat'
        screenOptions={({route})=>({
            tabBarIcon: ({focused,color, size})=>{
                let itemname;
                if(route.name == 'Chat'){
                    itemname = focused ? 'chatbox-ellipses-sharp' : 'ios-chatbox-ellipses-outline';
                }
                if (route.name == 'Findchat') {
                    itemname = focused ? 'person-circle' : 'person-circle-outline';
                }
                if (route.name == 'Waitlist') {
                    itemname = focused ? 'receipt' : 'receipt-outline';
                }
                return <Icon name={itemname} size = {size} color = {color}/>
            },
            tabBarActiveTintColor: 'dodgerblue',
            tabBarInactiveTintColor: 'grey',
            tabBarStyle:{
                borderTopWidth: 0,
                elevation: 0
            },
            }
            )
            
        
    }
       >
           <Tab.Screen name="Chat" options = { { tabBarBadge : 3,headerTitle: (props)=><Topapp navigation={props.navigation} {...props}/>} } component={Chatsrc}/>
           <Tab.Screen name="Findchat" component={Findchat}/>
           <Tab.Screen name="Waitlist" component={Waillist}/>
       </Tab.Navigator>
    )
}

export default Homescr
