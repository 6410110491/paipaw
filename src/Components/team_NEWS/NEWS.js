import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Card_NEWS from './Card_NEWS'
import ax from '../axios_api/ax'

function NEWS() {

    const { t, i18n } = useTranslation()
    const [data , setData] = useState([{}])
    const [load , setLoad] = useState(true)

    useEffect(()=>{
        let lang = window.localStorage.getItem('lang')

        if(lang){
            i18n.changeLanguage(lang)
        }
        
    },[])

    useEffect(()=>{

        ax.get('/api/NEWS/').then(res => {
            setData(res.data)
            setLoad(false)
        })

    },[])

    if(load) return <Typography variant='subtitle1'>Loading...</Typography>

    return (
        <Container maxWidth='lg' sx={{
            marginTop: "7rem",
            marginBottom : '3rem'
        }}>
            <Typography variant='h3'>{t("NEWS")}</Typography>
            <Box sx={{
                width : '100%',
                height : '0.2rem',
                backgroundColor :'#ffae00',
                marginTop : "1rem"
            }}></Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                {data.map((d,i) => <Card_NEWS detail_card={d} key={i} />)}
                
            </Box>
        </Container>
    )
}

export default NEWS