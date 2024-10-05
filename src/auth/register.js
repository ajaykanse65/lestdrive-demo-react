import React, { useState, useEffect } from 'react';
import '../assets/css/english.css';
import '../assets/css/arabic.css';
import { useTranslation, } from "react-i18next";
import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from 'react-google-login';


import { useGoogleLogin } from '@react-oauth/google';

import { GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';
import '../index.css';
import './register.css';
// import { MemoryRouter } from 'react-router-dom';
import close from '../assets/images/home/close.png';
import fb from '../assets/images/home/fb-login.png';
import eyepass from '../assets/images/home/eye-password.png';
import eyeopen from '../assets/images/home/eye-open.png';
import AuthService from '../service/authService';
import { ToastContainer, toast } from 'react-toastify';
// import { GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import google from '../assets/images/home/google-login.png';
import axios from 'axios';
import { socialRegister } from './socialauth';
import { getDeviceToken } from '../service/firebase';
import {LoginSocialGoogle } from 'reactjs-social-login';




const Resgister = () => {
    // const clientId = '916977580664-tkfl69eridg63v6l0lq46fflkkarsflh.apps.googleusercontent.com'; // Replace with your Google Client ID

    // const history = MemoryRouter();
    const navigate = useNavigate();

    const [otp, setOtp] = useState(['', '', '', '']);
    const [blnInvalidMailOtp, setBlnInvalidMailOtp] = useState(false);
    const [otpErrorMessage, setOtpErrorMessage] = useState('');
    const [blnVerifyMail, setBlnVerifyMail] = useState(false);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        country_id: 229,
    });
    const [errors, setErrors] = useState({});
    const [mailId, setMailId] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [showPasswd, setShowPasswd] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [mailExistErrorMsg, setMailExistErrorMsg] = useState(false);
    const [blnSendMail, setBlnSendMail] = useState(false);
    const [blnPassMatchError, setBlnPassMatchError] = useState(false);
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const [countries, setCountries] = useState([]);

    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState(null);

    const goToLogin = () => {
        navigate(currentLanguage === 'ar' ? '/ar/login' : '/en/login')
    }

    const login = useGoogleLogin({
        onSuccess: tokenResponse => getInfo(tokenResponse.access_token),
        // onSuccess: tokenResponse => console.log(tokenResponse),
      });

    const getInfo = async (token) => {
        try {
          const res = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${token}`, // Corrected the template literal syntax
              },
            }
          );
        //   console.log(res.data.name);
          const body = JSON.stringify({
            email: res.data.email,
            name: res.data.name,
            token: token,
            type: 'GOOGLE',
        
          });
          console.log(body);
          AuthService.socialLogin(body)
          .then((res)=> {
            console.log(res);  
            if(res.data.errorCode === 0){
                localStorage.setItem('loggedIn', JSON.stringify(true));
                localStorage.setItem('token', res.data.token);
                toast.success(res.data.message);

                // navigate('/login');
                const path = '/';
                
                const params = new URLSearchParams(window.location.search);
                const redirectUrl = params.get('redirect_url');
                if (redirectUrl) {
                    // Redirect back to the original page after login
                    window.location.href = decodeURIComponent(redirectUrl);
                } else {
                    // Fallback to a default page if there's no redirect URL
                    window.location.href = path;
                }

            }
          })
          


        } catch (err) {
          console.log(err);
        }
      };

    // const login = useGoogleLogin({


    //     onSuccess: async (tokenResponse) => {
    //         const accessToken = tokenResponse.access_token;
    //         console.log('Access Token:', accessToken);

    //         const tok = getDeviceToken();
    //         try {
    //             const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                     Accept: 'application/json'
    //                 }
    //             });



    //             // Social register
    //             if (tok !== null) {
    //                 const body = {
    //                     email: res.data.email,
    //                     token: tok,
    //                     type: "GOOGLE",
    //                     name: res.data.name,
    //                 };

    //                 console.log(body);
    //                 console.log('Profile:', res.data);
    //                 AuthService.socialLogin(body).then((res) => {
    //                     console.log(res);
    //                     console.log(res.data);

    //                 })
    //             }

    //             // const registerResponse = await socialRegister(body);
    //             // console.log(registerResponse);
    //             // if (registerResponse.errorCode === 0) {
    //             //     localStorage.setItem('loggedIn', JSON.stringify(true));
    //             //     localStorage.setItem('token', registerResponse.data.token);
    //             //   navigate('/');
    //             // } else {
    //             //   console.error('Registration Error:', registerResponse.message);
    //             // }

    //         } catch (err) {
    //             console.error('Error fetching profile:', err);
    //         }
    //     },
    //     onError: (error) => {
    //         console.error('Login Failed:', error);
    //     }
    // });


    const goToHome = () => {
        navigate(currentLanguage === 'ar' ? '/ar' : '/en')

        localStorage.setItem('activeMenu', 'home');

    }

    const goToRegister = () => {
        navigate(currentLanguage === 'ar' ? '/ar/register' : '/en/register')

    }

    const responseGoogle = (response) => {
        console.log(response);
    }

    const handleChangeOtp = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Automatically focus the next input field
        if (value && index < 3) {
            document.getElementById(`otp${index + 1}`).focus();
        }
    };

    const numberOnly = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    };

    const digitValidate = (element) => {
        element.value = element.value.replace(/[^0-9]/g, '');
    };

    const clearInputs = () => {
        setOtp(['', '', '', '']);
    };

    const verifyEmailOtp = () => {
        setBlnVerifyMail(true);
        // Add your OTP verification logic here
        setBlnVerifyMail(false);
    };

    const resendEmailOtp = () => {
        // Add your OTP resend logic here
    };


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const validateForm = () => {
        const errors = {};
        if (!form.name.trim()) errors.name = 'Name is required';
        if (!form.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!form.phone.trim()) errors.phone = 'Phone number is required';
        if (!form.password) {
            errors.password = 'Password is required';
        } else if (form.password.length < 5) {
            errors.password = 'Password must be at least 5 characters long';
        }
        if (!form.password_confirmation) {
            errors.password_confirmation = 'Confirm your password';
        } else if (form.password !== form.password_confirmation) {
            errors.password_confirmation = 'Passwords do not match';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        const tok = getDeviceToken();

        e.preventDefault();
        setSubmitted(true);

        if (!validateForm()) {
            return;
        }
        setBlnSendMail(true);
        if (tok !== null) {
            const data = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                password_confirmation: form.password_confirmation,
                country_id: form.country_id,
                device_token: tok,
            };

            console.log('Form data:', data);
            AuthService.register(data).then((res) => {
                console.log(res.data);
                if (res.data.errorCode === 0) {
                    // Handle successful registration
                    console.log('Registration successful:', res.data);
                    setSubmitted(false);
                    setBlnSendMail(false);
                    localStorage.setItem('loggedIn', JSON.stringify(true));
                    localStorage.setItem('token', res.data.data.token);
                    toast.success(res.data.message);

                    // navigate('/login');
                    const path = '/';
                    
                    const params = new URLSearchParams(window.location.search);
                    const redirectUrl = params.get('redirect_url');
                    if (redirectUrl) {
                        // Redirect back to the original page after login
                        window.location.href = decodeURIComponent(redirectUrl);
                    } else {
                        // Fallback to a default page if there's no redirect URL
                        window.location.href = path;
                    }
                } else if (res.data.message === 'User already exists, Please Login.') {
                    setMailExistErrorMsg(true);
                    setBlnSendMail(false);
                }
            }).catch((error) => {
                setBlnSendMail(false);
                console.error('Registration request failed:', error);
            });
        }



    };
    const handleSuccess = (credentialResponse) => {
        // If you are using the authorization code flow, you will receive a code to be exchanged for an access token
        const authorizationCode = credentialResponse.code;

        // Send the authorization code to your backend server
        fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: authorizationCode }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from your backend server
                console.log('Login successful, backend response:', data);
            })
            .catch(error => {
                // Handle errors in communicating with your backend server
                console.error('Error exchanging authorization code:', error);
            });
    };

    const handleError = (errorResponse) => {
        console.error('Google login failed', errorResponse);
    };

    const showPassword = () => setShowPasswd(!showPasswd);
    const showConfirmed = () => setShowConfirm(!showConfirm);

    const hasValid = (value) => value && value.trim() !== '';

    



    useEffect(() => {
        window.scrollTo(0, 0);
        // Initialize form and fetch country codes
        AuthService.countryCode().then((res) => {
            if (res.data.errorCode === 0) {
                setCountries(res.data.data);
            }
        });

        // Listen for social auth state changes
        // Assuming you have a method to check social login status

    }, []);
    return (
        <>
            <div className={`language-${currentLanguage}`}>

                <section className="register-modal">
                    <div className="container">
                        <div className="modal-header">
                            <a
                                //   onClick={}
                                onClick={goToHome}
                                className="register-close">
                                <img src={close} alt="" />
                            </a>
                        </div>
                        <div className="modal-body">
                            <h5 style={{ textAlign: 'start' }}>{t("FOOTER.REGISTER")}</h5>
                            <div className="login-here">
                                <p style={{ textAlign: 'start' }}>{t("PROFILE.CONNECTUSING")}</p>
                                <div className="social-media">
                                    <div className="box">
                                    <img src={google} onClick={() => login()}></img>

                                        {/* <GoogleSigninButton
                                            size={GoogleSigninButton.Size.Icon}
                                            color={GoogleSigninButton.Color.Dark}
                                        
                                        
                                        disabled={isInProgress}
                                        /> */}
                                        {/* <GoogleLogin
                                            onSuccess={credentialResponse => {
                                                console.log(credentialResponse);
                                            }}
                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                        />; */}
                                        {/* <img src={google} onClick={login}></img> */}
                                        {/* <GoogleLogin
                                            clientId={clientId}
                                            buttonText="Login with Google"
                                            onSuccess={handleSuccess}
                                            onFailure={handleError}
                                            cookiePolicy={'single_host_origin'}
                                        /> */}


                                    </div>
                                    <div className="box">
                                        <a
                                        // onClick={}
                                        >
                                            <img src={fb} alt="" />
                                        </a>
                                    </div>
                                </div>
                                <p className="another-option" style={{ textAlign: 'start' }}>{t("HOME.OR")}</p>
                                <div className="login-form" style={{ textAlign: 'start' }}>
                                    <form onSubmit={handleSubmit} autoComplete="off">
                                        <div className="form-group">
                                            <div className={hasValid(form.name) ? 'float__label' : ''}>
                                                <label htmlFor="InputFullname">{t("PROFILE.FULLNAME")}*</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    id="InputFullname"
                                                    placeholder={t("PROFILE.ENTERFULLNAME")}
                                                />
                                            </div>
                                        </div>
                                        {errors.name && (submitted) && (
                                            <p style={{ color: '#c41229', fontSize: '12px', marginTop: '10px', textAlign: 'left' }}>
                                                {t("VALIDATION.NAMEREQUIRED")}
                                            </p>
                                        )}
                                        <div className="form-group">
                                            <div className={hasValid(form.email) ? 'float__label' : ''}>
                                                <label htmlFor="InputEmail">{t("CONTACT.EMAIL")}*</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    id="InputEmail"
                                                    placeholder={t("PROFILE.ENTEREMAIL")}
                                                />
                                            </div>
                                        </div>
                                        {errors.email && (submitted) && (
                                            <p style={{ color: '#c41229', fontSize: '12px', marginTop: '10px', textAlign: 'left' }}>
                                                {t("VALIDATION.INVALIDEMAIL")}
                                            </p>
                                        )}
                                        {mailExistErrorMsg && (
                                            <p style={{ color: '#c41229', fontSize: '12px', marginTop: '10px', textAlign: 'left' }}>
                                                {t("PROFILE.EMAILALREADYEXISTS")}!
                                            </p>
                                        )}
                                        <div className="form-group">
                                            <div className={hasValid(form.phone) ? 'float__label' : ''}>
                                                <label htmlFor="InputContact">{t("PROFILE.CONTACTNUMBER")}*</label>
                                                <div className="d-flex">
                                                    <select
                                                        name="country_id"
                                                        value={form.country_id}
                                                        onChange={handleChange}
                                                        id="country-code"
                                                    >
                                                        {countries.map((country) => (
                                                            <option key={country.id} value={country.id} selected={country.id === 229}>{country.phone_code}</option>
                                                        ))}
                                                        {/* Render your country options here */}
                                                        {/* Example: <option value="229">+91</option> */}
                                                    </select>
                                                    <input
                                                        type="number"
                                                        name="phone"
                                                        value={form.phone}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        id="InputContact"
                                                        placeholder={t("PROFILE.ENTERCONTACTNUMBER")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {errors.phone && (submitted) && (
                                            <p style={{ color: '#c41229', fontSize: '12px', marginTop: '10px', textAlign: 'left' }}>
                                                {t("PROFILE.VALIDPHONENUMBER")}
                                            </p>
                                        )}
                                        <div className="form-group">
                                            <div className={hasValid(form.password) ? 'float__label' : ''}>
                                                <label htmlFor="InputPassword">{t("FORGOTPASSWORD.PASSWORD")}*</label>
                                                <input
                                                    type={showPasswd ? "text" : "password"}
                                                    name="password"
                                                    value={form.password}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    id="InputPassword"
                                                    placeholder={t("PROFILE.ENTERTHEPASSWORD")}
                                                />
                                                <span className="toggle">
                                                    <img
                                                        onClick={showPassword}
                                                        src={showPasswd ?
                                                            { eyepass }
                                                            : { eyeopen }}
                                                        alt=""
                                                    />
                                                    <a onClick={showPassword}>{showPasswd ? t("FORGOTPASSWORD.HIDE") : t("FORGOTPASSWORD.SHOW")}</a>
                                                </span>
                                            </div>
                                        </div>
                                        {errors.password && (submitted) && (
                                            <p style={{ color: '#c41229', fontSize: '12px', marginTop: '10px', textAlign: 'left' }}>
                                                {t("VALIDATION.PASSWORDREQUIRED")}
                                            </p>
                                        )}
                                        <div className="form-group">
                                            <div>
                                                <label htmlFor="InputConfirm">{t("FORGOTPASSWORD.CONFIRMPASSWORD")}*</label>
                                                <input
                                                    type={showConfirm ? "text" : "password"}
                                                    name="password_confirmation"
                                                    value={form.password_confirmation}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    id="InputConfirm"
                                                    placeholder={t("FORGOTPASSWORD.CONFIRMPASSWORD")}
                                                />
                                                <span className="toggle">
                                                    <img
                                                        onClick={showConfirmed}
                                                        src={showConfirm ? { eyepass } : { eyeopen }}
                                                        alt=""
                                                    />
                                                    <a onClick={showConfirmed}>{showConfirm ? t("FORGOTPASSWORD.HIDE") : t("FORGOTPASSWORD.SHOW")}</a>
                                                </span>
                                            </div>
                                        </div>
                                        {errors.password_confirmation && (submitted) && (
                                            <p style={{ color: '#c41229', fontSize: '12px', marginTop: '10px', textAlign: 'left' }}>
                                                {t("VALIDATION.PLEASECONFIRMPASSWORD")}
                                            </p>
                                        )}
                                        {blnPassMatchError && (
                                            <p style={{ color: '#c41229', fontSize: '12px', marginTop: '10px', textAlign: 'left' }}>
                                                {t("VALIDATION.DOESNOTMATCH")}
                                            </p>
                                        )}
                                        <div className="login-btn">
                                            <button
                                                type="submit"
                                                className={`btn btn-primary ${blnSendMail ? 'btn-loading' : ''}`}
                                            >
                                                {t("PROFILE.CREATEACCOUNT")}
                                            </button>
                                        </div>
                                        <div className="register-here">
                                            <p>
                                                {t("PROFILE.ALREADYHAVEANACCOUNT")}?
                                                <a
                                                    // onClick={}
                                                    onClick={goToLogin}
                                                >
                                                    {t("HOME.LOGIN")}</a>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="otpSec">
                    <div
                        className="modal fade"
                        id="otpModal"
                        tabIndex="-1"
                        aria-labelledby="otpModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <a
                                        href="#"
                                        onClick={() => {
                                            clearInputs();
                                            goToRegister();
                                            //   history.push(currentLanguage === 'ar' ? '/ar/register' : '/en/register');
                                        }}
                                        className="login-close btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <img src={close} alt="" />
                                    </a>
                                </div>
                                <div className="modal-body">
                                    <h5>{t("OTP.ENTEROTP")}</h5>
                                    <p className="contentmsg">
                                        {t("OTP.DESCRIPTION")} {mailId}
                                    </p>
                                    <form className="mt-3">
                                        {otp.map((value, index) => (
                                            <input
                                                key={index}
                                                type="tel"
                                                value={value}
                                                onChange={(e) => handleChangeOtp(index, e.target.value)}
                                                onKeyPress={numberOnly}
                                                maxLength="1"
                                                autoFocus={index === 0}
                                                className="otp"
                                                id={`otp${index}`}
                                                required
                                            />
                                        ))}
                                    </form>
                                    {blnInvalidMailOtp && (
                                        <p style={{ color: '#c41229', fontSize: '12px', marginTop: '10px', textAlign: 'left' }}>
                                            {otpErrorMessage}
                                        </p>
                                    )}
                                    <div className="reset-btn">
                                        <button
                                            className={`btn btn-primary ${blnVerifyMail ? 'btn-loading' : ''}`}
                                            onClick={verifyEmailOtp}
                                        >
                                            {t("OTP.VERIFY")}
                                        </button>
                                    </div>
                                    <div className="register-here">
                                        <p>
                                            {t("OTP.DIDNTRECIEVE")}? <a onClick={resendEmailOtp}>{t("OTP.RESEND")}</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer /> {/* Add ToastContainer here */}

                </section>
            </div>


        </>
    );


}





export default Resgister;