import Web3 from "web3";
import { RegisteredSubscription } from "web3-eth";
declare class Web3errors {
    web3: Web3<RegisteredSubscription>;
    state: {
        savedABIs: Array<any>;
        methodIDs: {};
    };
    constructor(rpc: string, abi?: Array<any>);
    getErrorMessage: (err: object | string) => Promise<string>;
    getErrOfTx: (txHash: string) => Promise<string>;
}
declare global {
    interface Window {
        Web3errors: typeof Web3errors;
    }
}
export { Web3errors };
//# sourceMappingURL=web3errors.d.ts.map