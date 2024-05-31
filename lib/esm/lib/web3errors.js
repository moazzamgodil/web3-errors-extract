import connectWeb3 from "./connectweb3";
import getErrorMessage from "./getErrorMessage";
import getErrOfTx from "./getErrOfTx";
import setAbi from "./setAbi";
export class web3errors {
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
        if (abi && abi?.length > 0) {
            this.state.methodIDs = setAbi(abi, this.web3);
            this.state.savedABIs = this.state.savedABIs.concat(abi);
        }
    }
}
//# sourceMappingURL=web3errors.js.map