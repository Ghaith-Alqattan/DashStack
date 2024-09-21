import React, { useState } from 'react'
import pfpImage from '../../../public/assets/pngs/profile-avatar.png'
import './Signing.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'
import axios from 'axios'
import FormData from 'form-data'
import { Link, Navigate, useNavigate } from 'react-router-dom'
const Signing = ({
    cardTitle,
    cardPara,
    nameInfo,
    passwordField,
    sub,
}) => {

    const toastId = React.useRef(null);

    const [image, setImage] = useState(pfpImage)
    const [password, setPassword] = useState(null)
    const [passwordAgain, setPasswordAgain] = useState(null)
    const [email, setEmail] = useState(null)
    const [first_name, setFirst_name] = useState(null)
    const [last_name, setLast_name] = useState(null)
    const [user_name, setUser_name] = useState(null)
    const [profileImage, setPfpImage] = useState(image)
    const [isCreated, setIsCreated] = useState(false)
    const navigate = useNavigate()

    const notify = () => toastId.current = toast.loading("please wait...");
    const dismiss = () => toast.dismiss(toastId.current);

    const RegisterData = new FormData()
    RegisterData.append('first_name', first_name)
    RegisterData.append('last_name', last_name)
    RegisterData.append('user_name', user_name)
    RegisterData.append('email', email)
    RegisterData.append('password', password)
    RegisterData.append('password_confirmation', passwordAgain)
    RegisterData.append('profile_image', image)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }

    function handleRegister() {
        notify()
        axios
            .post('https://vica.website/api/register', RegisterData, config)
            .then((res) => {
                (toast.success(String(res.data.message)), console.log(res.data.message)) ? setIsCreated(true) : setIsCreated(false)
                dismiss()
                setTimeout(() => {
                    navigate("/login")
                }, 4000)
            })
            .catch((err) => {
                toast.error(String(err.response.data.message)), console.log(err)
                dismiss()
            })

    }

    function req(event) {
        setImage(event.target.files[0])
        setPfpImage(URL.createObjectURL(event.target.files[0]))
        console.log(event.target.files[0])
    }

    return (
        <>
            <ToastContainer autoClose={3000} newestOnTop={true} />
            <div
                className={
                    'signCard bg-white rounded-3xl flex flex-col xs:text-center'
                }
            >
                <div className="title flex-col py-3">
                    <h4 className="font-bold text-center xl:text-2xl xs:text-lg">{cardTitle}</h4>
                    <p className="text-center xs:text-sm">{cardPara}</p>
                </div>
                <form
                    className="card"
                    onSubmit={(event) => {
                        event.preventDefault()
                        handleRegister()
                    }}
                >
                    <div className="name xl:flex xl:flex-row xs:flex-col px-10 py-1 gap-3">
                        {nameInfo.map((element, index) => {
                            return (
                                <div className="text" key={index}>
                                    <label className="block text-sm" htmlFor={element.text}>
                                        {element.text + ":"}
                                    </label>
                                    <input
                                        onChange={(event) => {
                                            index === 0
                                                ? setFirst_name(event.target.value)
                                                : setLast_name(event.target.value)
                                        }}
                                        type="text"
                                        placeholder={element.text}
                                        required
                                        name={index === 0 ? 'first_name' : 'last_name'}
                                        className="xs:inline rounded-lg outline-none bg-slate-200 xs:w-full"
                                    />
                                </div>
                            )
                        })}
                        <div className="text">
                            <label className={"block text-sm"}
                                htmlFor="userName">
                                Username:
                            </label>
                            <input
                                onChange={(event) => {
                                    setUser_name(event.target.value)
                                }}
                                type="text"
                                placeholder="username"
                                required
                                className={"rounded-lg outline-none bg-slate-200"}
                            />
                        </div>
                    </div>
                    <div className="email px-10 py-1">
                        <label htmlFor="email" className="block text-sm">
                            Email:
                        </label>
                        <input
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                            type="email"
                            name="email"
                            className="xl:w-full rounded-lg outline-none bg-slate-200"
                            placeholder="Email"
                        />
                    </div>
                    <div className="passwords xl:flex justify-evenly xs:block py-1 gap-10 px-10 w-full">
                        {passwordField.map((element, index) => {
                            return (
                                <div className={passwordAgain ? 'w-1/2' : 'w-full'} key={index}>
                                    <label htmlFor={element.psw} className="block text-sm">
                                        {element.psw + ':'}
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="********"
                                        required
                                        className="w-full rounded-lg outline-none bg-slate-200"
                                        id={element.psw}
                                        name={index === 0 ? 'password' : 'password_confirmation'}
                                        onChange={
                                            index === 0
                                                ? (event) => setPassword(event.target.value)
                                                : (event) => setPasswordAgain(event.target.value)
                                        }
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div
                        className="pfpImage px-10 flex-column gap-2 items-center"
                    >
                        <label htmlFor="image" className="block text-sm ">
                            <p>profile Image</p>
                            <img
                                src={profileImage}
                                className="h-20 w-20 cursor-pointer rounded-full "
                            />
                        </label>
                        <input
                            onChange={(e) => {
                                req(e)
                            }}
                            accept="images"
                            type="file"
                            name="image"
                            className="hidden"
                            id="image"
                        ></input>
                    </div>
                    <div className="signupButton flex justify-center items-center flex-wrap w-1/3 m-auto ">
                        <input
                            type="submit"
                            value={sub}
                            className="w-full p-2 text-white rounded-lg cursor-pointer font-bold"
                        />
                        <div
                            className="bottomLink xl:flex gap-1 py-3 text-sm text-center"
                        >
                            <p className="inline text-gray-500">already have an account?</p>
                            <Link to={'/login'} className="text-cyan-800 underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signing
