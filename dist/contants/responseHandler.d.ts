import * as express from 'express';
interface ApiOk {
    status?: number;
    message?: any;
    data?: any;
    statusCode?: number;
}
declare function sendSuccessResponse(res: express.Response, okBody: ApiOk): void;
declare function sendErrorResponse(res: express.Response, errorBody: any): void;
export declare const ResponseHandler: {
    sendSuccessResponse: typeof sendSuccessResponse;
    sendErrorResponse: typeof sendErrorResponse;
};
export {};
