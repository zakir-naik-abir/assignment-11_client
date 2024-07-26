import { Link, useLoaderData } from "react-router-dom"; 
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
const FoodCard = ({food}) => {

  const { _id, food_image, food_name, donator, pickup_location, request_date, expired_date, additional_notes} = food || {};

  const {user} = useAuth();
  const foods = useLoaderData();
  
  const [startDate, setStartDate] = useState(new Date());
  
  const date = new Date();
  const showTime = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();


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
      status: 'Pending',
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
      <div className="max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
        {/* <div className="flex justify-between pb-4 border-bottom">
          <img className="h-10 w-10 rounded-full bg-slate-400 avater" src={donator.donator_image} alt="" />
          <h2>Donator Name: {donator.donator_name}</h2>
        </div> */}
        
        <div className="space-y-4">
          <div className="space-y-2">
            <img src={food_image} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
            <span className="relative -top-12 left-5 p-2 rounded bg-slate-100">{food_name}</span>
            <div className="flex items-center text-xs justify-between">
              <span>{request_date}</span>
              <span>Expire Date: {expired_date}</span>
            </div>
          </div>
          <div className="space-y-2">
            
              <h3 className=" dark:text-violet-600">Location: {pickup_location}</h3>
            {/* <p title={additional_notes} className="leading-snug dark:text-gray-600">{additional_notes.substring(0, 40)}....</p> */}
          </div>

          
          <div className="flex justify-between items-center">
            <Link to={`/food/${_id}`}><button className="btn btn-sm btn-primary w-full">Details</button>
            </Link>
            <button className="btn-sm btn  mt-3
           btn-secondary" onClick={()=>document.getElementById('my_modal_5').showModal()}>Request</button>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <div>
                  <h1 className="text-2xl font-semibold">{food_name}</h1>
                  <img src={food_image} alt={food_name} width={100} />
                  <p>Id: {_id}</p>
                  <h4>Donator Name: {donator.donator_name}</h4>
                  <h4>Email: {user?.email}</h4>
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
      </div>
    </div>
  )
}

export default FoodCard;