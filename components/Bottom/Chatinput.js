/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
    },
    btnContainer: {
        width: 100,
        alignItems: "flex-start"
    },
    sendbtn: {
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputbox: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingLeft: 20,
        // paddingVertical: 5,
    },
    inputmes: {
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        // backgroundColor: '#CCCCCC',
    },
});

const Chatinput = ({sendmess,userId,room,micPress,stopRecoding,openPickup,closePickup,openCam}) => {
    const [crr,setCurr] = useState('');
    const [Aindex, setAindex] = useState(0);
    const [press,setPress] = useState('idle');
    const sentM = (e) => {
        sendmess(crr,'text');
        setCurr('');
        e.target.clear();
    };
   const recording = () => {
       if (press === 'mic') {
        setPress('idle');
        stopRecoding();
       }
       if (press !== 'mic') {
        setPress('mic');
        micPress();
       }
    
   }
   const pickIMG = () => {
       setPress('img');
    openPickup();
   }
   const closeIMG = () => {
       setPress('idle');
       closePickup();
   }
   const pickCam = () => {
    setPress('cams');
    openCam();
}
  
    return (
        <View style={styles.container}>
            {
                press == 'typing' ? <>
                    <TouchableOpacity onPressIn={()=>setPress('idle')} style={styles.sendbtn}>
                        <Icon size={25} color="#242424" name = "arrow-forward-ios"/>
                    </TouchableOpacity>
                </> : <>
                    <TouchableOpacity onPress={()=>recording()} style={styles.sendbtn}>
                        <Icon size={30} color={ press == "mic" ? "tomato" : "#242424"} name = "mic"/>
                    </TouchableOpacity>
                    <TouchableOpacity onBlur={()=>setPress('idle')} onPress={()=>pickIMG()} style={styles.sendbtn}>
                        <Icon size={30} color={ press == "img" ? "deepskyblue" : "#242424"} name="image"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>pickCam()} style={styles.sendbtn}>
                        <Icon size={30} color={ press == "cam" ? "deepskyblue" : "#242424"} name="camera-alt"/>
                    </TouchableOpacity>
                </>
            }
                
            
            <View style={styles.inputbox}>
                <TextInput style={styles.inputmes} onBlur={()=>setPress('idle')} onFocus={()=>setPress('typing')} onSubmitEditing={(e)=>sentM(e)} onChangeText={text => setCurr(text)}/>
            </View>
            
        </View>
    );
};

export default Chatinput;
