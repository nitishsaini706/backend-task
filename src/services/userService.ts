import {UserModel,User } from '../models/user';
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
import {SECRET_KEY} from "../middleware/index"

export async function register(user: User): Promise<void> {
    try {
        await UserModel.create(user);
    } catch (error) {
        throw error;
    }
}

export async function login(user:User) {
    try {
        const foundUser = await UserModel.findOne({ email: user.email });
        if (!foundUser) {
            throw new Error('Name of user is not correct');
        }

        const isMatch = bcrypt.compareSync(user.password, foundUser.password);

        if (isMatch) {

            const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, SECRET_KEY, {
                expiresIn: '2 days',
            });
            await UserModel.updateOne({email:user.email},{$set:{token:token}});
            const result = {
                _id:foundUser._id,
                name:foundUser.name,
                token:token
            }
            return result;
        } else {
            throw new Error('Password is not correct');
        }
    } catch (error) {
        throw error;
    }
}
