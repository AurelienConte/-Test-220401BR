const axios = require("axios");
const {baseUrl} = require("../config/Banki");

class TransactionManager {

  accessToken = null;
  refreshToken = null;

  constructor(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  async getTransactions(accountNumber, onNextPage, page = `/accounts/${accountNumber}/transactions`)
  {
    const response = await axios.get(`${baseUrl}${page}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      }
    }).catch((error) => error);

    if (response.status < 200 || response.status >= 400) {
      console.error(`Bankin API returned bad response : ${response.status}`);
      return false;
    }

    if (response.data?.transactions)
      await onNextPage(response.data?.transactions || []);

    const nextPage = response.data?.link?.next;
    const selfPage = response.data?.link?.self;

    if (nextPage && (selfPage !== nextPage)) {
      console.log(`Getting next transaction page : ${nextPage}`)
      await this.getTransactions(accountNumber, onNextPage, response.data?.link?.next)
    }
  }
}

module.exports = { TransactionManager }