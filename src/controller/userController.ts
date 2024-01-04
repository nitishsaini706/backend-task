import {ResponseHandler} from "../contants/responseHandler"
import {Response,Request} from "express";
import * as userServices from "../services/userService"

export const login = async(req:Request,res:Response)=>{
    try{
        const foundUser = await userServices.login(req.body);
        res.status(200);
        ResponseHandler.sendSuccessResponse(res, { message: "success", data:foundUser })
    }catch(err){
        res.status(500);
        ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: err });
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        await userServices.register(req.body);

        res.status(200);
        ResponseHandler.sendSuccessResponse(res, { message: "success" })
    } catch (err) {
        res.status(500);
        ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: err });

    }
}