import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../useAxiosSecure";
import MyReviewCard from "./MyReviewCard";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [postedReviews, setPostedReviews] = useState([]);
    const axiosSecure = useAxiosSecure();

    const url2 = `/myReviews?email=${user.email}`
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
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:min-h-[200px]">
                {
                    postedReviews.map(postedReview=><MyReviewCard key={postedReview._id} postedReview={postedReview}></MyReviewCard>)
                }
            </div>
    );
};

export default MyReviews;