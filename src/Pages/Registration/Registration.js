import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { createUserDb } from '../../hooks/createUserDb';
import { ImgUpload } from '../../hooks/ImgUpload';
import Loader from '../SharePage/Loader/Loader';
import banner from './../../assets/loginbanner/banner.svg';

const Registration = () => {
    const {createUser, updateUser, googleSignIn} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    
    const onSubmit = async data => {
        if(data.password !== data.confirmPassword){
            return
        }
        if(data.image.length === 0){
          toast.error("Please add your image")
          return
        }
        setLoading(true)
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const imageUploadServer = await ImgUpload(formData);
        // const createUserAccount = await createUser(data.email, data)
        const userDbData ={name: data.name, email: data.email, photoURL: imageUploadServer}
        createUserDb(data.email, userDbData)
        .then((userDbData)=>{
          localStorage.setItem("token", `bearer ${userDbData.token}`);
          createUser(data.email, data.password)
          .then(userData=>{
            console.log(userData)
              updateUser(data.name, imageUploadServer)
              .then(data=>{
                  // console.log(data)
                  toast.success('Registration Successful!')
                  setLoading(false)
                  navigate("/profile")
              })
          })
          .catch(error=>{
            console.log(error)
            toast.error("This Email account already Use, Please login")
            setLoading(false)
          })
        })
        
    }

    const handleGoogleLogin = (e)=>{
        googleSignIn()
        .then(result=>{
            const userDbData = {name: result.user.displayName, email: result.user.email, photoURL: result.user.photoURL}
            createUserDb(result.user.email, userDbData)
            .then((data)=>{
              localStorage.setItem("token", `bearer ${data.token}`);
            })
            toast.success("Login Successful")
            navigate("/profile")
        })
        .catch(error=>toast.error("login fail, please try again"))
    }

    return (
        <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src={banner}
                className="w-full"
                alt="Phone"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <input
                    type="text"
                    name="name"
                    {...register("name", { required: true })}
                    className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${errors.name ? "focus:border-red-500" : ""}`}
                    placeholder="Full Name"
                    
                  />
                    {errors.name && <span className='text-red-500'>Please enter your full name</span>}
                </div>
                <div className="mb-6">
                  <input
                    type="email"
                    name="email"
                    {...register("email",  { required: true })}
                    className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${errors.email ? "focus:border-red-500" : ""}`}
                    placeholder="Email address"
                  />
                  {errors.email && <span className='text-red-500'>Please enter your email address</span>}
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    {...register("password", { required: true, minLength: 8 })}
                    onChange={(e) => { setPassword(e.target.value)}}
                    className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${errors.password ? "focus:border-red-500" : ""}`}
                    placeholder="Password"
                  />
                  {errors.password ? <span className='text-red-500'>Please enter your password at least 8 character</span>:""}
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    name="confirmPassword"
                    {...register("confirmPassword", { required: true, minLength: 8 })}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${errors.password ? "focus:border-red-500" : ""}`}
                    placeholder="Password"
                  />
                  {errors.confirmPassword && <span className='text-red-500'>Please enter your password at least 8 character</span>}
                  <p className='text-red-500 text-bold'>{(password && confirmPassword && password !== confirmPassword) ? "Password Don't Match": ""}</p>
                </div>
                <div className="mb-6">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    {...register("image", { required: true})}
                    className="file-input w-full max-w-xs"
                    placeholder="Password"
                  />
                  {errors.image && <span className='text-red-500'>Please Upload your image</span>}
                </div>
      
                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    {/* <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck3"
                      checked
                    />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
                      >Remember me</label
                    > */}
                  </div>
                </div>
      
               
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  {loading ? "Account Creating ..." : "Sign Up"} 
                </button>
      
              </form>
              
              <div
                  className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                >
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>
                <button onClick={handleGoogleLogin} className="block w-full">
                     <a
                  className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-[#3b5998]"
                  href="#!"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="32px" height="32px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg> Continue with Google
                </a>
                </button>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Registration;