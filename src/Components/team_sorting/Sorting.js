import { Box, Card, CardContent, Divider, IconButton, Rating, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';

function Sorting({ min, max, sort, star }) {
    const { t, i18n } = useTranslation()
    const currencies = [
        {
            value: 'Hight Price - Low Price',
            label: t('Hight Price - Low Price'),
        },
        {
            value: 'Low Price - Hight Price',
            label: t('Low Price - Hight Price'),
        },
    ];
    const [currency, setCurrency] = useState('Hight Price - Low Price');
    const handleChange = (event) => {

        if (event.target.value === "Hight Price - Low Price") {
            sort('max_to_min')
        } else {
            sort('min_to_max')
        }
        setCurrency(event.target.value);
    };

    useEffect(() => {
        let lang = window.localStorage.getItem('lang')

        if (lang) {
            i18n.changeLanguage(lang)
        }

    }, [])

    const theme = useTheme()


    const [minn, setMinn] = useState(0)
    const [maxx, setMaxx] = useState(0)



    const handle_set = () => {

        min(minn)
        max(maxx)
    }

    const [value, setValue] = useState(0)

    const handle_star = () => {

        star(value)
    }

    return (


        < Card sx={{ maxWidth: '23rem', marginTop: "2rem", }
        }>
            <CardContent sx={{ display: "flex", alignItems: "center", marginTop: "1rem", justifyContent: "space-between" }}>
                <Typography noWrap variant='subtitle1' >{t("Sort by")}</Typography>
                <TextField
                    id="outlined-select-currency"
                    select
                    label={t("Select")}
                    value={currency}
                    onChange={handleChange}
                    sx={{ width: "12rem" }}
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </CardContent>

            <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
                <Divider sx={{
                    width: '90%',
                    height: '0.1rem',
                    backgroundColor: '#ffae00',
                }} />
            </Box>

            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between', gridGap: "1rem" }}>
                    <Typography variant='subtitle1' >{t("Rating")}</Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue != null ? newValue : 0);
                        }}
                    />
                    <IconButton onClick={handle_star}
                        size="large"
                        edge="start"
                        aria-label="menu"
                        color='inherit'
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </CardContent>

            <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
                <Divider sx={{
                    width: '90%',
                    height: '0.1rem',
                    backgroundColor: '#ffae00',
                }} />
            </Box>

            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", gridGap: "1rem" }}>
                    <Typography variant='subtitle1' >{t("Price")}</Typography>

                    <TextField type="number"
                        InputProps={{
                            inputProps: {
                                min: 0
                            }
                        }}
                        sx={{
                            backgroundColor: "#fff",
                        }} label={t("Min")} variant="outlined" fullWidth value={minn} onChange={(e) => setMinn(e.target.value)} />
                    <Typography variant='h5'>-</Typography>
                    <TextField type="number"
                        sx={{
                            backgroundColor: "#fff",
                        }} label={t("Max")} variant="outlined" fullWidth value={maxx} onChange={(e) => setMaxx(e.target.value)} />

                    <IconButton onClick={handle_set}
                        size="large"
                        edge="start"
                        aria-label="menu"
                        color='inherit'
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card >
    )
}

export default Sorting