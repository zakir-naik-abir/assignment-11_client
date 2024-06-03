import { useContext } from "react";
import { Link } from "react-router-dom"; 
import { AuthContext } from "../../../Providers/AuthProvider";
const FoodCard = ({food}) => {
  const {user} = useContext(AuthContext)
  const {_id, food_image, food_name, donator, donator_image, donator_name, donator_email, food_quantity, pickup_location, request_date, expired_date, additional_notes, food_description } = food || {};
  return (
    <div>
      <div className="max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
        <div className="flex justify-between pb-4 border-bottom">
          <img className="h-10 w-10 rounded-full bg-slate-400 avater" src={donator.donator_image} alt="" />
          <h2>{donator.donator_name}</h2>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <img src={food_image} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
            <div className="flex items-center text-xs justify-between">
              <span>{request_date}</span>
              <span>{expired_date}</span>
            </div>
          </div>
          <div className="space-y-2">
            <a rel="noopener noreferrer" href="#" className="block">
              <h3 className=" dark:text-violet-600">{pickup_location}</h3>
            </a>
            <p title={additional_notes} className="leading-snug dark:text-gray-600">{additional_notes.substring(0, 45)}...</p>
          </div>
          <Link to={`/food/${_id}`}><button className="btn btn-primary w-full mt-2">Details</button></Link>
        </div>
      </div>
    </div>
  )
}

export default FoodCard