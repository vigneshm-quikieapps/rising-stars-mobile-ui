import axios from 'axios'
import { mobile_url, api_url, heroku_url } from '../../Constant/config'

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