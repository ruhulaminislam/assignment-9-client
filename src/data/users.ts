 "use server";

import { allauthFetch } from "./core";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    image: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;

}

 export const allusers=async(): Promise<IUser[]>=>{
    const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/users`;
    const response = await allauthFetch(api,"GET");
    return response;
}

export const isBlockeds = async (id: string,isBlocked:boolean): Promise<IUser> => {
    const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/users/block/${id}`;
    const response = await allauthFetch(api,"PATCH",{isBlocked:isBlocked});
    return response;
}

//updat admin profile
export const updateAdminProfile = async (id: string, data: string): Promise<IUser> => {
    const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/users/update-admin/${id}`;
    const response = await allauthFetch(api,"PATCH",data);
    return response;
   
}

//update user profile
export const updateUserProfile = async (id: string, data: string): Promise<IUser> => {
    const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/users/update-user/${id}`;
    const response = await allauthFetch(api,"PATCH",data);
    return response;
  
}
