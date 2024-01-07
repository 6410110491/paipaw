import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from "@mui/system";
import Divider from '@mui/material/Divider';
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie'
import ax from '../axios_api/ax';

function Card_in_progress(props) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const [color, setColor] = useState('red');
    const [status, setStatus] = useState('cancel');
    const [openImage, setOpenImage] = useState(false);
    const [btnconfirm, setBtnconfirm] = useState(false);
    const [btncancel, setBtncancel] = useState(false);

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

    useEffect(() => {
        let st = props.detail.status
        setStatus(st)
        if (st == 'In Progress') {
            setColor('#ffae00')
            setBtnconfirm(true)
            setBtncancel(false)
        }
        if (st == 'Complete') {
            setColor('green')
            setBtnconfirm(false)
            setBtncancel(true)
        }
        if (st == 'Cancel') {
            setColor('red')
            setBtnconfirm(false)
            setBtncancel(true)
        }
    }, [props.detail.status])

    const handle_confirm_history = () => {

        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
        }

        let id = props.detail.id
     
        let token = JSON.parse(Cookies.get('accress'))


        ax.post('/api/set_history/', {'booking_id' : id}, {
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
        <React.Fragment>
            <TableRow hover role="checkbox" tabIndex={-1} sx={{
                backgroundColor: "#E7E7E7",
            }} >
                <TableCell align='center'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align='center'>
                    {i18n.language === 'th' ? props.detail.tour.title_th : props.detail.tour.title_en}
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
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Name")} : {i18n.language === 'th' ? props.detail.tour.title_th : props.detail.tour.title_en}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Adult")} : {props.detail.adult}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Child")} : {props.detail.child}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Orderer")} : {props.detail.first_name} {props.detail.last_name}</Typography>
                        <Divider />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Status")} : </Typography>
                            <Typography fontWeight='bold' color={color}>{t(status)}</Typography>
                        </Box>
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
                            <Button onClick={handle_confirm_history} sx={{ backgroundColor: "#1565c0" }} disabled={btnconfirm} variant='contained'>{t("Confirm")}</Button>
                            {/* <Button onClick={on_alert} sx={{ backgroundColor: "red" }} disabled={btncancel} variant='contained'>{t("Cancel")}</Button> */}
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
                                {t("Are you sure to cancel?")}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                {t("Cancel")}
                            </Button>
                            <Button onClick={handleClose}>{t("Yes")}</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={openImage}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth
                    >
                        <DialogContent>
                            <Box sx={{
                                objectFit: 'cover',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img width="80%" src={props.detail.bill} />
                            </Box>
                        </DialogContent>
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

export default Card_in_progress