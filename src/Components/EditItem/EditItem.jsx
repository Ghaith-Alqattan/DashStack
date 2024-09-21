import React, { useContext, useEffect, useState } from 'react'
import { RiShare2Line } from 'react-icons/ri'
import { Flip, toast, ToastContainer } from 'react-toastify'
import ThemeContext from '../ThemeContext/ThemeContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./EditItem.css"
const EditItem = () => {
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)

    const [ID, setID] = useState(
        localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : ''
    )
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        price: '',
        image_url: null,
    })
    const [productImage, setProductImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const config = {
        headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            Accept: 'application/json'
        },
    }

    const toastId = React.useRef(null)
    const notify = () => (toastId.current = toast.loading('Please wait...'))
    const dismiss = () => toast.dismiss(toastId.current)

    const fetchProduct = (id) => {
        axios
            .get(`http://vica.website/api/items/${id}`, config)
            .then((response) => {
                const { name, price, image_url } = response.data
                setEditedProduct({ name, price, image_url })
                setImagePreview(image_url)
            })
            .catch((err) => {
                console.error(err)
            })
    }


    useEffect(() => {
        fetchProduct(ID)
    }, [ID])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }))
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        setProductImage(file)
        setImagePreview(URL.createObjectURL(file))
    }

    const handleEdit = (id) => {
        notify()

        const formData = new FormData()
        formData.append('name', editedProduct.name)
        formData.append('price', editedProduct.price)
        if (productImage) {
            formData.append('image', productImage)
        }
        formData.append('_method', 'PUT')

        axios
            .post(`http://vica.website/api/items/${id}`, formData, config)
            .then((response) => {
                dismiss()
                toast.success(String(response.data.message))
                setTimeout(() => {
                    navigate('/')
                }, 4000)
            })
            .catch((err) => {
                dismiss()
                console.error(err)
                if (err.response && err.response.data) {
                    toast.error(`Error: ${err.response.data.message || 'Update failed'}`)
                }
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
                className={`h-5/6 w-5/6 absolute bottom-0 right-0 p-5 ${theme === 'dark' ? 'bg-slate-900' : ''
                    }`}
            >
                <div className="topTitle">
                    <h1
                        className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : ''
                            }`}
                    >
                        Edit Product
                    </h1>
                </div>
                <form
                    className="mt-5"
                    onSubmit={(event) => {
                        event.preventDefault()
                        handleEdit(ID)
                    }}
                >
                    <div className="info flex justify-between items-center ">
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
                                value={editedProduct.name}
                                className={`pl-3 rounded-lg w-4/5 bg-slate-100 ${theme === 'dark' ? 'opacity-60' : 'opacity-80 text-black'
                                    }`}
                                placeholder="Enter product name"
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="price"
                                className={`block mt-5 ${theme === 'dark' ? 'text-white' : ''}`}
                            >
                                Product Price:
                            </label>
                            <input
                                type="text"
                                name="price"
                                value={editedProduct.price}
                                className={`pl-3 rounded-lg w-4/5 bg-slate-100 ${theme === 'dark' ? 'opacity-60' : 'opacity-80 text-black'
                                    }`}
                                placeholder="Enter product price"
                                onChange={handleInputChange}
                            />
                        </div>

                        <label
                            htmlFor="product"
                            className="w-1/2 border-dashed rounded-lg cursor-pointer border-cyan-600 border-2 p-12 flex justify-center items-center flex-col"
                        >
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Product Preview"
                                    className="w-40"
                                />
                            ) : (
                                <>
                                    <RiShare2Line
                                        size={100}
                                        className="text-cyan-600 cursor-pointer"
                                    />
                                    <p className={theme === 'dark' ? 'text-white' : ''}>
                                        Upload Product Image
                                    </p>
                                </>
                            )}
                        </label>
                        <input
                            accept="image/*"
                            type="file"
                            name="product"
                            id="product"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    <input
                        type="submit"
                        value="Confirm"
                        className={`subEdit p-2 px-5 rounded-lg cursor-pointer ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-300'
                            }`}
                    />
                </form>
            </main>
        </>
    )
}

export default EditItem
