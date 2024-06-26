import DataTable from 'react-data-table-component';
import Styles from "./Shipping.module.css"
import { baseUrl } from '../../../env.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const situations = ["", "submit", "prepared", "on way", "arrived", "confirmed"];
const notify = (msg,type) => toast[type](msg);

  export default function Shipping() {
    const [shipping,setShipping] = useState([])
    const [isDeleted,setIsDeleted] = useState(false)
    const columns = [
      {
        name: 'Name',
        selector: row => row.ReceiverName,
      },
      {
        name: 'Email',
        selector: row => row.Email,
      },
        {
        name: 'Status',
        selector: row => <div className={`${Styles.bgOrangeColor} text-white rounded-pill px-2 py-1`}>{situations[row.situation]}</div>,
      },
        {
        name: 'Action',
        selector: row => <button className={`${Styles.textOrangeColor} btn`}><i className='fas fa-trash-can' onClick={async ()=>{
          try {
            const result = await axios.delete(`${baseUrl}/applications/${row._id}` , {
              headers:{
                token: localStorage.getItem("token")
              }
            })
            result && setIsDeleted(!isDeleted);
            result && notify("Shipping deleted successfully !","success");
          }catch(error){
            console.log(error);
            error && notify("un authorized","error")
            return error
          }
        }}></i></button>,
      },
    ];
      const getApplication =async ()=>{
          try {
            const result = await axios.get(`${baseUrl}/applications`,{
              headers : {
                  token:localStorage.getItem("token")
              }
            })
            console.log(result?.data?.result);
            result && setShipping(result?.data?.result)
          }
          catch (error){
            return error
          }
        }
        useEffect(()=>{
          getApplication()
        },[isDeleted])
    return (
          <>
              <main className='border border-1 border-bg-black shadow-lg rounded-3 overflow-auto'>


              <header className='d-flex justify-content-between pt-3 px-3'>
                      <h2>Shippings</h2>
                      <div className="d-flex gap-3 mb-3">
                      <button className={`btn  ${Styles.btnCustom}`} onClick={()=>{
                          document.getElementById("appPopUp").classList.replace("d-none","d-flex")
                        }}>Add Shipping</button>
                          <input type="email" className="form-control px-5 rounded-pill" placeholder="name@example.com" />
                      </div>

                  </header>
                  <section>
                      <DataTable columns={columns} data={shipping} />
                  </section>
              </main>
              
          </>
      
    );
  };