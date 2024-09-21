import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../ThemeContext/ThemeContext'
import { RiShare2Line } from 'react-icons/ri'
import axios from 'axios'
import FormData from 'form-data'
import { Flip, toast, ToastContainer } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'
import "./CreateItem.css"
const CreateItem = () => {
    const navigate = new useNavigate()

    const [image, setImage] = useState(null)
    const [productImage, setProductImage] = useState(image)
    const [productName, setProductName] = useState(null)
    const [productPrice, setProductPrice] = useState(null)
    const { theme, setTheme } = useContext(ThemeContext)

    const toastId = React.useRef(null);
    const notify = () => toastId.current = toast.loading("please wait...");
    const dismiss = () => toast.dismiss(toastId.current);

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    const createForm = new FormData()
    createForm.append('name', productName)
    createForm.append('price', productPrice)
    createForm.append('image', image)

    function req(event) {
        setImage(event.target.files[0])
        setProductImage(URL.createObjectURL(event.target.files[0]))
        console.log(event.target.files[0])
    }

    const config = {
        headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        },
    }

    function handleCreate() {
        notify()
        axios
            .post('https://vica.website/api/items', createForm, config)
            .then((res) => {
                dismiss()
                console.log(res), toast.success(String(res.data.message))
                setTimeout(() => {
                    navigate('/')
                }, 4000)
            })
            .catch((error) => {
                dismiss()
                console.log(error), toast.error(String(error.response.data.message))
            })
    }

    return (
        <>
            <ToastContainer
                autoClose={4000}
                position="top-right"
                newestOnTop={true}
                theme={theme === 'dark' ? 'dark' : 'light'}
                transition={Flip}
            />
            <main
                className={
                    theme === 'dark'
                        ? 'h-5/6 w-5/6 absolute bottom-0 right-0  p-5 bg-slate-900 theme'
                        : 'h-5/6 w-5/6 absolute bottom-0 right-0  p-5 theme'
                }
            >
                <div className="topTitle">
                    <h1
                        className={
                            theme === 'dark'
                                ? 'text-3xl text-white font-bold'
                                : 'text-3xl font-bold'
                        }
                    >
                        Create Product
                    </h1>
                </div>
                <form
                    className="mt-5"
                    onSubmit={(event) => {
                        event.preventDefault()
                        handleCreate()
                    }}
                >
                    <div className="info flex justify-between items-center">
                        <div className="inputs w-1/2">
                            <label
                                htmlFor="name"
                                className={
                                    theme === 'dark' ? 'block text-white w-full' : 'block'
                                }
                            >
                                Product Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                className={
                                    theme === 'dark'
                                        ? 'name pl-3 rounded-lg w-4/5  bg-slate-100 opacity-60'
                                        : 'name pl-3 rounded-lg w-4/5  bg-slate-100 opacity-80 text-black'
                                }
                                placeholder="Enter Product Name"
                                onChange={(e) => {
                                    setProductName(e.target.value)
                                }}
                            />
                            <label
                                htmlFor="name"
                                className={
                                    theme === 'dark' ? 'block text-white mt-5' : 'block mt-5'
                                }
                            >
                                Product Price:
                            </label>
                            <input
                                type="text"
                                name="name"
                                className={
                                    theme === 'dark'
                                        ? 'price pl-3 rounded-lg w-4/5  bg-slate-100 opacity-60'
                                        : 'price pl-3 rounded-lg w-4/5  bg-slate-100 opacity-80 text-black'
                                }
                                placeholder="Enter Product Price"
                                onChange={(e) => {
                                    setProductPrice(e.target.value)
                                }}
                            />
                        </div>
                        <label
                            htmlFor="product"
                            className="shareLabel w-1/2 border-dashed rounded-lg cursor-pointer border-cyan-600 border-2 p-12 flex justify-center items-center flex-col"
                        >
                            {image === null ? (
                                <RiShare2Line
                                    size={100}
                                    className="text-cyan-600 cursor-pointer "
                                />
                            ) : (
                                <RiShare2Line className="text-cyan-600 cursor-pointer hidden w-20" />
                            )}
                            <img src={productImage} className="w-40" />
                            <p
                                className={theme === 'dark' ? 'text-white' : ''}
                                style={
                                    image === null ? { display: 'block' } : { display: 'none' }
                                }
                            >
                                upload Product Image
                            </p>
                        </label>
                        <input
                            accept="images"
                            type="file"
                            name="product"
                            id="product"
                            onChange={req}
                            className="hidden"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Create"
                        className={
                            theme === 'dark'
                                ? 'create p-2 px-5 rounded-lg bg-slate-700 text-slate-300 cursor-pointer'
                                : 'create p-2 px-5 rounded-lg bg-slate-300 cursor-pointer'
                        }
                    />
                </form>
            </main>
        </>
    )
}

export default CreateItem
