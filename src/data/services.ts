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

export const featuredServices = async (query:string="")=>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/public?${query}`,{
    cache: "no-store"
  });
  const data = await response.json();
  return data;
}

//get services by id
export const getServiceById =async(id:string)=>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/${id}`,{
    cache: "no-store"
  });
  const data = await response.json();
  return data;
}

//  get all services
export const getServices =async():Promise<Service[]>=>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services`,{
    cache: "no-store"
  });
  const data = await response.json();
  return data;
}
//add service
export const addService = async (service: Service) => {
  const api = `${process.env.NEXT_PUBLIC_SERVER_URL}/services`;
  const response = await allauthFetch(api, "POST", service);
  return response;
}

//delete service
export const deleteService = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/delete/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}

//service status toggle
export const toggleServiceStatus = async (id: string, status: ServiceStatus) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/status/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  const data = await response.json();
  return data;
}


//update service
export const updateService = async (id: string, service: Service) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });
  const data = await response.json();
  return data;
}

