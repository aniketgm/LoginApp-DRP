const rootUri = process.env.REACT_APP_SERVER_URL ?
  process.env.REACT_APP_SERVER_URL : 'http://127.0.0.1:8000';

export const userApis = {
  userSignup: {
    url: `${rootUri}/api/signup/`,
    method: 'POST',
  },
  userLogin: {
    url: `${rootUri}/api/login/`,
    method: 'POST',
  },
  userLogout: {
    url: `${rootUri}/api/logout/`,
    method: 'DELETE',
  },
  userInfo: {
    url: `${rootUri}/api/user/`,
    method: 'GET',
  }
}
