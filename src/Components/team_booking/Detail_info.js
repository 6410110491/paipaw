import { Box, Button, Card, CardContent, Container, FormControlLabel, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Paper } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import queryString from 'query-string'
import ax from '../axios_api/ax';
import Cookies from 'js-cookie'

function Detail_info() {

  const { t, i18n } = useTranslation()
  const [detail, setDetail] = useState([{}])
  const [adult, setAdult] = useState(0)
  const [child, setChild] = useState(0)
  const [load, setLoad] = useState(true)
  const [info_user, setInfoUser] = useState({
    'f_name': "",
    'l_name': "",
    'email': "",
    'phone': '',
    'note': ''
  })

  useEffect(() => {
    ax.get(`/api/tours/${queryString.parse(window.location.search).id}`).then(res => {
      setDetail(res.data)
      setLoad(false)
    })
  }, [])

  const [check, setCheck] = useState(false)

  const click_sync_info = (e) => {

    setCheck(e.target.checked)

  }

  const change_page = (page) => {
    window.location.href = '/' + page
  }

  const clamp = (val, min, max) => {

    return val > max ? max : val < min ? min : val < -1 ? min : val;

  }


  useEffect(() => {

    if (Cookies.get('user')) {
      let user = JSON.parse(Cookies.get('user'))
      if (check) {
        setInfoUser({ ...info_user, "f_name": user.f_name, 'l_name': user.l_name, 'email': user.email, 'phone': user.phone })
      } else {
        setInfoUser({
          'f_name': "",
          'l_name': "",
          'email': "",
          'phone': '',
          'note': ''
        })
      }

    } else {
      window.location.href = '/login'
    }


  }, [check])

  const on_change_input = (e) => {
    if (e.target.id == 'name') {
      setInfoUser({ ...info_user, 'f_name': e.target.value })
    }

    if (e.target.id == 'surname') {
      setInfoUser({ ...info_user, 'l_name': e.target.value })
    }

    if (e.target.id == 'email') {
      setInfoUser({ ...info_user, 'email': e.target.value })
    }

    if (e.target.id == 'phone') {
      setInfoUser({ ...info_user, 'phone': e.target.value })
    }

    if (e.target.id == 'note') {
      setInfoUser({ ...info_user, 'note': e.target.value })
    }
  }

  const handle_booking = (e) => {

    e.preventDefault()

    if (info_user.f_name !== "" && info_user.l_name !== "" && info_user.email !== "" && info_user.phone !== "" && (adult > 0 || child > 0)) {

      if (Cookies.get('user') == undefined) {
        window.location.href = "/login"
      }

      let id = queryString.parse(window.location.search).id

      let data = {

        "tour_id": parseInt(id),
        'first_name': info_user.f_name,
        'last_name': info_user.l_name,
        'phone': info_user.phone,
        'adult': adult,
        'child': child,
        'price': ((parseInt(adult) * detail.adult_price) + (parseInt(child) * detail.child_price)),
        'note': info_user.note
      }

      let token = JSON.parse(Cookies.get('accress'))

      ax.post('/api/booking_tour/', data, {
        headers: {
          'Authorization': `Bearer ${token.accress}`
        }
      }).then(res => {

        change_page('My_order')

      }).catch(err => {

        Cookies.remove('user')
        Cookies.remove('accress')


        ax.get('/auth/signout/').then(res => {

          window.location.href = '/login'
        })

      })

    }
    else {

      alert(t('Please complete the information.'))

    }

  }

  const formRef = useRef();

  if (load) return <Typography variant='h5'>Loading...</Typography>


  return (
    <Container maxWidth='md' sx={{ marginTop: "7rem", marginBottom: '3rem' }}>
      <Typography fontWeight='bold' variant='h4'>{i18n.language === 'th' ? detail.title_th : detail.title_en}</Typography>
      <Card sx={{
        marginTop: '1rem'
      }}>
        <CardContent>
          <Typography variant='h6'>{t('Book your tour')}</Typography>
          <Box sx={{
            width: '100%',
            height: '0.2rem',
            backgroundColor: '#ffae00',
            marginTop: "1rem",
          }}></Box>
        </CardContent>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>
                    <Typography>{t('Ticket')}</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>{t('Amount')}</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>{t('price')}</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='center'>
                    <Typography>{t('Adult')}</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <TextField type="number" value={adult} onChange={(e) => {
                      let total = clamp(parseInt(e.target.value), 0, detail.max - child)
                      setAdult(total)
                    }}
                      InputProps={{
                        inputProps: {
                          min: 0
                        }
                      }}
                      sx={{
                        backgroundColor: "#fff",
                      }} variant="outlined" />
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>{t(detail.adult_price)}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'>
                    <Typography>{t('Child')} (4-12)</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <TextField type="number" value={child} onChange={(e) => {
                      {
                        let total = clamp(parseInt(e.target.value), 0, detail.max - adult)
                        setChild(total)
                      }
                    }}
                      InputProps={{
                        inputProps: {
                          min: 0
                        }
                      }}
                      sx={{
                        backgroundColor: "#fff",
                      }} variant="outlined" />

                  </TableCell>
                  <TableCell align='center'>
                    <Typography>{t(detail.child_price)}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'>
                    <Typography fontWeight='bold'>{t('Total')}</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography fontWeight='bold'>{parseInt(adult) + parseInt(child)}/{detail.max}</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography fontWeight='bold'>฿{((parseInt(adult) * detail.adult_price) + (parseInt(child) * detail.child_price)).toFixed(2)}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardContent>
          <form ref={formRef}>
            <FormControlLabel onChange={click_sync_info} control={<Checkbox />} label={t("Sync information from your account?")} />
            <Grid sx={{
              marginTop: '1rem'
            }} container spacing={1} columns={12}>
              <Grid item xs={6}>
                <TextField fullWidth required label={t("Name")} id='name' variant="outlined" onChange={on_change_input} value={info_user.f_name} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth required label={t("Surname")} id='surname' variant="outlined" onChange={on_change_input} value={info_user.l_name} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth required label={t("Email")} id='email' variant="outlined" onChange={on_change_input} value={info_user.email} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth required label={t("Phone number")} id='phone' variant="outlined" onChange={on_change_input} value={info_user.phone} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth placeholder={t("Note...")} id='note' variant="outlined" onChange={on_change_input} value={info_user.note} multiline />
              </Grid>
            </Grid>
            <Button variant="contained" fullWidth type='submit' onClick={handle_booking}
              sx={{
                marginTop: "2rem",
                backgroundColor: "#ffae00",
                height: "3rem"
              }}>
              {t("Confirm to your Booking")}
            </Button>
          </form>
        </CardContent>
        <CardContent>
          <Typography variant='h6'>{t('Contact')}</Typography>
          <Box sx={{
            width: '100%',
            height: '0.2rem',
            backgroundColor: '#ffae00',
            marginTop: "1rem",
          }}></Box>
          <Box sx={{
            marginTop: '1rem'
          }}>
            <Typography variant='subtitle1'>Facebook : Tour company</Typography>
            <Typography variant='subtitle1'>Line : @Tour_company</Typography>
            <Typography variant='subtitle1'>Tel. : 999-999-9999</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Detail_info