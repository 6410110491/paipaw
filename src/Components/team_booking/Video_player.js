import React, { useEffect, useState } from 'react'
import './image_slide.css'
import getYoutubeID from 'get-youtube-id'

function Video_player({data_link}) {

    return (
        <iframe className='video_player'
            src={"https://www.youtube.com/embed/" + getYoutubeID(data_link)}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen>

        </iframe>
    )
}

export default Video_player