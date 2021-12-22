import API, { getConfig } from './api'

export const findchatnow = async (sdata) => {
    const res = await API.post('/user/findchat',sdata);
    return res.data;
}
export const sendrequest = async (dt) => {
    const res = await API.post('/waitlist/sendrq',dt);
    return res;
}
export const myWaitlist = async (id) => {
    const res = await API.get('/waitlist/'+id);
    return res.data;
}
export const getSent = async (id) => {
    const res = await API.get('/waitlist/sent/'+id);
    return res.data;
}