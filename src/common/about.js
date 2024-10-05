import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation, } from "react-i18next";
import imgbanner from '../assets/images/about/banner.png';
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';
import who from '../assets/images/about/who.png';
import jouny from '../assets/images/about/1.svg';
import '../assets/css/english.css';
import '../assets/css/arabic.css';


const About = () => {

  const [aboutDetails, setAboutDetails] = useState({});

  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const fetchData  = (lan) => {
    const headers = {
    
      'X-Localization': currentLanguage, // Example header to specify language
      // Add other headers as needed
    };
    ApiService.getData(AppEndPoints.about,headers)
      .then((res) => {
        setAboutDetails(res.data.data);
        // console.log(res.data.data);
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
        <Helmet>
          <title>{aboutDetails?.meta_title || 'Default Title'}</title>
          <meta name="keywords" content={aboutDetails?.meta_keywords || 'default keywords'} />
          <meta name="description" content={aboutDetails?.meta_description || 'default description'} />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <div class="about-content-section">

          <section className="banner">
            <div className="image-sec">
              <img
                src={aboutDetails?.banner_image_url}
                // src={imgbanner}
                alt=""
                className="w-100 d-lg-block d-none"
              />
              <img
                src={aboutDetails?.mobile_banner_image_url}
                // src={imgbanner}
                alt=""
                className="w-100 d-lg-none"
              />
              <div className="text">
                <h1>{aboutDetails?.banner_title}</h1>
                {/* <h1>About Let’s Drive</h1> */}
              </div>
            </div>
          </section>



          <div>
            <section className="whoSec">
              <div className="container">
                <div className="details">
                  <div className="leftSec">
                    <img src={aboutDetails?.who_image_url} alt="" />
                    {/* <img src={who} alt="" /> */}
                  </div>
                  <div className="rightSec" style={{ textAlign: 'start' }}>
                    <span>{aboutDetails?.who_label}</span>
                    <h2>{aboutDetails?.who_title}</h2>
                    <p>{aboutDetails?.who_description}</p>
                    {/* <span>Who we are</span>
                    <h2>Valuing the Ultimate Car Rental Satisfaction for Every Trip in UAE and Dubai</h2>
                    <p>Bound with a clear goal to ensure that traveling in UAE and Dubai should be enjoyable and hassle free, Let’s Drive came forward to give long lasting rental car experiences for car lovers. Today, we offer a large fleet of varied rent a car in Dubai and this would include more than 1000+ cars purchased from leading brands. Each of our vehicles is checked and serviced to ensure safety and comfort and never compromised at any point of the ride. Hold your breath as we introduce you to Let’s Drive’s self-drive car rental services in Dubai. We pamper our clients to drive in world-class brands like Mercedes, Nissan, Audi, Toyota, and others too. Whatever you choose, we guarantee a perfect blend of luxury and thrill. If you are looking for quality, tailor-made customer service, and quick rental processing, our top-notch car rental services are your best choice at any time of the year.</p> */}
                  </div>
                </div>
              </div>
            </section>

            {/* End who we are */}

            {/* Mission Vision Values */}
            <section className="mission">
              <div className="container">
                <div className="details" style={{ textAlign: 'start' }}>
                  <div className="box">
                    <h4>{aboutDetails?.vision_title}</h4>
              <p>{aboutDetails?.vision_description}</p>
                    {/* <h4>Our Vision</h4>
                    <p>To become a leader in the car rental industry establishing a great base assuring the best quality, customers can experience under the diversified rental fleets. We aim to give you the best in a safe, secure and hassle-free process.</p> */}
                  </div>
                  <div className="box">
                    <h4>{aboutDetails?.mission_title}</h4>
              <p>{aboutDetails?.mission_description}</p>
                    {/* <h4>Our Mission</h4>
                    <p>We aim to be the first choice in car leasing in Dubai and cater to the needs of our discerning customers by offering unparalleled flexibility. Our focus lies in providing world-class services assuring the best deals for high-end cars.</p> */}
                  </div>
                  <div className="box">
                    <h4>{aboutDetails?.value_title}</h4>
              <p>{aboutDetails?.value_description}</p>
                    {/* <h4>Our Value</h4>
                    <p>We are committed to providing the highest level of monthly car rental, Dubai with high-quality vehicles ensuring hassle-free dealing with the leading brands across the world. Our tailor-made deals pay off an easy tie-up for reliable and competitive pricing.</p> */}
                  </div>
                </div>
              </div>
            </section>

            {/* End Mission Vision Values */}

            {/* Policies */}
            <section className="policies">
              <div className="container" style={{ textAlign: 'start' }}>
                <span>{aboutDetails?.policy_label}</span>
          <h4>{aboutDetails?.policy_title}</h4>
          <p>{aboutDetails?.policy_description}</p>
                {/* <span>Policies</span>
                <h4>Committed to upgrading to the best concern over the quality of cars</h4>
                <p>Seamless digital experience for long-term car rental, Dubai. Our services are intended to be in the most effective way to render great traveling around the UAE. Let's Drive provides you with the freedom to explore the emirate in the sheer abundance of choice. We offer more upscale options for renting cars as per your preference. Let’s Drive is one of the best rental car companies in Dubai, striving to provide excellent customer service, a modern and high-quality fleet, and to be at the forefront of the rent-a-car services in Dubai. We have a wide selection of luxury as well as cheap car rentals in Dubai to suit your specific needs and budget, whether you have an ideal vehicle in mind for a special occasion or simply prefer a certain type of car.</p> */}
                <div className="image">
                  <img
                      src={aboutDetails?.bottom_banner_image_url}
                    // src={imgbanner}
                    alt=""
                    className="w-100"
                  />
                </div>
              </div>
            </section>

            {/* End Policies */}

            {/* Counter */}
            {aboutDetails?.journeys?.length > 0 && (
        <section className="counter">
          <div className="container">
            <div className="details">
              {aboutDetails.journeys.map((journey, index) => (
                <div key={index} className="box">
                  <img src={journey?.icon_url} alt="" />
                  <div className="content" style={{textAlign:'start'}}>
                    <h5>{journey?.title}</h5>
                    <p>{journey?.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

            {/* <section className="counter">
              <div className="container">
                <div className="details">
                  {aboutDetails.journeys.map((journey, index) => (
                <div key={index} className="box">
                  <img src={journey?.icon_url} alt="" />
                  <div className="content">
                    <h5>{journey?.title}</h5>
                    <p>{journey?.label}</p>
                  </div>
                </div>
              ))}

                </div>
              </div>
            </section> */}

            {/* End Counter */}

            {/* Speciality - Uncomment when needed */}
            {/* {aboutDetails?.specialities?.length > 0 && (
        <section className="our-speciality">
          <div className="container">
            <div className="details">
              {aboutDetails?.speciality_title && (
                <div className="leftSec">
                  <h4>{aboutDetails.speciality_title}</h4>
                  <p>{aboutDetails.speciality_description}</p>
                </div>
              )}
              {aboutDetails?.specialities?.length > 0 && (
                <div className="rightSec">
                  {aboutDetails.specialities.map((special, index) => (
                    <div key={index} className="box">
                      <h4>{special?.title}</h4>
                      <p>{special?.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )} */}

            {/* Awards & recognitions - Uncomment when needed */}
            {/* {aboutDetails?.awards?.length > 0 && (
        <section className="award-recg">
          <div className="container">
            <h3>{aboutDetails?.award_title}</h3>
            <p>{aboutDetails?.award_description}</p>
            <div className="detail">
              {aboutDetails.awards.map((award, index) => (
                <div key={index} className="box">
                  <div className="image">
                    <img src={award?.image_url} alt="" className="w-100" />
                  </div>
                  <div className="content">
                    <h5>{award?.title}</h5>
                    <span>{award?.formated_date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )} */}
          </div>

        </div>

      </div>
    </>
  );

}

export default About;