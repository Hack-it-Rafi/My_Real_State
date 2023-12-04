import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../useAxiosSecure";
import AddedPropertyCard from "./AddedPropertyCard";
import Swal from "sweetalert2";

const MyAddedProperties = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const [myPropertiesData, setMyPropertiesData] = useState([])
    // const url3 = `/addedProperties?email=${user?.email}`
    useEffect(() => {
        fetch(`https://real-state-server-seven.vercel.app/addedProperties?email=${user?.email}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setMyPropertiesData(data)
            })

        // axiosSecure.get(url3)
        // .then(res => {
        //     console.log(res.data.results);
        //     setMyPropertiesData(res.data.results);
        // })
        // .catch(error => {
        //     console.error("Error fetching property data:", error);
        // });

    }, [])
    console.log("myproperty", myPropertiesData);
    const handleDelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    // Make a DELETE request to the server to delete the data
                    await axiosSecure.delete(`/deleteProperty/${id}`);
                    console.log('Data deleted successfully');
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                    const response = await axiosSecure.get(`/addedProperties?email=${user?.email}`);
                    setMyPropertiesData(response.data);
                } catch (error) {
                    console.error('Error deleting data:', error);
                }
              
            }
          });

      
    }

    return (
        <div>
            <div>
                <h1 className="text-center text-3xl my-10">Property I have added</h1>
                <hr className="w-2/3 m-auto border-2 border-black" />
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4 m-10">
                {
                    myPropertiesData.map(item => <AddedPropertyCard key={item._id} handleDelete={handleDelete} data={item}></AddedPropertyCard>)
                }
            </div>
        </div>
    );
};

export default MyAddedProperties;