import { DataArray } from '@mui/icons-material';
import { Box, Checkbox, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Card_myorder from './Card_myorder';

function My_order_tour({ detail_order }) {
    const { t, i18n } = useTranslation()

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
    const [check_all, SetcheckAll] = useState(false)



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // const handle_check_all = (e) => {

    //     let dummy = []

    //     for (let i = 0; i < detail_order.length; i++) {

    //         dummy.push({ 'check': e.target.checked })
    //     }
    //     SetcheckAll(!check_all)

    //     window.localStorage.setItem('check', JSON.stringify(dummy))
    // }

    // useEffect(() => {

    //     setInterval(() => {
    //         let data = JSON.parse(window.localStorage.getItem('check'))
    //         let check_all = []
    //         if (data) {
    //             for (let i = 0; i < data.length; i++) {

    //                 if (data[i].check) {
    //                     check_all.push(true)
    //                 }

    //             }
    //         }

    //         SetcheckAll(check_all.length == detail_order.length)


    //     }, 10)


    // }, [])



    return (
        <Box sx={{ marginTop: "3rem" }}>
            <Typography variant='h3'>{t("Tours")}</Typography>
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
                                {/* <TableCell align='center' padding="checkbox">
                                    <Checkbox checked={check_all} onChange={handle_check_all} />
                                </TableCell> */}
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
                        <TableBody id="table_body_order">
                            {detail_order.length !== 0 ?
                                detail_order.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => {
                                        return (
                                            <Card_myorder key={i} index={i} detail={row} />
                                        )
                                    }) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={detail_order.length}
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

export default My_order_tour