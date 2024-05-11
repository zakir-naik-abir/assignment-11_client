import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorElement from "../pages/ErrorElement";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AvailableFoods from "../pages/AvailableFoods/AvailableFoods";
import PrivateRoutes from "./PrivateRoutes";
import AddFood from "../pages/AddFood/AddFood";
import ManageMyFoods from "../pages/ManageMyFoods/ManageMyFoods";
import MyFoodRequest from "../pages/MyFoodRequest/MyFoodRequest";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import UpdateProfile from "../pages/Update/UpdateProfile";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorElement></ErrorElement>,
    children:[
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/availableFoods',
        element: <AvailableFoods></AvailableFoods>,
      },
      {
        path: '/addFood',
        element: <PrivateRoutes><AddFood></AddFood></PrivateRoutes>,
      },
      {
        path: '/manageMyFoods',
        element: <PrivateRoutes><ManageMyFoods></ManageMyFoods></PrivateRoutes>,
      },
      {
        path: '/myFoodRequest',
        element: <PrivateRoutes><MyFoodRequest></MyFoodRequest></PrivateRoutes>,
      },   
      {
        path: '/about',
        element: <About></About>,
      },
      {
        path: '/contact',
        element: <Contact></Contact>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/signup',
        element: <Signup></Signup>,
      },
      {
        path: '/updateProfile',
        element: <UpdateProfile></UpdateProfile>,
      },
      
    ]
  },
]);