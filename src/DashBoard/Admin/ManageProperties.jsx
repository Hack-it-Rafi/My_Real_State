import axios from "axios";
import { useEffect, useState } from "react";
import ManagePropCard from "./ManagePropCard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ManageProperties = () => {

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Use an asynchronous function inside useEffect to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get("https://real-state-server-seven.vercel.app/properties");
                console.log(response.data);
                setProperties(response.data); //setProperties(response.data.slice(0, 4))
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Call the asynchronous function
        fetchData();
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <div>
            <div className="overflow-x-auto md:min-h-[200px]">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Agent Info</th>
                            <th>Price Range</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            properties.map(prop => <ManagePropCard key={prop._id} prop={prop}></ManagePropCard>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageProperties;