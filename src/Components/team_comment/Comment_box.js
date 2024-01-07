import { Avatar, Box, Card, IconButton, Rating, TextField, Typography } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import React, { useState } from 'react'
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';
import Comment_card from './Comment_card';
import Cookies from 'js-cookie'
import queryString from 'query-string'
import ax from '../axios_api/ax';

function Comment_box({ comment_all }) {

    const { t, i18n } = useTranslation()
    const [value, setValue] = useState(0);
    const [user, setUser] = useState(Cookies.get('user') != undefined ? JSON.parse(Cookies.get('user')) : undefined)
    const [comment, setComment] = useState("")

    const send_comment = () => {

        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
        }

        let id = queryString.parse(window.location.search).id
        let data = {
            "user_id": user.id,
            "description": comment,
            "vote": value,
            "tour_id": parseInt(id)
        }

        let token = JSON.parse(Cookies.get('accress'))


        ax.post('/api/tour/add_comment/', data, {
            headers: {
                'Authorization': `Bearer ${token.accress}`
            }
        }).then(res => {
            
            window.location.reload()

        }).catch(err => {

            Cookies.remove('user')
            Cookies.remove('accress')


            ax.get('/auth/signout/').then(res => {

                window.location.href = '/login'
            })

        })
    }

    return (
        <Box sx={{
            marginTop: '1rem',
        }}>
            <Card sx={{
                padding: '0.5rem',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem',
                    marginTop: '1rem'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gridGap: '1rem'
                    }}>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>{user ? user.f_name[0] : "U"}</Avatar>
                        <Typography variant='subtitle1'>{user ? user.f_name : "Username"}</Typography>
                    </Box>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </Box>
                <Divider />
                <Box sx={{
                    marginTop: '1rem'
                }}>
                    <TextField fullWidth multiline placeholder={t("Add your comment...")} value={comment} onChange={(e) => setComment(e.target.value)} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginTop: '1rem'
                }}>
                    <IconButton color='inherit' onClick={send_comment}>
                        <SendIcon />
                    </IconButton>
                </Box>

            </Card>
            <Box sx={{
                padding: '1rem',
                marginTop: '1rem',

            }}>
                {comment_all.map((d, i) => <Comment_card comment={d} key={i} />)}
            </Box>
        </Box>
    )
}

export default Comment_box