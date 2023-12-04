import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

const AgentProfile = () => {
    const {user} = useContext(AuthContext)
    const [role,] = useAdmin()
    console.log(role,"from agent");
    return (
        
        <div>
            <div className="flex flex-col items-center justify-center mt-20">
                <img src={user?.photoURL} alt="" />
                <h1 className="text-2xl font-bold">Name : {user?.displayName}</h1>
                <p className="font-semibold">Email : {user?.email}</p>
                {
                    role === "fraudAgent" ?
                    <p>Status : <span className="text-red-600 font-semibold">{role}</span></p>:
                    <p>Status : {role}</p>
                }
            </div>
        </div>
    );
};

export default AgentProfile;