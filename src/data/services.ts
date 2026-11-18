
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
const getServiceById =async(id:string)=>{
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

export const addService = async (service: Service) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });
  const data = await response.json();
  return data;
}