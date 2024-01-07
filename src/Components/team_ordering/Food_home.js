import { Box, Card, CardContent, Container, Divider, Grid, IconButton, MenuItem, Rating, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Top_food from '../team_top/Top_food'
import { useTranslation } from 'react-i18next'
import Detail_Card_Food from '../team_card/Detail_Card_Food'
import Sorting from '../team_sorting/Sorting'

function Food_home() {
    const { t, i18n } = useTranslation()

    return (
        <Container maxWidth='lg' sx={{ marginTop: "7rem", marginBottom: '3rem' }}>
            <Typography variant='h3'>{t("Coming soon.")}</Typography>
             {/* <Typography variant='h3'>{t("Foods")}</Typography>
            <Box sx={{
                width: '100%',
                height: '0.2rem',
                backgroundColor: '#ffae00',
                marginTop: "1rem",
            }}></Box>
            <CardContent>
                <Top_food />
            </CardContent>

            <Sorting />

            <Card sx={{ boxShadow: 7, marginTop: '3rem' }}>
                <CardContent>
                    <Grid container spacing={1.5} columns={12} justifyContent="center">
                        <Grid item lg={3} md={4} sm={6}>
                            <Detail_Card_Food />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6}>
                            <Detail_Card_Food />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6}>
                            <Detail_Card_Food />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6}>
                            <Detail_Card_Food />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6}>
                            <Detail_Card_Food />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6}>
                            <Detail_Card_Food />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6}>
                            <Detail_Card_Food />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
 */}


        </Container>

    )
}

export default Food_home