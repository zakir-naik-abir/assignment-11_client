import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"

const MainLayout = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <Outlet></Outlet>
    </div>
  )
}

export default MainLayout;