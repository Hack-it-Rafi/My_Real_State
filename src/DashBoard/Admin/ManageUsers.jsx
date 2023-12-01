import useAxiosSecure from "../../useAxiosSecure";
import { useEffect, useState } from "react";
import ManageUsersTableRow from "./ManageUsersTableRow";

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
                            loadedUsers.map(user=><ManageUsersTableRow key={user._id} user={user}></ManageUsersTableRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
        </div>
    );
};

export default ManageUsers;