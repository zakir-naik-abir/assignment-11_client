import { Link, useLocation, useNavigate } from "react-router-dom"
import registerImg from "../../src/assets/login.svg"
import { useContext, useState } from "react"
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
// import axios from 'axios'
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { FaFacebook, FaGithub } from "react-icons/fa6";
import axios from "axios";

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
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: result?.user?.email }, {withCredentials: true})
      console.log(data)
      toast.success('Login Successful')
      navigate(location?.state ? location?.state : '/')
    }catch(err){
      console.log(err)
      toast.error('Login fail')
    }

    
  }

  const handleGoogleLogin = async() =>{
    try{
      const result = await googleLogin();
      console.log(result.user)
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: result?.user?.email }, {withCredentials: true})
      console.log(data)
      toast.success('Login Successful')
      navigate(location?.state ? location?.state : '/')
    }catch(err){
      console.log(err)
      toast.error('Login Fail')
    }
  }
  const handleGithubLogin = async() =>{
    try{
      const result = await githubLogin();
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: result?.user?.email }, {withCredentials: true});
      console.log(data)
      toast.success('Login Successful');
      navigate(location?.state ? location?.state : '/')
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
      <Helmet>
        <title>Login | Food Donate</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row lg:flex-row">
          <div className="text-center lg:text-right">
            <img src={registerImg} />
            {/* <img src="../../src/assets/login.svg" alt="" /> */}
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-4 m-4">
            <i className="text-3xl font-bold text-center border-b-2 border-black mb-4 pb-2">Login</i>
            
            <div className=" space-y-5 ">
              <button onClick={handleGoogleLogin} className="btn btn-outline w-full"><FaFacebook></FaFacebook> Google</button>
              <button onClick={handleGithubLogin} className="btn btn-outline w-full"><FaGithub></FaGithub> Github</button>
            </div>
            <h5 className="text-center divider mt-6">Or Login With Email & Password</h5>
            <form onSubmit={handleLogin} className="">
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
            
            <p className="text-center">New Here?<Link to={'/signup'} className={'text-[#FF3811] font-bold'}><i>Sign Up</i></Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;