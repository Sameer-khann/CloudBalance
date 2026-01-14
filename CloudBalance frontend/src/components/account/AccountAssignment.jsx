import { useEffect, useState } from "react";
import axios from "../../interceptor/AxiosRequestInterceptor";

export const AccountAssignment = ({ selectedAccounts, setSelectedAccounts }) => {

    const [availableAccounts, setAvailableAccounts] = useState([]);

    console.log("selectedAccounts: ", selectedAccounts);


    console.log("availableAccounts: ",availableAccounts);
    console.log("selectedAccounts: ",selectedAccounts);

    useEffect(() => {
        let isMounted = true;

        const fetchAccounts = async () => {
            try {
                const res = await axios.get("/account");

                if (!isMounted) return;

                const selectedIds = new Set(selectedAccounts.map(acc => acc.accountId));

                const unassigned = res.data.filter(
                    acc => !selectedIds.has(acc.accountId)
                );

                setAvailableAccounts(unassigned);
            } catch (err) {
                console.error("Failed to load accounts : ", err);
            }
        };

        fetchAccounts();

        return () => {
            isMounted = false;
        };
    }, [selectedAccounts]);


    // useEffect(() => {
    //     let isMounted = true;

    //     const fetchAccounts = async () => {
    //         try {
    //             const res = await axios.get("/account");
    //             if (isMounted) {
    //                 setAvailableAccounts(res.data);
    //                 console.log("Response Data : ", res.data)
    //             }
    //         } catch (err) {
    //             console.error("Failed to load accounts : ", err);
    //         }
    //     };

    //     fetchAccounts();

    //     return () => {
    //         isMounted = false;
    //     };
    // }, []);



    // const fetchAccounts = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:8080/account");
    //         setAvailableAccounts(res.data);
    //     } catch (err) {
    //         console.error("Failed to load accounts");
    //     }
    // };

    // useEffect(() => {
    //     fetchAccounts();
    // }, []);

    const assignAccount = (account) => {
        console.log("assignAccount called")
        console.log("SelectedAccounts before setting assignAccount: ", selectedAccounts)
        setSelectedAccounts(prev => [...prev, account]);
        setAvailableAccounts(prev => prev.filter(a => a.accountId !== account.accountId));
        console.log("SelectedAccounts before setting assignAccount: ", selectedAccounts)
    };

    const unAssignAccount = (account) => {
        console.log("unAssignAccount called")
        setAvailableAccounts(prev => [...prev, account]);
        setSelectedAccounts(prev => prev.filter(a => a.accountId !== account.accountId));
    };

    return (
        <div className="grid grid-cols-3 gap-6 mt-6 border" >
            <div className="flex items-center  flex-col">
                <h3 className="font-semibold mb-2 sticky top-0 bg-white z-10 pt-2">
                    Available Accounts ({availableAccounts.length})
                </h3>

                <div className="bg-white p-4 rounded max-h-80 overflow-y-auto">

                    {availableAccounts.map(acc => (
                        <div
                            key={acc.accountId}
                            className="flex justify-between items-center p-2 border mb-2 cursor-pointer gap-3"
                        >
                            <span>{acc.accountName}</span>
                            <button
                                className="text-blue-600"
                                onClick={() => assignAccount(acc)}
                            >
                                →
                            </button>
                        </div>
                    ))}
                </div>
            </div>


            <div className="flex items-center justify-center">
                <span className="text-gray-400">Assign / Unassign</span>
            </div>

            <div className="flex items-center flex-col">
                <h3 className="font-semibold mb-2 sticky top-0 bg-white z-10 pt-2">
                    Assigned Accounts ({selectedAccounts.length})
                </h3>

                <div className="bg-white p-4 rounded max-h-80 overflow-y-auto">

                    {selectedAccounts.map(acc => (
                        <div
                            key={acc.accountId}
                            className="flex justify-between items-center p-2 border mb-2 cursor-pointer gap-3"
                        >
                            <button
                                className="text-red-600"
                                onClick={() => unAssignAccount(acc)}
                            >
                                ←
                            </button>
                            <span>{acc.accountName}</span>
                        </div>
                    ))}
                </div>

            </div>


        </div>
    );
};
