import { Sidebar } from "flowbite-react";
import { useContext } from "react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "./Authentication/AuthProvider";
import useAdmin from "./hooks/useAdmin";
const DashBoard = () => {
    // const { user } = useContext(AuthContext);
    
   
    const [role,] = useAdmin()
    console.log(role)
    const isAdmin = role === 'admin'
    const isAgent = role ==='agent'
    
    return (
        <div className="flex">
            <div className="sticky">
                <Sidebar aria-label="Default sidebar example">
                    <Sidebar.Items>
                        {
                            isAdmin ? <>
                                <Sidebar.ItemGroup>
                                    <Link to="/dashBoard/adminProfile"><Sidebar.Item icon={HiUser}>
                                        Admin Profile
                                    </Sidebar.Item></Link>
                                    <Link to="/dashBoard/manageProperties"><Sidebar.Item icon={HiShoppingBag} label="Pro" labelColor="dark">
                                        Manage Properties
                                    </Sidebar.Item></Link>
                                    <Link to="/dashBoard/manageReviews"><Sidebar.Item icon={HiChartPie}>
                                        Manage Reviews
                                    </Sidebar.Item></Link>
                                    <Link to="/dashBoard/manageUsers"><Sidebar.Item icon={HiViewBoards} label="3">
                                        Manage Users
                                    </Sidebar.Item></Link>

                                </Sidebar.ItemGroup>
                            </> :
                                <>
                                    {
                                        isAgent ?
                                            <>
                                                <Sidebar.ItemGroup>
                                                    <Link to="/dashBoard/agentProfile"><Sidebar.Item icon={HiUser}>
                                                        Agent Profile
                                                    </Sidebar.Item></Link>
                                                    <Link to="/dashBoard/addProperty"><Sidebar.Item icon={HiShoppingBag} label="Pro" labelColor="dark">
                                                        Add Property
                                                    </Sidebar.Item></Link>
                                                    <Link to="/dashBoard/myAddedProperties"><Sidebar.Item icon={HiViewBoards} label="3">
                                                        My Added Properties
                                                    </Sidebar.Item></Link>
                                                    <Link to="/dashBoard/mySoldProperties"><Sidebar.Item icon={HiChartPie}>
                                                        My Sold Properties
                                                    </Sidebar.Item></Link>
                                                    <Link to="/dashBoard/requestedProperties"><Sidebar.Item icon={HiChartPie}>
                                                        Requested Properties
                                                    </Sidebar.Item></Link>

                                                </Sidebar.ItemGroup>
                                            </> :
                                            <Sidebar.ItemGroup>
                                                <Link to="/dashBoard/myProfile"><Sidebar.Item icon={HiUser}>
                                                    My Profile
                                                </Sidebar.Item></Link>
                                                <Link to="/dashBoard/wishList"><Sidebar.Item icon={HiShoppingBag} label="Pro" labelColor="dark">
                                                    My Wishlist
                                                </Sidebar.Item></Link>
                                                <Link to="/dashBoard/propertyBought"><Sidebar.Item icon={HiViewBoards} label="3">
                                                    Property Bought
                                                </Sidebar.Item></Link>
                                                <Link to="/dashBoard/myReviews"><Sidebar.Item icon={HiChartPie}>
                                                    My Reviews
                                                </Sidebar.Item></Link>
                                            </Sidebar.ItemGroup>
                                    }
                                </>
                        }
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="/" icon={HiTable}>
                                Home
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;