/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { FcApproval } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";

const OrderRequest = () => {
  const {user} = useAuth()
  const [orders, setOrders] = useState([]);
  console.log(orders)

  // const url = `${import.meta.env.VITE_API_URL}/ordersRequest/${user?.email}`;

  useEffect( () =>{
    getData()
  }, [user]);

  const getData = async () =>{
    const {data} = await axios(`${import.meta.env.VITE_API_URL}/ordersRequest/${user?.email}`)
    setOrders(data)
  }



  const handleUpdateStatus = async(_id, prevStatus, status) =>{
    // if(prevStatus === status) return console.log('hobena')
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
        const remaining = orders.filter((food) => food._id !== id);
        setOrders(remaining);
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
              <th>Expired</th>
              <th>Status</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          {/* sm: grid lg:flex justify-between */}
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask  h-12 w-12">
                        <img src={order.food_image} alt="Image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{order.food_name}</td>
                <td>{order.expired_date}</td>
                <td>
                  <button className="btn btn-sm btn-outline">{order.status}</button>
                </td>
                <td>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2" >
                      <button onClick={() =>handleUpdateStatus( order._id, order.status, 'Confirm')} disabled={order.status === 'Confirm'} className="disabled:cursor-not-allowed btn-sm btn btn-outline">{<FcApproval></FcApproval>}</button>

                      <button onClick={() =>handleUpdateStatus( order._id, order.status, 'Rejected')} disabled={order.status === 'Rejected' } className="btn-sm btn btn-outline">{<FcDisapprove></FcDisapprove>}</button>
                    </div>
                  </div>
                {/* {
                  user.status === 'pending' ? 'Pending' : <button onClick={() => handleUpdateRequest(user)} className="btn bg-orange-500">{list.status}</button>
                  } */}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="btn bg-gray-200"
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

export default OrderRequest;