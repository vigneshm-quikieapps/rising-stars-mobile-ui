import axios from 'axios'
import { mobile_url, api_url, heroku_url } from '../../Constant/config'

export function fetchPostCode(payload){
    return fetch(`https://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/address/UK/${payload}?format=json&lines=2`,{
        method: 'GET',
    })
    .then(response => response.json())
    .catch(error =>{throw error})
}

export function fetchLogin(payload) {
    return fetch(`${mobile_url}/sign-in`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "mobileNo": `+91${payload.mobileNumber}`,
            "password": payload.password
        })
    })
        .then(response => response.json())
        .catch(error => { throw error })
}


export function fetchclubName() {
    return fetch(`${heroku_url}/businesses`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(error => { throw error })
}

export function fetchclassName(id) {

    return fetch(`${heroku_url}/businesses/${id}/classes`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(error => { throw error })
}

export function fetchSessionList(id) {

    return fetch(`${heroku_url}/classes/614b0929c265630cd54594af/sessions`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(error => { throw error })
}