import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route,  Routes, Navigate,  } from 'react-router-dom';
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';
import Home from './home/home';
import ContactUs from './common/contact';
import './App.css';
import { useTranslation, } from "react-i18next";
import { lazy, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './common/about';
import TermsCondition from './common/termscondition';
import Privacy from './common/privcy';
import Faq from './common/faq';
import BlogPage from './common/blog';
import BlogDetaisl from './common/blogdetails';
import Login from './auth/login';
import Resgister from './auth/register';
import Forget from './auth/forget';
import './assets/css/english.css';
// import './assets/css/arabic.css';
import MyProfile from './myaccount/myprofile';
import MyDocuments from './myaccount/mydocuments';
import MyBooking from './myaccount/mybooking';
// import BookingDetails from './myaccount/bookingdetails';
import ProductList from './product/productlist';
import ProductDetails from './product/productdetails';
import HottOffers from './hotoffers/hotoffer';
import { generateRoutes } from './routeUtils';
import { LanguageProvider, useLanguage } from './LanguageContext';
import HotOfferDetaisl from './hotoffers/hotoffer-details';
import { initializeApp } from '@firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from './config/environment';
import { GoogleOAuthProvider } from '@react-oauth/google';
import useScrollToTop from './shared/custom-hook';
import PlaceList from './common/place-list';
import ErrorPage from './common/errorpage';
import NotificationPage from './auth/notification';


initializeApp(environment.firebase);
const messaging = getMessaging();

function App() {
  // useScrollToTop();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const lanCheck = generateRoutes();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    requestPermission();
    listen();
  }, []);


  const requestPermission = () => {
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          localStorage.setItem('deviceToken', currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };

  const listen = () => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      setMessage(payload);
    });
  };

  if (lanCheck) {
    sessionStorage.setItem('language', currentLanguage);
    sessionStorage.removeItem('clicked');
  }
  // console.log(currentLanguage);
  return (
    <BrowserRouter>
      <div className={`language-${lanCheck}`}>
      <Header />
        <main>
      
          <Routes>
            {/* <Route path="/" exact element={<Home />} /> */}
          
            <Route path={lanCheck === 'ar' ? '/ar/contact-us' : '/en/contact-us'} element={<ContactUs />} />
            <Route path={lanCheck === 'ar' ? '/ar/about-us' : '/en/about-us'} element={<About />} />
            <Route path={lanCheck === 'ar' ? '/ar/terms-condition' : '/en/terms-condition'} element={<TermsCondition />} />
            <Route path={lanCheck === 'ar' ? '/ar/privacy' : '/en/privacy'} element={<Privacy />} />
            <Route path={lanCheck === 'ar' ? '/ar/blog' : '/en/blog'} element={<BlogPage />} />
            <Route path={lanCheck === 'ar' ? '/ar/blogdetails/:id' : '/en/blogdetails/:id'}  element={<BlogDetaisl />} />
            <Route path={lanCheck === 'ar' ? '/ar/login' : '/en/login'} element={<Login />} />
            <Route path={lanCheck === 'ar' ? '/ar/faqs' : '/en/faqs'} element={<Faq />} />
            <Route path={lanCheck === 'ar' ? '/ar/register' : '/en/register'} element={<Resgister />}></Route>
            <Route path={lanCheck === 'ar' ? '/ar/forget' : '/en/forget'} element={<Forget />}></Route>
            <Route path={lanCheck === 'ar' ? '/ar/myprofile' : '/en/myprofile'} element={<MyProfile />}></Route>
            <Route path={lanCheck === 'ar' ? '/ar/mydoc' : '/en/mydoc'} element={<MyDocuments />}></Route>
            <Route path={lanCheck === 'ar' ? '/ar/mybooking' : '/en/mybooking'} element={<MyBooking />}></Route>
            {/* <Route path={currentLanguage === 'ar' ? '/ar/bookingdetails' : '/en/bookingdetails'} element={<BookingDetails />}></Route> */}
            <Route path={lanCheck === 'ar' ? '/ar/cheapest-car-rentals' : '/en/cheapest-car-rentals'} element={<ProductList />}></Route>
            <Route path={lanCheck === 'ar' ? '/ar/cheapest-car-rentals/:id/:id' : '/en/cheapest-car-rentals/:id/:id'} element={<ProductList />}></Route>
            <Route path={lanCheck === 'ar' ? '/ar/car-details/:id' : '/en/car-details/:id'} element={<ProductDetails />}></Route>
            <Route path={lanCheck === 'ar' ? '/ar/hotoffers' : '/en/hotoffers'} element={<HottOffers />}></Route>
            <Route path={lanCheck === 'ar' ? '/ar/hotoffers/:id' : '/en/hotoffers/:id'} element={<HotOfferDetaisl />}></Route>
            <Route path={lanCheck === 'ar' ? '/ar/our-locations' : '/en/our-locations'} element={<PlaceList />}></Route>
            <Route path={lanCheck === 'ar' ? '/ar/our-locations/:id' : '/en/our-locations/:id'} element={<PlaceList />}></Route>
            <Route path={lanCheck === 'ar' ? 'ar/shared/notification' :'en/shared/notification'} element={<NotificationPage />}></Route>
            <Route path="/" exact element={<Navigate to={lanCheck === 'ar' ? '/ar' : '/en'} />} />
            <Route path="/en" exact element={<Home />} />
            <Route path="/ar" exact element={<Home />} />
            
          </Routes>
          

        </main>
        
        <Footer />
        
      </div>
      
    </BrowserRouter>
    


  );
}



export default App;
