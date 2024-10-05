import React, { useEffect, useState } from 'react';
import { useTranslation, } from "react-i18next";
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';



const NotificationPage = () => {
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const [notifications, setNotification] = useState([]);

    const getNotification = () =>{
        const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
        
        const headers = {
          'X-Localization': currentLanguage, // Example header to specify language
          Authorization: `Bearer ${token}`, // Example header to specify language
          'Access-Control-Max-Age': '3600',
          // Add other headers as needed
        };
        try{
            ApiService.getData(AppEndPoints.notification,headers)
        .then((res) => {
            // console.log(res.data);
            setNotification(res.data.data);
        })
        .catch((error) => {
            console.error('Error fetching the about details:', error);
            
          });
        }catch(error){
            console.error('Error fetching the about details:', error);

        }
        
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getNotification(currentLanguage);
        // fetchData(currentLanguage);
    }, []);
    return (
        <>
            <div className={`language-${currentLanguage}`}>
                <section className="notifictaionSec" style={{textAlign:'start'}}>
                    <div className="container">
                        <div className="notification-details">
                            <div className="main-head">
                                {notifications && notifications.length !== 0 ? (
                                    <h5>{t('BOOKNOW.ALLNOTIFICATIONS')}</h5>
                                ) : (
                                    <h5 className="emptyNotfctn">{t('BOOKNOW.NONOTIFICATION')}</h5>
                                )}
                            </div>
                            {notifications && notifications.map((message, index) => (
                                <div key={index} className={`content ${!message.is_seen ? 'active' : ''}`}>
                                    <div className="box">
                                        <p>{message.message}</p>
                                        <p className="time">{message.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>

        </>
    );
}

export default NotificationPage;