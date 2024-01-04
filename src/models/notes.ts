import mongoose,{Schema} from "mongoose";

export interface Notes {
    title:string,
    id:string,
    description:String,
    user:mongoose.Types.ObjectId
}

const NotesSchema:Schema = new Schema({
    title:{type:String,required:true,index:true},
    description:{type:String,default:""},
    user:{type:mongoose.Types.ObjectId,ref:"users"},
    isDeleted:{type:Boolean,default:false}
},{
    timestamps:true
})

export const NotesModel = mongoose.model('note',NotesSchema);

