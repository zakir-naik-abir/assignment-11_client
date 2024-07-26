
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { GrUpdate } from "react-icons/gr";

const ManageMyFoods = () => {
  const {user} = useAuth()
  const [myFoodList, setMyFoodList] = useState([]);
  const url = `${import.meta.env.VITE_API_URL}/myFoods/${user?.email}`;

  useEffect( () =>{
    const getData = async () =>{
      const {data} = await axios.get(url)
      setMyFoodList(data)
    }
    getData()
  }, [url])

  const handleDeleteFood = async(id) =>{
    try{
      const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteFood/${id}`)
      console.log(data);
      if (data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your spot has been deleted.",
          icon: "success",
        });
        const remaining = myFoodList.filter((food) => food._id !== id);
        setMyFoodList(remaining);
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-xl font-semibold ">
              <th>Index</th>
              <th>Image</th>
              <th>Food Name</th>
              <th>Expire Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          {/* sm: grid lg:flex justify-between */}
          <tbody>
            {myFoodList.map((list, index) => (
              <tr key={index} className="">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask  h-12 w-12">
                        <img src={list.food_image} alt="Image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{list.food_name}</td>
                <td>{list.expired_date}</td>
                <td>
                  <Link to={`/updateFood/${list._id}`}><button className="btn-outline btn"><GrUpdate></GrUpdate></button></Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteFood(list._id)}
                    className="btn   bg-gray-200"
                  >
                    <MdDeleteForever className="text-red-600 text-xl"></MdDeleteForever>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageMyFoods;