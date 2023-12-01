import axios from "axios";
import { useState, useEffect } from "react";
import AdCard from "./AdCard";

const Advertisement = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Use an asynchronous function inside useEffect to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/properties");
                console.log(response.data);
                setProperties(response.data); //setProperties(response.data.slice(0, 4))
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Call the asynchronous function
        fetchData();
    }, []); // Empty dependency array means this effect runs once after the initial render

    console.log(properties);

    return (
        <div className="max-w-7xl mx-auto my-20">
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    properties.map(property => <AdCard key={property._id} property={property}></AdCard>)
                }
            </div>
        </div>
    );
};

export default Advertisement;
