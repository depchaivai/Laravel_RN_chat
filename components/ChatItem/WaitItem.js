import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import { sendrequest } from '../../libs/api/findAPI';
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

const WaitItem = ({find,user,sent,myID,messrq}) => {
    console.log(sent);
    const [stt,setStt] = useState('idle');
    const sendrq = async () => {
        const rq = {
            from_id: myID,
            to_id: user.id,
        }
        console.log(rq);
        try {
            if (stt !== 'success') {
                await sendrequest(rq);
                setStt('success');
            }
            if (stt === 'success'){
                showConfirmDialog();
            }
            
        } catch (error) {
            console.log(error.message);
            setStt('error');
        }
    }
    const showConfirmDialog = () => {
        return Alert.alert(
          "Are your sure?",
          "Are you sure you want to remove this beautiful box?",
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: () => {
                setStt('idle');
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
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        if (sent) {
            setStt('success');
        }
    }, [sent]);
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.imgcontain}>
                <Image style={styles.img} source={require('./ava.png')}/>
            </View>
            <View style={styles.wtext}>
                <Text style={styles.wname}>{user.display_name}</Text>
                <View style={styles.messbox}>
                    <Text style={styles.wmess}>{user.location}</Text>
                    { messrq &&(<Text style={styles.wmess}>{messrq}</Text>) }
                    <Text style={styles.wmess}>{user.birth}</Text>
                </View>
            </View>
            <View style={styles.btncontain}>
                <TouchableOpacity onPress={()=>sendrq()} style={styles.btn}>
                    <Icon size={25} color="teal" name={ stt === 'idle' ? "ios-send" : (stt === 'success' ? 'close-circle' : 'ios-alert-circle')}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default WaitItem
