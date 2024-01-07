import { Box, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Card_in_progress from './Card_in_progress';
import ax from '../axios_api/ax'
import Cookies from 'js-cookie'

function In_progress_order() {
    const { t, i18n } = useTranslation()

    const [user, setUser] = useState(Cookies.get('user') != undefined ? JSON.parse(Cookies.get('user')) : undefined)

    const columns = [
        {
            id: 'name',
            label: t('Name'),
            minWidth: 50,
            align: 'center',
        },
        {
            id: 'price',
            label: t('Price'),
            minWidth: 50,
            align: 'center',
            format: (value) => value.toFixed(2),
        }

    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [load , setLoad] = useState(true)
    const [booking_data , setBookingData] = useState([])


    useEffect(() => {
        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
        }

        let token = JSON.parse(Cookies.get('accress'))


        ax.get(`/api/booking_tour/?user=${user.id}&pay=true&history=false`, {
            headers: {
                'Authorization': `Bearer ${token.accress}`
            }
        }).then(res => {

            setBookingData(res.data)
            setLoad(false)

        }).catch(err => {

            Cookies.remove('user')
            Cookies.remove('accress')


            ax.get('/auth/signout/').then(res => {

                window.location.href = '/login'
            })

        })
    }, [])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (load) return <Typography variant='subtitle1'>Loading...</Typography>

    return (
        <Container maxWidth='lg' sx={{ marginTop: "7rem", marginBottom: '3rem' }}>
            <Typography variant='h4'>{t("TOURS ORDER")}</Typography>
            <Box sx={{
                width: '100%',
                height: '0.2rem',
                backgroundColor: '#ffae00',
                marginTop: "1rem"
            }}></Box>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '2rem' }}>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' sx={{
                                    fontWeight: 'bold'
                                }}>{t("Detail")}</TableCell>
                                {columns.map((column, i) => (
                                    <TableCell
                                        key={i}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        sx={{
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {booking_data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => {
                                    return (
                                        <Card_in_progress key={i} detail={row} />
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={booking_data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    width={100}
                />
            </Paper>
        </Container>
    )
}

export default In_progress_order