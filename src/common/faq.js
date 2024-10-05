import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Accordion } from 'react-bootstrap';
import { useTranslation, } from "react-i18next";
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';


const Faq = () => {

  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const [data, setFaq] = useState({ faqs: []});

  const fetchData = (lan) => {
    const headers = {

      'X-Localization': currentLanguage, // Example header to specify language
      // Add other headers as needed
    };
    ApiService.getData(AppEndPoints.faq, headers)
      .then((res) => {
        setFaq(res.data.data);
        // console.log(res.data.data.meta_description);
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
          <title>{data?.meta_title || 'Default Title'}</title>
          <meta name="keywords" content={data?.meta_keywords || 'default keywords'} />
          <meta name="description" content={data?.meta_description || 'default description'} />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <div className="faq-content-section">
          <h1 className="main-heading">{data.title}</h1>
          {/* <h1 className="main-heading">Frequently Asked Questions</h1> */}
          <ul className="breadcrumb" >
            <li>
              <a href="#" style={{ textDecoration: 'none' }}>{/* Assuming a translation library is used */}{t('HOME.HOME')}</a>
            </li>
            <li>
              <a className="active" style={{ textDecoration: 'none' }}>{/* Assuming a translation library is used */}{t('HOME.FAQ')}</a>
            </li>
          </ul>

          <section className="faq">
            <div className="container">


              <Accordion defaultActiveKey="0">
                {/* <Accordion.Item eventKey="0">
                  <Accordion.Header>What is the fuel policy?</Accordion.Header>
                  <Accordion.Body style={{ textAlign: 'start' }}>
                    Depending on the provider the strategy for the fuel varies but on the standard terms, the rental car comes with a limited amount of fuel. The client is responsible to return the vehicle with the same level of fuel on which he hired the car. The client is responsible for further fuel needs, damage and breakdown.
                  </Accordion.Body>
                </Accordion.Item> */}
                {data.faqs.map((faq, i) => (
              <Accordion.Item eventKey={i + 1} key={i + 1}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body style={{ textAlign: 'start' }}>
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
              </Accordion>
            </div>
          </section>
        </div>


      </div>

    </>
  );
}

export default Faq;