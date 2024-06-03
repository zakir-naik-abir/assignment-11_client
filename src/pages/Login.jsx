import { Link, useLocation, useNavigate } from "react-router-dom"
import registerImg from "../../src/assets/login.svg"
import { useContext, useState } from "react"
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import axios from 'axios'
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { success, setSuccess, error, setError, loginUser, googleLogin, githubLogin, forgetPassword } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState();
  const location = useLocation();
  console.log(location)
  const navigate = useNavigate();

  const handleLogin = async event =>{
    event.preventDefault();
    const form = new FormData(event.currentTarget); 
    const email = form.get('email')
    const password = form.get('password')
    console.log(email, password)

    setError('');
    setSuccess('');

    try{
      const result = await loginUser(email, password)
      console.log(result)
      toast.success('Login Successful')
      navigate('/')
      // const user = {email}
      // axios.post(`http://localhost:5000/jwt=${email}`, user, {withCredentials: true})
      // .then(res => {
      //   console.log(res.data);
      //   if(res.data.success){
      //     navigate(location?.state ? location?.state : '/')
      //   }
      // })
    }catch(err){
      console.log(err)
      toast.error('Login fail')
    }

    // loginUser(email, password)
    // .then(result =>{
    //   const loggedInUser = result.user;
    //   console.log(loggedInUser);
    //   const user = {email};
    //   setSuccess('Login Successful');
    //   // navigate(location?.state ? location?.state : '/')
    //   // get access token
    //   axios.post(`http://localhost:5000/jwt=${email}`, user, {withCredentials: true})
    //   .then(res => {
    //     console.log(res.data);
    //     if(res.data.success){
    //       navigate(location?.state ? location?.state : '/')
    //     }
    //   })
    // })
    // .catch(error =>{
    //   console.error(error);
    //   setError('Email or Password incorrect');
    // })
  }

  const handleGoogleLogin = async() =>{
    try{
      await googleLogin()
      toast.success('Login Successful')
      navigate('/')
    }catch(err){
      console.log(err)
      toast.error('Login Fail')
    }
  }
  const handleGithubLogin = async() =>{
    try{
      await githubLogin()
      toast.success('Login Successful')
      navigate('/')
    }catch(err){
      console.log(err)
      toast.error('Login Fail') 
    }
  }
  const handleForget = async() =>{
    try{
      await forgetPassword()
      navigate(location?.state ? location?.state : '/')
    }catch(error){
      console.error(error);
    }
  }
  
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row lg:flex-row">
          <div className="text-center lg:text-right">
            <img src={registerImg} />
            {/* <img src="../../src/assets/login.svg" alt="" /> */}
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-4">
            <h1 className="text-5xl font-bold text-center">Login</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
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

                <label className="label">
                  <a onClick={handleForget} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              {
                success && 
                <small>{success}</small>
              }
              {
                error && 
                <small>{error}</small>
              }
              <div className="form-control">
                <input className="btn btn-primary" type="submit" value="Login" />
              </div>
            </form>
            <div className="flex justify-center gap-5 mb-2">
              <button onClick={handleGoogleLogin} className="btn btn-outline">Google</button>
              <button onClick={handleGithubLogin} className="btn btn-outline">Github</button>
            </div>
            <p className="text-center mb-5">New Here?<Link to={'/signup'} className={'text-[#FF3811] font-bold'}>Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;