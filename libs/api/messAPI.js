import API, { getConfig } from './api'

export const sendmessage = async (mes,skid) => {
    const cf = {
                headers:{
                "X-Socket-Id": skid,
            }
        }
    const res = await API.post('/message/sendmess',mes,cf);
    return res;
}
export const allmess = async (id) => {
    const res = await API.get('/message/'+id);
    return res.data;
}