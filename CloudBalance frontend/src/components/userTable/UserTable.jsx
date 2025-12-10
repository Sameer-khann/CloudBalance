import { Table } from "../table/Table";
import { userTableStructure } from "../../utils/userTableStructure/UserTableStructure";
import { useNavigate } from "react-router-dom";

export const UserTable = () => {
    const users = [
        {
            firstName: "Samir",
            lastName: "Khan",
            email: "samir@example.com",
            roles: ["Admin", "Customer"],
            lastLogin: "2025-01-05T08:30:00",
            active: true,
        },
        {
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            roles: ["Read-Only"],
            lastLogin: "2025-01-04T14:20:00",
            active: false,
        },
        {
            firstName: "Ayesha",
            lastName: "Patel",
            email: "ayesha.patel@example.com",
            roles: ["Customer"],
            lastLogin: "2025-01-03T16:45:00",
            active: true,
        },
        {
            firstName: "Rohit",
            lastName: "Sharma",
            email: "rohit.sharma@example.com",
            roles: ["Admin"],
            lastLogin: "2025-01-06T10:15:00",
            active: true,
        },
        {
            firstName: "Emily",
            lastName: "Clark",
            email: "emily.clark@example.com",
            roles: ["Read-Only"],
            lastLogin: "2025-01-02T09:10:00",
            active: false,
        },
        {
            firstName: "David",
            lastName: "Wilson",
            email: "david.wilson@example.com",
            roles: ["Customer"],
            lastLogin: "2025-01-07T08:05:00",
            active: true,
        },
        {
            firstName: "Leena",
            lastName: "Mehta",
            email: "leena.mehta@example.com",
            roles: ["Customer"],
            lastLogin: "2025-01-04T12:22:00",
            active: true,
        },
        {
            firstName: "Chris",
            lastName: "Miller",
            email: "chris.miller@example.com",
            roles: ["Admin"],
            lastLogin: "2025-01-06T18:32:00",
            active: true,
        },
        {
            firstName: "Sophia",
            lastName: "Lee",
            email: "sophia.lee@example.com",
            roles: ["Read-Only", "Customer"],
            lastLogin: "2025-01-01T14:55:00",
            active: false,
        },
        {
            firstName: "Raj",
            lastName: "Verma",
            email: "raj.verma@example.com",
            roles: ["Customer"],
            lastLogin: "2025-01-03T17:40:00",
            active: true,
        },
        {
            firstName: "Michael",
            lastName: "Brown",
            email: "michael.brown@example.com",
            roles: ["Admin"],
            lastLogin: "2025-01-05T11:21:00",
            active: true,
        },
        {
            firstName: "Nina",
            lastName: "Singh",
            email: "nina.singh@example.com",
            roles: ["Customer"],
            lastLogin: "2025-01-04T08:19:00",
            active: false,
        },
        {
            firstName: "Oliver",
            lastName: "Davis",
            email: "oliver.davis@example.com",
            roles: ["Read-Only"],
            lastLogin: "2025-01-02T20:00:00",
            active: true,
        },
        {
            firstName: "Aman",
            lastName: "Gupta",
            email: "aman.gupta@example.com",
            roles: ["Customer"],
            lastLogin: "2025-01-03T07:14:00",
            active: true,
        },
        {
            firstName: "Sarah",
            lastName: "Walker",
            email: "sarah.walker@example.com",
            roles: ["Admin", "Customer"],
            lastLogin: "2025-01-07T09:45:00",
            active: true,
        },
        {
            firstName: "Karan",
            lastName: "Malhotra",
            email: "karan.malhotra@example.com",
            roles: ["Read-Only"],
            lastLogin: "2025-01-06T15:28:00",
            active: false,
        },
        {
            firstName: "Julia",
            lastName: "Adams",
            email: "julia.adams@example.com",
            roles: ["Customer"],
            lastLogin: "2025-01-04T13:10:00",
            active: true,
        },
        {
            firstName: "Vikram",
            lastName: "Sethi",
            email: "vikram.sethi@example.com",
            roles: ["Admin"],
            lastLogin: "2025-01-05T16:37:00",
            active: true,
        },
        {
            firstName: "Helen",
            lastName: "Moore",
            email: "helen.moore@example.com",
            roles: ["Read-Only"],
            lastLogin: "2025-01-01T11:50:00",
            active: false,
        },
        {
            firstName: "Tina",
            lastName: "Kapoor",
            email: "tina.kapoor@example.com",
            roles: ["Customer"],
            lastLogin: "2025-01-07T08:55:00",
            active: true,
        }
    ];

    const navigate = useNavigate();

    const addUser = () => {
        navigate('/dashboard/adduser')
    }


    return (
        <>
            <div className="p-1">
                <button className="bg-blue-800  rounded-sm p-1 m-2 text-white cursor-pointer" onClick={addUser}>Add user</button>
                <Table columns={userTableStructure} data={users} />
            </div>

        </>);
};
