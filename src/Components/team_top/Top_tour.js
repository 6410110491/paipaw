import { Box, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Top_Card from '../team_card/Top_Card'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ax from '../axios_api/ax';

function Top_tour() {

    const [current_img, setCurrentImg] = useState(0)
    const [top, setTop] = useState([{}])
    const [load, setLoad] = useState(true)

    useEffect(() => {

        if (!load) {
            document.getElementById('top_slide').style.left = current_img * (-100) + "%"
        }



    }, [current_img])

    useEffect(() => {
        ax.get('/api/top_tour/').then(res => {
            setTop(res.data)
            setLoad(false)
        })
    }, [])

    const change_img = (n) => {

        if ((current_img + n) <= (top.length - 1) && (current_img + n) >= 0) {

            setCurrentImg(current_img + n)
        }
    }

    if (load) return <Typography variant='subtitle1'>Loading...</Typography>

    return (
        <Box sx={{
            width: '100%',
            height: '25rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <IconButton color='inherit' sx={{
                position: 'absolute',
                zIndex: 1,
                top: '50%',
                left: '5%',

            }} onClick={() => change_img(-1)}>
                <ArrowBackIosNewIcon sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '0.5rem',
                    borderRadius: '100%',
                    fontSize: '2.5rem'
                }} />
            </IconButton>

            <IconButton color='inherit' sx={{
                position: 'absolute',
                zIndex: 1,
                top: '50%',
                right: '5%',
            }} onClick={() => change_img(1)}>
                <ArrowForwardIosIcon sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '0.5rem',
                    borderRadius: '100%',
                    fontSize: '2.5rem'
                }} />
            </IconButton>

            <div id="top_slide" style={{
                display: 'flex',
                position: 'absolute',
                width: '100%',
                top: 0,
                left: '0%',
                transition: 'all 0.2s ease-in-out'
            }}>
                {top.map((d, i) =>
                    <Top_Card key={i} top={d} number={i + 1} />

                )}
            </div>
        </Box>
    )
}

export default Top_tour