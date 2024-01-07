import { Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Paper } from '@mui/material'

function Order_summary({detail_card}) {

  const { t, i18n } = useTranslation()

  return (
    <TableContainer sx={{ maxWidth: 500, margin: "0 auto" }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>
              <Typography variant='subtitle1'>{t("Tour name")}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant='subtitle1'>{i18n.language === "th" ? detail_card['0'].tour.title_th : detail_card['0'].tour.title_en}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableHead>
          <TableRow>
            <TableCell align='center'>
              <Typography variant='subtitle1'>{t("Adult")}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant='subtitle1'>{detail_card['0'].adult} X {detail_card['0'].tour.adult_price} ฿</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableHead>
          <TableRow>
            <TableCell align='center'>
              <Typography variant='subtitle1'>{t("Child")}</Typography>
            </TableCell>
            <TableCell align='center'>
            <Typography variant='subtitle1'>{detail_card['0'].child} X {detail_card['0'].tour.child_price} ฿</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableHead>
          <TableRow>
            <TableCell align='center'>
              <Typography variant='subtitle1'>{t("Orderer")}</Typography>
            </TableCell>
            <TableCell align='center'>
            <Typography variant='subtitle1'>{detail_card['0'].first_name} {detail_card['0'].last_name}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableHead>
          <TableRow>
            <TableCell align='center'>
              <Typography variant='subtitle1' fontWeight='bold'>{t("Total")}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant='subtitle1' fontWeight='bold'>{detail_card['0'].price} ฿</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

      </Table>
    </TableContainer>
  )
}

export default Order_summary