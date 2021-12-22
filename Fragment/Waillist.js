import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Listwaititems from '../components/ChatItem/Listwaititems';
import { myWaitlist } from '../libs/api/findAPI';
import { chatThunk } from '../reduxif/chatSlice';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingVertical: 20,
    },

})

const Waillist = () => {
    const user = useSelector(state=>state.login.user);
    const dispatch = useDispatch();
    const [wl,setWl] = useState([]);
    // const [loading,setLD] = useState(true);
    const { error } = useQuery('getWait', ()=>myWaitlist(user.id),{onSuccess: (x)=>{
        // setLD(false);
        setWl(x);
    }});
    const removeItem = (index) => {
        dispatch(chatThunk(user.id));
        let newArr = wl;
        wl.splice(index,1);
        setWl([...newArr]);
    }
    return (
        <ScrollView>
            {wl.map((item,index)=>{
                return <Listwaititems rmv={()=>removeItem(index)} wlID = {item.id} myID={user.id} key={index} user={item.sendr} messrq={item.message}/>
            })}
        </ScrollView>
    )
}

export default Waillist
