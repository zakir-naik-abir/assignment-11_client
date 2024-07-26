
import { useContext, useState } from 'react';
import d1 from '../../../src/assets/images/d1.jpg'
import { AuthContext } from '../../Providers/AuthProvider';
// import axios from 'axios';
import Swal from 'sweetalert2';
import axios from 'axios';
// import DatePicker from 'react-datepicker';

// import axios from 'axios';

const AddFood = () => {
  const {user} = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [startDate, setStartDate] = useState(new Date());
  // const date = new Date();
  // const showTime = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();

  const handleAddFood = async(e) =>{
    
    e.preventDefault();
    const form = new FormData(e.currentTarget)
    const food_image = form.get('food_image');
    const food_name = form.get('food_name');
    const food_quantity = form.get('food_quantity');
    const pickup_location = form.get('pickup_location');
    const request_date =  startDate;
    const expired_date = form.get('expired_date');
    const additional_notes = form.get('additional_notes');
    const food_description = form.get('food_description');
    const donator = {
       donator_image: user?.photoURL,
       donator_name:  user?.displayName,
       donator_email: user?.email,
    };
    const status = 'Available'
   
    
    const newFood = { food_image, donator,  status, food_name,  food_quantity, pickup_location,  request_date, expired_date, additional_notes, food_description };
    console.log(newFood);

    try{
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/addFood`, newFood)
      console.log(data)
      if (data?.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Do you want to continue",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="bg-gray-100 mb-5 pb-5">
      <div>
      <img src={d1} alt="" />
      <h2 className='text-center  text-3xl my-3 text-red-700 font-bold border-b-2 border-black pb-2'>Add Your Food</h2>
      <section className=" dark:bg-gray-100 dark:text-gray-900">
        <form onSubmit={handleAddFood} className="container flex flex-col mx-auto ">
          <fieldset className="grid grid-cols-2 gap-6 px-2 rounded-md shadow-sm dark:bg-gray-50">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="food_image" className="text-xl p-2">Food Image</label>
                <input name="food_image" type="text" placeholder="Image URL Link" className="w-full rounded-sm focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 input input-bordered" />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="food_name" className="text-xl p-2">Food Name</label>
                <input name="food_name" type="text" placeholder="Text Here Food Name" className="w-full rounded-sm focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 input input-bordered" />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="food_quantity" className="text-xl p-2">Food Quantity</label>
                <input name="food_quantity" type="text" placeholder="How many people can eat your food?" className="w-full rounded-sm focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 input input-bordered" />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="pickup_location" className="text-xl p-2">Your Location</label>
                <input name="pickup_location" type="text" placeholder="Your address" className="w-full rounded-sm focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 input input-bordered" />
              </div>

              {/* <div className="col-span-full sm:col-span-3">
                <label htmlFor="request_date" className="text-xl p-2">Request Date</label>
                <br />
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='w-full rounded-sm input input-bordered' />
                <input name="request_date" type="date" placeholder="Today's Time" className="w-full rounded-sm focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 input input-bordered" />
              </div> */}

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="expired_date" className="text-xl p-2">Expired Date</label>
                <input name="expired_date" type="date" placeholder="Expired Date" className="w-full rounded-sm focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 input input-bordered" />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="additional_notes" className="text-xl p-2">Additional Notes</label>
                <input name="additional_notes" type="text" placeholder="Additional Notes" className="w-full rounded-sm focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 input input-bordered" />
              </div>
              
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="food_description" className="text-xl p-2">Food Description</label>
                <input name="food_description" type="text" placeholder="Food Description" className="w-full rounded-sm focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 input input-bordered" />
              </div>             
            </div>
            <input type="submit" value="Submit Food" className="btn btn-outline btn-ghost  col-span-full" />
          </fieldset>
          
        </form>
        </section>
      </div>
    </div>
  )
}

export default AddFood;