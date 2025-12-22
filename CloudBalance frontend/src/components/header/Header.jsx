import React from 'react'
import logo from '../../assets/cloudbalance.png'

import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarToggle } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
// import { toggleReducer } from '../../redux/reducer';



export const Header = () => {

    const navigate = useNavigate();
    const currUser = useSelector(state => state.sidebar.user);
    const dispatch = useDispatch();

    console.log("currUser : ", currUser);

    const handleLogout = () => {
        localStorage.clear("token");
        navigate('/');
    }



    return (
        <>

            <div className=" w-screen flex items-center justify-between px-6 shadow-lg z-100">
                <div className="flex flex-row items-center gap-7 " >
                    <img className='h-14 my-2 pb-2' src={logo} alt="logo img" />
                    <div onClick={() => dispatch(sidebarToggle())} className='text-[#4398d7]' ><MenuIcon /></div>
                    <div className='mt-4'>
                        <div className='font-medium text-xs' >Module</div>
                        <div className='flex flex-row h-8 '>
                            <div className='font-normal text-base text-[#5c5b5b]'>Lens</div>
                            <div className='font-normal text-xs'><ArrowDropDownIcon/></div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <div className='flex flex-row gap-4'>
                        <div className='flex items-center text-[#0741a7] ' ><PeopleAltOutlinedIcon/></div>
                        <div>
                            <div>Welcome</div>
                            <div className='text-[#0741a7] font-medium text-lg'>{currUser.firstName + ' ' + currUser.lastName} <InfoOutlinedIcon/></div>
                        </div>
                    </div>
                    <div className='w-0.5 h-10 bg-gray-200'></div>
                    <div className='flex flex-row border border-[#0741a7] rounded-sm p-1'>
                        <div className='text-[#0741a7]'><LogoutOutlinedIcon/></div>
                        <div className='text-[#0741a7] cursor-pointer ' onClick={handleLogout}>Logout</div>
                    </div>
                </div>
            </div>
        </>
    )
}