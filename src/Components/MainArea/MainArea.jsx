import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'
import './MainArea.css'
import { Link, useNavigate } from 'react-router-dom'
import { CiCirclePlus } from 'react-icons/ci'
import ThemeContext from '../ThemeContext/ThemeContext'
import axios from 'axios'
import { Flip, toast, ToastContainer } from 'react-toastify'
import NavBar from '../NavBar/NavBar'
import { AiFillProduct } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { GoListUnordered } from 'react-icons/go'

const MainArea = ({ title, btn, btnShow }) => {
    const { theme } = useContext(ThemeContext)
    const toastId = React.useRef(null)
    const navigate = useNavigate()

    const notify = () => (toastId.current = toast.loading('please wait...'))
    const dismiss = () => toast.dismiss(toastId.current)

    const config = {
        headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        },
    }

    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    useEffect(() => {
        Read()
    }, [])

    useEffect(() => {
        if (searchQuery) {
            searchProducts(searchQuery)
        } else {
            setProducts(allProducts)
        }
    }, [searchQuery, allProducts])

    const Read = () => {
        setLoading(true)
        axios
            .get(`https://vica.website/api/items`, config)
            .then((res) => {
                setAllProducts(res.data)
                setProducts(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const searchProducts = (query) => {
        const filteredProducts = allProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.price.toString().includes(query)
        )
        setProducts(filteredProducts)
    }

    const confirmDelete = () => {
        if (deletingId) {
            notify()
            axios
                .delete(`http://vica.website/api/items/${deletingId}`, config)
                .then((response) => {
                    dismiss()
                    toast.success(String(response.data.message))
                    Read()
                    setShowModal(false)
                })
                .catch((error) => {
                    dismiss()
                    toast.error(String(error))
                    console.log(error)
                    setShowModal(false)
                })
        }
    }

    const handleDeleteClick = (id) => {
        setDeletingId(id)
        setShowModal(true)
    }

    const Edit = (id) => {
        notify()
        localStorage.setItem('id', id)
        setTimeout(() => {
            navigate(`/EditItem`)
        }, 2000)
    }

    return (
        <>
            <ToastContainer
                autoClose={3000}
                newestOnTop={true}
                transition={Flip}
                theme={theme === 'dark' ? 'dark' : 'light'}
            />
            <NavBar onSearch={setSearchQuery} links={[
                {
                    icon: <AiFillProduct />,
                    text: 'Products',
                },
                {
                    icon: <MdFavoriteBorder />,
                    text: 'Favorites',
                },
                {
                    icon: <GoListUnordered />,
                    text: 'Order Lists',
                },
            ]} />
            <main
                className={
                    theme === 'dark'
                        ? 'h-5/6 overflow-y-scroll w-5/6  absolute bottom-0 right-0 p-5 bg-slate-900 theme'
                        : 'h-5/6 overflow-y-scroll w-5/6  absolute bottom-0 right-0 p-5 theme'
                }
            >
                <div className="topAria flex justify-between items-center">
                    <h1
                        className={
                            theme === 'dark'
                                ? 'title text-4xl font-bold mb-5 text-white'
                                : 'title text-4xl font-bold mb-5'
                        }
                    >
                        {title}
                    </h1>
                    <button
                        style={{ display: btnShow }}
                        className="create rounded-lg p-1 text-white bg-cyan-700 flex w-1/5 items-center"
                    >
                        <CiCirclePlus size={30} className="inline" color="white" />
                        <Link to="/CreateItem" className="p-5">
                            {btn}
                        </Link>
                    </button>
                </div>
                {loading ? (
                    <h1 className={theme === 'dark' ? 'text-3xl text-white' : 'text-3xl'}>
                        Loading...
                    </h1>
                ) : products.length <= 0 ? (
                    <h1 className={theme === 'dark' ? 'text-3xl text-white' : 'text-3xl'}>
                        No Products Found...
                    </h1>
                ) : (
                    <ul className="products shrink-0 flex flex-wrap items-center justify-start gap-4">
                        {products.map((element) => (
                            <li
                                className={
                                    theme === 'dark'
                                        ? 'card w-1/5 h-72 shrink-0 shadow-xl bg-slate-800 flex flex-col p-5 rounded-xl theme justify-around'
                                        : 'card w-1/5 h-72 shrink-0 shadow-xl bg-white flex flex-col p-5 rounded-xl theme justify-around'
                                }
                                key={element.id}
                            >
                                <div className="image flex justify-center items-center ">
                                    <img
                                        src={element.image_url}
                                        className="w-24 p-0"
                                        alt={element.name}
                                    />
                                </div>
                                <div className="info">
                                    <h3
                                        className={
                                            theme === 'dark'
                                                ? 'productName text-xl mt-2 text-white'
                                                : 'productName text-xl mt-2'
                                        }
                                    >
                                        {element.name}
                                    </h3>
                                    <p className="productPrice text-cyan-700 py-1">
                                        {'$' + element.price}
                                    </p>
                                    <div className="cardBottom flex justify-between items-center mt-2">
                                        <button
                                            className="edit rounded-full bg-slate-200 px-5 py-1 text-sm"
                                            onClick={() => Edit(element.id)}
                                        >
                                            Edit product
                                        </button>
                                        <HiOutlineTrash
                                            size={20}
                                            className="cursor-pointer"
                                            color={theme === 'dark' ? 'white' : 'black'}
                                            onClick={() => handleDeleteClick(element.id)}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
            {showModal && (
                <div className="modal-overlay">
                    <div className={theme === 'dark' ? 'modal dark' : 'modal light'}>
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this item?</p>
                        <div className="modal-buttons">
                            <button
                                onClick={() => setShowModal(false)}
                                className={
                                    theme === 'dark'
                                        ? 'bg-slate-600 text-white'
                                        : 'bg-slate-200 text-black'
                                }
                            >
                                Cancel
                            </button>
                            <button onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MainArea
