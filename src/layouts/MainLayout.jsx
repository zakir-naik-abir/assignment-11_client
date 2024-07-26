import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Navbar/Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="h-20">
        <Navbar></Navbar>
      </div>
      <div className="min-h-[calc(100vh-304px)]">
        <Outlet></Outlet>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default MainLayout;