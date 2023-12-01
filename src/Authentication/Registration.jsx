import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
// import useTitle from "../../useTitle";

const Registration = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    // useTitle('Register');
    const { createUser, updateUser } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        setRegisterError('');
        setSuccess('');

        const specialCharRegex = /[!@#$%^&*()_+{}\]:;<>,.?~\\/-]/;
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one upper case characters.')
            return;
        }
        else if (!specialCharRegex.test(password)) {
            setRegisterError('Your password should have at least one special characters.')
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                updateUser(name, photo)
                    .then(() => {
                        const saveUser = {name, email, role: "user"};
                        axios.post("http://localhost:5000/users", saveUser)
                        .then(res=>{
                            if(res.data.insertedId){
                                Swal.fire({
                                    title: 'User Created',
                                    text: 'Enjoy Exploring!',
                                    icon: 'success',
                                    confirmButtonText: 'Continue'
                                })

                                navigate("/login");
                                setSuccess('User Created Successfully.');
                            }
                        })
                        
                    })
                    .catch(error => {
                        setRegisterError(error.code);
                    });
            })
            .catch(error => console.error(error));
    }


    return (
        <div>
            <div className="hero min-h-screen mb-10">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center flex justify-center w-1/2 lg:text-left">
                        <img className="w-2/3" src="https://i.ibb.co/26gjbfg/6310507.jpg" alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Your name" name="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="Photo URL" name="photo" className="input input-bordered" required />
                            </div>
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
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>

                        {
                            registerError && <p className="text-red-700">{registerError}</p>
                        }
                        {
                            success && <p className="text-green-600">{success}</p>
                        }

                        <p className="my-4 text-center">Already have an account? <Link className="text-blue-600" to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;