import React from 'react'
// import Styles from "./AddShipping.module.css"
import Styles from "./AddShipping.module.css"
import { toast } from 'react-toastify'
import * as Yup from "yup"
import {useFormik} from "formik"
import { baseUrl } from '../../../env.js'
import axios from "axios"

export default function AddShiping() {
    const notify =(msg,type)=> toast[type](msg)
    let shippingValidationSchema = Yup.object({
        ReceiverName: Yup.string().min(9).required("ReceiverName is required"),
        Email: Yup.string().email().required("email is required"),
        Phone: Yup.number().required("phone is required"),
        Governorate: Yup.string().required("Governorate is required"),
        Address: Yup.string().required("Address is required"),
        situation: Yup.number().required(),
        Branch: Yup.string().required(),


    })
    let shippingFormik = useFormik({
        initialValues:{
            ReceiverName: "",
            Email: "",
            Phone: "",
            Governorate: "",
            Address: "",
            situation:"",
            Branch:""
        },
        validationSchema: shippingValidationSchema,
        onSubmit:async(values)=>{
            const updatedValues = {
                ReceiverName: values.ReceiverName,
                Email: values.Email,
                Phone: `+2${values.Phone}`,
                Branch: values.Branch,
                situation:parseInt(values.situation),
                Destination: {
                    Governorate: values.Governorate,
                    Address: values.Address,
                }
            }

            try {
                const result = await axios.post(`${baseUrl}applications`,updatedValues,
                    {
                        headers:{
                            token:localStorage.getItem("token")
                        }
                    }
                )
                localStorage.setItem('token', result?.data?.token);
                document.getElementById("appPopUp").classList.replace("d-flex","d-none")
            }
            catch (error) {
                if (error.response && error.response.status === 400) {
                    notify(error.message, 'error');
                }
            }
        }
    })
  return (
        <>
        <div id="appPopUp" className={` z-50 d-none justify-content-center align-items-center position-fixed top-0 start-0 end-0 bottom-0 bg-black bg-opacity-75`}>
            <div className={`bg-white w-25 h-75 overflow-auto rounded-3 position-relative p-3`}>
                <i className='fas fa-xmark position-absolute fs-3' onClick={()=>{
                        document.getElementById("appPopUp").classList.replace("d-flex","d-none")
                    }}></i>
                <form onSubmit={shippingFormik.handleSubmit} className='my-5'>
                    <div className="mb-3">
                        <input
                            onBlur={shippingFormik.handleBlur}
                            onChange={shippingFormik.handleChange}
                            value={shippingFormik.values.ReceiverName}
                            type="text"
                            className="form-control"
                            id="ReceiverName"
                            name="ReceiverName"
                            placeholder="Enter ReceiverName"
                        />
                        {shippingFormik.errors.ReceiverName && shippingFormik.touched.ReceiverName ? (
                            <div className="alert alert-danger my-2 p-2">{shippingFormik.errors.ReceiverName}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <input
                            onBlur={shippingFormik.handleBlur}
                            onChange={shippingFormik.handleChange}
                            value={shippingFormik.values.Email}
                            type="email"
                            className="form-control"
                            id="Email"
                            name="Email"
                            placeholder="Enter Email"
                        />
                        {shippingFormik.errors.Email && shippingFormik.touched.Email ? (
                            <div className="alert alert-danger my-2 p-2">{shippingFormik.errors.Email}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                            <select
                                onBlur={shippingFormik.handleBlur}
                                onChange={shippingFormik.handleChange}
                                value={shippingFormik.values.Branch}
                                className="form-select"
                                aria-label="Default select example"
                                name="Branch"
                                id="Branch"
                            >
                                <option value="" disabled selected>Choose Branch</option>
                                <option value="dammam">Dammam</option>
                                <option value="jeddah">Jeddah</option>
                                <option value="riyadh">Riyadh</option>
                            </select>
                            {shippingFormik.errors.Branch && shippingFormik.touched.Branch ? (
                                <div className="alert alert-danger my-2 p-2">{shippingFormik.errors.Branch}</div>
                            ) : null}
                    </div>
                    <div className="mb-3">
                            <select
                                onBlur={shippingFormik.handleBlur}
                                onChange={shippingFormik.handleChange}
                                value={shippingFormik.values.situation}
                                className="form-select"
                                aria-label="Default select example"
                                name="situation"
                                id="situation"
                            >
                                <option value="" disabled selected>Choose situation</option>
                                <option value="1">Your shipping in inventory</option>
                                <option value="2">Your shipping in saudi port</option>
                                <option value="3">Your shipping in egyptian port</option>
                                <option value="4">On way your home</option>
                                <option value="5">Delivered</option>
                            </select>
                            {shippingFormik.errors.situation && shippingFormik.touched.situation ? (
                                <div className="alert alert-danger my-2 p-2">{shippingFormik.errors.situation}</div>
                            ) : null}
                    </div>
                    <div className="mb-3">
                        <input
                            onBlur={shippingFormik.handleBlur}
                            onChange={shippingFormik.handleChange}
                            value={shippingFormik.values.Password}
                            type="password"
                            className="form-control"
                            id="Password"
                            name="Password"
                            placeholder="Enter Password"
                        />
                        {shippingFormik.errors.Password && shippingFormik.touched.Password ? (
                            <div className="alert alert-danger my-2 p-2">{shippingFormik.errors.Password}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <input
                            onBlur={shippingFormik.handleBlur}
                            onChange={shippingFormik.handleChange}
                            value={shippingFormik.values.Phone}
                            type="Phone"
                            className="form-control"
                            id="Phone"
                            name="Phone"
                            placeholder="Enter Phone"
                        />
                        {shippingFormik.errors.Phone && shippingFormik.touched.Phone ? (
                            <div className="alert alert-danger my-2 p-2">{shippingFormik.errors.Phone}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <input
                            onBlur={shippingFormik.handleBlur}
                            onChange={shippingFormik.handleChange}
                            value={shippingFormik.values.Governorate}
                            type="text"
                            className="form-control"
                            id="Governorate"
                            name="Governorate"
                            placeholder="Enter Governorate"
                        />
                        {shippingFormik.errors.Governorate && shippingFormik.touched.Governorate ? (
                            <div className="alert alert-danger my-2 p-2">{shippingFormik.errors.Governorate}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <input
                            onBlur={shippingFormik.handleBlur}
                            onChange={shippingFormik.handleChange}
                            value={shippingFormik.values.Address}
                            type="text"
                            className="form-control"
                            id="Address"
                            name="Address"
                            placeholder="Enter Address"
                        />
                        {shippingFormik.errors.Address && shippingFormik.touched.Address ? (
                            <div className="alert alert-danger my-2 p-2">{shippingFormik.errors.Address}</div>
                        ) : null}
                    </div>
                    <button type="submit"  className={`btn ${Styles.add} w-100`}>Add</button>
                </form>
            </div>
        </div>
    </>
  )
}
