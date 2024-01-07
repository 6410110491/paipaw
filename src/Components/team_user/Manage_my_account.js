import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import bg from '../../Images/bg.png'
import { useTranslation } from 'react-i18next'
import { deepOrange } from '@mui/material/colors'

import ax from '../axios_api/ax'

import './manage_my_account.css'
import Cookies from 'js-cookie'
import { useCookies } from 'react-cookie';

function Manage_my_account() {
    const { t, i18n } = useTranslation()

    const [user, setUser] = useState(Cookies.get('user') != undefined ? JSON.parse(Cookies.get('user')) : undefined)
    const [new_set , SetNewSet] = useState(user)
    const [dis , setDis] = useState(true)
    const [cookies, setCookie] = useCookies();

    const onchange_text = (e) => {
        
        if(e.target.id == "f_name"){
            SetNewSet({...new_set , 'f_name' : e.target.value})
        }

        if(e.target.id == "l_name"){
            SetNewSet({...new_set , 'l_name' : e.target.value})
        }

        if(e.target.id == "address"){
            SetNewSet({...new_set , 'address' : e.target.value})
        }

        if(e.target.id == "email"){
            SetNewSet({...new_set , 'email' : e.target.value})
        }

        if(e.target.id == "phone"){
            SetNewSet({...new_set , 'phone' : e.target.value})
        }
        
        
    }

    const save_profile = () =>{

        ax.post('/auth/update_profile/' , new_set).then(res => {

            Cookies.set('user', JSON.stringify(res.data), {expires : 1 , path: '' , secure : true , sameSite : 'none' })
            setCookie('user' , res.data)
            window.location.href = '/' 
        })

    }

    const cancel_btn = () =>{
        window.location.href = '/' 
    }

    useEffect(()=>{
        setDis(user.f_name == new_set.f_name && user.phone == new_set.phone && user.l_name == new_set.l_name && user.email == new_set.email && user.address == new_set.address ? true : false)
    },[new_set])


    useEffect(()=>{
        let lang = window.localStorage.getItem('lang')

        if(lang){
            i18n.changeLanguage(lang)
        }
        
    },[])


    return (
        <Container maxWidth='lg' sx={{
            marginTop: "7rem"
        }}>
            <Box sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center'
            }}>
                <Typography variant='h5'>{t("Manage account")}</Typography>
            </Box>

            <Box sx={{
                flexgrow: 1,
                marginTop: '2rem',
            }}>
                <Avatar sx={{ bgcolor: deepOrange[500], marginBottom: "2rem", width: 100, height: 100 }}>{new_set.f_name[0]}</Avatar>
                <form>

                    <Grid container spacing={2} columns={40} align='center'>
                        <Grid item xs={20}>
                            <TextField sx={{
                                backgroundColor: "#fff"
                            }}
                                label={t("Name")} variant="outlined" fullWidth id='f_name' onChange={onchange_text} value={new_set.f_name} />
                        </Grid>

                        <Grid item xs={20}>
                            <TextField sx={{
                                backgroundColor: "#fff"
                            }}
                                label={t("Surname")} variant="outlined" fullWidth id='l_name' onChange={onchange_text} value={new_set.l_name}  />
                        </Grid>

                        <Grid item xs={40} >
                            <TextField sx={{
                                backgroundColor: "#fff"
                            }} label={t("Address")} variant="outlined" fullWidth id='address' onChange={onchange_text} value={new_set.address}  />
                        </Grid>

                        <Grid item xs={40}>
                            <TextField sx={{
                                backgroundColor: "#fff"
                            }} label={t("Phone number")} variant="outlined" fullWidth id='phone' onChange={onchange_text} value={new_set.phone}  />
                        </Grid>

                        <Grid item xs={40}>
                            <TextField sx={{
                                backgroundColor: "#fff"
                            }} label={t("Email")} variant="outlined" fullWidth id='email' onChange={onchange_text} value={new_set.email}  />
                        </Grid>

                    </Grid>
                </form>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gridGap: "1rem"
                }}>
                    <Button variant="contained" disabled = {dis} onClick={save_profile}
                        sx={{
                            marginTop: "2rem",
                            backgroundColor: "#1565c0",
                            height: "3rem",
                            width: "7rem"
                        }}>
                        {t("SAVE")}
                    </Button>

                    <Button variant="contained" onClick={cancel_btn}
                        sx={{
                            marginTop: "2rem",
                            backgroundColor: 'red',
                            height: "3rem",
                            width: "7rem"
                        }}>
                        {t("CANCEL")}
                    </Button>

                </Box>



            </Box>
            <img className='bg' src={bg} />
        </Container>

    )
}

export default Manage_my_account