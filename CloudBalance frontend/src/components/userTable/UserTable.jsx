import { Table } from "../table/Table";
import { userTableStructure } from "../../utils/userTableStructure/UserTableStructure";
import { useNavigate, useOutletContext } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
// import axios from "axios";

import axios from "../../interceptor/AxiosRequestInterceptor"
import { useSelector } from "react-redux";

import { toast } from "sonner";

export const UserTable = () => {


    const [users, setUser] = useState([]);
    const { setPageTitle } = useOutletContext();
    const navigate = useNavigate();

    const reduxUser = useSelector(state => state.sidebar.user)

    const isReadOnly = reduxUser.role == 'ReadOnly' ? true : false;

    // const token = localStorage.getItem("token");
    // console.log("token" , token);

    useEffect(() => {

        const getAllUsers = async () => {



            try {
                const res = await axios.get("http://localhost:8080/user");
                setUser(res.data);
            }
            catch (err) {
                console.log("Error : ", err);
            }
        }

        getAllUsers();

    }, [])

    useEffect(() => {
        setPageTitle('Users ');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const addUser = () => {
        navigate('/dashboard/adduser')
    }

    const handleEditUser = (row) => {

        navigate("/dashboard/edituser", {
            state: { user: row },
        })

    }

    const handleDeleteUser = async (row) => {

        // console.log("deleted row id : ", row.id);

        if (row.role == 'Admin') {
            toast.error("Admin users cannot be deleted");
            return;
        }

        try {
            await axios.delete(`/user/${row.id}`);

            // if (res.status == 200) {
            toast.success("User deleted successfully");

            setUser(prev => prev.filter(users => users.id != row.id));
            // }
            // else {
            // alert("User not deleted");
            // }
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Delete Failed")
        }
    }

    const columns = userTableStructure(handleEditUser, handleDeleteUser, isReadOnly);

    return (
        <>
            <div className="w-full bg-white p-3">
                {!isReadOnly &&
                    <button className="bg-blue-800 p-2 mb-3 text-white cursor-pointer flex flex-row gap-2 items-center justify-center" onClick={addUser}>

                        <div><AddIcon /></div>
                        <p>Add new user</p>
                    </button>
                }
                <Table columns={columns} data={users} />
            </div>

        </>
    );
};
