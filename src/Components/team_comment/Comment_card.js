import { Avatar, Box, Card, CardContent, IconButton, Rating, Typography } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ax from '../axios_api/ax';
import Cookies from 'js-cookie'

function Comment_card({ comment }) {
    const [value, setValue] = useState(comment.vote);
    const [user, setUser] = useState(Cookies.get('user') != undefined ? JSON.parse(Cookies.get('user')) : undefined)
    const [liked, setLiked] = useState(false)
    const [disliked, setDisLiked] = useState(false)

    const [like, setLike] = useState(comment.like.length)
    const [dislike, setDisLike] = useState(comment.dislike.length)

    useEffect(() => {

        if (user) {
            for (let i = 0; i < comment.like.length; i++) {

                if (comment.like[i] === user.id) {
                    setLiked(true)
                    break
                }

            }

            for (let i = 0; i < comment.dislike.length; i++) {

                if (comment.dislike[i] === user.id) {
                    setDisLiked(true)
                    break
                }

            }
        }

    }, [])


    const handle_like = () => {

        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
        }

        let data = {
            "user_id": user.id,
            "comment_id": comment.id,
        }

        let token = JSON.parse(Cookies.get('accress'))

        ax.post('/api/tour/like_comment/', data, {
            headers: {
                'Authorization': `Bearer ${token.accress}`
            }
        }).then(res => {

            setLiked(!liked)
            setLike(liked ? like - 1 : like + 1)


        }).catch(err => {

            Cookies.remove('user')
            Cookies.remove('accress')


            ax.get('/auth/signout/').then(res => {

                window.location.href = '/login'
            })

        })
    }

    const handle_dislike = () => {

        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
        }

        let data = {
            "user_id": user.id,
            "comment_id": comment.id,
        }

        let token = JSON.parse(Cookies.get('accress'))

        ax.post('/api/tour/dislike_comment/', data, {
            headers: {
                'Authorization': `Bearer ${token.accress}`
            }
        }).then(res => {

            setDisLiked(!disliked)
            setDisLike(disliked ? dislike - 1 : dislike + 1)

        }).catch(err => {

            Cookies.remove('user')
            Cookies.remove('accress')


            ax.get('/auth/signout/').then(res => {

                window.location.href = '/login'
            })

        })
    }
    return (
        <Card sx={{
            marginTop: '1rem',
        }}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    gridGap: '1rem',
                    alignItems: 'center'
                }}>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{comment.user.first_name[0]}</Avatar>
                    <Box>
                        <Typography variant='subtitle1' sx={{
                            marginLeft: '0.2rem'
                        }}>{comment.user.first_name} {comment.user.last_name}</Typography>
                        <Rating
                            readOnly
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </Box>
                </Box>
            </CardContent>
            <CardContent>
                <Typography variant='subtitle1'>
                    {comment.description}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gridGap: '0.5rem',
                    marginTop: '1rem'
                }}>
                    <IconButton onClick={handle_like}>
                        {liked ? <ThumbUpIcon sx={{
                            color: "#ffae00"
                        }} /> : <ThumbUpIcon />}

                    </IconButton>

                    <Typography variant='subtitle2'>{like}</Typography>
                    <IconButton onClick={handle_dislike}>
                        {disliked ? <ThumbDownIcon sx={{
                            color: "#ffae00"
                        }} /> : <ThumbDownIcon />}

                    </IconButton>

                    <Typography variant='subtitle2'>{dislike}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Comment_card