import { useState } from 'react';
import useAxiosSecure from '../../useAxiosSecure';
import { toast } from 'react-toastify';

const ManagePropCard = ({prop}) => {

    const {_id,image,title,location,agent,description,priceRange,verificationStatus,addedFrom} = prop
    const [show,setShow] = useState(true)

    const axiosSecure = useAxiosSecure()
//Todo: refetch data in manageProperty to show real time data...take the buttons here as prop and use this to make refetch easier
    const handleVerify = async (id) => {
        const newData = {
            title,
            image,
            agent,
            location,
            description,
            verificationStatus: "Verified",
            addedFrom,
            priceRange
        }
        try {
            // Make a PUT request to the server to update the data
            await axiosSecure.put(`/updateProperty/${id}`,  newData );
            console.log('Data updated successfully');
            setShow(!show)
            toast.success('🦄 The property has been verified!   ', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    const handleReject = async (id) => {
        const newData = {
            title,
            image,
            agent,
            location,
            description,
            verificationStatus: "Rejected",
            addedFrom,
            priceRange
        }
        try {
            // Make a PUT request to the server to update the data
            await axiosSecure.put(`/updateProperty/${id}`,  newData );
            console.log('Data updated successfully');
            setShow(!show)
            toast.warn('This property has been rejected', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }


    return (
        <tr>
            <td>
                <div className="font-bold">{title}</div>
            </td>
            <td>
                <div className="text-sm opacity-50">{location}</div>
            </td>
            <td>{agent.name} <br /> {addedFrom}</td>
            <td>{priceRange}</td>
            <td>{verificationStatus}</td>
            <th>
                {
                    (verificationStatus === 'Pending' && show)  ?
                        <>
                            <div className="flex gap-2">
                                <button onClick={()=>handleVerify(_id)} className="btn btn-sm btn-primary">Verify</button>
                            <button onClick={() => handleReject(_id)} className="btn btn-sm btn-error">Reject</button>
                            </div>
                        </>
                        :
                        <></>
                }
            </th>
        </tr>
    );
};

export default ManagePropCard;