import { Box, Card, CardContent, Container, Divider, Grid, IconButton, MenuItem, Rating, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Top_tour from '../team_top/Top_tour'
import Select_Card from '../team_card/Select_Card';
import Sorting from '../team_sorting/Sorting';
import ax from '../axios_api/ax';

function Travel_home() {
    const { t, i18n } = useTranslation()

    const [Tour , setTour] = useState([])
    const [min , setMin] = useState(0)
    const [max , setMax] = useState(0)
    const [sort , setSort] = useState('max_to_min')
    const [star , setStar] = useState(0)

    useEffect(()=>{

        ax.get(`/api/tour_main/?min=${min}&max=${max}&sort=${sort}&star=${star}`).then(res => {
            setTour(res.data)
        })
        

    },[min , max , sort , star])


    useEffect(()=>{
        let lang = window.localStorage.getItem('lang')

        if(lang){
            i18n.changeLanguage(lang)
        }
        
    },[])


    return (
        <Container maxWidth='lg' sx={{ marginTop: "7rem", marginBottom: '3rem' }}>
            <Typography variant='h3'>{t("Travels")}</Typography>
            <Box sx={{
                width: '100%',
                height: '0.2rem',
                backgroundColor: '#ffae00',
                marginTop: "1rem",
            }}></Box>
            <CardContent>
                <Top_tour />
            </CardContent>

            <Sorting min={setMin} max={setMax} sort={setSort} star={setStar} />

            <Card sx={{ boxShadow: 0, marginTop: '3rem' }}>
                <CardContent>
                    <Grid container spacing={1.5} columns={12} justifyContent="center">
                        {Tour.length !== 0 ? Tour.map((d, i) => {
                            return (
                                <Grid item lg={4} md={6} key={i}>
                                    <Select_Card detail_card={d} />
                                </Grid>
                            )
                        }) : <Typography variant='h3'>{t("NOT FOUND")}</Typography>}
                    </Grid>
                </CardContent>
            </Card>



        </Container>
    )
}

export default Travel_home