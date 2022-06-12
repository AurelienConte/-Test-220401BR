const {TransactionManager} = require("./TransactionManager");
const axios = require("axios");
const {baseUrl} = require("../config/Banki");

class AccountManager {

  accessToken = null;
  refreshToken = null;

  constructor(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  async getAccounts(onNextPage, page = '/accounts?page=1')
  {
    const response = await axios.get(`${baseUrl}${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    if (response.status < 200 || response.status >= 400) {
      console.error(`Bankin API returned bad response : ${response.status}`);
      return false;
    }

    if (response.data?.account)
      await onNextPage(response.data?.account);

    const nextPage = response.data?.link?.next;
    const selfPage = response.data?.link?.self;

    if (nextPage && (selfPage !== nextPage)) {
      console.log(`Getting next account page : ${nextPage}`)
      await this.getAccounts(onNextPage, response.data?.link?.next)
    }
  }
}

module.exports = { AccountManager }