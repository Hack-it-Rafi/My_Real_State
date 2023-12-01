import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdCard = ({ property }) => {
    const navigate = useNavigate();
    const { image, title, priceRange, location, verificationStatus } = property;

    // console.log(property._id);
    const handlePropertyDetails = () => {
        console.log(property._id);
        navigate(`/propertyDetails/${property._id}`)
    }

    return (
        <motion.div whileHover={{ scale: 1.03 }}
        className="flex flex-wrap">          
            <div className="card w-full card-compact bg-base-100 shadow-xl">
                <figure><img className="h-44 w-full rounded-lg" src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <div className="w-full ">
                        <p className="text-lg">{location}</p>
                        <p><small>${priceRange}</small></p>
                    </div>
                    <p className="text-justify">{verificationStatus}</p>
                    <div className="card-actions justify-center">
                        <button onClick={handlePropertyDetails} className="btn btn-primary w-full">Bid Now</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdCard;