import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export const Onboarding = () => {

    const { setPageTitle } = useOutletContext();

    useEffect(() => {
        setPageTitle("");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="bg-gray-50 -mt-6 p-5 -ml-5">

                <div className="">

                <div className="flex flex-row gap-2 ">
                    <div>
                        <img src="" alt="" />
                        <h6>A. Create an IAM Role</h6>
                    </div>
                    <div>
                        <img src="" alt="" />
                        <h6>B. Add Customer Managed Policies</h6>
                    </div>
                    <div>
                        <img src="" alt="" />
                        <h6>C. Create CUR</h6>
                    </div>
                </div>
                </div>

            </div>
        </>
    )
}