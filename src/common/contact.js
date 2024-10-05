import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import '../assets/css/english.css';
import '../assets/css/arabic.css';
// import '../App.css';
// import '../index.css';
import { useTranslation, } from "react-i18next";
import banner from '../assets/images/contact/banner.png';
import mobBanner from '../assets/images/contact/mob-banner.png';
import contact from '../assets/images/contact/3.svg';
import contactfour from '../assets/images/contact/4.svg';
import contacttwo from '../assets/images/contact/2.svg';
import contactone from '../assets/images/contact/1.svg';
import fb from '../assets/images/contact/fb.svg';
import insta from '../assets/images/contact/instagram.svg';
import twitter from '../assets/images/contact/twitter.svg';
import youtube from '../assets/images/contact/youtube.svg';
// import '../index.css';
// import './contact.css';
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';
import AuthService from '../service/authService';
import { ToastContainer, toast } from 'react-toastify';





const ContactUs = () => {

    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const [data, setData] = useState({});
    const [enquiryFor, setEnquiryFor] = useState([]);
    const [blnEnquirySubmitted, setBlnEnquirySubmitted] = useState(false);
    const [countries, setCountries] = useState([]);

    const [form, setForm] = useState({
        name: '',
        email: '',
        country_id: '',
        phone: '',
        enquiry_for_id: '',
        message: '',
    });
    const [errors, setErrors] = useState({});

    const fetchData = (lan) => {
        const headers = {

            'X-Localization': currentLanguage, // Example header to specify language
            // Add other headers as needed
        };
        ApiService.getData(AppEndPoints.contact, headers)
            .then((res) => {
                setData(res.data.data);
                // console.log(res.data.data.);
            })
            .catch((error) => {
                console.error('Error fetching the about details:', error);
            });
    }

    const fetchEnquiry = () => {
        const headers = {

            'X-Localization': currentLanguage, // Example header to specify language
            // Add other headers as needed
        };
        ApiService.getData(AppEndPoints.enquiry_for, headers)
            .then((res) => {
                setEnquiryFor(res.data.data);
                // console.log(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching the about details:', error);
            });
    }

    const resetForm = () => {

        setForm({
          name: '',
          email: '',
          country_id: '',
          phone: '',
          enquiry_for_id: '',
          message: '',
        });
        setErrors({});
        setBlnEnquirySubmitted(false);
        
    
    
    
      };

    const enquirySubmit = () => {

        const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
        // console.log(token);
        const headers = {
            'X-Localization': currentLanguage, // Example header to specify language
            Authorization: `Bearer ${token}`, // Example header to specify language
            'Access-Control-Max-Age': '3600',
            // Add other headers as needed
        };
        // console.log(form.message);  // Log the entire value on form submit

        setBlnEnquirySubmitted(true);
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {

            ApiService.postData(AppEndPoints.enquiry, form, headers)
            .then((res) => {
                console.log(res);
                if(res.errorCode === 0){
                    toast.success('Your message has been sent!');
                    resetForm();
                    getProfile();
                }else {
                    resetForm();
                    getProfile();
                }
            })
            .catch((error) => {
                toast.error(error);
                resetForm();
                getProfile();
            })
            // Submit the form
            // console.log('Form submitted:', form);
        } else {
            setErrors(formErrors);
        }
    };


    const validateForm = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = t('VALIDATION.NAMEREQUIRED');
        if (!form.email) newErrors.email = t('VALIDATION.EMAILREQUIRED');
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = t('VALIDATION.INVALIDEMAIL');
        if (!form.country_id || !form.phone) newErrors.phone = t('VALIDATION.PHONENUMBERREQUIRED');
        if (!form.enquiry_for_id) newErrors.enquiry_for_id = t('VALIDATION.ENQUIRINGFORREQUIRED');
        if (!form.message) newErrors.message = t('VALIDATION.MESSAGEREQUIRED');
        return newErrors;
    };

    const getProfile = async () => {

        try {
            const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
            // console.log(token);
            const headers = {
                'X-Localization': currentLanguage, // Example header to specify language
                Authorization: `Bearer ${token}`, // Example header to specify language
                'Access-Control-Max-Age': '3600',
                // Add other headers as needed
            };
            AuthService.countryCode().then((res) => {
                if (res.data.errorCode === 0) {
                    setCountries(res.data.data);
                }
            });



            ApiService.getData(AppEndPoints.profile, headers).then((res) => {

                // console.log(res?.data.data.phone);

                const name = res?.data?.data.name || '';
                const email = res?.data?.data.email || '';
                const countryCode = res?.data?.data.country_code || '';
                const phoneNumber = res?.data?.data.phone || '';
                const add = res?.data?.data.address || '';
                const country = countries.find((e) => e.phone_code === countryCode);
                const countryId = country ? country.id : '229';
                setForm({
                    name: name,
                    email: email,
                    country_id: countryId,
                    phone: phoneNumber,
                    //   enquiry_for_id: '',
                    //   message: '',
                });
                // console.log(phoneNumber);

                // Store the entire profile data object in localStorage
                localStorage.setItem('profileData', JSON.stringify(res.data));



                // console.log(profile.name);
            })

        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);

        setForm({
            ...form,
            [name]: value,
        });
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        if (loggedIn) {
            getProfile()
        } else {

        }
        fetchData(currentLanguage);
        fetchEnquiry(currentLanguage);

    }, [currentLanguage]);

    return (
        <>


            <div className={`language-${currentLanguage}`}>
                <Helmet>
                    <title>{data?.meta_title || 'Default Title'}</title>
                    <meta name="keywords" content={data?.meta_keywords || 'default keywords'} />
                    <meta name="description" content={data?.meta_description || 'default description'} />
                    <meta name="robots" content="index, follow" />
                </Helmet>


                <div class="contact-section-content">

                    {/*  <!-------About banner----->  */}
                    <section className="banner">
                        <div className="image-sec">
                            <img
                                src={data.banner_image_url}
                                alt className="w-100 d-lg-block d-none" />
                            <img
                                src={data.mobile_banner_image_url}
                                alt className="w-100 d-lg-none" />
                            <div className="text">
                                <h1 className="d-lg-block d-none"></h1>
                                <h1>{data.banner_title}</h1>
                            </div>
                        </div>
                    </section>

                    {/*  <!-------End About banner----->  */}


                    {/*  <!-------Contact-detail----->  */}

                    <section className="contact-detail">
                        <div className="container">
                            <div className="row detail">

                                <div className="leftSec" style={{ textAlign: 'start' }}>
                                    <h4>{t('CONTACT.GETINTOUCH')}</h4>

                                    <div className="d-flex box">
                                        <div className="icon">
                                            <img src={contact} alt=" " />
                                        </div>

                                        <ul>
                                            <h5>{t('CONTACT.SALES')}</h5>
                                            <a href={`tel:${data?.sales?.phone_1}`}>
                                                <li>{data?.sales?.phone_1}</li>
                                            </a>
                                            <a href={`tel:${data?.sales?.phone_2}`}>
                                                <li>{data?.sales?.phone_2}</li>
                                            </a>
                                            <a href={`mailto:${data?.sales?.email}`}>
                                                <li>{data?.sales?.email}</li>
                                            </a>
                                            {/* <li>+971 4 408 7311</li>
                                            <li>sales@letsdrive.ae</li> */}
                                        </ul>
                                    </div>
                                    <div className="d-flex box">
                                        <div className="icon">
                                            <img src={contactfour} alt=" " />
                                        </div>

                                        <ul>
                                            <h5>{t('CONTACT.ACCOUNTSBILLING')}</h5>
                                            <a href={`tel:${data?.accounts?.phone_1}`}>
                                                <li>{data?.accounts?.phone_1}</li>
                                            </a>
                                            <a href={`tel:${data?.accounts?.phone_2}`}>
                                                <li>{data?.accounts?.phone_2}</li>
                                            </a>
                                            {/* <li>+971 4 408 7311</li> */}

                                        </ul>
                                    </div>

                                    <div className="d-flex box">
                                        <div className="icon">
                                            <img src={contacttwo} alt=" " />
                                        </div>

                                        <ul>
                                            <h5>{t('CONTACT.EMERGENCYCONTACT')}</h5>
                                            <a href={`tel:${data?.emergency_contact?.phone_1}`}>
                                                <li>{data?.emergency_contact?.phone_1}</li>
                                            </a>
                                            <a href={`tel:${data?.emergency_contact?.phone_2}`}>
                                                <li>{data?.emergency_contact?.phone_2}</li>
                                            </a>
                                            {/* <li>+971 4 408 7311</li> */}
                                        </ul>
                                    </div>
                                    <div className="d-flex box">
                                        <div className="icon">
                                            <img src={contactone} alt=" " />
                                        </div>

                                        <ul>
                                            <h5>{t('CONTACT.TIME')}</h5>
                                            {data?.time?.map((time, index) => (
                                                <div key={index} className="timeBox">
                                                    <p>{time?.title}</p>
                                                    <p>{time?.day}</p>
                                                    <p>{time?.time}</p>
                                                </div>
                                            ))}
                                            {/* <p>Monday - Saturday</p>

                                            <p>09:00 AM to 07:00 PM</p>
                                            <p>Sunday Closed</p> */}
                                        </ul>
                                    </div>

                                    <div className="social-icon">
                                        <a
                                            href={data?.social_media_links?.facebook}
                                            target="_blank">
                                            <img src={fb} alt="" />
                                        </a>
                                        <a
                                            href={data?.social_media_links?.instagram}
                                            target="_blank">
                                            <img src={insta} alt="" />
                                        </a>
                                        <a
                                            href={data?.social_media_links?.twitter}
                                            target="_blank">
                                            <img src={twitter} alt="" />
                                        </a>
                                        <a
                                            href={data?.social_media_links?.youtube}
                                            target="_blank">
                                            <img src={youtube} alt="" />
                                        </a>
                                    </div>
                                </div>



                                <div className="rightSec" style={{ textAlign: 'start' }}>
                                    <div className="form"
                                    // formGroup={enquiry_form}
                                    >
                                        <div className="row box">
                                            <div className="col-md-6 posRelative" style={{ textAlign: 'start' }}>
                                                <label>{t('CONTACT.NAME')}*</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    placeholder={t('CONTACT.FIRSTNAME')}
                                                    formControlName="name"
                                                    aria-label="First name"
                                                />
                                                {blnEnquirySubmitted && errors.name && (
                                                    <span className="validationMessage">
                                                        {t('VALIDATION.NAMEREQUIRED')}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-md-6 posRelative" style={{ textAlign: 'start' }}>
                                                <label>{t('CONTACT.EMAIL')}*</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={t('CONTACT.EMAIL')}
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    formControlName="email"
                                                    aria-label="Email"
                                                />
                                                {blnEnquirySubmitted && errors.email && (
                                                    <span className="validationMessage">{errors.email}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row box">
                                            <div className="col-md-6 posRelative" style={{ textAlign: 'start' }}>
                                                <label> {t('CONTACT.PHONE')}*</label>
                                                <div className="d-flex">
                                                    <select
                                                        name="country-code"
                                                        value={form.country_id}
                                                        onChange={handleChange}
                                                        formControlName="country_id"
                                                        id="country-code"
                                                    >
                                                        {countries.map((country) => (
                                                            <option key={country.id} value={country.id} selected={country.id === 229}>{country.phone_code}</option>
                                                        ))}
                                                        {/* {countries.map((country, index) => (
                                                    <option
                                                        key={index}
                                                        value={country.id}
                                                        selected={country.id === 229}
                                                    >
                                                        {country?.phone_code}
                                                    </option>
                                                ))} */}
                                                        {/* <option>+91</option>
                                                        <option>+91</option> */}
                                                    </select>
                                                    <input
                                                        type="number"
                                                        className="form-control phne-contact"
                                                        placeholder={t('CONTACT.PHONENUMBER')}
                                                        formControlName="phone"
                                                        value={form.phone}
                                                        // onChange={handleChange}
                                                        aria-label="phonenumber"
                                                    />
                                                    {blnEnquirySubmitted && (errors.phone || errors.country_id) && (
                                                        <span className="validationMessage">{errors.phone || errors.country_id}</span>
                                                    )}
                                                    {/* <span className="validationMessage">
                                                        {t('VALIDATION.PHONENUMBERREQUIRED')}
                                                    </span> */}
                                                </div>
                                            </div>
                                            <div className="col-md-6 posRelative" style={{ textAlign: 'start' }}>
                                                <label>{t('CONTACT.ENQUIREFOR')}*</label>
                                                <div className="d-flex">
                                                    <select
                                                        name="enquiry_for_id"
                                                        value={form.enquiry_for_id}
                                                        onChange={handleChange}
                                                        formControlName="enquiry_for_id"
                                                        id="enquiry_for"
                                                    >
                                                        <option value="" disabled="disabled">
                                                            {t('CONTACT.SELECTCATEGORY')}                                                </option>
                                                        {enquiryFor.map((enq, index) => (
                                                            <option key={index} value={enq.id}>
                                                                {enq.name}
                                                            </option>
                                                        ))}
                                                        {/* <option>General Enquiry</option>
                                                        <option>General Enquiry</option> */}
                                                    </select>

                                                    {blnEnquirySubmitted && errors.enquiry_for_id && (
                                                        <span className="validationMessage">{errors.enquiry_for_id}</span>
                                                    )}
                                                    {/* <span className="validationMessage">
                                                        {t('VALIDATION.ENQUIRINGFORREQUIRED')} 
                                                                                                   </span> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row box">
                                            <div className="col-md-12 posRelative" style={{ textAlign: 'start' }}>
                                                <label>{t('CONTACT.MESSAGE')}*</label>
                                                <textarea
                                                    name="message"
                                                    formControlName="message"
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    form="usrform"
                                                ></textarea>
                                                {blnEnquirySubmitted && errors.message && (

                                                    <span className="validationMessage">
                                                        {t('VALIDATION.MESSAGEREQUIRED')}                                        </span>
                                                )}

                                            </div>
                                        </div>
                                        <div className="send-message"
                                            onClick={enquirySubmit}
                                        >
                                            <a>{t('CONTACT.SENDMESSAGE')}  </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>



                    {/*  <!-------End Contact-detail----->  */}


                    {/*  <!-------Branches----->  */}

                    <section className="branches">
                        <div className="container">
                            <h5>{t('CONTACT.BRANCH')}</h5>
                            <h4>{t('CONTACT.ACCESS')}</h4>
                            <div className="detail">
                                <div className="leftSec" style={{ textAlign: 'start' }}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3632.701786792491!2d54.454063399999995!3d24.4264257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e43b579e179f5%3A0x772847bf72a3faee!2sLet&#39;s%20Drive%20Car%20Rental%20LLC!5e0!3m2!1sen!2sin!4v1675430256778!5m2!1sen!2sin"
                                        width="100%"
                                        height="320"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                    <div className="box">
                                        <p>{data?.location?.[0]?.name}</p>
                                        {/* <p>Building No 49, Office No 4A, Al Bateen Executive Airport - Al Mutrafah St - Al Bateen Zone 1 - Abu Dhabi</p> */}
                                    </div>
                                </div>
                                <div className="leftSec" style={{ textAlign: 'start' }}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.3598561801277!2d55.371932!3d25.123522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x27a5f8851bfa79dd!2zMjXCsDA3JzI0LjciTiA1NcKwMjInMTkuMCJF!5e0!3m2!1sen!2sin!4v1675433020898!5m2!1sen!2sin"
                                        width="100%"
                                        height="320"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                    <div className="box">
                                        <p>{data?.location?.[1]?.name}</p>
                                        {/* <p>Al Zarooni Building, Shop No 2, Dubai Silicon Oasis, Sheikh Mohammed Bin Zayed Road - Dubai</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/*  <!-------End Branches----->  */}
                    <ToastContainer /> {/* Add ToastContainer here */}

                </div>



            </div>
        </>
    );
}

export default ContactUs;
