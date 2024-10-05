import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, } from "react-i18next";
import '../assets/css/english.css';
import '../assets/css/arabic.css';
import '../index.css';
import './forget.css';
import close from '../assets/images/home/close.png';
import eyepass from '../assets/images/home/eye-password.png';
import eyeopen from '../assets/images/home/eye-open.png';
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';
import { environment } from '../config/environment';
const Forget = () => {
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const navigate = useNavigate();

    const [forgotForm, setForgotForm] = useState({ email: '' });
    const [passwordForm, setPasswordForm] = useState({ password: '', password_confirmation: '' });
    const [blnPasswordChange, setBlnPasswordChange] = useState(false);
    const [blnEnquirySubmitted, setBlnEnquirySubmitted] = useState(false);
    const [showPasswd, setShowPasswd] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [blnUploadStart, setBlnUploadStart] = useState(false);

    const goToLogin = () => {
        const url = currentLanguage === 'ar' ? '/ar/login' : '/en/login';
        window.location.href = url;
    }
    const handleForgotChange = (e) => {
        setForgotForm({ ...forgotForm, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    };
    const forgotSubmit = async (e) => {
        e.preventDefault();
    
        // Set the submission flag to true to trigger validation messages
        setBlnEnquirySubmitted(true);
    
        // Validate the email before proceeding
        if (!forgotForm.email || !/\S+@\S+\.\S+/.test(forgotForm.email)) {
            setBlnUploadStart(false);
            return;
        }
    
        // If email is valid, proceed with submission logic
        try {
            setBlnUploadStart(true);
            const data = {
                email: forgotForm.email,
                url: `${environment.baseUrl}password-change`,
            };
            console.log(data);

            const response  = await ApiService.postData(AppEndPoints.forgot_password, data);
            setBlnUploadStart(false);
            setBlnEnquirySubmitted(false);
            console.log(response.data);

            if (response.data.errorCode === 0) {
                // resetForm();
                // history.push('/');
                goToHome();
            } else {
                alert(response.data.message);
            }
            
            // Add your forgot password submission logic here
    
            // Assume the submission is successful
            // setBlnUploadStart(false); // Uncomment if you need to reset the flag after a successful submission
        } catch (error) {
            console.error("An error occurred during submission:", error);
            setBlnUploadStart(false);
        }
    };

    const passwordSubmit = (e) => {
        e.preventDefault();
        setBlnEnquirySubmitted(true);
        // Add your change password submission logic here
    };

    const showPassword = () => setShowPasswd(true);
    const hidePassword = () => setShowPasswd(false);

    const showConfirmed = () => setShowConfirm(true);
    const hideConfirm = () => setShowConfirm(false);

    const goToHome = () => {
        // navigate('/'); // Navigate to '/contact'
        // const path = '/';
        // window.location.href = path;
        navigate(currentLanguage === 'ar' ? '/ar' : '/en')

        localStorage.setItem('activeMenu', 'home');
        
      }

      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <>
            <div className={`language-${currentLanguage}`}>

                <section className="forgetpassword-modal">
                    <div className="container">
                        <div className="modal-header">
                            <a
                            onClick={goToHome}
                                //   onClick={/* Add your close function here */}
                                className="login-close">
                                <img src={close} alt="" />
                            </a>
                        </div>

                        {/* Forgot password */}
                        <div className="modal-body" style={{textAlign:'start'}} hidden={blnPasswordChange}>
                            <h5>{t("FORGOTPASSWORD.FORGOTPASSWORD")}</h5>
                            <div className="password-here">
                                <div className="login-form">
                                    <div className="form-group posRelative">
                                        <label htmlFor="Email">{t("FORGOTPASSWORD.ENTEREMAIL")}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={forgotForm.email}
                                            onChange={handleForgotChange}
                                            className="form-control"
                                            id="Email1"
                                            aria-describedby="emailHelp"
                                            placeholder={t("FORGOTPASSWORD.REGISTEREDEMAIL")}
                                        />
                                        {blnEnquirySubmitted && !forgotForm.email && (
                                            <span className="validMsg">{t("VALIDATION.EMAILREQUIRED")}</span>
                                        )}
                                        {blnEnquirySubmitted && forgotForm.email && !/\S+@\S+\.\S+/.test(forgotForm.email) && (
                                            <span className="validMsg">{t("VALIDATION.INVALIDEMAIL")}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="reset-btn">
                                    <button
                                        onClick={forgotSubmit}
                                        className={`btn btn-primary ${blnUploadStart ? 'btn-loading' : ''}`}
                                    >
                                        {t("FORGOTPASSWORD.GETLINK")}
                                    </button>
                                </div>
                                <div className="register-here">
                                    <p
                                    //   onClick={() => history.push(currentLanguage === 'ar' ? '/ar/login' : '/en/login')}
                                    >
                                        {t("FORGOTPASSWORD.REMEMBER")}? <a>{t("HOME.LOGIN")}</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Forgot password end */}

                        {/* Password change */}
                        <div className="modal-body" style={{textAlign:'start'}} hidden={!blnPasswordChange}>
                            <h5>{t("FORGOTPASSWORD.CHANGEPASSWORD")}</h5>
                            <div className="password-here">
                                <div className="login-form">
                                    <div className="form-group posRelative">
                                        <label htmlFor="password1">{t("FORGOTPASSWORD.PASSWORD")}</label>
                                        <input
                                            type={showPasswd ? "text" : "password"}
                                            name="password"
                                            value={passwordForm.password}
                                            onChange={handlePasswordChange}
                                            className="form-control"
                                            id="password1"
                                            aria-describedby="emailHelp"
                                            placeholder={t("FORGOTPASSWORD.PASSWORD")}
                                        />
                                        <span className="toggle">
                                            <img
                                                onClick={showPasswd ? hidePassword : showPassword}
                                                src={showPasswd ? {eyepass} : {eyeopen}}
                                                alt=""
                                            />
                                            <a onClick={showPasswd ? hidePassword : showPassword}>
                                                {showPasswd ? t("FORGOTPASSWORD.HIDE") : t("FORGOTPASSWORD.SHOW")}
                                            </a>
                                        </span>
                                        {blnEnquirySubmitted && !passwordForm.password && (
                                            <span className="validMsg">{t("VALIDATION.PASSWORDREQUIRED")}</span>
                                        )}
                                    </div>
                                    <div className="form-group posRelative">
                                        <label htmlFor="password2">{t("FORGOTPASSWORD.CONFIRMPASSWORD")}</label>
                                        <input
                                            type={showConfirm ? "text" : "password"}
                                            name="password_confirmation"
                                            value={passwordForm.password_confirmation}
                                            onChange={handlePasswordChange}
                                            className="form-control"
                                            id="password2"
                                            aria-describedby="emailHelp"
                                            placeholder={t("FORGOTPASSWORD.CONFIRMPASSWORD")}
                                        />
                                        <span className="toggle">
                                            <img
                                                onClick={showConfirm ? hideConfirm : showConfirmed}
                                                src={showConfirm ? {eyepass} : {eyeopen}}
                                                alt=""
                                            />
                                            <a onClick={showConfirm ? hideConfirm : showConfirmed}>
                                                {showConfirm ? t("FORGOTPASSWORD.HIDE") : t("FORGOTPASSWORD.SHOW")}
                                            </a>
                                        </span>
                                        {blnEnquirySubmitted && !passwordForm.password_confirmation && (
                                            <span className="validMsg">{t("VALIDATION.CONFRIMPASSREQUIRED")}</span>
                                        )}
                                        {blnEnquirySubmitted &&
                                            passwordForm.password_confirmation &&
                                            passwordForm.password_confirmation !== passwordForm.password && (
                                                <span className="validMsg">{t("VALIDATION.PASSWORDNOTMATCH")}</span>
                                            )}
                                    </div>
                                    <div className="form-group posRelative">
                                        {/* Add your password strength bar component here */}
                                    </div>
                                </div>
                                <div className="reset-btn">
                                    <button onClick={passwordSubmit} className="btn btn-primary">
                                        {t("DETAIL.SUBMIT")}
                                    </button>
                                </div>
                                <div className="register-here">
                                    <p
                                    onClick={goToLogin}
                                    //   onClick={() => history.push(currentLanguage === 'ar' ? '/ar/login' : '/en/login')}
                                    >
                                        {t("FORGOTPASSWORD.REMEMBERCRED")}? <a>{t("HOME.LOGIN")}</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Password change end */}
                    </div>
                </section>
            </div>

        </>
    );
}

export default Forget;