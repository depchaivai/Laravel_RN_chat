/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Chatitems from '../components/ChatItem/Chatitems';
import { echo } from '../libs/api/api';
import { chatThunk, updateMes } from '../reduxif/chatSlice';
import * as Keychain from 'react-native-keychain';

const styles = StyleSheet.create({
    chatview: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
});

const Chatscr = ({navigation}) => {
    const room = useSelector(state=>state.chat.room); 
    const [list,setList] = useState([]);
    const [got,setGot] = useState(false);
    const dispatch = useDispatch();
    const addhd = async () => {
        const tk = await Keychain.getInternetCredentials('token');
        if(tk.password){
            echo.connector.options.auth.headers['Authorization'] = `Bearer ${tk.password}`;
            setGot(true);
        }
        
    }
    const renderItem = ({item,index}) => {
        if( item !== 'undefined' )
        return <Chatitems navigation={navigation} lastMess = {item.message[0] || '' } roomIndex={index} room_id={item.id} users = {item.users}/>
    }
    useEffect(() => {
        if ( room[0] !== 'undefined') {
            setList([...room]);
        }
    }, [room])
    useEffect(() => {
        if(got && typeof(room) !== undefined ){
             room.map((item,index)=>{
                return echo.private(`chat.${item.id}`).listen('.sendmess',ev=>{
                    // setYmes(pre=>([ev[0],...pre]));
                    dispatch(updateMes({index: index, ms: ev[0]}));
                });
            })
        }
        if (!got) {
            addhd();
        }
        
        
        return () => {
            room.map((item)=>{
                return echo.leave(`chat.${item.id}`);
            })
            
        }
    }, [got,room]);
    return (
            <FlatList
                contentContainerStyle={{paddingVertical: 30}}
                style={styles.chatview}
                data={list}
                renderItem={renderItem}
                keyExtractor={(item,index) => index}
            />

    );
};

export default Chatscr;
