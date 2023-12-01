import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import WishedPropertyCard from "./WishedPropertyCard";

const WishList = () => {
    const {user} = useContext(AuthContext)
    const [wishListData, setWishListData] = useState([]);
    console.log(user.email);
    useEffect(()=>{
        fetch(`http://localhost:5000/wishList?email=${user?.email}`)
        .then(res => res.json())
        .then(data => setWishListData(data))
    },[user?.email])
    return (
        <div>
            <div className="w-full mt-10 flex justify-center mb-16">
                <h1 className="text-4xl font-semibold bg-gradient-to-r from-orange-900 via-orange-500 to-orange-400 inline-block text-transparent bg-clip-text">All Your Bids Here</h1>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
                {wishListData.map(item => <WishedPropertyCard key={item._id} data={item}></WishedPropertyCard>)}
            </div>
        </div>
    );
};

export default WishList;