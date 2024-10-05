import React, { useEffect, useState } from 'react';
import '../assets/css/english.css';
import '../assets/css/arabic.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { useTranslation, } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import bann from '../assets/images/hot-deal/hotban.png';
import hotdeal from '../assets/images/hot-deal/hot-deals.png';
import mobhot from '../assets/images/hot-deal/mob.png';
import tick from '../assets/images/home/tick.svg';
import whatsapp from '../assets/images/home/whatsapp.png';
import prev from '../assets/images/home/latest-prev.png';
import next from '../assets/images/home/latest-next.png';
import offer from '../assets/images/hot-deal/offone.png';
import AppEndPoints from '../config/AppEndPoints';
import ApiService from '../service/ApiService';
import '../index.css';
import StaticMethod from '../service/staticmethod';

const HottOffers = () => {
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const [blnBookNowOpen, setBlnBookNowOpen] = useState(true);
    const carId = '123';
    const brandName = 'Brand Name';
    const carName = 'Car Name';
    const carImg = '/path/to/car-image.jpg';
    const [hotoffer, setHotoffer] = useState({ hot_offers: []});

    const [car, setCar] = useState( { cars: []});


    const close = () => {
        setBlnBookNowOpen(false);
    };


    const goToHome = () => {
        navigate(currentLanguage === 'ar' ? '/ar' : '/en')

    }
   

    const data = {
        hot_offers: [
            {
                slug: 'offer-1',
                id: '1',
                image_url: { offer }
            },
            {
                slug: 'offer-2',
                id: '2',
                image_url: { offer }
            },
            // Add more offers as needed
        ],
    };

    const gotoFeatures = (slug, id) => {
        navigate(currentLanguage === 'ar' ? `/ar/hotoffers/${slug}` : `/en/hotoffers/${slug}`);
        sessionStorage.setItem('offer-slug', id);

        // Logic to handle navigation to features
        // console.log(`Navigating to features of ${slug} with id ${id}`);
    };

    const openBookingModal = (car, event) => {
        event.preventDefault();
        // Logic to open booking modal
    };

    const openWhatsApp = (event) => {
        event.preventDefault();
        // Logic to open WhatsApp chat
    };

    const goToDetail = (slug) => {
        // Logic to navigate to car detail page
    };

    const hotdealConfig = {
        loop: true,
        slidesPerView: 3,
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


    const fetchData = (lan) => {
        const headers = {
    
          'X-Localization': currentLanguage, // Example header to specify language
          // Add other headers as needed
        };
        ApiService.getData(AppEndPoints.hot_deals, headers)
          .then((res) => {
            setHotoffer(res.data.data);
            setCar(res.data.data);
            console.log(res.data.data);
            console.log(res.data.data.banner_image_url);
            
          })
          .catch((error) => {
            console.error('Error fetching the about details:', error);
          });
      }
    
      useEffect(() => {
        window.scrollTo(0, 0);
        fetchData(currentLanguage);
        
      }, [currentLanguage]);

    return (
        <>
            <div className={`language-${currentLanguage}`}>
                <div class="hot-deals-section">
                    {/*  <!-----Banner----->*/}
                    <section className="banner">
                        <img src={bann} alt=""></img>
                    </section>
                    {/*  <!-----End Banner----->*/}

                    {/*  <!------Breadcrumbs------>*/}
                    <h1 className="main-heading">
                        <img src={hotdeal} className="d-lg-block d-none"></img>
                        <img src={mobhot} className="d-lg-none d-block"></img>
                    </h1>

                    <ul className="breadcrumb">
                        <li>
                            <a
                            onClick={goToHome}
                            >
                                {t('HOME.HOME')}
                            </a>
                        </li>
                        <li>
                            <a
                                class="active"
                            >
                                {t('HOTOFFER.OFFERS')}
                            </a>
                        </li>
                    </ul>
                    {/*  <!------End Breadcrumbs------>*/}


                    {/*  <!-------------hot deals slider--------->*/}
                    <section className="hotDealslider">
                        <div className="container position-relative" style={{ textAlign: 'start' }}>
                            <Swiper {...hotdealConfig}
                            modules={[Navigation, Pagination, ]}
                            
                            navigation={{
                              nextEl: '.slider-nex',
                              prevEl: '.slider-pre'
                            }}
                            autoplay={true}
                            pagination={{ clickable: true }}
                            // scrollbar={{ draggable: true }}
                            >
                                {car.cars.map((car, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="box">
                                            <div className="box-img"
                                            // onClick={() => goToDetail(car.slug)}
                                            >
                                                <img src={car.thumbnail_image_url} alt="" className="w-100" />
                                            </div>
                                            <div className="box-content">
                                                <span>{car.category_name}</span>
                                                <h4 onClick={() => goToDetail(car.slug)}>
                                                    {car.brand_name} {car.name}
                                                </h4>
                                                <div className="card-spec">
                                                    {car.filters.map((filter, index) => (
                                                        <p key={index}>
                                                            <img src={filter.icon_url} alt="" />
                                                            {filter.name}
                                                        </p>
                                                    ))}
                                                </div>
                                                <div className="card-price">
                                                    <div className="offer-details">
                                                        <span>
                                                            <s>{t('BOOKNOW.AED')} {car.original_daily_price}</s>
                                                        </span>
                                                        <h5>{t('BOOKNOW.AED')} {car.daily_price}</h5>
                                                        <p>{t('PRODUCT.DAY')}</p>
                                                    </div>
                                                    <div className="offer-details">
                                                        <span>
                                                            <s>{t('BOOKNOW.AED')} {car.original_weekly_price}</s>
                                                        </span>
                                                        <h5>{t('BOOKNOW.AED')} {car.weekly_price}</h5>
                                                        <p>{t('PRODUCT.WEEK')}</p>
                                                    </div>
                                                    <div className="offer-details">
                                                        <span>
                                                            <s>{t('BOOKNOW.AED')} {car.original_monthly_price}</s>
                                                        </span>
                                                        <h5>{t('BOOKNOW.AED')} {car.monthly_price}</h5>
                                                        <p>{currentLanguage === 'en' ? t('PRODUCT.MONTH') : t('PRODUCT.MONTHLY')}</p>
                                                    </div>
                                                </div>
                                                <div className="findDeposite">
                                                    <p>
                                                        {t('HOME.FINEDEPOSIT')} :<span>{t('BOOKNOW.AED')} {car.fine_deposit}</span>
                                                    </p>
                                                </div>
                                                <div className="advantages">
                                                    <div className="box-dropdown">
                                                        <p className="dropbtn dropup">
                                                            <img src={tick} alt="" />
                                                            {car.feature_1}
                                                        </p>
                                                        <div className="dropdown-content">
                                                            <p>{car.feature_description_1}</p>
                                                        </div>
                                                    </div>
                                                    <div className="box-dropdown">
                                                        <p className="dropbtn dropup">
                                                            <img src={tick} alt="" />
                                                            {car.feature_2}
                                                        </p>
                                                        <div className="dropdown-content">
                                                            <p>{car.feature_description_2}</p>
                                                        </div>
                                                    </div>
                                                    <div className="box-dropdown">
                                                        <p className="dropbtn dropup">
                                                            <img src={tick} alt="" />
                                                            {car.feature_3}
                                                        </p>
                                                        <div className="dropdown-content">
                                                            <p>{car.feature_description_3}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="connect-us">
                                                    <a
                                                        onClick={(e) => openBookingModal(car, e)}
                                                        id="booknow"
                                                        className="booknow"
                                                    >
                                                        {t('HOME.BOOKNOW')}
                                                    </a>
                                                    <a onClick={StaticMethod.openWhatsApp} className="chatnow">
                                                        <img src={whatsapp} alt="" />
                                                        {t('HOME.CHATNOW')}
                                                    </a>
                                                </div>
                                            </div>
                                            {car.is_hot_offer && (
                                                <div className="productLabel">
                                                    <div className="offer-label">{t('HOME.HOTOFFER')}</div>
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
                    </section>
                    {/*  <!-------------End hot deals slider--------->*/}


                    {/*  <!---------Hot offers------------>*/}
                    <section className="hot-offers">
                        <div className="container">
                            <div className="details">
                                {hotoffer.hot_offers.map((deal, index) => (
                                    <div className="box" key={index}>
                                        <a>
                                            <img
                                                onClick={() => gotoFeatures(deal.slug, deal.id)}
                                                src={deal.image_url}
                                                alt={`Offer ${index + 1}`}
                                            />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    {/*  <!---------End Hot offers------------>*/}

                    <section className="booking-sec">
                        <div
                            className="modal fade modal-lg"
                            id="bookingModal"
                            tabIndex="-1"
                            aria-labelledby="bookingModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={close}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        {/* {blnBookNowOpen && (
                                            <BookNow
                                                carId={carId}
                                                brandName={brandName}
                                                carName={carName}
                                                carImg={carImg}
                                                close={close}
                                            />
                                        )} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default HottOffers;