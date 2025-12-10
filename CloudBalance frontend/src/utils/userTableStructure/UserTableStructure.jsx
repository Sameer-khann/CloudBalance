import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";

export const userTableStructure = [
  { header: "First Name", colName: "firstName" },
  { header: "Last Name", colName: "lastName" },
  { header: "Email", colName: "email" },

  {
    header: "Roles",
    colName: "roles",
    render: (roles) => (
      <div className="flex gap-2 flex-wrap">
        {roles.map((role, i) => (
          <span
            key={i}
            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600"
          >
            {role}
          </span>
        ))}
      </div>
    ),
  },

  {
    header: "Last Login",
    colName: "lastLogin",
    render: (value) => (
      <span className="text-gray-700">
        {new Date(value).toLocaleString()}
      </span>
    ),
  },

  {
    header: "Active",
    colName: "active",
    render: (value, row) => (
      <Switch defaultChecked={value} onChange={() => console.log(row)} />
    ),
  },

  {
    header: "Edit",
    colName: "edit",
    render: (_, row) => (
      <button onClick={() => console.log("Edit:", row)}>
        <EditIcon className="text-blue-800 cursor-pointer" />
      </button>
    ),
  },

  {
    header: "Delete",
    colName: "delete",
    render: (_, row) => (
      <button onClick={() => console.log("DELETE:", row)}>
        <DeleteIcon className="text-blue-800 cursor-pointer" />
      </button>
    ),
  },
];
