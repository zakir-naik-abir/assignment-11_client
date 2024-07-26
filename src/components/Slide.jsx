import { Link } from "react-router-dom"

const Slide = ({image}) => {
  return (
    <div className='m-5 '>
      <div className="carousel w-full max-h-[500px]">
        <div name="slide1" className="carousel-item relative w-full ">
          <img src={image} className="w-full rounded-xl" />
          <div className="absolute h-full rounded-xl flex items-center pl-12  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21 , 0)]">
          <div className='text-white space-y-4'>
            <h1 className='lg:text-6xl md:text-4xl font-bold text-yellow-400'>FREE FREE FREE! <br /><span className='text-gray-100'>Order Food Anytime</span> <br /><span className='text-blue-600'>& Anywhere</span></h1>
            <p className='capitalize lg:text-2xl md:text-2xl'>There are many variations of food available <br />Take your favorite food now!!</p>
            <div>
              <Link to={'/availableFoods'}><button className='btn btn-primary mr-10'>Explore Now</button></Link>
              <Link to={'/addFood'}><button className='btn btn-success'>Donation Box</button></Link>
            </div>
          </div>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Slide