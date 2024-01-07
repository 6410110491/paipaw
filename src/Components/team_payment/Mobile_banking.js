import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import { padding } from '@mui/system'
import React from 'react'
import { useTranslation } from 'react-i18next'
import KTB from '../../Images/KTB.jpg'
import SCB from '../../Images/SCB.jpg'

function Mobile_banking() {

  const { t, i18n } = useTranslation()

  return (
    <Box sx={{
      marginTop : '1rem'
    }}>
          <Grid container spacing={2} columns={12} justifyContent="center">
            <Grid item>
              <Card>
                <CardMedia
                  component="img"
                  height='100'
                  image={KTB}
                  alt="green iguana"
                  sx={{
                    objectFit : 'cover',
                    width : 300
                  }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight='bold'>
                    {t("KRUNGTHAI BANK")}
                  </Typography>
                  <Typography variant="h6">
                    บ.paipaw.จำกัด มหาชน
                  </Typography>
                  <Typography variant="h6">
                    814-032451-7
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
            <Card>
              <CardMedia
                component="img"
                image={SCB}
                height='100'
                alt="green iguana"
                sx={{
                  objectFit : 'cover',
                  width : 300
                }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight='bold'>
                  {t("The Siam Commercial Bank")}
                </Typography>
                <Typography variant="h6">
                  บ.paipaw.จำกัด มหาชน
                </Typography>
                <Typography variant="h6">
                  609-256212-3
                </Typography>
              </CardContent>
              </Card>
            </Grid>
          </Grid>
    </Box >
  )
}

export default Mobile_banking