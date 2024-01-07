import React, { useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, CardActionArea, Dialog, IconButton, Slide } from '@mui/material';
import './image_slide.css'
import Video_player from './Video_player'
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Image_and_clip_slide({ img_data }) {

    const [current_img, setCurrentImg] = useState(0)

    const change_img = (n) => {

        if ((current_img + n) <= (img_data.length - 1) && (current_img + n) >= 0) {

            setCurrentImg(current_img + n)
        }
    }

    useEffect(() => {
        document.getElementById('banner_2').style.left = current_img * (-100) + "%"
    }, [current_img])

    const [open, setOpen] = useState(false);
    const [img_show, setImgShow] = useState();

    const handleClickOpen = (img) => {
        setImgShow(img)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent : 'center',
            position : 'relative'
        }}>
            <IconButton color='inherit' sx={{
                position : 'absolute',
                zIndex : 1,
                left : 10,
            }} onClick={() => change_img(-1)}>
                <ArrowBackIosNewIcon sx={{
                    backgroundColor : '#fff',
                    padding : '0.5rem',
                    borderRadius : '100%',
                    fontSize : '2.5rem'
                }} />
            </IconButton>

            <IconButton color='inherit' sx={{
                position : 'absolute',
                zIndex : 1,
                right : 10,
            }} onClick={() => change_img(1)}>
                <ArrowForwardIosIcon sx={{
                    backgroundColor : '#fff',
                    padding : '0.5rem',
                    borderRadius : '100%',
                    fontSize : '2.5rem'
                }} />
            </IconButton>


            <Box sx={{
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                height: '20rem'
            }}>
                <div id='banner_2' className='banner_2'>
                    {img_data ? img_data.map((data, i) => data.video != undefined ? <Video_player data_link={data.video} key={i} /> : <CardActionArea onClick={() => handleClickOpen(data.link)} className="img_banner_2" key={i}><img src={data.link} /></CardActionArea>) : ""}
                </div>
            </Box>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <Box sx={{
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{
                    position : 'relative',
                    width : '100%',
                    height : '100%'
                }}>
                    <img className='img_show' src={img_show} />
                </Box>
            </Dialog>

        </Box>

    )
}

export default Image_and_clip_slide