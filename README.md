# Web3 Errors Extract

![ES Version](https://img.shields.io/badge/ES-2020-yellow)
![Node Version](https://img.shields.io/badge/node-14.x-green)

Web3 Errors Extract is a TypeScript implementation of the [Ethereum JSON RPC API](https://eth.wiki/json-rpc/API) to get/extract EVM-based web3 transaction revert messages or any other errors.

## Installation

You can install the package using [NPM](https://www.npmjs.com/package/web3-errors-extract)

### Using NPM

```bash
npm install web3-errors-extract
```

### Using Yarn

```bash
yarn add web3-errors-extract
```

## Getting Started

-   :writing_hand: If you have questions [submit an issue](https://github.com/moazzamgodil/web3-errors-extract/issues/new/choose)

## Prerequisites

-   :gear: [NodeJS](https://nodejs.org/) (LTS/Fermium)
-   :toolbox: [Yarn](https://yarnpkg.com/)/[Lerna](https://lerna.js.org/)

## Usage

```
const { web3errors } = require("web3-errors-extract");

const err = new web3errors("YOUR RPC URL");

/*
 * Get an error message for a specific tx hash
 */
err.getErrOfTx("0x1234......fff").then(console.log).catch(console.error);


/*
 * Get an error message by providing an exception error object of any blockchain (send or call) tx you received in return
 */
err.getErrorMessage([EXCEPTION ERROR OBJECT]).then(console.log).catch(console.error);
```