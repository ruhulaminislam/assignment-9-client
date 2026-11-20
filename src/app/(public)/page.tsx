import { AdditionalSections } from "@/components/shared/AdditionalSections/AdditionalSections";
import { SalonServiceCategories } from "@/components/shared/DynamicSection2/SalonServiceCategories";
import { Footer } from "@/components/shared/footer";
import { Banner } from "@/components/shared/HomePage/Banner";
import { DynamicSection1 } from "@/components/shared/HomePage/DynamicSection1/DynamicSection1";
import { Navbar } from "@/components/shared/navbar";



export default function Home() {
  return (
   <div>
   
    <Banner></Banner>
    <DynamicSection1></DynamicSection1>
    <SalonServiceCategories></SalonServiceCategories>
    <AdditionalSections></AdditionalSections>
   
   </div>
  );
}
