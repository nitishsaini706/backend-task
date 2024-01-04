import * as express from 'express';

interface ApiOk {
    status?: number,
    message?: any,
    data?: any,
    statusCode?: number
}

interface ApiResponse {
    status?: number,
    message?: string,
    data?: any | null
}
function sendResponse(res: express.Response, body: ApiResponse) {
    res.setHeader('Content-Type', 'application/json');
    res.send(body);
}

function sendSuccessResponse(res: express.Response, okBody: ApiOk) {
    sendResponse(res, okBody);
}

function sendErrorResponse(res: express.Response, errorBody: any) {
    if (!errorBody) {
        errorBody = new Object() as any;
    }
    sendResponse(res, errorBody);
}

export const ResponseHandler =
{
    sendSuccessResponse,
    sendErrorResponse
}