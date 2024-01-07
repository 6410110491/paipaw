import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie'
import ax from '../axios_api/ax';


function Card_NEWS({ detail_card }) {

  const { t, i18n } = useTranslation()
  const [user, setUser] = useState(Cookies.get('user') != undefined ? JSON.parse(Cookies.get('user')) : undefined)
  const [alert, setAlert] = useState(false)

  const delete_news = () => {
    setAlert(true)

  }

  const handleClose = () => {
    setAlert(false)
  }

  const handle_delete = () => {
    ax.delete(`api/NEWS/${detail_card.id}/`).then(res => {
      window.location.reload()
    })
  }

  return (
    <Card sx={{ maxWidth: 700, marginTop: "3rem" }}>
      <Box sx={{
        position: 'relative'
      }}>
        <CardMedia
          component="img"
          height="200"
          image={detail_card.img}
          alt="green iguana"
        />
        <IconButton onClick={() => window.location.href = `/edit_news/?id=${detail_card.id}`} sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          color: "#000",
          display: user ? user.superuser ? "block" : "none" : "none"


        }}>
          <EditIcon sx={{
            backgroundColor: '#fff',
            padding: '0.5rem',
            borderRadius: '100%',
            fontSize: '2.5rem',
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
          }} />
        </IconButton>

        <IconButton onClick={delete_news} sx={{
          position: 'absolute',
          top: 80,
          right: 20,
          color: "red",
          display: user ? user.superuser ? "block" : "none" : "none"


        }}>
          <DeleteForeverIcon sx={{
            backgroundColor: '#fff',
            padding: '0.5rem',
            borderRadius: '100%',
            fontSize: '2.5rem',
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
          }} />
        </IconButton>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          {i18n.language === 'th' ? detail_card.title_th : detail_card.title_en}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {i18n.language === 'th' ? detail_card.description_th : detail_card.description_en}
        </Typography>
      </CardContent>

      <Dialog
        open={alert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle sx={{
          fontWeight: 'bold',
          color: 'red'
        }} id="draggable-dialog-title">
          {t("Warning")}
        </DialogTitle>
        <DialogContent>
          <Divider />
        </DialogContent>

        <DialogContent>
          <DialogContentText>
            {t("Are you sure to delete?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {t("No")}
          </Button>
          <Button onClick={handle_delete}>{t("Yes")}</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default Card_NEWS