import { Box , Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import image from '../Images/banner.jpg'

function CC() {
    return (
        <Card sx={{ maxWidth : 500 , minWidth: 275, marginTop: '2rem', display: 'flex' }}>
            <Box sx={{
                width : "30%"
            }}>
                <CardMedia
                    component="img"
                    image={image}
                    alt="image"
                    height="100%"
                    sx={{
                        objectFit : "cover"
                    }}
                />
            </Box>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    be nev o lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default CC