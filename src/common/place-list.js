import React, { useEffect, useState } from 'react';
import '../assets/css/english.css';
import '../assets/css/arabic.css';
import { useTranslation, } from "react-i18next";
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';


const PlaceList = () => {


    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const [data, setData] =  useState({});


    const goToCity =(city) => {

    }

    const fetchData =() => {
        const headers = {

            'X-Localization': currentLanguage, // Example header to specify language
            // Add other headers as needed
        };
        ApiService.getData(AppEndPoints.all_cities,headers)
        .then((res) => {
            console.log(res.data.data);
            setData(res.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }



    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    

    },[]);


    return (
        <>
            <div className={`language-${currentLanguage}`}>
                <div class="locationlisting">
                    <h1 class="main-heading">{t('LOCATIONS.OURLOCATIONS')}</h1>
                    <ul class="breadcrumb">
                        <li><a href="#">{t('HOME.HOME')}</a></li>
                        <li><a class="active">{t('LOCATIONS.OURLOCATIONS')}</a></li>
                    </ul>

                    <section className="ourLocationssec">
                        <div className="container">
                            <div className="locationList" style={{textAlign:'start'}}>
                                <div className="locationItem">
                                    {data?.A && (
                                        <div className="box">
                                            <h3>A</h3>
                                            <ul>
                                                {data.A.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.B && (
                                        <div className="box">
                                            <h3>B</h3>
                                            <ul>
                                                {data.B.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="locationItem">
                                    {data?.C && (
                                        <div className="box">
                                            <h3>C</h3>
                                            <ul>
                                                {data.C.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.D && (
                                        <div className="box">
                                            <h3>D</h3>
                                            <ul>
                                                {data.D.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="locationItem">
                                    {data?.E && (
                                        <div className="box">
                                            <h3>E</h3>
                                            <ul>
                                                {data.E.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.F && (
                                        <div className="box">
                                            <h3>F</h3>
                                            <ul>
                                                {data.F.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.G && (
                                        <div className="box">
                                            <h3>G</h3>
                                            <ul>
                                                {data.G.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.J && (
                                        <div className="box">
                                            <h3>J</h3>
                                            <ul>
                                                {data.J.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.M && (
                                        <div className="box">
                                            <h3>M</h3>
                                            <ul>
                                                {data.M.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="locationItem d-none">
                                    {data?.H && (
                                        <div className="box">
                                            <h3>H</h3>
                                            <ul>
                                                {data.H.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="locationItem d-none">
                                    {data?.I && (
                                        <div className="box">
                                            <h3>I</h3>
                                            <ul>
                                                {data.I.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="locationItem d-none">
                                    {data?.K && (
                                        <div className="box">
                                            <h3>K</h3>
                                            <ul>
                                                {data.K.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.L && (
                                        <div className="box">
                                            <h3>L</h3>
                                            <ul>
                                                {data.L.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="locationItem d-none">
                                    {data?.O && (
                                        <div className="box">
                                            <h3>O</h3>
                                            <ul>
                                                {data.O.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.P && (
                                        <div className="box">
                                            <h3>P</h3>
                                            <ul>
                                                {data.P.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.R && (
                                        <div className="box">
                                            <h3>R</h3>
                                            <ul>
                                                {data.R.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.N && (
                                        <div className="box">
                                            <h3>N</h3>
                                            <ul>
                                                {data.N.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="locationItem d-none">
                                    {data?.Q && (
                                        <div className="box">
                                            <h3>Q</h3>
                                            <ul>
                                                {data.Q.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="locationItem">
                                    {data?.S && (
                                        <div className="box">
                                            <h3>S</h3>
                                            <ul>
                                                {data.S.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.T && (
                                        <div className="box">
                                            <h3>T</h3>
                                            <ul>
                                                {data.T.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.U && (
                                        <div className="box">
                                            <h3>U</h3>
                                            <ul>
                                                {data.U.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="locationItem d-none">
                                    {data?.V && (
                                        <div className="box">
                                            <h3>V</h3>
                                            <ul>
                                                {data.V.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="locationItem d-none">
                                    {data?.W && (
                                        <div className="box">
                                            <h3>W</h3>
                                            <ul>
                                                {data.W.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.X && (
                                        <div className="box">
                                            <h3>X</h3>
                                            <ul>
                                                {data.X.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="locationItem d-none">
                                    {data?.Y && (
                                        <div className="box">
                                            <h3>Y</h3>
                                            <ul>
                                                {data.Y.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {data?.Z && (
                                        <div className="box">
                                            <h3>Z</h3>
                                            <ul>
                                                {data.Z.map((city, index) => (
                                                    <li key={index} onClick={() => goToCity(city)}>
                                                        {city?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>

        </>
    );
}


export default PlaceList;