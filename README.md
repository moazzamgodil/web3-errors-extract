# Web3 Errors Extract

[![npm package][npm-img]][npm-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
![ES Version][es-version]
![Node Version][node-version]

[npm-img]: https://img.shields.io/npm/v/web3-errors-extract/latest
[npm-url]: https://www.npmjs.com/package/web3-errors-extract
[downloads-img]: https://img.shields.io/npm/dt/web3-errors-extract
[downloads-url]: https://www.npmtrends.com/web3-errors-extract
[issues-img]: https://img.shields.io/github/issues/moazzamgodil/web3-errors-extract
[issues-url]: https://github.com/moazzamgodil/web3-errors-extract/issues
[es-version]: https://img.shields.io/badge/ES-2020-yellow
[node-version]: https://img.shields.io/badge/node-14.x-green

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

```ts
const { Web3errors } = require("web3-errors-extract");

OR

import { Web3errors } from "web3-errors-extract";
```

```ts
const ABI1 = [{
    "type":"function",
    "name":"foo",
    "inputs": [{"name":"a","type":"uint256"}],
    "outputs": [{"name":"b","type":"address"}]
},{
    "type":"event",
    "name":"Event",
    "inputs": [{"name":"a","type":"uint256","indexed":true},{"name":"b","type":"bytes32","indexed":false}],
}]

const ABI2 = [{
    "type":"function",
    "name":"foo",
    "inputs": [{"name":"a","type":"uint256"}],
    "outputs": [{"name":"b","type":"address"}]
},{
    "type":"event",
    "name":"Event",
    "inputs": [{"name":"a","type":"uint256","indexed":true},{"name":"b","type":"bytes32","indexed":false}],
}]

const err = new Web3errors("YOUR RPC URL OR PROVIDER", [ABI1, ABI2] /* OPTIONAL ARRAY OF ABIs */);
```

```ts
/*
 * Get an error message for a specific tx hash
 */
err.getErrOfTx("0x1234......fff").then(console.log).catch(console.error);
```

```ts
/*
 * Get an error message by providing an exception error object of any blockchain (send or call) tx you received in return
 */
err.getErrorMessage(EXCEPTION ERROR OBJECT).then(console.log).catch(console.error);
```