import { Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, styled, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import CancelIcon from '@mui/icons-material/Cancel';

import queryString from 'query-string'
import ax from '../axios_api/ax';

import Cookies from 'js-cookie'

function Edit_Tour_detail() {
    const { t, i18n } = useTranslation()
    const [files, setFile] = useState([]);
    const [startvalue, setstartValue] = useState(0);
    const [endvalue, setendValue] = useState(0);
    const [infomation, setInfomation] = useState({})

    // const format = require('date-fns/format')

    const [load, setLoad] = useState(true)

    useEffect(() => {

        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
        }


        let token = JSON.parse(Cookies.get('accress'))

        ax.get(`/api/tours/${queryString.parse(window.location.search).id}` , {
            headers: {
                'Authorization': `Bearer ${token.accress}`
            }
        }).then(res => {
            setInfomation(res.data)
            setstartValue(res.data.start)
            setendValue(res.data.end)
            setLoad(false)
        })


    }, [])

    useEffect(() => {

        if (!load) {
            let img = []
            for (let i = 0; i < infomation.img_and_video.length; i++) {

                img.push({ 'img': infomation.img_and_video[i].link, 'id': infomation.img_and_video[i].id })
            }

            setFile(img)
        }



    }, [load])

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
                allfiles.push(e.target.files[i]);
            }

        }

        if (allfiles.length > 0) {
            setFile(files.concat(allfiles));
        }
    };

    const delete_img = (index, id) => {
        let new_data = []
        for (let i = 0; i < files.length; i++) {
            if (i != index) {
                new_data.push(files[i])
            }
        }

        if (id) {
            let token = JSON.parse(Cookies.get('accress'))

            ax.post(`/api/tour/del_img/`, { 'id': id } , {
                headers: {
                    'Authorization': `Bearer ${token.accress}`
                }
            }).then(res => {
                setFile(new_data)
            })
        } else {
            setFile(new_data)
        }




    }
    const formRef = useRef();

    const changepage = (lang) => {
        window.location.href = "/" + lang
    }

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

    const save = async (e) => {
        e.preventDefault()

        let data_save = infomation
        let file = new FormData()
        let id = queryString.parse(window.location.search).id
        for (let i = 0; i < files.length; i++) {

            if (files[i].img === undefined) {
  
                file.append(files[i].name, files[i])
            }

        }

        
        file.append('tour_id', id)


        let token = JSON.parse(Cookies.get('accress'))

        ax({
            url: `/api/tour/add_img/`,
            method: 'POST',
            data: file,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token.accress}`
              }
        }).then(res => {

            
            ax.put(`/api/tour/save/`, data_save , {
                headers: {
                    'Authorization': `Bearer ${token.accress}`
                }
            }).then(res => {
                changepage('add_tour')
            })

        })

    }


    if (load) return <Typography variant='h5'>Loading...</Typography>

    return (
        <Container maxWidth='md' sx={{
            marginTop: "7rem",
            marginBottom: "5rem"
        }}>
            <Typography variant='h3'>{t("EDIT TOUR")}</Typography>
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
                    }} label={t("English title...")} variant="outlined" fullWidth value={infomation.title_en} id="title_en" onChange={handle_onchange} />

                    <TextField required sx={{
                        backgroundColor: "#fff",
                        marginBottom: "1rem"
                    }} label={t("Thai title...")} variant="outlined" fullWidth value={infomation.title_th} id="title_th" onChange={handle_onchange} />

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
                                }} label={t("Adult Price...")} variant="outlined" fullWidth value={infomation.adult_price} id="adult_price" onChange={handle_onchange} />
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
                                }} label={t("Child Price...")} variant="outlined" fullWidth value={infomation.child_price} id="child_price" onChange={handle_onchange} />
                        </Grid>
                    </Grid>

                    {/* description */}
                    <Typography variant='h5' sx={{ marginBottom: "0.5rem" }}>{t("DESCRIPTION")}</Typography>
                    <TextField multiline required sx={{
                        backgroundColor: "#fff",
                        marginBottom: "1rem"
                    }} label={t("English description...")} variant="outlined" fullWidth value={infomation.description_en} id="description_en" onChange={handle_onchange} />

                    <TextField multiline required sx={{
                        backgroundColor: "#fff",
                        marginBottom: "1rem"
                    }} label={t("Thai description...")} variant="outlined" fullWidth value={infomation.description_th} id="description_th" onChange={handle_onchange} />

                    {/* max people */}
                    <Typography variant='h5' sx={{ marginBottom: "0.5rem" }}>{t("MAX PEOPLE")}</Typography>
                    <Grid container spacing={1.5} columns={40} >
                        <Grid item xs={20}>
                            <TextField type="number" required
                                sx={{
                                    backgroundColor: "#fff",
                                    marginBottom: "1rem",
                                }} label={t("Max people...")} variant="outlined" fullWidth value={infomation.max} id="max" onChange={handle_onchange} />
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
                                                        onClick={() => delete_img(key, file.id)}
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
                                                    src={((typeof file) === 'object' && file.img == undefined) ? URL.createObjectURL(file) : file.img}
                                                    sx={{
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </CardContent>
                                            <CardContent>
                                                <Typography noWrap variant='subtitle1'>{((typeof file) === 'object' && file.img == undefined) ? file.name : file.img}</Typography>
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
                    }} label={t("URL...")} variant="outlined" fullWidth value={infomation.video} id="video" onChange={handle_onchange} />

                    {/* add button */}
                    <Button onClick={save} color='success' variant="contained" fullWidth type="submit"
                        sx={{
                            marginTop: "2rem",
                            height: "3rem"
                        }}>
                        {t("Save")}
                    </Button>
                </form>
                <Button onClick={() => changepage('add_tour')} color='error' variant="contained" fullWidth type="submit"
                    sx={{
                        marginTop: "2rem",
                        height: "3rem"
                    }}>
                    {t("Cancel")}
                </Button>
            </Card>
        </Container>

    )
}

export default Edit_Tour_detail