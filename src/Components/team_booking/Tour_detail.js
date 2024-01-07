import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Detail_Card_Tour from '../team_card/Detail_Card_Tour'
import Image_and_clip_slide from './Image_and_clip_slide'
import { useTranslation } from 'react-i18next';
import Comment_box from '../team_comment/Comment_box';
import queryString from 'query-string'
import Video_player from './Video_player';
import ax from '../axios_api/ax';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function Tour_detail() {

    const { t, i18n } = useTranslation()
    const [data, Setdata] = useState([{}])
    const [load, setLoad] = useState(true)
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [start_time, setStartTime] = useState("")
    const [end_time, setEndTime] = useState("")

    useEffect(() => {
        ax.get(`/api/tours/${queryString.parse(window.location.search).id}`).then(res => {
            Setdata(res.data)

            let time_start = new Date(res.data.start)
            let time_end = new Date(res.data.end)

            setStart(time_start.toLocaleDateString())
            setStartTime(time_start.getHours().toString().padStart(2, "0") + ":" + time_start.getMinutes().toString().padStart(2, "0"))
            setEnd(time_end.toLocaleDateString())
            setEndTime(time_end.getHours().toString().padStart(2, "0") + ":" + time_end.getMinutes().toString().padStart(2, "0"))
            setLoad(false)
        })


    }, [])


    useEffect(() => {
        let lang = window.localStorage.getItem('lang')

        if (lang) {
            i18n.changeLanguage(lang)
        }

    }, [])

    if (load) return <Typography variant='h5'>Loading...</Typography>
    return (
        <Container maxWidth='md' sx={{
            marginTop: '7rem',
            marginBottom: '2rem'
        }}>

            <Detail_Card_Tour detail_card={data} />

            <Card sx={{
                marginTop: '2rem',
                boxShadow: 3
            }}>
                <CardContent>
                    <Image_and_clip_slide img_data={data.img_and_video} />
                </CardContent>
            </Card>
            <Card sx={{
                marginTop: '2rem',
                boxShadow: 3
            }}>
                <CardContent>
                    <Video_player data_link={data.video} />
                </CardContent>
            </Card>
            <Card sx={{
                marginTop: '2rem',
                boxShadow: 3
            }}>
                <CardContent>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}>
                        <Box sx={{
                            display : 'flex',
                            flexDirection : 'column',
                            alignItems : 'center',
                            justifyContent : 'center'
                        }}>
                            <Typography fontWeight='bold' variant='subtitle1'>{t('Start')}</Typography>
                            <Typography fontWeight='bold' variant='subtitle1'>{start}</Typography>
                            <Typography fontWeight='bold' variant='subtitle1'>{start_time}</Typography>
                        </Box>

                        <ArrowRightAltIcon sx={{
                            fontSize : '3rem'
                        }} />
                        <Box sx={{
                            display : 'flex',
                            flexDirection : 'column',
                            alignItems : 'center',
                            justifyContent : 'center'
                        }}>
                            <Typography fontWeight='bold' variant='subtitle1'>{t('End')}</Typography>
                            <Typography fontWeight='bold' variant='subtitle1'>{end}</Typography>
                            <Typography fontWeight='bold' variant='subtitle1'>{end_time}</Typography>
                        </Box>
                    </Box>

                </CardContent>

            </Card>
            <Card sx={{
                marginTop: '2rem',
                boxShadow: 3
            }}>
                <CardContent>
                    <Typography variant='subtitle1'>
                        {i18n.language == 'th' ? data.description_th : data.description_en}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{
                marginTop: '2rem',
                boxShadow: 3
            }}>
                <CardContent>
                    <Typography variant='h3'>{t("Reviews")}</Typography>
                    <Box sx={{
                        width: '100%',
                        height: '0.2rem',
                        backgroundColor: '#ffae00',
                        marginTop: "1rem",
                    }}></Box>
                </CardContent>
                <CardContent>
                    <Comment_box comment_all={data.comments} />
                </CardContent>
            </Card>

        </Container>
    )
}

export default Tour_detail