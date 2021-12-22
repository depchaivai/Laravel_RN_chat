import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    }
})

const Videoitems = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Icon name='play' color='dodgerblue' size={70}/>
        </TouchableOpacity>
    )
}

export default Videoitems
