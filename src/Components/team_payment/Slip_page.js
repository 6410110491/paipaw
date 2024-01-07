import { LocalizationProvider, TimePicker } from '@mui/lab';
import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, styled, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useTranslation } from 'react-i18next';
import CancelIcon from '@mui/icons-material/Cancel';

function Slip_page({ set_upload }) {
  const { t, i18n } = useTranslation()
  const [files, setFile] = useState([]);
  const [startvalue, setstartValue] = useState(new Date());
  const Input = styled('input')({
    display: 'none',
  });

  const handlerFile = (e) => {

    if (files.length >= 1 || e.target.files.length > 1) {
      alert(t("Max Image is") + " " + 1)
      return false
    }

    let allfiles = []
    for (let i = 0; i < e.target.files.length; i++) {

      if (e.target.files.length === 0) return false;
      const file = e.target.files[i];

      if (e.target.files[i].type === "image/jpeg" || e.target.files[i].type === "image/png") {
        //console.log(e.target.files[i])
        allfiles.push(e.target.files[i]);
      }

    }

    if (allfiles.length > 0) {
      setFile(files.concat(allfiles));
    }
  };

  const delete_img = (index) => {
    let new_data = []
    for (let i = 0; i < files.length; i++) {
      if (i != index) {
        new_data.push(files[i])
      }
    }
    setFile(new_data)


  }

  useEffect(() => {

    if (files.length === 1) {

      set_upload(true , files[0])
    } else {
      set_upload(false , files[0])
    }

  }, [files])

  return (
    <Box>
      <Typography variant='h5' sx={{ marginBottom: "2rem" }}>{t("TIME")}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gridGap: "1rem" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            renderInput={(props) => <TextField {...props} />}
            label={t("Time")}
            value={startvalue}
            onChange={(newValue) => {
              setstartValue(newValue);
            }}
          />
        </LocalizationProvider>
      </Box>

      <Typography variant='h5' sx={{ marginTop: "2rem" }}>{t("IMAGE")}</Typography>
      <Box>
        <Grid container columns={12} spacing={1} justifyContent='center'>
          {files.map((file, key) => {
            return (
              <Grid key={key} item lg={3}>

                <Card sx={{ height: 200, width: 200 }}>
                  <Box sx={{ padding: 0.1 }}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}>

                      <IconButton
                        onClick={() => delete_img(key)}
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ color: 'red' }}>
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <CardContent sx={{ height: '30%' }}>
                    <CardMedia
                      component='img'
                      height="100%"
                      width="100%"
                      src={URL.createObjectURL(file)}
                      sx={{
                        objectFit: 'cover'
                      }}
                    />
                  </CardContent>
                  <CardContent>
                    <Typography noWrap variant='subtitle1'>{file.name}</Typography>
                  </CardContent>

                </Card>

              </Grid>
            )
          })}
        </Grid>
        <Box sx={{
          marginTop: '1rem',
          marginBottom: '1rem'
        }}>
          <label htmlFor="contained-button-file">
            <Input onChange={handlerFile} aria-hidden accept=".png, .jpg, .jpeg" id="contained-button-file" type="file" />
            <Button variant="contained" sx={{ backgroundColor: "#1565c0", marginTop: "2rem" }} component="span">
              {t("Upload")}
            </Button>
          </label>
        </Box>
      </Box>
    </Box>
  )
}

export default Slip_page