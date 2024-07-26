import { Link, useNavigate } from "react-router-dom"
import imgLoin from "../../src/assets/login.svg"
import {  useContext, useState } from "react"
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../Providers/AuthProvider";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const Signup = () => {

  const { user,  setUser, showPassword, setShowPassword, updateUserProfile } = useContext(AuthContext)
  
  const [signupError, setSignupError] = useState('')
  // const [signupSuccess, setSignupSuccess] = useState('')
  const navigate = useNavigate();


  const handleSignup = async event =>{
    event.preventDefault();
    const form = event.target;   
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    console.log(name, email, photo, password);

    if(password.length < 6){
      setSignupError("Password should be at least 6 characters")
      return
    }
    else if(!/@gmail\.com$/.test(email)){
      setSignupError('Give valid email')
      return
    }
    
    else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password)){
      setSignupError("Password give (A-Z,a-z,0-9,Special Character)")
      return
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: result?.user?.email }, {withCredentials: true})
      console.log(data)
      
      // await sendEmailVerification(auth.currentUser)
      // alert('Please check your email and verify')
      await updateUserProfile(name, photo, email)
      setUser({ ...user, photoURL: photo, displayName: name , email: email})

      

      toast.success('Registration Successful')
      navigate(location?.state ? location?.state : '/')
    }catch (err){
      console.log(err)
      toast.error('Registration Fail')
    }
  };

  return (
    <div>
       <Helmet>
        <title>Sign Up | Food Donate</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200 mb-5">
        <div className="hero-content flex-col md:flex-row lg:flex-row">
          <div className="text-center lg:text-right">
            <img src={imgLoin} />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-4">
            <i className="text-3xl font-bold text-center border-b-2 border-black pb-2" >Sign Up</i>
            <form onSubmit={handleSignup} className="">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="Your Email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input type="text" name="photo" placeholder="Your photo url link" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative items-center">
                  <input className='input input-bordered w-full' type={showPassword ? "password" : "text" } name='password'  placeholder='Create Password' required/>
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-4 text-2xl">
                    {
                      showPassword ? <IoMdEyeOff></IoMdEyeOff> : <IoEye></IoEye>
                    }
                  </span>
                </div>
              </div>
              <div className="text-gray-800 my-2">
                <input
                  className="border-2"
                  type="checkbox"
                  name="terms"
                  id="terms"
                />
                <label className="ml-2 " htmlFor="terms">
                  Accept our <a>Terms and Conditions</a>
                </label>
              </div>
              <div>
                {
                  signupError && <p>{signupError}</p>
                }
                
              </div>
              <div className="form-control mt-1">
                <input className="btn btn-primary" type="submit" value="Sign Up" />
              </div>
            </form>
            <h3 className="text-center mb-5">Already have an account?<Link to={'/login'} className={'text-[#FF3811] font-bold'}><i>Login</i></Link></h3>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;
