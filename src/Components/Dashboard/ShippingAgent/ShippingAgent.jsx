import DataTable from 'react-data-table-component';
import Styles from "./ShippingAgent.module.css"
import { baseUrl } from '../../../env.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ShippingAgent() {
  const [agents,setAgents] = useState([])
  const [isDeleted,setIsDeleted] = useState(false)
  const notify = (msg,type) => toast[type](msg);
    const columns = [
        {
          name: 'Name',
          selector: row => row.Name,
        },
        {
          name: 'Email',
          selector: row => row.Email,
          minWidth: "150px"
        },
          {
          name: 'Role',
          selector: row => <div className={`${Styles.bgOrangeColor} text-white rounded-pill px-2 py-1`}>{row.Role}</div>,
        },
        {
            name: 'Phone',
            selector: row => row.Phone,
            minWidth: "150px"
        },
        {
            name: 'Address',
            selector: row => `${row.Address.country},${row.Address.Governorate},${row.Address.Address}`,
        },
        {
          name: 'Action',
          selector: row => <button className={`${Styles.textOrangeColor} btn`}><i className='fas fa-trash-can'  onClick={async () => {
            try {
                const result = await axios.delete(`${baseUrl}agent/${row._id}`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });
                result && setIsDeleted(!isDeleted);
                result && notify("Agent deleted successfully !","success");
            } catch (error) {
                error && notify("un authorized","error")
                return error;
            }
        }}></i></button>,
        },
      ];
      const getApplication =async ()=>{
          try {
            const result = await axios.get(`${baseUrl}/agent`,{
              headers : {
                  token:localStorage.getItem("token")
              }
            })
            result && setAgents(result?.data?.result)
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
                      <h2>Shipping Agent</h2>
                      <div className="d-flex gap-3 mb-3">
                      <button className={`btn  ${Styles.btnCustom}`} onClick={()=>{
                          document.getElementById("agentPopUp").classList.replace("d-none","d-flex")
                        }}>Add Agent</button>
                          <input type="email" className="form-control px-5 rounded-pill" placeholder="name@example.com" />
                      </div>

                  </header>
                  <section>
                      <DataTable columns={columns} data={agents} />
                  </section>
              </main> 
          </>
    );
  };