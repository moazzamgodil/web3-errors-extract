import connectWeb3 from "./connectweb3.js";
import getErrorMessage from "./getErrorMessage.js";
import getErrOfTx from "./getErrOfTx.js";
import setAbi from "./setAbi.js";
export class Web3errors {
    constructor(rpc, abi) {
        this.state = {
            savedABIs: [],
            methodIDs: {}
        };
        this.getErrorMessage = (err) => getErrorMessage(err, this.web3, this.state);
        this.getErrOfTx = (txHash) => getErrOfTx(txHash, this.web3);
        if (!rpc)
            throw new Error("RPC URL or Provider is required");
        this.web3 = connectWeb3(rpc);
        if (abi && (abi === null || abi === void 0 ? void 0 : abi.length) > 0) {
            this.state.methodIDs = setAbi(abi, this.web3);
            this.state.savedABIs = this.state.savedABIs.concat(abi);
        }
    }
}
//# sourceMappingURL=web3errors.js.map