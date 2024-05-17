import React from 'react'
import Styles from "./SideBar.module.css"
import {  Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

export default function SideBar() {
  let navigate = useNavigate()
  
  const routes = [
    {name:"shipping",path:"/shipping"},
    {name:"message",path:"/message"},
    {name:"shipping-agent",path:"/shipping-agent"},
    {name:"admins",path:"/admins"},
    {name:"users",path:"/users"},
  ]
  let location = useLocation()
  let pathName = location.pathname
  return (
    <>
      <aside className=' min-vh-100 px-4 py-5 d-flex flex-column justify-content-between'>
      <ul className="list-unstyled">
          {
            routes.map((item,index)=>{
              let isActive = item.path == pathName;
              return (
                <li className={`rounded-pill my-3 py-2 px-4 text-capitalize text-start ${isActive?Styles.active:null}`}><Link to={item.path} className={` text-decoration-none`}>{item.name}</Link></li>
              ) 
            })
          }
        </ul>
        <button type='submit' onClick={()=>{
          localStorage.removeItem("token")
          navigate("/register")
        }} className={`${Styles.btnCustom} rounded-3 py-2`}><i class="fa-solid fa-right-from-bracket"></i> Log Out</button>
      </aside>
    </>
  )
}
