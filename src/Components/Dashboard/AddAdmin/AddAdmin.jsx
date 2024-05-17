import React from 'react'
import Styles from "./AddAdmin.module.css"
import { toast } from 'react-toastify';
import * as Yup from "yup"
import { useFormik } from 'formik';
import { baseUrl } from '../../../env.js';
import axios from 'axios';


export default function AddAdmin() {
    const notify = (msg,type) => toast[type](msg);
    let addValidationSchema = Yup.object({
        // branch: Yup.required() ,
        // role: Yup.required(),
        mail: Yup.string().email().required(),

    })
    let addFormik = useFormik({
        initialValues: {
            branch:"",
            Role:"",
            mail:""
        },
        validationSchema:addValidationSchema,
        onSubmit:async(values)=>{
            console.log(values);
            try{
                const result = await axios.post(`${baseUrl}/admin/signup`,values)
                notify(result.data.message,"success")
                result && console.log(result)
                localStorage.setItem("token",result?.data?.token) 
            }
            catch(error){
                if (error.response.request.status == 400) {
                    notify(error.message,"error")
                }
            }

        }
    })
  return (
    <>
        <div className={`${Styles.popUpParent} d-flex justify-content-center align-items-center position-fixed top-0 start-0 end-0 bottom-0 bg-black bg-opacity-75`}>
            <div className={`${Styles.popUp} bg-white w-25 h-50 rounded-3 p-3`}>
                <form onSubmit={addFormik.handleSubmit}>
                    <div className="mb-3">
                        <select onBlur={addFormik.handleBlur} onChange={addFormik.handleChange} value={addFormik.values.branch} class="form-select" aria-label="Default select example" name='branch'>
                            <option selected>Choose Branch</option>
                            <option value="dammam">Dammam</option>
                            <option value="jeddah">Jeddah</option>
                            <option value="riyadh">Riyadh</option>
                        </select>
                        {addFormik.errors.branch && addFormik.touched.branch ? <div className="alert alert-danger my-2 p-2">{addFormik.errors.branch}</div>:""}
                    </div>
                    <div className="mb-3">
                        <select onBlur={addFormik.handleBlur} onChange={addFormik.handleChange} value={addFormik.values.Role} class="form-select" aria-label="Default select example" name='Role'>
                            <option selected>Choose Role</option>
                            <option value="admin">Admin</option>
                            <option value="super_admin">Super Admin</option>
                        </select>
                        {addFormik.errors.Role && addFormik.touched.Role ? <div className="alert alert-danger my-2 p-2">{addFormik.errors.Role}</div>:""}

                    </div>
                    <div className="mb-3">
                        <input onBlur={addFormik.handleBlur} onChange={addFormik.handleChange} value={addFormik.values.mail} type="email" className="form-control" id="mail" name='mail' placeholder="name@example.com" />
                        {addFormik.errors.mail && addFormik.touched.mail ? <div className="alert alert-danger my-2 p-2">{addFormik.errors.mail}</div>:""}
                    </div>
                    <button  type="submit" className={`btn ${Styles.add} w-100`}>Add</button>
                </form>

            </div>
        </div>
    </>
  )
}
