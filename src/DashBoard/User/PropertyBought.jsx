import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../useAxiosSecure";
import BoughtPropCard from "./BoughtPropCard";
import { AuthContext } from "../../Authentication/AuthProvider";

const PropertyBought = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const [loadedBoughtProperties, setLoadedBoughtProperties] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/offeredProp?email=${user?.email}`)
        .then(res => {
            console.log(res.data);
            setLoadedBoughtProperties(res.data);
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
                            <th>Image</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Agent</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            loadedBoughtProperties.map(prop=><BoughtPropCard key={prop._id} prop={prop}></BoughtPropCard>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
        </div>
    );
};

export default PropertyBought;