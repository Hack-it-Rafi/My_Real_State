import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";

const MyProfile = () => {

    const {user} = useContext(AuthContext)

    return (
        <div className="flex flex-col justify-center items-center mt-52">
            <img src={user?.photoURL} alt="user image" />
            <p>{user?.displayName}</p>
            {user?.email}
        </div>
    );
};

export default MyProfile;