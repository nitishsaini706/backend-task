import { User } from '../models/user';
export declare function register(user: User): Promise<void>;
export declare function login(user: User): Promise<{
    _id: unknown;
    name: any;
    token: string;
}>;
