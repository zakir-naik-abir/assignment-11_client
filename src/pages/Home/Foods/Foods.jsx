import { useEffect, useState } from "react"
import FoodCard from "./FoodCard";
import axios from "axios";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const url = `${import.meta.env.VITE_API_URL}/foods`;

  useEffect( () =>{
    const getData = async () =>{
      const {data} = await axios.get(url)
      setFoods(data)
    }
    getData()
  }, [url])
  return (
    <div className="m-5">
      <h2 className="text-center text-4xl m-10 border-b-2 pb-5"> Featured Food Items</h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 my-auto">
          {
            foods?.slice(0, 6).map(food => <FoodCard key={food._id} food={food}></FoodCard>)
          }
        </div>
      </div>
    </div>
  )
}

export default Foods;