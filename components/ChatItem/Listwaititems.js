import React from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { createRoom } from '../../libs/api/roomAPI';

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    imgcontain:{
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden',
    },
    img: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    btncontain:{
        width: 40,
        height: 70,
    },
    btn:{
        width: 40,
        height: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wtext:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: 70,
        flex: 1
    },
    wname: {
        lineHeight: 35,
        height: 35,
        width: '100%',
        paddingHorizontal: 30,
        fontWeight: 'bold',  
    },
    messbox: {
        height: 35,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    wmess: {
        lineHeight: 35,
        height: 35,
        minWidth: 50,
        paddingHorizontal: 10,  
    },
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      box: {
        width: 300,
        height: 300,
        backgroundColor: "red",
        marginBottom: 30,
      },
      text: {
        fontSize: 30,
      },

})

const Listwaititems = ({rmv,user,messrq,myID,wlID}) => {
    const showConfirmDialog = () => {
        return Alert.alert(
          "Are your sure?",
          "Are you sure you want to remove this beautiful box?",
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: () => {
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
      };
    const acceptRQ = async () => {
        const wldata = {
            id: wlID,
            from_id: user.id,
            to_id: myID,
        }
        try {
            await createRoom(wldata);
            rmv();
        } catch (error) {
            console.log(error.message);
        }
    }
  
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.imgcontain}>
                <Image style={styles.img} source={require('./ava.png')}/>
            </View>
            <View style={styles.wtext}>
                <Text style={styles.wname}>{user.display_name}</Text>
                <View style={styles.messbox}>
                    <Text style={styles.wmess}>{user.location}</Text>
                    <Text style={styles.wmess}>{messrq}</Text>
                    <Text style={styles.wmess}>{user.birth}</Text>
                </View>
            </View>
            <View style={styles.btncontain}>
                
                <TouchableOpacity style={styles.btn}>
                    <Icon size={25} onPress={()=>acceptRQ()} color="teal" name="ios-chatbox"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Icon size={25} color="tomato" name="ios-radio-button-on"/>
                </TouchableOpacity>
             
                
            </View>
        </TouchableOpacity>
    )
}

export default Listwaititems
