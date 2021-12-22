/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        backgroundColor: '#242424',
    },
    backbtn: {
        width: 60,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatname: {
        height: '100%',
        flex: 1,
        lineHeight: 60,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
const TopMes = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backbtn}>
                <Icon name="arrow-back-ios" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.chatname}>Loankute</Text>
            <TouchableOpacity style={styles.backbtn}>
                <Icon name="settings" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default TopMes;
