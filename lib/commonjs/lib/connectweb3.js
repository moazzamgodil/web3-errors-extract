"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const connectWeb3 = (rpc) => {
    const web3 = new web3_1.default(rpc);
    return web3;
};
exports.default = connectWeb3;
//# sourceMappingURL=connectweb3.js.map