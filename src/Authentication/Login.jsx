import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../../../public/login.png"
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FcGoogle } from 'react-icons/fc';
// import useTitle from "../../useTitle";

const Login = () => {

    const [success, setSuccess] = useState('');
    // const [myMail, setMyMail] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    // useTitle('Login');

    const { signIn, googleSignIn } = useContext(AuthContext);

    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        signIn(email, password)
            .then(result => {
                console.log(result.user.email);
                const myUser = { email };
                console.log(myUser);
                setSuccess("Login success")
                Swal.fire({
                    title: 'Login Successful!',
                    text: 'Enjoy Exploring!',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                })
                axios.post("https://real-state-server-seven.vercel.app/jwt", myUser, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.success) {
                            navigate(location?.state ? location.state : '/');
                        }
                    })

            })
            .catch(error => {
                console.error(error);
                setSuccess(error.message);
            })
    }

    const handleGoogleSignIn = ()=>{
        googleSignIn()
        // .then(result => {
        //     console.log(result.user.email);
        //     // const mail = result.user.email;
        //     // const myUser = { mail };
        //     setSuccess("Login success")
            // Swal.fire({
            //     title: 'Login Successful!',
            //     text: 'Enjoy Exploring!',
            //     icon: 'success',
            //     confirmButtonText: 'Continue'
            // })
        // })
        .then(result => {
            console.log(result.user.email);
            const mail = result.user?.email;
            const myUser = { mail };
            setSuccess("Login success")
            const saveUser = {name: result.user?.displayName, email: result.user?.email, role: "User"};
            axios.post("https://real-state-server-seven.vercel.app/users", saveUser)
            .then(res=>{
                if(res.data.insertedId){
                    Swal.fire({
                        title: 'Login Successful!',
                        text: 'Enjoy Exploring!',
                        icon: 'success',
                        confirmButtonText: 'Continue'
                    })
                }
            })
            axios.post("https://real-state-server-seven.vercel.app/jwt", myUser, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.success) {
                            navigate(location?.state ? location.state : '/');
                        }
                    })
            
        })
        .catch(error => {
            console.error(error);
            setSuccess(error.message);
        })
    }
    return (
        <div>
            <div className="hero min-h-screen mb-10">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center flex justify-center w-1/2 lg:text-left">
                        <img className="w-2/3" src="https://i.ibb.co/26gjbfg/6310507.jpg" alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full  max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" required />

                            </div>

                            {
                                success && <p className="text-red-600">{success}</p>
                            }
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>

                        <div className="mx-auto text-center">
                            <p className="pb-2">or,</p>
                            <button onClick={handleGoogleSignIn} className="flex gap-2 btn"><FcGoogle />
                                Google</button>
                        </div>

                        <p className="mb-8 mt-2 text-center">Do not have an account? <Link className="text-blue-600" to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;