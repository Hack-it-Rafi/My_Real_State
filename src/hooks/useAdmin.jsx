import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
    const { user } = useContext(AuthContext)
    console.log("user from admin hook", user);
    const axiosSecure = useAxiosSecure()

    const { data: role, isPending: isRoleLoading } = useQuery({
        queryKey: [user?.email, "role"],
        queryFn: async () => {
            const result = await axiosSecure.get(`/users/admin/${user?.email}`)
            console.log(result.data)
            return result.data?.role
        }
    })
    return [role, isRoleLoading]

};

export default useAdmin;