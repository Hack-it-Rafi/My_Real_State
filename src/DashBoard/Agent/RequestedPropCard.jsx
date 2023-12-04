import { Button } from "flowbite-react";
import useAxiosSecure from "../../useAxiosSecure";

const RequestedPropCard = ({ prop }) => {
    const { _id, title, agent, propId, image, date, location, amount, buyerMail, buyerName, status } = prop;
    const axiosSecure = useAxiosSecure();

    const handleAccept = async (event) => {
        // event.preventDefault()
        const newData = {
            title,
            propId,
            image,
            agent,
            status: 'accepted',
            location,
            buyerName,
            buyerMail,
            date,
            amount
        }
        try {
            // Make a PUT request to the server to update the data
            await axiosSecure.put(`/offeredProp/${_id}`, newData);
            console.log('Data updated successfully');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }
    const handleReject = async(event) => {
        event.preventDefault()
        const newData = {
            title,
            propId,
            image,
            agent,
            status: 'rejected',
            location,
            buyerName,
            buyerMail,
            date,
            amount
        }
        try {
            // Make a PUT request to the server to update the data
            await axiosSecure.put(`/offeredProp/${_id}`, newData);
            console.log('Data updated successfully');
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
            <td>{buyerMail}</td>
            <td>{buyerName}</td>
            <td>${amount}</td>
            <th>
                {
                    (status === 'pending') ?
                        <>
                            <div className="flex gap-2">
                            <Button className="btn-sm " onClick={() => handleAccept(_id)}>Accept</Button>
                            <button className="btn btn-sm btn-error" onClick={() => handleReject(_id)}>Reject</button>
                            </div>
                        </>
                        :
                        <></>
                }
            </th>
        </tr>
    );
};

export default RequestedPropCard;