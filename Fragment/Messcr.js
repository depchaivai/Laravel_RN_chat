/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { FlatList, Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Chatinput from '../components/Bottom/Chatinput';
import { echo } from '../libs/api/api';
import { upfile } from '../libs/api/fileAPI';
import { sendmessage } from '../libs/api/messAPI';
import { readmess } from '../libs/api/roomAPI';
import { seenMess, updateMes } from '../reduxif/chatSlice';

import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
  } from 'react-native-webrtc';
const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
const pc = new RTCPeerConnection(configuration);
Sound.setCategory('Playback');

const options = {
    title: 'Video Picker', 
    mediaType: 'mixed', 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatarea: {
        display: 'flex',
        // height: '100%',
        // flex:4,
        width: '100%',
        padding: 20,
        transform: [{ scaleY: -1 }],
        // flexDirection: 'column-reverse',
    },
    cboxleft: {
        fontSize: 16,
        backgroundColor: '#E2E2E2',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: '#000',
        maxWidth: '70%',
        alignSelf: 'flex-start',
        marginBottom: 10,
        transform: [{ scaleY: -1 }]
    },
    cboxright: {
        fontSize: 16,
        backgroundColor: 'grey',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: '#fff',
        maxWidth: '70%',
        alignSelf: 'flex-end',
        marginBottom: 10,
        transform: [{ scaleY: -1 }]
    },
    leftsoudn: {
        transform: [{ scaleY: -1 }],
        // alignSelf: 'flex-end',
        alignSelf: 'flex-start',

    },
    rightsound: {
        alignSelf: 'flex-end',
        transform: [{ scaleY: -1 }],

    },
    halfPop: {
        flex: 2,
        backgroundColor: 'tomato',
    },
    img: {
        transform: [{ scaleY: -1 }],
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'cover'
    },
    leftImg: {
        display: 'flex',
        maxWidth: 100,
        maxHeight: 100,
        alignSelf: 'flex-start',
        borderRadius: 15,
        overflow: 'hidden'

    },
    rightImg: {
        marginVertical: 10,
        display: 'flex',
        maxWidth: 100,
        maxHeight: 100,
        alignSelf: 'flex-end',
        borderRadius: 15,
        overflow: 'hidden'
    },
});

// Assuming Pusher

const radioRecoderConfig = {
    SampleRate: 22050,
    Channels: 1,
    AudioQuality: "Low",
    AudioEncoding: "aac",
    IncludeBase64: true
}

