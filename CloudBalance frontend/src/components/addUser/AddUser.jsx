

export const AddUser = () => {
    return (
        <>
            <form >

                <div className="flex flex-wrap justify-center gap-5">
                    <div>
                        <label htmlFor="">First Name</label>
                        <br />
                        <input className="border border-[#DBDBDB] " type="text" placeholder="First name" required />
                    </div>

                    <div>
                        <label htmlFor="">Last Name</label>
                        <br />
                        <input className="border border-[#DBDBDB]" type="text" placeholder="last name" required />
                    </div>

                    <div>
                        <label htmlFor="">E-mail ID</label>
                        <br />
                        <input className="border border-[#DBDBDB]" type="text" placeholder="Email ID" required />
                    </div>

                    <div>
                        <label htmlFor="">Select Roles</label>
                        <br />
                        <input className="border border-[#DBDBDB]" type="text" placeholder="Roles" required />
                    </div>
                </div>

            </form>
        </>
    );
}