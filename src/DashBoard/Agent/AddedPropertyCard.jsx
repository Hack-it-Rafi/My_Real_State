import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineVerified } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { CgSearchLoading } from "react-icons/cg";
import useAxiosSecure from '../../useAxiosSecure';
import { Button } from 'flowbite-react';





const AddedPropertyCard = ({ data,handleDelete }) => {
    const { _id,image, title, location, agent, priceRange,addedFrom, verificationStatus } = data
    const axiosSecure = useAxiosSecure()
//Todo: update functioanility with modal
//Todo: alert after update and delete
    const handleUpdate = async (id) => {
        const newData = {
            title: title,
            image: image,
            agent: {
                name: agent.name,
                image: agent.image
            },
            location: location,
            description: "testing updating data",
            verificationStatus: verificationStatus,
            addedFrom: addedFrom,
            priceRange: priceRange
        }
        try {
            // Make a PUT request to the server to update the data
            await axiosSecure.put(`/updateProperty/${id}`,  newData );
            console.log('Data updated successfully');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    


    return (
        <div>
            <div className="card w-88 bg-base-100 shadow-xl  text-gray-600">
                <figure><img src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <div className='flex items-center gap-2'>
                        <FaLocationDot />
                        <p>{location}</p>
                    </div>
                    <div className="avatar flex items-center gap-2">
                        <div className="w-12 rounded-full">
                            <img src={agent.image} />
                        </div>
                        <p className='font-semibold'>{agent.name}</p>
                    </div>
                    <div>
                        {
                            (verificationStatus === "Verified" &&
                                <div className='flex items-center text-green-500 font-semibold gap-1'>
                                    <MdOutlineVerified className='text-2xl' />
                                    <p>Verified</p>
                                </div>
                            )
                            ||
                            (verificationStatus === "Pending" &&
                                <div className='flex items-center text-yellow-300 font-semibold gap-1'>
                                    <CgSearchLoading className='text-2xl' />
                                    <p>Pending</p>
                                </div>
                            )
                            ||
                            (verificationStatus === "Rejected" &&
                                <div className='flex items-center text-red-500 font-semibold gap-1'>
                                    <RxCrossCircled className='text-2xl' />
                                    <p>Rejected</p>
                                </div>
                            )
                        }



                    </div>
                    <div className='flex items-center gap-1'>
                        <GiTakeMyMoney className='text-3xl'></GiTakeMyMoney>
                        <p className='font-bold text-gray-600'>{priceRange}</p>
                    </div>
                    <div className="card-actions justify-end">
                        <Button className="" onClick={()=>handleUpdate(_id)}>Update</Button>
                        <button className="btn btn-error" onClick={()=> handleDelete(_id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddedPropertyCard;

