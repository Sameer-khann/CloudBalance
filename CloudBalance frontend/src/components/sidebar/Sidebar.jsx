// import React from 'react'

import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import PaidIcon from '@mui/icons-material/Paid';
import BarChartIcon from '@mui/icons-material/BarChart';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';


export const Sidebar = () => {

    const isOpen = useSelector(state => state.sidebar.open)
    const reduxUser = useSelector(state => state.sidebar.user)

    const isCustomer = reduxUser.role == 'Customer' ? true : false;
    const isReadOnly = reduxUser.role == 'ReadOnly' ? true : false;

    console.log("isCustomer: ", isCustomer);

    // console.log("open redux : ", isOpen);

    return (
        // <>
            


            <div className={` fixed top-[72px] left-0   bg-white w-1/6 h-[calc(100vh-72px)] transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full '} z-40`}>

                <ul className='py-10 flex flex-col gap-4 pl-4'>

                    {!isCustomer &&
                        <><li className='flex flex-row gap-4 hover:bg-[#d1edff] mr-4 p-2 rounded-lg'>
                            <NavLink to='/dashboard/user' className={({ isActive }) => `flex flex-row gap-4 w-full p-2 rounded-lg ${isActive || location.pathname === "/dashboard" ? 'bg-[#d1edff]' : ''}`}>
                                {/* ${isActive || location.pathname === "/dashboard" ? "bg-[#d1edff]" : ""} */}
                                <div><ManageAccountsOutlinedIcon /></div>
                                <div>Users</div>
                            </NavLink>
                        </li>

                            {!isReadOnly &&
                                <li className='flex flex-row gap-4 hover:bg-[#d1edff] mr-4 p-2 rounded-lg'>
                                    <NavLink to='/dashboard/onboading' className={({ isActive }) => `flex flex-row gap-4 w-full p-2 rounded-lg ${isActive ? 'bg-[#d1edff]' : ''}`}>
                                        <div><OpenInBrowserIcon /></div>
                                        <div>Onboarding</div>
                                    </NavLink>
                                </li>
                            }
                        </>
                    }

                    <li className='flex flex-row gap-4 hover:bg-[#d1edff] mr-4 p-2 rounded-lg'>
                        <NavLink to='/dashboard/costexplorer' className={({ isActive }) => `flex flex-row gap-4 w-full p-2 rounded-lg ${isActive ? 'bg-[#d1edff]' : ''}`}>
                            <div><PaidIcon /></div>
                            <div>Cost Explorer</div>
                        </NavLink>
                    </li>
                    <li className='flex flex-row gap-4 hover:bg-[#d1edff] mr-4 p-2 rounded-lg'>
                        <NavLink to='/dashboard/aws' className={({ isActive }) => `flex flex-row gap-4 w-full p-2 rounded-lg ${isActive ? 'bg-[#d1edff]' : ''}`}>
                            <div><BarChartIcon /></div>
                            <div>AWS Accounts</div>
                        </NavLink>
                    </li>
                </ul>

            </div >

    );
}