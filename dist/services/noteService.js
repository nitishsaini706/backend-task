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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNote = exports.deleteNote = exports.editNote = exports.createNote = exports.share = exports.getNote = exports.getList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const notes_1 = require("../models/notes");
const user_1 = require("../models/user");
const getList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield notes_1.NotesModel.find({});
        return list !== null && list !== void 0 ? list : [];
    }
    catch (e) {
        console.log("error in listing notes service", e);
        throw e;
    }
});
exports.getList = getList;
const getNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield notes_1.NotesModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
        return note !== null && note !== void 0 ? note : {};
    }
    catch (e) {
        console.log("error in getting note service", e);
        throw e;
    }
});
exports.getNote = getNote;
const share = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield notes_1.NotesModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
        return note !== null && note !== void 0 ? note : {};
    }
    catch (e) {
        console.log("error in sharing note service", e);
        throw e;
    }
});
exports.share = share;
const createNote = (input, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_1.UserModel.findOne({ token: userId });
        if (!user) {
            return { msg: "User not found", code: 0 };
        }
        let obj = {
            title: input.title,
            user: user._id,
            description: input.description
        };
        const savedNote = yield notes_1.NotesModel.create(obj);
        if (!savedNote) {
            return { msg: "Note not created", code: 0 };
        }
        return { msg: "success", code: 1 };
    }
    catch (e) {
        console.log("error in creating notes service", e);
        throw e;
    }
});
exports.createNote = createNote;
const editNote = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let editObj = {};
        if (input.title) {
            editObj.title = input.title;
        }
        if (input.description) {
            editObj.description = input.description;
        }
        let user = yield user_1.UserModel.findOne({ name: input.user.name });
        if (!user) {
            return false;
        }
        editObj.user = user._id;
        if (Object.keys(input).length > 0) {
            yield notes_1.NotesModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(input.id) }, { $set: editObj });
        }
        return true;
    }
    catch (e) {
        console.log("error in updating note service", e);
        throw e;
    }
});
exports.editNote = editNote;
const deleteNote = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_1.UserModel.findOne({ name: input.user.name });
        if (!user) {
            return false;
        }
        yield notes_1.NotesModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(input._id) }, { $set: { isDeleted: true, user: user._id } });
        return true;
    }
    catch (e) {
        console.log("error in deleting note service", e);
        throw e;
    }
});
exports.deleteNote = deleteNote;
const searchNote = (q) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {
            title: { $regex: q, $options: 'i' }
        };
        const data = yield notes_1.NotesModel.findOne(query);
        return data !== null && data !== void 0 ? data : {};
    }
    catch (e) {
        console.log("error in search note service", e);
        throw e;
    }
});
exports.searchNote = searchNote;
