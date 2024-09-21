
import Signup from './Pages/Log/SignUp/SignUp'
import Signin from './Pages/Log/SignIn/Signin'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import PublicRoute from './Components/PublicRoute/PublicRoute'
import DashStack from './Pages/Home/DashboardPage/DashStack'
import './App.css'
import Favorites from './Pages/Favorites/Favorites'
import OrderList from './Pages/OrderList/OrderList'
import CreateItemPage from './Pages/CreateItem/CreateItemPage'
import ThemeContext from './Components/ThemeContext/ThemeContext'
import { useEffect, useState } from 'react'
import EditItemPage from "./Pages/EditItem/EditItemPage"

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : localStorage.setItem('theme', 'light'))


  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>

        <Routes>
          {/* protected Routes  */}
          <Route element={<ProtectedRoute />}>

            <Route path="/" element={<DashStack />} />
            <Route path="/Favorites" element={<Favorites />} />
            <Route path="/Order Lists" element={<OrderList />} />
            <Route path="/CreateItem" element={<CreateItemPage />} />
            <Route path='/EditItem' element={<EditItemPage />}></Route>

          </Route>
          {/* public Routes  */}
          <Route element={<PublicRoute />} >

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Signin />} />

          </Route>

        </Routes>

      </ThemeContext.Provider>
    </>
  )
}

export default App
