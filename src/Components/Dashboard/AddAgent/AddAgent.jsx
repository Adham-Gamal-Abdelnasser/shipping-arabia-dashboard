import React from 'react'
import Styles from "./AddAgent.module.css"
import { toast } from 'react-toastify'
import * as Yup from "yup"
import {useFormik} from "formik"
import { baseUrl } from '../../../env.js'
import axios from "axios"

export default function AddAgent() {
    const notify =(msg,type)=> toast[type](msg)
    let agentValidationSchema = Yup.object({
        Name: Yup.string().required("Name is required"),
        Email: Yup.string().email().required("email is required"),
        Password: Yup.string().required("password is required"),
        Phone: Yup.number().required("phone is required"),
        Governorate: Yup.string().required("Governorate is required"),
        Address: Yup.string().required("Address is required"),
        Neighborhood: Yup.string().required()
    })
    let agentFormik = useFormik({
        initialValues:{
            Name: "",
            Email: "",
            Password: "",
            Phone: "",
            Role:"agent",
            Governorate: "",
            Address: "",
            Neighborhood: ""
        },
        validationSchema: agentValidationSchema,
        onSubmit:async(values)=>{
            const updatedValues = {
                Name: values.Name,
                Email: values.Email,
                Password: values.Password,
                Phone: `+2${values.Phone}`,
                Role:"agent",
                Address: {
                    country:"Egypt",
                    Governorate: values.Governorate,
                    Address: values.Address,
                },
                Area: {
                    country:"Egypt",
                    Governorate: values.Governorate,
                    Neighborhood: values.Neighborhood,
                }
            }
            console.log(updatedValues);

            try {
                const result = await axios.post(`${baseUrl}agent/add`,updatedValues,
                    {
                        headers:{
                            token:localStorage.getItem("token")
                        }
                    }
                )
                localStorage.setItem('token', result?.data?.token);
                document.getElementById("agentPopUp").classList.replace("d-flex","d-none")
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
        <div id="agentPopUp" className={`${Styles.agentPopUp} d-none justify-content-center align-items-center position-fixed top-0 start-0 end-0 bottom-0 bg-black bg-opacity-75`}>
            <div className={`bg-white w-25 h-75 overflow-auto rounded-3 position-relative p-3`}>
                <i className='fas fa-xmark position-absolute fs-3' onClick={()=>{
                        document.getElementById("agentPopUp").classList.replace("d-flex","d-none")
                    }}></i>
                <form onSubmit={agentFormik.handleSubmit} className='my-5'>
                    <div className="mb-3">
                        <input
                            onBlur={agentFormik.handleBlur}
                            onChange={agentFormik.handleChange}
                            value={agentFormik.values.Name}
                            type="text"
                            className="form-control"
                            id="Name"
                            name="Name"
                            placeholder="Enter Name"
                        />
                        {agentFormik.errors.Name && agentFormik.touched.Name ? (
                            <div className="alert alert-danger my-2 p-2">{agentFormik.errors.Name}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <input
                            onBlur={agentFormik.handleBlur}
                            onChange={agentFormik.handleChange}
                            value={agentFormik.values.Email}
                            type="email"
                            className="form-control"
                            id="Email"
                            name="Email"
                            placeholder="Enter Email"
                        />
                        {agentFormik.errors.Email && agentFormik.touched.Email ? (
                            <div className="alert alert-danger my-2 p-2">{agentFormik.errors.Email}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <input
                            onBlur={agentFormik.handleBlur}
                            onChange={agentFormik.handleChange}
                            value={agentFormik.values.Password}
                            type="password"
                            className="form-control"
                            id="Password"
                            name="Password"
                            placeholder="Enter Password"
                        />
                        {agentFormik.errors.Password && agentFormik.touched.Password ? (
                            <div className="alert alert-danger my-2 p-2">{agentFormik.errors.Password}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <input
                            onBlur={agentFormik.handleBlur}
                            onChange={agentFormik.handleChange}
                            value={agentFormik.values.Phone}
                            type="Phone"
                            className="form-control"
                            id="Phone"
                            name="Phone"
                            placeholder="Enter Phone"
                        />
                        {agentFormik.errors.Phone && agentFormik.touched.Phone ? (
                            <div className="alert alert-danger my-2 p-2">{agentFormik.errors.Phone}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <input
                            onBlur={agentFormik.handleBlur}
                            onChange={agentFormik.handleChange}
                            value={agentFormik.values.Governorate}
                            type="text"
                            className="form-control"
                            id="Governorate"
                            name="Governorate"
                            placeholder="Enter Governorate"
                        />
                        {agentFormik.errors.Governorate && agentFormik.touched.Governorate ? (
                            <div className="alert alert-danger my-2 p-2">{agentFormik.errors.Governorate}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <input
                            onBlur={agentFormik.handleBlur}
                            onChange={agentFormik.handleChange}
                            value={agentFormik.values.Address}
                            type="text"
                            className="form-control"
                            id="Address"
                            name="Address"
                            placeholder="Enter Address"
                        />
                        {agentFormik.errors.Address && agentFormik.touched.Address ? (
                            <div className="alert alert-danger my-2 p-2">{agentFormik.errors.Address}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <input
                            onBlur={agentFormik.handleBlur}
                            onChange={agentFormik.handleChange}
                            value={agentFormik.values.Neighborhood}
                            type="text"
                            className="form-control"
                            id="Neighborhood"
                            name="Neighborhood"
                            placeholder="Enter Neighborhood"
                        />
                        {agentFormik.errors.Neighborhood && agentFormik.touched.Neighborhood ? (
                            <div className="alert alert-danger my-2 p-2">{agentFormik.errors.Neighborhood}</div>
                        ) : null}
                    </div>
                    <button type="submit"  className={`btn ${Styles.add} w-100`}>Add</button>
                </form>
            </div>
        </div>
    </>
  )
}
