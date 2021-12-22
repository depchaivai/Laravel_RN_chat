import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import WaitItem from '../components/ChatItem/WaitItem'
import { findchatnow, getSent } from '../libs/api/findAPI'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#fff'
    },

})
const Findlist = ({route,navigation}) => {
    const user = useSelector(state=>state.login.user);
    const muser = { 
        id: user.id,
        ageFrom: JSON.stringify(route.params.ageFrom),
        ageTo: JSON.stringify(route.params.ageTo),
        sex: JSON.stringify(route.params.sex),
        lc: JSON.stringify(route.params.lc).replace(/\"/g,'')
    }
    const [list,setList] = useState([]);
    const [sching,setSC] = useState(true);
    const [sentID,setSentID] = useState([]);
    const findlist = useQuery('findlist', ()=>findchatnow(muser),{onSuccess: ()=>{
        setSC(false);
    }});
    const sentlist = useQuery('sentlist', ()=>getSent(user.id),{onSuccess: (data)=>{
        let myList = data.map(i=>(i.id));
        setSentID([...myList]);
    }});
    if(sching){
        return <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
            <Text>searching...</Text>
        </View>
    }
    return (
        <ScrollView style={styles.container}>
            {
                (findlist.isSuccess) && findlist.data.map((item,index)=>{
                    if (sentID.includes(item.id)) {
                        return <WaitItem find={true} sent={true} myID={user.id} key={index} user={item}/>
                    }
                    return <WaitItem find={true} myID={user.id} sent={false} key={index} user={item}/>
                })
            }
        </ScrollView>
    )
}

export default Findlist
