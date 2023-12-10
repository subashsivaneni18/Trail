import { db } from "@/lib/db";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import Toolbar from "./_components/Toolbar";
import MobileToolBar from "./_components/MobileToolbar";



const DashboardLayout =async ({children}:{
    children:React.ReactNode
}) =>{
    
    const users = await db.user.findMany({})
  


    return (
      <div className="w-full flex ">
        
        <div className="md:flex h-screen hidden ">
            <div>
              <Toolbar />
            </div>

            <div className="w-[20vw] hidden lg:block">
              <Sidebar
               users={users}
              />
            </div>
        </div>

        <div>
          <div className="fixed w-full top-0 z-50 overflow-visible">
            <Header isBack />
          </div>
          <main className="absolute top-[68px]">
              {children}
          </main>
          <div className="absolute bottom-0 md:hidden w-full">
            <MobileToolBar/>
          </div>
        </div>
        
      </div>
    );
}

export default DashboardLayout 