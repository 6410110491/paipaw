import { Button, Card, CardActionArea, CardContent, CardMedia, Checkbox, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { FavoriteBorder } from '@mui/icons-material';
import Favorite from '@mui/icons-material/Favorite';
import { useTranslation } from 'react-i18next'
import Cookies from 'js-cookie'
import ax from '../axios_api/ax';

function Detail_Card_Tour({ detail_card }) {
    const { t, i18n } = useTranslation()
    const [value, setValue] = useState(5);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [user, setUser] = useState(Cookies.get('user') != undefined ? JSON.parse(Cookies.get('user')) : undefined)
    const [checked, setChecked] = useState(false)

    useEffect(() => {

        let count = 0
        for (let i = 0; i < detail_card.comments.length; i++) {
            count += detail_card.comments[i].vote

        }

        setValue(count / detail_card.comments.length)

        if (Cookies.get('user') != undefined) {
            for (let i = 0; i < detail_card.like.length; i++) {

                if (detail_card.like[i] === user.id) {
                    setChecked(true)
                    break
                }

            }
        }



    }, [])


    const handle_like = (e) => {

        if (Cookies.get('user') === undefined) {
            window.location.href = '/login'
        }

        let token = JSON.parse(Cookies.get('accress'))

        ax.post('/api/like_tour/', { 'tour_id': detail_card.id }, {
            headers: {
                'Authorization': `Bearer ${token.accress}`
            }
        }).then(res => {

            setChecked(!checked)
        })

    }



    const changepage = (link) => {

        window.location.href = "/" + link + '/?id=' + detail_card.id
    }

    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardActionArea>

                <CardMedia
                    component="img"
                    sx={{ objectFit: 'cover' }}
                    height='250rem'
                    width="100%"
                    image={detail_card.img_and_video[0].link}
                    alt="" />

                <CardContent>
                    <Typography fontWeight='bold' noWrap textOverflow='ellipsis' overflow="hidden" minWidth={250} maxWidth={300} variant='h5'>
                        {i18n.language === 'th' ? detail_card.title_th : detail_card.title_en}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardContent>
                <Typography variant="h5" color='#ffac33'>
                    ฿{detail_card.adult_price}
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
                            readOnly
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <Typography variant="subtitle2">[{detail_card.comments.length}]</Typography>
                    </Box>
                    <Checkbox checked={checked} onChange={handle_like} {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Button disabled={detail_card.max === 0} onClick={() => changepage("detail_info")} sx={{ marginTop: 2 }} variant='outlined'>{t("Book Now")}</Button>
                </Box>

            </CardContent>
        </Card >
    )
}

export default Detail_Card_Tour