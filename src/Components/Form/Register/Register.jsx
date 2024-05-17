import React from 'react'
import ShippingLogo from "../../../assets/image 1.png"
import Styles from "./Register.module.css"
import { useFormik } from 'formik'
import * as Yup from "yup"
import { baseUrl } from '../../../env.js'
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Rsgister() {
  let navigate = useNavigate()
  const notify = (msg,type) => toast[type](msg);
  let validationSchema = Yup.object({
    userName: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string().matches(/^[A-Z][a-z0-9@#$%]{6,}$/,"password must be valid").required(),
  })
  let registerFormik = useFormik({
    initialValues: {
      // userName:"",
      // email:"",
      // password:""
      SpecialId:""
    }
    // validationSchema
    ,
    onSubmit: async (values)=>{
        try{
          const result=await axios.post(`${baseUrl}admin/login`,values);
          if (result.status == 200 || result.status ==201) {
            notify(result.data.message,"success")
            navigate("/shipping")
            result && console.log(result)
            localStorage.setItem("token",result.data.token) 
          }
          

          }
          catch(error){
            // console.log(error);
            if (error.response.request.status == 400) {
              notify(error.message,"error")
              // alert(error.message)
            }
            
          }
    }
  })
  return (
    <>
    
    <section className="min-vh-100">
      <div className="container-fluid">
        <div className="row flex-row align-items-center ">
          <div className={`col-md-5 ${Styles.leftSide} min-vh-100 d-flex justify-content-center align-items-center`}>
            
              <div className={`text-start text-white d-flex flex-column gap-4 `}>
                <h1>Welcome To Shipping Arabia</h1>
                <h3>Join Us Now</h3>
                <div className={`${Styles.websiteLogo} align-self-center`}>
                  <img src={ShippingLogo} className="w-100" />
                </div>
              </div>
            
          </div>
          <div className={`col-md-7 ${Styles.rightSide} min-vh-100 rounded-start-5 shadow-lg d-flex align-items-center`}>
            <form onSubmit={registerFormik.handleSubmit} className="text-center w-75 mx-auto p-4 w-100 ">
              <h1 className="text-capitalize text-black  mb-5">welcome back to Shipping Arabia!</h1>
              {/* <div className="mb-4">
                <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.userName} type="text" name="userName" id="userName" className="form-control" placeholder="username" />
                {registerFormik.errors.userName && registerFormik.touched.userName ? <div className="alert alert-danger my-2 p-2">{registerFormik.errors.userName}</div>:""}
                
              </div>
              <div className="mb-4">
                <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.email} type="email" name="email" id="email" className="form-control" placeholder="email" />
                {registerFormik.errors.email && registerFormik.touched.email ? <div className="alert alert-danger my-2 p-2">{registerFormik.errors.email}</div>:""}

              </div>
              <div className="mb-4">
                <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.password} type="password" name="password" id="password" className="form-control" placeholder="password" />
                {registerFormik.errors.password && registerFormik.touched.password ? <div className="alert alert-danger my-2 p-2">{registerFormik.errors.password}</div>:""}

              </div> */}
              <div className="mb-4">
                <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.SpecialId} type="text" name="SpecialId" id="SpecialId" className="form-control" placeholder="SpecialId" />
                {registerFormik.errors.SpecialId && registerFormik.touched.SpecialId ? <div className="alert alert-danger my-2 p-2">{registerFormik.errors.SpecialId}</div>:""}

              </div>
              <button type='submit' className={` w-100 mt-3 rounded-pill border-0 px-4 py-2 ${Styles.bgOrangeColor}`}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    </>
  )
}
