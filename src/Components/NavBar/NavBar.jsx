import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import './NavBar.css'
import { IoMdClose, IoMdSunny } from 'react-icons/io'
import { IoMoon } from 'react-icons/io5'
import ThemeContext from '../ThemeContext/ThemeContext'
import { MdMenu } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import logOutIcon from '../../../public/assets/icons/icon.svg'

const NavBar = ({ onSearch, links }) => {
    const { theme, setTheme } = useContext(ThemeContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
        onSearch(event.target.value)
    }

    const handleLogout = () => {
        setShowModal(true)
    }

    const confirmLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('first_name')
        localStorage.removeItem('last_name')
        localStorage.removeItem('user_name')
        localStorage.removeItem('profile_image_url')
        localStorage.removeItem('products')
        navigate('/Login')
    }

    return (
        <>
            <nav
                className={
                    theme === 'dark'
                        ? 'absolute top-0 right-0 w-5/6 h-1/6 px-5 py-0 flex justify-between items-center bg-slate-950 theme'
                        : 'absolute top-0 right-0 w-5/6 h-1/6  px-5 py-0 flex justify-between items-center theme'
                }
            >
                <div className="search relative xl:w-1/3 ">
                    <div className="searchIcon absolute left-2 top-1/3">
                        <FaSearch />
                    </div>
                    <input
                        type="search"
                        name=""
                        id=""
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search a Product"
                        className="rounded-3xl pl-8 m-0 w-full border-1/2 border-cyan-700"
                    />
                </div>
                <div className="rightSide xl:flex-row sm:flex-row-reverse flex m-0 justify-between items-center">
                    <div className="profile flex justify-between items-center gap-5 px-5">
                        <img
                            src={JSON.parse(localStorage.getItem('profile_image_url'))}
                            alt=""
                            className="rounded-full w-20"
                        />
                        <div className="user">
                            <p className={theme === 'dark' ? 'name text-white' : `name`}>
                                {JSON.parse(localStorage.getItem('first_name')) +
                                    ' ' +
                                    JSON.parse(localStorage.getItem('last_name'))}
                            </p>
                            <p
                                className={
                                    theme === 'dark' ? 'userName text-white' : `userName`
                                }
                            >
                                {JSON.parse(localStorage.getItem('user_name'))}
                            </p>
                        </div>
                    </div>
                    <hr
                        className={
                            theme === 'dark'
                                ? 'h-full w-5 rounded-xl rotate-90 bg-white'
                                : 'h-full w-5 rounded-xl rotate-90 bg-black'
                        }
                    />
                    <div className="navIcons flex gap-2 justify-center items-center">
                        <div
                            className="bgMode"
                            onClick={() => {
                                theme === 'dark' ? setTheme('light') : setTheme('dark')
                            }}
                        >
                            {theme === 'dark' ? (
                                <IoMoon color="white" size={30} />
                            ) : (
                                <IoMdSunny size={30} />
                            )}
                        </div>
                        <div className="menuIcon">
                            <MdMenu
                                className="menuIC"
                                color={theme === 'dark' ? 'white' : ''}
                                size={30}
                                onClick={() => setMenuOpen(true)}
                            />
                        </div>
                    </div>
                </div>
            </nav>

            <div
                className={`dashBoardMenu ${menuOpen ? '' : '-translate-y-full'} ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'
                    } flex flex-col justify-between`}
            >
                <div className="topSide flex justify-between items-center">
                    <h1
                        className={
                            theme === 'dark'
                                ? 'logo text-lg font-bold text-white inline'
                                : 'logo text-lg font-bold inline'
                        }
                    >
                        Dash<span className="text-cyan-700 inline">Stack</span>
                    </h1>
                    <IoMdClose
                        color={theme === 'dark' ? 'white' : ''}
                        size={30}
                        onClick={() => setMenuOpen(false)}
                    />
                </div>
                <ul className="links flex flex-col gap-20">
                    {links.map((element, index) => {
                        return (
                            <li
                                key={index}
                                className={
                                    theme === 'dark'
                                        ? 'text-white w-full relative flex items-center justify-center gap-1 text-lg font-bold p-3'
                                        : 'w-full relative flex items-center justify-center gap-1 text-lg font-bold p-3'
                                }
                            >
                                {element.icon}
                                <Link
                                    to={index === 0 ? `/` : `/${element.text}`}
                                    onClick={() => setMenuOpen(false)} // Close menu on link click
                                >
                                    {element.text}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <button
                    onClick={handleLogout}
                    className="logOut m-5 bg-cyan-700 text-white h-10 flex justify-center items-center gap-2 font-bold"
                >
                    <img src={logOutIcon} alt="" />
                    <h4 className="">LogOut</h4>
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className={theme === 'dark' ? 'modal dark' : 'modal light'}>
                        <h2>Confirm Logout</h2>
                        <p>Are you sure you want to logout?</p>
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
                            <button onClick={confirmLogout} className="bg-red-600 text-white">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NavBar
