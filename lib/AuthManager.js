const base64 = require('base-64');
const axios = require('axios');
const {user, password, clientId, clientSecret, baseUrl} = require("../config/Banki");

class AuthManager {

  refreshToken = null;
  accessToken = null;

  async login() {
    const response = await axios.post(`${baseUrl}/login`, {
        user: user,
        password: password
    },
      {
        headers: {
          'Authorization': `Basic ${base64.encode(clientId + ':' + clientSecret)}`,
          'Content-Type': 'application/json',
        }
      })

    if (response.status < 200 || response.status >= 400)
    {
      console.error(`Bankin API returned bad response : ${response.status}`);
      return false;
    }


    if (response?.data?.refresh_token) {
      this.refreshToken = response.data.refresh_token;
      console.log('Login OK');
      return true;
    } else {
      console.error(`Bankin API returned good status code without refresh_token`);
      return false;
    }
  }


  async getAccessToken() {

    if (!this.refreshToken) {
      console.error('Call login method before getting the access token');
      return false;
    }

    const response = await axios.post(`${baseUrl}/token`, `grant_type=refresh_token&refresh_token=${this.refreshToken}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.status < 200 || response.status >= 400)
    {
      console.error(`Bankin API returned bad response : ${response.status}`);
      return false;
    }

    if (response?.data?.access_token) {
      this.accessToken = response.data.access_token;
      console.log('Token OK');
      return true;
    } else {
      console.error(`Bankin API returned good status code without access_token`);
      return false;
    }
  }
}

module.exports = { AuthManager }