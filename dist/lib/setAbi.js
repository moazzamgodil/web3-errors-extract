"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeToString = (input) => {
    if (input.type === "tuple") {
        return "(" + input.components.map(typeToString).join(",") + ")";
    }
    return input.type;
};
const setAbi = (abiArray, web3) => {
    const methodIDs = {};
    abiArray.map((abi) => {
        if (Array.isArray(abi)) {
            abi.map(function (abiValue) {
                if (abiValue.name) {
                    const signature = web3.utils.sha3(abiValue.name +
                        "(" +
                        abiValue.inputs
                            .map(typeToString)
                            .join(",") +
                        ")");
                    if (abiValue.type === "event") {
                        methodIDs[signature.slice(2)] = abiValue;
                    }
                    else {
                        methodIDs[signature.slice(2, 10)] = abiValue;
                    }
                }
            });
        }
        else {
            throw new Error("Expected ABI array, one or more got " + typeof abi);
        }
    });
    return methodIDs;
};
exports.default = setAbi;
