import React from 'react'
import SignBg from '../../../../public/assets/pngs/auth-bg.png'
import Signing from "../../../Components/AccountSigning/Signing"
const Signup = () => {
    return (
        <>
            <img src={SignBg} alt="" className="signBg w-lvw h-lvh absolute -z-10 " />
            <div className="signContainer flex justify-center items-center h-lvh ">
                <Signing
                    cardTitle="Create an Account"
                    cardPara="create an account to continue"
                    nameInfo={[
                        { text: 'First Name' },
                        { text: 'Last Name' }
                    ]}
                    passwordField={[{ psw: "Password" }, { psw: "Password Confirmation" }]}
                    sub="Sign Up"
                />
            </div>
        </>
    )
}

export default Signup
