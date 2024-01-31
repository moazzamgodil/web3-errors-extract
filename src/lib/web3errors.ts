import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";
import connectWeb3 from "./connectweb3";
import getErrorMessage from "./getErrorMessage";
import getErrOfTx from "./getErrOfTx";

export class web3errors {
    web3: Web3<RegisteredSubscription>;

    constructor(rpc: string) {
        this.web3 = connectWeb3(rpc);
    }

    getErrorMessage = (err: object | string) => getErrorMessage(err, this.web3);
    getErrOfTx = (txHash: string) => getErrOfTx(txHash, this.web3);
}