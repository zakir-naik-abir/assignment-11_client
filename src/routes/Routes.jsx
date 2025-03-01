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
// import MyFoodRequest from "../pages/MyFoodRequest/MyFoodRequest";
import About from "../pages/About/About";
import UpdateProfile from "../pages/Update/UpdateProfile";
import FoodDetails from "../pages/Home/Foods/FoodDetails";
import UpdateFood from "../pages/Update/UpdateFood";
import OrderRequest from "../pages/Home/OrderRequest/OrderRequest";
import MyFoodRequest from "../pages/MyFoodRequest/MyFoodRequest";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorElement></ErrorElement>,
    children:[
      {
        // path: '/',
        index: true,
        element: <Home></Home>,
        // loader: () =>fetch(`${import.meta.env.VITE_API_URL}/foods`),
      },
      {
        path: '/availableFoods',
        element: <AvailableFoods></AvailableFoods>,
        loader: ()=> fetch(`http://localhost:5000/foods`),
      },
      // {
      //   path: '/foodDetails',
      //   element: <PrivateRoutes><FoodDetails></FoodDetails></PrivateRoutes>,
      //   loader: ({params})=> fetch(`http://localhost:5000/food/${params.id}`),
      // },
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
        // loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/order/${params.id}`),
      },
      {
        path: '/ordersRequest',
        element: <PrivateRoutes><OrderRequest></OrderRequest></PrivateRoutes>,
        // loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/order/${params.id}`),
      },
      {
        path: '/updateFood/:id',
        element: <PrivateRoutes><UpdateFood></UpdateFood></PrivateRoutes>,
        loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/food/${params.id}`),
      },   
      {
        path: '/about',
        element: <About></About>,
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
        element: <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>,
      },

      {
        path: '/food/:id',
        element: <PrivateRoutes><FoodDetails></FoodDetails></PrivateRoutes>,
        loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/food/${params.id}`),
        // loader: ({params})=> fetch(`http://localhost:5000/food/${params.id}`),
      },

    ]
  },
]);