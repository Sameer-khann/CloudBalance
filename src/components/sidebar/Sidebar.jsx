import React from 'react'

import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';


export const Sidebar = ({isOpen}) => {


    return(
        <>
        {/* <div>This is Sidebar.</div> */}
        <div className={`relative ${isOpen ? "w-70" : "w-0 overflow-hidden"}`}>


        <div className='bg-white w-70 h-253 absolute'>
           
                <ul className='py-10 flex flex-col gap-4 pl-4'>
                    <li className='flex flex-row gap-4 hover:bg-[#d1edff] mr-4 p-2 rounded-lg'>
                        <div><ManageAccountsOutlinedIcon/></div>
                        <div>Users</div>
                    </li>
                    <li className='flex flex-row gap-4 hover:bg-[#d1edff] mr-4 p-2 rounded-lg'>
                        <div><ScreenSearchDesktopOutlinedIcon/></div>
                        <div>Dashboard Control Grid</div>
                    </li>
                    <li className='flex flex-row gap-4 hover:bg-[#d1edff] mr-4 p-2 rounded-lg'>
                        <div><MemoryOutlinedIcon/></div>
                        <div>Module Control Grid</div>
                    </li>
                </ul>
    
        </div>
        </div>

        {/* <div className='bg-gray-500 size-auto'></div> */}
        </>

    );
}