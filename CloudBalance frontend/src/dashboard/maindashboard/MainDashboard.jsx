import { useState } from "react";
import { Header } from "../../components/header/Header"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Footer } from "../../components/footer/Footer";

export const MainDashboard = () => {

    // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [pageTitle, setPageTitle] = useState('Users')

    const isSidebarOpen = useSelector(state => state.sidebar.open);


    return (
        <div className="size-full overflow-x-hidden">
            <Header />
            <div className="flex w-screen">
                <Sidebar />
                <div className={`bg-gray-200 w-full min-h-[calc(100vh-72px)] overflow-x-hidden p-3 gap-3 overflow-y-auto ${isSidebarOpen ? `ml-[16.6667%]` : `ml-0`} transition-all duration-500 ease-in-out`} >
                    <h1 className=" w-full text-4xl font-medium ">{pageTitle}</h1>
                    <Outlet context={{ setPageTitle }} />
                    {/* <p>This is DashBoard</p> */}
                    <Footer/>
                </div>
            </div>
        </div>
    )
}