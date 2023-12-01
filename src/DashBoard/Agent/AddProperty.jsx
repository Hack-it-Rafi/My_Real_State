import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import Swal from "sweetalert2";

const AddProperty = () => {

    const { user } = useContext(AuthContext)
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("property form", e.target);
        const image = e.target.img.value
        const formData = new FormData(e.target);

        // Access form data using get method
        const title = formData.get("title");
        const location = formData.get("location");
        const imgFile = formData.get("imgFile");
        const agent = {
            name : user?.displayName,
            image: user?.photoURL,
        }
        const verificationStatus = "Pending";
        const priceRange = formData.get('priceRange')
        const description = formData.get('description')
        // ... get other form fields ...

        // Access the file input using the "imageFile" key
        const imgData = new FormData()
        imgData.append("image",imgFile)
        console.log(imgData);
        
        // console.log("afd",imageFile);

        fetch(
            image_hosting_api,
            {
                method:"POST",
                body:imgData,
            }
        ).then(response => response.json())
        .then(data => {
            const userData = {
                title,
                location,
                image:data.data.url,
                agent,
                verificationStatus,
                description,
                priceRange
            }
            fetch('http://localhost:5000/properties',{
                method:"POST",
                headers:{
                    "content-type": "application/json",
                },
                body: JSON.stringify(userData)
            }).then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    Swal.fire({
                        title: "Your property has been added in the que!",
                        text: "Buyer can see and bid for it after admin verification",
                        icon: "success"
                      });
                    e.target.reset()
                }
            })
        })

    }

    return (
        <div>
            <div>
                <h1 className="text-center text-3xl my-10">Add a property for sell</h1>
                <hr className="w-2/3 m-auto border-2 border-black" />
            </div>
            <form className="mx-20" onSubmit={handleSubmit}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Property Title</span>
                    </label>
                    <input type="text" required placeholder="Type here" name="title" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text" required placeholder="Type here" name="location" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Property image URL</span>
                    </label>
                    <input type="text" placeholder="imgURL" name="img" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <input type="file" name="imgFile" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Agent Name</span>
                    </label>
                    <input type="text" defaultValue={user?.displayName} readOnly required placeholder="Type here" name="agentName" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Agent Email</span>
                    </label>
                    <input type="email" defaultValue={user?.email} readOnly required placeholder="Type here" name="agentMail" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Price Range</span>
                    </label>
                    <input type="number" required name="priceRange" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input type="text" placeholder="Add a short description to attract potential buyer" name="description" className="input input-bordered w-full" />
                </div>
                <div className="w-full mt-4">
                    <input className="btn btn-success text-white" type="submit" value='Add Property' />
                </div>
            </form>
        </div>
    );
};

export default AddProperty;