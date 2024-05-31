"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3errors = void 0;
const connectweb3_1 = __importDefault(require("./connectweb3"));
const getErrorMessage_1 = __importDefault(require("./getErrorMessage"));
const getErrOfTx_1 = __importDefault(require("./getErrOfTx"));
const setAbi_1 = __importDefault(require("./setAbi"));
class web3errors {
    constructor(rpc, abi) {
        this.state = {
            savedABIs: [],
            methodIDs: {}
        };
        this.getErrorMessage = (err) => (0, getErrorMessage_1.default)(err, this.web3, this.state);
        this.getErrOfTx = (txHash) => (0, getErrOfTx_1.default)(txHash, this.web3);
        if (!rpc)
            throw new Error("RPC URL or Provider is required");
        this.web3 = (0, connectweb3_1.default)(rpc);
        if (abi && abi?.length > 0) {
            this.state.methodIDs = (0, setAbi_1.default)(abi, this.web3);
            this.state.savedABIs = this.state.savedABIs.concat(abi);
        }
    }
}
exports.web3errors = web3errors;
//# sourceMappingURL=web3errors.js.map