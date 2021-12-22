import API, { getConfig } from './api'

export const upfile = async (file) => {
    const res = await API.post('/file',file);
    return res.data;
}