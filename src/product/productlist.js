import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useLocation, useParams, useHref, useNavigate } from 'react-router-dom';
import { useTranslation, } from "react-i18next";
import ReactSlider from 'react-slider';
// import './slider.css';
import carbg from '../assets/images/booking/bookimage.jpg';
import tick from '../assets/images/home/tick.svg';
import whatsapp from '../assets/images/home/whatsapp.svg';
import spec1 from '../assets/images/home/spec1.png';
import spec2 from '../assets/images/home/spec2.png';
import spec3 from '../assets/images/home/spec3.png';
import filter from '../assets/images/product-list/filter.svg';
import sort from '../assets/images/product-list/sort.svg';
import AppEndPoints from '../config/AppEndPoints';
import productService from '../service/product-service';
import '../App.css';
import AuthService from '../service/authService';
import ApiService from '../service/ApiService';
import left from '../assets/images/product-list/left.png';
import right from '../assets/images/product-list/right.png';
import StaticMethod from '../service/staticmethod';
import { WhatsappIcon } from 'react-share';
import BookSection from '../booking-flow/booking-sec';
const ProductList = ({
    // lstActive,
    // filters,
    // lstFilters,
    // data,
    // value,
    highValue,
    // options,
    // // fromRange,
    // // toRange,
    // selected,
    // minModel,
    // maxModel,
    // options1,
    // // goToDetail,

    // // fromPriceChanged,
    // // toPriceChanged,
    // priceType,
    // categoryClicked,
    // brandClicked,
    // modelChanged,
    // checkboxClicked,
    resetFilter,
    // changeSearchkey,
    // searchPage,
    // selectedItem,
    // loadPreviousPage,
    // fetchByPage,
    // showAllCars,
    // loadNextPage,
    // sortBy,
    // openBookingModal,
    // openWhatsApp,
    // seo_content,
    // carId,
    // brandName,
    // carName,
    // carImg,
    // blnBookNowOpen,
    // close,
    // blnSearch,
    // searches,
    // total_searches,
    // pageNo,
    // count,
    // sortValue,
    // sortName,
    // option1,
    // name,
}) => {

    const currentUrl = window.location.href;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [data, setData] = useState({ cars: [] });
    const [filters, setFilters] = useState({ brands: [], categories: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNo, setPageNo] = useState();
    const [pages, setPages] = useState([]);
    const [count, setCount] = useState(0);
    const [lstSeats, setLstSeats] = useState([]);
    const [lstCategory, setLstCategory] = useState([]);
    const [lstLocation, setLstLocation] = useState([]);
    const [lstBrands, setLstBrands] = useState([]);
    const [lstFuelType, setLstFuelType] = useState([]);
    const [lstDoors, setLstDoors] = useState([]);
    const [lstTransmission, setLstTransmission] = useState([]);
    const [lstBodyPaint, setLstBodyPaint] = useState([]);
    const [lstFilters, setLstFilters] = useState([]);
    const [lstAppliedFilters, setLstAppliedFilters] = useState([]);
    const [lstAppliedCategory, setLstAppliedCategory] = useState([]);
    const [lstAppliedBrands, setLstAppliedBrands] = useState([]);
    const [category_id, setCategory_id] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [brandId, setBrandId] = useState(null);
    const [carId, setCarId] = useState(null);
    const [brandName, setBrandName] = useState('');
    const [carName, setCarName] = useState('');
    const [blnBookNowOpen, setBlnBookNowOpen] = useState(false);
    const [bln, setBlnLoggedIn] = useState(false);
    const [dctFilterIds, setDctFilterIds] = useState({});
    const [option1, setOption1] = useState([]);
    const [sortValue, setSortValue] = useState('relavance');
    const [sortName, setSortName] = useState('Relevance');
    const [selected, setSelected] = useState('daily');
    const [headName, setHeadName] = useState('Latest Arrivals');
    const [carImg, setCarImg] = useState('');
    const [blnShowAll, setBlnShowAll] = useState(false);
    const [value, setValue] = useState([0, 100000]);
    const [fromRange, setFromRange] = useState(0);
    const [toRange, setToRange] = useState(100000);
    const [minModel, setMinModel] = useState(2010);
    const [maxModel, setMaxModel] = useState(new Date().getFullYear());
    const [showAll, setShowAll] = useState(0);
    const [name, setName] = useState('');
    const [searches, setSearches] = useState([]);
    const [total_searches, setTotal_searches] = useState(0);
    const [otpP, setOtpP] = useState([]);
    const [otp, setOtp] = useState('');
    const [isPhoneNumber, setIsPhoneNumber] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [blnSearch, setBlnSearch] = useState(false);
    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const [blnInvalidOtp, setBlnInvalidOtp] = useState(false);
    const [blnSendOTP, setBlnSendOTP] = useState(false);
    const [otpErrorMessage, setOtpErrorMessage] = useState('');
    const [paths, setPaths] = useState({});
    const [isLocation, setIsLocation] = useState(false);
    const [location, setLocation] = useState(null);
    const [lan, setLan] = useState('en');
    const [seo_content, setSeo_content] = useState('');
    const { i18n, t } = useTranslation();
    const [openBookSec, setOpenBookSec] = useState(false);
    const currentLanguage = i18n.language;
    const navigate = useNavigate();
    const otpModalRef = useHref();
    const searchDropDivRef = useHref();
    const history = useHref();
    const { search } = useLocation();
    const { type, id } = useParams();

    const priceRangeChanged = (values) => {
        setFromRange(values[0]);
        setToRange(values[1]);
        setValue(values)
        getCars(1, true, false);
        // Handle the price range change logic here
    };

    const openBookingModal = async (data) => {
        console.log(data.car);

        const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        console.log(loggedIn);
        if (loggedIn) {
            // If logged in, set the car details and open the booking section
            setCarId(data.car.id);
            setBrandName(data.car.brand);
            setCarName(data.car.name);
            setCarImg(data.car.thumbnail_image_url);
            setOpenBookSec(true);
        } else {
            // If not logged in, redirect to login page and pass current URL as a redirect parameter
            const currentUrl = window.location.href; // Capture the current page URL
            const redirectUrl = encodeURIComponent(currentUrl); // Encode the URL
            const loginUrl = currentLanguage === 'ar' ? `/ar/login?redirect_url=${redirectUrl}` : `/en/login?redirect_url=${redirectUrl}`;
            window.location.href = loginUrl;
        }
    };

    const goToHome = () => {
        navigate(currentLanguage === 'ar' ? '/ar' : '/en')

        localStorage.setItem('activeMenu', 'home');

    }

    const goToDetails = (slug) => {
        // navigate('/productdetails');
        const path = `car-details/${slug}`
        navigate(currentLanguage === 'ar' ? `/ar/${path}` : `/en/${path}`);

        localStorage.setItem('activeMenu', 'rentcar');


    }

    useEffect(() => {
        if (currentLanguage === 'en') {
            setSortName('Relevance');
            setHeadName('Latest Arrivals');
            setOption1([
                { name: 'Low to High', value: 'price_low_to_high' },
                { name: 'High to Low', value: 'price_high_to_low' },
                { name: 'Relevance', value: 'relavance' },
            ]);
        } else {
            setSortName('ملاءمة');
            setHeadName('أحدث الوافدين');
            setOption1([
                { name: 'من أسفل إلى أعلى', value: 'price_low_to_high' },
                { name: 'من الأعلى إلى الأقل', value: 'price_high_to_low' },
                { name: 'ملاءمة', value: 'relavance' },
            ]);
        }
    }, [currentLanguage]); // Re-run this effect when `lan` changes

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const getFilterData = async () => {
        try {
            const data = await productService.getFilters();
            const filter = data?.data.data;
            console.log(filter);
            setFilters(filter);
            setFromRange(filter.min_price);
            setToRange(filter.max_price);



        } catch (error) {
            console.error('Error fetching getFilterData :', error);

        }
    }

    const changeSearchkey = (value) => {
        setName(value);
        setBlnSearch(true);

        // Implement search suggestions logic here
    };








    const getCars = (value, blnPage, showCars) => {
        const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage

        const headers = {
            'X-Localization': currentLanguage, // Example header to specify language
            Authorization: `Bearer ${token}`, // Example header to specify language
            'Access-Control-Max-Age': '3600',
            // Add other headers as needed
        };
        if (showCars) {
            setShowAll(1);
        }
        const data = {
            page: value,
            filter_list_id: dctFilterIds,
            category_slug: lstAppliedCategory,
            category_array_slug: lstAppliedCategory,
            search: searchValue,
            brand_slug: lstAppliedBrands,
            min_price: fromRange,
            max_price: toRange,
            min_model: minModel,
            max_model: maxModel,
            sort_by: sortValue,
            price_type: selected,
            is_all: showAll,
            brand_array_slug: lstAppliedBrands,
            location: location,
        };
        console.log('getcarData', data);

        try {
            ApiService.postData(AppEndPoints.cars, data, headers)
                .then((res) => {
                    const data = res.data;
                    console.log(data.data);
                    setData(data.data);
                    setSeo_content(data.data.seo_content);
                    setCurrentPage(data.data.current_page);

                    const lastPage = data.data.last_page;
                    const pagesArray = Array.from({ length: lastPage }, (_, index) => index + 1);
                    console.log(lastPage);
                    setPages(pagesArray);
                    setPageNo(data.data.current_page)
                    setCount(Math.ceil(data.data.total / data.data.per_page));
                    // Set other data states here...

                    document.title = data.data.meta_title;

                    if (lstAppliedCategory.length > 0) {
                        console.log("Fetching cars based on category:", lstAppliedCategory);
                        // getCars(); // Example values for value, blnPage, and showCars
                        setHeadName(data.data.cars[0]?.category_name);
                        console.log(data.data.cars[0].category_name);
                    } else if (lstAppliedBrands.length > 0) {
                        console.log("Fetching cars based on brands:", lstAppliedBrands);
                        // getCars(); // Example values for value, blnPage, and showCars
                        setHeadName(data.data.cars[0]?.brand_name);
                        console.log(data.data.cars[0].brand_name);
                    }

                    // document.querySelector('meta[name="keywords"]').setAttribute('content', data.meta_keywords);
                    // document.querySelector('meta[name="description"]').setAttribute('content', data.meta_description);
                    // document.querySelector('meta[name="robots"]').setAttribute('content', 'index, follow');
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });

        } catch (error) {
            console.error('Error fetching data:', error);

        }

    };

    // const getCars = (value, blnPage, showCars) => {
    //     if (showCars) {
    //         setShowAll(1);
    //     }

    //     const data = {
    //         page: value,
    //         filter_list_id: dctFilterIds,
    //         category_slug: category_id,
    //         category_array_slug: lstAppliedCategory,
    //         search: searchValue,
    //         brand_slug: brandId,
    //         min_price: fromRange,
    //         max_price: toRange,
    //         min_model: minModel,
    //         max_model: maxModel,
    //         sort_by: sortValue,
    //         price_type: selected,
    //         is_all: showAll,
    //         brand_array_slug: lstAppliedBrands,
    //         location: location,
    //     };

    //     ApiService.postData(AppEndPoints.cars, data)
    //         .then((res) => {    
    //             const dataop = res.data;
    //             if (dataop.errorCode === 1 && !data) {
    //                 window.location.href = '/404';
    //               }
    //             // console.log(data.data.total);
    //             setData(data.data);
    //             if (dataop?.data?.location) {
    //                 if (lan === 'en') {
    //                   setHeadName(`Rental Cars In ${dataop?.data?.location}`);
    //                 } else if (lan === 'ar') {
    //                   setHeadName(`تأجير السيارات في ${dataop?.data?.location}`);
    //                 }
    //               } else {
    //                 if (window.location.href.includes('/category')) {
    //                   setHeadName(dataop.data?.cars[0]?.category_name);
    //                 }
    //                 if (window.location.href.includes('/brand')) {
    //                   setHeadName(dataop.data?.cars[0]?.brand_name);
    //                 }
    //               }
    //             setSeo_content(data.seo_content);
    //             setCurrentPage(data.current_page);
    //             setCount(Math.ceil(data.total / data.per_page));

    //             if (blnPage) {
    //                 setPages();
    //               }
    //             // Update SEO metadata
    //             // document.title = data.meta_title;
    //             // document.querySelector('meta[name="keywords"]').setAttribute('content', data.meta_keywords);
    //             // document.querySelector('meta[name="description"]').setAttribute('content', data.meta_description);
    //             // document.querySelector('meta[name="robots"]').setAttribute('content', 'index, follow');
    //             if (sessionStorage.getItem('bookNowOpened')) {
    //                 const bookNowOpened = parseInt(sessionStorage.getItem('bookNowOpened'));
    //                 if (bookNowOpened) {
    //                   const carId = bookNowOpened;
    //                   setTimeout(() => {
    //                     const bookNowElement = document.getElementById('booknow' + carId);
    //                     if (bookNowElement) {
    //                       bookNowElement.click();
    //                     } else {
    //                       // Logic for opening booking modal
    //                     }
    //                   }, 600);
    //                 }
    //               }
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // };

    const searchPage = () => {
        setSearchValue(name);
        setCurrentPage(1);
        getCars(1, true, false);
    };

    const loadNextPage = () => {
        window.scrollTo(0, 0);
        if (count > currentPage) {
            const nextPage = currentPage + 1;
            console.log(`nextpage${nextPage}`);
            setCurrentPage(nextPage);
            if (count > 4) {
                if (nextPage + 2 < count + 1 && nextPage > 1) {
                    setPages([nextPage - 1, nextPage, nextPage + 1, nextPage + 2]);
                } else if (nextPage + 1 < count + 1 && nextPage > 2) {
                    setPages([nextPage - 2, nextPage - 1, nextPage, nextPage + 1]);
                } else if (nextPage < count + 1 && nextPage > 3) {
                    setPages([nextPage - 3, nextPage - 2, nextPage - 1, nextPage]);
                }
                getCars(nextPage, false, false);
            } else {
                getCars(nextPage, true, false);
            }
        }
    };


    const loadPreviousPage = () => {
        window.scrollTo(0, 0);
        if (currentPage !== 1) {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            if (count > 4) {
                if (prevPage + 2 < count + 1 && prevPage > 1) {
                    setPages([prevPage - 1, prevPage, prevPage + 1, prevPage + 2]);
                } else if (prevPage + 1 < count + 1 && prevPage > 2) {
                    setPages([prevPage - 2, prevPage - 1, prevPage, prevPage + 1]);
                } else if (prevPage < count + 1 && prevPage > 3) {
                    setPages([prevPage - 3, prevPage - 2, prevPage - 1, prevPage]);
                } else {
                    setPages([1, 2, 3, 4]);
                }
                getCars(prevPage, false, false);
            } else {
                getCars(prevPage, true, false);
            }
        }
    };

    const fetchByPage = (page) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
        if (count > 4) {
            if (page + 2 < count + 1 && page > 1) {
                setPages([page - 1, page, page + 1, page + 2]);
            } else if (page + 1 < count + 1 && page > 2) {
                setPages([page - 2, page - 1, page, page + 1]);
            } else if (page < count + 1 && page > 3) {
                setPages([page - 3, page - 2, page - 1, page]);
            } else {
                setPages([1, 2, 3, 4]);
            }
            getCars(page, false, false);
        } else {
            getCars(page, true, false);
        }
    };

    const showAllCars = () => {

        getCars(1, false, true);
        setCurrentPage(1);
        setShowAll(1);
    };


    const handleSortBy = (value) => {
        setSortValue(value.value);
        setSortName(value.name);
        toggleDropdown();
        setCurrentPage(1);
        getCars(1, true, false);
        setTimeout(() => {
            setPages();
        }, 0);
    };

    const handleCheckboxClick = (e, data) => {
        console.log(`checkboc${e.target.value}`);
        const checked = e.target.checked;
        if (checked) {
            if (dctFilterIds[data]) {
                dctFilterIds[data].push(e.target.value);
            } else {
                dctFilterIds[data] = [e.target.value];
            }
        } else {
            if (dctFilterIds[data].length === 1) {
                delete dctFilterIds[data];
            } else {
                dctFilterIds[data] = dctFilterIds[data].filter((val) => val !== e.target.value);
            }
        }
        setDctFilterIds({ ...dctFilterIds });
        setCurrentPage(1);
        getCars(1, true, false);
    };


    const handleResetFilter = () => {
        console.log('clear filter');
        setLstAppliedFilters([]);
        setDctFilterIds({});
        setLstAppliedCategory([]);
        setLstAppliedBrands([]);
        setFromRange(0);
        setToRange(100000);
        setMinModel(2010);
        setMaxModel(2022);
        setSortValue('relavance');
        setSelected('daily');
        // getCars(1, true, false); 
    };


    const handleSelectedItem = (data) => {
        if (data.type === 'category') {
            history.push(
                lan === 'ar'
                    ? `ar/${paths.product.main_slug}/${paths.category.main_slug}/${data.slug}`
                    : `en/${paths.product.main_slug}/${paths.category.main_slug}/${data.slug}`
            );
        } else if (data.type === 'brand') {
            history.push(
                lan === 'ar'
                    ? `ar/${paths.product.main_slug}/${paths.brand.main_slug}/${data.slug}`
                    : `en/${paths.product.main_slug}/${paths.brand.main_slug}/${data.slug}`
            );
        } else if (data.type === 'car') {
            history.push(
                lan === 'ar'
                    ? `ar/${paths['product-detail'].main_slug}/${data.slug}`
                    : `en/${paths['product-detail'].main_slug}/${data.slug}`
            );
        }
    };


    const handleCategoryClick = (e) => {
        const category = e.target.value;
        setLstAppliedCategory((prevCategories) => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter((cat) => cat !== category);
            } else {
                return [...prevCategories, category];
            }
        });
        setCategory_id(null);
        setCurrentPage(1);
        getCars(1, true, false);
    };

    const handlePriceTypeChange = (e, type) => {
        setSelected(type);
        setCurrentPage(1);
        getCars(1, true, false);
    };



    const handleBrandClick = (e) => {
        const brand = e.target.value;
        console.log(brand);
        setLstAppliedBrands((prevBrands) => {
            if (prevBrands.includes(brand)) {
                return prevBrands.filter((b) => b !== brand);
            } else {
                return [...prevBrands, brand];
            }
        });
        // setBrandId(null);
        setCurrentPage(1);
        getCars(1, true, false);
    };

    const handleFromPriceChange = (e) => {
        const value = parseInt(e.target.value);
        console.log(value);
        if (value < toRange) {
            setFromRange(value);
            // setCurrentPage(1);
            getCars(1, true, false);
            setTimeout(() => {
                setPages();
            }, 0);
        }
    };

    const handleToPriceChange = (e) => {
        const value = parseInt(e.target.value);
        console.log(value);
        if (value > fromRange) {
            setToRange(value);
            // setCurrentPage(1);
            getCars(1, true, false);
            setTimeout(() => {
                setPages();
            }, 0);
        }
    };

    const closeBookNow = () => {
        setOpenBookSec(false);
    };


    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //     getFilterData();
    //     console.log(currentUrl);
    //     if (currentUrl.includes("category")) {
    //         const parts = currentUrl.split('/');
    //         const lastWord = parts[parts.length - 1];
    //         setLstAppliedCategory([lastWord]);
    //         getCars();
    //         console.log(lstAppliedCategory);
    //         console.log(lastWord);


    //     } else if (currentUrl.includes("brands")) {
    //         const parts = currentUrl.split('/');
    //         const lastWord = parts[parts.length - 1];
    //         setLstAppliedBrands([lastWord]);
    //         getCars();
    //         console.log(lastWord);
    //         console.log(lstAppliedBrands);

    //     } else {
    //         getCars();

    //         console.log("");
    //     }
    //     // getCars();
    //     // Fetch Filters




    //     // Set up Google Tag Manager
    //     // const gtmTag = {
    //     //   event: 'page',
    //     //   pageName: history.location.pathname,
    //     // };
    //     // window.dataLayer.push(gtmTag);
    // }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        getFilterData();
        const currentUrl = window.location.href;
        console.log(currentUrl);

        if (currentUrl.includes("category")) {
            const parts = currentUrl.split('/');
            const lastWord = parts[parts.length - 1];
            setLstAppliedCategory([lastWord]);

            console.log(lastWord);

        } else if (currentUrl.includes("brands")) {
            const parts = currentUrl.split('/');
            const lastWord = parts[parts.length - 1];
            setLstAppliedBrands([lastWord]);

            console.log(lastWord);

        } else {
            console.log("");
        }

        // Log applied categories and brands after state updates
        console.log("Applied category:", lstAppliedCategory);
        console.log("Applied brands:", lstAppliedBrands);

        // Additional setup code...
    }, []);


    useEffect(() => {
        if (lstAppliedCategory.length > 0) {
            console.log("Fetching cars based on category:", lstAppliedCategory);
            getCars(1, true, false);
            //   setHeadName(data.category_name);
        } else if (lstAppliedBrands.length > 0) {
            console.log("Fetching cars based on brands:", lstAppliedBrands);
            getCars(1, true, false);
            //   setHeadName(data.brand_name);
        } else {
            console.log("Fetching cars without category or brands");
            getCars(1, true, false);
        }
    }, [lstAppliedCategory, lstAppliedBrands, currentLanguage]);

    return (
        <>
            <div className={`language-${currentLanguage}`}>
                <div class="product-list">
                    <h1 class="main-heading">{headName}</h1>
                    <ul class="breadcrumb">
                        <li>
                            <a onClick={goToHome}>{t("HOME.HOME")}</a>
                        </li>
                        <li>
                            <a class="active">{headName}</a>
                        </li>
                    </ul>

                    <section className="product-listing">
                        <div className="container">
                            <div className="contents">
                                <div className="leftSec">
                                    <div className="filter-top">
                                        <h4>{t('PRODUCT.FILTER')}</h4>
                                        <a onClick={handleResetFilter}>{t('PRODUCT.RESETFILTER')}</a>
                                    </div>
                                    <div className="filter-content">
                                        <div className="accordion accordion-flush" id="accordionFlushExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="flush-heading1">
                                                    <button
                                                        className="accordion-button"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#flush-collapse1"
                                                        aria-expanded="true"
                                                        aria-controls="flush-collapse1"
                                                    >
                                                        {t('PRODUCT.PRICE')}
                                                    </button>
                                                </h2>
                                                <div style={{ paddingBottom: '20px' }}>
                                                    <ReactSlider
                                                        className="horizontal-slider"
                                                        thumbClassName="example-thumb"
                                                        trackClassName="example-track"
                                                        value={value}
                                                        min={0}
                                                        max={100000}
                                                        step={1}
                                                        onChange={priceRangeChanged}
                                                    />
                                                </div>
                                                <div
                                                    id="flush-collapse1"
                                                    className="accordion-collapse collapse show"
                                                    aria-labelledby="flush-heading1"
                                                    data-bs-parent="#accordionFlushExample"
                                                >

                                                    <div className="accordion-body">

                                                        <div className="price-range">
                                                            <p>
                                                                <span>{t('BOOKNOW.AED')} </span>{fromRange}
                                                            </p>
                                                            <p>
                                                                <span>{t('BOOKNOW.AED')} </span>{toRange}
                                                            </p>



                                                        </div>



                                                        {/* <span> */}
                                                        <div
                                                        // style={{paddingTop:'20px'}}
                                                        >


                                                        </div>
                                                        {/* </span> */}


                                                        {/* Replace ngx-slider with a suitable React slider component */}

                                                        <div className="price-boxfiled">
                                                            <div className="price-label">{t('PROFILE.FROM')}</div>
                                                            <div className="price-field">
                                                                <input
                                                                    type="text"
                                                                    id="filter-from"
                                                                    value={fromRange}
                                                                    onChange={(e) => handleFromPriceChange(e)}
                                                                    name="catalog-from"
                                                                    required="required"
                                                                />
                                                            </div>
                                                            <div className="price-label">{t('PROFILE.TO')}</div>
                                                            <div className="price-field">
                                                                <input
                                                                    type="text"
                                                                    id="filter_to_mobile"
                                                                    value={toRange}
                                                                    onChange={(e) => handleToPriceChange(e)}
                                                                    name="catalog_to"
                                                                    required="required"
                                                                />
                                                            </div>
                                                            <div className="price-label">{t('BOOKNOW.AED')}</div>
                                                        </div>

                                                        <div className="radio-select-price">
                                                            <input
                                                                type="radio"
                                                                id="html"
                                                                name="price_type"
                                                                value="daily"
                                                                checked={selected === 'daily'}
                                                                onChange={(e) => handlePriceTypeChange(e, 'daily')}
                                                            />
                                                            <label htmlFor="html">{t('PRODUCT.DAILY')}</label><br />
                                                            <input
                                                                type="radio"
                                                                id="css"
                                                                name="price_type"
                                                                value="weekly"
                                                                checked={selected === 'weekly'}
                                                                onChange={(e) => handlePriceTypeChange(e, 'weekly')}
                                                            />
                                                            <label htmlFor="css">{t('PRODUCT.WEEKLY')}</label><br />
                                                            <input
                                                                type="radio"
                                                                id="javascript"
                                                                name="price_type"
                                                                value="monthly"
                                                                checked={selected === 'monthly'}
                                                                onChange={(e) => handlePriceTypeChange(e, 'monthly')}
                                                            />
                                                            <label htmlFor="javascript">{t('PRODUCT.MONTHLY')}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="flush-heading2">
                                                    <button
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#flush-collapse2"
                                                        aria-expanded="false"
                                                        aria-controls="flush-collapse2"
                                                    >
                                                        {t('PRODUCT.CATEGORY')}
                                                    </button>
                                                </h2>
                                                <div
                                                    id="flush-collapse2"
                                                    className="accordion-collapse collapse"
                                                    aria-labelledby="flush-heading2"
                                                    data-bs-parent="#accordionFlushExample"
                                                >
                                                    <div className="accordion-body scrollbar-ripe-malinka scrollbar">
                                                        <div className="checkbox" style={{ textAlign: 'start' }}>
                                                            {filters?.categories.map((item, index) => (
                                                                <label key={index} className="checkbox-details">
                                                                    {item.name}
                                                                    <input
                                                                        type="checkbox"
                                                                        value={item.slug}
                                                                        onChange={handleBrandClick}
                                                                    />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            ))}



                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="flush-heading3">
                                                    <button
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#flush-collapse3"
                                                        aria-expanded="false"
                                                        aria-controls="flush-collapse3"
                                                    >
                                                        {t('PRODUCT.BRAND')}
                                                    </button>
                                                </h2>
                                                <div
                                                    id="flush-collapse3"
                                                    className="accordion-collapse collapse"
                                                    aria-labelledby="flush-heading3"
                                                    data-bs-parent="#accordionFlushExample"
                                                >
                                                    <div className="accordion-body scrollbar-ripe-malinka scrollbar">
                                                        <div className="checkbox" style={{ textAlign: 'start' }}>
                                                            {filters?.brands.map((item, index) => (
                                                                <label key={index} className="checkbox-details">
                                                                    {item.name}
                                                                    <input
                                                                        type="checkbox"
                                                                        value={item.slug}
                                                                        onChange={handleBrandClick}
                                                                    />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            ))}


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="flush-heading4">
                                                    <button
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#flush-collapse4"
                                                        aria-expanded="true"
                                                        aria-controls="flush-collapse4"
                                                    >
                                                        {t('PRODUCT.MODEL')}
                                                    </button>
                                                </h2>
                                                <div
                                                    id="flush-collapse4"
                                                    className="accordion-collapse collapse"
                                                    aria-labelledby="flush-heading4"
                                                    data-bs-parent="#accordionFlushExample"
                                                >
                                                    <div className="accordion-body">
                                                        <div className="price-range">
                                                            <p>
                                                                <span>{t('PROFILE.MIN')} </span>{filters.min_model}
                                                            </p>
                                                            <p>
                                                                <span>{t('PROFILE.MAX')} </span>{filters.max_model}
                                                            </p>
                                                        </div>
                                                        <div
                                                            style={{ paddingTop: '20px' }}
                                                        >
                                                            <ReactSlider
                                                                className="horizontal-slider"
                                                                thumbClassName="example-thumb"
                                                                trackClassName="example-track"
                                                                value={[2010, 2040]}
                                                                min={2010}
                                                                max={2040}
                                                                step={1}
                                                            // onChange={(values) => {
                                                            //     setValue(values[0]);
                                                            //     setHighValue(values[1]);
                                                            //     priceRangeChanged();
                                                            // }}
                                                            />
                                                        </div>
                                                        {/* Replace ngx-slider with a suitable React slider component */}
                                                    </div>
                                                </div>
                                            </div>
                                            {lstFilters.map((data, index) => (
                                                <div className="accordion-item" key={index}>
                                                    <h2 className="accordion-header" id={`flush-heading${index}`}>
                                                        <button
                                                            className="accordion-button collapsed"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target={`#flush-collapse${index}`}
                                                            aria-expanded="false"
                                                            aria-controls={`flush-collapse${index}`}
                                                        >
                                                            {data.name}
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id={`flush-collapse${index}`}
                                                        className="accordion-collapse collapse"
                                                        aria-labelledby={`flush-heading${index}`}
                                                        data-bs-parent="#accordionFlushExample"
                                                    >
                                                        <div className="accordion-body scrollbar-ripe-malinka scrollbar">
                                                            <div className="checkbox">
                                                                {data.lists.map((item, idx) => (
                                                                    <label key={idx} className="checkbox-details">
                                                                        {item.name}
                                                                        <input
                                                                            type="checkbox"
                                                                            value={item.id}
                                                                        // onChange={(e) => handleCheckboxClick(e, data.id)}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="rightSec">
                                    <div className="car-details-top">
                                        <div className="car-count">
                                            <a style={{ cursor: 'default' }}>
                                                {data?.total} {t('PRODUCT.CARSHOW')}

                                            </a>
                                        </div>
                                        {/* search bar */}
                                        <div className="p-1 bg-light rounded rounded-pill shadow-sm down">
                                            <div className="input-group">
                                                <input
                                                    type="search"
                                                    id="typeAhead"
                                                    value={name}
                                                    onChange={(e) => changeSearchkey(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && searchPage()}
                                                    placeholder={t('PLACEHOLDER.SEARCHCAR')}
                                                    aria-describedby="button-addon1"
                                                    className="form-control border-0 bg-light typehead-earch"
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        id="button-addon1"
                                                        onClick={searchPage}
                                                        type="submit"
                                                        className="btn btn-link text-primary"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="16"
                                                            height="16"
                                                        >
                                                            <path fill="none" d="M0 0h24v24H0z" />
                                                            <path
                                                                d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
                                                                fill="#1a214f"
                                                                stroke="#1a214f"
                                                                strokeWidth="1"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            {/* {name && blnSearch && (
                                                <div className="searchDrop" style={{ cursor: 'pointer' }}>
                                                    {searches.map((item, index) => (
                                                        <p key={index} onClick={() => handleSelectedItem(item)}>
                                                            {item?.name}
                                                        </p>
                                                    ))}
                                                    {total_searches === 0 && (
                                                        <p role="listitem" style={{ textAlign: 'center' }}>
                                                            {t('HOME.NOSEARCH')}
                                                        </p>
                                                    )}
                                                </div>
                                            )} */}
                                        </div>
                                        {/* search bar ends */}
                                        <div className="sort-by">
                                            <h6>{t('PRODUCT.SORTBY')}:</h6>
                                            <div style={{ cursor: 'pointer' }} className="dropdown">
                                                <p
                                                    className={`dropdown-toggle ${dropdownOpen ? 'show' : ''}`}
                                                    id="dropdownMenuLink"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                    onClick={toggleDropdown}
                                                >
                                                    {sortName}

                                                </p>
                                                <ul
                                                    className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}
                                                    aria-labelledby="dropdownMenuLink"
                                                >
                                                    {option1.map((option, index) => (
                                                        <li key={index}>
                                                            <a
                                                                className={`dropdown-item ${option.value === sortValue ? 'active' : ''}`}
                                                                onClick={() => handleSortBy(option)}
                                                            >
                                                                {option.name}
                                                            </a>
                                                        </li>
                                                    ))}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/* No result found */}
                                    {data?.total === 0 && (
                                        <div className="noResult-list">
                                            <p>{t('PROFILE.NORESULTSFOUND')}</p>
                                        </div>
                                    )}

                                    {/* Cars */}
                                    {data?.cars.map((car, index) => (
                                        <div className="details" key={index}>
                                            <div className="box">
                                                <div className="left"
                                                    onClick={() => goToDetails(car.slug)}
                                                >
                                                    <img src={car?.thumbnail_image_url} alt="" className="img-fluid" />
                                                </div>
                                                <div className="right">
                                                    <div className="box-content" style={{ textAlign: 'start' }}>
                                                        <div className="share">
                                                            <span>{car?.category_name}</span>
                                                        </div>
                                                        <h4
                                                            onClick={() => goToDetails(car.slug)}
                                                        >
                                                            {car?.brand_name} {car?.name}
                                                        </h4>
                                                        <div className="card-spec">
                                                            {car?.filters.map((filter, idx) => (
                                                                <p key={idx}>
                                                                    <img src={filter?.icon_url} alt="" />
                                                                    {filter?.name}
                                                                </p>
                                                            ))}
                                                        </div>
                                                        <div className="card-price">
                                                            <div className="offer-details">
                                                                <span>
                                                                    <s>
                                                                        {t('BOOKNOW.AED')} {car?.original_daily_price}
                                                                    </s>
                                                                </span>
                                                                <h5>
                                                                    {t('BOOKNOW.AED')} {car?.daily_price}
                                                                    <span className="day">/{t('BOOKNOW.DAY')}</span>
                                                                </h5>
                                                                <p>{t('PRODUCT.DAILY')}</p>
                                                            </div>
                                                            <div className="offer-details">
                                                                <span>
                                                                    <s>
                                                                        {t('BOOKNOW.AED')} {car?.original_weekly_price}
                                                                    </s>
                                                                </span>
                                                                <h5>
                                                                    {t('BOOKNOW.AED')} {car?.weekly_price}
                                                                    <span className="day">/{t('BOOKNOW.WEEK')}</span>
                                                                </h5>
                                                                <p>{t('PRODUCT.WEEK')}</p>
                                                            </div>
                                                            <div className="offer-details">
                                                                <span>
                                                                    <s>
                                                                        {t('BOOKNOW.AED')} {car?.original_monthly_price}
                                                                    </s>
                                                                </span>
                                                                <h5>
                                                                    {t('BOOKNOW.AED')} {car?.monthly_price}
                                                                    <span className="day">/{t('BOOKNOW.MONTH')}</span>
                                                                </h5>
                                                                <p>{t('PRODUCT.MONTH')}</p>
                                                            </div>
                                                        </div>
                                                        {car?.fine_deposit != null && (
                                                            <div className="findDeposite">
                                                                <p>
                                                                    {t('HOME.FINEDEPOSIT')} :<span>{t('BOOKNOW.AED')} {car?.fine_deposit}</span>
                                                                </p>
                                                            </div>
                                                        )}
                                                        <div className="mixed">
                                                            <div className="advantages">
                                                                <div className="box-dropdown">
                                                                    <p className="dropbtn dropup">
                                                                        <img src={tick} alt="" />
                                                                        {car?.feature_1}
                                                                    </p>
                                                                    <div className="dropdown-content">
                                                                        <p>{car.feature_description_1}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="box-dropdown">
                                                                    <p className="dropbtn dropup">
                                                                        <img src={tick} alt="" />
                                                                        {car?.feature_2}
                                                                    </p>
                                                                    <div className="dropdown-content">
                                                                        <p>{car.feature_description_2}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="box-dropdown">
                                                                    <p className="dropbtn dropup">
                                                                        <img src={tick} alt="" />
                                                                        {car?.feature_3}
                                                                    </p>
                                                                    <div className="dropdown-content">
                                                                        <p>{car.feature_description_3}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="connect-us">
                                                                <a
                                                                    onClick={() => openBookingModal({ car })}

                                                                    id={`booknow${car.id}`}
                                                                    className="booknow"
                                                                >
                                                                    {t('HOME.BOOKNOW')}
                                                                </a>
                                                                <a
                                                                    onClick={StaticMethod.openWhatsApp}
                                                                    className="chatnow">
                                                                    <img src={whatsapp} alt="" />
                                                                    {t('HOME.CHATNOW')}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {car.is_hot_offer && (
                                                    <div className="productLabel">
                                                        <div className="offer-label">{t('DETAIL.HOTOFFER')}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}




                                    {/* Pagination */}
                                    {data?.total !== 0 && data?.total > data?.per_page && !blnShowAll && (
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className="page-item">
                                                    {pageNo !== 1 && (
                                                        <a
                                                            className="page-link"
                                                            onClick={loadPreviousPage}
                                                            aria-label="Previous"
                                                        >
                                                            <img src={left} alt="" />
                                                        </a>
                                                    )}
                                                </li>
                                                {pages.map((key, index) => (
                                                    <li className="page-item" key={index}>
                                                        <a
                                                            className={`page-link ${pageNo === key ? 'page-active' : ''}`}
                                                            onClick={() => fetchByPage(key)}
                                                        >
                                                            <span>{key < 10 && '0'}</span>{key}
                                                        </a>
                                                    </li>
                                                ))}
                                                {pages.length > 1 && (
                                                    <li className="page-item">
                                                        <a className="page-link"
                                                            onClick={showAllCars}
                                                        >
                                                            {t('PROFILE.SHOWALL')}
                                                        </a>
                                                    </li>
                                                )}
                                                <li className="page-item">
                                                    {pageNo < count && (
                                                        <a
                                                            className="page-link"
                                                            onClick={loadNextPage}
                                                            aria-label="Next"
                                                        >
                                                            <img src={right} alt="" />
                                                        </a>
                                                    )}
                                                </li>
                                            </ul>
                                        </nav>
                                    )}
                                    <div className="seo_content" style={{ textAlign: 'start' }}>
                                        <div
                                            className="box"
                                            dangerouslySetInnerHTML={{ __html: seo_content }}
                                            style={{ display: 'block', width: '100%' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mobile-selection">
                                <div className="filter-sortby">
                                    <h5
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasBottom1"
                                        aria-controls="offcanvasBottom1"
                                    >
                                        <img src={filter} alt="" />
                                        {t('PRODUCT.FILTERBY')}
                                    </h5>
                                    <h5
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasBottom"
                                        aria-controls="offcanvasBottom"
                                    >
                                        <img src={sort} alt="" />
                                        {t('PRODUCT.SORTBY')}
                                    </h5>
                                </div>
                            </div>

                            <div className="offcanvas-filter">
                                <div
                                    className="offcanvas offcanvas-bottom"
                                    tabIndex="-1"
                                    id="offcanvasBottom1"
                                    aria-labelledby="offcanvasBottomLabel1"
                                >
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasBottomLabel1">
                                            {t('PRODUCT.FILTERBY')}
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="offcanvas"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="offcanvas-body small">
                                        <div className="filter-content">
                                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="flush-headingOne">
                                                        <button
                                                            className="accordion-button collapsed"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#flush-collapseOne"
                                                            aria-expanded="false"
                                                            aria-controls="flush-collapseOne"
                                                        >
                                                            {t('PRODUCT.PRICE')}
                                                        </button>
                                                    </h2>
                                                    <div
                                                        style={{ paddingBottom: '20px' }}
                                                    >
                                                        <ReactSlider
                                                            className="horizontal-slider"
                                                            thumbClassName="example-thumb"
                                                            trackClassName="example-track"
                                                            value={value}
                                                            min={0}
                                                            max={100000}
                                                            step={1}
                                                            onChange={priceRangeChanged}
                                                        />
                                                    </div>
                                                    <div
                                                        id="flush-collapseOne"
                                                        className="accordion-collapse collapse show"
                                                        aria-labelledby="flush-headingOne"
                                                        data-bs-parent="#accordionFlushExample"
                                                    >
                                                        <div className="accordion-body">
                                                            <div className="price-range">
                                                                <p>
                                                                    <span>{t('BOOKNOW.AED')} </span>{fromRange}
                                                                </p>
                                                                <p>
                                                                    <span>{t('BOOKNOW.AED')} </span>{toRange}
                                                                </p>
                                                            </div>
                                                            {/* Replace ngx-slider with a suitable React slider component */}
                                                            <div className="price-boxfiled">
                                                                <div className="price-label">{t('PROFILE.FROM')}</div>
                                                                <div className="price-field">
                                                                    <input
                                                                        type="text"
                                                                        id="filter-from-mobile"
                                                                        value={fromRange}
                                                                        onChange={(e) => handleFromPriceChange(e)}
                                                                        name="catalog-from"
                                                                        required="required"
                                                                    />
                                                                </div>
                                                                <div className="price-label">{t('PROFILE.TO')}</div>
                                                                <div className="price-field">
                                                                    <input
                                                                        type="text"
                                                                        id="filter_to"
                                                                        value={toRange}
                                                                        onChange={(e) => handleToPriceChange(e)}
                                                                        name="catalog_to"
                                                                        required="required"
                                                                    />
                                                                </div>
                                                                <div className="price-label">{t('BOOKNOW.AED')}</div>
                                                            </div>
                                                            <div className="radio-select-price">
                                                                <div className="radio-box">
                                                                    <input
                                                                        type="radio"
                                                                        id="daily-mb"
                                                                        name="price_type1"
                                                                        value="daily"
                                                                        checked={selected === 'daily'}
                                                                        onChange={(e) => handlePriceTypeChange(e, 'daily')}
                                                                    />
                                                                    <label htmlFor="daily-mb">{t('PRODUCT.DAILY')}</label><br />
                                                                </div>
                                                                <div className="radio-box">
                                                                    <input
                                                                        type="radio"
                                                                        id="weekly-mb"
                                                                        name="price_type1"
                                                                        value="weekly"
                                                                        checked={selected === 'weekly'}
                                                                        onChange={(e) => handlePriceTypeChange(e, 'weekly')}
                                                                    />
                                                                    <label htmlFor="weekly-mb">{t('PRODUCT.WEEKLY')}</label><br />
                                                                </div>
                                                                <div className="radio-box">
                                                                    <input
                                                                        type="radio"
                                                                        id="yearly-mb"
                                                                        name="price_type1"
                                                                        value="monthly"
                                                                        checked={selected === 'monthly'}
                                                                        onChange={(e) => handlePriceTypeChange(e, 'monthly')}
                                                                    />
                                                                    <label htmlFor="yearly-mb">{t('PRODUCT.MONTHLY')}</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="flush-headingTwo">
                                                        <button
                                                            className="accordion-button collapsed"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#flush-collapseTwo"
                                                            aria-expanded="false"
                                                            aria-controls="flush-collapseTwo"
                                                        >
                                                            {t('PRODUCT.CATEGORY')}
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id="flush-collapseTwo"
                                                        className="accordion-collapse collapse"
                                                        aria-labelledby="flush-headingTwo"
                                                        data-bs-parent="#accordionFlushExample"
                                                    >
                                                        <div className="accordion-body scrollbar-ripe-malinka scrollbar commonHeight">
                                                            <div className="checkbox" style={{ textAlign: "start" }}>
                                                                {filters?.categories.map((item, index) => (
                                                                    <label key={index} className="checkbox-details">
                                                                        {item.name}
                                                                        <input
                                                                            type="checkbox"
                                                                            value={item.slug}
                                                                            onChange={handleCategoryClick}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="flush-headingThree">
                                                        <button
                                                            className="accordion-button collapsed"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#flush-collapseThree"
                                                            aria-expanded="false"
                                                            aria-controls="flush-collapseThree"
                                                        >
                                                            {t('PRODUCT.BRAND')}
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id="flush-collapseThree"
                                                        className="accordion-collapse collapse"
                                                        aria-labelledby="flush-headingThree"
                                                        data-bs-parent="#accordionFlushExample"
                                                    >
                                                        <div className="accordion-body scrollbar-ripe-malinka scrollbar">
                                                            <div className="checkbox" style={{ textAlign: 'start' }}>
                                                                {filters?.brands.map((item, index) => (
                                                                    <label key={index} className="checkbox-details">
                                                                        {item.name}
                                                                        <input
                                                                            type="checkbox"
                                                                            value={item.slug}
                                                                            onChange={handleBrandClick}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="flush-headingFour">
                                                        <button
                                                            className="accordion-button collapsed"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#flush-collapseFour"
                                                            aria-expanded="true"
                                                            aria-controls="flush-collapseFour"
                                                        >
                                                            {t('PRODUCT.MODEL')}
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id="flush-collapseFour"
                                                        className="accordion-collapse collapse"
                                                        aria-labelledby="flush-headingFour"
                                                        data-bs-parent="#accordionFlushExample"
                                                    >
                                                        <div className="accordion-body">
                                                            <div className="price-range">
                                                                <p>
                                                                    <span>{t('PROFILE.MIN')} </span>{filters.min_model}
                                                                </p>
                                                                <p>
                                                                    <span>{t('PROFILE.MAX')} </span>{filters.max_model}
                                                                </p>
                                                            </div>
                                                            {/* Replace ngx-slider with a suitable React slider component */}
                                                        </div>
                                                    </div>
                                                </div>
                                                {lstFilters.map((data, index) => (
                                                    <div className="accordion-item" key={index}>
                                                        <h2 className="accordion-header" id={`flush-heading${index}`}>
                                                            <button
                                                                className="accordion-button collapsed"
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target={`#flush-collapse${index}`}
                                                                aria-expanded="false"
                                                                aria-controls={`flush-collapse${index}`}
                                                            >
                                                                {data.name}
                                                            </button>
                                                        </h2>
                                                        <div
                                                            id={`flush-collapse${index}`}
                                                            className="accordion-collapse collapse"
                                                            aria-labelledby={`flush-heading${index}`}
                                                            data-bs-parent="#accordionFlushExample"
                                                        >
                                                            <div className="accordion-body scrollbar-ripe-malinka scrollbar">
                                                                <div className="checkbox">
                                                                    {data.lists.map((item, idx) => (
                                                                        <label key={idx} className="checkbox-details">
                                                                            {item.name}
                                                                            <input
                                                                                type="checkbox"
                                                                                value={item.id}
                                                                            // onChange={(e) => handleCheckboxClick(e, data.id)}
                                                                            />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clear-apply-btn">
                                        <div className="container">
                                            <div className="connect-us">
                                                <a
                                                    onClick={handleResetFilter}
                                                    className="clearall"
                                                    data-bs-dismiss="offcanvas"
                                                >
                                                    {t('PRODUCT.CLEAR')}
                                                </a>
                                                <a className="apply-filter" data-bs-dismiss="offcanvas">
                                                    {t('PRODUCT.APPLY')}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="offcanvas-Sortby">
                                <div
                                    className="offcanvas offcanvas-bottom"
                                    tabIndex="-1"
                                    id="offcanvasBottom"
                                    aria-labelledby="offcanvasBottomLabel"
                                >
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasBottomLabel">
                                            {t('PRODUCT.SORTBY')}
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="offcanvas"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="offcanvas-body small">
                                        <ul>
                                            <div className="box">
                                                {option1.map((option, index) => (
                                                    <li key={index}>
                                                        <a
                                                            className={`dropdown-item ${option.value === sortValue ? 'active' : ''}`}
                                                            onClick={() => handleSortBy(option)}
                                                            data-bs-dismiss="offcanvas"
                                                        >
                                                            {option.name}
                                                            <img
                                                                src={tick}
                                                                className="hover-img"
                                                            />
                                                        </a>
                                                    </li>
                                                ))}
                                            </div>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                            <section className="booking-sec">
                                {openBookSec && (

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
                                                    ></button>
                                                </div>
                                                <div className="modal-body">
                                                    {blnBookNowOpen && (
                                                        <BookSection
                                                            carId={carId}
                                                            brandName={brandName}
                                                            carName={carName}
                                                            carImg={carImg}
                                                            onClose={closeBookNow}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )}
                            </section>
                        </div>





                    </section>
                </div>

            </div>

        </>
    );
}


export default ProductList;