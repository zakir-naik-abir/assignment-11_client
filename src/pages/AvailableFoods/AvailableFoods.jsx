import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import FoodCard from "../Home/Foods/FoodCard";


const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const url = `${import.meta.env.VITE_API_URL}/foods`;
  // const url = `http://localhost:5000/foods`;

  useEffect( () =>{
    const getData = async () =>{
      const {data} = await axios.get(url)
      setFoods(data)
    }
    getData()
  }, [url])
  return (
    <div>
      <Helmet>
        <title>Home | Food Donate</title>
      </Helmet>
      <h2 className="text-center text-4xl m-10 border-b-2 pb-5"> Featured Food Items: {foods.length}</h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {
            foods?.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
          }
        </div>
      </div>
    </div>
  )
}

export default AvailableFoods;