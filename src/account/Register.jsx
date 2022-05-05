import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function Register({ history }) {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone:'',
        id:'',
        driverLicense:'',
        psvLicense:'',
        password: '',
        confirmPassword: '',
        swiftBoda:'',
        swiftMini:'',
        swiftPrime:'',
        swiftXtra:'',
        acceptTerms: false
    };
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid'),
        id: Yup.string()
            .required('ID is required'),
        driverLicense: Yup.string()
            .required('Driver License is required'),
        psvLicense: Yup.string()
            .required('PSV License is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Terms & Conditions is required'),
            swiftBoda: Yup.bool()
            .oneOf([true], 'Select one of the driver options'),
            swiftMini: Yup.bool()
            .oneOf([true], 'Select one of the driver options'),
            swiftPrime: Yup.bool()
            .oneOf([true], 'Select one of the driver options'),
            swiftXtra: Yup.bool()
            .oneOf([true], 'Select one of the driver options')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountService.register(fields)
            .then(() => {
                alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                history.push('login');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h3 className="card-header">Driver Registeration</h3>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>First Name</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                        <div className="form-group col-5">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-5">
                            <label>Phone</label>
                            <Field name="phone" type="tel" className={'form-control' + (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')} />
                            <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                        </div>
                        </div>
                        <div className="form-group">
                                <label>ID Number</label>
                                <Field name="id" type="text" className={'form-control' + (errors.id && touched.id ? ' is-invalid' : '')} />
                                <ErrorMessage name="id" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label>Driver's License</label>
                                <Field name="driverLicense" type="text" className={'form-control' + (errors.driverLicense && touched.driverLicense ? ' is-invalid' : '')} />
                                <ErrorMessage name="driverLicense" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label>PSV License</label>
                                <Field name="psvLicense" type="text" className={'form-control' + (errors.psvLicense && touched.psvLicense ? ' is-invalid' : '')} />
                                <ErrorMessage name="psvLicense" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-row ml-3">
                        <div className="form-group form-check col ">
                            <Field type="checkbox" name="swiftBoda" id="swiftBoda" className={'form-check-input ' + (errors.swiftBoda && touched.swiftBoda ? ' is-invalid' : '')} />
                            <label htmlFor="swiftBoda" className="form-check-label">Swift Boda</label>
                            <ErrorMessage name="swiftBoda" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group form-check col">
                            <Field type="checkbox" name="swiftMini" id="swiftMini" className={'form-check-input ' + (errors.swiftMini && touched.swiftMini ? ' is-invalid' : '')} />
                            <label htmlFor="swiftMini" className="form-check-label">Swift Mini</label>
                            <ErrorMessage name="swiftMini" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group form-check col">
                            <Field type="checkbox" name="swiftPrime" id="swiftPrime" className={'form-check-input ' + (errors.swiftPrime && touched.swiftPrime ? ' is-invalid' : '')} />
                            <label htmlFor="swiftPrime" className="form-check-label">Swift Prime</label>
                            <ErrorMessage name="swiftPrime" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group form-check col">
                            <Field type="checkbox" name="swiftXtra" id="swiftXtra" className={'form-check-input ' + (errors.swiftXtra && touched.swiftXtra ? ' is-invalid' : '')} />
                            <label htmlFor="swiftXtra" className="form-check-label">Swift Xtra</label>
                            <ErrorMessage name="swiftXtra" component="div" className="invalid-feedback" />
                        </div>
                        </div>


                        <div className="form-group form-check">
                            <Field type="checkbox" name="acceptTerms" id="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                            <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                            <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Register
                            </button>
                            <Link to="login" className="btn btn-link">Cancel</Link>
                          
                        </div>
                        <p>I also agree that Swift Ride or its representatives may contact me by email, phone, or SMS (including by automated means) at the email address or number I provide, including for marketing purposes.</p>
                    </div>
                    
                </Form>
            )}
        </Formik>
    )
}

export { Register }; 