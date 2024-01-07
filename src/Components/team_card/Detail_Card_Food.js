import { Button, Card, CardActionArea, CardContent, CardMedia, Checkbox, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { FavoriteBorder } from '@mui/icons-material';
import Favorite from '@mui/icons-material/Favorite';
import { useTranslation } from 'react-i18next'

function Detail_Card_Food() {
    const { t, i18n } = useTranslation()
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
                        image="https://cdn.pixabay.com/photo/2016/02/22/17/05/food-1216048_960_720.jpg"
                        alt="" />

                <CardContent>
                    <Typography fontWeight='bold' noWrap textOverflow='ellipsis' overflow="hidden" minWidth={250} maxWidth={300} variant='subtitle1'>
                        Yellow Noodle
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardContent>
                <Typography variant="h5" color='#ffac33'>
                    ฿1249.00
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gridGap: '0.5rem',
                    }}>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <Typography variant="subtitle2">[456]</Typography>
                    </Box>
                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Button sx={{ marginTop: 2 }} variant='outlined'>{t("Buy Now")}</Button>
                </Box>

            </CardContent>
        </Card >
    )
}

export default Detail_Card_Food