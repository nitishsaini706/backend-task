import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const saltRounds = 8


export interface User{
    name:string,
    password:string,
    email:string,
    notes:[mongoose.Types.ObjectId]
}
const UserSchema:Schema = new Schema({
    name:{type:String,required:true,unique:true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    notes:{type:[mongoose.Types.ObjectId],ref:"notes"},
},{
    timestamps:true
})


UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});

export const UserModel = mongoose.model("user",UserSchema);