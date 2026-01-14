import React from 'react'
import { UserTable } from '../../components/userTable/UserTable';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';



export const User = () => {

    const reduxUser = useSelector(state => state.sidebar.user)

    if(reduxUser.role == 'Customer'){
        return <Navigate to='/dashboard/costexplorer' />
    }
    return (
        <>

            {/* <div className=''>This is User Dashboard</div> */}
            <div className='w-95/100'>
                    <UserTable />
            </div>

        </>
    );
}