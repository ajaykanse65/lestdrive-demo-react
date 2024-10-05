import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation, } from "react-i18next";
import 'bootstrap/dist/css/bootstrap.min.css';
// import AppSearch from './AppSearch';
import AppSearch from '../../shared/search';
import logofot from '../../assets/images/footer/footer-logo.png';
import fb from '../../assets/images/footer/fb.svg';
import insta from '../../assets/images/footer/insta.svg';
import twitter from '../../assets/images/footer/twitter.svg';
import youtube from '../../assets/images/footer/youtube.svg';
import logo1 from '../../assets/images/footer/f-logo1.png';
import logo2 from '../../assets/images/footer/f-logo2.png';
import loc from '../../assets/images/footer/loc.svg';
import account from '../../assets/images/footer/account.svg';
import sale from '../../assets/images/footer/sales.png';
import home from '../../assets/images/footer/home.svg';
import car from '../../assets/images/footer/car.svg';
import search from '../../assets/images/footer/search.svg';
import notification from '../../assets/images/footer/bell.svg';
import emg from '../../assets/images/footer/emergency.svg';
import contact from '../../assets/images/contact/1.svg';
import whatsapp from '../../assets/images/home/whatsapp-fixed.png';
import '../../index.css';
import '../../assets/css/arabic.css';
import '../../assets/css/english.css';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import AppEndPoints from '../../config/AppEndPoints';
import StaticMethod from '../../service/staticmethod';

