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
const executionReverted = (err) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonObj = JSON.parse(err.message.slice(err.message.indexOf("{"), err.message.lastIndexOf("}") + 1));
    if (jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.originalError) {
        return jsonObj.originalError.message;
    }
    return jsonObj;
});
exports.default = executionReverted;
