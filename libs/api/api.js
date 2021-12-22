import axios from 'axios'
import Echo from 'laravel-echo';
import SocketIo from 'socket.io-client'
import * as Keychain from 'react-native-keychain';

export const echo = new Echo({
    host: 'http://10.0.2.2:6001',
    broadcaster: 'socket.io',
    client: SocketIo
    
}); 



export default axios.create({
    baseURL:`http://10.0.2.2:8000/api`,
    headers:{
        
    }
});
export const getConfig = (skid) => {
    // const tk = await Keychain.getInternetCredentials('token');
    return {
        headers:{
            // Authorization: 'Bearer '+ tk.password,
            "X-Socket-Id": skid,
        }
    }
}