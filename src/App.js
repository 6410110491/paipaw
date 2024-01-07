
import { Box, Container } from '@mui/material'
import React from 'react'
import Navbar from './Components/Navbar'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Home from './Components/Home'
import Register from './Components/team_register/Register'
import Login from './Components/team_register/Login'
import NEWS from './Components/team_NEWS/NEWS'
import History from './Components/team_history/History'
import Add_NEWS from './Components/team_NEWS/Add_NEWS'
import ADD_Tour from './Components/team_Tour/ADD_Tour'
import Add_Tour_detail from './Components/team_Tour/Add_Tour_detail'
import Customer_order_view from './Components/team_admin/Customer_order_view'
import Food_home from './Components/team_ordering/Food_home'
import Shop_home from './Components/team_ordering/Shop_home'
import Travel_home from './Components/team_ordering/Travel_home'
import Booking_home from './Components/team_ordering/Booking_home'
import Favorite_page from './Components/team_ordering/Favorite_page'
import My_order from './Components/team_myorder/My_order'
import Manage_my_account from './Components/team_user/Manage_my_account'
import Tour_detail from './Components/team_booking/Tour_detail'
import Detail_info from './Components/team_booking/Detail_info'
import In_progress_view from './Components/team_user/In_progress_view'
import Payment from './Components/team_payment/Payment'

import './app.css'
import Edit_Tour_detail from './Components/team_Tour/Edit_Tour_detail'
import Edit_NEWS from './Components/team_NEWS/Edit_NEWS'
import Reset_password from './Components/team_reset_password/Reset_password'

function App() {

  return (
      <Box>
        <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/NEWS' element={<NEWS />} />
          <Route path='/history' element={<History />} />
          <Route path='/add_news' element={<Add_NEWS />} />
          <Route path='/add_tour' element={<ADD_Tour />} />
          <Route path='/add_tour_detail' element={<Add_Tour_detail />} />
          <Route path='/customer_order' element={<Customer_order_view />} />
          <Route path='/Food' element={<Food_home />} />
          <Route path='/Shoping' element={<Shop_home />} />
          <Route path='/Travels' element={<Travel_home />} />
          <Route path='/Booking' element={<Booking_home />} />
          <Route path='/favorite' element={<Favorite_page />} />
          <Route path='/My_order' element={<My_order />} />
          <Route path='/Manage_my_account' element={<Manage_my_account />} />
          <Route path='/tour_detail' element={<Tour_detail />} />
          <Route path='/detail_info' element={<Detail_info />} />
          <Route path='/in_progress' element={<In_progress_view />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/edit_tour' element={<Edit_Tour_detail />} />
          <Route path='/edit_news' element={<Edit_NEWS />} />
          <Route path='/reset_password' element={<Reset_password />} />
        </Routes>
        </BrowserRouter>
      </Box>
  )
}

export default App