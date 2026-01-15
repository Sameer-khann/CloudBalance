import React, { useEffect, useState } from 'react'

import { toast } from 'sonner'

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

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const authToken = useSelector(state => state.sidebar.user)


    // if (authToken && authToken.token) {

    //     if (authToken.role != 'Customer') {
    //         return <Navigate to='/dashboard' replace />
    //     }
    //     else {
    //         return <Navigate to='/dashboard/costexplorer' replace />
    //     }
    // }

    useEffect(() => {
        if (authToken?.token) {
            if (authToken.role !== "Customer") {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/dashboard/costexplorer", { replace: true });
            }
        }
    }, [authToken, navigate]);

    console.log("Auth Token: ", authToken)


    const handleLogin = async () => {

        if (loading) return;

        if (!email || !password) {
            setEmptyEmail(!email);
            setEmptyPassword(!password);
            return;
        }

        setLoading(true);

        const loginCredentials = {
            email: email,
            password: password
        }

        try {
            const res = await axios.post("http://localhost:8080/login", loginCredentials, {
                headers: { "Content-Type": "application/json" }
            })


            localStorage.setItem("token", res.data.token);
            console.log("Role: ", res.data.role);
            if (res.data.role != 'Customer') {
                navigate('/dashboard')
            }
            else {
                navigate('/dashboard/costexplorer')
            }
            dispatch(userData(res.data))

            setLoading(false);
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Login Failed");
            setLoading(false);
        }


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


                        <div className='relative'>
                            <label className='text-left text-[14px] text-[#333]' htmlFor="password">Password</label>
                            <br />
                            <input
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-[#DBDBDB] w-[471px] h-[43px] mt-3.5 rounded-sm px-3"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(p => !p)}
                                className="text-sm text-blue-600 mt-1 absolute bottom-3 right-3"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>




                            {emptyPassword &&
                                <p className="text-red-500 text-sm mt-1">This field is required</p>
                            }
                        </div>

                        <button
                            type="button"
                            onClick={handleLogin}
                            disabled={loading}
                            className={`
                                  bg-[#4398d7] text-white text-base w-[471px] h-[43px] rounded-sm mt-8 transition-all duration-300 ${loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg hover:shadow-[#4398d7]/40"}`}>
                            {loading ? "Logging in..." : "LOGIN"}
                        </button>


                    </div>

                </div>

            </div>
        </>
    )
}