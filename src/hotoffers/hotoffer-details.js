import React, { useEffect, useState } from 'react';
import '../assets/css/english.css';
import '../assets/css/arabic.css'; 
import AppEndPoints from '../config/AppEndPoints';
import ApiService from '../service/ApiService';
import '../index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation, } from "react-i18next";
import { data } from 'jquery';
import { useForm } from 'react-hook-form';
import './features.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HotOfferDetaisl = () => {
    // const { id } = useParams()
    const navigate = useNavigate();

    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const [hotDeal, setHotDeal] = useState({ data: [], terms: [], documents: [] });
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm();

    const onSubmit = async (formData) => {
        
        const hot_offer_id = sessionStorage.getItem('offer-slug');
        const dataToSend = { ...formData, hot_offer_id };

        console.log(dataToSend);
        try {
          const response = await ApiService.postData(AppEndPoints.hotofferEnquiry, dataToSend);
          if (response.data.errorCode === 0) {
            toast.success(response.data.success, { position: "top-right" });
            console.log(response.data.success);
          } else {
            toast.error('Something went wrong', { position: "top-right" });
          }
        } catch (error) {
          toast.error(error.message, { position: "top-right" });
          console.log(error.message);
        }
      };

    const fetchData = (lan) => {
        const id = sessionStorage.getItem('offer-slug');
        const headers = {

            'X-Localization': currentLanguage, // Example header to specify language
            // Add other headers as needed
        };
        ApiService.getData(`${AppEndPoints.hot_deals}/${id}`, headers)
            .then((res) => {
                setHotDeal(res.data.data);
                // console.log(res.data.data);
                // console.log(hotDeal.data?.title);
            })
            .catch((error) => {
                console.error('Error fetching the about details:', error);
            });
    }

    const goToHome = () => {
        navigate(currentLanguage === 'ar' ? '/ar' : '/en')

    }

    

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData(currentLanguage);
    }, [currentLanguage]);

    return (
        <>
            <div className={`language-${currentLanguage}`}>
                <div className='hot-deals-section'>
                    <h1 className="main-heading">{hotDeal.title}</h1>
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
                                {t('DETAIL.FEATURES')}
                            </a>
                        </li>
                    </ul>


                    <section className="adPromotions">
                        <div className="container">
                            <div className="adHead">
                                <h2 style={{textAlign:'start'}}>{hotDeal.description}</h2>
                            </div>
                            <div className="adImage">
                                <img src={hotDeal.banner_image_url} className="img-fluid" alt="Promotion Banner" />
                            </div>
                            <div className="details">
                                <div className="contentSec" style={{textAlign:'start'}}>
                                    {hotDeal.terms.length > 0 && (
                                        <div className="adContent">
                                            <h3>{t("DETAIL.TERMSANDCONDITIONS")}</h3>
                                            <ul>
                                                {hotDeal.terms.map((terms, index) => (
                                                    <li key={index}>{terms}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {hotDeal.documents.length > 0 && (
                                        <div className="adPoints">
                                            <h3>{t("DETAIL.DOCUMENTSREQUIRED")}</h3>
                                            <ul>
                                                {hotDeal.documents.map((documents, index) => (
                                                    <li key={index}>{documents}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className="formSec">
                                    <h4>{t("DETAIL.BOOKNOW")}</h4>
                                    <div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="formField">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={t("CONTACT.NAME")}
                                                    {...register('name', { required: true })}
                                                />
                                                {touchedFields.name && errors.name?.type === 'required' && (
                                                    <p style={{textAlign:'start'}} className="error-msg">{t("VALIDATION.NAMEREQUIRED")}</p>
                                                )}
                                            </div>
                                            
                                                <div className="formField">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder={t("CONTACT.EMAIL")}
                                                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                                    />
                                                    {touchedFields.email && errors.email?.type === 'required' && (
                                                        <p style={{textAlign:'start'}}  className="error-msg">{t("VALIDATION.EMAILREQUIRED")}</p>
                                                    )}
                                                    {touchedFields.email && errors.email?.type === 'pattern' && (
                                                        <p style={{textAlign:'start'}}  className="error-msg">{t("VALIDATION.INVALIDEMAIL")}</p>
                                                    )}
                                                </div>
                                                <div className="formField">
                                                    <input
                                                    type="number"
                                                        className="form-control"
                                                        placeholder={t("CONTACT.PHONENUMBER")}
                                                        {...register('phone', { required: true, pattern: /^[0-9]*$/ })}
                                                    />
                                                    {touchedFields.phone && errors.phone?.type === 'required' && (
                                                        <p style={{textAlign:'start'}}  className="error-msg">{t("VALIDATION.PHONENUMBERREQUIRED")}</p>
                                                    )}
                                                </div>
                                                <div className="formField">
                                                    <textarea
                                                        className="form-control"
                                                        placeholder={t("CONTACT.COMMENTS")}
                                                        {...register('message', { required: true })}
                                                    ></textarea>
                                                    {touchedFields.message && errors.message?.type === 'required' && (
                                                        <p  style={{textAlign:'start'}} className="error-msg">{t("VALIDATION.COMMENTREQUIRED")}</p>
                                                    )}
                                                </div>
                                            
                                            <div className="submutBtn">
                                                <a 
                                                onClick={handleSubmit(onSubmit)}
                                                type="submit">{t("DETAIL.SUBMIT")}</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ToastContainer /> {/* Add ToastContainer here */}

                    </section>


                </div>
            </div>

        </>
    );
}

export default HotOfferDetaisl;

