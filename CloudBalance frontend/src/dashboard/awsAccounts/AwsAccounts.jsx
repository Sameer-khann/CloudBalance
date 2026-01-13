import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";



export const AwsAccounts = () => {

    const { setPageTitle } = useOutletContext();
    
        useEffect(() => {
            setPageTitle("AWS Accounts");
    
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

    return (
        <>
            <p>This task is on hold by Bootcamp Owners.</p>
        </>
    )
}