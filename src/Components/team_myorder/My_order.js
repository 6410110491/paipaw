import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import My_order_tour from './My_order_tour'
import ax from '../axios_api/ax'
import Cookies from 'js-cookie'

function My_order() {
  const { t, i18n } = useTranslation()
  const [totalPrice, SetTotalPrice] = useState(0)
  const [user, setUser] = useState(Cookies.get('user') != undefined ? JSON.parse(Cookies.get('user')) : undefined)

  const [booking_data , setBookingData] = useState([])

  const changepage = (lang) => {
    window.location.href = "/" + lang
  }

  useEffect(() => {
    let lang = window.localStorage.getItem('lang')

    if (lang) {
      i18n.changeLanguage(lang)
    }

  }, [])

  useEffect(() => {

    if (Cookies.get('user') == undefined) {
      window.location.href = "/login"
    }

    let token = JSON.parse(Cookies.get('accress'))


    ax.get(`/api/booking_tour/?user=${user.id}&pay=false` , {
      headers: {
        'Authorization': `Bearer ${token.accress}`
      }
    }).then(res => {

      setBookingData(res.data)

    }).catch(err => {

      Cookies.remove('user')
      Cookies.remove('accress')


      ax.get('/auth/signout/').then(res => {

        // window.location.href = '/login'
      })

    })
  }, [])

  // useEffect(() => {

  //   setInterval(() => {
  //     let total = 0
  //     let data = JSON.parse(window.localStorage.getItem('check'))

  //     if (data) {
  //       for (let i = 0; i < data.length; i++) {

  //         if (data[i].check) {
  //           total += Myorder_api.data[i].price
  //         }

  //       }

  //       SetTotalPrice(total)
  //     }

  //   }, 10)
  // }, [])

  // useEffect(() => {

  //   let dummy = []

  //   for (let i = 0; i < Myorder_api.data.length; i++) {

  //     dummy.push({ 'check': false })
  //   }

  //   window.localStorage.setItem('check', JSON.stringify(dummy))

  // }, [])


  return (
    <Container maxWidth='lg' sx={{
      marginTop: "7rem"
    }}>
      <Typography variant='h3' sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '7rem',
        fontWeight: 'bold'
      }}>{t("My Order")}</Typography>
      <My_order_tour detail_order={booking_data} />
      {/* <Box sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gridGap: '1rem',
        flexDirection: 'column',
        padding: '1rem',
        marginBottom: '3rem'
      }}>
        <Typography sx={{ margin: 1, color: "#ffae00", fontWeight: 'bold' }} variant='h6'>{t("Total")} : {totalPrice.toFixed(2)}฿</Typography>
        <Button variant="contained" onClick={() => changepage("payment")} sx={{ backgroundColor: "#1565c0" }}>
          {t("Payment")}
        </Button>
      </Box> */}

    </Container>
  )
}

export default My_order