import { Collapse, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from "@mui/system";
import Divider from '@mui/material/Divider';
import { useTranslation } from "react-i18next";

function Card_History(props) {

    const [open, setOpen] = useState(false);
    const { t, i18n } = useTranslation()
    const [color, setColor] = useState('red');

    useEffect(() => {
        let st = props.history.status

        if (st == 'In Progress') {
            setColor('#ffae00')
        }
        if (st == 'Complete') {
            setColor('green')
        }
        if (st == 'Cancel') {
            setColor('red')
        }
    }, [props.history.status])

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
                    {i18n.language === 'th' ? props.history.tour.title_th : props.history.tour.title_en}
                </TableCell>
                <TableCell align='center'>
                    {props.history.price}฿
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
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Name")} : {i18n.language === 'th' ? props.history.tour.title_th : props.history.tour.title_en}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Adult")} : {props.history.adult}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Child")} : {props.history.child}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Orderer")} : {props.history.user.first_name} {props.history.user.last_name}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("Start")} : {props.history.tour.start}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1 }} variant='subtitle1'>{t("End")} : {props.history.tour.end}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1 }} color={color} fontWeight='bold' variant='subtitle1'>{t("Status")} : {props.history.status}</Typography>
                        <Divider />
                        <Typography sx={{ margin: 1, color: "#ffae00", fontWeight: 'bold' }} variant='h6'>{t("Price")} : {props.history.price}฿</Typography>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Card_History