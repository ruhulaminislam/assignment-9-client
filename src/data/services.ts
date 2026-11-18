
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services?${query}`,{
    cache: "no-store"
  });
  const data = await response.json();
  return data;
}