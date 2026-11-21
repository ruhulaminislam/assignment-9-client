 "use server";
import { allauthFetch } from "./core"

export type ServiceStatus = "active" | "inactive"
export interface Service {
  
 _id: string
  serviceName: string
  category: string
  description: string
  price: number
  duration: number // মিনিটে
  image: string
  status: ServiceStatus
  createdBy: string
  createdByEmail: string
  createdByName: string
  createdAt: string
  updatedAt: string

}
//public services onle show active services
export const featuredServices = async (query:string=""): Promise<Service[]>=>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/public?${query}`,{
    cache: "no-store"
  });
  const data = await response.json();
  return data as Service[];
}

//get services by id
export const getServiceById =async(id:string)=>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/${id}`,{
    cache: "no-store"
  });
  const data = await response.json();
  return data;
}

//  get all services for admin
export const getServices =async():Promise<Service[]>=>{
  const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/services`;
   const response = await allauthFetch(api, "GET");
   return response;
}
// Service without the fields that are created by the server/database.
export type NewService = Omit<Service, "_id" | "createdAt" | "updatedAt">

//add service
export const addService = async (service: NewService) => {
  const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/services`;
  const response = await allauthFetch(api, "POST", service);
  return response;
}

//delete service
export const deleteService = async (id: string) => {
  const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/services/delete/${id}`;
  const response = await allauthFetch(api, "DELETE");
  return response;
}

//service status toggle
export const toggleServiceStatus = async (id: string, status: ServiceStatus) => {
  const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/services/status/${id}`;
  const response = await allauthFetch(api, "PATCH", { status });
  return response;
  
}


//update service
export const updateService = async (id: string, service: Partial<Service>) => {
  const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/services/update/${id}`;
  const response = await allauthFetch(api, "PATCH", service);
  return response;
 
}

