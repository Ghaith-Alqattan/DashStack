import React from 'react'
import { ToastContainer } from 'react-toastify'
import Dashboard from '../../Components/Dashboard/Dashboard'
import { AiFillProduct } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { GoListUnordered } from 'react-icons/go'
import NavBar from '../../Components/NavBar/NavBar'
import MainArea from '../../Components/MainArea/MainArea'
import testImage from "../../../public/assets/products/6.png"
import CreateItem from '../../Components/CreateItem/CreateItem'
const CreateItemPage = () => {
    return (
        <>
            <ToastContainer autoClose={4000} position="top-right"
                newestOnTop={false} theme={localStorage.getItem("dark") ? "dark" : "light"}
            />
            <div className="homeDash relative">
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
                <CreateItem />
            </div>
        </>
    )
}

export default CreateItemPage