import { useLoaderData } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
import Swal from 'sweetalert2'
import axios from "axios";


const FoodDetails = () => {

  const {user} = useAuth();
  const foods = useLoaderData();
  console.log(foods)
  
  const [startDate, setStartDate] = useState(new Date());
  
  const date = new Date();
  const showTime = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();

  const { _id, donator, food_image, food_name, donator_name, food_quantity, pickup_location, request_date, expired_date, additional_notes, food_description } = foods;

  const handleRequest = async() =>{
      const requestItem = {
        requestId: _id,
        email: user.email,
        food_name,
        food_image,
        startDate,
        expired_date,
        donator_email: donator.donator_email,
        donator_name: donator.donator_name,
        status: 'pending',
      }
      console.log(requestItem);
      try{
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, requestItem)
        console.log(data)
        if (data?.insertedId) {
                Swal.fire({
                  title: "Success!",
                  text: "Do you want to continue",
                  icon: "success",
                  confirmButtonText: "Ok",
                });
              }
      }catch(error){
        console.log(error)
      }
  }

  return (
    <div>
      <div className=" min-h-screen bg-base-200">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">
          <img
            src={food_image}
            className="max-w-md rounded-lg shadow-2xl md:w-full "
          />
          <div>
            <h1 className="text-2xl font-semibold">{food_name}</h1>
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

            {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button className="btn btn-outline mt-3
           btn-primary" onClick={()=>document.getElementById('my_modal_5').showModal()}>Request</button>

          <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <div>
                <h1 className="text-2xl font-semibold">{food_name}</h1>
                <img src={food_image} alt={food_name} width={100} />
                <p>Id: {_id}</p>
                <h4>Donator Name: {donator.donator_name}</h4>
                <h4>Email: {user.email}</h4>
                <div className="flex gap-3 ">
                  <h2 >Time: {showTime}</h2>
                  <div>Date: <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                </div>
                <div className="flex">
                  <h3>{pickup_location}</h3>
                  <h3>{expired_date}</h3>
                </div>
                <h3>{additional_notes}</h3>
              </div>
            
              <div className="modal-action">
                <form method="dialog" className="flex space-x-5 items-center">
                  <button className="btn btn-sm ">Close</button>
                <button onClick={() => handleRequest(foods)} className="btn btn-sm btn-secondary ">Request</button>
                </form>
              </div>
            </div>
          </dialog>


          </div>
        </div>
        <div className="p-3 flex gap-5 mt-5 bg-slate-300">
          <img src={donator.donator_image} alt={donator_name} width={80} />
          <div>
            <p>Donator Name: {donator.donator_name}</p>
            <p>Donator Name: {donator.donator_email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
