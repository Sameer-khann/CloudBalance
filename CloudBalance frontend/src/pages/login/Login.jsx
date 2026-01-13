import React, { useState } from 'react'

import logo from '../../assets/cloudbalance.png'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from '../../interceptor/AxiosRequestInterceptor'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../../redux/actions'

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emptyEmail, setEmptyEmail] = useState(false)
    const [emptyPassword, setEmptyPassword] = useState(false)

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const authToken = useSelector(state => state.sidebar.user)


    if(authToken && authToken.token){
         return <Navigate to='/dashboard' replace/>
    }
    

    console.log("Auth Token: ", authToken)


    const handleLogin = async () => {

        if (loading) return;

        setLoading(true);

        if (!email) setEmptyEmail(true);
        if (!password) setEmptyPassword(true);

        if (!email || !password) return;

        const loginCredentials = {
            email: email,
            password: password
        }

        try {
            const res = await axios.post("http://localhost:8080/login", loginCredentials, {
                headers: { "Content-Type": "application/json" }
            })

            // if (res.status == 200) {
                // localStorage.setItem("Islogin", "true");
                localStorage.setItem("token", res.data.token);
                navigate('/dashboard')
                dispatch(userData(res.data))
            // }
            // else {
            //     setEmptyName(true)
            //     setEmptyPassword(true)
            // }
            setLoading(false);
        }
        catch (err) {
            alert(err?.response?.data?.message || "Login Failed");
            setLoading(false);
        }


        // if (name && password) {
        //     localStorage.setItem("Islogin", "true");
        //     navigate('/dashboard')
        // }
        // else if(!name){
        //     setEmptyName(true)
        // }
        // else if(!password){
        //     setEmptyPassword(true)
        // }
        // else {
        //     setEmptyName(true)
        //     setEmptyPassword(true)
        // }

        // console.log("name : ", name);
        // console.log("Password : ", password);


    }



    return (
        <>

            <div  >
                <div className='w-dvw h-dvh flex justify-center items-center'>

                    <div className='flex justify-center items-center flex-col mb-30'>

                        <img className='w-60 h-auto' src={logo} alt=" CloudBalance LOGO" />

                        <div className='pb-8'>
                            <label className='text-left text-[14px] text-[#333]' htmlFor="username">Email</label>
                            <br />
                            <input onChange={(e) => setEmail(e.target.value)} className='border border-[#DBDBDB] w-[471px] h-[43px] mt-3.5 rounded-sm px-3 placeholder:text-[#DBDBDB]' id='username' type='text' placeholder='Username' />
                            {emptyEmail &&
                                <p className="text-red-500 text-sm mt-1">This field is required</p>
                            }
                        </div>


                        <div className=''>
                            <label className='text-left text-[14px] text-[#333]' htmlFor="password">Password</label>
                            <br />
                            <input onChange={(e) => setPassword(e.target.value)} className='border border-[#DBDBDB] w-[471px] h-[43px] mt-3.5 rounded-sm px-3 placeholder:text-[#DBDBDB]' id='password' type='password' placeholder='Password' />

                            {emptyPassword &&
                                <p className="text-red-500 text-sm mt-1">This field is required</p>
                            }
                        </div>
                        {/* <a className='text-right text-[#4398d7] font-medium text-xs w-[471px] pt-5' href="">Forgot Password?</a> */}

                        <button type='submit' onClick={handleLogin} className='bg-[#4398d7] text-white text-base w-[471px] h-[43px] rounded-sm mt-8 hover:shadow-lg hover:shadow-[#4398d7]/40 transition-all duration-300' >LOGIN</button>

                    </div>

                </div>

            </div>
        </>
    )
}