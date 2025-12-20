// import React from 'react'

import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';


export const Sidebar = () => {

    const isOpen = useSelector(state => state.sidebar.open)

    // console.log("open redux : ", isOpen);

    return (
        <>
            {/* <div>This is Sidebar.</div> */}
            {/* <div className={` transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}> */}


            <div className={`bg-white w-1/6 h-253   transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full hidden'}`}>

                <ul className='py-10 flex flex-col gap-4 pl-4'>
                    <li className='flex flex-row gap-4 hover:bg-[#d1edff] mr-4 p-2 rounded-lg'>
                        <NavLink to='/dashboard/user'  className={({isActive}) => `flex flex-row gap-4 w-full p-2 rounded-lg ${isActive? 'bg-[#d1edff]' : ''}`}>
                            <div><ManageAccountsOutlinedIcon /></div>
                            <div>Users</div>
                        </NavLink>
                    </li>
                    <li className='flex flex-row gap-4 hover:bg-[#d1edff] mr-4 p-2 rounded-lg'>
                        <div><ScreenSearchDesktopOutlinedIcon /></div>
                        <div>Dashboard Control Grid</div>
                    </li>
                    <li className='flex flex-row gap-4 hover:bg-[#d1edff] mr-4 p-2 rounded-lg'>
                        <div><MemoryOutlinedIcon /></div>
                        <div>Module Control Grid</div>
                    </li>
                </ul>

            </div>
            {/* </div> */}

            {/* <div className='bg-gray-500 size-auto'></div> */}
        </>

    );
}