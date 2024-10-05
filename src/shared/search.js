import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './/search.css'
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';


const AppSearch = ({ openSearch, close }) => {
  
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const [name, setName] = useState('');
  const [lstData, setlstData] = useState({});
  const [loading, setLoading] = useState(true);

  const [searches, setSearches] = useState([]);
  const [totalSearches, setTotalSearches] = useState(0);




  const searchPage = () => {
    // Implement the search logic here
    console.log('Search for:', name);
  };

  const selectedItem = (data) => {
    console.log(data.type);
    if (data.type == 'category') {
      const path = `cheapest-car-rentals/category/${data.slug}`;
      const url = currentLanguage === 'ar' ? `/ar/${path}` : `/en/${path}`;
      window.location.href = url;
      localStorage.setItem('activeMenu', 'category');
      localStorage.setItem('activeItem', data.name);
    } else if (data.type === 'brand') {
      const path = `/brands/${data.slug}`;
      const url = currentLanguage === 'ar' ? `/ar/cheapest-car-rentals${path}` : `/en/cheapest-car-rentals${path}`;
      window.location.href = url;
      localStorage.setItem('activeMenu', 'brand');
      localStorage.setItem('activeItem', data.name);
    } else if (data.type === 'car') {
      const path = `/car-details/${data.slug}`;
      const url = currentLanguage === 'ar' ? `/ar${path}` : `/en${path}`;
      window.location.href = url;
    }    // Additional logic for selecting an item
  };

  const goToList = (slug) => {
    // Implement navigation logic here
    const path = `${slug}`;
    const url = currentLanguage === 'ar' ? `/ar/cheapest-car-rentals/category/${path}` : `/en/cheapest-car-rentals/category/${path}`;
    window.location.href = url;
  };

  const fetchCatogry = () => {
    const headers = {
      'X-Localization': currentLanguage, // Example header to specify language
      // Add other headers as needed
    };
    try {
      ApiService.getData(AppEndPoints.home, headers)
        .then((res) => {
          setlstData(res.data.data);
          setLoading(false); // Update loading state to false after data is fetched
          console.log(res.data.data.categories);
        })
        .catch((error) => {
          console.error('Error fetching the about details:', error);
          setLoading(false); // Update loading state to false in case of error
        });
    } catch (error) {
      console.error('Error:', error);
      setLoading(false); // Update loading state to false in case of error
    }
  };

  const changeSearchKey = (value) => {
    const headers = {

      'X-Localization': currentLanguage, // Example header to specify language
      // Add other headers as needed
    };
    ApiService
      .getData(`${AppEndPoints.search}?search=${value}`, headers)
      .then((res) => {
        setSearches(res.data.data);
        setTotalSearches(res.data.data.length);
      })
      .catch((error) => {
        console.error('Error fetching the search results:', error);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setName(value);
    if (value) {
      changeSearchKey(value);
    } else {
      setSearches([]);
      setTotalSearches(0);
    }
  };

  useEffect(() => {
    
    fetchCatogry();
  }, []);

  return (
    <div className="searchSec">
      <div className="container">
        <div className="details row">
          <div className="searchCar">
            <div className="search-group v2">
              <input
                className="search-input"
                value={name}
                onChange={handleInputChange}
                onKeyUp={(e) => e.key === 'Enter' && searchPage()}
                type="text"
                placeholder={t('HOME.SEARCHCARRENTAL')}
              />
              <button
                className="button button-brand-primary button-search"
                onClick={searchPage}
              >
                {t('HOME.SEARCH')}
              </button>
            </div>
            {/* Dropdown for search */}
            {name && (
              <div className="searchDropdown" style={{ cursor: 'pointer' }}>
                {searches.map((item, index) => (
                  <p key={index} onClick={() => selectedItem(item)}>
                    {item?.name}
                  </p>
                ))}
                {totalSearches === 0 && (
                  <p role="listitem" style={{ textAlign: 'center' }}>
                    {t('HOME.NOSEARCH')}
                  </p>
                )}
              </div>
            )}
            {/* End Dropdown for search */}
          </div>
          <div className="selectCars">
          {loading ? (
              <div className="shimmer-loader"></div> // Shimmer loader while data is loading
            ) : (
              lstData?.categories?.map((category, index) => (
                <div
                  key={index}
                  className="car"
                  onClick={() => goToList(category?.slug)}
                >
                  <img src={category?.icon_url} alt="" />
                  <p>{category?.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSearch;
