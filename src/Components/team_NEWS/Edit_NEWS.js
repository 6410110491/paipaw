import { Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, styled, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './Add_NEWS.css'
import queryString from 'query-string'
import CancelIcon from '@mui/icons-material/Cancel';
import Cookies from 'js-cookie'
import ax from '../axios_api/ax';


function Edit_NEWS() {
    const { t, i18n } = useTranslation()

    const [files, setFile] = useState([]);
    const [info, setInfo] = useState({

        'title_th': "",
        'title_en': "",
        'dscription_th': "",
        'description_en': ""
    })
    const [load , setLoad] = useState(true)

    const Input = styled('input')({
        display: 'none',
    });

    const handlerFile = (e) => {
        if (files.length >= 1 || e.target.files.length > 1) {
            alert(t("Max Image is") + " " + 1)
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


    const handle_change = (e) => {

        if (e.target.id === "title_en") {
            setInfo({ ...info, "title_en": e.target.value })
        }

        if (e.target.id === "title_th") {
            setInfo({ ...info, "title_th": e.target.value })
        }

        if (e.target.id === "description_en") {
            setInfo({ ...info, "description_en": e.target.value })
        }

        if (e.target.id === "description_th") {
            setInfo({ ...info, "description_th": e.target.value })
        }


    }


    const handle_edit_news = (e) => {

        e.preventDefault()

        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
        }

        if (info.title_en !== "" && info.title_th !== "" && info.description_en !== "" && info.description_th !== "" && files[0] !== undefined) {

            let token = JSON.parse(Cookies.get('accress'))

            let data = new FormData()

            data.append("title_th", info.title_th)
            data.append("title_en", info.title_en)
            data.append("description_th", info.description_th)
            data.append("description_en", info.description_en)
            data.append("img", files[0])

            let id = queryString.parse(window.location.search).id


            ax.put(`/api/NEWS/${id}/`, data, {
                headers: {
                    'Authorization': `Bearer ${token.accress}`
                }
            }).then(res => {

                window.location.href = "/NEWS"

            }).catch(err => {

                // Cookies.remove('user')
                // Cookies.remove('accress')


                // ax.get('/auth/signout/').then(res => {

                //     window.location.href = '/login'
                // })

            })
        }else{
            alert(t('Please complete the information.'))
        }

    }


    useEffect(()=>{

        let id = queryString.parse(window.location.search).id

        ax.get(`/api/NEWS/${id}`).then(res => {
            setInfo(res.data)
            setLoad(false)
        })
    },[])

    if(load) return <Typography variant='subtitle1'>Loading...</Typography>

    return (
        <Container maxWidth='md' sx={{
            marginTop: "7rem",
        }}>
            <Typography variant='h3'>{t("ADD NEWS")}</Typography>
            <Box sx={{
                width: '100%',
                height: '0.2rem',
                backgroundColor: '#ffae00',
                marginTop: "1rem",
            }}></Box>

            <Card sx={{ marginTop: "2rem", padding: "1rem" }}>
                <form ref={formRef}>
                    <Typography variant='h5' sx={{ marginBottom: "0.5rem" }}>{t("TITLE")}</Typography>
                    <TextField required sx={{
                        backgroundColor: "#fff",
                        marginBottom: "1rem"
                    }} label={t("English title...")} variant="outlined" fullWidth id='title_en' value={info.title_en} onChange={handle_change} />

                    <TextField required sx={{
                        backgroundColor: "#fff",
                        marginBottom: "1rem"
                    }} label={t("Thai title...")} variant="outlined" fullWidth id='title_th' value={info.title_th} onChange={handle_change}  />

                    <Typography variant='h5' sx={{ marginBottom: "0.5rem" }}>{t("DESCRIPTION")}</Typography>
                    <TextField multiline required sx={{
                        backgroundColor: "#fff",
                        marginBottom: "1rem"
                    }} label={t("English description...")} variant="outlined" fullWidth id='description_en' value={info.description_en} onChange={handle_change} />

                    <TextField multiline required sx={{
                        backgroundColor: "#fff",
                        marginBottom: "1rem"
                    }} label={t("Thai description...")} variant="outlined" fullWidth id='description_th' value={info.description_th} onChange={handle_change} />

                    <Typography variant='h5' sx={{ marginBottom: "0.5rem" }}>{t("IMAGES")}</Typography>
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
                                                    src={((typeof file) === 'object') ? URL.createObjectURL(file) : file}
                                                    sx={{
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </CardContent>
                                            <CardContent>
                                                <Typography noWrap variant='subtitle1'>{((typeof file) === 'object') ? file.name : file}</Typography>
                                            </CardContent>

                                        </Card>

                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                    <Box sx={{
                        marginTop: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <label htmlFor="contained-button-file">
                            <Input onChange={handlerFile} aria-hidden accept=".png, .jpg, .jpeg" id="contained-button-file" type="file" />
                            <Button variant="contained" sx={{ backgroundColor: "#1565c0" }} component="span">
                                {t("Upload")}
                            </Button>
                        </label>
                    </Box>


                    <Button onClick={handle_edit_news} color='success' variant="contained" fullWidth type='submit'
                        sx={{
                            marginTop: "2rem",
                            height: "3rem"
                        }}>
                        {t("Save")}
                    </Button>

                    <Button onClick={(e)=> {e.preventDefault(); window.location.href = '/NEWS'}} color='error' variant="contained" fullWidth type='submit'
                        sx={{
                            marginTop: "2rem",
                            height: "3rem"
                        }}>
                        {t("Cancel")}
                    </Button>
                </form>
            </Card>
        </Container>

    )
}

export default Edit_NEWS