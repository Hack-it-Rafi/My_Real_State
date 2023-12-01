import { Button, Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthProvider";
import useAxiosSecure from "../useAxiosSecure";
import Swal from "sweetalert2";
import ReviewCard from "./ReviewCard";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const PropertyDetails = () => {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const axiosSecure = useAxiosSecure();

    function onCloseModal() {
        setOpenModal(false);
        setEmail('');
    }

    const loadedData = useLoaderData();
    const {_id: propId, image, title, location, agent, verificationStatus, priceRange, description } = loadedData;
    const { user } = useContext(AuthContext);

    // console.log(propId);

    const [postedReviews, setPostedReviews] = useState([]);
    const url2 = `/reviews?reviewId=${propId}`
    useEffect(() => {
        axiosSecure.get(url2)
        .then(res => {
            console.log(res.data.results);
            setPostedReviews(res.data.results);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

    }, [url2, axiosSecure]);


    const url = "/reviews";
    const handleReviewSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const reviewer_email = form.email.value;
        const rating = form.rating.value;
        const description = form.description.value;
        const reviewTime = new Date();

        const review = { propId, title, agent, reviewTime, reviewer_email, rating, description }
        console.log(review);

        axiosSecure.post(url, review)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    title: 'Posted Successful!',
                    text: 'Enjoy Exploring!',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                })
            })
    }

    const url3 = "/wishList";
    const handleWishList = (event)=>{
        event.preventDefault();

        const wish = {propId, image, title, location, agent, verificationStatus, priceRange, description, ownerEmail:user?.email};
        axiosSecure.post(url3, wish)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    title: 'Posted Successful!',
                    text: 'Enjoy Exploring!',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                })
            })
        

    }


    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mt-16">
                <div className="md:w-1/2">
                    <img className="rounded-lg" src={image} alt="" />
                </div>
                <div className="md:w-1/2 text-right">
                    <h1 className="text-4xl font-bold">{title}</h1>
                    <p className="my-5">Location: {location}</p>
                    <p className="my-5">Price Range: {priceRange}</p>
                    <div className="flex justify-end">
                        <Button onClick={handleWishList}>Add to WishList</Button>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto my-10">
                <p className="text-justify">{description}</p>
            </div>

            {/* View Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:min-h-[200px]">
                {
                    postedReviews.map(postedReview=><ReviewCard key={postedReview._id} postedReview={postedReview}></ReviewCard>)
                }
            </div>

            {/* Give Review */}
            <div>
                <div className="w-full flex justify-center">
                    <Button onClick={() => setOpenModal(true)}>Give a Review</Button>
                </div>
                <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                            <form onSubmit={(e) => { onCloseModal(); handleReviewSubmit(e); }}>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Your Email</span>
                                    </label>
                                    <input type="email" defaultValue={user?.email} readOnly required placeholder="Type here" name="email" className="input input-bordered w-full" />
                                </div>
                                <div className="form-control w-full">
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
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea className="textarea textarea-bordered h-16" placeholder="Type here" required name="description"></textarea>

                                </div>
                                <div className="w-full mt-4">
                                    <input className="btn btn-success text-white" type="submit" value='Submit' />
                                </div>
                            </form>

                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default PropertyDetails;