function Footer() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState({});
  const [times, setTimes] = useState({ times: [] });
  const [cities, setCities] = useState([]);
  const [activeFooter, setActiveFooter] = useState('home');
  const [blnSearchOpen, setBlnSearchOpen] = useState(false);

  const openSearch = () => {
    setBlnSearchOpen(true);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const closeSearch = () => {
    setBlnSearchOpen(false);
  };

  const goToHomePage = () => {
    navigate(currentLanguage === 'ar' ? '/ar' : '/en')

    setActiveFooter('home');
    // Add navigation logic here
  };

  const goToCarListing = () => {
    const url = currentLanguage === 'ar' ? '/ar/cheapest-car-rentals' : '/en/cheapest-car-rentals';
    window.location.href = url;
    setActiveFooter('cars');
    // Add navigation logic here
  };

  const goToSearch = () => {
    openSearch();
    setActiveFooter('search');
    // Add navigation logic here
  };

  const goToNotification = () => {

    const url = currentLanguage === 'ar' ? '/ar/shared/notification' : '/en/shared/notification';
    window.location.href = url;
    setActiveFooter('notification');
    // Add navigation logic here
  };


  const checkLogin =() => {
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    if(loggedIn){
      goToNotification();
    }else{
      const url = currentLanguage === 'ar' ? '/ar/login' : '/en/login';
      window.location.href = url;
    }

  }

  const goToAbout = () => {
    // navigate('/about'); // Navigate to '/contact'
    const url = currentLanguage === 'ar' ? '/ar/about-us' : '/en/about-us';
    window.location.href = url;
    localStorage.setItem('activeMenu', 'about-us');

    setActiveFooter('about');
  };



  const goToList = () => {
    // navigate('/productlist'); // Navigate to '/contact'
    const navroute = 'cheapest-car-rentals';
    const url = currentLanguage === 'ar' ? '/ar/cheapest-car-rentals' : '/en/cheapest-car-rentals';
    window.location.href = url;
    localStorage.setItem('activeMenu', 'productlist');
    setActiveFooter('productlist');
  };

  const goToOffers = () => {
    // navigate('/about'); // Navigate to '/contact'
    const url = currentLanguage === 'ar' ? '/ar/hotoffers' : '/en/hotoffers';
    window.location.href = url;
    localStorage.setItem('activeMenu', 'hotoffers');

    setActiveFooter('hotoffers');
  };

  const goToBlogs = () => {
    const url = currentLanguage === 'ar' ? '/ar/blog' : '/en/blog';
    window.location.href = url;
    localStorage.setItem('activeMenu', 'blog');

    setActiveFooter('blog');
  };

  const goToFaq = () => {
    const url = currentLanguage === 'ar' ? '/ar/faqs' : '/en/faqs';
    window.location.href = url;
    localStorage.setItem('activeMenu', 'faqs');

    setActiveFooter('faqs');
  };

  const goToPrivacyPolicy = () => {
    // navigate('/privacy'); // Navigate to '/contact'
    const url = currentLanguage === 'ar' ? '/ar/privacy' : '/en/privacy';
    window.location.href = url;
    localStorage.setItem('activeMenu', 'privacy');


    setActiveFooter('privacy');
  };
  const goToTermsConditions = () => {
    // navigate('/terms-condition'); // Navigate to '/contact'
    const url = currentLanguage === 'ar' ? '/ar/terms-condition' : '/en/terms-condition';
    window.location.href = url;
    localStorage.setItem('activeMenu', 'terms-condition');

    setActiveFooter('terms-condition');
  };

  const goToContact = () => {
    // navigate('/contactus'); // Navigate to '/contact'
    const url = currentLanguage === 'ar' ? '/ar/contact-us' : '/en/contact-us';
    window.location.href = url;
    localStorage.setItem('activeMenu', 'contact-us');

    setActiveFooter('contactus');
  };


  const fetchData = (lan) => {
    const headers = {

      'X-Localization': currentLanguage, // Example header to specify language
      // Add other headers as needed
    };
    ApiService.getData(AppEndPoints.footer, headers)
      .then((res) => {
        setData(res.data.data);
        setTimes(res.data.data);
        // setAboutDetails(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching the about details:', error);
      });

    ApiService.getData(AppEndPoints.cities, headers)
      .then((res) => {
        setCities(res.data.data);
        // setAboutDetails(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching the about details:', error);
      });
  }

  useEffect(() => {
    fetchData(currentLanguage);
  }, [currentLanguage]);

  return (
    <>
      <div className={`language-${currentLanguage}`}>
        {/* Footer Top */}
        <div class="footer-content-section">

          <section className="footer-top-sec" style={{ textAlign: 'start' }}>
            <div className="container">
              <div className="details">
                <div className="box">
                  <img src={data?.feature_icon_1_url} alt />
                  {/* <img src={pickup} alt="" /> */}
                  <div className="content">
                    {/* <h5>Car Pickup and Pickoff</h5> */}
                    <h5>{data?.feature_title_1}</h5>
                    {/* <p>Choose your location and we will be there on time.</p> */}
                    <p>{data?.feature_description_1}</p>
                  </div>
                </div>
                <div className="box">
                  <img src={data?.feature_icon_2_url} alt />
                  {/* <img src={priceTag} alt="" /> */}
                  <div className="content">
                    {/* <h5>Flexible Pricing Plans</h5> */}
                    <h5>{data?.feature_title_2}</h5>
                    {/* <p>Choose your choice of car within your car rental budget.</p> */}
                    <p>{data?.feature_description_2}</p>
                  </div>
                </div>
                <div className="box">
                  <img src={data?.feature_icon_3_url} alt />
                  {/* <img src={carWash} alt /> */}
                  <div className="content">
                    {/* <h5>Well Services Car Collection</h5> */}
                    <h5>{data?.feature_title_3}</h5>
                    {/* <p>Get to drive newly purchased car from top brands every time.</p> */}
                    <p>{data?.feature_description_3}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Main */}

          <section className="footerSec">
            <div className="details info-desktop-screen">
              <ul>
                <li>
                  <a
                    onClick={goToAbout}
                  >{t('HOME.ABOUT')}</a>
                </li>
                <li>
                  <a
                    onClick={goToList}
                  >{t('HOME.RENTCAR')}</a>
                </li>
                <li>
                  <a
                    onClick={goToOffers}
                  >{t('HOME.HOT')}</a>
                </li>
                <li>
                  <a
                    onClick={goToBlogs}
                  >{t('HOME.OURBLOG')}</a>
                </li>
                <li>
                  <a
                    onClick={goToFaq}
                  >{t('HOME.FAQ')}</a>
                </li>

                <li className="dropdown">
                  <a
                    href={currentLanguage === 'ar' ? '/ar/our-locations' : '/en/our-locations'}

                  >
                    {t('HOME.LOCATION')}
                  </a>
                  <span
                    className={`dropdown-toggle ${dropdownOpen ? 'show' : ''}`}
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded={dropdownOpen ? "true" : "false"}
                    onClick={toggleDropdown}
                  ></span>
                  <ul
                    className={`selectPlace dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}
                    aria-labelledby="dropdownMenuLink"
                  >
                    {cities.map((city, index) => (
                      <div className="place" key={index}
                      onClick={goToList}
                      // onClick={() => console.log(`Navigate to ${city.name}`)}
                      >
                        <p>{city?.name}</p>
                      </div>
                    ))}
                  </ul>
                </li>

                <li>
                  <a
                    onClick={goToPrivacyPolicy}
                  >{t('HOME.PRIVACY')}</a>
                </li>
                <li style={{ maxWidth: '25%' }}>
                  <a
                    onClick={goToTermsConditions}
                  >{t('HOME.TERMS')}</a>
                </li>
                <li>
                  <a
                    onClick={goToContact}
                  >{t('HOME.CONTACTUS')}</a>
                </li>
              </ul>
            </div>

            <div className="container">
              <div className="footerTop">
                <div className="leftSec">
                  <div className="details logo-footer">
                    <div className="logo">
                      <a
                        onClick={goToHomePage}
                        href="">
                        <img src={logofot} alt="Footer Logo" />
                      </a>
                    </div>
                    <ul className="footer-social">
                      <li>
                        <a
                          href={data.social_media_links?.facebook}
                          target="_blank" rel="noopener noreferrer">
                          <img src={fb} alt="Facebook" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={data.social_media_links?.instagram}
                          target="_blank" rel="noopener noreferrer">
                          <img src={insta} alt="Instagram" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={data.social_media_links?.twitter}
                          target="_blank" rel="noopener noreferrer">
                          <img src={twitter} alt="Twitter" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={data.social_media_links?.youtube}
                          target="_blank" rel="noopener noreferrer">
                          <img src={youtube} alt="YouTube" />
                        </a>
                      </li>
                    </ul>
                    <ul className="certified-logo d-lg-none d-flex">
                      <li>
                        <a
                          href={data?.certification_file_1_url}
                          target="_blank" rel="noopener noreferrer">
                          <img
                            src={data?.certification_icon_1_url}
                            // src={logo1}
                            alt="Certification 1" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={data?.certification_file_2_url}
                          target="_blank" rel="noopener noreferrer">
                          <img
                            src={data?.certification_icon_2_url}
                            // src={logo2}
                            alt="Certification 2" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="details info-mobile-screen">
                  <ul>
                    <li>
                      <a
                        onClick={goToAbout}
                      >{t('HOME.ABOUT')}</a>
                    </li>
                    <li>
                      <a
                        onClick={goToList}
                      >{t('HOME.RENTCAR')}</a>
                    </li>
                    <li>
                      <a
                        onClick={goToOffers}
                      >{t('HOME.HOT')}</a>
                    </li>
                    <li>
                      <a
                        onClick={goToBlogs}
                      >{t('HOME.OURBLOG')}</a>
                    </li>
                    {/* <li className="dropdown">
                      <a
                        href={currentLanguage === 'ar' ? '/ar/our-locations' : '/en/our-locations'}
                        className="dropdown-toggle"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {t('HOME.LOCATION')}
                      </a>
                      <ul className="selectPlace dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                        {cities.map((city, index) => (
                          <li className="dropdown-item" key={index}
                          //  onClick={() => goToCity(city)}
                          >
                            {city?.name}
                          </li>
                        ))}
                      </ul>
                    </li> */}

                    <li className="dropdown">
                      <a
                        href={currentLanguage === 'ar' ? '/ar/our-locations' : '/en/our-locations'}

                      >
                        {t('HOME.LOCATION')}
                      </a>
                      <span
                        className={`dropdown-toggle ${dropdownOpen ? 'show' : ''}`}
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded={dropdownOpen ? "true" : "false"}
                        onClick={toggleDropdown}
                      ></span>
                      <ul
                        className={`selectPlace dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}
                        aria-labelledby="dropdownMenuLink"
                      >
                        {cities.map((city, index) => (
                          <div className="place" key={index}
                          // onClick={() => console.log(`Navigate to ${city.name}`)}
                          >
                            <p>{city?.name}</p>
                          </div>
                        ))}
                      </ul>
                    </li>

                    <li>
                      <a
                        onClick={goToFaq}
                      >{t('HOME.FAQ')}</a>
                    </li>
                    <li>
                      <a
                        onClick={goToPrivacyPolicy}
                      >{t('HOME.PRIVACY')}</a>
                    </li>
                    <li>
                      <a
                        onClick={goToTermsConditions}
                      >{t('HOME.TERMS')}</a>
                    </li>
                    <li>
                      <a
                        onClick={goToContact}
                      >{t('HOME.CONTACTUS')}</a>
                    </li>
                  </ul>
                </div>
                <div className="rightSec">
                  <div className="details get-in-touch">
                    <div className="d-flex detail d-md-none">
                      <div className="icon">
                        <img src={loc} alt="Location" />
                      </div>
                      <ul>
                        <h5>{t('HOME.LOCATION')}</h5>
                        <li>
                          <a href={data?.location_1_link} target="_blank" rel="noopener noreferrer">
                            {data?.location_1}
                          </a>
                          {/* <li>Speedy Drive Car Rental,</li>
                          <li>Retail 04, Maison De Ville</li>
                          <li>Breeze Hotel.</li> */}
                        </li>
                      </ul>
                    </div>
                    <div className="d-flex detail d-md-none">
                      <div className="icon">
                        <img src={account} alt="Account" />
                      </div>
                      <ul>
                        <h5>{t('CONTACT.ACCOUNTSBILLING')}</h5>
                        {/* <li><a href>+971 5 1234 56 01</a></li>
                        <li><a href>+971 5 1234 56 01</a></li>
                        <li><a href>billing@letsdrive.com</a> </li> */}
                        <li>
                          <a href={`tel:${data.accounts?.phone_1}`}>{data.accounts?.phone_1}</a>
                        </li>
                        {/* <li>
                          <a href={`tel:${data.accounts?.phone_2}`}>{data.accounts?.phone_2}</a>
                        </li> */}
                        <li>
                          <a href={`mailto:${data.accounts?.email}`}>{data.accounts?.email}</a>
                        </li>
                      </ul>
                    </div>
                    <div className="d-flex location detail d-md-none">
                      <div className="icon" style={{ opacity: 0 }}>
                        <img src={loc} alt="Location" />
                      </div>
                      <ul>
                        <li>
                          <a href={data?.location_2_link} target="_blank" rel="noopener noreferrer">
                            {data?.location_2}
                          </a>
                        </li>
                        {/* <li>Speedy Drive Car Rental,</li>
                        <li>Retail 04, Maison De Ville</li>
                        <li>Breeze Hotel.</li> */}
                      </ul>
                    </div>
                    <div className="d-flex detail d-md-none">
                      <div className="icon">
                        <img src={sale} alt="Sales" />
                      </div>
                      <ul>
                        <h5>{t('CONTACT.SALES')}</h5>
                        {/* <li><a href>+971 5 1234 56 01</a></li>
                        <li><a href>+971 5 1234 56 01</a></li>
                        <li><a href>sales@letsdrive.com</a> </li> */}
                        <li>
                          <a href={`tel:${data.sales?.phone_1}`}>{data.sales?.phone_1}</a>
                        </li>
                        <li>
                          <a href={`tel:${data.sales?.phone_2}`}>{data.sales?.phone_2}</a>
                        </li>
                        <li>
                          <a href={`mailto:${data.sales?.email}`}>{data.sales?.email}</a>
                        </li>
                      </ul>
                    </div>
                    <div className="d-flex detail d-md-none">
                      <div className="icon">
                        <img src={emg} alt="Emergency" />
                      </div>
                      <ul>
                        <h5>{t('CONTACT.EMERGENCYCONTACT')}</h5>
                        {/* <li><a href>+971 5 1234 56 01</a></li>
                        <li><a href>+971 5 1234 56 01</a></li> */}
                        <li>
                          <a href={`tel:${data.emergency_contact?.phone_1}`}>{data.emergency_contact?.phone_1}</a>
                        </li>
                        <li>
                          <a href={`tel:${data.emergency_contact?.phone_2}`}>{data.emergency_contact?.phone_2}</a>
                        </li>
                      </ul>
                    </div>
                    <div className="d-flex detail d-md-none">
                      <div className="icon">
                        <img src={contact} alt=" " />
                      </div>
                      <ul>
                        <h5>{t('CONTACT.TIME')}</h5>
                        {times?.times.map((time, index) => (
                          <div className="timeBox" key={index}>

                            <li>{time?.day}</li>
                            <li>{time?.time}</li>
                          </div>
                        ))}
                      </ul>
                    </div>
                    <div className="box d-md-block d-none">
                      <div className="d-flex detail">
                        <div className="icon">
                          <img src={loc} alt="Location" />
                        </div>
                        <ul>
                          <h5>{t('HOME.LOCATION')}</h5>
                          <li>
                            <a href={data?.location_1_link} target="_blank" rel="noopener noreferrer">
                              {data?.location_1}
                            </a>
                          </li>
                          {/* <li>Speedy Drive Car Rental,</li>
                          <li>Retail 04, Maison De Ville</li>
                          <li>Breeze Hotel.</li> */}
                        </ul>
                      </div>
                      <div className="d-flex detail">
                        <div className="icon">
                          <img src={loc} alt="Location" />
                        </div>
                        <ul>
                          <h5>{t('HOME.LOCATION')}</h5>
                          <li>
                            <a href={data?.location_2_link} target="_blank" rel="noopener noreferrer">
                              {data?.location_2}
                            </a>
                          </li>
                          {/* <li>Speedy Drive Car Rental,</li>
                          <li>Retail 04, Maison De Ville</li>
                          <li>Breeze Hotel.</li> */}
                        </ul>
                      </div>
                    </div>
                    <div className="box d-md-block d-none">
                      <div className="d-flex detail">
                        <div className="icon">
                          <img src={account} alt="Account" />
                        </div>
                        <ul>
                          <h5>{t('CONTACT.ACCOUNTSBILLING')}</h5>
                          {/* <li><a href>+971 5 1234 56 01</a></li>
                          <li><a href>+971 5 1234 56 01</a></li>
                          <li><a href>billing@letsdrive.com</a> </li> */}
                          <li>
                            <a href={`tel:${data.accounts?.phone_1}`}>{data.accounts?.phone_1}</a>
                          </li>
                          <li>
                            <a href={`tel:${data.accounts?.phone_2}`}>{data.accounts?.phone_2}</a>
                          </li>
                          <li>
                            <a href={`mailto:${data.accounts?.email}`}>{data.accounts?.email}</a>
                          </li>
                        </ul>
                      </div>
                      <div className="d-flex detail">
                        <div className="icon">
                          <img src={contact} alt=" " />
                        </div>
                        <ul>
                          <div className="timeSchedule">
                            <h5>{t('CONTACT.TIME')}</h5>
                            {times?.times.map((time, index) => (
                              <div className="timeBox" key={index}>
                                <li>{time?.title}</li>
                                <li>{time?.day}</li>
                                <li>{time?.time}</li>
                              </div>
                            ))}
                          </div>
                        </ul>
                      </div>
                    </div>
                    <div className="box d-md-block d-none">
                      <div className="d-flex detail">
                        <div className="icon">
                          <img src={sale} alt="Sales" />
                        </div>
                        <ul>
                          <h5>{t('CONTACT.SALES')}</h5>
                          {/* <li><a href>+971 5 1234 56 01</a></li>
                          <li><a href>+971 5 1234 56 01</a></li>
                          <li><a href>sales@letsdrive.com</a> </li> */}
                          <li>
                            <a href={`tel:${data.sales?.phone_1}`}>{data.sales?.phone_1}</a>
                          </li>
                          <li>
                            <a href={`tel:${data.sales?.phone_2}`}>{data.sales?.phone_2}</a>
                          </li>
                          <li>
                            <a href={`mailto:${data.sales?.email}`}>{data.sales?.email}</a>
                          </li>
                        </ul>
                      </div>
                      <div className="d-flex detail">
                        <div className="icon">
                          <img src={emg} alt="Emergency" />
                        </div>
                        <ul>
                          <h5>{t('CONTACT.EMERGENCYCONTACT')}</h5>
                          {/* <li><a href>+971 5 1234 56 01</a></li>
                          <li><a href>+971 5 1234 56 01</a></li> */}
                          <li>
                            <a href={`tel:${data.emergency_contact?.phone_1}`}>{data.emergency_contact?.phone_1}</a>
                          </li>
                          <li>
                            <a href={`tel:${data.emergency_contact?.phone_2}`}>{data.emergency_contact?.phone_2}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="box d-lg-block d-none" style={{ alignSelf: 'center' }}>
                      <div className="d-flex detail">
                        <ul className="certified-logo d-flex">
                          <li>
                            <a
                              href={data?.certification_file_1_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={data?.certification_icon_1_url}
                                // src={logo1}
                                alt="Certification 1" />
                            </a>
                          </li>
                          <li>
                            <a
                              href={data?.certification_file_2_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={data?.certification_icon_2_url}
                                // src={logo2}
                                alt="Certification 2" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="copyright">
            <div className="container">
              <div className="details">
                <div className="leftSec">
                  <p>
                    © {t('COPYRIGHT.COPYRIGHT')} {currentYear}
                    <a href="#" target="_blank" rel="noopener noreferrer">

                      <span> Let’s Drive.</span>
                    </a>
                    {t('COPYRIGHT.ALLRIGHTS')}
                  </p>
                </div>
                <div className="rightSec">
                  <p>
                    {t('COPYRIGHT.POWEREDBY')}
                    <a href="" target="_blank" rel="noopener noreferrer">
                      <span> </span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* mobile bottom tab */}
        <section className="mobileBar">
          <div className="container">
            <div className="frame">
              <div className="contents">
                <a
                  onClick={goToHomePage}
                  className={`wrap ${activeFooter === 'home' ? 'active' : ''}`}
                >
                  <div className="icon">
                    <img src={home} alt="Home" />
                  </div>
                  {/* <p className="label">{t('HOME.HOME')}</p> */}
                </a>
                <a
                  onClick={goToCarListing}
                  className={`wrap ${activeFooter === 'cars' ? 'active' : ''}`}
                >
                  <div className="icon">
                    <img src={car} alt="Car" />
                  </div>
                  {/* <p className="label">{t('HOME.RENTCAR')}</p> */}
                </a>
                <a
                  onClick={goToSearch}
                  className={`wrap ${activeFooter === 'search' ? 'active' : ''}`}
                >
                  <div className="icon">
                    <img src={search} alt="Search" />
                  </div>
                  {/* <p className="label">{t('HOME.SEARCH')}</p> */}
                </a>
                <a
                  onClick={checkLogin}
                  className={`wrap ${activeFooter === 'notification' ? 'active' : ''}`}
                >
                  <div className="icon">
                    <img src={notification} alt="Notification" />
                  </div>
                  {/* <p className="label">{t('HOME.NOTIFICATION')}</p> */}
                </a>
              </div>
            </div>
          </div>
        </section>

        <a class="float" target="_blank">
          <img
            src={whatsapp}
            onClick={StaticMethod.openWhatsApp}
            alt=""
          />
        </a>

        <section className="searchSec">
          {/* <Button onClick={openSearch}>Open Search</Button> */}
          <Modal
            show={blnSearchOpen}
            onHide={closeSearch}
            centered
          >
            <Modal.Header>
              <Modal.Title>
                {t('HOME.SEARCH')}
              </Modal.Title>
              <Button
                id="searchClose"
                variant="close"
                onClick={closeSearch}
                aria-label="Close"
              ></Button>
            </Modal.Header>
            <Modal.Body>
              {blnSearchOpen && (
                <AppSearch openSearch={openSearch} close={closeSearch} />
              )}
            </Modal.Body>
          </Modal>
        </section>




      </div>




    </>
  );
}

export default Footer;
