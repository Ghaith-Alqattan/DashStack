import React, { useContext, useEffect } from 'react'
import Dashboard from '../../../Components/Dashboard/Dashboard'
import { AiFillProduct } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { GoListUnordered } from 'react-icons/go'
import NavBar from '../../../Components/NavBar/NavBar'
import MainArea from '../../../Components/MainArea/MainArea'
import { Flip, toast, ToastContainer } from 'react-toastify'
import ThemeContext from '../../../Components/ThemeContext/ThemeContext'

const DashStack = () => {
    const { theme, setTheme } = useContext(ThemeContext)

    if (localStorage.getItem('welcome')) {
        setTimeout(() => {
            toast(
                `Welcome ! , ${JSON.parse(localStorage.getItem('first_name'))}`,
                theme === 'dark'
                    ? { theme: 'dark', transition: Flip }
                    : { theme: 'light', transition: Flip }
            )
        }, 2000)
        localStorage.removeItem('welcome')
    }
    useEffect(() => {
        localStorage.removeItem("id")
    }, [])
    return (
        <>
            <div className="homeDash relative">
                <ToastContainer
                    autoClose={4000}
                    position="top-right"
                    newestOnTop={true}
                    transition={Flip}
                />
                <Dashboard
                    blueSideLogo="Dash"
                    normalSideLogo="Stack"
                    dashboardOptions={[
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
                    ]}
                ></Dashboard>
                <NavBar links={[
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
                ]}></NavBar>
                <MainArea
                    title="Products"
                    btn="Create an Item"
                    btnShow="block"
                ></MainArea>
            </div>
        </>
    )
}

export default DashStack
