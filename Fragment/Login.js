/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { registering, signing } from '../libs/api/authAPI';
import * as Keychain from 'react-native-keychain';
import { useDispatch } from 'react-redux';
import { loginthunk, setLogin } from '../reduxif/authSlice';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#242424',
        marginBottom: 50,
        fontWeight: 'bold',
    },
    input: {
        paddingHorizontal: 20,
        height: 50,
        width: '70%',
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#E2E2E2',
    },
    btn: {
        marginTop: 20,
        paddingHorizontal: 20,
        minWidth: 70,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#33ADDE',
    },
    textbtn: {
        color: '#fff',
        fontSize: 18,
    },
    questions: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    Qbtn: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Qtext: {
        color: '#33ADDE',
    },
});

const Login = ({navigation}) => {
    const dispatch = useDispatch();
    const [signup,setSignup] = useState(false);
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [pass,setPass] = useState('');
    const [rpass,setRPass] = useState('');
    const Sgup = async () => {
        const user = {
            email: email,
            name: username,
            password: pass,
            password_confirmation: rpass
        }
        console.log(user);
        try {
            const info = await registering(user);
            alert(info.message);
        } catch (error) {
            alert(error.message);
        }
    };
    const Sgin = async () => {
        const dv_tk = await Keychain.getInternetCredentials('dv_token');
        const user = {
            name: username,
            password: pass,
            dv_token: dv_tk.password
        }
        // alert(user.password);

        try {
            const ffuser = await signing(user);
            if (ffuser.user) {
                await Keychain.setGenericPassword(user.name, user.password);
                dispatch(setLogin(ffuser.user));
                
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Foodfeed</Text>
            { signup &&<TextInput placeholder="email" onChangeText={Text=>setEmail(Text)} style={styles.input}/>}
            <TextInput placeholder="username" onChangeText={Text=>setUsername(Text)} style={styles.input}/>
            <TextInput placeholder="password" onChangeText={Text=>setPass(Text)} secureTextEntry={true} style={styles.input}/>
            { signup && <TextInput placeholder="retype password" onChangeText={Text=>setRPass(Text)} secureTextEntry={true} style={styles.input}/>}

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.textbtn} onPress={()=>{ signup ? Sgup() : Sgin() }}>{ signup ? 'Singup' : 'Signin'}</Text>
            </TouchableOpacity>
            <View style={styles.questions}>
                <TouchableOpacity style={styles.Qbtn}>
                    <Text style={styles.Qtext} onPress={()=>setSignup(!signup)}>{ signup ? 'Signin' : 'Signup'}</Text>
                </TouchableOpacity>
                { !signup && (
                    <TouchableOpacity style={styles.Qbtn}>
                        <Text style={styles.Qtext}>Forgot password?</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default Login;
