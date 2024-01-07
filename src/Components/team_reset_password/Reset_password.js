import { Box, Button, CircularProgress, Container, Dialog, DialogContent, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import '../home.css'
import bg from '../../Images/bg.png'
import { useTranslation } from 'react-i18next';
import ax from '../axios_api/ax';

function Reset_password() {

    const { t, i18n } = useTranslation()
    const formRef = useRef();
    const [load_login, setLoadLogin] = useState(false)
    const [email, setEmail] = useState("")

    const handle_send_email = (e) => {

        e.preventDefault()

        if (email !== "") {
            setLoadLogin(true)
            ax.post('/auth/send_reset_password/', { 'email': email }).then(res => {
                alert(t('A link to reset password has been sent to your email, please check your email.'))
                setLoadLogin(false)
                window.location.href = '/'
            }).catch(err => {
                alert(t('Not user in database.'))
                window.location.reload()
            })
        } else {
            alert(t('Please complete the information.'))
        }


    }

    return (
        <Container maxWidth='md' sx={{
            marginTop: "7rem"
        }}>

            <header className='head-login'>
                <Typography variant='h7'>
                    {t("Welcome to PaiPaw! Enter your email.")}
                </Typography>
            </header>

            <Box sx={{ flexgrow: 1, marginTop: '2rem' }}>
                <form ref={formRef}>
                    <Grid container spacing={4} columns={40} align='center'>

                        <Grid item xs={40}>
                            <TextField required sx={{
                                backgroundColor: "#fff"
                            }} label={t("Email")} variant="outlined" fullWidth id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Grid>

                    </Grid>

                    <Button variant="contained" fullWidth type='submit' onClick={handle_send_email}
                        sx={{
                            marginTop: "2rem",
                            backgroundColor: "#ffae00",
                            height: "3rem"
                        }}>
                        {t("Send Email")}
                    </Button>
                </form>

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

export default Reset_password