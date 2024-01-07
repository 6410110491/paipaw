import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'

function Admin_add_Card() {
    const [value, setValue] = useState(4);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>

                <CardMedia
                    component="img"
                    sx={{ objectFit: 'cover' }}
                    height='150rem'
                    width="100%"
                    image="https://sv1.picz.in.th/images/2022/02/15/rh323l.jpg"
                    alt="" />

                <CardContent>
                    <Typography fontWeight='bold' noWrap textOverflow='ellipsis' minWidth={250} maxWidth={300} overflow="hidden" variant='subtitle1'>
                        tapu island
                    </Typography>


                    <Typography noWrap textOverflow='ellipsis' minWidth={250} maxWidth={300} variant='subtitle2'>
                        lies in the Ao nang. Sai Thai, and Park Nam sub-districts
                        of Amphoe Mueang Krabi, Krabi Province, Thailand.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gridGap:'1rem'
                    
                }}>
                    <Button sx={{ marginTop: 2 ,backgroundColor:'#1E90FF'}} variant='contained'>Edit</Button>
                    <Button sx={{ marginTop: 2 ,backgroundColor:'red'}} variant='contained'>Delete</Button>
                </Box>
            </CardContent>
        </Card >
    )
}

export default Admin_add_Card