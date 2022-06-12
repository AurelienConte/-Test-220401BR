# -Test-220401BR

Result of bankin test

## Run

- npm install (or yarn install)
- npm run start (or yarn run start)
- A 'output.json' will be generated with the list of accounts.
- Also they will be printed in console.log

## Envs

If you want, you can also create a '.env' file and store secret.

## Goal

- Authenticate to the https://github.com/wbaridon/challenge-run-2022.
- Retrieve the transaction list.
- Print it as format : 

``
[{
    "acc_number": "12345678",
    "amount": "123",
    "transactions": [
        {
        "label": "ZERTY",
        "amount": "-334",
        "currency": "EUR"
        }
    ],
    ...
    },
        {
        "acc_number": "12345688",
        "amount": "543",
        "transactions": [
            {
            "label": "label 1",
            "amount": "30",
            "currency": "EUR"
            }
         ],
    ...
}]

``