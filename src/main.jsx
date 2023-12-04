import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Root from './Root';
import Home from './Components/Home';
import AllProperties from './Components/AllProperties';
import Login from './Authentication/Login';
import AuthProvider from './Authentication/AuthProvider';
import Registration from './Authentication/Registration';
import PrivateRoute from './Authentication/PrivateRoute';
import PropertyDetails from './Components/PropertyDetails';
import MyProfile from './DashBoard/User/MyProfile';
import DashBoard from './DashBoard';
import WishList from './DashBoard/User/WishList';
import MyReviews from './DashBoard/User/MyReviews';
import PropertyBought from './DashBoard/User/PropertyBought';
import AgentProfile from './DashBoard/Agent/AgentProfile';
import AddProperty from './DashBoard/Agent/AddProperty';
import MyAddedProperties from './DashBoard/Agent/MyAddedProperties';
import MySoldProperties from './DashBoard/Agent/MySoldProperties';
import RequestedProperties from './DashBoard/Agent/RequestedProperties';
import AdminProfile from './DashBoard/Admin/AdminProfile';
import ManageProperties from './DashBoard/Admin/ManageProperties';
import ManageReviews from './DashBoard/Admin/ManageReviews';
import ManageUsers from './DashBoard/Admin/ManageUsers';
// import AdminRoute from './Authentication/AdminRoute';
import Payment from './DashBoard/User/Payment';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/allProperties",
        element: <PrivateRoute><AllProperties></AllProperties></PrivateRoute>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Registration></Registration>
      },
      {
        path: "/propertyDetails/:id",
        element: <PrivateRoute><PropertyDetails></PropertyDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://real-state-server-seven.vercel.app/properties/${params.id}`, {
          credentials: 'include'
        })
      }
    ]
  },
  {
    path: "/dashBoard",
    element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
    children: [
      // User
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>
      },
      {
        path: "wishList",
        element: <WishList></WishList>
      },
      {
        path: "myReviews",
        element: <MyReviews></MyReviews>
      },
      {
        path: "propertyBought",
        element: <PropertyBought></PropertyBought>
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) => fetch(`https://real-state-server-seven.vercel.app/offeredProp/${params.id}`, {
          credentials: 'include'
        })
      },
      // Agent
      {
        path: "agentProfile",
        element: <AgentProfile></AgentProfile>
      },
      {
        path: "addProperty",
        element: <AddProperty></AddProperty>
      },
      {
        path: "myAddedProperties",
        element: <MyAddedProperties></MyAddedProperties>
      },
      {
        path: "mySoldProperties",
        element: <MySoldProperties></MySoldProperties>
      },
      {
        path: "requestedProperties",
        element: <RequestedProperties></RequestedProperties>,
      },
      // Admin
      {
        path: "adminProfile",
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "manageProperties",
        element: <ManageProperties></ManageProperties>
      },
      {
        path: "manageReviews",
        element: <ManageReviews></ManageReviews>,
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
