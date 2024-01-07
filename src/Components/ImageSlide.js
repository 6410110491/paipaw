import React, { useEffect, useState } from 'react'

function ImageSlide({img_data}) {

    useEffect(()=>{
        let len = img_data.length
        let i = 0
        setInterval(()=>{
            if(i >= len){
                i = 0
            }
            document.getElementById("banner").style.left = (-1) * (i * 100) + "%"
            i += 1
        },5000)

    },[])
    

  return (
    <div id='banner' className='banner'>
        {img_data.map((data , i) => <img src={data.img} className="img_banner" key={i} />)}
    </div>
  )
}

export default ImageSlide