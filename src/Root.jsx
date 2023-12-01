import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import FootSection from "./Components/FootSection";

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
           <Outlet></Outlet> 
           <FootSection></FootSection>
        </div>
    );
};

export default Root;