"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const decodeData = (data, state, web3) => {
    const methodID = data.slice(2, 10);
    const abiItem = state.methodIDs[methodID];
    if (abiItem) {
        const decodedData = web3.eth.abi.decodeParameters(abiItem.inputs, data.slice(10));
        let retData = {
            name: abiItem.name,
            params: [],
        };
        for (let i = 0; i < decodedData.__length__; i++) {
            let param = decodedData[i];
            let parsedParam = param;
            const isUint = abiItem.inputs[i].type.indexOf("uint") === 0;
            const isInt = abiItem.inputs[i].type.indexOf("int") === 0;
            const isAddress = abiItem.inputs[i].type.indexOf("address") === 0;
            if (isUint || isInt) {
                const isArray = Array.isArray(param);
                if (isArray) {
                    parsedParam = param.map((val) => new (val).toString());
                }
                else {
                    parsedParam = (param).toString();
                }
            }
            if (isAddress) {
                const isArray = Array.isArray(param);
                if (isArray) {
                    parsedParam = param.map((_) => _.toLowerCase());
                }
                else {
                    parsedParam = param.toLowerCase();
                }
            }
            retData.params.push({
                name: abiItem.inputs[i].name,
                value: parsedParam,
                type: abiItem.inputs[i].type,
            });
        }
        return retData;
    }
    return null;
};
const executionReverted = (err, state, web3) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let jsonObj;
    if ((err === null || err === void 0 ? void 0 : err.data) != null && (err === null || err === void 0 ? void 0 : err.data) != undefined) {
        jsonObj = err.data;
    }
    else {
        jsonObj = JSON.parse(err.message.slice(err.message.indexOf("{"), err.message.lastIndexOf("}") + 1));
    }
    if (jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.originalError) {
        if (((_a = jsonObj.originalError) === null || _a === void 0 ? void 0 : _a.data) != null && ((_b = jsonObj.originalError) === null || _b === void 0 ? void 0 : _b.data) != undefined) {
            const decodedData = decodeData(jsonObj.originalError.data, state, web3);
            console.log(decodedData);
            if (decodedData) {
                return decodedData;
            }
        }
        return jsonObj.originalError.message;
    }
    return jsonObj;
});
exports.default = executionReverted;
//# sourceMappingURL=executionReverted.js.map