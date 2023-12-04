import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../useAxiosSecure";
import RequestedPropCard from "./RequestedPropCard";

const RequestedProperties = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const [loadedOfferedProperties, setLoadedOfferedProperties] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/myOfferedProp?email=${user?.email}`)
        .then(res => {
            console.log(res.data);
            setLoadedOfferedProperties(res.data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

    }, [axiosSecure, user]);
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
                            <th>Title</th>
                            <th>Location</th>
                            <th>Buyer Email</th>
                            <th>Buyer Name</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            loadedOfferedProperties.map(prop=><RequestedPropCard key={prop._id} prop={prop}></RequestedPropCard>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
        </div>
    );
};

export default RequestedProperties;