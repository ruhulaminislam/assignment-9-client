

import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"

export default function Layouts({children}: {children: React.ReactNode}) {
  return (
    <>
    <Navbar />
    
    <div className="min-h-screen">
      {children}
      <Footer />
    </div>
    
    </>
  )
}
