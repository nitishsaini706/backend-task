import mongoose from "mongoose";
import { NotesModel, Notes } from "../models/notes";
import {UserModel} from "../models/user";

export const getList = async () => {
    try {
        const list = await NotesModel.find({});
        return list ??[];
    } catch (e) {
        console.log("error in listing notes service", e);
        throw e;
    }
}

export const getNote = async (id:string) => {
    try {
        const note = await NotesModel.findOne({ _id: new mongoose.Types.ObjectId(id) });
        return note ?? {};
    } catch (e) {
        console.log("error in getting note service", e);
        throw e;
    }
}

export const share = async (id: string) => {
    try {
        const note = await NotesModel.findOne({ _id: new mongoose.Types.ObjectId(id) });
        return note ?? {};
    } catch (e) {
        console.log("error in sharing note service", e);
        throw e;
    }
}

export const createNote = async (input: any) => {
    try {
        let user = await UserModel.findOne({ name: input.user.name });

        if (!user) {
            return { msg: "User not found", code: 0 };
        }

        let obj = {
            title: input.title,
            user: user._id, 
            description: input.description
        };

        const savedNote = await NotesModel.create(obj); 
        if(!savedNote){
            return { msg: "Note not created", code: 0 };
        }
        return { msg: "success", code: 1 };
    } catch (e) {
        console.log("error in creating notes service", e);
        throw e;
    }
}

export const editNote = async (input:any) => {
    try {
        let editObj:any = {};
        
        if (input.title) {
            editObj.title = input.title;
        }
        if (input.description) {
            editObj.description = input.description;
        }
        let user = await UserModel.findOne({ name: input.user.name })
        if(!user){
            return false;
        }
        editObj.user = user._id;

        if(Object.keys(input).length > 0){

            await NotesModel.updateOne({ _id: new mongoose.Types.ObjectId(input.id) }, { $set: editObj });
            
        }
        return true;
    } catch (e) {
        console.log("error in updating note service", e);
        throw e;
    }
}

export const deleteNote = async (input: any) => {
    try {
        let user = await UserModel.findOne({ name: input.user.name })
        if (!user) {
            return false;
        }
        
            await NotesModel.updateOne({ _id: new mongoose.Types.ObjectId(input._id) }, { $set: {isDeleted:true,user:user._id} });
            return true;
    } catch (e) {
        console.log("error in deleting note service", e);
        throw e;
    }
}

export const searchNote = async (q:string) => {
    try {
        
        let query = {
            title: {$regex: q, $options: 'i'}
        };
        
        const data = await NotesModel.findOne(query);
        return data ?? {};
    } catch (e) {
        console.log("error in search note service", e);
        throw e;
    }
}