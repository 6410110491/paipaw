import { Box, Button, Checkbox, CircularProgress, Container, Dialog, DialogContent, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './login.css'
import bg from '../../Images/bg.png'
import ax from '../axios_api/ax'
import Cookies from 'js-cookie'
import { useCookies } from 'react-cookie';

function Login() {
  const { t, i18n } = useTranslation()
  const [login, SetLogin] = useState({
    'username': '',
    'password': ''
  })
  const [cookies, setCookie] = useCookies();
  const formRef = useRef();
  const [load_login , setLoadLogin] = useState(false)

  const mock_login = (e) => {

    if (login.username != "" && login.password != "") {
      e.preventDefault()

      setLoadLogin(true)

      ax.post('/auth/signin/', login).then(res => {

        if (res.data.error === "not user in database.") {
          setLoadLogin(false)
          alert(t('Not user in database.'))
        } else {

          if (res.data.error === "email_not_verify.") {
            setLoadLogin(false)
            alert(t('Email is not verified, check email..'))

          } else {
            Cookies.set('user', JSON.stringify(res.data), { expires: 1, path: '', secure: true, sameSite: 'Lax' })
            setCookie('user', res.data)


            if (!res.data.superuser) {
              ax.post('/api/token/', { 'token': res.data.email }).then(res => {

                Cookies.set('accress', JSON.stringify(res.data), { expires: 1, path: '', secure: true, sameSite: 'Lax' })
                setCookie('accress', res.data)
                window.location.href = '/'

              })
            } else {
              ax.post('/api/token/', { 'token': res.data.username }).then(res => {

                Cookies.set('accress', JSON.stringify(res.data), { expires: 1, path: '', secure: true, sameSite: 'Lax' })
                setCookie('accress', res.data)
                window.location.href = '/'

              })
            }

          }

        }

      })
    }

  }

  const onchange_input = (e) => {

    if (e.target.id === 'username') {
      SetLogin({ ...login, 'username': e.target.value })
    }

    if (e.target.id === 'password') {
      SetLogin({ ...login, 'password': e.target.value })
    }
  }


  useEffect(() => {

    if (Cookies.get('user') != undefined) {
      window.location.href = '/'
    }


    let lang = window.localStorage.getItem('lang')

    if (lang) {
      i18n.changeLanguage(lang)
    }



  }, [])

  return (
    <Container maxWidth='md' sx={{
      marginTop: "7rem"
    }}>

      <header className='head-login'>
        <Typography variant='h7'>
          {t("Welcome to PaiPaw! Please Sign In.")}
        </Typography>
      </header>

      <Box sx={{ flexgrow: 1, marginTop: '2rem' }}>
        <form ref={formRef}>
          <Grid container spacing={4} columns={40} align='center'>

            <Grid item xs={40}>
              <TextField required sx={{
                backgroundColor: "#fff"
              }} label={t("Email")} variant="outlined" fullWidth id="username" value={login.username} onChange={onchange_input} />
            </Grid>

            <Grid item xs={40}>
              <TextField required
                label={t("Password")}
                type="password"
                autoComplete="current-password"
                fullWidth id="password" value={login.password} onChange={onchange_input}
                sx={{
                  backgroundColor: "#fff"
                }}
              />
            </Grid>

          </Grid>

          <Box sx={{ marginTop: '1rem' }}>
            <Link className='forgotlink' to="/reset_password">{t("Forget Password?")}</Link>
          </Box>


          <Box sx={{ marginTop: '1rem' }}>
            <FormControlLabel control={<Checkbox />} label={t("Remember Me.")} />
          </Box>

          <Button variant="contained" fullWidth type='submit' onClick={mock_login}
            sx={{
              marginTop: "2rem",
              backgroundColor: "#ffae00",
              height: "3rem"
            }}>
            {t("SIGN IN")}
          </Button>
        </form>

        <div className='link-to-signup'>
          <Typography>{t("New user?")}</Typography>
          <Link className='link_signup' to="/register">{t("Sign Up")}</Link>
          <Typography>{t("Here")}</Typography>
        </div>

      </Box>

      <img className='bg' src={bg} />

      <Dialog
        open={load_login}
      >
        <DialogContent>
          <CircularProgress />
        </DialogContent>

      </Dialog>

    </Container>
  )
}

export default Login