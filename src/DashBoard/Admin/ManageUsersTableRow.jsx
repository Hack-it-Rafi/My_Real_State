const ManageUsersTableRow = ({ user }) => {
    const { name, email, role } = user;
    return (
        <tr>
            <td>

                <div className="font-bold">{name}</div>
            </td>
            <td>
                <div className="text-sm opacity-50">{email}</div>
            </td>
            <td>{role}</td>
            {/* <th>
                {
                    (updateStatus === 'In Progress') ?
                        <button onClick={handleUpdate} className="btn bg-green-600 hover:bg-green-400 text-white">Complete</button>
                        :
                        <></>
                }
            </th> */}
        </tr>
    );
};

export default ManageUsersTableRow;