/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Mybutton from '../button/Mybutton';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  hd: {
    
    // flex: 1,
    flexDirection: 'row',
    
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'tomato'
  },
  add: {
    fontSize: 36,
  }
});

const Topapp = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate('Findnew')} style={styles.avatar}></TouchableOpacity>
        <TouchableOpacity ><Icon name='search' size={30}/></TouchableOpacity>
    </View>
  );
};

export default Topapp;
