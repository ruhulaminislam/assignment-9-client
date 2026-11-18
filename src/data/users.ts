
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