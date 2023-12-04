import Swal from "sweetalert2";

const ManageUsersTableRow = ({ user }) => {
    const { _id,name, email, role } = user;

    const handleAdmin = (id) => {
        console.log(id,"id id");
        fetch(`https://real-state-server-seven.vercel.app/users/admin/${id}`,{
            method:"PATCH"
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${user.name} Is Now An Admin`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const handleAgent = (id) => {
        console.log(id,"id id");
        fetch(`https://real-state-server-seven.vercel.app/users/agent/${id}`,{
            method:"PATCH"
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${user.name} Is Now An Agent`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <tr>
            <td>

                <div className="font-bold">{name}</div>
            </td>
            <td>
                <div className="text-sm opacity-50">{email}</div>
            </td>
            <td>{role}</td>
            <th>
                <div>
                    <button onClick={()=>handleAdmin(_id)} className="btn btn-primary">Admin</button>
                    <button onClick={()=>handleAgent(_id)} className="btn btn-success">Agent</button>
                </div>
            </th>
        </tr>
    );
};

export default ManageUsersTableRow;