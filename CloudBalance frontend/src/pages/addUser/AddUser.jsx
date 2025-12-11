import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";


export const AddUser = () => {

    const [userFormData, setUserFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    });

    const {setPageTitle} = useOutletContext();

    useEffect(() => {
        setPageTitle('Add New User');
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUserFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userFormData.role) {
            alert("Please choose a role.")
            return;
        }

        try {
            const res = await axios.post('http://localhost:8080/user', userFormData,
                {
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            )

            if (res.statas == 200 || res.status == 201) {
                alert("User created successfully")
                setUserFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: ''
                })
            }
        }
        catch(err){
            console.log("Error : ", err)
            alert("User is not created.")
        }


    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className="flex flex-wrap flex-col gap-5 bg-white p-6">
                    <div className="grid grid-cols-2 gap-y-6 ">
                        <div>
                            <label htmlFor="">First Name</label>
                            <br />
                            <input className="border border-[#DBDBDB] w-sm p-2 rounded-sm mt-1 placeholder:text-gray-400" type="text" onChange={handleInput} placeholder="Enter First name" required />
                        </div>

                        <div>
                            <label htmlFor="">Last Name</label>
                            <br />
                            <input className="border border-[#DBDBDB] w-sm p-2 rounded-sm mt-1 placeholder:text-gray-400" type="text" onChange={handleInput} placeholder="Enter Last name" required />
                        </div>

                        <div>
                            <label htmlFor="">E-mail ID</label>
                            <br />
                            <input className="border border-[#DBDBDB] w-sm p-2 rounded-sm mt-1 placeholder:text-gray-400" type="text" onChange={handleInput} placeholder="Enter Email ID" required />
                        </div>

                        <div>
                            <label htmlFor="">Select Roles</label>
                            <br />
                            <select className="border border-[#DBDBDB] w-sm p-2 rounded-sm mt-1 text-gray-400" type="text" placeholder="Roles" onChange={handleInput} required >
                                <option value='' disabled selected hidden className="text-gray-400">Select Roles</option>
                                <option value='admin' className="text-black">Admin</option>
                                <option value='customer' className="text-black">Customer</option>
                                <option value='readOnly' className="text-black">Read Only</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button className="bg-blue-800 p-2 rounded-sm cursor-pointer text-white">Create User</button>
                    </div>
                </div>

            </form>
        </>
    );
}