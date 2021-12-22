/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Mybutton = (props) => {
  const newstyle = {...props.morestyle,
    alignSelf: 'center',
    backgroundColor: props.bg || 'none',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
  return (
    <TouchableOpacity onPress={()=>props.myfunc()} style={newstyle}>
      <Text style={{color: props.cl || '#000'}}>{props.lb}</Text>
    </TouchableOpacity>
  );
};

export default Mybutton;
