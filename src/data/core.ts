
"use server"
import { CategoryCard } from "@/components/shared/DynamicSection2/CategoryCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export const getTokenFromServer = async () => {
  const session = await getUserData();

  // User login না থাকলে token প্রয়োজন নেই
  if (!session?.session?.token) {
    return null;
  }

  const data = await auth.api.getToken({
    headers: await headers(),
    query: { disableCookieCache: true }
  });

  return data?.token ?? null;
};
export const getUserData = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
      query: {
        disableCookieCache: true,
      },
    });

    return session;
  } catch (error) {
    console.error("Failed to get user session:", error);
    return null;
  }
};
   
export const getToken=async()=>{
    const session =await getUserData();
   if(!session || !session.session.token){
     redirect("/unauthorized");
   }
   return session.session.token;
}
export const allauthFetch = async ( api: string,method: string,data?: unknown) => {
  const token = await getTokenFromServer()
  const response = await fetch(api, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
  });

  if (response.status === 401 || response.status === 403) {
    redirect("/unauthorized");
  }

  return response.json();
};

export const requiterole = async (role:string) => {
    const session = await getUserData();

    if(!session || session.user.role !==role ){
        redirect("/unauthorized");
    }
    if(session.user.isBlocked){
        redirect("/other/blocked");
    }
    return session
}
