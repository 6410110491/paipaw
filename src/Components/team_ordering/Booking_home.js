import { Box, Card, CardContent, Container, Divider, Grid, IconButton, MenuItem, Rating, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Select_Card from '../team_card/Select_Card';
import Top_booking from '../team_top/Top_booking';
import Sorting from '../team_sorting/Sorting';

function Booking_home() {
    const { t, i18n } = useTranslation()
    return (
        <Container maxWidth='lg' sx={{ marginTop: "7rem", marginBottom: '3rem' }}>
            <Typography variant='h3'>{t("Coming soon.")}</Typography>
            {/* <Typography variant='h3'>{t("Booking")}</Typography>
            <Box sx={{
                width: '100%',
                height: '0.2rem',
                backgroundColor: '#ffae00',
                marginTop: "1rem",
            }}></Box>
            <CardContent>
                <Top_booking />
            </CardContent>

            <Sorting />

            <Card sx={{ boxShadow: 7, marginTop: '3rem' }}>
                <CardContent>
                    <Grid container spacing={1.5} columns={12} justifyContent="center">
                        <Grid item lg={3} md={4} sm={6}>
                            <Select_Card />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6}>
                            <Select_Card />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6}>
                            <Select_Card />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6}>
                            <Select_Card />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6}>
                            <Select_Card />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6}>
                            <Select_Card />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6}>
                            <Select_Card />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card> */}



        </Container>

    )
}

export default Booking_home