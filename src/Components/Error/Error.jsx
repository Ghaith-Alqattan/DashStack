import React, { useContext, useEffect } from 'react'
import './Error.css'
import ThemeContext from '../ThemeContext/ThemeContext'
const Error = () => {

    const { theme, setTheme } = useContext(ThemeContext)
    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])


    return (
        <>
            <div
                className={
                    theme === "dark"
                        ? 'Error h-lvh flex justify-center items-center bg-slate-950'
                        : 'Error h-lvh flex justify-center items-center'
                }
            >
                <h1
                    className={
                        theme === "dark"
                            ? 'font-bold text-5xl text-white'
                            : 'font-bold text-5xl'
                    }
                >
                    {' '}
                    Error<span className="text-cyan-700">404</span> Not Found
                </h1>
            </div>
        </>
    )
}

export default Error
