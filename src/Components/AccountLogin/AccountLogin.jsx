import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'
import axios from 'axios'
import FormData from 'form-data'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const AccountLogin = ({
    cardTitle,
    cardPara,
    passwordField,
    sub
}) => {

    const toastId = React.useRef(null);

    const navigate = useNavigate()
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)

    const loginData = new FormData()
    loginData.append('email', email)
    loginData.append('password', password)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }

    const notify = () => toastId.current = toast.loading("please wait...");
    const dismiss = () => toast.dismiss(toastId.current);


    function handleLogin() {
        notify()
        axios.post('https://vica.website/api/login', loginData, config)
            .then((res) => {
                dismiss()
                localStorage.setItem("welcome", "welcome")
                console.log(res.data.user.profile_image_url)
                const token = res.data.token
                localStorage.setItem('token', JSON.stringify(token))
                localStorage.setItem('first_name', JSON.stringify(res.data.user.first_name))
                localStorage.setItem('last_name', JSON.stringify(res.data.user.last_name))
                localStorage.setItem('user_name', JSON.stringify(res.data.user.user_name))
                localStorage.setItem('profile_image_url', JSON.stringify(res.data.user.profile_image_url))
                navigate('/');
            })
            .catch((err) => {
                dismiss()
                toast.error(String(err.response.data.msg)), console.log(err)
            })
    }

    return (
        <>
            <ToastContainer autoClose={3000} newestOnTop={true} />
            <div
                className={'signCard bg-white rounded-xl xl:p-10 xs:p-2 flex flex-col gap-5 xs-m-4'}
            >
                <div className="title flex-col py-3 w-full">
                    <h4 className="font-bold text-center text-2xl">{cardTitle}</h4>
                    <p className="text-center ">{cardPara}</p>
                </div>
                <form
                    className="card"
                    onSubmit={(event) => {
                        event.preventDefault()
                        handleLogin()
                    }}
                >
                    <div className="email px-10 py-1 w-full">
                        <label htmlFor="email" className="block text-sm">
                            Email:
                        </label>
                        <input
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                            type="email"
                            name="email"
                            className="w-full rounded-lg outline-none bg-slate-200"
                            placeholder="Email"
                        />
                    </div>
                    <div className="passwords flex justify-evenly py-1 gap-10 px-10 w-full">
                        {passwordField.map((element, index) => {
                            return (
                                <div className={'w-full'} key={index} >
                                    <label htmlFor={element.psw} className="block text-sm">
                                        {element.psw + ':'}
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="********"
                                        required
                                        className="w-full rounded-lg outline-none bg-slate-200"
                                        id={element.psw}
                                        name={'password'}
                                        onChange={
                                            (event) => setPassword(event.target.value)
                                        }
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="signupButton p-5 w-5/6 flex justify-center items-center flex-wrap  m-auto ">
                        <input
                            type="submit"
                            value={sub}
                            className="w-full p-2 text-white bg-cyan-800 rounded-lg cursor-pointer font-bold"
                        />
                        <div
                            className="bottomLink w-full text-sm flex gap-1 py-3"
                        >
                            <p className="inline text-gray-500 ">Don't have an account?</p>
                            <Link to={'/Signup'} className="text-cyan-800 underline">
                                Create Account
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AccountLogin
