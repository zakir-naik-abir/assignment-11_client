import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const UpdateProfile = () => {
  const { updateUserProfile, setSuccess, setError, } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate('')

  const profileUpdate = e =>{
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = form.get('name');
    const photo = form.get('photo');
    

    setSuccess('');
    setError('');
    
    
    updateUserProfile(name, photo)
    .then( ()=>{
      navigate(location?.state ? location.state : '/');
    })
  
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row lg:flex-row">
          <div className="text-center lg:text-right">
            {/* <img src={registerImg} /> */}
            <img src="../../../src/assets/login.svg" alt="" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-8">
            <h1 className="text-5xl font-bold text-center">Update Profile</h1>
            <form onSubmit={profileUpdate} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="text" name="photo" placeholder="Photo URL Link" className="input input-bordered" required />
              </div>
              <div className="form-control mt-2">
                <input className="btn btn-primary" type="submit" value="Update Now" />
              </div>
            </form>   
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile;