import { Card, CardActionArea, CardContent, CardMedia, Checkbox, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { FavoriteBorder } from '@mui/icons-material';
import Favorite from '@mui/icons-material/Favorite';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie'
import ax from '../axios_api/ax';

function Favorite_Card({ detail_card }) {
    const [value, setValue] = useState(4);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [user, setUser] = useState(Cookies.get('user') != undefined ? JSON.parse(Cookies.get('user')) : undefined)
    const { t, i18n } = useTranslation()
    const [checked, setChecked] = useState(false)

    useEffect(() => {

        let count = 0
        for (let i = 0; i < detail_card.comments.length; i++) {
            count += detail_card.comments[i].vote

        }

        setValue(count / detail_card.comments.length)

        for (let i = 0; i < detail_card.like.length; i++) {

            if (detail_card.like[i] === user.id) {
                setChecked(true)
                break
            }

        }

    }, [])

    const changepage = (lang) => {

        window.location.href = "/" + lang + '/?id=' + detail_card.id
    }

    const handle_like = (e) => {

        let token = JSON.parse(Cookies.get('accress'))

        ax.post('api/like_tour/', { 'tour_id': detail_card.id }, {
            headers: {
                'Authorization': `Bearer ${token.accress}`
            }
        }).then(res => {
            window.location.reload()
        })

    }

    return (
        <Card sx={{ maxWidth: 500 , position : 'relative' , filter : (detail_card.max === 0) ? "brightness(80%)" : "brightness(100%)"}}>

            <Box sx={{
                position: 'absolute',
                zIndex: 1,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',



            }} display={detail_card.max === 0 ? 'block' : 'none'}>
                <Typography sx={{
                    color: "red",
                    fontSize: '3rem',
                    transform: 'rotate(-30deg)',
                    fontWeight: 'bold'
                }}>{t("SOLD OUT")}</Typography>
            </Box>

            <CardActionArea onClick={() => changepage('tour_detail')}>

                <CardMedia
                    component="img"
                    sx={{ objectFit: 'cover' }}
                    height='150rem'
                    width="100%"
                    image={detail_card.img_and_video[0].link}
                    alt="" />

                <CardContent>
                    <Typography fontWeight='bold' noWrap textOverflow='ellipsis' minWidth={250} maxWidth={300} overflow="hidden" variant='subtitle1'>
                        {i18n.language === 'th' ? detail_card.title_th : detail_card.title_en}
                    </Typography>


                    <Typography noWrap textOverflow='ellipsis' minWidth={250} maxWidth={300} variant='subtitle2'>
                        {i18n.language === 'th' ? detail_card.description_th : detail_card.description_en}
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
                    <Checkbox checked={checked} onChange={handle_like} {...label} icon={<Favorite sx={{ color: 'red' }} />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
                </Box>
            </CardContent>
        </Card >
    )
}

export default Favorite_Card