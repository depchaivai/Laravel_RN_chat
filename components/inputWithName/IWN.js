/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from '../../styles/input.styles';



const IWN = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.lb}</Text>
            <TextInput style={styles.input}/>
        </View>
    );
};

export default IWN;
