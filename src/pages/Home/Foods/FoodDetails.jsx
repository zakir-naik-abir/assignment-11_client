// import { useContext } from "react";
import { useLoaderData } from "react-router-dom"
// import { AuthContext } from "../../../Providers/AuthProvider";

const FoodDetails = () => {
  // const {user} = useContext(AuthContext)
  const foods = useLoaderData();
  // const {id} = useParams()
  // const idInt = parseInt(id)
  // const food = foods.find(food => food.id === idInt)
  const { _id, food_image, food_name, donator, donator_image, donator_name, donator_email, food_quantity, pickup_location, request_date, expired_date, additional_notes, food_description } = foods ;
  return (
    <div >
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={food_image} className="max-w-md rounded-lg shadow-2xl md:w-full " />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{food_name}</h1>
            <div className="grid lg:flex justify-start gap-2 lg:py-1 text-xl border-b-2 border-gray-400">
              
              <img src={donator.donator_image} alt="" />
              <h4>Name: {donator.donator_name}</h4>
              <h4>Email: {donator.donator_email}</h4>
            </div>
            <div className="flex justify-start">
              <p className="">Quality: {food_quantity}</p>
              <p>Address: {pickup_location}</p>
            </div>
            <div className="flex justify-start">
              <p>{request_date}</p>
              <p>{expired_date}</p>
            </div>
            <p>{additional_notes}</p>
            <p>{food_description}</p>
            <button className="btn btn-primary">Request Now</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default FoodDetails;