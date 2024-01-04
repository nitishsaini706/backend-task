"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const index_1 = require("../middleware/index");
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield user_1.UserModel.create(user);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.register = register;
function login(user) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield user_1.UserModel.findOne({ email: user.email });
            if (!foundUser) {
                throw new Error('Name of user is not correct');
            }
            const isMatch = bcrypt_1.default.compareSync(user.password, foundUser.password);
            if (isMatch) {
                const token = jwt.sign({ _id: (_a = foundUser._id) === null || _a === void 0 ? void 0 : _a.toString(), name: foundUser.name }, index_1.SECRET_KEY, {
                    expiresIn: '2 days',
                });
                yield user_1.UserModel.updateOne({ email: user.email }, { $set: { token: token } });
                const result = {
                    _id: foundUser._id,
                    name: foundUser.name,
                    token: token
                };
                return result;
            }
            else {
                throw new Error('Password is not correct');
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.login = login;
