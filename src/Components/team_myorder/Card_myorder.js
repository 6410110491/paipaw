import { Button, Checkbox, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from "@mui/system";
import Divider from '@mui/material/Divider';
import { useTranslation } from "react-i18next";
import ax from "../axios_api/ax";
import Cookies from 'js-cookie'

function Card_myorder(props) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const [openImage, setOpenImage] = useState(false);
    const [IsCheck, SetIsCheck] = useState(false)

    const { t, i18n } = useTranslation()

    const on_alert = () => {
        setAlert(true)
    }

    const open_image = () => {
        setOpenImage(true)
    }

    const handleClose = () => {
        setAlert(false)
        setOpenImage(false)
    }


    const change_page = (page) => {
        window.location.href = '/' + page + '/' + '?id=' + props.detail.id
      }

    const handle_delete = () =>{

        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
          }
      
          let token = JSON.parse(Cookies.get('accress'))
      
      
          ax.post(`/api/delete_booking/` , {'booking_id' : props.detail.id} ,  {
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

    // const handle_check = (e) => {

    //     let data = JSON.parse(window.localStorage.getItem('check'))

    //     if (data[props.index]) {

    //         data[props.index] = { 'check': !IsCheck }

    //     }
    //     window.localStorage.setItem('check', JSON.stringify(data))
    //     SetIsCheck(!IsCheck)
    // }

    // useEffect(() => {

    //     setTimeout(() => {
    //         let data = JSON.parse(window.localStorage.getItem('check'))

    //         if (data[props.index] && data) {
    //             SetIsCheck(data[props.index].check)
    //         }
    //     }, 100)



    // }, [window.localStorage.getItem('check')])


    return (
        <React.Fragment>
            <TableRow hover role="checkbox" tabIndex={-1} sx={{
                backgroundColor: "#E7E7E7",
            }} >
                {/* <TableCell align='center'>
                    <Checkbox checked={IsCheck} onChange={handle_check} />
                </TableCell> */}
                <TableCell align='center' >
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align='center'>
                    {i18n.language === "th" ? props.detail.tour.title_th : props.detail.tour.title_en}
                </TableCell>
                <TableCell align='center'>
                    {props.detail.price}฿
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit sx={{
                        padding: "0.5rem",
                    }}>
                        <Box sx={{ margin: 1 }}>
                            <Typography sx={{
                                fontWeight: 'bold'
                            }} variant="h5">{t("DETAIL")}</Typography>
                        </Box>
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Name")} : {i18n.language === "th" ? props.detail.tour.title_th : props.detail.tour.title_en}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Adult")} : {props.detail.adult}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Child")} : {props.detail.child}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1, color: "#ffae00", fontWeight: 'bold' }} variant='h6'>{t("Price")} : {props.detail.price}฿</Typography>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gridGap: '2rem',
                            padding: '2rem 0 2rem 0'

                        }}>
                            <Button onClick={()=> change_page('payment')}  sx={{ backgroundColor: '#1565c0' }} variant='contained'>{t("Payment")}</Button>
                            <Button onClick={on_alert} sx={{ backgroundColor: "red" }} variant='contained'>{t("Delete")}</Button>
                        </Box>
                    </Collapse>
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

                    <Dialog
                        open={openImage}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth
                    >
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                {t("OK")}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default Card_myorder