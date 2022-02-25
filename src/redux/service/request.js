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
      throw error;
    });
}

export function fetchUser(payload) {
  return fetch(`${heroku_url}/users/${payload.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${payload.token}`,
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      throw error;
    });
}

export function fetchProgress(payload) {
  return fetch(`${heroku_url}/members/${payload.id}/progress`, {
    method: 'GET',
    headers: {},
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

export function fetchCurrentUser(payload) {
  return fetch(`${heroku_url}/auth/user/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${payload.token}`,
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      throw error;
    });
}

export function updateUser(payload) {
  return fetch(`${heroku_url}/users/${payload.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify(payload.body),
  })
    .then(response => response.json())
    .catch(error => {
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
      isNewsletter: payload.isNewsLetter,
      country: 'United Kingdom',
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

export function fetchParticularBusiness(id) {
  console.log(id.id);
  return fetch(`${heroku_url}/businesses/${id.id}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .catch(error => {
      alert(error);
    });
}

//enroll to class
export function regularEnrollment(payload) {
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

export function fetchBillsOfMember(payload) {
  return fetch(`${heroku_url}/bills/of-a-member-in-a-business`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify(payload),
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
      throw error;
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
      throw error;
    });
}

export function dropClass(payload) {
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
      throw error;
    });
}

export function forgetPassword(payload) {
  return fetch(`${heroku_url}/account/password/forgot/using-mobile-no`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

export function resetPassword(payload) {
  return fetch(`${heroku_url}/account/password/reset/using-mobile-no`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}
export function fetchAttendanceOfMemberInSession(payload) {
  return fetch(`${heroku_url}/attendance/of-a-member-in-a-session`, {
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
      throw error;
    });
}

export function fetchActivityOfMemberInSession(payload) {
  return fetch(`${heroku_url}/members/${payload.id}/progress`, {
    method: 'GET',
    headers: {
      //Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify(payload.data),
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

export function fetchEvaluationById(payload) {
  return fetch(`${heroku_url}/evaluations/${payload.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${payload.token}`,
    },
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}
