import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Mybutton from '../components/button/Mybutton';
import local from '../jsondata/local.json'
import InputStyles from '../styles/input.styles'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
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
    crr.code.replace('\"','');
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

const Findchat = ({navigation}) => {
    const [ageFrom,setFrom] = useState(1970);
    const [ageTo,setTo] = useState(2020);
    const [sex,setSex] = useState(0);
    const [lc,setLc] = useState('SG');
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{paddingVertical: 50}} style={styles.main}>
                <View style={styles.form100}>
                    <View style={InputStyles.container}>
                        <Text style={InputStyles.label}>từ năm</Text>
                        <Picker selectedValue={ageFrom} onValueChange={(vl)=>setFrom(vl)} style={InputStyles.picker}>
                            {data.map((item,index)=>{
                                return <Picker.Item key={index} label={item.label} value={item.value}/>
                            })}
                        </Picker>
                    </View>
                    <View style={InputStyles.container}>
                        <Text style={InputStyles.label}>đến năm</Text>
                        <Picker selectedValue={ageTo} onValueChange={(vl)=>setTo(vl)} style={InputStyles.picker}>
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
                <Mybutton myfunc={()=>navigation.navigate('Findlist',{
                    ageFrom: ageFrom,
                    ageTo: ageTo,
                    sex: sex,
                    lc: lc,
                })} lb='find' cl="#fff" bg="#33ADDE" morestyle={{marginTop: 50}}/>
            </ScrollView>
        </View>
    );
};
export default Findchat
