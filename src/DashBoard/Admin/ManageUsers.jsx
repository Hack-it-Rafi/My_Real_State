import useAxiosSecure from "../../useAxiosSecure";
import { useEffect, useState } from "react";
import ManageUsersTableRow from "./ManageUsersTableRow";
import Swal from "sweetalert2";


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [loadedUsers, setLoadedUsers] = useState([]);
    useEffect(() => {
        axiosSecure.get("/users")
        .then(res => {
            console.log(res.data);
            setLoadedUsers(res.data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

    }, [axiosSecure]);


    const handleAdmin = (id) => {
        console.log(id,"id id");
        fetch(`http://localhost:5000/users/admin/${id}`,{
            method:"PATCH"
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                axiosSecure.get("/users")
                .then(res => {
                    console.log(res.data);
                    setLoadedUsers(res.data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `This person is now an Admin`,
                    showConfirmButton: false,
                    timer: 1500
                })

            }
        })
    }

    const handleAgent = (id) => {
        console.log(id,"id id");
        fetch(`http://localhost:5000/users/agent/${id}`,{
            method:"PATCH"
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `This person is now an Agent`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    const handleFraud = (id) => {
        console.log(id,"id id");
        fetch(`http://localhost:5000/users/fraudAgent/${id}`,{
            method:"PATCH"
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `This person marked as fraud`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }



    return (
        <div>
            <div className="max-w-7xl mx-auto">
            <div className="w-full flex justify-center mb-16">
                <h1 className="text-4xl font-semibold bg-gradient-to-r from-orange-900 via-orange-500 to-orange-400 inline-block text-transparent bg-clip-text">All Your Bids Here</h1>
            </div>
            <div className="overflow-x-auto md:min-h-[200px]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            loadedUsers.map(item => 
                                <tr key={item._id}>
            <td>

                <div className="font-bold">{item.name}</div>
            </td>
            <td>
                <div className="text-sm opacity-50">{item.email}</div>
            </td>
            <td>{item.role}</td>
            <th>
                {
                    item.role !== 'fraudAgent' ? 
                    <div className="flex">
                    {
                        item.role === 'admin' ? <></> : <div><button onClick={()=>handleAdmin(item._id)} className="btn btn-sm btn-primary">Make Admin</button>
                        <button onClick={()=>handleAgent(item._id)} className="btn btn-sm btn-success">Make Agent</button></div>
                    }
                    {
                        (item.role === 'agent' && <button onClick={()=>handleFraud(item._id)} className="btn btn-sm btn-warning">Mark Fraud</button>)

                    }
                    <button className="btn btn-sm btn-error">Delete User</button>
                </div> :
                <></>
                }
            </th>
        </tr>
                                )
                            // loadedUsers.map(user=><ManageUsersTableRow key={user._id} user={user}></ManageUsersTableRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
        </div>
    );
};

export default ManageUsers;


// import { useQuery } from '@tanstack/react-query'
// import React from 'react'


// const ManageUsers = () => {
//   const token = localStorage.getItem('access-token')
  
//   const { data: users=[], refetch } = useQuery(['users'], async () => {
//     const result = await fetch('http://localhost:5000/users')
//     return result.json()
//   })
// //   {
// //     headers:{
// //       authorization : `bearer ${token}`
// //     }
// //   }
//   console.log(users)



//   return (
//     <div>

//       <div>
//         <h1 className='text-3xl text-center text-orange-500 md:my-10'>Total Users : {users.length}</h1>
//       </div>
//       <div className='overflow-auto' >
//         <div className="overflow-x-auto">
//           <table className="table">
//             {/* head */}
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Name</th>
//                 <th>Status</th>
//                 <th>Make Admin</th>
//                 <th>Make Instructor</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* row 1 */}
//               {
//                 users.map((item,index) => <ManageUsersTableRow
//                 key={index}
//                 data = {item}
//                 order = {index}
//                 refetch = {refetch}
//                 ></ManageUsersTableRow>)
//               }
//             </tbody>
//           </table>
//         </div>
//       </div>


//     </div>
//   )
// }

// export default ManageUsers