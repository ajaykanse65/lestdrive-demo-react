import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import { useTranslation, } from "react-i18next";
// import { UntypedFormGroup } from '../../types';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { Dropdown } from 'react-bootstrap';
import { useLanguage } from '../../LanguageContext';
import { useHref } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import AppEndPoints from '../../config/AppEndPoints';
// import './header.css';
import blog from '../../assets/images/header/blog.svg';
import phone from '../../assets/images/header/phone.svg';
import email from '../../assets/images/header/mail.png'
import fb from '../../assets/images/header/fb.svg';
import insta from '../../assets/images/header/insta.svg';
import tweeter from '../../assets/images/header/twitter.svg';
import youtube from '../../assets/images/header/youtube.svg';
import mainlogo from '../../assets/images/header/header-logo.png';
import close from '../../assets/images/header/close.svg';
import rent from '../../assets/images/header/rent.svg';
import brand from '../../assets/images/header/brand.svg';
import mobileLogo from '../../assets/images/header/mob-header-logo.png';
import profileimg from '../../assets/images/header/profile.png';
import spec from '../../assets/images/header/spec1.png';
import brand1 from '../../assets/images/header/brand/1.png';
// import brand2 from '../../assets/images/header/brand/2.png';
// import brand3 from '../../assets/images/header/brand/3.png';
// import brand4 from '../../assets/images/header/brand/4.png';
// import brand5 from '../../assets/images/header/brand/5.png';
// import brand6 from '../../assets/images/header/brand/6.png';
// import brand7 from '../../assets/images/header/brand/7.png';
// import brand8 from '../../assets/images/header/brand/8.png';
// import brand9 from '../../assets/images/header/brand/9.png';
// import brand10 from '../../assets/images/header/brand/10.png';
// import brand11 from '../../assets/images/header/brand/11.png';
// import brand12 from '../../assets/images/header/brand/12.png';
// import brand13 from '../../assets/images/header/brand/13.png';
// import brand14 from '../../assets/images/header/brand/14.png';
// import brand15 from '../../assets/images/header/brand/15.png';
// import brand16 from '../../assets/images/header/brand/16.png';
// import brand17 from '../../assets/images/header/brand/17.png';
// import brand18 from '../../assets/images/header/brand/18.png';
// import brand19 from '../../assets/images/header/brand/19.png';
// import brand20 from '../../assets/images/header/brand/20.png';
// import brand21 from '../../assets/images/header/brand/21.png';
// import brand22 from '../../assets/images/header/brand/22.png';
// import brand23 from '../../assets/images/header/brand/23.png';
// import brand24 from '../../assets/images/header/brand/24.png';
// import brand25 from '../../assets/images/header/brand/25.png';
// import brand26 from '../../assets/images/header/brand/26.png';
import hotDeal from '../../assets/images/header/hot-deals.png';
import logoutimg from '../../assets/images/header/logout.png';
import hot from '../../assets/images/header/hot.svg';
import about from '../../assets/images/header/about.svg';
import faq from '../../assets/images/header/faq.svg';
import contactmob from '../../assets/images/header/contactmob.svg';
import bell from '../../assets/images/header/bell.svg';
import '../../index.css';
import '../../assets/css/english.css';
import '../../assets/css/arabic.css';
import { generateRoutes } from '../../routeUtils';
import AuthService from '../../service/authService';
import EnquireModal from '../../common/EnquireModal';
import { ToastContainer, toast } from 'react-toastify';


