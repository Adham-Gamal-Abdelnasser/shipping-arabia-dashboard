import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar.jsx'
import Navbar from '../NavBar/Navbar.jsx'

export default function Layout() {
  return (
    <>
        <Navbar></Navbar>
        <div className='d-flex'>
          <div className='w-25'>
            <SideBar></SideBar>
          </div>
          <div className='w-75 p-5 mt-5'>
            <Outlet></Outlet>
          </div>
        </div>
    </>
  )
}