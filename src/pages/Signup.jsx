import { Link, useNavigate } from "react-router-dom"
import imgLoin from "../../src/assets/login.svg"
import {  useContext, useState } from "react"
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../Providers/AuthProvider";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

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
      console.log(result)
      toast.success('Registration Successful')
      navigate('/')
      // await sendEmailVerification(auth.currentUser)
      // alert('Please check your email and verify')
      await updateUserProfile(name, photo, email)
      setUser({ ...user, photoURL: photo, displayName: name , email: email})
    }catch (err){
      console.log(err)
      toast.error('Registration Fail')
    }


    // createUserWithEmailAndPassword(auth, email, password)
    // .then(result =>{
    //   console.log(result);
    //   setSignupSuccess("Registration Successful")
      

    //   updateProfile(result.user, {
    //     displayName: name,
    //     photoURL: photo,
    //   })
    //   .then( () =>{
    //     console.log('Profile updated')
    //   })
    //   .catch()
  
    //   sendEmailVerification(auth.currentUser)
    //   .then( () =>{
    //     alert('Please check your email and verify your account')
    //   })
    // })
    // .catch(error =>{
    //   console.error(error);
    //   setSignupError("Already Used Email")
    // })
    
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200 mb-5">
        <div className="hero-content flex-col md:flex-row lg:flex-row">
          <div className="text-center lg:text-right">
            <img src={imgLoin} />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-3">
            <h1 className="text-5xl font-bold text-center">Sign Up</h1>
            <form onSubmit={handleSignup} className="card-body">
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
              <div className="text-gray-800">
                <input className="border-2" type="checkbox" name="terms" required />
                <label className="ml-2" htmlFor="terms">Accept our <a>Terms and Conditions</a></label>
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
            <p className="text-center mb-5">Already have an account?<Link to={'/login'} className={'text-[#FF3811] font-bold'}>Login</Link></p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;
