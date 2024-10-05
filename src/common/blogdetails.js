import React, { useEffect, useState } from 'react';
import { useTranslation, } from "react-i18next";
import fb from '../assets/images/blog/fb.svg';
import { Helmet } from 'react-helmet';
import twitter from '../assets/images/blog/twitter.svg';
import blog from '../assets/images/blog/bimage.jpg';
import other from '../assets/images/blog/1.png';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';


const BlogDetaisl = () => {
    const currentUrl = window.location.href;
    const { id } = useParams()
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const [blogDetails, setBlog] = useState({});
    const [blog, setBlogData]= useState({ blogs: []});

    const currentLanguage = i18n.language;

    const goToDetail = (slug) => {
        // navigate('/blogdetails');
        navigate(currentLanguage === 'ar' ? `/ar/blogdetails/${slug}` : `/en/blogdetails/${slug}`);
        localStorage.setItem('activeMenu', 'blogdetails');
        window.location.reload();
    }
    const share = (type) => {
        let navUrl;
        const searchParams = new URLSearchParams();
    
        switch (type) {
          case 'facebook':
            searchParams.set('u', currentUrl);
            navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams.toString();
            break;
          case 'twitter':
            searchParams.set('url', currentUrl);
            navUrl = 'https://twitter.com/share?' + searchParams.toString();
            break;
          default:
            return;
        }
        window.open(navUrl, '_blank');

    }
    

    const fetchData = (lan) => {
        const headers = {

            'X-Localization': currentLanguage, // Example header to specify language
            // Add other headers as needed
        };
        ApiService.getData(`${AppEndPoints.blogs}/${id}`, headers)
            .then((res) => {
                setBlog(res.data.data);
                // console.log(res.data.data.meta_keywords);
            })
            .catch((error) => {
                console.error('Error fetching the about details:', error);
            });

            ApiService.getData(AppEndPoints.blogs,headers)
            .then((res) => {
                setBlogData(res.data.data);
              console.log(res.data.data);
            })
            .catch((error) => {
              console.error('Error fetching the about details:', error);
            });

            
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(id);
        fetchData(currentLanguage);
    }, [currentLanguage, id]);

    return (
        <>
            <div className={`language-${currentLanguage}`}>
            <Helmet>
          <title>{blogDetails?.meta_title || 'Default Title'}</title>
          <meta name="keywords" content={blogDetails?.meta_keywords || 'default keywords'} />
          <meta name="description" content={blogDetails?.meta_description || 'default description'} />
          <meta name="robots" content="index, follow" />
        </Helmet>
                <div className="blog-detail-content">
                    <h1 className="main-heading" style={{ textDecoration: 'none' }}>{t("BLOG.OURBLOGS")}</h1>
                    <ul className="breadcrumb">
                        <li><a href="#" style={{ textDecoration: 'none' }}>{t("HOME.HOME")}</a></li>
                        <li><a className="active" style={{ textDecoration: 'none' }}>{t("BLOG.OURBLOGS")}</a></li>
                    </ul>

                    {/* Blog details */}
                    {blogDetails && blogDetails.length !== 0 && (
                        <section className="blog-detail">
                            <div className="container">
                                <div className="blog-image">
                                    <img src={blogDetails.image_url} className="img-fluid" alt="Blog-image" />
                                </div>
                                <div className="content">
                                    <span>{new Date(blogDetails.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                                    <h4>{blogDetails.title}</h4>
                                    <p>{blogDetails.description}</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* <section className="blog-detail">
                        <div className="container">
                            <div className="blog-image">
                                <img src={blog} className="img-fluid" alt="Blog-image" />
                            </div>
                            <div className="content">
                                <span>{new Date(blogDetails.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              <h4>{blogDetails.title}</h4>
              <p>{blogDetails.description}</p>
                                <span>26 June 2023</span>
                                <h4>The Advantages of Renting a Kia Picanto for Your Road Trip</h4>
                                
                            </div>
                        </div>
                    </section> */}

                    {/* Social icon */}
                    <section className="social-icon">
                        <div className="container">
                            <div className="share-to">
                                <h4>{t("BLOGDETAIL.SHARETO")}</h4>
                                <a
                                    onClick={() => share('facebook')} 
                                    target="_blank" rel="noopener noreferrer">
                                    <img src={fb} className="w-auto" alt="" />
                                </a>
                                <a
                                    onClick={() => share('twitter')} 
                                    target="_blank" rel="noopener noreferrer">
                                    <img src={twitter} className="w-auto" alt="" />
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Other Blogs */}
                    <section className="other-blogs">
                        <div className="container">
                            <div className="main-head">
                                <h3>{t("BLOG.OTHERBLOGS")}</h3>
                            </div>
                            <div className="content">
                                {blogDetails?.other_blogs?.map((blog, index) => (
              <div className="box" style={{textAlign:'start'}} key={index} onClick={() => goToDetail(blog.slug)}>
                <figure>
                  <img src={blog.thumbnail_image_url} className="w-100" alt="Blog-image" />
                </figure>
                <p>{blog.short_description}</p>
                <a className="blogReadmore">{t("HOME.READMORE")}</a>
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

export default BlogDetaisl;