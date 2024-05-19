import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar.jsx'
import Navbar from '../NavBar/Navbar.jsx'
import AddAdmin from '../AddAdmin/AddAdmin.jsx'
<<<<<<< HEAD
import AddAgent from '../AddAgent/AddAgent.jsx'

export default function Layout() {
  return (
    <>
        <AddAdmin></AddAdmin>
        <AddAgent></AddAgent>
        <Navbar></Navbar>
        <div className='d-flex min-vh-100'>
          <div className='w-25'>
            <SideBar></SideBar>
          </div>
          <div className='w-75 p-5 mt-5'>
            <Outlet></Outlet>
          </div>
        </div>
    </>
=======
import AddNewMessageModal from '../Message/AddNewMessageModal.jsx'
import { useSelector } from 'react-redux'

export default function Layout() {
  const { openAddNewMessage } = useSelector((state) => state.GlobalReducer);


  return (
    <div className="relative">
      <Navbar></Navbar>
      <div className='d-flex'>
        <div className='w-25'>
          <SideBar></SideBar>
        </div>
        <div className='w-75 p-5 mt-5'>
          <AddAdmin></AddAdmin>
          <Outlet></Outlet>
        </div>
      </div>
      <div className={`absolute top-0 left-0 z-50 bg-[#0a2f351a] w-full h-[100vh] justify-center flex items-center p-12
      ${!openAddNewMessage ? "hidden" : null}
      `}>
        <AddNewMessageModal />
      </div>
    </div>
>>>>>>> main
  )
}
