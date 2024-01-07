import { Button, Card, CardActionArea, CardContent, CardMedia, Checkbox, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { FavoriteBorder } from '@mui/icons-material';
import Favorite from '@mui/icons-material/Favorite';
import { useTranslation } from 'react-i18next'
import Cookies from 'js-cookie'
import ax from '../axios_api/ax';

function Top_Card({ top, number }) {
    const [value, setValue] = useState(0);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { t, i18n } = useTranslation()
    const [user, setUser] = useState(Cookies.get('user') != undefined ? JSON.parse(Cookies.get('user')) : undefined)
    const [checked, setChecked] = useState(false)

    const changepage = (lang) => {

        window.location.href = "/" + lang + '/?id=' + top.id
    }

    useEffect(() => {

        let count = 0
        for (let i = 0; i < top.comments.length; i++) {
            count += top.comments[i].vote

        }

        setValue(count / top.comments.length)

        if (Cookies.get('user') != undefined) {
            for (let i = 0; i < top.like.length; i++) {

                if (top.like[i] === user.id) {
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

        ax.post('api/like_tour/', { 'tour_id': top.id }, {
            headers: {
                'Authorization': `Bearer ${token.accress}`
            }
        }).then(res => {

            setChecked(!checked)
        })

    }

    return (
        <Card sx={{ minWidth: '100%' , position : 'relative' , filter : (top.max === 0) ? "brightness(80%)" : "brightness(100%)"} }>
            <Box sx={{
                position : 'absolute',
                zIndex : 1,
                top : '50%',
                left : '50%',
                transform : 'translate(-50%,-50%)',
                
                

            }} display={top.max === 0 ? 'block' : 'none'}>
                <Typography sx={{
                    color : "red",
                    fontSize : '5rem',
                    transform : 'rotate(-30deg)',
                    fontWeight : 'bold'
                }}>{t("SOLD OUT")}</Typography>
            </Box>
            <CardActionArea onClick={() => changepage('tour_detail')}>
                <Box sx={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        sx={{ objectFit: 'cover' }}
                        height='150rem'
                        width="100%"
                        image={top.img_and_video[0].link}
                        alt="" />
                    <Box sx={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        textShadow: '2px 2px #000',
                        backgroundColor: "#fff",
                        padding: '2.2rem',
                        borderRadius: '100%',
                        width: '3rem',
                        height: '3rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Typography fontWeight='bold' color='#ffae00' variant='h4'>#{number}</Typography>
                    </Box>
                </Box>
                <CardContent>
                    <Typography fontWeight='bold' noWrap textOverflow='ellipsis' overflow="hidden" minWidth={250} maxWidth={300} variant='subtitle1'>
                        {i18n.language === 'th' ? top.title_th : top.title_en}
                    </Typography>


                    <Typography noWrap textOverflow='ellipsis' minWidth={250} maxWidth={300} variant='subtitle2'>
                        {i18n.language === 'th' ? top.description_th : top.description_en}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardContent>
                <Typography variant="h5" color='#ffac33'>
                    ฿{top.adult_price ? top.adult_price : "loading..."}
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
                        <Typography variant="subtitle2">[{top.comments.length}]</Typography>
                    </Box>
                    <Checkbox checked={checked} onChange={handle_like} {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Button disabled={top.max === 0} sx={{ marginTop: 2 }} onClick={() => changepage("detail_info")} variant='contained'>{t("Book Now")}</Button>
                </Box>

            </CardContent>
        </Card >
    )
}

export default Top_Card