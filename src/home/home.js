import React, { useRef, useState, useEffect } from 'react';
import './banner.css';
// import './home.css'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
// import 'swiper/swiper-bundle.min.css';
import 'swiper/less';
import 'swiper/less/navigation';
import 'swiper/less/pagination';
import { useTranslation } from 'react-i18next';
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';
import hatchback from '../assets/images/home/hatchback.png';
import sedan from '../assets/images/home/sedan.png';
import miniSuv from '../assets/images/home/mini-suv.png';
import cSuv from '../assets/images/home/combatible suv.png';
import lSuv from '../assets/images/home/luxury-suv.png';
import latCar from '../assets/images/home/latest-car.png';
import quotation from '../assets/images/home/quotation.png';
import spec1 from '../assets/images/home/spec1.png';
import spec2 from '../assets/images/home/spec2.png';
import spec3 from '../assets/images/home/spec3.png';
import spec4 from '../assets/images/home/spec4.png';
import tick from '../assets/images/home/tick.png';
import newf from '../assets/images/home/newf.png';
import whatsApp from '../assets/images/home/whatsapp.svg';
import prev from '../assets/images/home/latest-prev.png';
import next from '../assets/images/home/latest-next.png';
import leftIcon from '../assets/images/home/left-icon.png';
import rightIcon from '../assets/images/home/right-icon.png';
import bannerImg from '../assets/images/home/banner-img.jpg';
import bannerMobImg from '../assets/images/home/banner-mob.png';
import fea1 from '../assets/images/home/feature-1.jpg';
import fea2 from '../assets/images/home/feature-2.jpg';
import fea3 from '../assets/images/home/feature-3.jpg';
import jou1 from '../assets/images/home/journey-1.png';
import jou2 from '../assets/images/home/journey-2.png';
import jou3 from '../assets/images/home/journey-3.png';
import jou4 from '../assets/images/home/journey-4.png';
import reply from '../assets/images/home/leave-reply.png';
import ques from '../assets/images/home/quotation.png';
import step1 from '../assets/images/home/step1.png';
import step2 from '../assets/images/home/step2.png';
import step3 from '../assets/images/home/step3.png';
import step4 from '../assets/images/home/step4.png';
import bg from '../assets/images/home/why-choose-bg.png';
import choose1 from '../assets/images/home/whychoose-1.png';
import choose4 from '../assets/images/home/whychoose-4.png';
import whowe from '../assets/images/home/who-we-are.png';
import blog1 from '../assets/images/home/blog1.jpg';
import blog2 from '../assets/images/home/blog2.jpg';
import blog3 from '../assets/images/home/blog3.jpg';
import whatfix from '../assets/images/home/whatsapp-fixed.png';
import bannerimg from '../assets/images/home/banner-img.jpg';
import banermob from '../assets/images/home/banner-mob.png';
import google from '../assets/images/home/google.png';
// SwiperCore.use([Navigation, Pagination]);
import audi from '../assets/images/home/Audi.png';
import gmc from '../assets/images/home/GMC.png';
import citroen from '../assets/images/home/Citroen.png';
import chevrolet from '../assets/images/home/Chevrolet.png';
import bmw from '../assets/images/home/BMW.png';
import lexus from '../assets/images/home/Lexus.png';
import star from '../assets/images/stars.png';
// import '../index.css';
import '../assets/css/english.css';
import '../assets/css/arabic.css';
import StaticMethod from '../service/staticmethod';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [isLazyContentVisible, setIsLazyContentVisible] = useState(false);
  const [name, setName] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const lazyContainerRef = useRef(null);
  const [lstData, setlstData] = useState({});
  const [premium, setPremium] = useState({ premium_cars: [] });
  const [workstep, setWorkSetp] = useState({ working_steps: [] })
  const [whychooseus, setWhyChooseUS] = useState({ why_chooses: [] })
  const [test, setTest] = useState({ testimonials: [] });
  const [blogs, setBlogs] = useState({ blogs: [] });
  const [journy, setJourny] = useState({ journeys: [] });
  const [feature, setFeature] = useState({ featured_offers: [] });
  const [car, setCar] = useState({ cars: [] });
  const [banner, setBanner] = useState({ banners: [] });
  const [brandDetails, setBrandDetails] = useState([]);
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const [blnSearch, setBlnSearch] = useState(false);
  const [searches, setSearches] = useState([]);
  const [total_searches, setTotalSearches] = useState(0);
  const swiperRef = useRef(null);

  // SwiperCore.use([Navigation, Pagination]);


  const handleInputChange = (event) => {
    const value = event.target.value;
    setName(value);
    if (value) {
      changeSearchKey(value);
    } else {
      setSearches([]);
      setTotalSearches(0);
    }
  };


  const bannerslider = {
    allowTouchMove: true,
    slidesPerView: 1,
    lazy: true,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: '.slider-next',
      prevEl: '.slider-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index, className) => {
        let pCount = index + 1;
        if (pCount < 10) {
          pCount = '0' + pCount;
        }
        return `<span class="${className}">${pCount}</span>`;
      },
    },

  };


  const selectedItem = (data) => {
    console.log(data.type);
    if (data.type == 'category') {
      const path = `cheapest-car-rentals/category/${data.slug}`;
      const url = currentLanguage === 'ar' ? `/ar/${path}` : `/en/${path}`;
      window.location.href = url;
      localStorage.setItem('activeMenu', 'category');
      localStorage.setItem('activeItem', data.name);
    } else if (data.type === 'brand') {
      const path = `/brands/${data.slug}`;
      const url = currentLanguage === 'ar' ? `/ar/cheapest-car-rentals${path}` : `/en/cheapest-car-rentals${path}`;
      window.location.href = url;
      localStorage.setItem('activeMenu', 'brand');
      localStorage.setItem('activeItem', data.name);
    } else if (data.type === 'car') {
      const path = `/car-details/${data.slug}`;
      const url = currentLanguage === 'ar' ? `/ar${path}` : `/en${path}`;
      window.location.href = url;
    }
  }


  const latestRentalConfig = {
    // slidesPerView: 3,
    loop: true,
    // autoplay:true,
    // slidesPerView: 3,
    spaceBetween: 10,

    navigation: {
      nextEl: '.slider-nex',
      prevEl: '.slider-pre',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 15,
        // direction: 'horizontal', // Ensure horizontal for larger screens

      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
        // direction: 'horizontal', // Ensure horizontal for larger screens

      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        // direction: 'vertical', // Set vertical for mobile

      },
    },
  };



  const featureSliderConfig = {
    loop: true,

    slidesPerView: 2.3,
    spaceBetween: 10,

    breakpoints: {
      991: {
        slidesPerView: 3,
      },
      576: {
        slidesPerView: 2.3,
      },
      320: {
        slidesPerView: 1.3,
      },
    },
  };


  const getStars = (rating) => {
    const val = parseFloat(rating);
    const size = (val / 5) * 100;
    return `${size}%`;
  };

  const starFixed = (rating) => {
    return parseFloat(rating).toFixed(1);
  };

  const carLogos = {
    allowTouchMove: true,
    slidesPerView: 6,
    spaceBetween: 20,
    breakpoints: {
      1200: {
        slidesPerView: 6,
      },
      768: {
        slidesPerView: 4,
      },
      320: {
        slidesPerView: 3.5,
      },
    },

    lazy: true,
    autoplay: {
      delay: 3000,
    },
    scrollbar: {
      draggable: true,
      el: '.swiper-scrollbar',
    },
    watchSlidesProgress: true,
    loop: true,
    navigation: {
      nextEl: '.slider-nex',
      prevEl: '.slider-pre',
    },
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    //   renderBullet: (index, className) => {
    //     let pCount = index + 1;
    //     if (pCount < 10) {
    //       pCount = '0' + pCount;
    //     }
    //     return `<span class="${className}">${pCount}</span>`;
    //   },
    // },
  };

  const happyThoughtsConfig = {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 10,

    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
      reverseDirection: true,
    },

    navigation: {
      nextEl: '.next-sec',
      prevEl: '.prev-sec',
    },
    breakpoints: {
      1200: {
        slidesPerView: 2.4,
      },
      768: {
        slidesPerView: 1.4,
      },
      320: {
        slidesPerView: 1.2,
        spaceBetween: 10,
        
      },
    },
  };

  const goToDetails = (slug) => {
    // navigate('/productdetails');
    const path = `car-details/${slug}`
    navigate(currentLanguage === 'ar' ? `/ar/${path}` : `/en/${path}`);

    localStorage.setItem('activeMenu', 'rentcar');


  }

  const premiumCarsConfig = {
    loop: true,
    // slidesPerView: 3,
    spaceBetween: 10,

    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },

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
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  };


  const blogSliderConfig = {
    loop: true,
    // slidesPerView: 2.3,
    spaceBetween: 10,

    breakpoints: {
      576: {
        // slidesPerView: 2,
        direction: 'vertical', // Set vertical for mobile

      },
      320: {
        // slidesPerView: 1.3,
        direction: 'vertical', // Set vertical for mobile
      },
    },
  };

  const goToDetail = (slug) => {
    // navigate('/blogdetails');
    navigate(currentLanguage === 'ar' ? `/ar/blogdetails/${slug}` : `/en/blogdetails/${slug}`);
    localStorage.setItem('activeMenu', 'blogdetails');
  }

  const goToBlog = () => {
    navigate(currentLanguage === 'ar' ? '/ar/blog' : '/en/blog');

  }

  const fetchData = (lan) => {
    const headers = {

      'X-Localization': currentLanguage, // Example header to specify language
      // Add other headers as needed
    };
    ApiService.getData(AppEndPoints.home, headers)
      .then((res) => {
        setlstData(res.data.data);
        setPremium(res.data.data);
        setWhyChooseUS(res.data.data);
        setWorkSetp(res.data.data);
        setTest(res.data.data);
        setJourny(res.data.data);
        setFeature(res.data.data);
        setCar(res.data.data);
        setBanner(res.data.data);
        // console.log(res.data.data.header.whatsapp_no);
        const number = res.data.data.header.whatsapp_no;
        localStorage.setItem('whatsapp_no', number);

      })
      .catch((error) => {
        console.error('Error fetching the about details:', error);
      });

    ApiService.getData(AppEndPoints.blogs, headers)
      .then((res) => {
        setBlogs(res.data.data);

      })
      .catch((error) => {
        console.error('Error fetching the about details:', error);
      });

    ApiService.getData(AppEndPoints.brands, headers)
      .then((res) => {
        setBrandDetails(res.data.data);

      })
      .catch((error) => {
        console.error('Error fetching the about details:', error);
      });
    // console.log(blogs.blogs[1].thumbnail_image_url);
  }

  // const getSeacrhData = async (value) => {
  //   try {
  //     if (value.trim() !== '') {
  //       setBlnSearch(true);
  //       const response = await ApiService.get(`${AppEndPoints.search}?search=${value}`);
  //       console.log('Search data:', response);

  //       // Update state or perform other actions with response.data
  //       return response.data; // Assuming you want to return the data
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     // Handle error as needed
  //   }
  // };



  const goToCategory = (item) => {
    const path = `cheapest-car-rentals/category/${item}`;
    const url = currentLanguage === 'ar' ? `/ar/${path}` : `/en/${path}`;
    window.location.href = url;
  }

  const changeSearchKey = (value) => {
    const headers = {

      'X-Localization': currentLanguage, // Example header to specify language
      // Add other headers as needed
    };
    ApiService
      .getData(`${AppEndPoints.search}?search=${value}`, headers)
      .then((res) => {
        setSearches(res.data.data);
        setTotalSearches(res.data.data.length);
      })
      .catch((error) => {
        console.error('Error fetching the search results:', error);
      });
  };  


  const redirect = (link) => {
    window.open(link);
  }

  const goToAbout = () => {
    const url = currentLanguage === 'ar' ? '/ar/about-us' : '/en/about-us';
    window.location.href = url;
    localStorage.setItem('activeMenu', 'about-us');
    // setActiveMenu('about');

  };

  const goToCarDetails = (slug) => {
    // navigate('/productdetails');
    // const path = `${slug}`
    const url = currentLanguage === 'ar' ? `/ar/car-details/${slug}` : `/en/car-details/${slug}`;
    window.location.href = url;

    // localStorage.setItem('activeMenu', 'rentcar');


  }

  const goToBrand = (item) => {
    const path = `/brands/${item}`;
    const url = currentLanguage === 'ar' ? `/ar/cheapest-car-rentals${path}` : `/en/cheapest-car-rentals${path}`;
    window.location.href = url;
  }


  useEffect(() => {
    // localStorage.removeItem('loggedIn');
    // localStorage.removeItem('token');
    window.scrollTo(0, 0);
    fetchData(currentLanguage);

    const lazyObserver = lazyContainerRef.current;

    if (lazyObserver) {
      // You can perform any DOM operations or add any event listeners here
      console.log('Lazy Observer Element:', lazyObserver);
    }
    // Add your logic to set visibility
    setIsLazyContentVisible(true);
  }, []);

  return (
    <>

      <div className={`language-${currentLanguage}`}>
        <div class="home">

          {/* 
          <section className="bannerSec">



            <Swiper
              {...bannerSliderConfig}
              modules={[Navigation, Pagination, Autoplay]}
            >
              <SwiperSlide>
                <img src={bannerimg} alt="" className="w-100 desktop-screen" />
                <img src={banermob} alt="" className="w-100 mobile-screen" />
                <div className="details">
                  <div className="container">
                    <h1>Experience Stress Free Car Rental in UAE</h1>
                    <p>Best Price Guarantee on Rental with Amazing Monthly Offers</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <img src={bannerimg} alt="" className="w-100 desktop-screen" />
                <img src={banermob} alt="" className="w-100 mobile-screen" />
                <div className="details">
                  <div className="container">
                    <h1>Experience Stress Free Car Rental in UAE</h1>
                    <p>Best Price Guarantee on Rental with Amazing Monthly Offers</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <img src={bannerImg} alt="" className="w-100 desktop-screen" />
                <img src={bannerMobImg} alt="" className="w-100 mobile-screen" />
                <div className="details">
                  <div className="container">
                    <h1>Experience Stress Free Car Rental in UAE</h1>
                    <p>Best Price Guarantee on Rental with Amazing Monthly Offers</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            <div className="container">
              <button className="slider-nav slider-prev">
                <img src={leftIcon} alt="Previous" />
              </button>
              <button className="slider-nav slider-next">
                <img src={rightIcon} alt="Next" />
              </button>
            </div>

            <div className="swiper-pagination"></div>
          </section> */}

          {/*----Banner Section------*/}

          <section className="bannerSec">
            <Swiper {...bannerslider}
              modules={[Navigation, Pagination, Autoplay]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              navigation={{
                nextEl: '.slider-next',
                prevEl: '.slider-prev'
              }}
              autoplay={true}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}>

              {banner.banners.map((banner, index) => (
                <SwiperSlide>
                  <div key={index}>
                    <img
                      onClick={() => redirect(banner?.link)}
                      fetchpriority="high"
                      src={banner?.image_url}
                      alt="banner image"
                      width="1366"
                      height="549"
                      className="w-100 desktop-screen"
                    />
                    <img
                      onClick={() => redirect(banner?.link)}
                      fetchpriority="high"
                      src={banner?.mobile_image_url}
                      alt="banner image"
                      className="w-100 mobile-screen"
                    />

                  </div>
                </SwiperSlide>

              ))}
            </Swiper>
            <div className="container">
              <button className="slider-nav slider-prev">
                <img src={leftIcon} alt="left-control" />
              </button>
              <button className="slider-nav slider-next">
                <img src={rightIcon} alt="right-control" />
              </button>
            </div>

            <div className="swiper-pagination" />


          </section>

          {/*----End Banner Section------*/}




          {/* <section className="searcSec">
            <div className="container">
              <div className="details row">
                <div className="selectCar">
                  <div className="car"> <img src={hatchback} alt="" />
                    <p>Hatchback</p>
                  </div>
                  <div className="car">
                    <img src={sedan} alt="" />
                    <p>
                      Sedan
                    </p>
                  </div>
                  <div className="car ">
                    <img src={miniSuv} alt="" />
                    <p>Mini SUV</p>
                  </div>
                  <div className="car">
                    <img src={cSuv} alt="" />
                    <p>Compatible SUV</p>
                  </div>
                  <div className="car">
                    <img src={lSuv} alt="" />
                    <p>Luxury SUV</p>
                  </div>
                </div>
                <div className="searchCar">
                  <div className="search-group v2">
                    <input className="search-input inactive" type="text" placeholder="Search Car Rental in Dubai" />
                    <button className="button button-brand-primary button-search">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/*----Search Section------*/}


          <section className="searcSec">
            <div className="container">
              <div className="details row">
                <div className="selectCar">
                  {lstData?.categories?.map((category, index) => (
                    <div key={index} className="car"
                      onClick={() => goToCategory(category.slug)}
                    >
                      <img width="74" height="28" src={category?.icon_url} alt="" />
                      <p>{category?.name}</p>
                    </div>
                  ))}

                </div>
                <div className="searchCar down">
                  <div className="search-group v2">
                    <input
                      className="search-input inactive"
                      value={name}
                      onChange={handleInputChange}
                      type="text"
                      placeholder={t('HOME.SEARCHCARRENTAL')}
                      // aria-describedby="button-addon1"
                    />
                    <button
                      className="button button-brand-primary button-search"
                      id="button-addon1"
                    onClick={null}
                    >
                      {t("HOME.SEARCH")}
                    </button>
                  </div>
                  {/*<!------Dropdown for search------>*/}

                  {name && (
                    <div className="searchDropdown" style={{ textAlign: 'start' }}>
                      {searches.map((item, index) => (
                        <p key={index}
                          onClick={() => selectedItem(item)}
                        >
                          {item?.name}
                        </p>
                      ))}
                      {total_searches === 0 && (
                        <p role="listitem" style={{ textAlign: 'center' }}>
                          {t("HOME.NOSEARCH")}
                        </p>
                      )}
                    </div>
                  )}



                  {/* Dropdown for search */}

                  {/* End Dropdown for search */}
                </div>

              </div>

            </div>

          </section>


          {/*----Latest Rental Cars Section------*/}
          {/*----End Latest Rental Cars Section------*/}


          {/* 
          <section className="latestSec">
            <div className="container position-relative">
              <h4 className="main-head">Latest Rental Cars</h4>
              <p className="main-pg">
                Our cars are available on Dubai and UAE. All vehicles are recently purchased or well maintained
              </p>
              <Swiper {...latestRentalConfig} modules={[Navigation, Pagination, Scrollbar]}>
                <SwiperSlide>
                  <div>
                    <div className="box h-100">
                      <div className="box-img">
                        <img src={latCar} alt="" className="w-100" />
                      </div>
                      <div className="box-content">
                        <span>SEDAN</span>
                        <h4>Nissan Sunny 2018 Model</h4>
                        <div className="card-spec">
                          <p><img src={spec1} alt="" />4</p>
                          <p><img src={spec2} alt="" />5</p>
                          <p><img src={spec3} alt="" />Auto</p>
                          <p><img src={spec4} alt="" />Petrol</p>
                        </div>
                        <div className="card-price">
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                        </div>
                        <div className="advantages">
                          <div className="box-dropdown">
                            <p className="dropbtn dropup">
                              <img src={tick} alt="" /> Deposit: AED 1000
                            </p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup"><img src={tick} alt="" />Emergency Assistance</p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup"><img src={tick} alt="" />Insurance included</p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                        </div>
                        <div className="connect-us" >
                          <a href="#" className="booknow" >Book Now</a>
                          <a href="#" className="chatnow"><img src={whatsApp} alt="" />Chat Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="box h-100">
                      <div className="box-img">
                        <img src={latCar} alt="" className="w-100" />
                      </div>
                      <div className="box-content">
                        <span>SEDAN</span>
                        <h4>Nissan Sunny 2018 Model</h4>
                        <div className="card-spec">
                          <p><img src={spec1} alt="" />4</p>
                          <p><img src={spec2} alt="" />5</p>
                          <p><img src={spec3} alt="" />Auto</p>
                          <p><img src={spec4} alt="" />Petrol</p>
                        </div>
                        <div className="card-price">
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                        </div>
                        <div className="advantages">
                          <div className="box-dropdown">
                            <p className="dropbtn dropup">
                              <img src={tick} alt="" /> Deposit: AED 1000
                            </p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup"><img src={tick} alt="" />Emergency Assistance</p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup"><img src={tick} alt="" />Insurance included</p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                        </div>
                        <div className="connect-us">
                          <a href="#" className="booknow">Book Now</a>
                          <a href="#" className="chatnow"><img src={whatsApp} alt="" />Chat Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="box h-100">
                      <div className="box-img">
                        <img src={latCar} alt="" className="w-100" />
                      </div>
                      <div className="box-content">
                        <span>SEDAN</span>
                        <h4>Nissan Sunny 2018 Model</h4>
                        <div className="card-spec">
                          <p><img src={spec1} alt="" />4</p>
                          <p><img src={spec2} alt="" />5</p>
                          <p><img src={spec3} alt="" />Auto</p>
                          <p><img src={spec4} alt="" />Petrol</p>
                        </div>
                        <div className="card-price">
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                        </div>
                        <div className="advantages">
                          <div className="box-dropdown">
                            <p className="dropbtn dropup">
                              <img src={tick} alt="" /> Deposit: AED 1000
                            </p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup"><img src={tick} alt="" />Emergency Assistance</p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup"><img src={tick} alt="" />Insurance included</p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                        </div>
                        <div className="connect-us">
                          <a href="#" className="booknow">Book Now</a>
                          <a href="#" className="chatnow"><img src={whatsApp} alt="" />Chat Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="box h-100">
                      <div className="box-img">
                        <img src={latCar} alt="" className="w-100" />
                      </div>
                      <div className="box-content">
                        <span>SEDAN</span>
                        <h4>Nissan Sunny 2018 Model</h4>
                        <div className="card-spec">
                          <p><img src={spec1} alt="" />4</p>
                          <p><img src={spec2} alt="" />5</p>
                          <p><img src={spec3} alt="" />Auto</p>
                          <p><img src={spec4} alt="" />Petrol</p>
                        </div>
                        <div className="card-price">
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                        </div>
                        <div className="advantages">
                          <div className="box-dropdown">
                            <p className="dropbtn dropup">
                              <img src={tick} alt="" /> Deposit: AED 1000
                            </p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup"><img src={tick} alt="" />Emergency Assistance</p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup"><img src={tick} alt="" />Insurance included</p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                        </div>
                        <div className="connect-us">
                          <a href="#" className="booknow">Book Now</a>
                          <a href="#" className="chatnow"><img src={whatsApp} alt="" />Chat Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="box h-100">
                      <div className="box-img">
                        <img src={latCar} alt="" className="w-100" />
                      </div>
                      <div className="box-content">
                        <span>SEDAN</span>
                        <h4>Nissan Sunny 2018 Model</h4>
                        <div className="card-spec">
                          <p><img src={spec1} alt="" />4</p>
                          <p><img src={spec2} alt="" />5</p>
                          <p><img src={spec3} alt="" />Auto</p>
                          <p><img src={spec4} alt="" />Petrol</p>
                        </div>
                        <div className="card-price">
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                        </div>
                        <div className="advantages">
                          <div className="box-dropdown">
                            <p className="dropbtn dropup">
                              <img src={tick} alt="" /> Deposit: AED 1000
                            </p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup"><img src={tick} alt="" />Emergency Assistance</p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup"><img src={tick} alt="" />Insurance included</p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                        </div>
                        <div className="connect-us">
                          <a href="#" className="booknow">Book Now</a>
                          <a href="#" className="chatnow"><img src={whatsApp} alt="" />Chat Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="box h-100">
                      <div className="box-img">
                        <img src={latCar} alt="" className="w-100" />
                      </div>
                      <div className="box-content">
                        <span>SEDAN</span>
                        <h4>Nissan Sunny 2018 Model</h4>
                        <div className="card-spec">
                          <p><img src={spec1} alt="" />4</p>
                          <p><img src={spec2} alt="" />5</p>
                          <p><img src={spec3} alt="" />Auto</p>
                          <p><img src={spec4} alt="" />Petrol</p>
                        </div>
                        <div className="card-price">
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                          <div className="offer-details">
                            <span><s>AED 129</s></span>
                            <h5>AED 99</h5>
                            <p>Day</p>
                          </div>
                        </div>
                        <div className="advantages">
                          <div className="box-dropdown">
                            <p className="dropbtn dropup">
                              <img src={tick} alt="" /> Deposit: AED 1000
                            </p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup"><img src={tick} alt="" />Emergency Assistance</p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup"><img src={tick} alt="" />Insurance included</p>
                            <div className="dropdown-content">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur fugiat, itaque explicabo voluptatum voluptatibus</p>
                            </div>
                          </div>
                        </div>
                        <div className="connect-us">
                          <a href="#" className="booknow">Book Now</a>
                          <a href="#" className="chatnow"><img src={whatsApp} alt="" />Chat Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                
              </Swiper>
              <button className="slider-nav slider-pre">
                <img src={prev} alt="Previous" />
              </button>
              <button className="slider-nav slider-nex">
                <img src={next} alt="Next" />
              </button>
            </div>
          </section> */}

          <section className="latestSec">
            <h4 className="main-head">{lstData?.latest_car_title}</h4>
            {/* <h4 className="main-head">Latest Car Rental Services</h4> */}
            <p className="main-pg">{lstData?.latest_car_description}</p>
            {/* <p className="main-pg">Choose your preferred car from our stores in UAE and Dubai, we guarantee that every car is serviced to perfection and recently purchased. You can also order an awe-inspiring rent-a-car online in Dubai and get the perfect combination of performance, power, and precision.</p> */}
            <div className="container position-relative">
              <Swiper {...latestRentalConfig}
                modules={[Navigation, Pagination, Scrollbar]}
                navigation={{
                  nextEl: '.slider-nex',
                  prevEl: '.slider-pre'
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {car.cars.map((premium, index) => (
                  <SwiperSlide key={index}>
                    <div className="box" style={{ textAlign: 'start' }}>
                      <div className="box-img"
                        onClick={() => goToDetails(premium.slug)}
                      >
                        <img src={premium.thumbnail_image_url} alt="" className="w-100" />
                      </div>
                      <div className="box-content">
                        <span>{premium.category_name}</span>
                        <h4
                          onClick={() => goToDetails(premium.slug)}
                        >{premium.brand_name} {premium.name}</h4>
                        <div className="card-spec">
                          {premium.filters.map((filter, index) => (
                            <p key={index}>
                              <img src={filter.icon_url} alt="" />{filter.name}
                            </p>
                          ))}
                        </div>
                        <div className="card-price">
                          <div className="offer-details">
                            <span>
                              <s>{t('BOOKNOW.AED')} {premium.original_daily_price}</s>
                            </span>
                            <h5>{t('BOOKNOW.AED')} {premium.daily_price}</h5>
                            <p>{t('PRODUCT.DAY')}</p>
                          </div>
                          <div className="offer-details">
                            <span>
                              <s>{t('BOOKNOW.AED')} {premium.original_weekly_price}</s>
                            </span>
                            <h5>{t('BOOKNOW.AED')} {premium.weekly_price}</h5>
                            <p>{t('PRODUCT.WEEK')}</p>
                          </div>
                          <div className="offer-details">
                            <span>
                              <s>{t('BOOKNOW.AED')} {premium.original_monthly_price}</s>
                            </span>
                            <h5>{t('BOOKNOW.AED')} {premium.monthly_price}</h5>
                            <p>{t('PRODUCT.MONTH')}</p>
                          </div>
                        </div>
                        {premium?.fine_deposit != null && (
                          <div className="findDeposite">
                            <p>{t('HOME.FINEDEPOSIT')} :<span>{t('BOOKNOW.AED')} {premium?.fine_deposit}</span></p>
                          </div>
                        )}
                        <div className="advantages">
                          <div className="box-dropdown">
                            <p className="dropbtn dropup">
                              <img src={tick} alt="" />{premium.feature_1}
                            </p>
                            <div className="dropdown-content">
                              <p>{premium?.feature_description_1}</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup">
                              <img src={tick} alt="" />{premium.feature_2}
                            </p>
                            <div className="dropdown-content">
                              <p>{premium?.feature_description_2}</p>
                            </div>
                          </div>
                          <div className="box-dropdown">
                            <p className="dropbtn dropup">
                              <img src={tick} alt="" />{premium.feature_3}
                            </p>
                            <div className="dropdown-content">
                              <p>{premium?.feature_description_3}</p>
                            </div>
                          </div>
                        </div>
                        <div className="connect-us">
                          <a id={`booknow${premium.id}`} className="booknow">{t('HOME.BOOKNOW')}</a>
                          <a className="chatnow" onClick={StaticMethod.openWhatsApp}>
                            <img
                              // onClick={StaticMethod.openWhatsApp}
                              src={whatsApp}
                              alt="" />{t('HOME.CHATNOW')}
                          </a>
                        </div>
                      </div>
                      {premium.is_hot_offer && (
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
          <span ref={lazyContainerRef} className="lazyContainer"></span>




          {/* <section className="featureSec feature-mobile-screen">
            <div className="container">
              <h3>Featured Offers</h3>
              <Swiper {...featureSliderConfig}>
                <div className="box">
                  <a href="">
                    <img src={fea1} alt="" className="w-100" />
                  </a>
                </div>
                <div className="box">
                  <a href="">
                    <img src={fea2} alt="" className="w-100" />
                  </a>
                </div>
                <div className="box">
                  <a href="">
                    <img src={fea3} alt="" className="w-100" />
                  </a>
                </div>
              </Swiper>
            </div>
          </section> */}

          {/*-----Featured Section-----*/}

          <section className="featureSec feature-mobile-screen">
            <div className="container">
              <h3 style={{ textAlign: 'start' }}>{lstData?.featured_offer_title}</h3>
              {/* <h3 style={{ textAlign: 'start' }}>Top Rent a Car Dubai Offers</h3> */}
              <Swiper {...featureSliderConfig}>
                {feature.featured_offers.map((offer, index) => (
                  <SwiperSlide>
                    <div key={index} className="box"
                    // onClick={() => gotoHotOffers(offer?.link)}
                    >
                      <img src={offer.image_url} alt="" className="w-100" />
                    </div>
                  </SwiperSlide>
                ))}

              </Swiper>
            </div>
          </section>
          {/*-----End Featured Section-----*/}


          {/* <section className="logoSec">
            <div className="container">
              <h4 className="main-head">Rent Car by Brands</h4>
              <p className="main-pg">Our cars are available on Dubai and UAE. All vehicles are recently purchased or well maintained
              </p>

              <Swiper {...carLogos}>
                <div>
                  <div className="box">
                    <img src={audi} alt="Audi" />
                  </div>
                  <h4>Audi</h4>
                </div>
                <div>
                  <div className="box">
                    <img src={gmc} alt="GMC" />
                  </div>
                  <h4>GMC</h4>
                </div>
                <div>
                  <div className="box">
                    <img src={citroen} alt="Citroen" />
                  </div>
                  <h4>Citroen</h4>
                </div>
                <div>
                  <div className="box">
                    <img src={chevrolet} alt="Chevrolet" />
                  </div>
                  <h4>Chevrolet</h4>
                </div>
                <div>
                  <div className="box">
                    <img src={bmw} alt="BMW" />
                  </div>
                  <h4>BMW</h4>
                </div>
                <div>
                  <div className="box">
                    <img src={lexus} alt="Lexus" />
                  </div>
                  <h4>Lexus</h4>
                </div>
              </Swiper>

            </div>
          </section> */}
          {/*-----Logos Section-----*/}
          <section className="logoSec">
            <h4 className="main-head">{lstData?.brands_title}</h4>
            {/* <h4 className="main-head">Hire Car in Dubai</h4> */}
            <p className="main-pg">{lstData?.brands_description}</p>
            {/* <p className="main-pg">Choose from our bandwagon of the best, new, and well serviced collection of notable car brands to be driven in Dubai and UAE. You can choose the right one for you and your trip, with services ranging from Mercedes rental Dubai to SUV rent a car in Dubai and more. A long-term car rental is a flexible and customizable option if you need a car for a month or more.</p> */}
            <div className="container">
              <Swiper {...carLogos}
                scrollbar={{ draggable: true }}
                modules={[Navigation, Pagination, Scrollbar]}
                navigation={{
                  nextEl: '.slider-next',
                  prevEl: '.slider-prev'
                }}
                pagination={{ clickable: true }}

                // watchSlidesProgress={true}
                // progress={true} // Enable progress bar
                // progressBar={{
                //   dragSize: 10, // Size of draggable progress bar
                //   hide: false, // Hide the progress bar initially
                //   shadow: false, // Display shadow around progress bar
                //   background: 'red', // Color of the progress bar
                // }}
                loop={true}              >
                {brandDetails.map((brand, index) => (
                  <SwiperSlide>
                    <div key={index} className="swiper-slide">
                      <div className="box"
                        onClick={() => goToBrand(brand.slug)}
                      >
                        <img src={brand.logo_url} alt={brand.name} />
                      </div>
                      <h4>{brand.name}</h4>
                    </div>
                  </SwiperSlide>
                ))}



              </Swiper>
              {/* Scrollbar can be implemented here if needed */}
            </div>
          </section>
          <span ref={lazyContainerRef} className="lazyContainer"></span>

          {/*-----End Logos Section-----*/}

          {/* <section className="ourjourneySec">
            <div className="container">
              <h4 className="main-head">Our Journey So Far</h4>
              <div className="details">
                <div className="box">
                  <img src={jou1} alt="" />
                  <div className>
                    <h5>100%</h5>
                    <p>Happy Customers</p>
                  </div>
                </div>
                <div className="box">
                  <img src={jou2} alt="" />
                  <div className>
                    <h5>200K</h5>
                    <p>KM’s Travelled</p>
                  </div>
                </div>
                <div className="box">
                  <img src={jou3} alt="" />
                  <div className>
                    <h5>27+</h5>
                    <p>Locations</p>
                  </div>
                </div>
                <div className="box">
                  <img src={jou4} alt="" />
                  <div className>
                    <h5>4.9 /5</h5>
                    <p>Ratings overall</p>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/*----------Our Journey So Far Section--------*/}

          {isLazyContentVisible &&
            // lstData?.journeys?.length !== 0 && 
            (
              <section className="ourjourneySec">
                <div className="container">
                  <h4 className="main-head">{lstData?.journey_title}</h4>
                  {/* <h4 className="main-head">Our Prized Moments</h4> */}
                  <div className="details">
                    {journy?.journeys.map((journey, index) => (
                      <div className="box" key={index}>
                        <img src={journey.icon_url} alt="" />
                        <div>
                          <h5>{journey.title}</h5>
                          <p>{journey.label}</p>
                        </div>
                      </div>
                    ))}


                  </div>
                </div>
              </section>
            )}
          {/*----------End Our Journey So Far Section--------*/}


          {/* <section className="Happythoughts">
            <div className="container">
              <div className="details">
                <div className="leftSec">
                  <h4 className="main-head">Happy thoughts about <span>Let’s Drive</span></h4>
                  <button className=" slider-nav  prev-sec">
                    <img src={prev} alt="" />
                  </button>
                  <button className=" slider-nav  next-sec">
                    <img src={next} alt="" />
                  </button>
                  <div className="leave-a-review">
                    <a href> <img src={reply} />Leave a Review</a>
                  </div>
                </div>
                <div className="rightSec">
                </div>
              </div>
            </div>
          </section> */}

          {/*----Happy thoughts about Let’s Drive------*/}


          {isLazyContentVisible
            // && lstData?.testimonials?.length !== 0 
            && (
              <section className="Happythoughts">
                <div className="container">
                  <div className="details">
                    <div className="leftSec" style={{ textAlign: 'start' }}>
                      {/* <h4 className="main-head">Words of Appreciation @ <span>Let’s Drive</span></h4> */}
                      <h4 className="main-head">
                        {lstData?.testimonial_title_1}
                        <span>{lstData?.testimonial_title_2}</span>
                      </h4>
                      <button className="slider-nav prev-sec" style={{ alignContent: 'start' }}>
                        <img src={prev} alt="" />
                      </button>
                      <button className="slider-nav next-sec" style={{ alignContent: 'start' }}>
                        <img src={next} alt="" />
                      </button>
                      <div className="leave-a-review">
                        <a href="https://g.co/kgs/V2aaZM" target="_blank" rel="noopener noreferrer">
                          <img src={reply} alt="" />
                          {t('HOME.LEAVEREVIEW')}
                        </a>
                      </div>
                    </div>
                    <div className="rightSec">
                      <div className="swiper-container">
                        <div className="swiper-wrapper">

                          <Swiper {...happyThoughtsConfig}>
                            {test?.testimonials.map((test, index) => (
                              <SwiperSlide>
                                <div className="swiper-slide" key={index} style={{ textAlign: 'start' }}>
                                  <div className="box">
                                    <img src={ques} alt="" />
                                    <h5>{test.title}</h5>
                                    <p className="main-content">{test.description}</p>
                                    <div className="rating">
                                      <div className="star" style={{ backgroundImage: `url(${star})`, backgroundPosition: '0 -16px', width: '80px', height: '16px', }}>
                                        <p>
                                          <span className="stars alignright">
                                            <span style={{ width: getStars(test?.rating), backgroundPosition: '0 0' }}></span>
                                          </span>
                                        </p>
                                      </div>
                                      <div></div>
                                      <div className="stat-per" style={{ paddingLeft: '10px' }}>
                                        <p>{starFixed(test?.rating)}/5.0</p>
                                      </div>
                                    </div>
                                    <img src={google} alt="" />
                                  </div>
                                  <div className="author">
                                    <h5>{test.name}</h5>
                                    <p>{test.sub_description}</p>
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>

                        </div>
                        <div className="swiper-scrollbar"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}



          {/*----End Happy thoughts about Let’s Drive------*/}

          {/* <section className="LetsDrive">
            <div className="container">
              <h4 className="main-head">Let's Drive Follows Three Working Steps</h4>
              <div className="details">
                <div className="box">
                  <img src={step1} alt="" />
                  <h5>Explore Cars</h5>
                  <p>Our cars are available on Dubai and UAE. All vehicles are recently purchased or well maintained</p>
                </div>
                <div className="box">
                  <img src={step2} alt="" />
                  <h5>Choose your Car</h5>
                  <p>Our cars are available on Dubai and UAE. All vehicles are recently purchased or well maintained</p>
                </div>
                <div className="box">
                  <img src={step3} alt="" />
                  <h5>Book your Car</h5>
                  <p>Our cars are available on Dubai and UAE. All vehicles are recently purchased or well maintained</p>
                </div>
                <div className="box">
                  <img src={step4} alt="" />
                  <h5>Drive the Car</h5>
                  <p>Our cars are available on Dubai and UAE. All vehicles are recently purchased or well maintained</p>
                </div>
              </div>
            </div>
          </section> */}

          {/*-----Let's Drive Follows Three Working Steps-----*/}

          {isLazyContentVisible &&
            // lstData?.working_steps?.length !== 0 &&
            (
              <section className="LetsDrive">
                <div className="container">
                  <h4 className="main-head">{lstData?.working_steps_title}</h4>
                  {/* <h4 className="main-head">The 4-Step Process at Let’s Drive</h4> */}
                  <div className="details">
                    {workstep?.working_steps.map((steps, index) => (
                      <div className="box" key={index}>
                        <img src={steps.icon_url} alt="" />
                        <h5>{steps.title}</h5>
                        <p>{steps.description}</p>
                      </div>
                    ))}


                  </div>
                </div>
              </section>
            )}

          {/*-----End Let's Drive Follows Three Working Steps-----*/}




          {/* <section className="whyChoose" style={{ backgroundImage: `url(${bg})` }}>
            <div className="container">
              <div className="details">
                <div className="leftSec">
                  <h3>Why Choose Us</h3>
                  <p>Our cars are available on Dubai and UAE. All vehicles are recently purchased or well maintained to keep you
                    safe while driving.</p>
                </div>
                <div className="rightSec">
                  <ul>
                    <li>
                      <div className="box">
                        <img src={choose1} alt="" />
                        <p>Save on your next trip.</p>
                      </div>
                    </li>
                    <li>
                      <div className="box">
                        <img src={choose4} alt="" />
                        <p>Free fuel for new clients</p>
                      </div>
                    </li>
                    <li>
                      <div className="box">
                        <img src={choose1} alt="" />
                        <p>Customer satisfaction rates</p>
                      </div>
                    </li>
                    <li>
                      <div className="box">
                        <img src={choose4} alt="" />
                        <p>Well maintained cars</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section> */}


          {/*------Why choose us Section----- */}


          {
            isLazyContentVisible
            // && lstData?.why_chooses?.length !== 0 
            && (
              <section
                className="whyChoose"
                // style={{ backgroundImage: `url(${lstData?.why_image_url})`}}
                style={{ backgroundImage: `url(${bg})` }}
              >
                <div className="container">
                  <div className="details">
                    <div className="leftSec" >
                      <h3 style={{ textAlign: 'start' }}>{lstData?.why_title}</h3>
                      {/* <h3 style={{ textAlign: 'start' }}>Why Choose Let’s Drive? */}
                      {/* </h3> */}
                      <p style={{ textAlign: 'start' }}>{lstData?.why_description}</p>
                      {/* <p style={{ textAlign: 'start' }}>Who hasn't fantasized about driving an extravagant and ultra-stylish car in Dubai? For car enthusiasts, the monthly car rental service in Dubai provided by us is something you cannot miss on. And what if you get a fantastic opportunity to ride in your favorite car at an affordable price? Yes, at Let’s Drive, we are dedicated to helping you realize your dreams by providing professional and dependable rent-a-car services in Dubai. Just spare 5 minutes to book a hire car in Dubai from Let’s Drive, as our fleet of rental cars is too good to resist!</p> */}
                    </div>
                    <div className="rightSec">
                      <ul>
                        {whychooseus.why_chooses.map((us, index) => (
                          <li key={index}>
                            <div className="box">
                              <img src={us.icon_url} alt="" />
                              <p>{us.title}</p>
                            </div>
                          </li>
                        ))}

                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            )}

          {/*------End Why choose us Section----- */}

          {/* <section className="premiumSec">
            <div className="container position-relative">
              <h4 className="main-head">Premium Cars</h4>
              <p className="main-pg">Our cars are available on Dubai and UAE. All vehicles are recently purchased or well maintained
              </p>
              <button className=" slider-nav  slider-pre">
                <img src={prev} alt="" />
              </button>
              <button className=" slider-nav  slider-nex">
                <img src={next} alt="" />
              </button>
            </div>
          </section> */}

          {/*-----Premium Cars Section-----*/}



          {isLazyContentVisible &&
            // lstData?.premium_cars?.length !== 0 && 
            (
              <section className="premiumSec">
                <div className="container position-relative">

                  <h4 className="main-head">{lstData?.premium_car_title}</h4>
                  {/* <h4 className="main-head">Premium Quality Cars</h4> */}
                  <p className="main-pg">{lstData?.premium_car_description}</p>
                  {/* <p className="main-pg">Enjoy a seamless car hire Dubai process with flexible services, booking, and 0% confusion.</p> */}

                  <Swiper
                    {...premiumCarsConfig}
                    modules={[Navigation, Pagination, Scrollbar]}
                    navigation={{
                      nextEl: '.slider-nex',
                      prevEl: '.slider-pre'
                    }}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                  >

                    {/* <SwiperSlide>
                      <div className="container position-relative">
                        <div className="swiper-container">
                          <div className="swiper-wrapper" style={{ textAlign: 'start'}}>
                            {premium.premium_cars.map((premium, index) => (
                <div className="swiper-slide" key={index}>
                  <div className="box">
                    <div className="box-img" 
                    // onClick={() => goToDetail(premium.slug)}
                    >
                      <img src={premium.thumbnail_image_url} alt="" className="w-100" />
                    </div>
                    <div className="box-content">
                      <span>{premium.category_name}</span>
                      <h4
                      //  onClick={() => goToDetail(premium.slug)}
                       >
                        {premium.brand_name} {premium.name}
                      </h4>
                      <div className="card-spec">
                        {premium.filters.map((filter, index) => (
                          <p key={index}>
                            <img src={filter.icon_url} alt="" />{filter.name}
                          </p>
                        ))}
                      </div>
                      <div className="card-price">
                        <div className="offer-details">
                          <span>
                            <s>{t('BOOKNOW.AED')} {premium.original_daily_price}</s>
                          </span>
                          <h5>{t('BOOKNOW.AED')} {premium.daily_price}</h5>
                          <p>{t('PRODUCT.DAY')}</p>
                        </div>
                        <div className="offer-details">
                          <span>
                            <s>{t('BOOKNOW.AED')} {premium.original_weekly_price}</s>
                          </span>
                          <h5>{t('BOOKNOW.AED')} {premium.weekly_price}</h5>
                          <p>{t('PRODUCT.WEEK')}</p>
                        </div>
                        <div className="offer-details">
                          <span>
                            <s>{t('BOOKNOW.AED')} {premium.original_monthly_price}</s>
                          </span>
                          <h5>{t('BOOKNOW.AED')} {premium.monthly_price}</h5>
                          <p>{t('PRODUCT.MONTH')}</p>
                        </div>
                      </div>
                      {premium?.fine_deposit != null && (
                        <div className="findDeposite">
                          <p>{t('HOME.FINEDEPOSIT')} :<span>{t('BOOKNOW.AED')} {premium?.fine_deposit}</span></p>
                        </div>
                      )}
                      <div className="advantages">
                        <div className="box-dropdown">
                          <p className="dropbtn dropup">
                            <img src={tick} alt="" />{premium.feature_1}
                          </p>
                          <div className="dropdown-content">
                            <p>{premium?.feature_description_1}</p>
                          </div>
                        </div>
                        <div className="box-dropdown">
                          <p className="dropbtn dropup">
                            <img src={tick} alt="" />{premium.feature_2}
                          </p>
                          <div className="dropdown-content">
                            <p>{premium?.feature_description_2}</p>
                          </div>
                        </div>
                        <div className="box-dropdown">
                          <p className="dropbtn dropup">
                            <img src={tick} alt="" />{premium.feature_3}
                          </p>
                          <div className="dropdown-content">
                            <p>{premium?.feature_description_3}</p>
                          </div>
                        </div>
                      </div>
                      <div className="connect-us">
                        <a 
                        // onClick={(e) => openBookingModal(premium, e)} 
                          id={`booknow${premium.id}`} className="booknow">{t('HOME.BOOKNOW')}</a>
                        <a 
                        // onClick={openWhatsApp}
                         className="chatnow">
                          <img src={whatsApp} alt="" />{t('HOME.CHATNOW')}
                        </a>
                      </div>
                    </div>
                    {premium.is_hot_offer && (
                      <div className="productLabel">
                        <div className="offer-label">{t('HOME.HOTOFFER')}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
                          
                          </div>
                          <div className="swiper-scrollbar"></div>
                        </div>

                      </div>
                    </SwiperSlide> */}
                    {premium.premium_cars.map((premium, index) => (

                      <SwiperSlide key={index}>
                        <div className="box" style={{ textAlign: 'start' }}>
                          <div className="box-img" onClick={() => goToDetails(premium.slug)}>
                            <img src={premium.thumbnail_image_url} alt="" className="w-100" />
                          </div>
                          <div className="box-content">
                            <span>{premium.category_name}</span>
                            <h4 onClick={() => goToDetails(premium.slug)}>{premium.brand_name} {premium.name}</h4>
                            <div className="card-spec">
                              {premium.filters.map((filter, index) => (
                                <p key={index}>
                                  <img src={filter.icon_url} alt="" />{filter.name}
                                </p>
                              ))}
                            </div>
                            <div className="card-price">
                              <div className="offer-details">
                                <span>
                                  <s>{t('BOOKNOW.AED')} {premium.original_daily_price}</s>
                                </span>
                                <h5>{t('BOOKNOW.AED')} {premium.daily_price}</h5>
                                <p>{t('PRODUCT.DAY')}</p>
                              </div>
                              <div className="offer-details">
                                <span>
                                  <s>{t('BOOKNOW.AED')} {premium.original_weekly_price}</s>
                                </span>
                                <h5>{t('BOOKNOW.AED')} {premium.weekly_price}</h5>
                                <p>{t('PRODUCT.WEEK')}</p>
                              </div>
                              <div className="offer-details">
                                <span>
                                  <s>{t('BOOKNOW.AED')} {premium.original_monthly_price}</s>
                                </span>
                                <h5>{t('BOOKNOW.AED')} {premium.monthly_price}</h5>
                                <p>{t('PRODUCT.MONTH')}</p>
                              </div>
                            </div>
                            {premium?.fine_deposit != null && (
                              <div className="findDeposite">
                                <p>{t('HOME.FINEDEPOSIT')} :<span>{t('BOOKNOW.AED')} {premium?.fine_deposit}</span></p>
                              </div>
                            )}
                            <div className="advantages">
                              <div className="box-dropdown">
                                <p className="dropbtn dropup">
                                  <img src={tick} alt="" />{premium.feature_1}
                                </p>
                                <div className="dropdown-content">
                                  <p>{premium?.feature_description_1}</p>
                                </div>
                              </div>
                              <div className="box-dropdown">
                                <p className="dropbtn dropup">
                                  <img src={tick} alt="" />{premium.feature_2}
                                </p>
                                <div className="dropdown-content">
                                  <p>{premium?.feature_description_2}</p>
                                </div>
                              </div>
                              <div className="box-dropdown">
                                <p className="dropbtn dropup">
                                  <img src={tick} alt="" />{premium.feature_3}
                                </p>
                                <div className="dropdown-content">
                                  <p>{premium?.feature_description_3}</p>
                                </div>
                              </div>
                            </div>
                            <div className="connect-us">
                              <a id={`booknow${premium.id}`} className="booknow">{t('HOME.BOOKNOW')}</a>
                              <a className="chatnow" onClick={StaticMethod.openWhatsApp}>
                                <img

                                  src={whatsApp} alt="" />{t('HOME.CHATNOW')}
                              </a>
                            </div>
                          </div>
                          {premium.is_hot_offer && (
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
            )}

          {/*-----End Premium Cars Section-----*/}



          {/* <section className="whoSec">
            <div className="container">
              <div className="details">
                <div className="leftSec">
                  <img src={whowe} />
                </div>
                <div className="rightSec">
                  <span>who we are</span>
                  <h2>Feel the best experience with our Rental Deals.</h2>
                  <p>Lets Drive Car Rental is an independent rent-a-car agency based in Dubai, providing both tourists and
                    residents with the most extensive selection of vehicles to hire. Whether you need an economy car, luxury car,
                    or an SUV, we have a car to suit all occasions and budgets.</p>
                  <p> Our car rental fleet, in fact, is composed of more
                    than 1000+ vehicles sourced from leading budget and luxury brands such as Nissan, Audi, Toyota, and Mercedes,
                    among others. It brings us immense pride as we not only provide our customers with high-quality vehicles but
                    also offer dedicated service and follow a no-hidden fee policy.</p>
                  <div className="learn-more">
                    <a href>Learn More</a>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/*-----Who we are Section-----*/}


          {
            isLazyContentVisible && (
              <section className="whoSec">
                <div className="container">
                  <div className="details">
                    <div className="leftSec">
                      <img
                        // src={lstData?.who_image_url}
                        src={whowe}
                        alt="Who Image" />
                    </div>
                    <div className="rightSec" style={{ textAlign: 'start' }}>
                      {/* <span style={{ textAlign: 'start' }}>About Let’s Drive</span>
                      <h2 style={{ textAlign: 'start' }}>Valuing the Ultimate Car Rental Satisfaction for Every Trip in UAE and Dubai.</h2>
                      <p style={{ textAlign: 'start' }}>Bound with a clear goal to ensure that traveling in UAE and Dubai should be enjoyable and hassle free, Let’s Drive came forward to give long lasting rental car experiences for car lovers. Today, we offer a large fleet of varied rent a car in Dubai and this would include more than 1000+ cars purchased from leading brands. Each of our vehicles is checked and serviced to ensure safety and comfort and never compromised at any point of the ride.</p> */}

                      <span>{lstData?.who_label}</span>
                      <h2>{lstData?.who_title}</h2>
                      <p>{lstData?.who_description}</p>
                      <div className="learn-more" style={{ textAlign: 'left' }}>
                        <a
                          onClick={goToAbout}
                        >{t('HOME.LEARNMORE')}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          {/*-----End Who we are Section-----*/}


          {/*------Blog Section Desktop-----*/}
          {/* <section className="Blog blog-desktop-screen">
        <div className="container">
          <h4>Our Blog</h4>
          <div className="detail">
            <p>Lorem Ipsum is simply a dummy text of the printing and typesetting industry.</p>
            <a href>View all</a>
          </div>
          <div className="blogSec">
            <div className="card">
              <figure>
                <img src={blog3} />
              </figure>
              <p>Lorem Ipsum is simply a dummy text of the printing and typesetting industry.</p>
            </div>
            <div className="card">
              <figure>
                <img src={blog2} />
              </figure>
              <p>Lorem Ipsum is simply a dummy text of the printing and typesetting industry.</p>
            </div>
            <div className="card">
              <figure>
                <img src={blog1} />
              </figure>
              <p>Lorem Ipsum is simply a dummy text of the printing and typesetting industry.</p>
            </div>
          </div>
        </div>
      </section> */}


          {
            isLazyContentVisible
            // && blogDetails 
            && (
              <section className="Blog blog-desktop-screen">
                <div className="container">
                  {/* <h4 style={{ textAlign: 'start' }}>Blogs Corner</h4> */}

                  <h4 style={{ textAlign: 'start' }}>{lstData?.blog_title}</h4>
                  <div className="detail">
                    {/* <p style={{ textAlign: 'start' }}>Lorem Ipsum is simply a dummy text of the printing and typesetting industry.</p> */}

                    <p style={{ textAlign: 'start' }}>{lstData?.blog_description}</p>


                    <a
                      onClick={goToBlog}
                    >{t('HOME.VIEWALL')}</a>
                  </div>
                  <div className="blogSec">
                    {blogs.blogs.map((blog, index) => (
                      <div className="card" key={index}>
                        <figure
                          onClick={() => goToDetail(blog.slug)}
                        >
                          <img src={blog.thumbnail_image_url} alt="Blog Thumbnail" />
                        </figure>
                        <p style={{ textAlign: 'start' }}>{blog.short_description}</p>
                        <a
                          onClick={() => goToDetail(blog.slug)}
                          className="blogReadmore">
                          {t('HOME.READMORE')}
                        </a>
                      </div>
                    ))}


                  </div>
                </div>
              </section>
            )
          }


          {/*------End Blog Section Desktop-----*/}


          {/* <section class="Blog blog-mobile-screen">
  <div class="container">
    <h4>Our Blog</h4>
    <div class="detail">
      <p>Lorem Ipsum is simply a dummy text of the printing and typesetting industry.</p>
      <a href="">View all</a>
    </div>

  </div>
</section> */}

          {/*------Blog Section Mobile-----*/}
          {
            isLazyContentVisible
            // && blogDetails 
            && (
              // <section className="Blog blog-mobile-screen">
              //   <h4 style={{ textAlign: 'start' }}>{lstData?.blog_title}</h4>
              //   <div className="detail">
              //     <p style={{ textAlign: 'start' }}>{lstData?.blog_description}</p>
              //     <a
              //     onClick={goToBlog}
              //     >{t('HOME.VIEWALL')}</a>
              //   </div>
              //   <div className="container">
              //     <Swiper {...blogSliderConfig}>
              //       {blogs.blogs.map((blog, index) => (
              //         <SwiperSlide key={index}>
              //           <div className="card">
              //             <figure
              //             onClick={() => goToDetail(blog.slug)}>
              //               <img src={blog.thumbnail_image_url} alt="Blog Thumbnail" />
              //             </figure>
              //             <p style={{ textAlign: 'start' }}>{blog.short_description}</p>
              //             <a 
              //             onClick={() => goToDetail(blog.slug)} 
              //             className="blogReadmore">{t('HOME.READMORE')}</a>
              //           </div>
              //         </SwiperSlide>
              //       ))}
              //     </Swiper>
              //   </div>
              // </section>
              <section className="Blog blog-mobile-screen">
                <h4 style={{ textAlign: 'start' }}>{lstData?.blog_title}</h4>
                <div className="detail">
                  <p style={{ textAlign: 'start' }}>{lstData?.blog_description}</p>
                  <a onClick={goToBlog}>{t('HOME.VIEWALL')}</a>
                </div>
                <div className="container">
                  {blogs.blogs.map((blog, index) => (
                    <div className="card" key={index}>
                      <figure onClick={() => goToDetail(blog.slug)}>
                        <img src={blog.thumbnail_image_url} alt="Blog Thumbnail" />
                      </figure>
                      <p style={{ textAlign: 'start' }}>{blog.short_description}</p>
                      <a onClick={() => goToDetail(blog.slug)} className="blogReadmore">
                        {t('HOME.READMORE')}
                      </a>
                    </div>
                  ))}
                </div>
              </section>

            )
          }

          {/*------End Blog Section Mobile-----*/}





          <a href className="float" target="_blank">
            <img src={whatfix} alt="" />
          </a>








        </div>
      </div>
    </>
  );
};

export default Home;
