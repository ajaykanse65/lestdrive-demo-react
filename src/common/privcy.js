import React, { useEffect, useState } from 'react';
import { useTranslation, } from "react-i18next";
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';
import { Helmet } from 'react-helmet';


const Privacy = () => {

    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const [data, setData] = useState({});

  //   const content = `
  //   <h3>Online Privacy Policy</h3>
  //   <p>This policy only applies to activities that letsdrive.ae carries out through its website; it does not apply to "offline" or activities that are not connected to the website.</p>
    
  //   <p>Letsdrive.ae gathers some anonymous information about how visitors use the site. This data is gathered to enhance the functionality of the website but does not, by itself or in combination with other data, personally identify users. The website letsdrive.ae may gather anonymous information about you, such as the kind of browser you are using and the duration of your visit. On the letsdrive.ae website, you might also be asked to submit personally identifiable data, such as your name, address, phone number, and email address. When you leave comments or send emails to letsdrive.ae, sign up for services, or shop on the website, this information may be collected. You always have the choice to give us personally identifiable information in these situations.</p>
    
  //   <h4>Use and Disclosure of Information</h4>
  //   <p>Except as otherwise noted below, we do not share any personally identifiable data about you that we may have about you with third parties. Our site uses the data it gathers to process orders, keep you updated on the status of your orders, let you know about new products or limited-time deals that might be of interest to you, and run statistical analyses to help us make our site better. In order to process your cheque or money order properly, fulfill your order, enhance the functionality of our website, deliver your order, and send you promotional emails from us, we may also disclose your delivery information to third parties.</p>
    
  //   <p>No personally identifiable information related to credit/debit cards will be kept, sold, shared, rented, or leased to any third parties. Cookies are discrete pieces of data that a user's browser caches. Cookies are used by letsdrive.ae to determine if you have previously visited the home page. However, no additional user data is gathered. Letsdrive may examine interest in specific areas of our website or improve the functionality of our website by using non-personal "aggregated data". Additionally, with your consent, we may publish your user name or other identifying information if you send letsdrive.ae content for publication or feedback. In addition, letsdrive.ae may divulge personally identifiable data in response to a subpoena, court order, or other similar request. As required by law, letsdrive.ae may also give such personally identifiable information in response to a request from a law enforcement agency. If letsdrive.ae declares bankruptcy or if there is a transfer of ownership or the assets of letsdrive.ae in connection with planned or completed corporate reorganizations, such as mergers or acquisitions, your personally identifiable information may be disclosed to a party.</p>
    
  //   <h4>Security</h4>
  //   <p>Letsdrive.ae takes the necessary precautions to ensure data security and privacy, using a variety of hardware and software methodologies. Letsdrive, however, cannot ensure the security of any information shared online.</p>
    
  //   <h4>Other Websites</h4>
  //   <p>The privacy policies of websites to which letsdrive.ae provides links are not under our control. Different guidelines for the collection and use of your personal information may be applicable if you give any information to such third parties. Before giving them any information, we firmly advise you to review the privacy policies of such third parties. We have no control over the practices or decisions of third parties. Please be aware that our websites may contain links to third-party-owned and -operated websites on the internet. This policy does not apply to the information practices of web sites that are linked to our site. These additional websites might send users their own cookies or clear gifs, gather information, or ask for personally identifiable data. This data collection is beyond our control. If you have any inquiries about how these organizations use the information they gather, you should get in touch with them directly.</p>
    
  //   <h4>Minors</h4>
  //   <p>Letsdrive does not intentionally gather any personal data from users under the age of 18. Letsdrive.ae forbids minors under the age of 18 from using its website or services, and asks that they do not submit any personal data to the website. Letsdrive.ae does not knowingly distribute personal information about minors under the age of 18 because it does not knowingly collect information about minors under the age of 18. Please email contact@letsdrive.ae if you wish to change or update any information that letsdrive.ae has received.</p>
    
  //   <h4>Modifications of the Privacy Policy</h4>
  //   <p>To adhere to standards and requirements, the website policies and terms & conditions may occasionally be updated or changed. Customers are therefore urged to frequent these sections frequently in order to stay informed about updates to the website. Any changes will become effective the day they are posted.</p>
  // `;

  


  const fetchData  = (lan) => {
    const headers = {
    
      'X-Localization': currentLanguage, // Example header to specify language
      // Add other headers as needed
    };
    ApiService.getData(AppEndPoints.privacy_policy,headers)
      .then((res) => {
        setData(res.data.data);
        // setAboutDetails(res.data.data.meta_keywords);
        // console.log(res.data.data.meta_keywords);
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
        <div class="privacy-terms-section">

        <section className="privacySec">
      <div className="container">
        <div className="privacyDetails" style={{textAlign:'start'}}>
          <h3>{data?.title}</h3>
          {/* <h3>Privacy Policy          </h3> */}
          <p className="privacyContent" dangerouslySetInnerHTML={{ __html: data?.description }}></p>
        </div>
      </div>
    </section>
        </div>


            </div>
        </>
    );
}


export default Privacy;