/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#242424',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        width: '100%',
    },
    items: {
        width: '50%',
        height: 50,
        lineHeight: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
});

const Nav = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.items}>
                <Text>
                    <Icon name="chat" size={35} color="#fff"/>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Findnew')} style={styles.items}>
                <Text>
                    <Icon size={35} name="person-add" color="#fff" />
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Nav;
