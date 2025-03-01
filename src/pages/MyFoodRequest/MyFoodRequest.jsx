/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const MyFoodRequest = () => {
  const {user} = useAuth()
  const [myRequest, setMyRequest] = useState([]);
  console.log(myRequest)

  useEffect( () =>{
    getData()
  }, [user]);

  const getData = async () =>{
    const {data} = await axios(`${import.meta.env.VITE_API_URL}/ordersRequest/${user?.email}`)
    setMyRequest(data)
  };

  const handleConfirmFood = async(_id, prevStatus, status) =>{
    if(prevStatus === status) return console.log('hobena')
    console.log(_id, prevStatus, status)
    const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/order/${_id}`, {status})
    console.log(data);
    getData()
  };


  const handleDeleteOrder = async(id) =>{
    try{
      const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteOrder/${id}`)
      console.log(data);
      if (data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your spot has been deleted.",
          icon: "success",
        });
        const remaining = myRequest.filter((food) => food._id !== id);
        setMyRequest(remaining);
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
              <th>Donar Name</th>
              <th>Request Date</th>
              <th>expire Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* sm: grid lg:flex justify-between */}
          <tbody>
            {myRequest.map((list, index) => (
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
                <td>{list.donator_name}</td>
                <td>{list.startDate}</td>
                <td>{list.expired_date}</td>
                <td>
                  <div > 
                    <button onClick={() => handleConfirmFood(list._id, list.status, 'Complete')} disabled={list.status !== 'Confirm'}  className="btn btn-outline btn-sm">{list.status}</button>
                  </div>
                </td>
                {/* <td>
                  {
                    user.status === 'pending' ? 'pending' : <button onClick={() => handleUpdateFood(user)} className="btn-sm bg-orange-500">{list.status}</button>
                  }
                </td> */}
                <td>
                  <button
                    onClick={() => handleDeleteOrder(list._id)}
                    className="btn-sm bg-gray-200"
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

export default MyFoodRequest;