import React, { useState, useEffect, } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { useTranslation, } from "react-i18next";
import Multiselect from 'react-multiselect-checkbox';
import pone from '../assets/images/product-details/product1.jpg';
import ptwo from '../assets/images/product-details/product2.jpg';
import shareit from '../assets/images/product-details/share-it.png';
import petrol from '../assets/images/home/spec1.png';
import tick from '../assets/images/home/tick.svg';
import whatsapp from '../assets/images/home/whatsapp.png';
import profile from '../assets/images/header/profile.svg';
import globe from '../assets/images/product-details/globe.png';
import prev from '../assets/images/home/latest-prev.png';
import next from '../assets/images/home/latest-next.png';
import close from '../assets/images/home/close.png';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, PinterestShareButton, RedditShareButton, TelegramShareButton, WhatsappShareButton, EmailShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, PinterestIcon, RedditIcon, TelegramIcon, WhatsappIcon, EmailIcon, VKIcon, LineIcon, VKShareButton } from 'react-share';
import productService from '../service/product-service';
import StaticMethod from '../service/staticmethod';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';
import BookSection from '../booking-flow/booking-sec';
// import BookNowComponent from '../booking-flow/estbooksec';



const sanitizeContent = (htmlContent) => {
    return sanitizeHtml(htmlContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['span']),
        allowedAttributes: {
            '*': ['style', 'id', 'dir', 'className'],
        },
    });
};
const ProductDetails = ({ details, dropdownSettings, onItemSelect, lstSelectedAddOn }) => {
    const { id } = useParams()
    const [expanded, setExpanded] = useState(null);
    const currentUrl = window.location.href;
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [carImages, setCarImages] = useState({ images: [], filters: [], specifications: [], requirements: [], related_cars: [] });
    const [showModal, setShowModal] = useState(false);
    const [blnBookNowOpen, setBlnBookNowOpen] = useState(true);
    const [openBookSec, setOpenBookSec] = useState(false);
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [blnInvalidOtp, setBlnInvalidOtp] = useState(false);
    const [blnSendOTP, setBlnSendOTP] = useState(false);
    const otpErrorMessage = "Invalid OTP. Please try again.";
    const phoneNumber = "+1234567890";
    const [categoryId, setCategoryId] = useState("");
    const [carId, setCarId] = useState("");
    const [brandName, setBrandName] = useState("");
    const [carName, setCarName] = useState("");
    const [addOns, setAddOns] = useState([]);
    const [carImg, setCarImg] = useState("");
    const gotoCarRentalList = () => {
        navigate(-1); // This will navigate back to the previous page
    }

    const handleAccordionClick = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    const goToCategory = (item) => {
        const path = `cheapest-car-rentals/category/${item}`;
        const url = currentLanguage === 'ar' ? `/ar/${path}` : `/en/${path}`;
        window.location.href = url;
      }

    const openBookingModal1 = async (data) => {
        // const response = await data.JSON();

        console.log(data.carImages);
        // console.log(details);
        // setOpenBookSec(true);

        const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        console.log(loggedIn);
        if (loggedIn) {
            // const result = await StaticMethod.checkBookStatus();
            // console.log(result);
            // if (result.isPhone && result.isVerified) {

            // }
            setCarId(data.carImages.id);
            setBrandName(data.carImages.brand);
            setCarName(data.carImages.name);
            setCarImg(data.carImages.thumbnail_image_url);
            setOpenBookSec(true);

        } else {
            const url = currentLanguage === 'ar' ? '/ar/login' : '/en/login';
            window.location.href = url;
        }

        // Logic for opening booking modal
    };

    const openBookingModal = async (data) => {
        console.log(data);
    
        const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        console.log(loggedIn);
        if (loggedIn) {
            // If logged in, set the car details and open the booking section
            setCarId(data.carImages.id);
            setBrandName(data.carImages.brand);
            setCarName(data.carImages.name);
            setCarImg(data.carImages.thumbnail_image_url);
            setOpenBookSec(true);
        } else {
            // If not logged in, redirect to login page and pass current URL as a redirect parameter
            const currentUrl = window.location.href; // Capture the current page URL
            const redirectUrl = encodeURIComponent(currentUrl); // Encode the URL
            const loginUrl = currentLanguage === 'ar' ? `/ar/login?redirect_url=${redirectUrl}` : `/en/login?redirect_url=${redirectUrl}`;
            window.location.href = loginUrl;
        }
    };
    

    // const openWhatsApp = () => {
    //     // Logic for opening WhatsApp
    // };

    const shareIt = () => {
        // Logic for sharing
    };
    const latestRentalConfig = {
        loop: true,

        spaceBetween: 10,
    
        navigation: {
          nextEl: '.slider-nex',
          prevEl: '.slider-pre',
        },
        breakpoints: {
          1200: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          320: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
        },
    }


    const buttonStyle = {
        
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    };
    const checkClicked = (event, index) => {
        setSelectedTab(index);
    };

    const ProductImageslider = {
        // slidesPerView: 3,
        autoplay: true,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.slider-nex',
            prevEl: '.slider-pre',
        },
        initialSlide: 0,
    };

    const closeBookNow = () => {
        setOpenBookSec(false);
    };






    const goToDetails = (slug) => {
        // Function to go to car details page
    };

    const close = () => {
        setShowModal(false);
        setBlnBookNowOpen(false);
    };

    const openModal = () => {
        setShowModal(true);
        setBlnBookNowOpen(true);
    };



    const closeshare = () => setShowModal(false);
    const openModalshare = () => setShowModal(true);





    const numberOnly = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode < 48 || charCode > 57) {
            e.preventDefault();
        }
    };

    const clearInputs = () => {
        setOtp(['', '', '', '']);
        setBlnInvalidOtp(false);
    };

    const digitValidate = (input) => {
        input.value = input.value.replace(/[^0-9]/g, '');
    };

    const tabChange = (index) => {
        if (index < otp.length) {
            document.getElementById(`otp-input-${index}`).focus();
        }
    };

    const handleInputChange = (index, event) => {
        const newOtp = [...otp];
        newOtp[index] = event.target.value;
        setOtp(newOtp);
        if (event.target.value !== '' && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const verifyOtp = () => {
        setBlnSendOTP(true);
        // Add OTP verification logic here
        setTimeout(() => {
            setBlnSendOTP(false);
            setBlnInvalidOtp(true);
        }, 1000);
    };

    const resendOtp = () => {
        // Add OTP resend logic here
        console.log('Resend OTP');
    };


    const getCarDetails = async () => {
        const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
        
        const headers = {
          'X-Localization': currentLanguage, // Example header to specify language
          Authorization: `Bearer ${token}`, // Example header to specify language
          'Access-Control-Max-Age': '3600',
          // Add other headers as needed
        };
        try {
            const data = await productService.getCarDetails(id, headers);
            const cardata = data.data.data;
            // console.log(cardata.images[1].image_url);
            setCarImages(cardata);
            setCategoryId(cardata.category_slug);
            console.log(cardata);
        } catch (error) {

            console.log(`error while fecthing the car data ${error}`);
        }

    }


    const goToHome = () => {
        navigate(currentLanguage === 'ar' ? '/ar' : '/en')

    }


    useEffect(() => {
        window.scrollTo(0, 0);
        getCarDetails();
    }, [currentLanguage]);

    return (
        <>
            <div className={`language-${currentLanguage}`}>
                <div class="product-details-section">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li>
                                <a onClick={goToHome}>{t('DETAIL.HOME')}</a>
                            </li>
                            <li>
                                <a
                                    onClick={gotoCarRentalList}
                                >
                                    {t("DETAIL.LATEST")}
                                </a>
                            </li>
                            <li>
                                <a className="active">{`${carImages.brand} ${carImages.name}`}</a>
                            </li>
                        </ul>
                    </div>

                    {/**<!-----Product Image slider ------>*/}

                    <section className="product-details">
                        <div className="container">
                            <div className="details">
                                <div className="leftSec">
                                    <Swiper {...ProductImageslider}
                                        modules={[Navigation, Pagination, Autoplay]}
                                        autoplay={true}

                                        spaceBetween={10}
                                        // thumbs={{ swiper: selectImage }}
                                        className="mySwiper2"
                                    >
                                        {carImages.images.map((car, index) => (
                                            // <SwiperSlide key={index}>
                                            //     <img src={car?.image_url} alt=""
                                            //     // onClick={() => open(index)} 
                                            //     />
                                            // </SwiperSlide>
                                            <SwiperSlide key={index}>
                                                <img src={car?.image_url} alt=""
                                                    onClick={() => {
                                                        setPhotoIndex(index);
                                                        setIsOpen(true);
                                                    }}

                                                />

                                                {isOpen && (
                                                    <Lightbox
                                                        mainSrc={carImages.images[photoIndex].image_url}
                                                        nextSrc={carImages.images[(photoIndex + 1) % carImages.images.length].image_url}
                                                        prevSrc={carImages.images[(photoIndex + carImages.images.length - 1) % carImages.images.length].image_url}
                                                        onCloseRequest={() => setIsOpen(false)}
                                                        onMovePrevRequest={() =>
                                                            setPhotoIndex((photoIndex + carImages.images.length - 1) % carImages.images.length)
                                                        }
                                                        onMoveNextRequest={() =>
                                                            setPhotoIndex((photoIndex + 1) % carImages.images.length)
                                                        }
                                                    />
                                                )}
                                            </SwiperSlide>
                                        ))}

                                    </Swiper>

                                    <Swiper spaceBetween={10} slidesPerView={6} className="mySwiper">
                                        {carImages.images.map((car, index) => (
                                            <SwiperSlide key={index}>
                                                <img src={car?.image_url} alt=""
                                                    onClick={() => {
                                                        setPhotoIndex(index);
                                                        setIsOpen(true);
                                                    }}

                                                />

                                                {isOpen && (
                                                    <Lightbox
                                                        mainSrc={carImages.images[photoIndex].image_url}
                                                        nextSrc={carImages.images[(photoIndex + 1) % carImages.images.length].image_url}
                                                        prevSrc={carImages.images[(photoIndex + carImages.images.length - 1) % carImages.images.length].image_url}
                                                        onCloseRequest={() => setIsOpen(false)}
                                                        onMovePrevRequest={() =>
                                                            setPhotoIndex((photoIndex + carImages.images.length - 1) % carImages.images.length)
                                                        }
                                                        onMoveNextRequest={() =>
                                                            setPhotoIndex((photoIndex + 1) % carImages.images.length)
                                                        }
                                                    />
                                                )}
                                            </SwiperSlide>
                                        ))}


                                    </Swiper>
                                </div>

                                <div className="rightSec">
                                    <div className="box-content">
                                        <div className="share">
                                            <span>{carImages?.category}</span>
                                            {/* <span>HATCHBACK</span> */}
                                            <div className="share-it">
                                                <a
                                                    // onClick={shareIt}
                                                    onClick={openModalshare}
                                                >
                                                    <img src={shareit} alt="" />
                                                </a>
                                            </div>
                                        </div>
                                        <h4 style={{ textAlign: 'start' }}>{`${carImages.brand} ${carImages.name}`}</h4>
                                        {/* <h4 style={{ textAlign: 'start' }}>CHEVROLET SPARK 2019</h4> */}
                                        <div className="card-spec">
                                            {carImages.filters.map((filter, index) => (
                                                <p key={index}>
                                                    <img src={filter.icon_url} alt="" />{filter.name}
                                                </p>
                                            ))}

                                        </div>
                                        {carImages?.fine_deposit && (
                                            <div className="findDeposite">
                                                <p>
                                                    {t('HOME.FINEDEPOSIT')} : <span>{t('BOOKNOW.AED')} {carImages?.fine_deposit}</span>
                                                </p>
                                            </div>
                                        )}
                                        <div className="advantages">
                                            {carImages?.feature_1 && (
                                                <div className="box-dropdown">
                                                    <p className="dropbtn dropup">
                                                        <img src={tick} alt="" />{carImages?.feature_1}
                                                    </p>
                                                    <div className="dropdown-content">
                                                        <p>{carImages?.feature_description_1}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {carImages?.feature_2 && (
                                                <div className="box-dropdown">
                                                    <p className="dropbtn dropup">
                                                        <img src={tick} alt="" />{carImages?.feature_2}
                                                    </p>
                                                    <div className="dropdown-content">
                                                        <p>{carImages?.feature_description_2}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {carImages?.feature_3 && (
                                                <div className="box-dropdown">
                                                    <p className="dropbtn dropup">
                                                        <img src={tick} alt="" />{carImages?.feature_3}
                                                    </p>
                                                    <div className="dropdown-content">
                                                        <p>{carImages?.feature_description_3}</p>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                        {0 > 0 && (
                                            <div className="col-md-12 custom-check">
                                                <Multiselect
                                                    name="city"
                                                    placeholder="Add ons:"
                                                    options={addOns}
                                                    value={lstSelectedAddOn}
                                                    onChange={onItemSelect}
                                                // disabled={disabled}
                                                />
                                            </div>
                                        )}
                                        <div className="card-price" style={{ textAlign: 'start' }}>
                                            <div className="box">
                                                {carImages?.is_daily_price_popular && (
                                                    <p className="popular">{t('DETAIL.POPULAR')}</p>
                                                )}
                                                <span>
                                                    <s>{t('BOOKNOW.AED')} {carImages?.original_daily_price}</s>
                                                </span>
                                                <h5>{t('BOOKNOW.AED')} {carImages?.daily_price}</h5>
                                                <p>{currentLanguage === 'en' ? `${t('PRODUCT.DAY')}` : `${t('PRODUCT.DAILY')}`}</p>
                                            </div>

                                            <div className="box">
                                                {carImages?.is_weekly_price_popular && (
                                                    <p className="popular">{t('DETAIL.POPULAR')}</p>
                                                )}
                                                <span>
                                                    <s>{t('BOOKNOW.AED')} {carImages?.original_weekly_price}</s>
                                                </span>
                                                <h5>{t('BOOKNOW.AED')} {carImages?.weekly_price}</h5>
                                                <p>{currentLanguage === 'en' ? `${t('PRODUCT.WEEK')}` : `${t('PRODUCT.WEEKLY')}`}</p>
                                            </div>
                                            <div className="box">
                                                {carImages?.is_monthly_price_popular && (
                                                    <p className="popular">{t('DETAIL.POPULAR')}</p>
                                                )}
                                                <span>
                                                    <s>{t('BOOKNOW.AED')} {carImages?.original_monthly_price}</s>
                                                </span>
                                                <h5>{t('BOOKNOW.AED')} {carImages?.monthly_price}</h5>
                                                <p>{currentLanguage === 'en' ? `${t('PRODUCT.MONTH')}` : `${t('PRODUCT.MONTHLY')}`}</p>
                                            </div>


                                        </div>
                                        <div className="connect-us">
                                            <a
                                                onClick={() => openBookingModal({ carImages })}
                                                id="booknow" className="booknow">{t('HOME.BOOKNOW')}</a>
                                            <a
                                                onClick={StaticMethod.openWhatsApp}
                                                className="chatnow">
                                                <img src={whatsapp} alt="" /> {t('HOME.CHATNOW')}
                                            </a>
                                        </div>
                                    </div>
                                    {carImages?.is_hot_offer && (
                                        <div className="productLabel">
                                            <div className="offer-label">{t('DETAIL.HOTOFFER')}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/**<!-----End Product Image slider ------>*/}


                    {/*  <!-------Tab section------>*/}
                    <section className="tabSection d-xl-block d-none" style={{ textAlign: 'start' }}>
                        <div className="container">
                            <div className="tabs-container">
                                <div className="tabs">
                                    {carImages.specifications.map((spec, i) => (
                                        <React.Fragment key={i}>
                                            <input
                                                type="radio"
                                                name="tabs"
                                                onChange={(e) => checkClicked(e, i)}
                                                checked={i === selectedTab}
                                                id={`tab-${i + 1}`}
                                            />
                                            <label htmlFor={`tab-${i + 1}`}>{spec?.title}</label>
                                        </React.Fragment>
                                    ))}
                                    <input
                                        type="radio"
                                        name="tabs"
                                        checked={selectedTab === carImages.specifications.length}
                                        id={`tab-${carImages.specifications.length + 1}`}
                                        onChange={(e) => checkClicked(e, carImages.specifications.length)}
                                    />
                                    <label htmlFor={`tab-${carImages.specifications.length + 1}`}>{t('DETAIL.REQUIREMENTS')}</label>
                                    {carImages.specifications.map((item, i) => (
                                        <div className="tab" id={`tab-${i + 1}`} key={i} style={{ display: i === selectedTab ? 'block' : 'none' }}>
                                            {item.type === '2' && (
                                                <div className="car-features">
                                                    {item.features.map((features, index) => (
                                                        <div className="content d-flex mb-3" key={index}>
                                                            <p>{features.name}</p>
                                                            <p>{features.values}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {item.type === '1' && (
                                                <div className="car-specifications" dangerouslySetInnerHTML={{ __html: sanitizeContent(item.description) }} />
                                            )}
                                        </div>
                                    ))}
                                    <div
                                        className="tab"
                                        id={`tab-${carImages.specifications.length + 1}`}
                                        style={{
                                            display: selectedTab === carImages.specifications.length ? 'block' : 'none',
                                        }}
                                    >
                                        <div className="requirements">
                                            {Object.keys(carImages.requirements).map((req, index) => (
                                                <div className="uae-residents" key={index}>
                                                    <div className="content">
                                                        {carImages.requirements[req].length > 0 && (
                                                            <h4>
                                                                {req === 'resident' && (
                                                                    <img src={profile} alt="" />
                                                                )}
                                                                {req === 'tourist' && (
                                                                    <img src={globe} alt="" />
                                                                )}
                                                                {req.charAt(0).toUpperCase() + req.slice(1)}
                                                            </h4>
                                                        )}
                                                        {carImages.requirements[req].map((items, idx) => (
                                                            <p key={idx}>{items?.name}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*  <!-------End Tab section------>*/}


                    {/*  <!-------Accordion mob section------>*/}
                    {/* <section className="product-spec-mob d-xl-none" style={{ textAlign: 'start' }}>
                        <div className="container">
                            <div className="accordion" id="accordionExample">
                                {carImages.specifications.map((item, i) => (
                                    <div className="accordion-item" key={i}>
                                        <h2 className="accordion-header" id={`heading${i}`}>
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${i}`}
                                                aria-expanded="false"
                                                aria-controls={`collapse${i}`}
                                            >
                                                {item?.title}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${i}`}
                                            className="accordion-collapse collapse"
                                            aria-labelledby={`heading${i}`}
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                {item.type === '2' && (
                                                    <div className="car-features">
                                                        {item.features.map((features, index) => (
                                                            <div className="content d-flex mb-3" key={index}>
                                                                <p>{features.name}</p>
                                                                <p>{features.values}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {item.type === '1' && (
                                                    <div className="car-specifications" dangerouslySetInnerHTML={{ __html: sanitizeContent(item.description) }} />
                                                )}
                                                {item.type === '3' && (
                                                    <div className="requirements">
                                                        {Object.keys(carImages.requirements).map((req, index) => (
                                                            <div className="uae-residents" key={index}>
                                                                <div className="content">
                                                                    {carImages.requirements[req].length > 0 && (
                                                                        <h4>
                                                                            {req === 'resident' && (
                                                                                <img
                                                                                    src={profile}
                                                                                    alt=""
                                                                                />
                                                                            )}
                                                                            {req === 'tourist' && (
                                                                                <img
                                                                                    src={globe}
                                                                                    alt=""
                                                                                />
                                                                            )}
                                                                            {req.charAt(0).toUpperCase() + req.slice(1)}
                                                                        </h4>
                                                                    )}
                                                                    {carImages.requirements[req].map((items, idx) => (
                                                                        <p key={idx}>{items?.name}</p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section> */}

                    <section className="product-spec-mob d-xl-none" style={{ textAlign: 'start' }}>
                        <div className="container">
                            <div className="accordion" id="accordionExample">
                                {carImages.specifications.map((item, i) => (
                                    <div className="accordion-item" key={i}>
                                        <h2 className="accordion-header" id={`heading${i}`}>
                                            <button
                                                className={`accordion-button ${expanded === i ? '' : 'collapsed'}`}
                                                type="button"
                                                onClick={() => handleAccordionClick(i)}
                                                aria-expanded={expanded === i}
                                                aria-controls={`collapse${i}`}
                                            >
                                                {item?.title}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${i}`}
                                            className={`accordion-collapse collapse ${expanded === i ? 'show' : ''}`}
                                            aria-labelledby={`heading${i}`}
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                {item.type === '2' && (
                                                    <div className="car-features">
                                                        {item.features.map((features, index) => (
                                                            <div className="content d-flex mb-3" key={index}>
                                                                <p>{features.name}</p>
                                                                <p>{features.values}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {item.type === '1' && (
                                                    <div className="car-specifications" dangerouslySetInnerHTML={{ __html: sanitizeContent(item.description) }} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingRequirements">
                                        <button
                                            className={`accordion-button ${expanded === 'requirements' ? '' : 'collapsed'}`}
                                            type="button"
                                            onClick={() => handleAccordionClick('requirements')}
                                            aria-expanded={expanded === 'requirements'}
                                            aria-controls="collapseRequirements"
                                        >
                                            Requirements
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseRequirements"
                                        className={`accordion-collapse collapse ${expanded === 'requirements' ? 'show' : ''}`}
                                        aria-labelledby="headingRequirements"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <div className="requirements">
                                                {Object.keys(carImages.requirements).map((req, index) => (
                                                    <div className="uae-residents" key={index}>
                                                        <div className="content">
                                                            {carImages.requirements[req].length > 0 && (
                                                                <h4>
                                                                    {req === 'resident' && (
                                                                        <img src={profile} alt="" />
                                                                    )}
                                                                    {req === 'tourist' && (
                                                                        <img src={globe} alt="" />
                                                                    )}
                                                                    {req.charAt(0).toUpperCase() + req.slice(1)}
                                                                </h4>
                                                            )}
                                                            {carImages.requirements[req].map((items, idx) => (
                                                                <p key={idx}>{items?.name}</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*  <!-------End Accordion mob section------>*/}

                    {/*  <!-------FAQ------>*/}
                    {/* <section className="productFaq" style={{ display: faqs.length !== 0 ? 'block' : 'none' }}>
                        <div className="container">
                            <h3>FAQ</h3>
                            <div className="accordion" id="accordionExample">
                                {faqs.map((faq, i) => (
                                    <div className="accordion-item" key={i}>
                                        <h2 className="accordion-header" id={`panelsStayOpen-heading${i}`}>
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#panelsStayOpen-collapse${i}`}
                                                aria-expanded="true"
                                                aria-controls={`panelsStayOpen-collapse${i}`}
                                            >
                                                {faq.question}
                                            </button>
                                        </h2>
                                        <div
                                            id={`panelsStayOpen-collapse${i}`}
                                            className="accordion-collapse collapse"
                                            aria-labelledby={`panelsStayOpen-heading${i}`}
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section> */}
                    {/*  <!-------End FAO------>*/}

                    {/*  <!--------You May Also like Section----->*/}
                    <section className="product-details-more" style={{ display: carImages.related_cars.length !== 0 ? 'block' : 'none' }}>
                        <div className="container">
                            <div className="container position-relative">
                                <div className="details">
                                    <h4 className="main-head">{t('DETAIL.YOUMAYALSOLIKE')}</h4>
                                    <a style={{ textDecoration: 'none' }} onClick={() => goToCategory('categoryId')} className="main-pg">
                                        {t('DETAIL.VIEWALL')}
                                    </a>
                                </div>
                                <Swiper {...latestRentalConfig}>
                                    {carImages.related_cars.map((car, index) => (
                                        <SwiperSlide key={index} >
                                            <div className="box">
                                                <div className="box-img">
                                                    <img
                                                        src={car.thumbnail_image_url}
                                                        // src={pone}
                                                        alt=""
                                                        className="w-100"
                                                        onClick={() => goToDetails(car.slug)}
                                                    />
                                                </div>
                                                <div className="box-content" style={{ textAlign: 'start' }}>
                                                    <span>{car.category_name}</span>
                                                    <h4>{car.brand_name} {car.name}</h4>
                                                    <div className="card-spec">
                                                        {car.filters.map((filter, idx) => (
                                                            <p key={idx}>
                                                                <img
                                                                    // src={petrol}
                                                                    src={filter.icon_url}
                                                                    alt="" />{filter.name}
                                                            </p>
                                                        ))}
                                                    </div>

                                                    <div className="card-price">
                                                        <div className="offer-details">
                                                            <span><s>{t('BOOKNOW.AED')}  {car.original_daily_price}</s></span>
                                                            <h5>{t('BOOKNOW.AED')}  {car.daily_price}</h5>
                                                            <p>{t('PRODUCT.DAY')}</p>
                                                        </div>
                                                        <div className="offer-details">
                                                            <span><s>{t('BOOKNOW.AED')}  {car.original_weekly_price}</s></span>
                                                            <h5>{t('BOOKNOW.AED')}  {car.weekly_price}</h5>
                                                            <p>{t('PRODUCT.WEEK')}</p>
                                                        </div>
                                                        <div className="offer-details">
                                                            <span><s>{t('BOOKNOW.AED')}  {car.original_monthly_price}</s></span>
                                                            <h5>{t('BOOKNOW.AED')}  {car.monthly_price}</h5>
                                                            <p>{t('PRODUCT.MONTH')}</p>
                                                        </div>
                                                    </div>
                                                    <div className="advantages">
                                                        <div className="box-dropdown">
                                                            <p className="dropbtn dropup">
                                                                <img src={tick} alt="" />{car.feature_1}
                                                            </p>
                                                            <div className="dropdown-content">
                                                                <p>{car.feature_description_1}</p>
                                                            </div>
                                                        </div>
                                                        <div className="box-dropdown">
                                                            <p className="dropbtn dropup">
                                                                <img src={tick} alt="" />{car.feature_2}
                                                            </p>
                                                            <div className="dropdown-content">
                                                                <p>{car.feature_description_2}</p>
                                                            </div>
                                                        </div>
                                                        <div className="box-dropdown">
                                                            <p className="dropbtn dropup">
                                                                <img src={tick} alt="" />{car.feature_3}
                                                            </p>
                                                            <div className="dropdown-content">
                                                                <p>{car.feature_description_3}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="connect-us">
                                                        <a onClick={() => openBookingModal({ carImages })} id="booknow" className="booknow">
                                                        {t('HOME.BOOKNOW')}
                                                        </a>
                                                        <a onClick={StaticMethod.openWhatsApp} className="chatnow">
                                                            <img src={whatsapp} alt="" />{t('HOME.CHATNOW')}
                                                        </a>
                                                    </div>
                                                </div>

                                                {car.is_hot_offer && (
                                                    <div className="productLabel">
                                                        <div className="offer-label">{t('DETAIL.HOTOFFER')}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <button className="slider-nav slider-pre">
                                    <img src={prev} alt="" />
                                </button>
                                <button className="slider-nav slider-nex">
                                    <img src={next} alt="" />
                                </button>
                            </div>
                        </div>
                    </section>
                    {/*  <!--------End You May Also like Section----->*/}

                    {/*  <!-------Coonect us button mobile-->*/}
                    <section className="connect-us-mobile">
                        <div className="container">
                            <div className="connect-us">
                                <a
                                    onClick={() => openBookingModal({ carImages })} id="booknow"
                                    className="booknow"
                                    data-bs-toggle="modal"
                                >
                                    {t('HOME.BOOKNOW')}
                                </a>
                                <a onClick={StaticMethod.openWhatsApp} className="chatnow">
                                    <img src={whatsapp} alt="" />
                                    {t('HOME.CHATNOW')}
                                </a>
                            </div>
                        </div>
                    </section>
                    {/*  <!-------End Coonect us button mobile-->*/}

                    {/*  <!-----Booking  Modal----->*/}

                    <section className="booking-sec">
                        {openBookSec && (
                            <div
                                className="modal fade modal-lg show"
                                id="bookingModal"
                                tabIndex="-1"
                                aria-labelledby="bookingModalLabel"
                                aria-hidden="true"
                                style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={closeBookNow}
                                                aria-label="Close"

                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <BookSection
                                                carId={carId}
                                                brandName={brandName}
                                                carName={carName}
                                                addOns={addOns}
                                                carImg={carImg}
                                                close={closeBookNow}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>



                    {/* <section className="booking-sec">
                        <Button variant="primary" onClick={openModal}>
                            Open Booking Modal
                        </Button>

                        <Modal
                            size="lg"
                            show={showModal}
                            onHide={close}
                            aria-labelledby="bookingModalLabel"
                            centered
                        >
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                                {blnBookNowOpen && (
                                    <AppBooknow
                                        carId={carId}
                                        brandName={brandName}
                                        carName={carName}
                                        add_ons={add_ons}
                                        carImg={carImg}
                                        close={close}
                                    />
                                )}
                            </Modal.Body>
                        </Modal>
                    </section> */}


                    {showModal && (
                        <section className="share-modal">


                            {/* <Modal
     show={showModal}
     onHide={closeshare}
     tabindex="-1"
     id="shareModal"
     aria-labelledby="shareModalLabel"
     role="dialog"
     aria-hidden="true"
 >
     <div class="modal-dialog" role="document">
         <div class="modal-content">
             <Modal.Header closeButton>
                 <Modal.Title id="shareModalLabel">{t('DETAIL.SHAREVIA')}</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <div className="share-buttons">
                     <FacebookShareButton url={currentUrl}>
                         <FacebookIcon></FacebookIcon>
                     </FacebookShareButton>

                     <TwitterShareButton url={currentUrl}>
                         <TwitterIcon>
                             <button className="btn btn-primary">Twitter</button>
                         </TwitterIcon>
                     </TwitterShareButton>


                     <LinkedinShareButton url={currentUrl}>
                         <LinkedinIcon>
                             <button className="btn btn-primary">LinkedIn</button>
                         </LinkedinIcon>
                     </LinkedinShareButton>

                     <PinterestShareButton url={currentUrl}>
                         <PinterestIcon>
                             <button className="btn btn-primary">Pinterest</button>
                         </PinterestIcon>
                     </PinterestShareButton>

                     <RedditShareButton url={currentUrl}>
                         <RedditIcon>
                             <button className="btn btn-primary">Reddit</button>
                         </RedditIcon>
                     </RedditShareButton>

                     <TelegramShareButton url={currentUrl}>
                         <TelegramIcon>
                             <button className="btn btn-primary">Telegram</button>
                         </TelegramIcon>
                     </TelegramShareButton>

                     <WhatsappShareButton url={currentUrl}>
                         <WhatsappIcon>
                             <button className="btn btn-primary">WhatsApp</button>
                         </WhatsappIcon>
                     </WhatsappShareButton>

                     <EmailShareButton url={currentUrl}>
                         <EmailIcon url={currentUrl}>
                             <button className="btn btn-primary">Email</button>
                         </EmailIcon >
                     </EmailShareButton>

                     <VKShareButton url={currentUrl}>
                         <VKIcon ></VKIcon>
                     </VKShareButton>

                     <LinkedinShareButton url={currentUrl}>
                         <LineIcon url={currentUrl}></LineIcon>
                     </LinkedinShareButton>

                 </div>
             </Modal.Body>

         </div>
     </div>
 </Modal> */}

                            <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" aria-labelledby="shareModalLabel" aria-hidden={!showModal}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Share Via</h5>
                                            <button type="button" className="btn-close" aria-label="Close" onClick={closeshare}></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="share-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>

                                                <FacebookShareButton url={currentUrl} className="share-button" style={{...buttonStyle}}>
                                                    <FacebookIcon size={40}  />
                                                </FacebookShareButton>

                                                <TwitterShareButton url={currentUrl} className="share-button" style={{...buttonStyle}}>
                                                    <TwitterIcon size={40} />
                                                </TwitterShareButton>

                                                <LinkedinShareButton url={currentUrl} className="share-button" style={{...buttonStyle}}>
                                                    <LinkedinIcon size={40}/>
                                                </LinkedinShareButton>

                                                <PinterestShareButton url={currentUrl} className="share-button" style={{...buttonStyle}}>
                                                    <PinterestIcon size={40}/>
                                                </PinterestShareButton>

                                                <RedditShareButton url={currentUrl} className="share-button" style={{...buttonStyle}}>
                                                    <RedditIcon size={40} />
                                                </RedditShareButton>

                                                <TelegramShareButton url={currentUrl} className="share-button" style={{...buttonStyle}}>
                                                    <TelegramIcon size={40}/>
                                                </TelegramShareButton>

                                                <WhatsappShareButton url={currentUrl} className="share-button" style={{...buttonStyle}}>
                                                    <WhatsappIcon size={40}/>
                                                </WhatsappShareButton>

                                                <EmailShareButton url={currentUrl} className="share-button" style={{...buttonStyle}}>
                                                    <EmailIcon size={40} />
                                                </EmailShareButton>

                                                <VKShareButton url={currentUrl} className="share-button" style={{...buttonStyle}}>
                                                    <VKIcon size={40}/>
                                                </VKShareButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {showModal && <div className="modal-backdrop fade show"></div>} */}

                            </div>


                            <div className="modal-backdrop fade show"></div>
                        </section>
                    )}


                    {/*  <!-----End Booking  Modal----->*/}
                </div >


            </div >

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
                                    className="login-close btn-close"
                                    data-bs-dismiss="modal"
                                    onClick={clearInputs}
                                    aria-label="Close"
                                >
                                    <img src={close} alt="" />
                                </a>
                            </div>
                            <div className="modal-body">
                                <h5>Enter OTP</h5>
                                <p className="contentmsg">We have sent an OTP to {phoneNumber}</p>
                                <form action="" className="mt-3">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-input-${index}`}
                                            type="tel"
                                            value={digit}
                                            onChange={(e) => handleInputChange(index, e)}
                                            onKeyPress={numberOnly}
                                            onInput={(e) => digitValidate(e.target)}
                                            onKeyUp={() => tabChange(index)}
                                            maxLength="1"
                                            autoFocus={index === 0}
                                            className="otp"
                                            required
                                        />
                                    ))}
                                </form>
                                {blnInvalidOtp && (
                                    <p
                                        style={{
                                            color: '#c41229',
                                            fontSize: '12px',
                                            marginTop: '10px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {otpErrorMessage}
                                    </p>
                                )}
                                <div className="reset-btn">
                                    <button
                                        className={`btn btn-primary ${blnSendOTP ? 'btn-loading' : ''}`}
                                        onClick={verifyOtp}
                                    >
                                        Verify
                                    </button>
                                </div>
                                <div className="register-here">
                                    <p>
                                        {t('OTP.DIDNTRECIEVE')}
                                        <a onClick={resendOtp}>{t('OTP.RESEND')}</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default ProductDetails;
