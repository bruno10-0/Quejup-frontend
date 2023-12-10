import axios from "axios";

const instance= axios.create({
    baseURL: 'https://backend-quejup.onrender.com/api',
    withCredentials:true
})

export default instance