function Header({
  selectedLan,
  // setLanguage,
  // headerMediaLinks,
  lstData,
  // goToHome,
  // blnLoggedIn,
  // name,
  // // email,
  // // activeMenu,
  // goToAbout,
  // goToList,
  // showSelectedBrands,
  // brand_details,
  // goToHotDeals,
  // category_details,
  // showSelectedCategory,
  // goToBlog,
  // goToFaq,
  // goToContact,
  blnEnqModal,

  enquiry_form,
  f,

  enquiryFor,
  // countries,

  // blnShowCount,
  // notification,
  // getNotification,
  // goToMyAccount,
  // logOut,
  // openRegister,
  // openLogin,
}) {
  const [showEnquireModal, setShowEnquireModal] = useState(false);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notidropdown, setNotiDropDown] = useState(false);

  // const { language, changeLanguage } = useLanguage();

  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);
  const [enquirycatagory, setEnquiryCatogory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [activeMenu, setActiveMenu] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [countries, setCountries] = useState([]);
  const [blnShowCount, setblnShowCount] = useState(false);
  const [notification, setNotification] = useState([]);

  const paths = {
    contact: {
      from_url: false, // Example value
      to_url: 'contact-us', // Example value
      main_slug: 'contact'
    },
    about: {
      from_url: false, // replace this with your actual condition or value
      to_url: 'about-us', // replace this with your actual URL
      main_slug: 'about'
    }
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNotification = () => {
    setNotiDropDown(!notidropdown);
  };

  const goToMyAccount = () => {
    navigate(currentLanguage === 'ar' ? '/ar/myprofile' : '/en/myprofile')
  }


  const goToBrand = (item) => {
    localStorage.setItem('activeMenu', 'brands');
    setActiveMenu('brands');
    const path = `/brands/${item}`;
    const url = currentLanguage === 'ar' ? `/ar/cheapest-car-rentals${path}` : `/en/cheapest-car-rentals${path}`;
    window.location.href = url;
    navigate(url);
    // window.location.href = url;
  }


  const goToCategory = (item) => {
    localStorage.setItem('activeMenu', 'category');
    setActiveMenu('category');
    const path = `/category/${item}`;
    const url = currentLanguage === 'ar' ? `/ar/cheapest-car-rentals${path}` : `/en/cheapest-car-rentals${path}`;

    // navigate(url);
    window.location.href = url;
  }

  const logOut = () => {

    const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
    // console.log(token);
    const headers = {
      'X-Localization': currentLanguage, // Example header to specify language
      Authorization: `Bearer ${token}`, // Example header to specify language
      'Access-Control-Max-Age': '3600',
      // Add other headers as needed
    };
    // const res = await AuthService.logout(headers);
    AuthService.logout(headers).then((res) => {
      const { errorCode, data } = res.data; // Destructure the response data
      console.log(res.data);
      if (errorCode === 0) {

        localStorage.removeItem('loggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('profileData');

        const path = '/';
        window.location.href = path;
      }

    })




  }
  const lanCheck = generateRoutes();
  if (lanCheck) {
    sessionStorage.setItem('language', lanCheck);
    sessionStorage.removeItem('clicked');
  }
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    countryId: '229',
    address: ''
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    country_id: '',
    phone: '',
    enquiry_for_id: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [blnEnquirySubmitted, setBlnEnquirySubmitted] = useState(false);
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;



  const changeLanguage = (lan) => {

    sessionStorage.setItem('clicked', 'clicked');

    localStorage.setItem('previousUrl', window.location.pathname);
    const strippedCurrent = window.location.pathname.replace(/^\/(en|ar)/, '');
    i18n.changeLanguage(lan);
    const final = `${lan}${strippedCurrent}`;
    window.location.href = final;
    console.log(final);

    // if (lan === 'ar') {
    //   document.body.classList.remove('language-en');
    //   document.body.classList.add('language-ar');
    //   document.body.style.direction = 'rtl';
    // } else {
    //   document.body.classList.remove('language-ar');
    //   document.body.classList.add('language-en');
    //   document.body.style.direction = 'ltr';
    // }


    // if(currentLanguage === 'ar'){
    //   const final = `${currentLanguage}${strippedCurrent}`;
    //   console.log(final);
    //   // window.location.pathname = final;
    // }else if(currentLanguage === 'en'){
    //   const final =  `${currentLanguage}${strippedCurrent}`;
    //   console.log(final);
    //   // window.location.pathname = final;
    // }



    // Store current URL
    // const currentUrl = window.location.pathname;


    // Reload the page and navigate back to the same URL
    // window.location.href = currentUrl;
    // console.log('kuch nhi samj rha he ');
    // sessionStorage.setItem('clicked', 'clicked');

    // Strip the current language prefix if it exists
    // const strippedCurrent = window.location.pathname.replace(/^\/(en|ar)/, '');

    // Change the language in i18n
    // i18n.changeLanguage(lng);

    // Build the new path with the selected language prefix
    // const finalPath = `${lng}${strippedCurrent}`;
    // console.log(finalPath);
    // navigate(finalPath);
    // Update the URL and reload the page
    // history.push(finalPath);
    // window.location.reload();
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);

    setForm({
      ...form,
      [name]: value,
    });
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

        // console.log(res?.data.data.name);

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
          // enquiry_for_id: '',

        });
        // console.log(name);

        // Store the entire profile data object in localStorage
        localStorage.setItem('profileData', JSON.stringify(res.data));


        setProfile({
          name,
          email,
          countryCode,
          phoneNumber,
          countryId,

        });
        // console.log(profile.name);
      })

    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };




  const goToContact = () => {
    //   const url = currentLanguage === 'ar'
    //   ? paths.contact.from_url
    //     ? 'ar/' + paths.about.to_url.split('/')[3]
    //     : 'ar/' + paths.about.to_url
    //   : paths.contact.from_url
    //   ? 'en/' + paths.about.to_url.split('/')[3]
    //   : 'en/' + paths.about.to_url;

    // navigate(`/${url}`);
    // console.log(url);
    const url = currentLanguage === 'ar' ? '/ar/contact-us' : '/en/contact-us';
    // window.location.href = url;
    navigate(url);
    localStorage.setItem('activeMenu', 'contact-us');
    setActiveMenu('contactus');
  };


  const goToList = () => {
    // navigate('/productlist'); // Navigate to '/contact'
    const url = currentLanguage === 'ar' ? '/ar/cheapest-car-rentals' : '/en/cheapest-car-rentals';
    // window.location.href = url;
    navigate(url);
    localStorage.setItem('activeMenu', 'rentcar');
    setActiveMenu('rentcar');
  };

  const openRegister = () => {
    const url = currentLanguage === 'ar' ? '/ar/register' : '/en/register';
    // navigate(currentLanguage === 'ar' ? '/ar/register' : '/en/register')
    window.location.href = url;



    // navigate('/register');
  }

  const openLogin = () => {
    const url = currentLanguage === 'ar' ? '/ar/login' : '/en/login';
    window.location.href = url;

    // navigate('/login');
  }

  const goToAbout = () => {
    
    localStorage.setItem('activeMenu', 'about-us');
    setActiveMenu('about');
    const url = currentLanguage === 'ar' ? '/ar/about-us' : '/en/about-us';
    navigate(url);
    // window.location.href = url;

  };

  const goToHotDeals = () => {
    const url = currentLanguage === 'ar' ? '/ar/hotoffers' : '/en/hotoffers';
    // window.location.href = url;
    navigate(url);
    localStorage.setItem('activeMenu', 'hotoffers');
    setActiveMenu('hotoffers');

    // navigate('/hotoffers'); // Navigate to '/contact'

    localStorage.setItem('activeMenu', 'hotdeals');
    setActiveMenu('hotdeals');
  };

  const goToBlog = () => {
    const url = currentLanguage === 'ar' ? '/ar/blog' : '/en/blog';
    // window.location.href = url;
    navigate(url);

    // navigate('/contactus'); // Navigate to '/contact'

    localStorage.setItem('activeMenu', 'blog');
    setActiveMenu('blog');
  };

  const goToFaq = () => {
    // navigate('/faqs'); // Navigate to '/contact'
    const url = currentLanguage === 'ar' ? '/ar/faqs' : '/en/faqs';
    // window.location.href = url;
    navigate(url);


    localStorage.setItem('activeMenu', 'faqs');
    setActiveMenu('faq');
  };

  const goToHome = () => {
    navigate(currentLanguage === 'ar' ? '/ar' : '/en')

    localStorage.setItem('activeMenu', 'home');
    setActiveMenu('home');
  }


  const enquirySubmit = () => {
    const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
    // console.log(token);
    const headers = {
      'X-Localization': currentLanguage, // Example header to specify language
      Authorization: `Bearer ${token}`, // Example header to specify language
      'Access-Control-Max-Age': '3600',
      // Add other headers as needed
    };

    // console.log(form);  // Log the entire value on form submit

    setBlnEnquirySubmitted(true);
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // Submit the form
      ApiService.postData(AppEndPoints.enquiry, form, headers)
        .then((res) => {
          console.log(res);
          if (res.errorCode === 0) {
            toast.success('Your message has been sent!');
            resetForm();
            getProfile();
          } else {
            resetForm();
            getProfile();
          }
        })
        .catch((error) => {
          resetForm();
          getProfile();
          toast.error(error);
        })
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
  const resetForm = () => {


    setShowEnquireModal(false); // Close modal

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
  const handleOpenModal = () => {
    setShowEnquireModal(true); // Open modal
    // resetForm(); // Reset form when closing the modal

  };

  const handleCloseModal = () => {
    // console.log('start');
    setShowEnquireModal(false); // Close modal
    resetForm(); // Reset form when closing the modal
  };

  const fetchnotification = () => {
    const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
    // console.log(token);
    const headers = {
      'X-Localization': currentLanguage, // Example header to specify language
      Authorization: `Bearer ${token}`, // Example header to specify language
      'Access-Control-Max-Age': '3600',
      // Add other headers as needed
    };
    ApiService.getData(AppEndPoints.notification, headers)
      .then((res) => {
        setNotification(res.data.data);
        // console.log(res.data.data);

      })
      .catch((error) => {
        console.error('Error fetching the about details:', error);
      });

  }


  const fetchData = () => {
    const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
    // console.log(token);
    const headers = {
      'X-Localization': currentLanguage, // Example header to specify language
      Authorization: `Bearer ${token}`, // Example header to specify language
      'Access-Control-Max-Age': '3600',
      // Add other headers as needed
    };
    ApiService.getData(AppEndPoints.header, headers)
      .then((res) => {
        setData(res.data.data);
        // console.log(res.data.data);
        if (res.data.data.unread_count != 0) {
          setblnShowCount(true);
        } else {
          setblnShowCount(false);
        }
        // setAboutDetails(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching the about details:', error);
      });





  }

  const getEnquiryCatogory = () => {
    const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
    // console.log(token);
    const headers = {
      'X-Localization': currentLanguage, // Example header to specify language
      Authorization: `Bearer ${token}`, // Example header to specify language
      'Access-Control-Max-Age': '3600',
      // Add other headers as needed
    };
    try {
      ApiService.getData(AppEndPoints.enquiry_for, headers)
        .then((res) => {
          setEnquiryCatogory(res.data.data);
          // console.log(res.data.data);
        })
        .catch((error) => {
          console.error('Error fetching the about details:', error);
        });
    } catch (error) {
      console.error('Error fetching the about details:', error);
    }
  }

  const getCatogry = () => {
    const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
    // console.log(token);
    const headers = {
      'X-Localization': currentLanguage, // Example header to specify language
      Authorization: `Bearer ${token}`, // Example header to specify language
      'Access-Control-Max-Age': '3600',
      // Add other headers as needed
    };
    try {
      ApiService.getData(AppEndPoints.categories, headers)
        .then((res) => {
          setCategories(res.data.data);
          // console.log(res.data.data);
        })
        .catch((error) => {
          console.error('Error fetching the about details:', error);
        });
    } catch (error) {
      console.error('Error fetching the about details:', error);
    }
  }

  const getBrands = () => {
    const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
    // console.log(token);
    const headers = {
      'X-Localization': currentLanguage, // Example header to specify language
      Authorization: `Bearer ${token}`, // Example header to specify language
      'Access-Control-Max-Age': '3600',
      // Add other headers as needed
    };

    try {
      ApiService.getData(AppEndPoints.brands, headers)
        .then((res) => {
          setBrands(res.data.data);
          // console.log(res.data.data);
        })
        .catch((error) => {
          console.error('Error fetching the about details:', error);
        });
    } catch (error) {
      console.error('Error fetching the about details:', error);
    }
  }

  const fetchCountryData = () => {
    AuthService.countryCode().then((res) => {
      if (res.data.errorCode === 0) {
        setCountries(res.data.data);
      }
    });
  }

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    if (loggedIn) {
      // console.log(loggedIn);
      setIsLoggedIn(true);
      getProfile();
      fetchnotification();

    } else {
      setIsLoggedIn(false);

    }
    fetchData();
    getBrands();
    getCatogry();
    getEnquiryCatogory();
    fetchCountryData();
  }, [currentLanguage]);

  // useEffect(() => {
  //   // This useEffect will run whenever the profile state changes
  //   console.log(profile.email);
  // }, [profile]);


  return (
    <>
      <div className={`language-${currentLanguage}`}>
        <div class="main-header-section">
          <section className="topSec">
            <div className="container">
              <div className="details">
                <div className="rightSec">
                  <div className="language">
                    <a
                      className={`english ${currentLanguage === 'en' ? 'active' : ''}`}
                      onClick={() => changeLanguage('en')}>English
                    </a>
                    <span>|</span>
                    <a
                      className={`arabic ${currentLanguage === 'ar' ? 'active' : ''}`}
                      onClick={() => changeLanguage('ar')}
                    >عربى</a>
                  </div>
                  <div className="socialicon">
                    <a
                      href={data.social_media_links?.facebook}
                      target="_blank">
                      <img src={fb} alt="" />
                    </a>
                    <a
                      href={data.social_media_links?.instagram}
                      target="_blank">
                      <img src={insta} alt="" />
                    </a>
                    <a
                      href={data.social_media_links?.twitter}
                      target="_blank">
                      <img src={tweeter} alt="" />
                    </a>
                    <a
                      href={data.social_media_links?.youtube}
                      target="_blank">
                      <img src={youtube} alt="" />
                    </a>
                  </div>
                  <div className="mobile-connect">
                    <a
                      href={`tel:${data?.phone}`}

                    >
                      <img src={phone} alt="" />
                      {/* +971 4 408 7311 */}

                      {data?.phone}
                    </a>
                  </div>
                </div>
                <div className="leftSec">
                  <ul>
                    <li>
                      <a

                        href={`tel:${data?.phone}`}
                      >
                        <img src={phone} alt="" />{data?.phone}</a>

                    </li>
                    <li>
                      <a
                        href={`mailto:${data?.email}`}
                      >
                        <img src={email} alt="" />{data?.email}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="main-header">
            <div className="container">
              <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                  <a className="navbar-brand d-lg-block d-none" href="#"
                    onClick={goToHome}
                  >
                    <img
                      src={data.logo_url} alt="" />
                  </a>
                  <a className="navbar-brand d-lg-none" href="#"
                    onClick={goToHome}
                  >
                    <img src={data.logo_url} alt="" />
                  </a>

                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex="-1"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                  >
                    <div className="offcanvas-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        <img src={close} alt="" />
                      </button>
                    </div>

                    <div className="offcanvas-body">
                      <ul className="navbar-nav flex-grow-1">
                        {!isLoggedIn && (
                          <a className="navbar-brand d-lg-none mob-head" href="/">
                            <img src={mobileLogo} alt="" />
                          </a>
                        )}
                        {/* <a className="navbar-brand d-lg-none mob-head"
                          onClick={goToHome}

                          href="#">
                          <img src={mobileLogo} alt="" />
                        </a> */}

                        {isLoggedIn && (
                          <div className="user-profile d-lg-none">
                            <div className="user-details">
                              <h4 style={{ textAlign: 'start' }}>{profile.name}</h4>
                              <a href={`mailto:abrahamzack@gmail.com`}>{profile.email}</a>
                            </div>
                          </div>
                        )}


                        <li className="nav-item d-lg-block d-none">
                          <a
                            // className='nav-link'
                            className={`nav-link ${activeMenu === "about" ? "active" : ""}`}
                            onClick={goToAbout}
                          >
                            {t("HOME.ABOUT")}
                          </a>
                        </li>
                        <li className="nav-item d-lg-block d-none">
                          <a
                            // className="nav-link"

                            className={`nav-link ${activeMenu === "rentcar" ? "active" : ""}`}
                            onClick={goToList}
                          >
                            {t("HOME.RENTCAR")}
                          </a>
                        </li>
                        <li className="nav-item d-lg-none">
                          <a
                            // className="nav-link"
                            className={`nav-link ${activeMenu === "rentcar" ? "active" : ""}`}
                            data-bs-dismiss="offcanvas"
                            onClick={goToList}
                          >
                            <img src={rent} alt="" />
                            {t("HOME.RENTCAR")}
                          </a>
                        </li>
                        <li className="nav-item dropdown dropdown-hover position-static d-lg-block d-none">
                          <a
                            // className="car-brand-text nav-link"
                            className={`car-brand-text nav-link ${activeMenu === "brands" ? "active" : ""}`}
                            id="navbarDropdown"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {t("HOME.CARBRANDS")}
                          </a>
                          <div
                            className="custom-display-switch dropdown-menu mt-0 dropdown-menu-right"
                            aria-labelledby="navbarDropdown"
                          >
                            <div className="container">
                              <div className="car-dropdown">
                                {/* <a
                                  data-bs-dismiss="offcanvas"
                                  className="list-group-item list-group-item-action"

                                >
                                  <img src={brand1} alt="" style={{ width: "25px" }} />
                                  Audi
                                </a>
                                <a
                                  data-bs-dismiss="offcanvas"
                                  className="list-group-item list-group-item-action"

                                >
                                  <img src={brand1} alt="" style={{ width: "25px" }} />
                                  Audi
                                </a> */}

                                {brands.map((item, index) => (
                                  <a
                                    key={index}
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => goToBrand(item.slug)}
                                    className="list-group-item list-group-item-action"
                                  >
                                    <img src={item.logo_url} alt="" style={{ width: "25px" }} />
                                    {item.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item dropdown dropdown-hover position-static d-lg-none">
                          <a
                            // className="nav-link"
                            className={`nav-link ${activeMenu === "brands" ? "active" : ""}`}
                            id="navbarDropdown"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img src={brand} alt="" />
                            {t("HOME.CARBRANDS")}
                          </a>
                          <div
                            className="dropdown-menu mt-0 dropdown-menu-right"
                            aria-labelledby="navbarDropdown"
                          >
                            <div className="container">
                              <div className="car-dropdown">
                                {/* <a
                                  data-bs-dismiss="offcanvas"
                                  className="list-group-item list-group-item-action"

                                >
                                  <img src={brand1} alt="" style={{ width: "25px" }} />
                                  Audi
                                </a>
                                <a
                                  data-bs-dismiss="offcanvas"
                                  className="list-group-item list-group-item-action"

                                >
                                  <img src={brand1} alt="" style={{ width: "25px" }} />
                                  Audi
                                </a> */}
                                {brands.map((item, index) => (
                                  <a
                                    key={index}
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => goToBrand(item.slug)}
                                    className="list-group-item list-group-item-action"
                                  >
                                    <img src={item.logo_url} alt="" style={{ width: "25px" }} />
                                    {item.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item d-lg-block d-none">
                          <a
                            // className="nav-link "
                            className={`nav-link ${activeMenu === "hotdeals" ? "active" : ""}`}
                            onClick={goToHotDeals}
                          >
                            <img src={hotDeal} alt="" />
                          </a>
                        </li>
                        <li className="nav-item d-lg-none">
                          <a
                            className="nav-link"
                            data-bs-dismiss="offcanvas"
                            onClick={goToHotDeals}
                          >
                            <img src={hot} alt="" />
                            <img
                              src={hotDeal}
                              alt=""
                              style={{ width: "76px", marginLeft: "2px" }}
                            />
                          </a>
                        </li>
                        <li className="nav-item dropdown dropdown-hover position-static d-lg-block d-none car-categories">
                          <a
                            // className="car-brand-text nav-link "
                            className={`car-brand-text nav-link ${activeMenu === "category" ? "active" : ""}`}
                            id="navbarDropdown"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {t("HOME.CARCATEGORIES")}
                          </a>
                          <div
                            className="dropdown-menu mt-0 dropdown-menu-right"
                            aria-labelledby="navbarDropdown"
                          >
                            <div className="container">
                              <div className="car-dropdown">
                                {/* <a
                                  data-bs-dismiss="offcanvas"
                                  className="list-group-item list-group-item-action"
                                >
                                  <img src={brand1} alt="" style={{ width: "25px" }} />
                                  <span style={{ fontSize: "90%" }}>Audi</span>


                                </a>
                                <a
                                  data-bs-dismiss="offcanvas"
                                  className="list-group-item list-group-item-action"
                                >
                                  <img src={brand1} alt="" style={{ width: "25px" }} />
                                  <span style={{ fontSize: "90%" }}>Audi</span>


                                </a> */}
                                {categories.map((item, index) => (
                                  <a
                                    key={index}
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => goToCategory(item.slug)}
                                    className="list-group-item list-group-item-action"
                                  >
                                    <img src={item.icon_url} alt="" style={{ width: "25px" }} />
                                    <span style={{ fontSize: "90%" }}>{item.name}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item dropdown dropdown-hover position-static d-lg-none">
                          <a
                            // className="nav-link "
                            className={`nav-link ${activeMenu === "category" ? "active" : ""}`}
                            id="navbarDropdown"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img src={brand} alt="" />
                            {t("HOME.CARCATEGORIES")}
                          </a>
                          <div
                            className="dropdown-menu mt-0 dropdown-menu-right"
                            aria-labelledby="navbarDropdown"
                          >
                            <div className="container">
                              <div className="car-dropdown">
                                {/* 
                                <a
                                  data-bs-dismiss="offcanvas"
                                  className="list-group-item list-group-item-action"
                                >
                                  <img src={brand1} alt="" style={{ width: "25px" }} />
                                  <span style={{ fontSize: "90%" }}>Audi</span>


                                </a>
                                <a
                                  data-bs-dismiss="offcanvas"
                                  className="list-group-item list-group-item-action"
                                >
                                  <img src={brand1} alt="" style={{ width: "25px" }} />
                                  <span style={{ fontSize: "90%" }}>Audi</span>


                                </a> */}
                                {categories.map((item, index) => (
                                  <a
                                    key={index}
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => goToCategory(item.slug)}
                                    className="list-group-item list-group-item-action"
                                  >
                                    <img src={item.icon_url} alt="" style={{ width: "25px" }} />
                                    <span style={{ fontSize: "90%" }}>{item.name}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item d-lg-none">
                          <a
                            // className="nav-link "
                            className={`nav-link ${activeMenu === "about" ? "active" : ""}`}
                            data-bs-dismiss="offcanvas"
                            onClick={goToAbout}
                          >
                            <img src={about} alt="" />
                            {t("HOME.ABOUT")}
                          </a>
                        </li>
                        <li className="nav-item d-lg-none">
                          <a
                            // className="nav-link"
                            className={`nav-link ${activeMenu === "blog" ? "active" : ""}`}
                            data-bs-dismiss="offcanvas"
                            onClick={goToBlog}
                          >
                            <img src={blog} alt="" />
                            {t("HOME.OURBLOG")}
                          </a>
                        </li>
                        <li className="nav-item d-lg-none">
                          <a

                            className={`nav-link ${activeMenu === "faq" ? "active" : ""}`}
                            data-bs-dismiss="offcanvas"
                            onClick={goToFaq}
                          >
                            <img src={faq} alt="" />
                            {t("HOME.FAQ")}
                          </a>
                        </li>
                        <li className="nav-item d-lg-block d-none">
                          <a

                            className={`nav-link ${activeMenu === "contactus" ? "active" : ""}`}
                            onClick={goToContact}

                          >
                            {t("HOME.CONTACTUS")}
                          </a>
                        </li>
                        <li className="nav-item d-lg-none">
                          <a
                            className={`nav-link ${activeMenu === "contactus" ? "active" : ""}`}

                            data-bs-dismiss="offcanvas"
                            onClick={goToContact}
                          >
                            <img
                              src={contactmob}
                              alt=""
                              style={{ marginRight: "17px" }}
                            />
                            {t("HOME.CONTACTUS")}
                          </a>
                        </li>
                      </ul>

                      <div className="mobile-contact d-lg-none">
                        <ul>
                          <li>
                            <a
                              href={`tel:${data?.phone}`}
                            >
                              <img src={phone} alt="" />
                              {/* +971 4 408 7311 */}


                              {data?.phone}
                            </a>
                          </li>
                          <li>
                            <a
                              href={`mailto:${data?.email}`}
                              className="mail-to">
                              <img src={email} alt="" />
                              {/* sales@letsdrive.ae */}
                              {data?.email}
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* {!blnLoggedIn && (
                        <div className="account d-flex d-lg-block d-none">
                          <img src="/assets/images/header/profile.svg" alt="" />
                          <ng-container>
                            <a onClick={openRegister}>{t("FOOTER.REGISTER")}</a>
                            <span>/</span>
                            <a onClick={openLogin}>{t("HOME.LOGIN")}</a>
                          </ng-container>
                        </div>
                      )} */}

                      {
                        !isLoggedIn && (
                          <div className="account d-flex d-lg-block d-none">
                            <img src={profileimg} alt="" />
                            <ng-container>
                              <a
                                onClick={openRegister}
                              >{t("FOOTER.REGISTER")}</a>
                              {/* <a onClick={openRegister}>{t("FOOTER.REGISTER")}</a> */}
                              <span>/</span>
                              <a
                                onClick={openLogin}
                              >{t("HOME.LOGIN")}</a>
                              {/* <a onClick={openLogin}>{t("HOME.LOGIN")}</a> */}
                            </ng-container>
                          </div>
                        )
                      }


                      {isLoggedIn && (
                        <div className="sort-by">
                          <div className="dropdown">
                            <p
                              className={`notification-icon ${notidropdown ? 'show' : ''}`}
                              id="dropdownMenuLink"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              onClick={toggleNotification}
                            >
                              <img
                                src={bell}
                                alt=""
                                className="bell"
                                onClick={fetchData}
                              />
                            </p>

                            {blnShowCount && (
                              <div className="notifyCount">
                                {/* <p className="bell-active">2</p> */}
                                <p className="bell-active">{data?.unread_count}</p>
                              </div>
                            )}

                            <div className={`notify-drop-title dropdown-menu dropdown-menu-right ${notidropdown ? 'show' : ''}`}>
                              <div className="row">
                                <div className="col-md-12">
                                  {/* <h5>{t('HOME.ALLNOTIFICATIONS')}</h5> */}
                                  <h5>{data?.unread_count !== 0 ? t("HOME.ALLNOTIFICATIONS") : t("HOME.NONOTIFICATION")}</h5>
                                </div>
                                <div className="col-md-12">
                                  <ul>
                                    {notification.map((message, index) => (
                                      <li key={index} className={message.is_seen ? "active" : ""}>
                                        {message.message}
                                        <p>{message.time}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="dropdown login-dropdown">
                            <p
                              className={`dropdown-toggle ${dropdownOpen ? 'show' : ''}`}
                              id="dropdownMenuLink"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              onClick={toggleDropdown}
                            >
                              <img src={profileimg} alt="Profile" />Hi {profile.name}
                            </p>
                            <ul
                              className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}
                              aria-labelledby="dropdownMenuLink"
                            >
                              <li>
                                <p onClick={goToMyAccount}>
                                  {t("HOME.MYACCOUNT")}
                                </p>
                              </li>
                              <li>
                                <a className="dropdown-item" onClick={logOut}>
                                  <img src={logoutimg} alt="Logout" />
                                  {t("HOME.LOGOUT")}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="account d-lg-none">
                    <div className="dropdown mobDropup">
                      <a
                        className={`btn ${dropdownOpen ? 'show' : ''}`}
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={toggleDropdown}

                      >
                        <img src={profileimg} alt="" />
                      </a>

                      <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
                        aria-labelledby="dropdownMenuLink">
                        {!isLoggedIn && (
                          <>
                            <li>
                              <a onClick={openLogin}>{t("HOME.LOGIN")}</a>
                            </li>

                            <li>
                              <a onClick={openRegister}>{t("FOOTER.REGISTER")}</a>
                            </li>
                          </>
                        )}

                        {isLoggedIn && (
                          <>
                            <h4 onClick={goToMyAccount}>{t("HOME.MYACCOUNT")}</h4>

                            <li onClick={logOut}>
                              <a
                                style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
                              >
                                <img src={logoutimg} alt="" />
                                {t("HOME.LOGOUT")}
                              </a>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>

                  </div>
                </div>
              </nav>
            </div>
          </section>

          {!blnEnquirySubmitted && (
            <a
              onClick={handleOpenModal}
              className="enquire-now"
              // data-bs-toggle="modal"
              data-bs-target="#enquireModal"               >
              {t("HOME.ENQUIRE")}
            </a>
          )}


          {showEnquireModal && (
            <section>
              <div className={`modal modal-lg modal-right fade ${true ? 'show' : ''}`} tabIndex="-1" aria-labelledby="enquireModalLabel"
                aria-hidden="true" style={{ display: showEnquireModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                  <div className="main-content-section">
                    <div className="enquire-show">
                      <a
                        onClick={handleCloseModal}
                        className="enquire-btn"
                      >
                        {t('HOME.ENQUIRE')}
                      </a>
                    </div>
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">{t('HOME.GETACALL')}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                      </div>
                      <div className="modal-body">
                        <div className="form-box" style={{ textAlign: 'start' }}>
                          <div className="enquire">
                            <div className='form'>
                              <div className="row box">
                                <div className="col-lg-6 posRelative">
                                  <label>{t('CONTACT.NAME')}*</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    aria-label="First name"
                                  />
                                  {blnEnquirySubmitted && errors.name && (
                                    <span className="validationMessage">{t('VALIDATION.NAMEREQUIRED')}</span>
                                  )}
                                </div>
                                <div className="col-lg-6 posRelative">
                                  <label>{t('CONTACT.EMAIL')}*</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    aria-label="Email"
                                  />
                                  {blnEnquirySubmitted && errors.email && (
                                    <span className="validationMessage">{errors.email}</span>
                                  )}
                                </div>
                              </div>
                              <div className="row box">
                                <div className="col-lg-6 posRelative">
                                  <label>{t('CONTACT.PHONE')}*</label>
                                  <div className="d-flex">
                                    <select
                                      name="country_id"
                                      value={form.country_id}
                                      onChange={handleChange}
                                      id="country-code"
                                    // className="form-control"
                                    >
                                      {countries.map((country) => (
                                        <option key={country.id} value={country.id} selected={country.id === 229}>{country.phone_code}</option>
                                      ))}
                                    </select>
                                    <input
                                      type="number"
                                      className="form-control phone"
                                      name="phone"
                                      value={form.phone}
                                      onChange={handleChange}
                                      aria-describedby="phoneHelp"
                                    />
                                    {blnEnquirySubmitted && (errors.phone || errors.country_id) && (
                                      <span className="validationMessage">{errors.phone || errors.country_id}</span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-6 posRelative">
                                  <label>{t('CONTACT.ENQUIREFOR')}*</label>
                                  <div className="d-flex">
                                    <select
                                      name="enquiry_for_id"
                                      value={form.enquiry_for_id}
                                      onChange={handleChange}
                                      className="form-control"
                                      id="enquiry_for"
                                    >
                                      <option value="" disabled>{t('CONTACT.SELECTCATEGORY')}</option>
                                      {enquirycatagory.map((enq) => (
                                        <option key={enq.id} value={enq.id}>
                                          {enq.name}
                                        </option>
                                      ))}
                                    </select>
                                    {blnEnquirySubmitted && errors.enquiry_for_id && (
                                      <span className="validationMessage">{errors.enquiry_for_id}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row box">
                                <div className="col-lg-12 posRelative">
                                  <label>{t('CONTACT.MESSAGE')}*</label>
                                  <textarea
                                    // className="form-control"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    aria-label="Message"

                                  ></textarea>
                                  {blnEnquirySubmitted && errors.message && (
                                    <span className="validationMessage">{errors.message}</span>
                                  )}
                                </div>
                              </div>
                              <div className="send-message" onClick={enquirySubmit}>
                                <a>{t('HOME.SENDMESSAGE')}</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </section>


          )}
          <ToastContainer /> {/* Add ToastContainer here */}














        </div>

      </div>
    </>
  );

  // return (
  //   <>
  //     <element class="language-en">
  //       <div class="main-header-section">
  //         <section className="topSec">
  //           <div className="container">
  //             <div className="details">

  //               <div className="rightSec">
  //                 <div className="language">
  //                   <a href="#"
  //                   className={`english ${currentLanguage === 'en' ? 'active' : ''}`} 
  //                   onClick={() => changeLanguage('en')}>English
  //                   </a>
  //                   <span>|</span>
  //                   <a href="#"
  //                   className={`arabic ${currentLanguage === 'ar' ? 'active' : ''}`} 
  //                   onClick={() => changeLanguage('ar')}
  //                    >عربى</a>
  //                 </div>
  //                 <div className="socialicon">
  //                   <a href><img src={fb} alt="" /></a>
  //                   <a href><img src={insta} alt="" /></a>
  //                   <a href><img src={tweeter} alt="" /></a>
  //                   <a href><img src={youtube} alt="" /></a>
  //                 </div>
  //                 <div className="mobile-connect">
  //                   <a href="tel:+971 4 408 7311"><img src={phone} alt /></a>
  //                 </div>
  //               </div>
  //               <div className="leftSec">
  //                 <a href><img src={phone} alt />+971 4 408 7311</a>
  //                 <a href><img src={email} alt />sales@letsdrive.ae</a>
  //               </div>
  //             </div>
  //           </div>
  //         </section>

  //         <section className="main-header">
  //           <div className="container">
  //             <nav className="navbar navbar-expand-lg ">
  //               <div className="container-fluid">
  //                 <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
  //                   <span />
  //                   <span />
  //                   <span />
  //                 </button>
  //                 <a className="navbar-brand d-lg-block d-none" href="#"><img src={mainlogo} alt="" /></a>
  //                 <a className="navbar-brand d-lg-none" href="#"><img src={mobileLogo} alt="" /></a>
  //                 <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
  //                   <div className="offcanvas-header">
  //                     <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><img src={close} alt="" /></button>
  //                   </div>
  //                   <div className="offcanvas-body">
  //                     <ul className="navbar-nav flex-grow-1 pe-3">
  //                       <a className="navbar-brand d-lg-none mob-head" href="#"><img src={mainlogo} alt="" /></a>
  //                       <div className="user-profile d-lg-none d-none">
  //                         <div className="user-image">
  //                           <img src={mainlogo} alt="" />
  //                         </div>
  //                         <div className="user-details">
  //                           <h4>Abraham Zack</h4>
  //                           <a href="mail-to:abrahamzack@gmail.com">abrahamzack@gmail.com</a>
  //                         </div>
  //                       </div>


  //                       <li className="nav-item d-lg-block d-none">
  //                         <a className="nav-link" aria-current="page" href="#">{t('HOME.ABOUT')}</a>
  //                       </li>
  //                       <li className="nav-item d-lg-block d-none">
  //                         <a className="nav-link" href="#">{t('HOME.RENTCAR')}</a>
  //                       </li>
  //                       <li className="nav-item d-lg-none">
  //                         <a className="nav-link" href="#"><img src={spec} alt="" /> {t('HOME.RENTCAR')}</a>
  //                       </li>
  //                       <li className="nav-item dropdown dropdown-hover position-static d-lg-block d-none">
  //                         <a className="nav-link" href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
  //                         {t('HOME.CARBRANDS')}
  //                         </a>
  //                         <div className="dropdown-menu mt-0 dropdown-menu-right" aria-labelledby="navbarDropdown" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
  //                           <div className="container">
  //                             <div className="row my-4">
  //                               <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
  //                                 <div className="list-group list-group-flush">
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src={brand1} alt="" /> Audi</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/2.png" alt="" />Bentley</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/3.png" alt="" />BMW</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/4.png" alt="" />Chevrolet</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/5.png" alt="" />Ferrari</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/6.png" alt="" />Ford</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/7.png" alt="" />GMC</a>
  //                                 </div>
  //                               </div>
  //                               <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
  //                                 <div className="list-group list-group-flush">
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/8.png" alt="" />Lamborghini</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/9.png" alt="" />Land Rover</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/10.png" alt="" />Lexus</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/11.png" alt="" />Maserati</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/12.png" alt="" />Mazda</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/13.png" alt="" />McLaren</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/14.png" alt="" />Mercedes</a>
  //                                 </div>
  //                               </div>
  //                               <div className="col-md-6 col-lg-3 mb-3 mb-md-0">
  //                                 <div className="list-group list-group-flush">
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/15.png" alt="" />Porche</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/16.png" alt="" />Renault</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/17.png" alt="" />Rolls Royce</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/18.png" alt="" />Suzuki</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/19.png" alt="" />Toyota</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/20.png" alt="" />Volkswagen</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/21.png" alt="" />Mitsubishi</a>
  //                                 </div>
  //                               </div>
  //                               <div className="col-md-6 col-lg-3">
  //                                 <div className="list-group list-group-flush">
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/22.png" alt="" />Nissan</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/23.png" alt="" />Peugeot</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/24.png" alt="" />Hyundayi</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/25.png" alt="" />Infiniti</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/26.png" alt="" />Kia</a>
  //                                 </div>
  //                               </div>
  //                             </div>
  //                           </div>
  //                         </div>
  //                       </li>
  //                       <li className="nav-item dropdown dropdown-hover position-static d-lg-none">
  //                         <a className="nav-link" href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false"><img src={spec} alt="" />
  //                         {t('HOME.CARBRANDS')}
  //                         </a>
  //                         <div className="dropdown-menu mt-0 dropdown-menu-right" aria-labelledby="navbarDropdown">
  //                           <div className="container">
  //                             <div className="row my-4">
  //                               <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
  //                                 <div className="list-group list-group-flush">
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/1.png" alt="" /> Audi</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/2.png" alt="" />Bentley</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/3.png" alt="" />BMW</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/4.png" alt="" />Chevrolet</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/5.png" alt="" />Ferrari</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/6.png" alt="" />Ford</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/7.png" alt="" />GMC</a>
  //                                 </div>
  //                               </div>
  //                               <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
  //                                 <div className="list-group list-group-flush">
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/8.png" alt="" />Lamborghini</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/9.png" alt="" />Land Rover</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/10.png" alt="" />Lexus</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/11.png" alt="" />Maserati</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/12.png" alt="" />Mazda</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/13.png" alt="" />McLaren</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/14.png" alt="" />Mercedes</a>
  //                                 </div>
  //                               </div>
  //                               <div className="col-md-6 col-lg-3 mb-3 mb-md-0">
  //                                 <div className="list-group list-group-flush">
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/15.png" alt="" />Porche</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/16.png" alt="" />Renault</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/17.png" alt="" />Rolls Royce</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/18.png" alt="" />Suzuki</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/19.png" alt="" />Toyota</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/20.png" alt="" />Volkswagen</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/21.png" alt="" />Mitsubishi</a>
  //                                 </div>
  //                               </div>
  //                               <div className="col-md-6 col-lg-3">
  //                                 <div className="list-group list-group-flush">
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/22.png" alt="" />Nissan</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/23.png" alt="" />Peugeot</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/24.png" alt="" />Hyundayi</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/25.png" alt="" />Infiniti</a>
  //                                   <a href="#" className="list-group-item list-group-item-action"><img src="/assets/images/header/brand/26.png" alt="" />Kia</a>
  //                                 </div>
  //                               </div>
  //                             </div>
  //                           </div>
  //                         </div>
  //                       </li>
  //                       <li className="nav-item d-lg-block d-none">
  //                         <a className="nav-link" href="#"><img src={hotDeal} alt="" /></a>
  //                       </li>
  //                       <li className="nav-item d-lg-none">
  //                         <a className="nav-link" href="#"><img src={spec} alt="" /><img src={hotDeal} alt="" /></a>
  //                       </li>
  //                       <li className="nav-item d-lg-block d-none">
  //                         <a className="nav-link" href="#">Car Categories</a>
  //                       </li>
  //                       <li className="nav-item d-lg-none">
  //                         <a className="nav-link" href="#"><img src={spec} alt="" /> About Us</a>
  //                       </li>
  //                       <li className="nav-item d-lg-none">
  //                         <a className="nav-link" href="#"><img src={spec} alt="" />Our Blogs</a>
  //                       </li>
  //                       <li className="nav-item d-lg-none">
  //                         <a className="nav-link" href="#"><img src={spec} alt="" />FAQ’s</a>
  //                       </li>
  //                       <li className="nav-item d-lg-block d-none">
  //                         <a className="nav-link" href="#">Contact Us</a>
  //                       </li>
  //                       <li className="nav-item d-lg-none">
  //                         <a className="nav-link" href="#"><img src={spec} alt="" /> Contact Us</a>
  //                       </li>
  //                     </ul>
  //                     <div className="mobile-contact d-lg-none">
  //                       <ul>
  //                         <li><a href="#"><img src={phone} alt="" />+971 7823 2383</a></li>
  //                         <li><a href="#" className="mail-to"><img src={email} alt="" />support@letsdrive.com</a></li>
  //                       </ul>
  //                     </div>

  //                     <div className="account d-flex d-lg-block d-none">
  //                       <img src={profile} alt />
  //                       <a href="register" data-bs-toggle="modal">Register</a>
  //                       <span>/</span>
  //                       <a href="login" data-bs-toggle="modal">Login</a>
  //                     </div>
  //                   </div>
  //                 </div>
  //                 {/*-------Mobile Modal Link----*/}
  //                 <div className="account d-lg-none">
  //                   <div className="dropdown">
  //                     <a className="btn" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
  //                       <img src={profile} alt />
  //                     </a>
  //                     <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
  //                       <li><a href>Login</a></li>
  //                       <li> <a href>Register</a></li>
  //                       <h4>My Account</h4>
  //                       <li> <a href="#"><img src={logout} alt /> Log Out</a></li>
  //                     </ul>
  //                   </div>
  //                 </div>
  //                 {/*-------End Mobile Modal Link----*/}
  //               </div>
  //             </nav>
  //           </div>
  //         </section>


  //         {/* {blnEnqModal && (
  //       <a onClick={resetForm} className="enquire-now" data-bs-toggle="modal">
  //         {t("HOME.ENQUIRE")}
  //       </a>
  //     )} */}

  //     {/* <Modal
  //       className="modal-lg modal-right fade"
  //       show={showEnquireModal}
  //       onHide={() => setShowEnquireModal(false)}
  //       tabIndex="-1"
  //       aria-labelledby="enquireModalLabel"
  //       aria-hidden="true"
  //     >
  //       <Modal.Dialog>
  //         <div className="main-content-section">
  //           <div className="enquire-show">
  //             <a onClick={resetForm} className="enquire-btn">
  //               {t("HOME.ENQUIRE")}
  //             </a>
  //           </div>
  //           <Modal.Content  >
  //             <Modal.Header>
  //               <Modal.Title id="enquireModalLabel">{t("HOME.GETACALL")}</Modal.Title>
  //               <Button variant="close" onClick={() => setShowEnquireModal(false)} />
  //             </Modal.Header>
  //             <Modal.Body>
  //               <div className="form-box">
  //                 <div className="enquire">
  //                   <div className="form" formGroup={enquiry_form}>
  //                     <div className="row box">
  //                       <div className="col-lg-6 posRelative">
  //                         <label>{t("CONTACT.NAME")}*</label>
  //                         <input
  //                           type="text"
  //                           className="form-control"
  //                           formControlName="name"
  //                           aria-label="First name"
  //                         />
  //                         {f.name.errors?.required && (f.name.touched || blnEnquirySubmitted) && (
  //                           <span className="validationMessage">{t("VALIDATION.NAMEREQUIRED")}</span>
  //                         )}
  //                       </div>
  //                       <div className="col-lg-6 posRelative">
  //                         <label>{t("CONTACT.EMAIL")}*</label>
  //                         <input
  //                           type="text"
  //                           className="form-control"
  //                           formControlName="email"
  //                           aria-label="email"
  //                         />
  //                         {f.email.errors?.required && (f.email.touched || blnEnquirySubmitted) && (
  //                           <span className="validationMessage">{t("VALIDATION.EMAILREQUIRED")}</span>
  //                         )}
  //                         {f.email.errors?.pattern && (f.email.touched || blnEnquirySubmitted) && (
  //                           <span className="validationMessage">{t("VALIDATION.INVALIDEMAIL")}</span>
  //                         )}
  //                       </div>
  //                     </div>
  //                     <div className="row box">
  //                       <div className="col-lg-6 posRelative">
  //                         <label>{t("CONTACT.PHONE")}*</label>
  //                         <div className="d-flex">
  //                           <select name="country-code" formControlName="country_id" id="country-code">
  //                             {countries.map((country) => (
  //                               <option
  //                                 key={country.id}
  //                                 value={country.id}
  //                                 selected={country.id === 229}
  //                               >
  //                                 {country?.phone_code}
  //                               </option>
  //                             ))}
  //                           </select>
  //                           <input
  //                             type="number"
  //                             formControlName="phone"
  //                             id="InputContact"
  //                             className="form-control phne"
  //                             aria-describedby="emailHelp"
  //                           />
  //                           {(f.country_id.errors?.required || f.phone.errors?.required) &&
  //                             (f.phone.touched || blnEnquirySubmitted) && (
  //                               <span className="validationMessage">
  //                                 {t("VALIDATION.PHONENUMBERREQUIRED")}
  //                               </span>
  //                             )}
  //                           {f.phone.errors?.pattern && f.phone.value && (f.phone.touched || blnEnquirySubmitted) && (
  //                             <span className="validationMessage">Invalid phone number</span>
  //                           )}
  //                         </div>
  //                       </div>
  //                       <div className="col-lg-6 posRelative">
  //                         <label>{t("CONTACT.ENQUIREFOR")}*</label>
  //                         <div className="d-flex">
  //                           <select
  //                             name="enquiry_for"
  //                             formControlName="enquiry_for_id"
  //                             id="enquiry_for"
  //                           >
  //                             <option value="" disabled>
  //                               {t("CONTACT.SELECTCATEGORY")}
  //                             </option>
  //                             {enquiryFor.map((enq) => (
  //                               <option key={enq.id} value={enq.id}>
  //                                 {enq.name}
  //                               </option>
  //                             ))}
  //                           </select>
  //                           {f.enquiry_for_id.errors?.required &&
  //                             (f.enquiry_for_id.touched || blnEnquirySubmitted) && (
  //                               <span className="validationMessage">
  //                                 {t("VALIDATION.ENQUIRINGFORREQUIRED")}
  //                               </span>
  //                             )}
  //                         </div>
  //                       </div>
  //                     </div>
  //                     <div className="row box">
  //                       <div className="col-lg-12 posRelative">
  //                         <label>{t("CONTACT.MESSAGE")}*</label>
  //                         <textarea
  //                           name="comment"
  //                           formControlName="message"
  //                           form="usrform"
  //                         ></textarea>
  //                         {f.message.errors?.required && (f.message.touched || blnEnquirySubmitted) && (
  //                           <span className="validationMessage">{t("VALIDATION.MESSAGEREQUIRED")}</span>
  //                         )}
  //                       </div>
  //                     </div>
  //                     <div className="send-message" onClick={enquirySubmit}>
  //                       <a>{t("HOME.SENDMESSAGE")}</a>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </Modal.Body>
  //           </Modal.Content>
  //         </div>
  //       </Modal.Dialog>
  //     </Modal> */}


  //       </div>
  //     </element>

  //   </>
  // );
}

export default Header;
