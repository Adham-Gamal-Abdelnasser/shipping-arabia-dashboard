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
  const notify = (msg, type) => toast[type](msg);
  let validationSchema = Yup.object({
    userName: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string().matches(/^[A-Z][a-z0-9@#$%]{6,}$/, "password must be valid").required(),
  })
  let agentFormik = useFormik({
    initialValues: {
      Email: "",
      Password: ""
    },
    onSubmit: async (values) => {
      try {
        const result = await axios.post(`${baseUrl}agent/login`, values)
        console.log(values);
        if (result.status == 200 || result.status == 201) {
          notify(result.data.message, "success")
          navigate("/shipping")
          result && console.log(result)
          localStorage.setItem("token", result.data.token)
        }
      }
      catch (error) {
        if (error.response.request.status == 400) {
          notify(error.message, "error")
        }
      }
    }
  })
  let adminFormik = useFormik({
    initialValues: {
      SpecialId: ""
    }
    ,
    onSubmit: async (values) => {
      try {
        const result = await axios.post(`${baseUrl}admin/login`, values);
        if (result.status == 200 || result.status == 201) {
          notify(result.data.message, "success")
          navigate("/shipping")
          result && console.log(result)
          localStorage.setItem("token", result.data.token)
        }
      }
      catch (error) {
        if (error.response.request.status == 400) {
          notify(error.message, "error")
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
                <h2>Welcome To Shipping Arabia</h2>

                <h3>Join Us Now</h3>
                <div className={`${Styles.websiteLogo} align-self-center`}>
                  <img src={ShippingLogo} className="w-100" />
                </div>
              </div>

            </div>
            <div className={`col-md-7 ${Styles.rightSide} min-vh-100 rounded-start-5 shadow-lg d-flex flex-column align-items-center justify-content-center`}>

              <h1 className="text-capitalize  mb-5">welcome back to Shipping Arabia!</h1>
              <div>
                <div className={`nav ${Styles.navTabs} mb-5`} id="nav-tab" role="tablist">
                  <button className="nav-link mx-1 active" id="nav-admin-tab" data-bs-toggle="tab" data-bs-target="#nav-admin" type="button" role="tab" aria-controls="nav-admin" aria-selected="true">Admin</button>
                  <button className="nav-link mx-1" id="nav-agent-tab" data-bs-toggle="tab" data-bs-target="#nav-agent" type="button" role="tab" aria-controls="nav-agent" aria-selected="false">Agent</button>
                </div>
              </div>
              <div className="tab-content" id="nav-tabContent">
                {/* ! show admin login */}
                <div className="tab-pane fade w-100  show active" id="nav-admin" role="tabpanel" aria-labelledby="nav-admin-tab" tabIndex={0}>
                  <form onSubmit={adminFormik.handleSubmit} className="text-center mx-auto p-2">
                    <div className="mb-4">
                      <input onBlur={adminFormik.handleBlur} onChange={adminFormik.handleChange} value={adminFormik.values.SpecialId} type="text" name="SpecialId" id="SpecialId" className="form-control" placeholder="SpecialId" />
                      {adminFormik.errors.SpecialId && adminFormik.touched.SpecialId ? <div className="alert alert-danger my-2 p-2">{adminFormik.errors.SpecialId}</div> : ""}
                    </div>
                    <button type='submit' className={` w-100 mt-3 rounded-pill border-0 px-4 py-2 ${Styles.bgOrangeColor}`}>Submit</button>
                  </form>
                </div>
                {/* ! show agent login */}
                <div className="tab-pane fade" id="nav-agent" role="tabpanel" aria-labelledby="nav-agent-tab" tabIndex={0}>
                  <form onSubmit={agentFormik.handleSubmit} className="text-center mx-auto p-2">
                    <div className="mb-4">
                      <input onBlur={agentFormik.handleBlur} onChange={agentFormik.handleChange} value={agentFormik.values.Email} type="email" name="Email" id="Email" className="form-control" placeholder="Email" />
                      {adminFormik.errors.Email && adminFormik.touched.Email ? <div className="alert alert-danger my-2 p-2">{adminFormik.errors.Email}</div> : ""}
                    </div>
                    <div className="mb-4">
                      <input onBlur={agentFormik.handleBlur} onChange={agentFormik.handleChange} value={agentFormik.values.Password} type="password" name="Password" id="Password" className="form-control" placeholder="Password" />
                      {adminFormik.errors.Password && adminFormik.touched.Password ? <div className="alert alert-danger my-2 p-2">{adminFormik.errors.Password}</div> : ""}
                    </div>
                    <button type='submit' className={` w-100 mt-3 rounded-pill border-0 px-4 py-2 ${Styles.bgOrangeColor}`}>Submit</button>
                  </form>
                </div>
              </div>



            </div>
          </div>
        </div>
      </section>

    </>
  )
}
