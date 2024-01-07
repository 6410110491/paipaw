import axios from "axios";
import Cookies from 'js-cookie'

const ax = axios.create({
    baseURL : '',
    withCredentials : false,
})



export default ax