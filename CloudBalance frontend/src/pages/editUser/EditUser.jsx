import { useLocation, useOutletContext } from "react-router-dom"
import { AddUser } from "../addUser/AddUser"
import { useEffect } from "react";
// import axios from "axios";


export const EditUser = () => {


    const { setPageTitle } = useOutletContext();
    const location = useLocation();

    const user = location.state?.user;

    useEffect(() => {
        setPageTitle("Edit User")

        // const getUserData = async () =>{
        //     try{
        //         const res = await axios("http://localhost:8080/user/userdata")
        //     }
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <AddUser buttonText="Update User" editData={user}/>
        </>
    )
}