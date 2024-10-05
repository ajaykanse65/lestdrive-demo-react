import React, { useState, useEffect } from 'react';
import { useTranslation, } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import '../index.css';
import '../assets/css/english.css';
import '../assets/css/arabic.css';
import car from '../assets/images/booking/bookimage.jpg';
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';
import moment from 'moment';

const MyBooking = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const [pastBooking, setPastBooking] = useState([]);
  const [activeBooking, setActiveBooking] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ active_bookings:[], past_bookings:[]})

  const toggleAccordion = () => { 
    setIsOpen(!isOpen);
  };

  const goToDetail = (slug) => {
    // navigate('/productdetails');
    const path = `car-details/${slug}`
    navigate(currentLanguage === 'ar' ? `/ar/${path}` : `/en/${path}`);

    localStorage.setItem('activeMenu', 'rentcar');


}


  const getBookingDetails = async () => {
    const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
    try{

      const headers = {
        'X-Localization': currentLanguage, // Example header to specify language
        Authorization: `Bearer ${token}`, // Example header to specify language
        'Access-Control-Max-Age': '3600',
        // Add other headers as needed
      };
     const response = await ApiService.getData(AppEndPoints.mybookings, headers);
    //  console.log(response.data.data);
    //  console.log(response.data.data.active_bookings.length);
    //  console.log(response.data.data.past_bookings.length);
    setData(response.data.data);
     setActiveBooking(response.data.data.active_bookings);
     setPastBooking(response.data.data.past_bookings);
    //  console.log(activeBooking.length);
    //  console.log(pastBooking.length);
    }catch(error){

      console.log(error);
    }
  

  }


  const dateFormat =(date) =>{
    return moment(date).format('DD MMMM YYYY');
  }



  useEffect(() => {
    window.scrollTo(0, 0);
    getBookingDetails();
    const collapseElement = document.getElementById('collapseOne');
    if (collapseElement) {
      collapseElement.addEventListener('hidden.bs.collapse', () => setIsOpen(false));
      collapseElement.addEventListener('shown.bs.collapse', () => setIsOpen(true));
    }

    return () => {
      if (collapseElement) {
        collapseElement.removeEventListener('hidden.bs.collapse', () => setIsOpen(false));
        collapseElement.removeEventListener('shown.bs.collapse', () => setIsOpen(true));
      }
    };
  }, []);
  return (
    <>
      <div className={`language-${currentLanguage}`}>
        <div class="my-booking">
          <div class="content-sec">

            {/*-----Active Booking-----*/}
            <div className="active-booking">
              {activeBooking.length > 0  && (
                <>
                  <h5 style={{
                    textAlign: 'start'
                  }}>{t('BOOKING.ACTIVEBOOKING')}</h5>

                  {/*----Uncomment below code after API Configuration----*/}
                  {data.active_bookings.map((item, index) => (
            <div className="booking-confirmation" key={index}>
              <div className="contents">
                <div className="leftSec" style={{textAlign:'start'}}>
                  <div className="car-image" onClick={() => goToDetail(item?.car_slug)}>
                    <img src={item?.thumbnail_image_url} alt="" className="img-fluid" />
                  </div>

                  <div className="car-name">
                    <h5 onClick={() => goToDetail(item?.car_slug)}>{item?.brand_name}</h5>
                    <h3 onClick={() => goToDetail(item?.car_slug)}>{item?.car_name}</h3>

                    <div className="start-end-dates-sec">
                      <div className="start-date">
                        <p>{t('BOOKING.STARTDATE')}</p>
                        <h2>{dateFormat(item?.start_date)}</h2>
                      </div>
                      <div className="end-date">
                        <p>{t('BOOKING.ENDDATE')}</p>
                        <h2>{dateFormat(item?.end_date)}</h2>
                      </div>
                    </div>

                    <div className="booking-date-sec">
                      <p>{t('BOOKING.BOOKINGDATE')}</p>
                      <h2>{item?.booking_date}</h2>
                    </div>
                  </div>
                </div>
                <div className="righrSec">
                  <div className="confirm-steps">
                    <div className="left-side">
                      <ul className="progress-bar-steps desktop-screen">
                        <li className={item.is_submited ? 'active' : ''}>
                          {t('BOOKING.DOCUMENTSSUBMITTED')}
                        </li>
                        <li className={item.is_requested ? 'active' : ''}>
                          {t('BOOKING.BOOKINGREQUESTED')}
                        </li>
                        {!item.is_verified && <li>{t('BOOKING.VERIFICATIONPENDING')}</li>}
                        {item.is_verified && (
                          <li className={item.is_verified ? 'active' : ''}>
                            {t('BOOKING.DOCUMENTSVERIFIED')}
                          </li>
                        )}
                        {item.is_approved === '2' && <li>{t('BOOKING.PENDING')}</li>}
                        {item.is_approved === '1' && (
                          <li className={item.is_approved === '1' ? 'active' : ''}>
                            {t('BOOKING.APPROVED')}
                          </li>
                        )}
                        {item.is_approved === '0' && (
                          <li className={item.is_approved === '0' ? 'rejected' : ''}>
                            {t('BOOKING.REJECTED')}
                          </li>
                        )}
                      </ul>
                    </div>

                    
                    <div className="accordion mobile-screen" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            {t('BOOKING.STATUS')}
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="left-side">
                            <ul className="progress-bar-steps">
                              <li className={item.is_submited ? 'active' : ''}>
                                {t('BOOKING.DOCUMENTSSUBMITTED')}
                              </li>
                              <li className={item.is_requested ? 'active' : ''}>
                                {t('BOOKING.BOOKINGREQUESTED')}
                              </li>
                              {!item.is_verified && <li>{t('BOOKING.VERIFICATIONPENDING')}</li>}
                              {item.is_verified && (
                                <li className={item.is_verified ? 'active' : ''}>
                                  {t('BOOKING.DOCUMENTSVERIFIED')}
                                </li>
                              )}
                              {item.is_approved === '2' && <li>{t('BOOKING.PENDING')}</li>}
                              {item.is_approved === '1' && (
                                <li className={item.is_approved === '1' ? 'active' : ''}>
                                  {t('BOOKING.APPROVED')}
                                </li>
                              )}
                              {item.is_approved === '0' && (
                                <li className={item.is_approved === '0' ? 'rejected' : ''}>
                                  {t('BOOKING.REJECTED')}
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
                  {/*----end Uncomment below code after API Configuration----*/}
                  
                  
                   
                </>
              )}
            </div>
            {/*-----End Active Booking-----*/}


            {/*-----Past Booking-----*/}
            <div className="past-booking">
              {pastBooking.length > 0 && (
                <>
                  <h5 style={{
                    textAlign: 'start'
                  }}>{t('BOOKING.PASTBOOKINGS')}</h5>

                  {/*----Uncomment below code after API Configuration----*/}
                  {data.past_bookings.map((item, index) => (
            <div className="booking-confirmation" key={index}>
              <div className="contents">
                <div className="leftSec" style={{textAlign:'start'}}>
                  <div className="car-image" onClick={() => goToDetail(item?.car_slug)}>
                    <img src={item?.thumbnail_image_url} alt="" className="img-fluid" />
                  </div>

                  <div className="car-name">
                    <h5 onClick={() => goToDetail(item?.car_slug)}>{item?.brand_name}</h5>
                    <h3 onClick={() => goToDetail(item?.car_slug)}>{item?.car_name}</h3>

                    <div className="start-end-dates-sec">
                      <div className="start-date">
                        <p>{t('BOOKING.STARTDATE')}</p>
                        <h2>{dateFormat(item?.start_date)}</h2>
                      </div>
                      <div className="end-date">
                        <p>{t('BOOKING.ENDDATE')}</p>
                        <h2>{dateFormat(item?.end_date)}</h2>
                      </div>
                    </div>

                    <div className="booking-date-sec">
                      <p>{t('BOOKING.BOOKINGDATE')}</p>
                      <h2>{item?.booking_date}</h2>
                    </div>
                  </div>
                </div>
                <div className="righrSec">
                  <div className="confirm-steps">
                    <div className="left-side">
                      <ul className="progress-bar-steps desktop-screen">
                        <li className={item.is_submited ? 'active' : ''}>
                          {t('BOOKING.DOCUMENTSSUBMITTED')}
                        </li>
                        <li className={item.is_requested ? 'active' : ''}>
                          {t('BOOKING.BOOKINGREQUESTED')}
                        </li>
                        {!item.is_verified && <li>{t('BOOKING.VERIFICATIONPENDING')}</li>}
                        {item.is_verified && (
                          <li className={item.is_verified ? 'active' : ''}>
                            {t('BOOKING.DOCUMENTSVERIFIED')}
                          </li>
                        )}
                        {item.is_approved === '2' && <li>{t('BOOKING.PENDING')}</li>}
                        {item.is_approved === '1' && (
                          <li className={item.is_approved === '1' ? 'active' : ''}>
                            {t('BOOKING.APPROVED')}
                          </li>
                        )}
                        {item.is_approved === '0' && (
                          <li className={item.is_approved === '0' ? 'rejected' : ''}>
                            {t('BOOKING.REJECTED')}
                          </li>
                        )}
                      </ul>
                    </div>

                    
                    <div className="accordion mobile-screen" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            {t('BOOKING.STATUS')}
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="left-side">
                            <ul className="progress-bar-steps">
                              <li className={item.is_submited ? 'active' : ''}>
                                {t('BOOKING.DOCUMENTSSUBMITTED')}
                              </li>
                              <li className={item.is_requested ? 'active' : ''}>
                                {t('BOOKING.BOOKINGREQUESTED')}
                              </li>
                              {!item.is_verified && <li>{t('BOOKING.VERIFICATIONPENDING')}</li>}
                              {item.is_verified && (
                                <li className={item.is_verified ? 'active' : ''}>
                                  {t('BOOKING.DOCUMENTSVERIFIED')}
                                </li>
                              )}
                              {item.is_approved === '2' && <li>{t('BOOKING.PENDING')}</li>}
                              {item.is_approved === '1' && (
                                <li className={item.is_approved === '1' ? 'active' : ''}>
                                  {t('BOOKING.APPROVED')}
                                </li>
                              )}
                              {item.is_approved === '0' && (
                                <li className={item.is_approved === '0' ? 'rejected' : ''}>
                                  {t('BOOKING.REJECTED')}
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
                  {/*----end Uncomment below code after API Configuration----*/}

                 
                </>
              )}
            </div>
            {/*-----End Past Booking-----*/}




            <div>
              {pastBooking.length === 0 && activeBooking.length === 0 && (
                <h4 style={{ textAlign: 'start' }}>{t('BOOKING.NOBOOKINGDETAILS')}</h4>
              )}
            </div>

          </div>
        </div>
      </div>

    </>
  );

}

export default MyBooking;