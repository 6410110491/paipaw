import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import './home.css'
import banner_1 from '../Images/banner.jpg'
import banner_2 from '../Images/banner_2.jpg'
import ImageSlide from './ImageSlide'
import { useTranslation } from 'react-i18next'
import Top_tour from './team_top/Top_tour'
import Top_food from './team_top/Top_food'

import Image_home_slide from './api_demo/Image_home_slide'


function Home() {

    const { t, i18n } = useTranslation()

    useEffect(()=>{
        let lang = window.localStorage.getItem('lang')

        if(lang){
            i18n.changeLanguage(lang)
        }
        
    },[])


    return (
        <div className='Container'>
            <div className='img_slide'>
                <ImageSlide img_data={Image_home_slide.data} />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gridGap: '1rem'
                }}>
                    <Box sx={{
                        display: 'flex',
                        gridGap: '0.5rem',
                        height: "3rem",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <p className='p_yellow title_letter'>P</p>
                        <p className='title_letter'>A</p>
                        <p className='title_letter'>I</p>
                        <p className='p_yellow title_letter'>P</p>
                        <p className='title_letter'>A</p>
                        <p className='title_letter'>W</p>
                    </Box>
                    <Box className='under' sx={{
                        width: "100%",
                        height: "0.1rem",
                        backgroundColor: "#fff"
                    }}></Box>
                    <Box  sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: "#fff",
                        gridGap: '1rem',
                        width : '100%'
                    }}>
                        <p className='under_text'>{t("Travel")}</p>
                        <Box sx={{
                            width: "0.22rem",
                            height: "2rem",
                            backgroundColor: "#ffae00"
                        }}></Box>
                        <p className='under_text'>{t("Food")}</p>
                        <Box sx={{
                            width: "0.2rem",
                            height: "2rem",
                            backgroundColor: "#ffae00"
                        }}></Box>
                        <p className='under_text'>{t("Shop")}</p>
                    </Box>

                </Box>
            </div>
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent : 'center'
            }} maxWidth='md'>
                <Card sx={{boxShadow : 0 , marginTop : '3rem' , marginBottom: '1rem' , width : "100%" , padding : '0.1rem'}}>
                    <CardContent>
                        <Typography variant='h3'>{t("TOP TOURS")}</Typography>
                        <Box sx={{
                            width: '100%',
                            height: '0.2rem',
                            backgroundColor: '#ffae00',
                            marginTop: "1rem",
                        }}></Box>
                    </CardContent>
                    <CardContent>
                        <Top_tour />
                    </CardContent>
                </Card>

                {/* <Card sx={{boxShadow : 7 , marginTop : '3rem' , marginBottom: '1rem' , width : "100%"}}>
                    <CardContent>
                        <Typography variant='h3'>{t("TOP FOODS")}</Typography>
                        <Box sx={{
                            width: '100%',
                            height: '0.2rem',
                            backgroundColor: '#ffae00',
                            marginTop: "1rem",
                        }}></Box>
                    </CardContent>
                    <CardContent>
                        <Top_food />
                    </CardContent>
                </Card> */}

            </Container>
        </div>
    )
}

export default Home