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
Object.defineProperty(exports, "__esModule", { value: true });
exports.share = exports.search = exports.deleteNote = exports.editNote = exports.createNote = exports.noteById = exports.notesList = void 0;
const notesService = __importStar(require("../services/noteService"));
const responseHandler_1 = require("../contants/responseHandler");
const notesList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Need to deploy key avlue databse to use redis as url cannot be 127.0.0.1 on vercel
        // let cacheObj:any = {
        //     key:"list",
        //     type:"get"
        // }
        // const cache = await redisService(cacheObj);
        // if(cache){
        //     ResponseHandler.sendSuccessResponse(res,{message:"from redis",data:JSON.parse(cache)});
        // }
        const list = yield notesService.getList();
        // cacheObj.type= "set";
        // cacheObj = {
        //     ...cacheObj,
        //     value:list
        // }
        // await redisService(cacheObj);
        res.status(200);
        responseHandler_1.ResponseHandler.sendSuccessResponse(res, { message: "success", data: list });
    }
    catch (e) {
        res.status(500);
        responseHandler_1.ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
});
exports.notesList = notesList;
const noteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const note = yield notesService.getNote(id);
        let message = "success";
        if (note) {
            message = "not data found";
        }
        res.status(200);
        responseHandler_1.ResponseHandler.sendSuccessResponse(res, { message: message, data: note });
    }
    catch (e) {
        res.status(500);
        responseHandler_1.ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
});
exports.noteById = noteById;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const create = yield notesService.createNote(data);
        if (create.code == 0) {
            res.status(500);
            responseHandler_1.ResponseHandler.sendErrorResponse(res, { message: create.msg, errors: create.msg });
        }
        res.status(200);
        responseHandler_1.ResponseHandler.sendSuccessResponse(res, { message: "success" });
    }
    catch (e) {
        res.status(500);
        responseHandler_1.ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
});
exports.createNote = createNote;
const editNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params;
        let edit = req.body;
        edit = Object.assign(Object.assign({}, edit), { id: id });
        const result = yield notesService.editNote(edit);
        if (!result) {
            res.status(500);
            responseHandler_1.ResponseHandler.sendErrorResponse(res, { message: "user does not exit", errors: "user does not exit" });
        }
        res.status(200);
        responseHandler_1.ResponseHandler.sendSuccessResponse(res, { message: "success" });
    }
    catch (e) {
        res.status(500);
        responseHandler_1.ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
});
exports.editNote = editNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.params;
        const user = req.body;
        let obj = {
            id: data.id,
            user: user
        };
        const result = yield notesService.deleteNote(obj);
        if (!result) {
            res.status(500);
            responseHandler_1.ResponseHandler.sendErrorResponse(res, { message: "user does not exit", errors: "user does not exit" });
        }
        res.status(200);
        responseHandler_1.ResponseHandler.sendSuccessResponse(res, { message: "success" });
    }
    catch (e) {
        res.status(500);
        responseHandler_1.ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
});
exports.deleteNote = deleteNote;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const data = yield notesService.searchNote(q);
        if (Object.keys(data).length == 0) {
            responseHandler_1.ResponseHandler.sendSuccessResponse(res, { message: "no data found", data: data });
        }
        res.status(200);
        responseHandler_1.ResponseHandler.sendSuccessResponse(res, { message: "success", data: data });
    }
    catch (e) {
        res.status(500);
        responseHandler_1.ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
});
exports.search = search;
const share = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const note = yield notesService.share(id);
        let message = "success";
        if (note) {
            message = "not data found";
        }
        res.status(200);
        responseHandler_1.ResponseHandler.sendSuccessResponse(res, { message: message, data: res.json(note) });
    }
    catch (e) {
        res.status(500);
        responseHandler_1.ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
});
exports.share = share;
