"use strict";
// import { Request, Response } from 'express';
// import jest from "jest";
// Was causing error while deploying on vercel
// // Mock the notesService and ResponseHandler methods used in the createNote function
// jest.mock('./notesService', () => ({
//     createNote: jest.fn(),
// }));
// jest.mock('./ResponseHandler', () => ({
//     sendSuccessResponse: jest.fn(),
//     sendErrorResponse: jest.fn(),
// }));
// describe('createNote Function', () => {
//     let mockReq;
//     let mockRes;
//     let nextFunction = jest.fn();
//     beforeEach(() => {
//         // Reset all mocks before each test case
//         jest.clearAllMocks();
//         // Create mock implementations for req and res
//         mockReq = {
//             body: { title: 'Test Note', content: 'This is a test note.' },
//         } as Partial<Request>;
//         mockRes = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn().mockReturnThis(),
//         } as Partial<Response>;
//     });
//     it('should send a success response when note creation is successful', async () => {
//         // Mock the createNote service call to simulate a successful response
//         notesService.createNote.mockResolvedValue({ code: 1 });
//         await createNote(mockReq as Request, mockRes as Response);
//         expect(notesService.createNote).toHaveBeenCalledWith(mockReq.body);
//         expect(mockRes.status).toHaveBeenCalledWith(200);
//         expect(ResponseHandler.sendSuccessResponse).toHaveBeenCalledWith(mockRes, { message: "success" });
//     });
//     it('should send an error response when note creation fails', async () => {
//         const errorMessage = 'Note creation failed';
//         // Mock the createNote service call to simulate a failure response
//         notesService.createNote.mockResolvedValue({ code: 0, msg: errorMessage });
//         await createNote(mockReq as Request, mockRes as Response);
//         expect(notesService.createNote).toHaveBeenCalledWith(mockReq.body);
//         expect(mockRes.status).toHaveBeenCalledWith(500);
//         expect(ResponseHandler.sendErrorResponse).toHaveBeenCalledWith(
//             mockRes,
//             { message: errorMessage, errors: errorMessage }
//         );
//     });
//     it('should handle exceptions and send a 500 error', async () => {
//         const error = new Error('Unexpected Error');
//         // Mock the createNote service call to throw an exception
//         notesService.createNote.mockRejectedValue(error);
//         await createNote(mockReq as Request, mockRes as Response);
//         expect(mockRes.status).toHaveBeenCalledWith(500);
//         expect(ResponseHandler.sendErrorResponse).toHaveBeenCalledWith(
//             mockRes,
//             { message: 'Bad Request', errors: error }
//         );
//     });
// });
