import React from 'react'
import "./signin.css"
import AccountLogin from '../../../Components/AccountLogin/AccountLogin'
import SignBg from "../../../../public/assets/pngs/auth-bg.png"


const Signin = () => {

    return (
        <>
            <img src={SignBg} alt="" className="signBg w-lvw h-lvh fit-cover  absolute -z-50 " />
            <div className="signContainer flex justify-center items-center h-lvh ">
                <AccountLogin
                    cardTitle="Login"
                    cardPara="Enter your email and password to continue"
                    passwordField={[{ psw: "Password" }]}
                    sub="Sign in"
                />
            </div>
        </>
    )
}

export default Signin