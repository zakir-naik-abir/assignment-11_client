import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorElement from "../pages/ErrorElement";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";


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
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/signup',
        element: <Signup></Signup>,
      },
      
    ]
  },
]);