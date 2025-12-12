







export const Table = ({ columns, data }) => {
    return (
        <div className="overflow-x-auto w-full bg-white shadow rounded-lg ">
            <table className="min-w-full border-collapse">

                <thead >
                    <tr className="bg-blue-100 border-b ">
                        {columns.map((col) => (
                            <th
                                key={col.colName}
                                className="text-left px-4 py-3 font-semibold text-[#02008b] "
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* <div className="w-full bg-white h-0.5"></div> */}

                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className=" hover:bg-gray-50 odd:bg-gray-100">
                            {columns.map((col) => (
                                <td key={col.colName} className="px-4 py-2">

                                    {col.render
                                        ? col.render(row[col.colName], row)
                                        : row[col.colName]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};
