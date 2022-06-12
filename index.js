require('dotenv').config();

const {AuthManager} = require("./lib/AuthManager");
const {AccountManager} = require("./lib/AccountManager");
const {TransactionManager} = require("./lib/TransactionManager");

const fs = require('fs');

(async () => {
  const authManager = new AuthManager();

  await authManager.login();
  await authManager.getAccessToken();

  const accountManager = new AccountManager(authManager.accessToken, authManager.refreshToken);
  const transactionManager = new TransactionManager(authManager.accessToken, authManager.refreshToken);

  const formattedAccountsAndTx = [];


  //Why an event approach on fetching list ?
  //Because when we got a lot of data, we need to manage carefully the memory of the app
  await accountManager.getAccounts(async (accounts) => {

    for (const account of accounts) {

      if (!account?.acc_number)
      {
        console.warn(`accNumber not available on account : ${JSON.stringify(account)}`);
        continue;
      }

      await transactionManager.getTransactions(account.acc_number, async (txs) => {

        const tmpFormattedAccountAndTX = {
          acc_number: account?.acc_number,
          amount: account?.amount,
          transactions: []
        };

        for (const tx of txs) {
          tmpFormattedAccountAndTX.transactions.push({
            label: tx?.label,
            amount: tx?.amount,
            currency: tx?.currency
          })
        }

        formattedAccountsAndTx.push(tmpFormattedAccountAndTX);
      });
    }

  });

  //Write the account list into file
  await fs.writeFileSync('output.json', JSON.stringify(formattedAccountsAndTx));

  console.log(formattedAccountsAndTx);
})();