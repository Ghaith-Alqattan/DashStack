import { useContext, useEffect, useState } from 'react'
import logOutIcon from '../../../public/assets/icons/icon.svg'
import './Dashboard.css'
import { Link, useNavigate } from 'react-router-dom'
import ThemeContext from '../ThemeContext/ThemeContext'

const Dashboard = ({ blueSideLogo, normalSideLogo, dashboardOptions }) => {
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

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
            <div
                className={
                    theme === 'dark'
                        ? 'sideBar h-lvh w-1/6 relative left-0 flex flex-col justify-between items-center bg-slate-950 theme'
                        : 'sideBar h-lvh w-1/6 relative left-0 flex flex-col justify-between items-center theme'
                }
            >
                <div className="topDash flex flex-col gap-5">
                    <h1 className="logo text-3xl font-bold w-full text-center p-5 flex justify-center ">
                        <h1 className="text-cyan-700 inline">{blueSideLogo}</h1>
                        <h1 className={theme === 'dark' ? 'text-white inline' : 'inline'}>
                            {normalSideLogo}
                        </h1>
                    </h1>
                    <ul className="options flex flex-wrap gap-2 w-full text-center">
                        {dashboardOptions.map((element, index) => {
                            return (
                                <li
                                    key={index}
                                    className={
                                        theme === 'dark'
                                            ? 'text-white w-full relative flex items-center justify-center gap-1 text-lg font-bold p-3 '
                                            : 'w-full relative flex items-center justify-center gap-1 text-lg font-bold p-3'
                                    }
                                >
                                    {element.icon}
                                    <Link to={index === 0 ? `/` : `/${element.text}`}>
                                        {element.text}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <button
                    onClick={handleLogout}
                    className="logOut m-5 bg-cyan-700 text-white w-3/4 h-10 flex justify-center items-center gap-2 font-bold"
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

export default Dashboard
