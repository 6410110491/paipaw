import { Box, Button, Card, CardContent, Container, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Mobile_banking from './Mobile_banking';
import Order_summary from './Order_summary';
import Slip_page from './Slip_page';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import queryString from 'query-string'
import { useTranslation } from 'react-i18next';
import './anim.css'
import ax from '../axios_api/ax';
import Cookies from 'js-cookie'

function Payment() {

    const { t, i18n } = useTranslation()

    const steps = [
        t('Mobile Banking'),
        t('Order Summary'),
        t('Bill'),
    ];
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [paymentstep, setPaymentstep] = useState([])
    const [load, setLoad] = useState(true)
    const [slip, setSlip] = useState()

    const [isUpload, setIsUpload] = useState(false)

    const set_upload = (i, img) => {

        setSlip(img)
        setIsUpload(i)

    }

    useEffect(() => {

        if (Cookies.get('user') == undefined) {
            window.location.href = "/login"
        }

        let id = queryString.parse(window.location.search).id

        let token = JSON.parse(Cookies.get('accress'))


        ax.get(`/api/booking_tour/?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token.accress}`
            }
        }).then(res => {

            if (res.data.length === 0) {
                window.location.href = "/"
            }


            setPaymentstep([<Mobile_banking />, <Order_summary detail_card={res.data} />, <Slip_page set_upload={set_upload} />])
            setLoad(false)
        })

    }, [])



    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {

        if (!(activeStep === steps.length - 1)) {

            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        } else {

            if (isUpload) {


                let id = queryString.parse(window.location.search).id

                let token = JSON.parse(Cookies.get('accress'))

                let img = new FormData()

                img.append('slip', slip)
                img.append('booking_id', id)


                ax({
                    url: `/api/pay_booking/`,
                    method: 'POST',
                    data: img,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token.accress}`
                    }
                }).then(res => {

                    let newSkipped = skipped;
                    if (isStepSkipped(activeStep)) {
                        newSkipped = new Set(newSkipped.values());
                        newSkipped.delete(activeStep);
                    }

                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    setSkipped(newSkipped);

                }).catch(err => {

                    Cookies.remove('user')
                    Cookies.remove('accress')


                    ax.get('/auth/signout/').then(res => {

                        window.location.href = '/login'
                    })

                })



            } else {

                alert(t('Please complete the information.'))
            }
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const changepage = (lang) => {
        window.location.href = "/" + lang
    }

    if (load) return <Typography variant='subtitle1'>Loading...</Typography>



    return (
        <Container maxWidth='md' sx={{
            marginTop: "7rem",
            marginBottom: '3rem'
        }}>
            <Card>
                <CardContent>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel  {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: "3rem",
                                    flexDirection: "column",
                                    height: '30rem'
                                }}>
                                <CheckCircleIcon sx={{
                                    fontSize: 150,
                                    margin: "0 auto",
                                    color: "green"
                                }} className="anim" />
                                <Typography variant='h6' fontWeight='bold'>
                                    {t("Thank you for your visiting.")}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={() => changepage("")} sx={{ pl: 4 }}>{t("Back to Home")}</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1rem',
                                height: '30rem'
                            }}>
                                {paymentstep[activeStep]}
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    {t("Back")}
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? t('Finish') : t('Next')}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </CardContent>
            </Card>
        </Container>
    )
}

export default Payment