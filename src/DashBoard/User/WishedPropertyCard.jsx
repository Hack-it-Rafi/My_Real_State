import { Button, Modal } from 'flowbite-react';
import { useContext, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { AuthContext } from '../../Authentication/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../useAxiosSecure';


const WishedPropertyCard = ({ data }) => {
    const { image, title, location, agent, verificationStatus, priceRange, propId, ownerEmail } = data;
    const [openModal, setOpenModal] = useState(false);
    const [active,setActive] = useState(true)
    const { user } = useContext(AuthContext);
    console.log(data.propId);
    function onCloseModal() {
        setOpenModal(false);
    }
    const axiosSecure = useAxiosSecure();

    const handleDeleteWish = ()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/wishList/${data._id}`)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire({
                            title: 'Delete Successful!',
                            text: 'Enjoy Exploring!',
                            icon: 'success',
                            confirmButtonText: 'Continue'
                        })
                    })
                    .catch(error => console.error(error))
            }
        })
    }

    const url = "/offeredProp";
    const handleOfferSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        // const title = form.title.value;
        // const agentName = form.agentName.value;
        // const location = form.location.value;
        const buyerName = form.buyerName.value;
        const buyerMail = form.buyerMail.value;
        const date = form.date.value;
        const amount = form.amount.value;
        const status = "pending";

        const offer = {propId, image, title, agent, ownerEmail, status, location, buyerName, buyerMail, date, amount }
        // console.log(offer);

        axiosSecure.post(url, offer)
            .then(res => {
                console.log(res);
                setActive(false)
                Swal.fire({
                    title: 'Posted Successful!',
                    text: 'Enjoy Exploring!',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                })
                axiosSecure.delete(`/wishList/${data._id}`)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(error => console.error(error))
            })
    }

    
    return (
        <div className="hero max-w-[70%] flex bg-base-200 rounded-lg">
            <div className="hero-content flex-col lg:flex-row">
                <img src={image} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <div className='flex items-center'>
                        <FaLocationDot></FaLocationDot>
                        <p className="">{location}</p>
                    </div>
                    <div className="avatar flex items-center gap-2">
                        <div className="w-12 rounded-full">
                            <img src={agent.image} />
                        </div>
                        <p className='font-semibold'>{agent.name}</p>
                    </div>
                    
                    <p className="py-3">{priceRange}</p>
                    <p className="py-3">verification Status : {verificationStatus}</p>
                    <div className='flex gap-4'>
                        <div>
                            <div>
                                <div className="w-full flex justify-center">
                                    {!active ?<Button onClick={() => setOpenModal(true)} disabled>Make an Offer</Button>: <Button onClick={() => setOpenModal(true)}>Make an Offer</Button>}
                                </div>
                                <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                                    <Modal.Header />
                                    <Modal.Body>
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                                            <form onSubmit={(e) => { onCloseModal(); handleOfferSubmit(e); }}>
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Title</span>
                                                    </label>
                                                    <input type="text" defaultValue={title} readOnly required placeholder="Type here" name="title" className="input input-bordered w-full" />
                                                </div>
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Location</span>
                                                    </label>
                                                    <input type="text" defaultValue={location} readOnly required placeholder="Type here" name="location" className="input input-bordered w-full" />
                                                </div>
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Agent Name</span>
                                                    </label>
                                                    <input type="text" defaultValue={agent.name} readOnly required placeholder="Type here" name="agent" className="input input-bordered w-full" />
                                                </div>
                                                {/* <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Rating</span>
                                                    </label>
                                                    <select required name="rating" className="select select-bordered w-full ">
                                                        <option disabled selected>Select Category</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                </div> */}
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Offer Amount</span>
                                                    </label>
                                                    <input type="number" required placeholder="Type here" name="amount" className="input input-bordered w-full" />
                                                </div>
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Buyer Name</span>
                                                    </label>
                                                    <input type="text" defaultValue={user.displayName} readOnly required placeholder="Type here" name="buyerName" className="input input-bordered w-full" />
                                                </div>
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Buyer Email</span>
                                                    </label>
                                                    <input type="text" defaultValue={user.email} readOnly required placeholder="Type here" name="buyerMail" className="input input-bordered w-full" />
                                                </div>
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Buying Date</span>
                                                    </label>
                                                    <input type="date" required placeholder="Type here" name="date" className="input input-bordered w-full" />
                                                </div>
                                                <div className="w-full mt-4">
                                                    <input className="btn btn-success text-white" type="submit" value='Offer' />
                                                </div>
                                            </form>

                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>
                        <Button onClick={handleDeleteWish} color='failure'>Remove</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishedPropertyCard;