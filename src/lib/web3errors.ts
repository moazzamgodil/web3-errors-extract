import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";
import connectWeb3 from "./connectweb3";
import getErrorMessage from "./getErrorMessage";
import getErrOfTx from "./getErrOfTx";
import setAbi from "./setAbi";

export class web3errors {
    web3: Web3<RegisteredSubscription>;
    state: {
        savedABIs: Array<any>;
        methodIDs: {};
    } = {
        savedABIs: [],
        methodIDs: {}
    };

    constructor(rpc: string, abi: Array<any>) {
        if(!rpc) throw new Error("RPC URL is required");
        if(!abi || abi?.length == 0) throw new Error("ABI is required");
        this.web3 = connectWeb3(rpc);
        this.state.methodIDs = setAbi(abi, this.web3);
        this.state.savedABIs = this.state.savedABIs.concat(abi);
    }

    getErrorMessage = (err: object | string) => getErrorMessage(err, this.web3, this.state);
    getErrOfTx = (txHash: string) => getErrOfTx(txHash, this.web3);
}