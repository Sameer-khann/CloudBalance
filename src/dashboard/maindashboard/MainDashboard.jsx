import { useState } from "react";
import { Header } from "../../components/header/Header"
import { Sidebar } from "../../components/sidebar/Sidebar"

export const MainDashboard = () => {

      const [isSidebarOpen, setIsSidebarOpen] = useState(true);


    return(
        <>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
        <Sidebar  isOpen={isSidebarOpen}/>
        <div className=" bg-gray-200 h-dvh flex items-center justify-center" >This is DashBoard</div>
        </>
    )
}