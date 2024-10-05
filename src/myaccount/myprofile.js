import React, { useEffect, useState } from 'react';
import { useTranslation, } from "react-i18next";
import '../assets/css/english.css';
import '../assets/css/arabic.css';
import '../index.css';
import MyBooking from "./mybooking";
import MyDocuments from "./mydocuments";
import { useNavigate } from 'react-router-dom';
import logOutPng from '../assets/images/booking/logout.png';
import eyeopen from '../assets/images/home/eye-open.png';
import password from '../assets/images/home/eye-password.png';
import AuthService from '../service/authService';
import ApiService from '../service/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import AppEndPoints from '../config/AppEndPoints';

const MyProfile = ({ goToMyAccount, verifyEmailOtp, resendEmailOtp }) => {


    const navigate = useNavigate();

    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [blnSendEmail, setBlnSendEmail] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        country_id: 229,
        phone: '',
        address: '',
        old_password: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({});

    const [blnSubmitted, setBlnSubmitted] = useState(false);
    const [passwordType1, setPasswordType1] = useState('password');
    const [passwordType2, setPasswordType2] = useState('password');
    const [passwordType3, setPasswordType3] = useState('password');
    const [password1Src, setPassword1Src] = useState(eyeopen);
    const [password2Src, setPassword2Src] = useState(eyeopen);
    const [password3Src, setPassword3Src] = useState(eyeopen);
    const [countries, setCountries] = useState([]);


    const handleChange = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };

    const handleChangeOTP = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Automatically focus the next input field
        if (value && index < 3) {
            document.getElementById(`otp${index + 1}`).focus();
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
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

    const handleVerifyOtp = () => {
        setBlnSendEmail(true);
        verifyEmailOtp(otp.join(''));
        setBlnSendEmail(false);
    };

    const logOut = () => {

        const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
        // console.log(token);
        const headers = {
            'X-Localization': currentLanguage, // Example header to specify language
            Authorization: `Bearer ${token}`, // Example header to specify language
            'Access-Control-Max-Age': '3600',
            // Add other headers as needed
        };
        // console.log(headers);
        // const res = await AuthService.logout(headers);
        AuthService.logout(headers).then((res) => {
            const { errorCode, data } = res.data; // Destructure the response data
            console.log(res.data);
            if (errorCode === 0) {

                localStorage.removeItem('loggedIn');
                localStorage.removeItem('token');
                localStorage.removeItem('profileData');
                // window.location.reload();
                // const path = '/';
                // window.location.href = path;
            }

        })
        .catch((error) => {
            console.error('Error logout:', error);
          });




    }

    const showPassword = (id) => {
        switch (id) {
            case 1:
                setPasswordType1(passwordType1 === 'password' ? 'text' : 'password');
                setPassword1Src(passwordType1 === 'password' ? password : eyeopen);
                break;
            case 2:
                setPasswordType2(passwordType2 === 'password' ? 'text' : 'password');
                setPassword2Src(passwordType2 === 'password' ? password : eyeopen);
                break;
            case 3:
                setPasswordType3(passwordType3 === 'password' ? 'text' : 'password');
                setPassword3Src(passwordType3 === 'password' ? password : eyeopen);
                break;
            default:
                break;
        }
    };
    const onSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior


        setBlnSubmitted(true); // Set form submission flag to true

        setLoading(true);
        const phoneNumber =
            countries[registerForm.country_id - 1]?.phone_code + ' ' + registerForm.phone;
        localStorage.setItem('phoneNumber', phoneNumber);

        if (!validateForm()) {
            setLoading(false);
            return; // Exit if form validation fails
        }
        console.log('start');
        const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
        // console.log(token);
        const headers = {
            'X-Localization': currentLanguage, // Example header to specify language
            Authorization: `Bearer ${token}`, // Example header to specify language
            'Access-Control-Max-Age': '3600',
            // Add other headers as needed
        };
        // Prepare data for API call

        const formData = {
            name: registerForm.name,
            email: registerForm.email,
            country_code: registerForm.countryCode,
            phone: registerForm.phone,
            country_id: registerForm.country_id,
            address: registerForm.address,
            old_password: registerForm.old_password,
            password: registerForm.password,
            password_confirmation: registerForm.password_confirmation

        };
     
        console.log(formData);
        // Example: Call your API service to update profile
        ApiService.postData(AppEndPoints.profile_update, formData, headers)
            .then((res) => {
                console.log(res.data);
                setBlnSubmitted(false); // Reset form submission flag
                if (res.errorCode === 0) {

                    setLoading(false);
                    // Handle success response
                    toast.success(res.message);
                    
                    //   const currentUrl = window.location.href;

                    // window.location.href = currentUrl;
                    //   alert(res.message); // Example: Show success message
                    //   if (res.data.email_change) {
                    //     // Example: Show modal if email was changed
                    //     // You should use state and a modal component instead of jQuery
                    //     // ShowModalFunction();
                    //   }
                    getProfileData(); // Refresh profile data after update
                    
                    window.location.reload();

                    //   if (redUrl) {
                    //     history.push(redUrl); // Navigate to specified URL
                    //   }
                } else {
                    setLoading(false);
                    // Handle error response
                    toast.error(res.message);

                    //   alert(res.message); // Example: Show error message
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error updating profile:', error);
                // Handle error scenarios
            });


    };


    const validateForm = () => {
        const errors = {};
        if (!registerForm.name.trim()) errors.name = 'Name is required';
        if (!registerForm.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!registerForm.phone.trim()) errors.phone = 'Phone number is required';
        // if (!registerForm.password) {
        //   errors.password = 'Password is required';
        // } else if (registerForm.password.length < 5) {
        //   errors.password = 'Password must be at least 5 characters long';
        // }
        // if (!registerForm.password_confirmation) {
        //   errors.password_confirmation = 'Confirm your password';
        // } else if (registerForm.password !== registerForm.password_confirmation) {
        //   errors.password_confirmation = 'Passwords do not match';
        // }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const getProfileData = async () => {
        try {
            const countryResponse = await AuthService.countryCode();
            if (countryResponse.data.errorCode === 0) {
                setCountries(countryResponse.data.data);
            }

            const storedProfile = JSON.parse(localStorage.getItem('profileData'));
            if (storedProfile) {
                const countryId = countryResponse.data.data.find(
                    (e) => e.phone_code === storedProfile.data.country_code
                )?.id || '229';

                // console.log(storedProfile.data.phone);
                // console.log(storedProfile.data.country_code);
                setRegisterForm({
                    name: storedProfile.data.name,
                    email: storedProfile.data.email,
                    country_id: countryId,
                    phone: storedProfile.data.phone,
                    address: storedProfile.data.address
                });
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getProfileData();
    }, []);

    return <>

        <div className={`language-${currentLanguage}`}>
            <div class="my-profile">
                <h1 className="main-heading">{t('PROFILE.MYACCOUNT')}</h1>
                <ul className="breadcrumb">
                    <li>
                        <a href="#">{t('HOME.HOME')}</a>
                    </li>
                    <li>
                        <a className="active">{t('PROFILE.ACCOUNT')}</a>
                    </li>
                </ul>


                {/*-----Account Desktop-----*/}

                <section className="account desktop-screen">
                    <div className="container">
                        <div className="d-flex align-items-start">
                            <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <button
                                    className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                                    id="v-pills-home-tab"
                                    onClick={() => handleTabChange('home')}
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-home"
                                    aria-selected={activeTab === 'home'}


                                >
                                    {t('PROFILE.MYPROFILE')}
                                </button>
                                <button
                                    className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                                    id="v-pills-profile-tab"
                                    onClick={() => handleTabChange('profile')}
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-profile"
                                    aria-selected={activeTab === 'profile'}
                                >
                                    {t('PROFILE.MYBOOKINGS')}
                                </button>
                                <button
                                    className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`}
                                    id="v-pills-messages-tab"
                                    onClick={() => handleTabChange('messages')}
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-messages"
                                    aria-selected={activeTab === 'messages'}
                                >
                                    {t('PROFILE.DOCUMENTS')}
                                </button>
                                <a
                                    onClick={logOut}
                                    style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
                                >
                                    <img src={logOutPng} alt="Logout" />
                                    {t('PROFILE.LOGOUT')}
                                </a>
                            </div>
                            <div className="tab-content" id="v-pills-tabContent">
                                <div
                                    className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`}
                                    id="v-pills-home"
                                    role="tabpanel"
                                    aria-labelledby="v-pills-home-tab"
                                >
                                    <div className="edit-sec">
                                        <h3 style={{ textAlign: 'start' }}>{t('PROFILE.EDITYOURPROFILE')}</h3>
                                        <h4 style={{ textAlign: 'start' }}>{t('PROFILE.GENERAL')}</h4>
                                        <form autoComplete="off">
                                            <div className="row">
                                                <div className="col posRelative" style={{ textAlign: 'start' }}>
                                                    <label htmlFor="inputPassword4">{t('PROFILE.FULLNAME')}</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        value={registerForm.name}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder={t('PROFILE.ENTERYOURNAME')}
                                                    />
                                                    {blnSubmitted && !registerForm.name && errors.name && (
                                                        <span className="validationMsg">{t('VALIDATION.NAMEREQUIRED')}</span>
                                                    )}
                                                </div>
                                                <div className="col posRelative" style={{ textAlign: 'start' }}>
                                                    <label htmlFor="inputPassword4">{t('CONTACT.EMAIL')}</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        value={registerForm.email}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder={t('PROFILE.EMAIL')}
                                                    />
                                                    {blnSubmitted && !registerForm.email && errors.email && (
                                                        <span className="validationMsg">{t('VALIDATION.EMAILREQUIRED')}</span>
                                                    )}
                                                    {blnSubmitted && registerForm.email && !/\S+@\S+\.\S+/.test(registerForm.email) && errors.email && (
                                                        <span className="validationMsg">{t('VALIDATION.INVALIDEMAIL')}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6 posRelative" style={{ textAlign: 'start' }}>
                                                    <label htmlFor="InputContact1">{t('PROFILE.CONTACTNUMBER')}</label>
                                                    <div className="d-flex">
                                                        <select
                                                            name="country_id"
                                                            value={registerForm.country_id}
                                                            onChange={handleChange}
                                                            id="country-code"
                                                        >
                                                            {countries.map((country) => (
                                                                <option key={country.id} value={country.id} selected={country.id === 229}>
                                                                    {country.phone_code}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <input
                                                            type="number"
                                                            name="phone"
                                                            value={registerForm.phone}
                                                            onChange={handleChange}
                                                            id="InputContact1"
                                                            className="form-control"
                                                            aria-describedby="emailHelp"
                                                            placeholder={t('PROFILE.ENTERCONTACTNUMBER')}
                                                        />
                                                    </div>
                                                    {blnSubmitted && (!registerForm.country_id || !registerForm.phone) && (
                                                        <span className="validationMsg">{t('PROFILE.COUNTRYCODEANDPHNNUMBER')}</span>
                                                    )}
                                                </div>
                                                <div className="col posRelative" style={{ textAlign: 'start' }}>
                                                    <label htmlFor="inputPassword4">{t('PROFILE.ADDRESS')}</label>
                                                    <textarea
                                                        name="address"
                                                        value={registerForm.address}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                    ></textarea>
                                                    {blnSubmitted && !registerForm.address && (
                                                        <span className="validationMsg">{t('PROFILE.ADDRESSISREQUIRED')}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row security">
                                                <h4 style={{ textAlign: 'start' }}>{t('PROFILE.SECURITY')}</h4>
                                                <div className="col-lg-4 passwords" style={{ textAlign: 'start' }}>
                                                    <label htmlFor="InputPassword1">{t('PROFILE.CURRENTPASSWORD')}</label>
                                                    <input
                                                        type={passwordType1}
                                                        name="old_password"
                                                        value={registerForm.old_password}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        id="InputPassword1"
                                                        placeholder={t('PROFILE.CURRENTPASSWORD')}
                                                    />
                                                    <span className="toggle">
                                                        <img onClick={() => showPassword(1)} src={password1Src} alt="Toggle Password Visibility" />
                                                        <a onClick={() => showPassword(1)}>
                                                            {passwordType1 === 'password' ? t('FORGOTPASSWORD.SHOW') : t('FORGOTPASSWORD.HIDE')}
                                                        </a>
                                                    </span>
                                                </div>
                                                <div className="col-lg-4 passwords" style={{ textAlign: 'start' }}>
                                                    <label htmlFor="InputPassword2">{t('PROFILE.NEWPASSWORD')}</label>
                                                    <input
                                                        type={passwordType2}
                                                        name="password"
                                                        value={registerForm.password}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        id="InputPassword2"
                                                        placeholder={t('PROFILE.NEWPASSWORD')}
                                                    />
                                                    <span className="toggle">
                                                        <img onClick={() => showPassword(2)} src={password2Src} alt="Toggle Password Visibility" />
                                                        <a onClick={() => showPassword(2)}>
                                                            {passwordType2 === 'password' ? t('FORGOTPASSWORD.SHOW') : t('FORGOTPASSWORD.HIDE')}
                                                        </a>
                                                    </span>
                                                </div>
                                                <div className="col-lg-4 passwords" style={{ textAlign: 'start' }}>
                                                    <label htmlFor="InputPassword3">{t('PROFILE.CONFIRMNEWPASSWORD')}</label>
                                                    <input
                                                        type={passwordType3}
                                                        name="password_confirmation"
                                                        value={registerForm.password_confirmation}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        id="InputPassword3"
                                                        placeholder={t('PROFILE.CONFIRMNEWPASSWORD')}
                                                    />
                                                    <span className="toggle">
                                                        <img onClick={() => showPassword(3)} src={password3Src} alt="Toggle Password Visibility" />
                                                        <a onClick={() => showPassword(3)}>
                                                            {passwordType3 === 'password' ? t('FORGOTPASSWORD.SHOW') : t('FORGOTPASSWORD.HIDE')}
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </form>
                                        <div className={`change-password ${loading ? 'btn-loading' : ''}`} style={{ textAlign: 'start' }}>
                                            <a onClick={onSubmit}>{t('PROFILE.SAVE')}</a>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`}
                                    id="v-pills-profile"
                                    role="tabpanel"
                                    aria-labelledby="v-pills-profile-tab"
                                >
                                    <MyBooking />
                                </div>
                                <div
                                    className={`tab-pane fade ${activeTab === 'messages' ? 'show active' : ''}`}
                                    id="v-pills-messages"
                                    role="tabpanel"
                                    aria-labelledby="v-pills-messages-tab"
                                >
                                    <MyDocuments />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*-----End Account Desktop-----*/}

                <section className="account-mob">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                                id="pills-home-tab"
                                onClick={() => handleTabChange('home')}
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected={activeTab === 'home'}
                            >
                                {t('PROFILE.MYPROFILE')}
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                                id="pills-profile-tab"
                                onClick={() => handleTabChange('profile')}
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected={activeTab === 'profile'}
                            >
                                {t('PROFILE.MYBOOKINGS')}
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                                id="pills-contact-tab"
                                onClick={() => handleTabChange('contact')}
                                type="button"
                                role="tab"
                                aria-controls="pills-contact"
                                aria-selected={activeTab === 'contact'}
                            >
                                {t('PROFILE.DOCUMENTS')}
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`}
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="pills-home-tab"
                        >
                            <div className="edit-sec">
                                <h3 style={{ textAlign: 'start' }}>{t('PROFILE.EDITYOURPROFILE')}</h3>
                                <h4 style={{ textAlign: 'start' }}>{t('PROFILE.GENERAL')}</h4>
                                <form autoComplete="off">
                                    <div className="row">
                                        <div className="col-12 posRelative" style={{ textAlign: 'start' }}>
                                            <label htmlFor="inputPassword4">{t('PROFILE.FULLNAME')}</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={registerForm.name}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Abraham Zack"
                                            />
                                            {blnSubmitted && !registerForm.name && (
                                                <span className="validationMsg">{t('VALIDATION.NAMEREQUIRED')}</span>
                                            )}
                                        </div>
                                        <div className="col-12 posRelative" style={{ textAlign: 'start' }}>
                                            <label htmlFor="inputPasswordEmail">{t('CONTACT.EMAIL')}</label>
                                            <input
                                                type="text"
                                                name="email"
                                                value={registerForm.email}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder={t('PROFILE.EMAIL')}
                                            />
                                            {blnSubmitted && !registerForm.email && (
                                                <span className="validationMsg">{t('VALIDATION.EMAILREQUIRED')}</span>
                                            )}
                                            {blnSubmitted && registerForm.email && !/\S+@\S+\.\S+/.test(registerForm.email) && (
                                                <span className="validationMsg">{t('VALIDATION.INVALIDEMAIL')}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 posRelative" style={{ textAlign: 'start' }}>
                                            <label htmlFor="InputContact">{t('PROFILE.CONTACTNUMBER')}</label>
                                            <div className="d-flex">
                                                <select
                                                    name="country-code1"
                                                    value={registerForm.country_id}
                                                    onChange={handleChange}
                                                    id="country-code1"
                                                >
                                                    {countries.map((country) => (
                                                        <option key={country.id} value={country.id} selected={country.id === 229}>
                                                            {country.phone_code}
                                                        </option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="number"
                                                    name="phone"
                                                    value={registerForm.phone}
                                                    onChange={handleChange}
                                                    id="InputContact"
                                                    className="form-control"
                                                    aria-describedby="emailHelp"
                                                    placeholder={t('PROFILE.ENTERCONTACTNUMBER')}
                                                />
                                            </div>
                                            {blnSubmitted && (!registerForm.country_id || !registerForm.phone) && (
                                                <span className="validationMsg">{t('PROFILE.COUNTRYCODEANDPHNNUMBER')}</span>
                                            )}
                                        </div>
                                        <div className="col posRelative" style={{ textAlign: 'start' }}>
                                            <label htmlFor="inputPassword4">{t('PROFILE.ADDRESS')}</label>
                                            <textarea
                                                name="address"
                                                value={registerForm.address}
                                                onChange={handleChange}
                                                className="form-control"
                                            ></textarea>
                                            {blnSubmitted && !registerForm.address && (
                                                <span className="validationMsg">{t('PROFILE.ADDRESSISREQUIRED')}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row security">
                                        <h4 style={{ textAlign: 'start' }}>{t('PROFILE.SECURITY')}</h4>
                                        <div className="col-12 passwords" style={{ textAlign: 'start' }}>
                                            <label htmlFor="InputPassword2">{t('PROFILE.CURRENTPASSWORD')}</label>
                                            <input
                                                type={passwordType1}
                                                name="old_password"
                                                value={registerForm.old_password}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder={t('PROFILE.CURRENTPASSWORD')}
                                            />
                                            <span className="toggle">
                                                <img onClick={() => showPassword(1)} src={password1Src} alt="Toggle Password Visibility" />
                                                <a onClick={() => showPassword(1)}>
                                                    {passwordType1 === 'password' ? t('FORGOTPASSWORD.SHOW') : t('FORGOTPASSWORD.HIDE')}
                                                </a>
                                            </span>
                                        </div>
                                        <div className="col-12 passwords" style={{ textAlign: 'start' }}>
                                            <label htmlFor="InputPasswordC2">{t('PROFILE.NEWPASSWORD')}</label>
                                            <input
                                                type={passwordType2}
                                                name="password"
                                                value={registerForm.password}
                                                onChange={handleChange}
                                                className="form-control"
                                                id="InputPasswordC2"
                                                placeholder={t('PROFILE.NEWPASSWORD')}
                                            />
                                            <span className="toggle">
                                                <img onClick={() => showPassword(2)} src={password2Src} alt="Toggle Password Visibility" />
                                                <a onClick={() => showPassword(2)}>
                                                    {passwordType2 === 'password' ? t('FORGOTPASSWORD.SHOW') : t('FORGOTPASSWORD.HIDE')}
                                                </a>
                                            </span>
                                        </div>
                                        <div className="col-12 passwords" style={{ textAlign: 'start' }}>
                                            <label htmlFor="InputPasswordC3">{t('PROFILE.CONFIRMNEWPASSWORD')}</label>
                                            <input
                                                type={passwordType3}
                                                name="password_confirmation"
                                                value={registerForm.password_confirmation}
                                                onChange={handleChange}
                                                className="form-control"
                                                id="InputPasswordC3"
                                                placeholder={t('PROFILE.CONFIRMNEWPASSWORD')}
                                            />
                                            <span className="toggle">
                                                <img onClick={() => showPassword(3)} src={password3Src} alt="Toggle Password Visibility" />
                                                <a onClick={() => showPassword(3)}>
                                                    {passwordType3 === 'password' ? t('FORGOTPASSWORD.SHOW') : t('FORGOTPASSWORD.HIDE')}
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                                <div className={`change-password ${loading ? 'btn-loading' : ''}`} style={{ textAlign: 'start' }}>
                                    <a onClick={onSubmit}>{t('PROFILE.SAVE')}</a>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`}
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                        >
                            <MyBooking />
                        </div>
                        <div
                            className={`tab-pane fade ${activeTab === 'contact' ? 'show active' : ''}`}
                            id="pills-contact"
                            role="tabpanel"
                            aria-labelledby="pills-contact-tab"
                        >
                            <MyDocuments />
                        </div>
                    </div>
                </section>

                {/*-----Account Mobile-----*/}
            </div>


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
                                    // onClick={close}
                                    className="login-close btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <img src={'../assets/images/home/close.png'} alt="" />
                                </a>
                            </div>
                            <div className="modal-body">
                                <h5>{t("OTP.ENTEROTP")}</h5>
                                <p className="contentmsg">
                                    {t("OTP.DESCRIPTION")} username@gmail.com
                                </p>
                                <form className="mt-3">
                                    {/* {otp.map((value, index) => (
                                        <input
                                            key={index}
                                            type="tel"
                                            value={value}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyPress={numberOnly}
                                            maxLength="1"
                                            autoFocus={index === 0}
                                            className="otp"
                                            id={`otp${index}`}
                                            required
                                        />
                                    ))} */}
                                </form>

                                <div className="reset-btn">
                                    <button
                                        className={`btn btn-primary ${blnSendEmail ? 'btn-loading' : ''}`}
                                        onClick={handleVerifyOtp}
                                    >
                                        {t("OTP.VERIFY")}
                                    </button>
                                </div>
                                <div className="register-here">
                                    <p>
                                        {t("OTP.DIDNTRECIEVE")}?<a onClick={resendEmailOtp}>{t("OTP.RESEND")}</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <ToastContainer /> {/* Add ToastContainer here */}

        </div>



    </>
}


export default MyProfile;