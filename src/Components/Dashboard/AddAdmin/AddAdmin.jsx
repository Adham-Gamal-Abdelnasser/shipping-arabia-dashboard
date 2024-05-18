import React from 'react';
import Styles from './AddAdmin.module.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { baseUrl } from '../../../env.js';
import axios from 'axios';

export default function AddAdmin() {
    const notify = (msg, type) => toast[type](msg);

    let addValidationSchema = Yup.object({
        Branch: Yup.string().required('Branch is required'),
        Role: Yup.string().required('Role is required'),
        SpecialId: Yup.string().required('SpecialId is required').length(9, 'SpecialId must be exactly 9 characters long')
    });

    let addFormik = useFormik({
        initialValues: {
            Branch: '',
            Role: '',
            SpecialId: ''
        },
        validationSchema: addValidationSchema,
        onSubmit: async (values) => {
            console.log(values);
            let updatedValues = {};
            if (values.Role === 'super_admin') {
                updatedValues = {
                    ...values,
                    SpecialId: `73s75u70p65e72r${values.SpecialId}`
                };
            } else {
                updatedValues = {
                    ...values,
                    SpecialId: `61a64d6Dm69i6En${values.SpecialId}`
                };
            }
            try {
                const result = await axios.post(`${baseUrl}/admin/signup`, updatedValues);
                
                notify(result.data.message, 'success');
                result && console.log(result);
                localStorage.setItem('token', result?.data?.token);
                document.getElementById("popUpParent").classList.replace("d-flex","d-none")
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    notify(error.message, 'error');
                }
            }
        }
    });

   
    return (
        <>
            <div id="popUpParent" className={`${Styles.popUpParent} d-none justify-content-center align-items-center position-fixed top-0 start-0 end-0 bottom-0 bg-black bg-opacity-75`}>
                <div className={`${Styles.popUp} bg-white w-25 h-50 rounded-3 position-relative p-3`}>
                    <i className='fas fa-xmark position-absolute fs-3' onClick={()=>{
                            document.getElementById("popUpParent").classList.replace("d-flex","d-none")
                        }}></i>
                    <form onSubmit={addFormik.handleSubmit} className='my-5'>
                        <div className="mb-3">
                            <select
                                onBlur={addFormik.handleBlur}
                                onChange={addFormik.handleChange}
                                value={addFormik.values.Branch}
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
                            {addFormik.errors.Branch && addFormik.touched.Branch ? (
                                <div className="alert alert-danger my-2 p-2">{addFormik.errors.Branch}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <select
                                onBlur={addFormik.handleBlur}
                                onChange={addFormik.handleChange}
                                value={addFormik.values.Role}
                                className="form-select"
                                aria-label="Default select example"
                                name="Role"
                                id="Role"
                            >
                                <option value="" disabled selected>Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="super_admin">Super Admin</option>
                            </select>
                            {addFormik.errors.Role && addFormik.touched.Role ? (
                                <div className="alert alert-danger my-2 p-2">{addFormik.errors.Role}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <input
                                onBlur={addFormik.handleBlur}
                                onChange={addFormik.handleChange}
                                value={addFormik.values.SpecialId}
                                type="text"
                                className="form-control"
                                id="SpecialId"
                                name="SpecialId"
                                placeholder="Enter SpecialId"
                            />
                            {addFormik.errors.SpecialId && addFormik.touched.SpecialId ? (
                                <div className="alert alert-danger my-2 p-2">{addFormik.errors.SpecialId}</div>
                            ) : null}
                        </div>
                        <button type="submit"  className={`btn ${Styles.add} w-100`}>Add</button>
                    </form>
                </div>
            </div>
        </>
    );
}