import React, { useEffect, useState } from 'react';
import { useTranslation, } from "react-i18next";
import ReCAPTCHA from 'react-google-recaptcha';
import { MemoryRouter } from 'react-router-dom';
import { GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import '../assets/css/english.css';
import '../assets/css/arabic.css';
import './login.css';
import close from '../assets/images/home/close.png';
import fb from '../assets/images/home/fb-login.png';
import eyepass from '../assets/images/home/eye-password.png';
import eyeopen from '../assets/images/home/eye-open.png';
import { ToastContainer, toast } from 'react-toastify';
import AuthService from '../service/authService';
// import { getDeviceToken } from '../service/devicetoken';
import { getDeviceToken } from '../service/firebase';    
import google from '../assets/images/home/google-login.png';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';


const Login = ({ user, socialUser, language }) => {
  // const history = MemoryRouter();
  const navigate = useNavigate();
  const [blnSendMail, setBlnSendMail] = useState(false);


  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const [form, setForm] = useState({
    email: '',
    password: '',
    device_token: ''
  });
  const [showLogPassword, setShowLogPassword] = useState(false);
  const [blnSubmitted, setBlnSubmitted] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [invaliUserError, setInvaliUserError] = useState('');
  const [checkCaptcha, setCheckCaptcha] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const goToRegister = () => {
    const url = currentLanguage === 'ar' ? `/ar/register` : `/en/register`;
    window.location.href = url;
    // navigate('/register');
  }


  const handleVerify = (token) => {
    if (token) {
      setCheckCaptcha(true);
      
    } else {
      setCheckCaptcha(false);
      
    }
  };

  const goToFoeget = () => {
    const url = currentLanguage === 'ar' ? `/ar/forget` : `/en/forget`;
    window.location.href = url;
    // navigate('/forget');
  }

  const handleSubmit = (e) => {
    // console.log("lechalu");
  
    e.preventDefault();
    if (!checkCaptcha) {
      toast.error('Verify Captcha');
      return;
    }
  
    setBlnSubmitted(true);
  
    if (!form.email) {
      // console.log("email");
      setEmailErrorMsg(true);
    }
    if (!form.password) {
      // console.log("password");
      setPasswordErrorMsg(true);
    }
    if (form.email && form.password) {
      setBlnSendMail(true);
      const data = {
        email: form.email,
        password: form.password,
        device_token: getDeviceToken(), // Retrieve the device token
      };
      // console.log(data);
  
      AuthService.login(data).then((res) => {
        // console.log('Response received:', res);
        // console.log('Response data:', res.data);
  
        const { errorCode, data } = res.data; // Destructure the response data
  
        if (errorCode === 0) {
          // console.log("one");
          setEmailErrorMsg(false);
          setPasswordErrorMsg(false);
          setInvalidLogin(false);
          
          localStorage.setItem('loggedIn', JSON.stringify(true));
          localStorage.setItem('token', data.token);
          setForm({ email: '', password: '' });

          const path = '/';
          // const path = '/';
                    
          const params = new URLSearchParams(window.location.search);
          const redirectUrl = params.get('redirect_url');
          if (redirectUrl) {
              // Redirect back to the original page after login
              window.location.href = decodeURIComponent(redirectUrl);
          } else {
              // Fallback to a default page if there's no redirect URL
              window.location.href = path;
          }
          // Assuming you have jQuery to hide the modal
          // $('#loginModal').modal('hide'); 
  
          // if (res.redUrl) {
          //   // console.log("two");
          //   console.log(res.redUrl);
          //   navigate(res.redUrl);
          // } else {
          //   // console.log("three");
          //   // window.location.reload();
          //   // navigate('/');
          // }
          // setBlnSendMail(false);
        } else if (errorCode === 1) {
          setBlnSendMail(false);
          // console.log("four");
          setInvalidLogin(true);
        } else if (errorCode === 2) {
          setBlnSendMail(false);
          // console.log("five");
          setInvaliUserError(res.data.message);
        }
      }).catch((error) => {
        setBlnSendMail(false);
        console.error('Error during login:', error);
      });
    }
  };
  

  const showLoginPassword = () => setShowLogPassword(true);
  const hideLoginPassword = () => setShowLogPassword(false);

  const clearInputs = () => {
    setForm({
      email: '',
      password: '',
    });
  };

  const login = useGoogleLogin({
    onSuccess: tokenResponse => getInfo(tokenResponse.access_token),
    // onSuccess: tokenResponse => console.log(tokenResponse),
  });

  const getInfo = async (token) => {
    try {
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Corrected the template literal syntax
          },
        }
      );
    //   console.log(res.data.name);
      const body = JSON.stringify({
        email: res.data.email,
        name: res.data.name,
        token: token,
        type: 'GOOGLE',
    
      });
      console.log(body);
      AuthService.socialLogin(body)
      .then((res)=> {
        console.log(res);  
        if(res.data.errorCode === 0){
            localStorage.setItem('loggedIn', JSON.stringify(true));
            localStorage.setItem('token', res.data.token);
            toast.success(res.data.message);

            // navigate('/login');
            const path = '/';
            
            const params = new URLSearchParams(window.location.search);
            const redirectUrl = params.get('redirect_url');
            if (redirectUrl) {
                // Redirect back to the original page after login
                window.location.href = decodeURIComponent(redirectUrl);
            } else {
                // Fallback to a default page if there's no redirect URL
                window.location.href = path;
            }

        }
      })
      


    } catch (err) {
      console.log(err);
    }
  };


  const goToHome = () => {
    navigate(currentLanguage === 'ar' ? '/ar' : '/en')

    localStorage.setItem('activeMenu', 'home');

  }
  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <>
      <div className={`language-${currentLanguage}`}>
        <section className="login-modal">
          <div className="container" style={{ textAlign: 'start' }}>
            <div className="modal-header">
              <a
                // onClick={/* Add your close function here */}
                onClick={goToHome}
                className="login-close"
              >
                <img src={close} alt="" />
              </a>
            </div>
            <div className="modal-body">
              <h5>{t("HOME.LOGIN")}</h5>
              <div className="login-here">
                <p>{t("HOME.LOGINVIA")}</p>
                <div className="social-media">
                  {!user && (
                    <div className="box">
                      <img src={google} onClick={() => login()}></img>

                      {/* <GoogleSigninButton type="icon" size="medium" /> */}
                    </div>
                  )}
                  {!user && (
                    <div className="box">
                      <a
                      //   onClick={/* Add your loginWithFB function here */}
                      >
                        <img src={fb} alt="" />
                      </a>
                    </div>
                  )}
                </div>
                <p className="another-option">{t("HOME.OR")}</p>
                <div className="login-form">
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group">
                      <label htmlFor="InputEmail">{t("CONTACT.EMAIL")}*</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control"
                        id="InputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={t("PLACEHOLDER.EMAIL")}
                      />
                    </div>
                    {blnSubmitted && !form.email && (
                      <span className="validatorsg">{t("VALIDATION.EMAILREQUIRED")}</span>
                    )}
                    {blnSubmitted && form.email && !/\S+@\S+\.\S+/.test(form.email) && (
                      <span className="validatorsg">{t("VALIDATION.INVALIDEMAIL")}</span>
                    )}
                    <div className="form-group">
                      <label htmlFor="InputPassword">{t("FORGOTPASSWORD.PASSWORD")}*</label>
                      <input
                        type={showLogPassword ? "text" : "password"}
                        autoComplete='password'
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="form-control"
                        id="InputPassword"
                        placeholder={t("FORGOTPASSWORD.PASSWORD")}
                      />
                      <span className="toggle">
                        <img
                          onClick={showLogPassword ? hideLoginPassword : showLoginPassword}
                          src={showLogPassword ? { eyepass } : { eyeopen }}
                          alt=""
                        />
                        <a onClick={showLogPassword ? hideLoginPassword : showLoginPassword}>
                          {showLogPassword ? t("FORGOTPASSWORD.HIDE") : t("FORGOTPASSWORD.SHOW")}
                        </a>
                      </span>
                    </div>
                    {blnSubmitted && !form.password && (
                      <span className="validatorsg">{t("VALIDATION.PASSWORDREQUIRED")}</span>
                    )}
                    {invalidLogin && (
                      <span className="validatorsg">{t("VALIDATION.INVALIDCRED")}</span>
                    )}
                    {!invalidLogin && invaliUserError && (
                      <span className="validatorsg">{invaliUserError}</span>
                    )}
                    <div className="forget-password">
                      <a
                        onClick={goToFoeget}
                      //   onClick={() => history.push(language === 'ar' ? '/ar/forgot-password' : '/en/forgot-password')}
                      >
                        {t("FORGOTPASSWORD.FORGOTPASSWORD")}?
                      </a>
                    </div>
                    <ReCAPTCHA 
                    sitekey='6LeGxgcoAAAAAOoCUGDgQhZ6MKiRoa0eV5yi7FrM'
                    onChange={handleVerify} />
                    <div className="login-btn">
                      <button type="submit" className= {`btn btn-primary ${blnSendMail ? 'btn-loading' : ''}`}>
                        {t("HOME.LOGIN")}
                      </button>
                    </div>
                    <div className="register-here">
                      <p>
                        {t("FORGOTPASSWORD.DIDNTHAVEACCOUNT")}?
                        <a
                          onClick={goToRegister}
                        // onClick={/* Add your showSignUp function here */}
                        >
                          {t("FOOTER.REGISTER")}
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer /> {/* Add ToastContainer here */}

        </section>
      </div>
    </>
  );
}

export default Login;