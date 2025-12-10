import { Header } from "../../components/header/Header"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Outlet } from "react-router-dom";

export const MainDashboard = () => {

    // const [isSidebarOpen, setIsSidebarOpen] = useState(true);


    return (
        <>
            <Header/>
            <div className="flex h-auto  ">
                <Sidebar/>
                <div className={` bg-gray-200 w-full h-auto flex items-center justify-start`} >
                    <Outlet />
                    {/* <p>This is DashBoard</p> */}
                </div>
            </div>
        </>
    )
}