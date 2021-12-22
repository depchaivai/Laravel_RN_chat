import API, { getConfig } from './api'

export const registering = async (user) => {
    const res = await API.post('/auth/register',user);
    return res.data;
}
export const signing = async (user) => {
    const res = await API.post('/auth/login',user);
    return res.data;
}
export const updateIf = async (userif) => {
    const res = await API.post('/user/updateif',userif);
    return res;
}
export const userProfile = async () => {
    const cf = await getConfig();
    const res = await API.get('/auth/user-profile',cf);
    return res.data;
}