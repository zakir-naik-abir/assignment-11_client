import { NavLink } from "react-router-dom"
import Carousel from "../../components/Carousel"
import Foods from "./Foods/Foods"

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <Foods></Foods>
      <div className="m-6">
      <NavLink to={'/availableFoods'}><button className="btn btn-primary w-full">Show All Foods</button></NavLink>
      </div>

    </div>
  )
}

export default Home;