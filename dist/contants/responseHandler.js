"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
function sendResponse(res, body) {
    res.setHeader('Content-Type', 'application/json');
    res.send(body);
}
function sendSuccessResponse(res, okBody) {
    sendResponse(res, okBody);
}
function sendErrorResponse(res, errorBody) {
    if (!errorBody) {
        errorBody = new Object();
    }
    sendResponse(res, errorBody);
}
exports.ResponseHandler = {
    sendSuccessResponse,
    sendErrorResponse
};
