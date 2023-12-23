import { db } from "@/lib/db";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import Toolbar from "./_components/Toolbar";
import MobileToolBar from "./_components/MobileToolbar";
import getConversations from "@/lib/getConversations";



const DashboardLayout =async ({children}:{
    children:React.ReactNode
}) =>{
    
    const users = await db.user.findMany({})
  
    const conversations = await getConversations()

    



  
    return (
      <div className="w-full flex ">
        
        <div className="md:flex h-screen hidden ">
            <div>
              <Toolbar />
            </div>

            <div className="w-[20vw] hidden lg:block">
              <Sidebar
               users={users}
               conversations={conversations}
              />
            </div>
        </div>

        <div>

          

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