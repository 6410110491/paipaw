import { Box, Card, CardContent, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Favorite_api from '../api_demo/Favorite_api';
import ax from '../axios_api/ax';
import Favorite_Card from '../team_card/Favorite_card'
import Cookies from 'js-cookie'

function Favorite_page() {
    const { t, i18n } = useTranslation()

    const [user, setUser] = useState(Cookies.get('user') != undefined ? JSON.parse(Cookies.get('user')) : undefined)
    const [data , setData] = useState([])


    useEffect(() => {
        let lang = window.localStorage.getItem('lang')

        if (lang) {
            i18n.changeLanguage(lang)
        }

        

    }, [])

    useEffect(()=>{

        ax.get(`/api/tours/?like=${user.id}`).then(res => {
            setData(res.data)
        })

    },[])

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }} maxWidth='lg'>
            <Typography variant='h3' sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '7rem',
                fontWeight: 'bold'
            }}>{t("My Favorite")}</Typography>
            <Card sx={{ boxShadow: 0, marginTop: '3rem', marginBottom: '1rem', width: "100%" }}>
                <CardContent>
                    <Typography variant='h4'>{t("TOURS")}</Typography>
                    <Box sx={{
                        width: '100%',
                        height: '0.2rem',
                        backgroundColor: '#ffae00',
                        marginTop: "1rem",
                    }}></Box>
                </CardContent>
                <CardContent>
                    <Grid container spacing={1.5} columns={12} justifyContent="center">
                        {data.map((d, i) => {
                            return (
                                <Grid item lg={4} md={6} key={i}>
                                    <Favorite_Card detail_card={d} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </CardContent>
            </Card>

        </Container>
    )
}

export default Favorite_page