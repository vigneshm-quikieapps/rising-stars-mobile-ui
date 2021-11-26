import {Country_Code} from '../../constants';
import {mobile_url, api_url, heroku_url} from '../../constants/config';

// --------------------------------------------------------Auth
export function fetchMobileOTP(payload) {
  return fetch(`${heroku_url}/get-otp/mobile-no`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobileNo: `${Country_Code}${payload}`,
    }),
  })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => {
      throw error;
    });
}

export function fetchPostCode(payload) {
  return fetch(
    `https://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/address/UK/${payload}?format=json&lines=2`,
    {
      method: 'GET',
    },
  )
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

export function fetchRegister(payload) {
  // console.log('fetch-------->', payload)
  return (
    fetch(`${heroku_url}/sign-up`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: payload.fullName,
        email: payload.email,
        mobileNo: `${Country_Code}${payload.contactNumber}`,
        password: payload.password,
        mobileNoOTP: payload.mobileNoOTP,
        postcode: payload.postCode,
        addressLine1: payload.addressLine1,
        addressLine2: payload.addressLine2,
        city: payload.cityTown,
        country: 'country',
      }),
    })
      .then(response => response.json())
      // .then(response => console.log(response))
      .catch(error => {
        throw error;
      })
  );
}

export function fetchLogin(payload) {
  return fetch(`${heroku_url}/sign-in`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobileNo: `${Country_Code}${payload.mobileNumber}`,
      password: payload.password,
    }),
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

// --------------------------------------------------------Enroll

export function fetchclubName() {
  return fetch(`${heroku_url}/businesses`, {
    method: 'GET',
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

export function fetchclassName(id) {
  return fetch(`${heroku_url}/businesses/${id}/classes`, {
    method: 'GET',
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

export function fetchSessionList(id) {
  return fetch(`${heroku_url}/classes/${id}/sessions`, {
    method: 'GET',
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

export function fetchClubFinanc(id) {
  return fetch(`${heroku_url}/businesses/${id}/finance`, {
    method: 'GET',
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

// --------------------------------------------------------Home

export function fetchMemberData(token) {
  return fetch(`${heroku_url}/members/of-a-logged-in-parent`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

export function fetchMemberClassData(id) {
  return fetch(`${heroku_url}/members/${id}/enrolments`, {
    method: 'GET',
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}
