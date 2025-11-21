import React from 'react'

import logo from '../../assets/cloudbalance.png'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate();


    const handleLogin = () => {
        localStorage.setItem("Islogin", "true");
        navigate('/dashboard')
    }



    return (
        <>

            <div className='w-dvw h-dvh flex justify-center items-center'>

                <div className='flex justify-center items-center flex-col mb-30'>

                    <img className='w-60 h-auto' src={logo} alt=" CloudBalance LOGO" />

                    <div className='pb-8'>
                        <label className='text-left text-[14px] text-[#333]' htmlFor="username">Username</label>
                        <br />
                        <input className='border border-[#DBDBDB] w-[471px] h-[43px] mt-3.5 rounded-sm px-3 placeholder:text-[#DBDBDB]' id='username' type='text' placeholder='Username' />
                    </div>


                    <div className=''>
                        <label className='text-left text-[14px] text-[#333]' htmlFor="password">Password</label>
                        <br />
                        <input className='border border-[#DBDBDB] w-[471px] h-[43px] mt-3.5 rounded-sm px-3' id='password' type='passwrod' placeholder='Password' />
                    </div>
                    <a className='text-right text-[#4398d7] font-medium text-xs w-[471px] pt-5' href="">Forgot Password?</a>

                    <button onClick={handleLogin} className='bg-[#4398d7] text-white text-base w-[471px] h-[43px] rounded-sm mt-8 hover:shadow-lg hover:shadow-[#4398d7]/40 transition-all duration-300' >LOGIN</button>

                </div>

            </div>
        </>
    )
}