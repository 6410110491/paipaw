import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Divider, Grid, IconButton, Rating, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Admin_add_product_Card from '../team_card/Admin_add_product_Card'
import Sorting from '../team_sorting/Sorting';
import ax from '../axios_api/ax';
import Cookies from 'js-cookie'

function ADD_Tour() {
    const { t, i18n } = useTranslation()

    const [data, Setdata] = useState([{}])
    const [load, setLoad] = useState(true)
    const [min , setMin] = useState(0)
    const [max , setMax] = useState(0)
    const [sort , setSort] = useState('max_to_min')
    const [star , setStar] = useState(0)

    useEffect(() => {

        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
        }

        let token = JSON.parse(Cookies.get('accress'))

        ax.get(`/api/tour_main/?min=${min}&max=${max}&sort=${sort}&star=${star}`, {
            headers: {
                'Authorization': `Bearer ${token.accress}`
            }
        }).then(res => {
            Setdata(res.data)
            setLoad(false)
        })


    }, [min , max , sort , star])


    const changepage = (lang) => {
        window.location.href = "/" + lang
    }



    if (load) return <Typography variant='h5'>Loading...</Typography>

    return (
        <Container maxWidth='lg' sx={{
            marginTop: "7rem"
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}><Button variant="contained" onClick={() => changepage("ADD_Tour_detail")} sx={{ backgroundColor: "#1565c0" }}>
                    {t("Add +")}
                </Button>
            </Box>

            {/* filter card */}
            <Sorting min={setMin} max={setMax} sort={setSort} star={setStar} />

            <Card sx={{ boxShadow: 0, marginTop: '3rem' }}>
                <CardContent>
                    <Grid container spacing={1.5} columns={12} justifyContent="center">
                        {data.length !== 0 ? data.map((d, i) => {
                            return (
                                <Grid item lg={4} md={6} key={i}>
                                    <Admin_add_product_Card detail_card={d} />
                                </Grid>
                            )
                        }) : <Typography variant='h3'>{t("NOT FOUND")}</Typography>}
                    </Grid>
                </CardContent>
            </Card>

        </Container >

    )
}

export default ADD_Tour