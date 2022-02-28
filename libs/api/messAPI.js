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
export const loadMore = async (roomId,offset,limit) => {
    const res =  await API.get(`/message/paging/${roomId}?offset=${offset}&limit=${limit}`);
    return res.data;
}