"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3errors = void 0;
const connectweb3_1 = __importDefault(require("./connectweb3"));
const getErrorMessage_1 = __importDefault(require("./getErrorMessage"));
const getErrOfTx_1 = __importDefault(require("./getErrOfTx"));
class web3errors {
    constructor(rpc) {
        this.getErrorMessage = (err) => (0, getErrorMessage_1.default)(err, this.web3);
        this.getErrOfTx = (txHash) => (0, getErrOfTx_1.default)(txHash, this.web3);
        this.web3 = (0, connectweb3_1.default)(rpc);
    }
}
exports.web3errors = web3errors;
