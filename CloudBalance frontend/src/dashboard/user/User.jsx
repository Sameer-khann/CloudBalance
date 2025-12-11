import React from 'react'
import { UserTable } from '../../components/userTable/UserTable';



export const User = () => {
    return (
        <>

            {/* <div className=''>This is User Dashboard</div> */}
            <div className='w-95/100'>
                    <UserTable />
            </div>

        </>
    );
}