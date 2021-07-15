import { Document } from 'mongoose';
import { UsersActionEnum } from '../constants';

export interface IUserToken {
    action?: UsersActionEnum,
    token?: string
}

export interface UserInterface extends Document{
    _id: string,
    name: string,
    surname: string,
    gender?: string,
    email: string,
    password: string,
    role: string,
    status: string,
    tokens?: [IUserToken],
    photos: [string],
    isDeleted: boolean;
    deletedAt: Date | null;
    createdAt: string
}
