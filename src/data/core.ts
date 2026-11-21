
"use server"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
 
export const getUserData = async () => {
 
  const session = await auth.api.getSession({
    headers: await headers (),
  })
  return session
}
   
export const getToken=async()=>{
    const session =await getUserData();
   if(!session || !session.session.token){
     redirect("/unauthorized");
   }
   return session.session.token;
}
export const allauthFetch = async (api:string,method:string,data?:unknown) => {
 const token = await getToken();
 const response = await fetch(api, {
    method:method,
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    },
    body: data ? JSON.stringify(data) : null
 })
 if(response.status === 401 || response.status === 403){
    redirect("/unauthorized");
 }
 return response.json();
}

export const requiterole = async (role:string) => {
    const session = await getUserData();
    if(!session || session.user.role !== role){
        redirect("/unauthorized");
    }
    return session
}