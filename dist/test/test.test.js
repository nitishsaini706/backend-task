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
const yourNoteModule_1 = require("./yourNoteModule"); // Adjust the import path
const notesService = __importStar(require("./notesService"));
const ResponseHandler = __importStar(require("./ResponseHandler"));
// Mock the notesService and ResponseHandler methods used in the createNote function
jest.mock('./notesService', () => ({
    createNote: jest.fn(),
}));
jest.mock('./ResponseHandler', () => ({
    sendSuccessResponse: jest.fn(),
    sendErrorResponse: jest.fn(),
}));
describe('createNote Function', () => {
    let mockReq;
    let mockRes;
    let nextFunction = jest.fn();
    beforeEach(() => {
        // Reset all mocks before each test case
        jest.clearAllMocks();
        // Create mock implementations for req and res
        mockReq = {
            body: { title: 'Test Note', content: 'This is a test note.' },
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });
    it('should send a success response when note creation is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the createNote service call to simulate a successful response
        notesService.createNote.mockResolvedValue({ code: 1 });
        yield (0, yourNoteModule_1.createNote)(mockReq, mockRes);
        expect(notesService.createNote).toHaveBeenCalledWith(mockReq.body);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(ResponseHandler.sendSuccessResponse).toHaveBeenCalledWith(mockRes, { message: "success" });
    }));
    it('should send an error response when note creation fails', () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = 'Note creation failed';
        // Mock the createNote service call to simulate a failure response
        notesService.createNote.mockResolvedValue({ code: 0, msg: errorMessage });
        yield (0, yourNoteModule_1.createNote)(mockReq, mockRes);
        expect(notesService.createNote).toHaveBeenCalledWith(mockReq.body);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(ResponseHandler.sendErrorResponse).toHaveBeenCalledWith(mockRes, { message: errorMessage, errors: errorMessage });
    }));
    it('should handle exceptions and send a 500 error', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error('Unexpected Error');
        // Mock the createNote service call to throw an exception
        notesService.createNote.mockRejectedValue(error);
        yield (0, yourNoteModule_1.createNote)(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(ResponseHandler.sendErrorResponse).toHaveBeenCalledWith(mockRes, { message: 'Bad Request', errors: error });
    }));
});
