/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 70,
    },
    ava: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
    },
    NandM: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
    },
    chatname: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        lineHeight: 30,
        paddingHorizontal: 20,
        // paddingVertical: 20,
    },
    premess: {
        fontSize: 13,
        color: '#000',
        paddingLeft: 20,
        lineHeight: 30,
        // paddingVertical: 20,
    },
    premessSeen: {
        fontSize: 13,
        color: '#000',
        paddingLeft: 20,
        lineHeight: 30,
        fontWeight: 'bold',
        // paddingVertical: 20,
    },
    img: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

const Chatitems = ({navigation,users,lastMess,roomIndex,room_id}) => {
    const myid = useSelector(state=>state.login.user.id);
    const friend = users.find(item=>item.id !== myid);   
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('Message',{ room: room_id, roomIndex: roomIndex })} style={styles.container}>
            <View style={styles.ava}>
                <Image style={styles.img} source={require('./ava.png')}/>
            </View>
            <View style={styles.NandM}>
            <Text style={styles.chatname}>{friend.display_name}</Text>

                {
                    lastMess.user_id === myid ? (<Text numberOfLines={1} style={  styles.premess }>{ 'you: ' + (lastMess.type != 'text' ? `sent a ${lastMess.type}` : lastMess.content) }</Text>)
                    : (<Text numberOfLines={1} style={ lastMess.read_at === null ? styles.premessSeen : styles.premess}>{ lastMess.type != 'text' ? `sent you a ${lastMess.type}` : lastMess.content }</Text>)
                }
                
            </View>
        </TouchableOpacity>
    );
};

export default Chatitems;
