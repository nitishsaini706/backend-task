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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../middleware/index");
const notesController = __importStar(require("../controller/notesController"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.get("/notes", index_1.auth, notesController.notesList);
router.get("/search", [
    (0, express_validator_1.query)("q").exists().withMessage("Id is required")
], index_1.checkRequestValidationMiddleware, index_1.auth, notesController.notesList);
router.get("/notes", [
    (0, express_validator_1.param)("id").exists().withMessage("Id is required")
], index_1.checkRequestValidationMiddleware, index_1.auth, notesController.noteById);
router.post("/notes", [
    (0, express_validator_1.param)("id").exists().withMessage("Id is required")
], index_1.checkRequestValidationMiddleware, index_1.auth, notesController.share);
router.post("/create", [
    (0, express_validator_1.body)("description").exists().withMessage("description is required"),
    (0, express_validator_1.body)("title").exists().withMessage("title is required"),
], index_1.checkRequestValidationMiddleware, index_1.auth, notesController.createNote);
router.delete("/notes", [
    (0, express_validator_1.param)("id").exists().withMessage("Id is required")
], index_1.auth, notesController.deleteNote);
router.put("/notes", [
    (0, express_validator_1.param)("id").exists().withMessage("Id is required")
], index_1.checkRequestValidationMiddleware, index_1.auth, notesController.editNote);
exports.default = router;
