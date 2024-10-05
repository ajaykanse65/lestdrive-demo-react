import React, { useEffect, useState } from 'react';
import { useTranslation, } from "react-i18next";
import { Helmet } from 'react-helmet';
import blog from '../assets/images/blog/1.png';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';

const BlogPage = () => {
    const navigate = useNavigate();
    const [blog, setBlog]= useState({ blogs: []});


    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;

    const fetchData  = (lan) => {
        const headers = {
        
          'X-Localization': currentLanguage, // Example header to specify language
          // Add other headers as needed
        };
        ApiService.getData(AppEndPoints.blogs,headers)
          .then((res) => {
            setBlog(res.data.data);
            // console.log(res.data.data.meta_keywords);
          })
          .catch((error) => {
            console.error('Error fetching the about details:', error);
          });
      }

    const goToDetail = (slug) => {
        // navigate('/blogdetails');
        navigate(currentLanguage === 'ar' ? `/ar/blogdetails/${slug}` : `/en/blogdetails/${slug}`);
        localStorage.setItem('activeMenu', 'blogdetails');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData(currentLanguage);
      }, [currentLanguage]);

    return (
        <>
            <div className={`language-${currentLanguage}`}>
            <Helmet>
          <title>{blog?.meta_title || 'Default Title'}</title>
          <meta name="keywords" content={blog?.meta_keywords || 'default keywords'} />
          <meta name="description" content={blog?.meta_description || 'default description'} />
          <meta name="robots" content="index, follow" />
        </Helmet>
                <div className="blog-content-section">
                    <h1 className="main-heading" style={{textDecoration:'none'}}>{t("BLOG.OURBLOGS")}</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="#" style={{textDecoration:'none'}}>{t("HOME.HOME")}</a>
                        </li>
                        <li>
                            <a className="active" style={{textDecoration:'none'}}>{t("BLOG.OURBLOG")}</a>
                        </li>
                    </ul>
                    <section className="blog">
                        <div className="container">
                            <div className="blogSec">
                                {blog.blogs.map((blog, index) => (
                                    <div className="box" 
                                    onClick={() => goToDetail(blog.slug)} 
                                    style={{textAlign:'start'}} key={index}>
                                        <figure>
                                            <img src={blog.thumbnail_image_url} className="w-100" alt="Blog Thumbnail" />
                                        </figure>
                                        <p>{blog.short_description}</p>
                                        <a 
                                        onClick={() => goToDetail(blog.slug)} 
                                        // href= {currentLanguage === 'ar' ? `/ar/blogdetails/${blog.slug}` : `/en/blogdetails/${blog.slug}`}
                                            className="blogReadmore">
                                            {t("HOME.READMORE")}
                                        
                                        </a>
                                    </div>
                                ))}

                                
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </>
    );
}

export default BlogPage;