import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ax from '../axios_api/ax';
import Card_customer_order_complete from './Card_customer_order_complete';
import Cookies from 'js-cookie'

function Customer_tour_complete({ detail_data }) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { t, i18n } = useTranslation()
    const [data , setData] = useState({})
    const [load , setLoad] = useState(true)

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

    useEffect(() => {

        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
        }

        let token = JSON.parse(Cookies.get('accress'))


        ax.get(`/api/booking_tour/?status=Complete&tour=${detail_data.id}`, {
            headers: {
                'Authorization': `Bearer ${token.accress}`
            }
        }).then(res => {

            setData(res.data)
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

    if(load) return <Typography variant='subtitle1'>Loading...</Typography>


    return (

        <Box sx={{ mt: '3rem' }}>
            <Typography variant='h5'>{i18n.language === 'th' ? detail_data.title_th : detail_data.title_en}</Typography>
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
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => {
                                    return (
                                        <Card_customer_order_complete key={i} detail={row} />
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    width={100}
                />
            </Paper>


        </Box>
    )
}

export default Customer_tour_complete