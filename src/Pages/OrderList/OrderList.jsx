import React, { useEffect } from 'react'
import { AiFillProduct } from 'react-icons/ai'
import { GoListUnordered } from 'react-icons/go'
import { MdFavoriteBorder } from 'react-icons/md'
import Dashboard from '../../Components/Dashboard/Dashboard'
import NavBar from '../../Components/NavBar/NavBar'
import MainArea from '../../Components/MainArea/MainArea'
import testImage from '../../../public/assets/products/5.png'

const OrderList = () => {
    useEffect(() => {
        localStorage.removeItem('id')
    }, [])
    return (
        <>
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
                <NavBar
                    links={[
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
                ></NavBar>{' '}
                <MainArea
                    title="Order Lists"
                    btn="Create an Item"
                    btnShow="block"
                    products={[
                        {
                            productImage: testImage,
                            productName: 'product1',
                            productPrice: '$100',
                        },
                        {
                            productImage: testImage,
                            productName: 'product1',
                            productPrice: '$100',
                        },
                        {
                            productImage: testImage,
                            productName: 'product1',
                            productPrice: '$100',
                        },
                    ]}
                />
            </div>
        </>
    )
}

export default OrderList
