import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";
export declare class web3errors {
    web3: Web3<RegisteredSubscription>;
    constructor(rpc: string);
    getErrorMessage: (err: object | string) => Promise<string>;
    getErrOfTx: (txHash: string) => Promise<string>;
}
//# sourceMappingURL=web3errors.d.ts.map