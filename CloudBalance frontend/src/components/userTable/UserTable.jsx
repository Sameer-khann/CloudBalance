import { Table } from "../table/Table";
import { userTableStructure } from "../../utils/userTableStructure/UserTableStructure";
import { useNavigate, useOutletContext } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
// import axios from "axios";

import axios from "../../interceptor/AxiosRequestInterceptor"

export const UserTable = () => {
    

    const [users, setUser] = useState([]);
    const { setPageTitle } = useOutletContext();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
            console.log("token" , token);
    
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
            state: {user : row},
        })

    }

    const handleDeleteUser = async (row) => {

        // console.log("deleted row id : ", row.id);
        
        try{
            const res = await axios.delete(`http://localhost:8080/user/${row.id}`);

            if(res.status == 200){
                alert("User Updated successfully");

                setUser(prev => prev.filter(users => users.id != row.id));
            }
            else{
                alert("User not deleted");
            }
        }
        catch(err){
            alert(err);
        }
    }

    const columns = userTableStructure(handleEditUser, handleDeleteUser);

    return (
        <>
            <div className="w-full bg-white p-3">
                <button className="bg-blue-800 p-2 mb-3 text-white cursor-pointer flex flex-row gap-2 items-center justify-center" onClick={addUser}>

                    <div><AddIcon /></div>
                    <p>Add new user</p>
                </button>
                <Table columns={columns} data={users} />
            </div>

        </>);
};
