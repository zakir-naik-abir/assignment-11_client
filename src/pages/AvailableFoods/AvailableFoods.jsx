import { useLoaderData } from "react-router-dom";
import FoodCard from "../Home/Foods/FoodCard";

const AvailableFoods = () => {
  const foods = useLoaderData();
  console.log(foods)
  return (
    <div>
      <h2 className="text-center text-4xl m-10 border-b-2 pb-5"> Featured Food Items{foods.length}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          foods?.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
        }
      </div>
    </div>
  )
}

export default AvailableFoods;