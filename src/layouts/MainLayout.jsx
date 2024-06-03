import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Navbar/Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="h-16">
        <Navbar></Navbar>
      </div>
      <Outlet></Outlet>
      <div>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default MainLayout;