import { Table } from "../table/Table";
import { userTableStructure } from "../../utils/userTableStructure/UserTableStructure";
import { useNavigate, useOutletContext } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import axios from "axios";

export const UserTable = () => {
    

    const [users, setUser] = useState([]);

    useEffect(() => {

        const getAllUsers = async () => {

            try {
                const res = await axios.get("http://localhost:8080/user/alluser");
                setUser(res.data);
            }
            catch (err) {
                console.log("Error : ", err);
            }
        }

        getAllUsers();

    }, [])

    const { setPageTitle } = useOutletContext();


    useEffect(() => {
        setPageTitle('Users ');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigate = useNavigate();

    const addUser = () => {
        navigate('/dashboard/adduser')
    }


    return (
        <>
            <div className="w-full bg-white p-3">
                <button className="bg-blue-800 p-2 mb-3 text-white cursor-pointer flex flex-row gap-2 items-center justify-center" onClick={addUser}>

                    <div><AddIcon /></div>
                    <p>Add new user</p>
                </button>
                <Table columns={userTableStructure} data={users} />
            </div>

        </>);
};
