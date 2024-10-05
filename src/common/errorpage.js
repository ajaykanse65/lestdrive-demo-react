import React from "react";
import { useTranslation, } from "react-i18next";
import { useNavigate } from "react-router-dom";
import errror from '../assets/images/404/404.png';
import './error.css';

const ErrorPage = () => {

    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const navigate = useNavigate();


    const goToHome = () => {
        // navigate('/'); // Navigate to '/contact'
        // const path = '/';
        // window.location.href = path;
        navigate(currentLanguage === 'ar' ? '/ar' : '/en')

        localStorage.setItem('activeMenu', 'home');
        
      }
    return (
        <>
            <div className={`language-${currentLanguage}`}>

                <section className="server-error">
                    <div className="container">
                        <div className="serverDetails">
                            <img src={errror} className="img-fluid" />
                            <div className="serverContent">
                                <h5>404</h5>
                                <h6>{t("ERROR.PAGENOTFOUND")}!</h6>
                                <p>{t('ERROR.SORRY')}!</p>
                            </div>
                            <div className="serverButton">
                                <a onClick={goToHome}>{t('ERROR.GOHOME')}</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    );
}

export default ErrorPage;