const Messcr = ({navigation,route}) => {
    const { room  } = route.params;
    const mess = useSelector(({chat})=>chat.room.find((item)=>item.id == room).message);
    const roomIndex = useSelector(({chat})=>chat.room.findIndex(item=>item.id == room));
    // const { room,roomIndex,roomIdd} = route.params;
    const user = useSelector(state=>state.login.user);
    // const [openPopup,setOpen] = useState(false);
    // const mess = useSelector(state=>state.chat.room[roomIndex].message)
    const dispatch = useDispatch();

    
    const sendmess = async (val,type) => {
        const newmess = {
            room_id: room,
            content: val,
            user_id: user.id,
            user_name: user.display_name,
            type: type,
        }
        dispatch(updateMes({index: roomIndex, ms: newmess}));
        try {
            await sendmessage(newmess,echo.socketId());
        } catch (error) {
            throw new Error('send failed');
        }
    };
    const renderItem = ({item}) => {
        if(item.type == 'sound'){
            return <TouchableOpacity onPress={()=>startMusic(item.content)} style={item.user_id === user.id ? styles.rightsound : styles.leftsoudn}>
                    <Icon size={40} color="deepskyblue" name = "ios-musical-notes"/>
            </TouchableOpacity>
        }
        if(item.type == 'image'){
            return <View style={item.user_id === user.id ? styles.rightImg : styles.leftImg}>
                        <Image
                            style={styles.img}
                            source={{
                                uri: item.content,
                                
                            }}
                        />  
            </View>
                    
        }
        if (item.type == 'video') {
            return <TouchableOpacity style={item.user_id === user.id ? styles.rightsound : styles.leftsoudn}>
            <Icon name='play' color='dodgerblue' size={70}/>
        </TouchableOpacity>
        }
        return <Text style={ item.user_id === user.id ? styles.cboxright : styles.cboxleft}>{item.content}</Text>;
    }
    useEffect(() => {
        if (mess[0]?.read_at === null && mess[0]?.user_id !== user.id) {
            readmess(room);
            dispatch(seenMess({ri:roomIndex}));
        }
    }, [room])
    const recoddingRadio = async () => {
        // AudioRecorder.requestAuthorization();
        let audioPath = await AudioUtils.DocumentDirectoryPath + `/${room}.aac`;
        AudioRecorder.prepareRecordingAtPath(audioPath, radioRecoderConfig);
        await AudioRecorder.startRecording();

    }
    const stopRecoding = async () => {
        await AudioRecorder.stopRecording();
        AudioRecorder.onFinished = async (data) => {

            console.log(data);

            const fd = new FormData();
            await fd.append('myfile', {
                uri: data.audioFileURL,
                name: 'test.aac',
                type: 'audio/aac',
              });

            try {
                const rcurl = await upfile(fd);
                
                if(rcurl.fileURL){
                    sendmess(rcurl.fileURL,'sound');
                }
            } catch (error) {
                console.log(error.message);
            }


            // const newMess = {
            //     room_id: room,
            //     content: data.base64,
            //     user_id: user.id,
            //     user_name: user.display_name,
            //     type: 'sound',
            // }
            // dispatch(updateMes({index: roomIndex, ms: newMess}));

            // let ding = new Sound(data.audioFileURL, Sound.MAIN_BUNDLE, (error) => {
            //     if (error) {
            //       console.log('failed to load the sound', error);
            //       return;
            //     }
            //     // when loaded successfully
            //     console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
            //     ding.setVolume(1);
            //     ding.play((success) => {
            //         if (success) {
            //           console.log('successfully finished playing');
            //         } else {
            //           console.log('playback failed due to audio decoding errors');
            //         }
            //       });

            // });
          
           }   
    }
    const startMusic = (path) => {
        console.log(path);
            let ding = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                  console.log('failed to load the sound', path);
                  return;
                }
                // when loaded successfully
                console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
                ding.setVolume(1);
                ding.play((success) => {
                    if (success) {
                      console.log('successfully finished playing');
                    } else {
                      console.log('playback failed due to audio decoding errors');
                    }
                  });
                  
            });
        
                // Note: If you want to play a sound after stopping and rewinding it,
                // it is important to call play() in a callback.
     
    }
    const closePopup = () => {

    }
    const openCam = async () => {
        const pm =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (!pm) {
                const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                  title: "Cool Photo App Camera Permission",
                  message:
                    "Cool Photo App needs access to your camera " +
                    "so you can take awesome pictures.",
                  buttonNeutral: "Ask Me Later",
                  buttonNegative: "Cancel",
                  buttonPositive: "OK"
                }
              );
              if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                return
              }
        }
        const result = await launchCamera();
        if (result.assets) {
            sendMessWithFile(result.assets[0]);
        }

    }
    const sendMessWithFile = async (file) => {
        const fd = new FormData();
        await fd.append('myfile', {
            uri: file.uri,
            type: file.type,
            name: file.fileName,
        });
        try {
            
            const rcurl = await upfile(fd);
            console.log(rcurl);
            if(rcurl.fileURL){
                let messType = file.type == 'video/mp4' ? 'video' : 'image';
                sendmess(rcurl.fileURL,messType);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const openLibs = async () => {
        const result = await launchImageLibrary(options);
        console.log(result);
        if (result.assets) {
            sendMessWithFile(result.assets[0]);
        }
    }
    return (
        <TouchableWithoutFeedback
        // onPress= {()=>setOpen(false)}
        >
        <View style={styles.container}>

                <FlatList
                    style = {styles.chatarea}
                    data={mess}
                    renderItem={renderItem}
                    keyExtractor={(item,index) => index}
                />
            
            <Chatinput openCam={()=>{openCam()}} openPickup={()=>openLibs()} stopRecoding = {()=>stopRecoding() } micPress = {()=>recoddingRadio()} userId={user.id} room={room} sendmess={sendmess}/>
            {/* {openPopup && (
                <BottomPopup style={styles.halfPop}/>
            )} */}
        </View>
        </TouchableWithoutFeedback>
    );
};

export default Messcr;
