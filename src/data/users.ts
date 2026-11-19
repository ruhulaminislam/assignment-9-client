
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
    const response = await fetch('http://localhost:5000/users');
    const data = await response.json();
    return data;
}

export const isBlockeds = async (id: string,isBlocked:boolean): Promise<IUser> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/block/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({isBlocked:isBlocked})
    });
    const data = await response.json();
    return data;
}

//updat admin profile
export const updateAdminProfile = async (id: string, data: string): Promise<IUser> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/update-admin/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}

//update user profile
export const updateUserProfile = async (id: string, data: string): Promise<IUser> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/update-user/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}
