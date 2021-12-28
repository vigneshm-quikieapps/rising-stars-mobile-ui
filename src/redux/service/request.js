import {Country_Code} from '../../constants';
import {mobile_url, api_url, heroku_url} from '../../constants/config';

// --------------------------------------------------------Auth
export function fetchMobileOTP(payload) {
  console.log('inside fetch');
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
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log('Fetch Postcode Failed');
      throw error;
    });
}

export function fetchRegister(payload) {
  return fetch(`${heroku_url}/sign-up`, {
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
    .catch(error => {
      throw error;
    });
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

export function fetchclassName(data) {
  console.log('im here inside classes fetch');
  return fetch(`${heroku_url}/businesses/${data.businessid}/classes`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
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
//enroll to class
export function regularEnrollment(payload) {
  console.log('inside regular enrollment');
  console.log('DATA: ', payload.data);
  return fetch(`${heroku_url}/enrolments`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify(payload.data),
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

// --------------------------------------------------------Home

export function fetchMemberData(token) {
  return fetch(`${heroku_url}/members/of-a-logged-in-parent?limit=50`, {
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

export function fetchClasses(token) {
  return fetch(`${heroku_url}/classes/of-logged-in-user`, {
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

export function addChild(payload) {
  return fetch(`${heroku_url}/members`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify(payload.data),
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

export function classTransfer(payload) {
  return fetch(`${heroku_url}/enrolments/transfer`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify(payload.data),
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

export function dropClass(payload) {
  console.log('Payload: ', payload);
  return fetch(`${heroku_url}/enrolments/${payload.enrollmentId}/withdraw`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.token}`,
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}
