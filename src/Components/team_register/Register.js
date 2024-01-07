import { Box, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './register.css'
import bg from '../../Images/bg.png'
import { useTranslation } from 'react-i18next'
import ax from '../axios_api/ax'
import Cookies from 'js-cookie'

import CircularProgress from '@mui/material/CircularProgress';

function Register() {

  const { t, i18n } = useTranslation()
  const [btn_dis, SetBtnDis] = useState(true)
  const [register, SetRegister] = useState({

    'f_name': '',
    'l_name': '',
    'address': '',
    'email': '',
    'phone': '',
    'password': '',
    'password_again': ''
  })


  const [open, setOpen] = useState(false);
  const [sended , setSended] = useState(false)


  const handleClose = () => {
    setOpen(false);
    window.location.href = '/login'
  };

  const mock_register = (e) => {

    

    if (register.f_name != "" && register.l_name != "" && register.address != "" && register.email != "" && register.phone != "" && register.password != "" && register.password_again != "") {
      if (register.password == register.password_again) {
        e.preventDefault()
        const data = {
          'f_name': register.f_name,
          'l_name': register.l_name,
          'address': register.address,
          'email': register.email,
          'phone': register.phone,
          'password': register.password
        }
        ax.post('/auth/signup/', data).then(res => {


          if(res.data.email_verify === false){
            setOpen(true);
            ax.post('/auth/send_email_verify/' , {"id" : res.data.id}).then(res => {
                if(res.status === 200){

                  setSended(true)

                }
            })
          }

          if (res.data.error === "This user already exists.") {
            alert('This user already exists.')
          }

        })


      } else {
        e.preventDefault()
        alert(t('Password not match.'))
      }
    }


  }
  const formRef = useRef();

  const agree = (e) => {
    SetBtnDis(!e.target.checked)
  }

  const onchange_input = (e) => {

    if (e.target.id === 'f_name') {
      SetRegister({ ...register, 'f_name': e.target.value })
    }

    if (e.target.id === 'l_name') {
      SetRegister({ ...register, 'l_name': e.target.value })
    }

    if (e.target.id === 'address') {
      SetRegister({ ...register, 'address': e.target.value })
    }

    if (e.target.id === 'email') {
      SetRegister({ ...register, 'email': e.target.value })
    }

    if (e.target.id === 'phone') {
      SetRegister({ ...register, 'phone': e.target.value })
    }

    if (e.target.id === 'password') {
      SetRegister({ ...register, 'password': e.target.value })
    }

    if (e.target.id === 'password_again') {
      SetRegister({ ...register, 'password_again': e.target.value })
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
      <header className="head">
        <Typography variant='h7'>{t("Welcome to PaiPaw! Please Sign Up.")}</Typography>
      </header>
      <Box sx={{
        flexgrow: 1,
        marginTop: '2rem',
      }}>
        <form ref={formRef}>

          <Grid container spacing={2} columns={40} align='center'>
            <Grid item xs={20}>
              <TextField required sx={{
                backgroundColor: "#fff"
              }}
                label={t("Name")} variant="outlined" fullWidth id="f_name" value={register.f_name} onChange={onchange_input} />
            </Grid>

            <Grid item xs={20}>
              <TextField required sx={{
                backgroundColor: "#fff"
              }}
                label={t("Surname")} variant="outlined" fullWidth id="l_name" value={register.l_name} onChange={onchange_input} />
            </Grid>

            <Grid item xs={40} >
              <TextField required sx={{
                backgroundColor: "#fff"
              }} label={t("Address")} variant="outlined" fullWidth id="address" value={register.address} onChange={onchange_input} />
            </Grid>

            <Grid item xs={40}>
              <TextField required sx={{
                backgroundColor: "#fff"
              }} label={t("Email")} variant="outlined" fullWidth id="email" value={register.email} onChange={onchange_input} />
            </Grid>

            <Grid item xs={40}>
              <TextField required sx={{
                backgroundColor: "#fff"
              }} label={t("Phone number")} variant="outlined" fullWidth id="phone" value={register.phone} onChange={onchange_input} />
            </Grid>

            <Grid item xs={20}>
              <TextField required
                label={t("Password")}
                type="password"
                autoComplete="current-password"
                fullWidth id="password" value={register.password} onChange={onchange_input}
                sx={{
                  backgroundColor: "#fff"
                }}
              />
            </Grid>

            <Grid item xs={20}>
              <TextField required
                label={t("Password Again")}
                type="password"
                autoComplete="current-password"
                fullWidth id="password_again" value={register.password_again} onChange={onchange_input}
                sx={{
                  backgroundColor: "#fff"
                }}
              />
            </Grid>

          </Grid>

          <Box className='check'>
            <FormControlLabel onChange={agree} control={<Checkbox />} sx={{ color: "#3fc296" }} label={t("I agree to the Terms of Service. and Privacy Policy.")} />
          </Box>
          <Button disabled={btn_dis} variant="contained" fullWidth type='submit' onClick={mock_register}
            sx={{
              marginTop: "2rem",
              backgroundColor: "#ffae00",
              height: "3rem"
            }}>
            {t("SIGN UP")}
          </Button>
        </form>
        <div className='arai_sak_yang'>
          <Typography>{t("Have user?")}</Typography>
          <Link className='link_signin' to="/login">{t("Sign In")}</Link>
          <Typography>{t("Here")}</Typography>
        </div>

      </Box>

      <img className='bg' src={bg} />


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {sended ? t("Email Verify") : ""}
        </DialogTitle>
        <DialogContent>
          {sended ? <DialogContentText id="alert-dialog-description">
            {t('A confirmation email link has been sent to your account.')}
          </DialogContentText> : <CircularProgress />}
        </DialogContent>
        <DialogActions>
          {sended ? <Button onClick={handleClose} autoFocus>
            {t('ok')}
          </Button> : ""}
        </DialogActions>
      </Dialog>


    </Container>
  )
}

export default Register