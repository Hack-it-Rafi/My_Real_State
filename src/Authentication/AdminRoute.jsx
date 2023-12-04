import  { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const [role,isRoleLoading] = useAdmin()
    const location = useLocation()
    if(loading){
        return <progress className='progress w-56'></progress>
    }
    if(user || role){
        return children
    }
    return (<Navigate to='/login' state={{from:location}} replace></Navigate>)
};

export default AdminRoute;