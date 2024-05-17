import React from 'react'
import logo from "../../../assets/logo.png"
import Styles from "./NavBar.module.css"

export default function Navbar() {
  return (
    <>
        <nav className={`p-2 text-white fixed-top`}>
            <div className={`d-flex pt-2  justify-content-center gap-2 ms-auto ${Styles.user}`}>
                <p>User Name</p>
                <div className={`${Styles.userImage}`}>
                    <img src={logo} className='w-100' />
                </div>
            </div>
        </nav>
    </>
  )
}
