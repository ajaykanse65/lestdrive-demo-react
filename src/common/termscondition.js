import React, { useEffect, useState } from 'react';
import { useTranslation, } from "react-i18next";
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';

 const TermsCondition = () => {

    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;


  const [data, setData] = useState({});


  const fetchData  = (lan) => {
    const headers = {
    
      'X-Localization': currentLanguage, // Example header to specify language
      // Add other headers as needed
    };
    ApiService.getData(AppEndPoints.terms_and_conditions,headers)
      .then((res) => {
        setData(res.data.data);
        // setAboutDetails(res.data.data);
        console.log(res.data.data);
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
<div class="privacy-terms-section">
<section className="termsSec">
      <div className="container">
        <div className="termsDetails" style={{textAlign:'start'}}>
          <h3>{data?.title}</h3>
          {/* <h3>Terms and Conditions</h3> */}
          <p className="termsContent" dangerouslySetInnerHTML={{ __html: data?.description }}></p>
        </div>
      </div>
    </section>
</div>
</div>
    </>
    );
 }

 export default TermsCondition;