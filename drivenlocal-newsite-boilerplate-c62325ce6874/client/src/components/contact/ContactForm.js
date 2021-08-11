import React, { useState, Fragment, createRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

import { Grid, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

const ContactForm = () => {
    const recaptchaRef = createRef();
    const [sent, setSent] = useState(false);
    const [mess, setMess] = useState('');
    const [error, setError] = useState(false);
    const [warning, setWarn] = useState(false);
    const [errs, setErrs] = useState();
    const [formData, setFormdata] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        message: '',
        date: '',
        time: '',
    });

    const { fullName, phone, email, date, time, message } = formData;

    const onChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const recaptchaValue = recaptchaRef.current.getValue();
        await axios
            .post('api/emails', formData)
            .then((res) => {
                if (!recaptchaValue) {
                    setWarn(true);
                } else if (res.data.msg === 'success') {
                    setError(false);
                    setWarn(false);
                    setSent(true);
                    setMess('The form has been sent successfully!');
                    setFormdata({
                        fullName: '',
                        phone: '',
                        email: '',
                        date: '',
                        time: '',
                        message: '',
                    });
                    recaptchaValue.current.reset();
                } else if (res.data.msg === 'fail') {
                    setError(true);
                    setSent(false);
                    alert('Something went wrong, try again');
                }
            })
            .catch((err) => {
                const errors = err.response.data.errors;
                setError(true);
                if (errors) {
                    setErrs(errors);
                }
            });
    };

    return (
        <form
            onSubmit={(e) => onSubmit(e)}
            noValidate
            id='fm-contact-form'
            className='fm-contact'
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        name='fullName'
                        required
                        variant='filled'
                        fullWidth
                        id='fullName'
                        label='Full Name'
                        value={fullName}
                        onChange={(e) => onChange(e)}
                        style={{ backgroundColor: '#fff', borderRadius: 5 }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        required
                        fullWidth
                        variant='filled'
                        id='phone'
                        label='Phone'
                        name='phone'
                        autoComplete='pnumber'
                        value={phone}
                        onChange={(e) => onChange(e)}
                        style={{ backgroundColor: '#fff', borderRadius: 5 }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        required
                        fullWidth
                        variant='filled'
                        id='email'
                        label='Email'
                        name='email'
                        autoComplete='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        style={{ backgroundColor: '#fff', borderRadius: 5 }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <select
                        name='reason'
                        className='MuiInputBase-input MuiFilledInput-input'
                        aria-invalid='false'
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.87)',
                            fontSize: 14,
                            borderRadius: 5,
                            padding: '0 5%',
                            height: '100%',
                            width: '90%',
                        }}
                        defaultValue='Why'
                    >
                        <option value='Why' disabled>
                            Why are you contacting us?
                        </option>
                        <option value='Sclerotherapy for Spider Veins'>
                            Sclerotherapy for Spider Veins
                        </option>
                        <option value='New Consultation'>
                            New Consultation
                        </option>
                        <option value='Leg Pain'>Leg Pain</option>
                        <option value='Leg Swelling'>Leg Swelling</option>
                        <option value='Dialisys Access'>Dialisys Access</option>
                        <option value='Aneurysm'>Aneurysm</option>
                        <option value='Carotid Artery Diseasel'>
                            Carotid Artery Disease
                        </option>
                        <option value='Varicose Veins'>Varicose Veins</option>
                        <option value='Spider Veins'>Spider Veins</option>
                        <option value='Hospital Follow Up'>
                            Hospital Follow Up
                        </option>
                        <option value='Second Opinion'>Second Opinion</option>
                        <option value='Other'>Other</option>
                    </select>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        name='date'
                        required
                        variant='filled'
                        fullWidth
                        id='date'
                        label='Date'
                        value={date}
                        onChange={(e) => onChange(e)}
                        style={{ backgroundColor: '#fff', borderRadius: 5 }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        required
                        fullWidth
                        variant='filled'
                        id='time'
                        label='Time'
                        name='time'
                        autoComplete='pnumber'
                        value={time}
                        onChange={(e) => onChange(e)}
                        style={{ backgroundColor: '#fff', borderRadius: 5 }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        fullWidth
                        required
                        variant='filled'
                        id='message'
                        label='Message'
                        multiline
                        rows={4}
                        name='message'
                        value={message}
                        onChange={(e) => onChange(e)}
                        style={{ backgroundColor: '#fff', borderRadius: 5 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    {warning && (
                        <Fragment>
                            <Alert severity='warning'>
                                <AlertTitle>Warning</AlertTitle>
                                Check the box to prove you are not a robot
                            </Alert>
                        </Fragment>
                    )}
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey='6LeHzEsaAAAAAPqymwGaZYjoWRnBEvx1vgVwR9ds'
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    {sent && (
                        <Fragment>
                            <Alert severity='success'>
                                <AlertTitle>Success</AlertTitle>
                                {mess}
                            </Alert>
                        </Fragment>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {error && (
                        <Fragment>
                            <Alert severity='error'>
                                <AlertTitle>Error</AlertTitle>
                                There was an error sending the form
                                <ul>
                                    {errs &&
                                        errs.length > 0 &&
                                        errs.map((r, index) => (
                                            <li key={index}>{r.msg}</li>
                                        ))}
                                </ul>
                            </Alert>
                        </Fragment>
                    )}
                </Grid>
            </Grid>
            <button className='big-blue-button submit-btn' type='submit'>
                Submit Now
            </button>
        </form>
    );
};

export default ContactForm;
