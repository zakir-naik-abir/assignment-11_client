import { Link } from "react-router-dom"
// import imgLoin from "../../../src/assets/images/login/login.svg"
import {  useContext, useState } from "react"
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
// import { auth } from "../../firebase/firebase.config";
import { AuthContext } from "../Providers/AuthProvider";
import { auth } from "../firebase/firebase.config";

const Signup = () => {

  const {showPassword, setShowPassword} = useContext(AuthContext)
  
  const [signupError, setSignupError] = useState('')
  const [signupSuccess, setSignupSuccess] = useState('')

  
  const handleSignup = event =>{
    event.preventDefault();
    const form = event.target;
    
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(name, email, password);

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
    

    setSignupError('');
    setSignupSuccess('');

    createUserWithEmailAndPassword(auth, email, password)
    .then(result =>{
      console.log(result);
      setSignupSuccess("Registration Successful")

      updateProfile(result.user, {
        displayName: name,
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
      .then( () =>{
        console.log('Profile updated')
      })
      .catch()
  
      sendEmailVerification(auth.currentUser)
      .then( () =>{
        alert('Please check your email and verify your account')
      })
    })
    .catch(error =>{
      console.error(error);
      setSignupError("Already Used Email")
    })
    
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row lg:flex-row">
          <div className="text-center lg:text-right">
            <img src="../../src/assets/login.svg" alt="" />
            {/* <img src={imgLoin} /> */}
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
                <input className="border-2" type="checkbox" name="terms" id="terms" required />
                <label className="ml-2" htmlFor="terms">Accept our <a>Terms and Conditions</a></label>
              </div>
              <div>
                {
                  signupError && <p>{signupError}</p>
                }
                {
                  signupSuccess && <p>{signupSuccess}</p>
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
