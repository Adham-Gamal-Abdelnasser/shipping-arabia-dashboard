import DataTable from 'react-data-table-component';
import { baseUrl } from '../../../env.js';
import Styles from "./User.module.css"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const situations = ["", "submit", "prepared", "on way", "arrived", "confirmed"];
const notify = (msg,type) => toast[type](msg);
  export default function User() {
    const [users,setUsers] = useState([])
    const [isDeleted,setIsDeleted] = useState(false)
    const columns = [
      {
        name: 'Name',
        selector: row => row.Name,
        minWidth:"140px"

      },
      {
        name: 'Email',
        selector: row => row.Email,
        minWidth:"220px"
      },
      {
        name: 'Phone',
        selector: row => row.Phone,
        minWidth:"150px"
      },
      {
        name: 'Address',
        selector: row => `${row.Address.country},${row.Address.Governorate},${row.Address.Address}`,
        minWidth:"250px"
      },
      {
        name: 'Role',
        selector: row => <div className={`${Styles.bgOrangeColor} text-white rounded-pill px-2 py-1`}>{row.Role}</div>,
      },
        {
        name: 'Action',
        selector: row => <button className={`${Styles.textOrangeColor} btn`}><i className='fas fa-trash-can' onClick={async ()=>{
          try {
            const result = await axios.delete(`${baseUrl}/user/${row._id}` , {
              headers:{
                token: localStorage.getItem("token")
              }
            })
            result && setIsDeleted(!isDeleted);
            result && notify("User deleted successfully !","success");
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
            const result = await axios.get(`${baseUrl}/user`,{
              headers : {
                  token:localStorage.getItem("token")

              }
            })
            console.log(result?.data?.result);
            result && setUsers(result?.data?.result)
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
<<<<<<< HEAD
              <main className='border border-1 border-bg-black shadow-lg rounded-3 overflow-auto'>
=======
              <main className='border border-1 border-bg-black shadow-lg rounded-3'>
>>>>>>> main
                  <header className='d-flex justify-content-between pt-3 px-3'>
                      <h2>Users</h2>
                      <div className=" mb-3">
                          <input type="email" className="form-control px-5 rounded-pill" placeholder="name@example.com" />
                      </div>

                  </header>
                  <section>
                      <DataTable
                      columns={columns}
                      data={users}
                      />
                  </section>
              </main>
              
          </>
      
    );
  };