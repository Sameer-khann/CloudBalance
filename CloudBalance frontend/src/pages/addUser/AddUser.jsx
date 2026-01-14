// import axios from "axios";
import axios from "../../interceptor/AxiosRequestInterceptor"
import { AccountAssignment } from "../../components/account/AccountAssignment";


import { useEffect, useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

import { toast } from "sonner";


export const AddUser = ({ buttonText, editData }) => {

    // console.log("Editdata ID : ", editData.id);

    const [userFormData, setUserFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        // userName: '',
        password: '',
    });
    const [assignedAccounts, setAssignedAccounts] = useState([]);


    const { setPageTitle } = useOutletContext();

    const navigate = useNavigate();



    useEffect(() => {
        setPageTitle('Add New User');

        if (editData) {
            // console.log("EditData: ", editData)
            setUserFormData({
                firstName: editData.firstName,
                lastName: editData.lastName,
                email: editData.email,
                role: editData.role
            })



            // console.log("editData.assignedAccounts: ", editData.assignedAccounts)

            // if (editData?.role === "Customer") {
            setAssignedAccounts(editData.assignedAccounts || []);
            // }
        }



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editData]);

    //     useEffect(() => {

    // }, [editData]);

    const reduxUser = useSelector(state => state.sidebar.user);

    // const isReadOnly = reduxUser.role == "ReadOnly" ? true : false;

    if (reduxUser.role != 'Admin') {
        return <Navigate to='/dashboard' />
    }


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
            toast.warning("Please choose a role.")
            return;
        }

        if (editData) {

            try {

                const payload = {
                    id: editData.id,
                    ...userFormData,
                    lastLogin: new Date().toISOString(),
                    active: true,
                    assignedAccountIds: userFormData.role == "Customer" ? assignedAccounts.map(account => account.accountId) : []
                }

                console.log("payload: ", payload)

                const res = await axios.put('http://localhost:8080/user', payload,
                    {
                        headers: {
                            "Content-type": "application/json",
                        }
                    }
                )

                if (res.status == 200 || res.status == 201) {
                    toast.success("User Updated successfully")

                    // if (userFormData.role === "Customer") {
                    //     await axios.post("http://localhost:8080/assign", {
                    //         userId: editData.id,
                    //         accountsIds: assignedAccounts.map(acc => acc.id)
                    //     });
                    // }


                    setUserFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        role: ''
                    })
                }

                navigate('/dashboard/user');
            }
            catch (err) {
                console.log("Error : ", err?.response?.data?.message)
                // alert("User is not updated.")
                toast.error(err?.response?.data?.message)
            }

        }

        else {

            try {

                const payload = {
                    ...userFormData,
                    lastLogin: new Date().toISOString(),
                    active: true,
                    assignedAccountIds: userFormData.role == "Customer" ? assignedAccounts.map(account => account.accountId) : []
                }

                const res = await axios.post('http://localhost:8080/user', payload,
                    {
                        headers: {
                            "Content-type": "application/json",
                        }
                    }
                )

                if (res.status == 200 || res.status == 201) {
                    toast.success("User created successfully")

                    // if (userFormData.role === "Customer" && assignedAccounts.length > 0) {
                    //     await axios.post("http://localhost:8080/assign", {
                    //         userId: res.data.id,
                    //         accountsIds: assignedAccounts.map(acc => acc.id)
                    //     }, {
                    //         headers: {
                    //             "Content-type": "application/json",
                    //         }
                    //     });
                    //     alert("Accounts are assigning")
                    // }

                    setUserFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        role: '',
                        // userName: '',
                        password: '',
                    })


                }
                // else{
                //     alert("200 is not getting")
                // }
                navigate('/dashboard/user');
            }
            catch (err) {
                console.log("Error : ", err?.response?.data?.message || "Something went wrong")
                // alert("User is not created.")
                toast.error(err?.response?.data?.message)
            }
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
                            <input className="border border-[#DBDBDB] w-sm p-2 rounded-sm mt-1 placeholder:text-gray-400" type="text" value={userFormData.firstName} name="firstName" onChange={handleInput} placeholder="Enter First name" required />
                        </div>

                        <div>
                            <label htmlFor="">Last Name</label>
                            <br />
                            <input className="border border-[#DBDBDB] w-sm p-2 rounded-sm mt-1 placeholder:text-gray-400" type="text" value={userFormData.lastName} name="lastName" onChange={handleInput} placeholder="Enter Last name" required />
                        </div>

                        <div>
                            <label htmlFor="">E-mail ID</label>
                            <br />
                            <input className="border border-[#DBDBDB] w-sm p-2 rounded-sm mt-1 placeholder:text-gray-400" type="text" value={userFormData.email} name="email" onChange={handleInput} placeholder="Enter Email ID" required />
                        </div>


                        <div>
                            <label htmlFor="">Select Roles</label>
                            <br />
                            <select className="border border-[#DBDBDB] w-sm p-2 rounded-sm mt-1 text-gray-400" type="text" placeholder="Roles" name="role" value={userFormData.role} onChange={handleInput} required >
                                <option value='' disabled hidden className="text-gray-400">Select Roles</option>
                                <option value='Admin' className="text-black">Admin</option>
                                <option value='Customer' className="text-black">Customer</option>
                                <option value='Read-Only' className="text-black">Read Only</option>
                            </select>
                        </div>




                        {!editData && (<>

                            <div>
                                <label htmlFor="">Password</label>
                                <br />
                                <input className="border border-[#DBDBDB] w-sm p-2 rounded-sm mt-1 placeholder:text-gray-400" type="text" value={userFormData.password} name="password" onChange={handleInput} placeholder="Enter Password" required />
                            </div>

                        </>
                        )}

                        {userFormData.role === "Customer" && (
                            <AccountAssignment
                                selectedAccounts={assignedAccounts}
                                setSelectedAccounts={setAssignedAccounts}
                            />
                        )}
                    </div>
                    <div>
                        <button className="bg-blue-800 p-2 rounded-sm cursor-pointer text-white">{buttonText ? buttonText : "Create User"}</button>
                    </div>
                </div>

            </form>
        </>
    );
}