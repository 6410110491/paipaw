import { Button, CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from "@mui/system";
import Divider from '@mui/material/Divider';
import { useTranslation } from "react-i18next";
import ax from '../axios_api/ax'
import Cookies from 'js-cookie'

function Card_customer_order_complete(props) {

    const [open, setOpen] = useState(false);
    const [openImage, setOpenImage] = useState(false);

    const { t, i18n } = useTranslation()


    const open_image = () => {
        setOpenImage(true)
    }

    const handleClose = () => {
        setOpenImage(false)
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
                    {props.detail.price}
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
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Email")} : <a target="_blank" href={"https://mail.google.com/mail/?view=cm&fs=1&to=" + props.detail.user.username}>{props.detail.user.username}</a></Typography>
                        <Divider />
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Note")} : {props.detail.note}</Typography>
                        <Divider />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Bill")} : </Typography>
                            <Typography onClick={props.detail.slip !== null ? open_image : () => { }} fontWeight='bold' sx={props.detail.slip !== null ? { cursor: 'pointer' } : { cursor: 'default' }} color={props.detail.bill !== "" ? "#1565c0" : "#000"}>{props.detail.bill !== "" ? t("Click") : t("None")}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Status")} : </Typography>
                            <Typography fontWeight='bold' color={props.detail.slip !== null ? "green" : "red"}>{props.detail.slip !== null ? t("Paid") : t("Not Paid")}</Typography>
                        </Box>
                        <Divider />
                        <Typography sx={{ margin: 1, color: "#ffae00", fontWeight: 'bold' }} variant='h6'>{t("Price")} : {props.detail.price}</Typography>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gridGap: '2rem',
                            padding: '2rem 0 2rem 0'

                        }}>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

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
                        <img width="80%" src={props.detail.slip} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        {t("OK")}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default Card_customer_order_complete