import { Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, styled, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import CancelIcon from '@mui/icons-material/Cancel';
import ax from '../axios_api/ax';
import Cookies from 'js-cookie'

function Add_Tour_detail() {
    const { t, i18n } = useTranslation()
    const [files, setFile] = useState([]);
    const [startvalue, setstartValue] = useState(null);
    const [infomation, setInfomation] = useState({
        "title_en": "",
        "title_th": "",
        "adult_price": 0,
        "child_price": 0,
        "description_en": "",
        "description_th": "",
        "max": 0,
        "video": "",
        "start": "",
        "end": "",
    })
    const [endvalue, setendValue] = useState(null);
    // const format = require('date-fns/format')

    const Input = styled('input')({
        display: 'none',
    });

    const handlerFile = (e) => {

        if (files.length >= 5 || e.target.files.length > 5) {
            alert(t("Max Image is") + " " + 5)
            return false
        }

        let allfiles = []
        for (let i = 0; i < e.target.files.length; i++) {

            if (e.target.files.length === 0) return false;
            const file = e.target.files[i];

            if (e.target.files[i].type === "image/jpeg" || e.target.files[i].type === "image/png") {
                console.log(e.target.files[i])
                console.log(typeof e.target.files[i])
                allfiles.push(e.target.files[i]);
            }

        }

        if (allfiles.length > 0) {
            setFile(files.concat(allfiles));
        }
    };

    const delete_img = (index) => {
        let new_data = []
        for (let i = 0; i < files.length; i++) {
            if (i != index) {
                new_data.push(files[i])
            }
        }
        setFile(new_data)


    }
    const formRef = useRef();

    const handle_onchange = (e) => {

        if (e.target.id === 'title_en') {
            setInfomation({ ...infomation, 'title_en': e.target.value })
        }

        if (e.target.id === 'title_th') {
            setInfomation({ ...infomation, 'title_th': e.target.value })
        }

        if (e.target.id === 'adult_price') {
            setInfomation({ ...infomation, 'adult_price': e.target.value })
        }

        if (e.target.id === 'child_price') {
            setInfomation({ ...infomation, 'child_price': e.target.value })
        }

        if (e.target.id === 'description_en') {
            setInfomation({ ...infomation, 'description_en': e.target.value })
        }

        if (e.target.id === 'description_th') {
            setInfomation({ ...infomation, 'description_th': e.target.value })
        }

        if (e.target.id === 'max') {
            setInfomation({ ...infomation, 'max': e.target.value })
        }

        if (e.target.id === 'video') {
            setInfomation({ ...infomation, 'video': e.target.value })
        }
    }

    const changepage = (lang) => {
        window.location.href = "/" + lang
    }

    const add = (e) => {
        e.preventDefault()

        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
        }

        if (infomation.title_en != "" && infomation.title_th != "" &&
            infomation.adult_price > 0 && infomation.child_price > 0 &&
            infomation.description_en != "" && infomation.description_th != "" &&
            infomation.start != null && infomation.end != null &&
            infomation.video != "" && infomation.max > 0 && files.length > 0) {


            let data_save = infomation
            let file = new FormData()
            for (let i = 0; i < files.length; i++) {

                file.append(files[i].name, files[i])
            }

            let token = JSON.parse(Cookies.get('accress'))


            ax.post(`/api/tours/`, data_save , {
                headers: {
                    'Authorization': `Bearer ${token.accress}`
                }
            }).then(res => {

                file.append('tour_id', res.data.id)

                ax({
                    url: `/api/tour/add_img/`,
                    method: 'POST',
                    data: file,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token.accress}`
                    }
                }).then(res => {
                    changepage('add_tour')
                })
            })


        }else{
            alert(t('Please complete the information.'))
        }


    }

    return (
        <Container maxWidth='md' sx={{
            marginTop: "7rem",
            marginBottom: "5rem"
        }}>
            <Typography variant='h3'>{t("ADD TOUR")}</Typography>
            <Box sx={{
                width: '100%',
                height: '0.2rem',
                backgroundColor: '#ffae00',
                marginTop: "1rem",
            }}></Box>

            <Card sx={{ marginTop: "2rem", padding: "1rem" }}>
                <form ref={formRef}>
                    {/* title */}
                    <Typography variant='h5' sx={{ marginBottom: "0.5rem" }}>{t("TITLE")}</Typography>
                    <TextField required sx={{
                        backgroundColor: "#fff",
                        marginBottom: "1rem"
                    }} label={t("English title...")} variant="outlined" fullWidth id='title_en' value={infomation.title_en} onChange={handle_onchange} />

                    <TextField required sx={{
                        backgroundColor: "#fff",
                        marginBottom: "1rem"
                    }} label={t("Thai title...")} variant="outlined" fullWidth id='title_th' value={infomation.title_th} onChange={handle_onchange} />

                    {/* price */}
                    <Typography variant='h5' sx={{ marginBottom: "0.5rem" }}>{t("PRICE")}</Typography>
                    <Grid container spacing={1.5} columns={40} >
                        <Grid item xs={20}>
                            <TextField type="number" required
                                InputProps={{
                                    inputProps: {
                                        min: 0
                                    }
                                }}
                                sx={{
                                    backgroundColor: "#fff",
                                    marginBottom: "1rem",
                                }} label={t("Adult Price...")} variant="outlined" fullWidth id='adult_price' value={infomation.adult_price} onChange={handle_onchange} />
                        </Grid>

                        <Grid item xs={20}>
                            <TextField type="number" required
                                InputProps={{
                                    inputProps: {
                                        min: 0
                                    }
                                }}
                                sx={{
                                    backgroundColor: "#fff",
                                    marginBottom: "1rem",
                                }} label={t("Child Price...")} variant="outlined" fullWidth id='child_price' value={infomation.child_price} onChange={handle_onchange} />
                        </Grid>
                    </Grid>

                    {/* description */}
                    <Typography variant='h5' sx={{ marginBottom: "0.5rem" }}>{t("DESCRIPTION")}</Typography>
                    <TextField multiline required sx={{
                        backgroundColor: "#fff",
                        marginBottom: "1rem"
                    }} label={t("English description...")} variant="outlined" fullWidth id='description_en' value={infomation.description_en} onChange={handle_onchange} />

                    <TextField multiline required sx={{
                        backgroundColor: "#fff",
                        marginBottom: "1rem"
                    }} label={t("Thai description...")} variant="outlined" fullWidth id='description_th' value={infomation.description_th} onChange={handle_onchange} />

                    {/* max people */}
                    <Typography variant='h5' sx={{ marginBottom: "0.5rem" }}>{t("MAX PEOPLE")}</Typography>
                    <Grid container spacing={1.5} columns={40} >
                        <Grid item xs={20}>
                            <TextField type="number" required
                                sx={{
                                    backgroundColor: "#fff",
                                    marginBottom: "1rem",
                                }} label={t("Max people...")} variant="outlined" fullWidth id='max' value={infomation.max} onChange={handle_onchange} />
                        </Grid>
                    </Grid>

                    {/* date time */}
                    <Typography variant='h5' sx={{ marginBottom: "0.5rem" }}>{t("DATE TIME")}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gridGap: "1rem" }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label={t("Start")}
                                value={startvalue}
                                onChange={(newValue) => {
                                    setInfomation({ ...infomation, 'start': newValue })
                                    setstartValue(newValue);
                                }}
                            />
                        </LocalizationProvider>

                        <Typography variant='h5'>-</Typography>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label={t("End")}
                                value={endvalue}
                                onChange={(newValue) => {
                                    setInfomation({ ...infomation, 'end': newValue })
                                    setendValue(newValue);
                                }}
                            />
                        </LocalizationProvider>


                    </Box>




                    {/* images */}
                    <Typography variant='h5' sx={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>{t("IMAGES")}</Typography>
                    <Box>
                        <Grid container columns={12} spacing={1} justifyContent='center'>
                            {files.map((file, key) => {
                                return (
                                    <Grid key={key} item lg={3}>

                                        <Card sx={{ height: 200, width: 200 }}>
                                            <Box sx={{ padding: 0.1 }}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end'
                                                }}>

                                                    <IconButton
                                                        onClick={() => delete_img(key)}
                                                        size="large"
                                                        edge="start"
                                                        aria-label="menu"
                                                        sx={{ color: 'red' }}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                            <CardContent sx={{ height: '30%' }}>
                                                <CardMedia
                                                    component='img'
                                                    height="100%"
                                                    width="100%"
                                                    src={URL.createObjectURL(file)}
                                                    sx={{
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </CardContent>
                                            <CardContent>
                                                <Typography noWrap variant='subtitle1'>{file.name}</Typography>
                                            </CardContent>

                                        </Card>

                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Box sx={{
                            marginTop: '1rem',
                            marginBottom: '1rem'
                        }}>
                            <label htmlFor="contained-button-file">
                                <Input onChange={handlerFile} aria-hidden accept=".png, .jpg, .jpeg" id="contained-button-file" multiple type="file" />
                                <Button variant="contained" sx={{ backgroundColor: "#1565c0" }} component="span">
                                    {t("Upload")}
                                </Button>
                            </label>
                        </Box>
                    </Box>

                    {/* link video youtube */}
                    <Typography variant='h5' sx={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>{t("LINK VIDEO YOUTUBE")}</Typography>
                    <TextField required sx={{
                        backgroundColor: "#fff",
                        marginBottom: "1rem"
                    }} label={t("URL...")} variant="outlined" fullWidth id='video' value={infomation.video} onChange={handle_onchange} />

                    {/* add button */}
                    <Button onClick={add} variant="contained" fullWidth type="submit"
                        sx={{
                            marginTop: "2rem",
                            backgroundColor: "#ffae00",
                            height: "3rem"
                        }}>
                        {t("ADD")}
                    </Button>
                </form>
            </Card>
        </Container>

    )
}

export default Add_Tour_detail