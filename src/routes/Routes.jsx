import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorElement from "../pages/ErrorElement";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorElement></ErrorElement>,
    // children:[
    //   {
    //     path: '/',
    //     element: <Home></Home>,
    //   },
    //   {
    //     path: '/login',
    //     element: <Login></Login>,
    //   },
    //   {
    //     path: '/signup',
    //     element: <Signup></Signup>,
    //   },
      
    // ]
  },
]);