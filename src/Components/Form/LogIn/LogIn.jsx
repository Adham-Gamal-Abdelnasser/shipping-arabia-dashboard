import React from 'react'
import ShippingLogo from "../../../assets/image 1.png"
import Styles from "./LogIn.module.css"

export default function LogIn() {
  return (
    <>
    
    <section className="min-vh-100">
      <div className="container-fluid">
        <div className="row flex-row align-items-center ">
          <div className={`col-md-5 ${Styles.leftSide} min-vh-100 d-flex justify-content-center align-items-center`}>
            
              <div className={`text-start text-white d-flex flex-column gap-4 `}>
                <h1>Welcome To Shipping Arabia</h1>
                <h3>Join Us Now</h3>
                <div className={`${Styles.websiteLogo} align-self-center`}>
                  <img src={ShippingLogo} className="w-100" />
                </div>
              </div>
            
          </div>
          <div className={`col-md-7 ${Styles.rightSide} min-vh-100 rounded-start-5 shadow-lg d-flex align-items-center`}>
            <div className="text-center w-75 mx-auto p-4 w-100 ">
              <h1 className="text-capitalize text-black  mb-5">welcome back to Shipping Arabia!</h1>
              <div className="mb-4">
                <input type="text" name="userNameOrEmail" id="nameInput" className="form-control" placeholder="username or email" />
              </div>
              <div className="mb-4">
                <input type="password" name="password" id="passwordInput" className="form-control" placeholder="password" />
              </div>
              <button type="button" className={` w-100 mt-3 rounded-pill border-0 px-4 py-2 ${Styles.bgOrangeColor}`}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  )
}
