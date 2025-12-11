import { useState } from "react";
import { Header } from "../../components/header/Header"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Outlet } from "react-router-dom";

export const MainDashboard = () => {

    // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [pageTitle, setPageTitle] = useState('Users')


    return (
        <div className="size-full overflow-x-hidden">
            <Header/>
            <div className="flex w-screen h-auto">
                <Sidebar/>
                <div className={`bg-gray-200 w-full h-auto flex  flex-col overflow-x-hidden p-3 gap-3`} >
                    <h1 className=" w-full text-4xl font-medium ">{pageTitle}</h1>
                    <Outlet context={{setPageTitle}} />
                    {/* <p>This is DashBoard</p> */}
                </div>
            </div>
        </div>
    )
}