import * as notesService from "../services/noteService"
import { Request, Response } from "express";
import { ResponseHandler } from "../contants/responseHandler"
import { redisService } from "../services/redis"

export const notesList = async (req: Request, res: Response) => {
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
        const list = await notesService.getList();
        // cacheObj.type= "set";
        // cacheObj = {
        //     ...cacheObj,
        //     value:list
        // }
        // await redisService(cacheObj);
        res.status(200);
        ResponseHandler.sendSuccessResponse(res, { message: "success", data: list })

    } catch (e) {
        res.status(500);
        ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
}

export const noteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const note = await notesService.getNote(id);
        let message = "success";
        if (note) {
            message = "not data found";
        }
        res.status(200);
        ResponseHandler.sendSuccessResponse(res, { message: message, data: note })
    } catch (e) {
        res.status(500);
        ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
}

export const createNote = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const create = await notesService.createNote(data);
        if(create.code == 0){
            res.status(500);
            ResponseHandler.sendErrorResponse(res, { message: create.msg, errors: create.msg });

        }
        res.status(200);
        ResponseHandler.sendSuccessResponse(res, { message: "success" })

    } catch (e) {
        res.status(500);
        ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
}

export const editNote = async (req: Request, res: Response) => {
    try {
        const id = req.params;
        let edit = req.body;
        edit = {
            ...edit,
            id:id
        }
        const result = await notesService.editNote(edit);
        if (!result) {
            res.status(500);
            ResponseHandler.sendErrorResponse(res, { message: "user does not exit", errors: "user does not exit" });
        }
        res.status(200);
        ResponseHandler.sendSuccessResponse(res, { message: "success" })

    } catch (e) {
        res.status(500);
        ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
}

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const data = req.params;
        const user = req.body;
        let obj = {
            id:data.id,
            user:user
        }
        const result = await notesService.deleteNote(obj);
        if(!result){
            res.status(500);
            ResponseHandler.sendErrorResponse(res, { message: "user does not exit", errors: "user does not exit" });
        }
        res.status(200);
        ResponseHandler.sendSuccessResponse(res, { message: "success" })

    } catch (e) {
        res.status(500);
        ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
}

export const search = async (req: Request, res: Response) => {
    try {
        const {q} = req.query as { q:string};
        const data = await notesService.searchNote(q);
        if(Object.keys(data).length == 0){
            ResponseHandler.sendSuccessResponse(res, { message: "no data found", data: data })
        }
        res.status(200);
        ResponseHandler.sendSuccessResponse(res, { message: "success", data: data })

    } catch (e) {
        res.status(500);
        ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
}

export const share = async (req: Request, res: Response) => {
    try {
        const { id } = req.query as { id: string };

        const note = await notesService.share(id);
        let message = "success";
        if (note) {
            message = "not data found";
        }
        res.status(200);
        ResponseHandler.sendSuccessResponse(res, { message: message, data: res.json(note) })

    } catch (e) {
        res.status(500);
        ResponseHandler.sendErrorResponse(res, { message: "Bad Request", errors: e });
    }
}