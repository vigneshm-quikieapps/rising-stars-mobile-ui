import axios from 'axios'
import {mobile_url,api_url,heroku_url} from '../../Constant/config'


function AddChild(){
    return axios.post(`${heroku_url}${endpoint}`,{
       
    }).then
}
