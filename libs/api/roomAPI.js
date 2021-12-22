import API, { getConfig } from './api'

export const getRoom = async (id) => {
    const res = await API.get('/user/rooms/'+id);
    return res.data;
}
export const createRoom = async (data) => {
    const res = await API.post('/room/create',data);
    return res;
}
export const readmess = async (room_id) => {
    const res = API.get('/room/rm/'+room_id);
    return res;
}

