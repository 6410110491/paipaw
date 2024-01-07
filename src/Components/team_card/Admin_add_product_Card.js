import { Box ,Button, Card, CardActionArea, CardContent, CardMedia, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FavoriteBorder } from '@mui/icons-material';
import Favorite from '@mui/icons-material/Favorite';
import { useTranslation } from 'react-i18next'
import ax from '../axios_api/ax';
import Cookies from 'js-cookie'

function Admin_add_product_Card({ detail_card }) {
    const [value, setValue] = useState(4);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [alert, setAlert] = useState(false);
    const { t, i18n } = useTranslation()


    useEffect(() => {

        let count = 0
        for (let i = 0; i < detail_card.comments.length; i++) {
            count += detail_card.comments[i].vote

        }

        setValue(count / detail_card.comments.length)

    }, [detail_card])

    const changepage = (lang) => {

        window.location.href = "/" + lang + '/?id=' + detail_card.id
    }

    const on_alert = () => {
        setAlert(true)
    }

    const handleClose = () => {
        setAlert(false)
    }

    const handle_Delete = () => {

        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
        }

        let token = JSON.parse(Cookies.get('accress'))

        ax.post('/api/tour/delete/' , {'id' : detail_card.id} , {
            headers: {
                'Authorization': `Bearer ${token.accress}`
            }
        }).then(res => {
            window.location.reload()
        })
    }

    return (
        <Card sx={{ maxWidth: 500 }}>
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
                        {i18n.language === "th" ? detail_card.title_th : detail_card.title_en}
                    </Typography>


                    <Typography noWrap textOverflow='ellipsis' minWidth={250} maxWidth={300} variant='subtitle2'>
                        {i18n.language === "th" ? detail_card.description_th : detail_card.description_en}
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
                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
                </Box>
            </CardContent>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gridGap: '1rem'

                }}>
                    <Button onClick={()=> changepage('edit_tour')} sx={{ marginTop: 2, backgroundColor: '#1E90FF' }} variant='contained'>{t("Edit")}</Button>
                    <Button onClick={on_alert} sx={{ marginTop: 2, backgroundColor: 'red' }} variant='contained'>{t("Delete")}</Button>
                </Box>
            </CardContent>


            <Dialog
                open={alert}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle sx={{
                    fontWeight: 'bold',
                    color: 'red'
                }} id="draggable-dialog-title">
                    {t("Warning")}
                </DialogTitle>
                <DialogContent>
                    <Divider />
                </DialogContent>

                <DialogContent>
                    <DialogContentText>
                        {t("Are you sure to delete?")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        {t("No")}
                    </Button>
                    <Button onClick={handle_Delete}>{t("Yes")}</Button>
                </DialogActions>
            </Dialog>

        </Card >
    )
}

export default Admin_add_product_Card
