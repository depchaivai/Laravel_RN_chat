/* eslint-disable prettier/prettier */
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Mybutton from '../components/button/Mybutton';
import local from '../jsondata/local.json';
import { updateIf, userProfile } from '../libs/api/authAPI';
import InputStyles from '../styles/input.styles'
import * as Keychain from 'react-native-keychain';
import { toLogout } from '../reduxif/authSlice';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    main: {
        flex: 1,
        paddingHorizontal: 40,
    },
    form100: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    
});

var data = [];
for (let index = 0; index < 60; index++) {
    data.push({ label : (index + 1970).toString(), value: index + 1970});
}

const lct = local.reduce((arr,crr)=>{
    arr.push({label: crr.name, value: crr.code});
    return arr;
},[]);

const sexdata = [
    {
        label: 'nam',
        value: 0,
    },
    {
        label: 'nữ',
        value: 1,
    },
    {
        label: 'khác',
        value: 2,
    }
]

const findnew = ({navigation}) => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.login.user)
    const [birth,setBirth] = useState(user.birth);
    const [displayName,setDN] = useState(user.display_name);
    const [sex,setSex] = useState(user.sex);
    const [lc,setLc] = useState(user.location);

    // const {error} = useQuery('fetchuser', ()=>userProfile(),{onSuccess: (data)=>{
    //     setBirth(data.birth);
    //     setDN(data.display_name);
    //     setSex(data.sex);
    //     setLc(data.location);
    // }})

    const udif = async () => {
        const newif = {
            id: user.id,
            birth: birth,
            display_name: displayName,
            sex: sex,
            location: lc,
        }
        try {
            const userif = await updateIf(newif);
            alert('updated');
        } catch (error) {
            alert(error.message)
        }
    }
    const logout = async () => {
        await Keychain.resetGenericPassword();
        dispatch(toLogout());
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{paddingVertical: 50,}} style={styles.main}>
            <View style={styles.form100}>
                    <View style={InputStyles.container}>
                        <Text style={InputStyles.label}>tên ẩn danh</Text>
                        <TextInput value={displayName} style={InputStyles.input} onChangeText={Text=>setDN(Text)}/>
                        <Text style={InputStyles.label}>năm sinh</Text>
                        <Picker selectedValue={birth} onValueChange={(vl)=>setBirth(vl)} style={InputStyles.picker}>
                            {data.map((item,index)=>{
                                return <Picker.Item key={index} label={item.label} value={item.value}/>
                            })}
                        </Picker>
                    </View>
                    
                </View>
                <Text style={InputStyles.label}>giới tính</Text>
                <Picker selectedValue={sex} onValueChange={(vl)=>setSex(vl)} style={InputStyles.picker}>
                    {sexdata.map((item,index)=>{
                        return <Picker.Item key={index} label={item.label} value={item.value}/>
                    })}
                </Picker>
                <Text style={InputStyles.label}>khu vực</Text>
                <Picker selectedValue={lc} onValueChange={(vl)=>setLc(vl)} style={InputStyles.picker}>
                    {lct.map((item,index)=>{
                        return <Picker.Item key={index} label={item.label} value={item.value}/>
                    })}
                </Picker>
                <Mybutton myfunc={()=>udif()} lb='update' cl="#fff" bg="#33ADDE" morestyle={{marginTop: 50}}/>
                <Mybutton myfunc={()=>logout()} lb='logout' cl="#fff" bg="tomato" morestyle={{marginTop: 20}}/>
            </ScrollView>
        </View>
    );
};

export default findnew;
