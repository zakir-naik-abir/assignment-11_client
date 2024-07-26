import { NavLink } from "react-router-dom"
import Carousel from "../../components/Carousel"
import Foods from "./Foods/Foods"
import { Helmet } from "react-helmet-async"

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Food Donate</title>
      </Helmet>
      <Carousel></Carousel>
      <Foods></Foods>
      <div className="m-6">
      <NavLink to={'/availableFoods'}><button className="btn btn-primary w-full">Show All Foods</button></NavLink>
      </div>

    </div>
  )
}

export default Home;