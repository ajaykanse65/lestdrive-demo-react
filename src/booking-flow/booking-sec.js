import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import range from 'lodash/range';
import { useTranslation, } from "react-i18next";
import active from '../assets/images/product-details/step-active.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import left from '../assets/images/product-details/left.png';
import right from '../assets/images/product-details/right.png';
import thankq from '../assets/images/product-details/thankyou.gif';
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';
import StaticMethod from '../service/staticmethod';
import AuthService from '../service/authService';
import './book.css';

const BookSection = ({ carId, brandName, carName, addOns, carImg, close }) => {
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const [frmData, setFrmData] = useState(new FormData());
    const [selectedPosition, setSelectedPosition] = useState('1'); // Set this to whatever the default should be
    const [currentDate, setCurrentDate] = useState(moment());
    const [currentYear, setCurrentYear] = useState(moment().year());
    const [currentMonth, setCurrentMonth] = useState(moment().month() + 1); // Months in moment.js are 0-indexed
    const [lstYear, setLstYear] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [lstDocuments, setLstDocuments] = useState([]);
    const [blnCalendarModal, setBlnCalendarModal] = useState(true);
    const [blnProfileModal, setBlnProfileModal] = useState(false);
    const [blnUploadModal, setBlnUploadModal] = useState(false);
    const [blnConfirmationModal, setBlnConfirmationModal] = useState(false);
    const [blnSuccessModal, setBlnSuccessModal] = useState(false);
    const [weeks, setWeeks] = useState([]);
    const [selectedStartWeek, setSelectedStartWeek] = useState(moment().startOf('week')); // You can set this dynamically
    const [selectedEndWeek, setSelectedEndWeek] = useState(moment().endOf('week')); // You can set this dynamically
    const [blnStartDateSelected, setBlnStartDateSelected] = useState(false);
    const [startMoment, setStartMoment] = useState(null);
    const [endMoment, setEndMoment] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [blnCalSubmitted, setBlnCalSubmitted] = useState(false);
    const [wrongDate, setWrongDate] = useState(false);
    const [hoverDate, setHoverDate] = useState(null);
    const [dateMessage, setDateMessage] = useState('');
    const [bookingId, setBookingId] = useState(null);
    const [countries, setCountries] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [blnConfirm, setBlnConfirm] = useState(false);
    const [touristOrResident, setTouristOrResident] = useState("RESIDENT");
    const [showEmiratesUpload, setShowEmiratesUpload] = useState(false);
    const [data, setData] = useState([]);

    const [fileStatus, setFileStatus] = useState({
        fileLicenceFrontName: 'Not uploaded',
        fileLicenceBackName: 'Not uploaded',
        fileEmiratesFrontName: 'Not uploaded',
        fileEmiratesBackName: 'Not uploaded',
        filePassportName: 'Not uploaded',
        fileVisaName: 'Not uploaded',
        isDrivingLicenceFrontUploaded: false,
        isDrivingLicenceBackUploaded: false,
        isEmiratesFrontUploaded: false,
        isEmiratesBackUploaded: false,
        isPassportUploaded: false,
        isVisaUploaded: false
    });
    const [blnUploadStart, setBlnUploadStart] = useState(false);

    const [profileData, setProfileData] = useState({
        name: '',
        contactNumber: '',
        email: '',
        address: ''
    });

    const uploadDocumentNext = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            'X-Localization': currentLanguage,
            Authorization: `Bearer ${token}`,
            'Access-Control-Max-Age': '3600',
        };
        try {
            setBlnUploadStart(true);
            ApiService.postData(AppEndPoints.upload_doc, frmData, headers)
                .then((res) => {
                    console.log(res.data.errorCode);
                    if (res.data.errorCode === 0) {
                        setData(res.data.data);
                        // console.log(data);
                        // console.table(res);
                        setBlnUploadStart(false)
                        setBlnUploadModal(false);

                        setBlnConfirmationModal(true);

                        // frmData = new FormData();
                    }
                })

        } catch (error) {
            setBlnUploadStart(false)
            setBlnUploadModal(false);
        }
    }

    const getDocuments = async (type) => {
        const token = localStorage.getItem('token');
        const headers = {
            'X-Localization': currentLanguage,
            Authorization: `Bearer ${token}`,
            'Access-Control-Max-Age': '3600',
        };

        try {
            const response = await ApiService.getData(`${AppEndPoints.get_doc}/${type}`, headers);
            const documents = response.data?.data?.documents || [];

            if (documents.length > 0) {
                setLstDocuments(documents); // Update state

                // Instead of using lstDocuments, use the documents variable directly
                // documents.forEach((element) => {
                //     const updateStatus = (key, uploaded, approved) => {
                //         setFileStatus((prevState) => ({
                //             ...prevState,
                //             [key]: uploaded ? (approved === '1' ? 'Approved' : approved === '0' ? 'Rejected' : 'Verification Pending') : 'Not uploaded',
                //             [`is${key.charAt(0).toUpperCase() + key.slice(1)}Uploaded`]: uploaded
                //         }));
                //     };

                //     switch (element.id) {
                //         case 1:
                //             updateStatus('fileLicenceFrontName', element.is_uploaded, element.is_approved);
                //             break;
                //         case 2:
                //             updateStatus('fileLicenceBackName', element.is_uploaded, element.is_approved);
                //             break;
                //         case 3:
                //             updateStatus('fileEmiratesFrontName', element.is_uploaded, element.is_approved);
                //             break;
                //         case 4:
                //             updateStatus('fileEmiratesBackName', element.is_uploaded, element.is_approved);
                //             break;
                //         case 5:
                //             updateStatus('filePassportName', element.is_uploaded, element.is_approved);
                //             break;
                //         case 6:
                //             updateStatus('fileVisaName', element.is_uploaded, element.is_approved);
                //             break;
                //         case 9:
                //             updateStatus('fileLicenceFrontName', element.is_uploaded, element.is_approved);
                //             break;
                //         case 10:
                //             updateStatus('fileLicenceBackName', element.is_uploaded, element.is_approved);
                //             break;
                //         case 13:
                //             updateStatus('filePassportName', element.is_uploaded, element.is_approved);
                //             break;
                //         case 14:
                //             updateStatus('fileVisaName', element.is_uploaded, element.is_approved);
                //             break;
                //         default:
                //             break;
                //     }
                // });
            } else {
                setLstDocuments([]); // If no documents, fallback to empty array
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };


    const onChangeDoc = (event, doc) => {
        const file = event.target.files[0];
        const updatedDoc = { ...doc, fileName: file.name }; // Create a copy of the doc object
        console.log(updatedDoc);
        frmData.append(updatedDoc.id, file);
        frmData.append('type', selectedPosition);
        frmData.append('booking_id', bookingId);

        setFrmData(frmData);
        // If needed, update lstDocuments here as well if you want to reflect the changes in the state.
    };


    // UseEffect hook to run on component mount
    useEffect(() => {
        getDocuments(selectedPosition);
        fetchCode();
        getProfileData();

        // Set current date
        const now = moment();
        setCurrentDate(now);

        const year = parseInt(now.format('YYYY'));
        setCurrentYear(year);
        setCurrentMonth(parseInt(now.format('MM')));

        // Generate years for the next 20 years
        const yearsArray = [];
        let tempYear = year;
        while (tempYear < year + 20) {
            yearsArray.push(tempYear);
            tempYear++;
        }
        setLstYear(yearsArray);

        // Set the selected date as today's date in DD/MM/YYYY format
        setSelectedDate(now.format('DD/MM/YYYY'));

        // Store bookNowOpened value in sessionStorage
        sessionStorage.setItem('bookNowOpened', '0');

        // Call generateCalendar function
        generateCalendar();
        // console.log(lstDocuments); // Check if this logs correctly

    }, [selectedPosition]); // Empty array means it runs once on component mount, like ngOnInit


    useEffect(() => {
        // console.log('Updated lstDocuments:', lstDocuments); // Log to check updated documents
    }, [lstDocuments]);
    const generateCalendar = (currentMoment) => {
        const dates = fillDates(currentMoment);
        const weeksArray = [];
        while (dates.length > 0) {
            weeksArray.push(dates.splice(0, 7)); // Grouping dates into weeks (7 days each)
        }
        setWeeks(weeksArray); // Store weeks in state
        // console.log(weeksArray); // Add this to check if the calendar data is being generated correctly

    };

    const fillDates = (currentMoment) => {
        const startOfMonth = moment(currentMoment).startOf('month');  // First day of the current month
        const endOfMonth = moment(currentMoment).endOf('month');      // Last day of the current month

        const totalDaysInMonth = endOfMonth.date();                   // Number of days in the current month
        const startDayOfWeek = (startOfMonth.day() + 6) % 7;          // Shift days to make Monday (1) the first day of the week

        const dates = [];

        // Add empty slots for days before the first day of the month
        for (let i = 0; i < startDayOfWeek; i++) {
            dates.push(null); // These are empty slots before the 1st of the month
        }

        // Add the actual days of the current month
        for (let day = 1; day <= totalDaysInMonth; day++) {
            const currentDay = moment(startOfMonth).date(day);        // Create moment object for each day
            dates.push({
                today: isToday(currentDay),
                selected: isSelected(currentDay),
                sameMonth: true,                                      // Always true, since we're only displaying current month's dates
                disabled: currentDay.isBefore(moment(), 'day'),       // Disable days before today
                mDate: currentDay,
                mouseOver: false
            });
        }

        // console.table(dates);                                         // Double-check the generated dates
        return dates;
    };


    const isToday = (date) => {
        return moment().isSame(moment(date), 'day');
    };

    // Utility function to check if the date is in the same month as the current date
    const isSameMonth = (date) => {
        return moment(date).isSame(currentDate, 'month');
    };

    const isSelected = (date) => {
        // Check if the date is between the selectedStartWeek and selectedEndWeek
        return (
            moment(date).isBefore(selectedEndWeek) && moment(date).isAfter(selectedStartWeek) ||
            moment(date?.format('YYYY-MM-DD')).isSame(selectedStartWeek?.format('YYYY-MM-DD')) ||
            moment(date?.format('YYYY-MM-DD')).isSame(selectedEndWeek?.format('YYYY-MM-DD'))
        );
    };

    // Navigate to the previous month
    const prevMonth = () => {
        const newDate = moment(currentDate).subtract(1, 'months');
        setCurrentDate(newDate);
        setCurrentYear(newDate.year());
        setCurrentMonth(newDate.month() + 1); // Months are 0-indexed in moment.js
        generateCalendar(newDate);
    };

    // Navigate to the next month
    const nextMonth = () => {
        const newDate = moment(currentDate).add(1, 'months');
        setCurrentDate(newDate);
        setCurrentYear(newDate.year());
        setCurrentMonth(newDate.month() + 1); // Months are 0-indexed in moment.js
        generateCalendar(newDate);
    };

    const monthChanged = (e) => {
        const newMonth = parseInt(e.target.value);
        const newDate = moment(currentDate).month(newMonth);
        setCurrentDate(newDate);
        generateCalendar(newDate);
    };

    // Function to handle the year change
    const yearChanged = (e) => {
        const newYear = parseInt(e.target.value);
        const newDate = moment(currentDate).year(newYear);
        setCurrentDate(newDate);
        generateCalendar(newDate);
    };
    const lstMonth = [
        { name: 'January', id: 0 },
        { name: 'February', id: 1 },
        { name: 'March', id: 2 },
        { name: 'April', id: 3 },
        { name: 'May', id: 4 },
        { name: 'June', id: 5 },
        { name: 'July', id: 6 },
        { name: 'August', id: 7 },
        { name: 'September', id: 8 },
        { name: 'October', id: 9 },
        { name: 'November', id: 10 },
        { name: 'December', id: 11 }
    ];


    const backToUpload = () => {
        setBlnSuccessModal(false);
        setBlnUploadModal(true);
        setBlnConfirmationModal(false);


    }

    const dateClicked = (data) => {
        if (!data.mDate) return; // Ensure that the date is valid

        setBlnCalSubmitted(false);
        setWrongDate(false);

        if (!blnStartDateSelected) {
            // If no start date is selected, set the start date
            setBlnStartDateSelected(true);
            setStartMoment(data.mDate);
            setStartDate(data.mDate); // Set startDate as moment object
            setEndDate(null);
            setEndMoment(null);
            setFromDate(data.mDate.format('DD MMMM YYYY')); // For UI summary
        } else if (blnStartDateSelected && !endDate) {
            // Set the end date only if the start date is selected
            if (data.mDate.isAfter(startMoment)) {
                setEndMoment(data.mDate);
                setEndDate(data.mDate); // Set endDate as moment object
                setToDate(data.mDate.format('DD MMMM YYYY')); // For UI summary
                setBlnStartDateSelected(false); // Reset selection to false after end date is selected
            } else {
                // Show validation error if the end date is before start date
                setWrongDate(true);
                setDateMessage('End date should be after the start date.');
            }
        }
    };


    const dateHover = (data) => {
        // console.log(data);

        if (data && data.mDate) {
            setHoverDate(data.mDate.date());
        } else {
            console.warn("mDate is undefined in dateHover");
        }
    };


    const calendarNext = async () => {
        setBlnCalSubmitted(true);

        if (startDate && endDate && startDate.format('DD-MM-YYYY').trim() !== '' && endDate.format('DD-MM-YYYY').trim() !== '') {
            setBlnConfirm(true);
            const data = {
                car_id: carId,
                from: startDate.format('DD-MM-YYYY'), // Convert moment to string
                to: endDate.format('DD-MM-YYYY'),     // Convert moment to string
                add_ons: addOns,
            };
            // console.log(data);
            const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
            // console.log(token);
            const headers = {
                'X-Localization': currentLanguage, // Example header to specify language
                Authorization: `Bearer ${token}`, // Example header to specify language
                'Access-Control-Max-Age': '3600',
                // Add other headers as needed
            };

            // console.log(data);
            // console.log(headers);
            setBlnCalSubmitted(true);
            // setBlnCalendarModal(false);
            // setBlnProfileModal(true);
            try {
                // const response = await fetch('YOUR_API_ENDPOINT_HERE', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(data),
                // });

                // const response = ApiService.postData(AppEndPoints.booking, data, headers)
                // console.log(response);
                // const res = await response.json();
                ApiService.postData(AppEndPoints.booking, data, headers)
                    .then((res) => {
                        // console.log(res);
                        if (res.data.errorCode === 0) {
                            setBookingId(res.data.data.booking_id);
                            setBlnCalendarModal(false);


                            // setBlnUploadModal(true);
                            setBlnProfileModal(true);
                            // setBlnConfirmationModal(false);
                            setBlnSuccessModal(false);
                            setWrongDate(false);
                            setBlnCalSubmitted(true);
                            setBlnCalendarModal(false);
                            setBlnProfileModal(true);
                            setBlnConfirm(false);
                        } else {
                            setWrongDate(true);
                            setBlnConfirm(false);
                            if (res.message === 'The to must be a date after or equal to from.') {
                                setDateMessage('End date should be greater than start date.');
                            }
                        }
                    })


            } catch (error) {
                console.error('Error during API request:', error);
                setWrongDate(true);
                setBlnConfirm(false);
                // setDateMessage('Something went wrong, please try again.');
            }
        } else {
            // Handle cases when dates are not selected
            return;
        }
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };
    // const handleProfileSubmit = (e) => {
    //     e.preventDefault();

    //     // Example: Basic validation (You can add more)
    //     if (!profileData.name || !profileData.contactNumber || !profileData.email) {
    //         toast.error('Please fill in all required fields');
    //         return;
    //     }

    //     // If you need to submit the data to an API, you can do it here
    //     // Example: ApiService.post('/profile', profileData);

    //     // Move to the next step after successful submission
    //     // handleProfileNext();
    // };
    // Add this method to your component

    const validateForm = () => {
        const errors = {};
        if (!profileData.name.trim()) errors.name = 'Name is required';
        if (!profileData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!profileData.contactNumber.trim()) errors.phone = 'Phone number is required';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setSubmitted(true);
        const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
        // console.log(token);
        const headers = {
            'X-Localization': currentLanguage, // Example header to specify language
            Authorization: `Bearer ${token}`, // Example header to specify language
            'Access-Control-Max-Age': '3600',
            // Add other headers as needed
        };
        if (!validateForm()) {
            return;
        }
        const countryResponse = await AuthService.countryCode();
        // Perform validation for required fields
        if (!profileData.name || !profileData.contactNumber || !profileData.email) {
            // Show an error or handle the validation in your preferred way
            alert(t('PROFILE.REQUIRED_FIELDS')); // You can customize the message here
            return;


        } else {
            setBlnConfirm(true);
            const storedProfile = JSON.parse(localStorage.getItem('profileData'));
            const countryId = countryResponse.data.data.find(
                (e) => e.phone_code === storedProfile.data.country_code
            )?.id || '229';
            const profileDateUpdate = {
                name: profileData.name,
                email: profileData.email,
                phone: profileData.contactNumber,
                address: profileData.address,
                country_id: countryId
            }
            ApiService.postData(AppEndPoints.profile_update, profileDateUpdate, headers)
                .then((res) => {
                    // console.log(res);
                    if (res.data.errorCode === 0) {
                        getDocuments(selectedPosition);
                        setBlnUploadModal(true);
                        setBlnProfileModal(false);
                        setBlnConfirm(false);
                    }
                })
        }

        // If validation passes, proceed with form submission logic
        // For example, sending the data to an API
        console.log('Form submitted:', profileData);

        // You can add your API request or further actions here
        // Example: sendProfileData(profileData);
    };

    const fetchCode = async () => {
        try {
            const countryResponse = await AuthService.countryCode();
            if (countryResponse.data.errorCode === 0) {
                setCountries(countryResponse.data.data);
            }
        } catch (error) {

        }
    }

    const getProfileData = async () => {
        try {
            const countryResponse = await AuthService.countryCode();
            if (countryResponse.data.errorCode === 0) {
                setCountries(countryResponse.data.data);
            }

            const storedProfile = JSON.parse(localStorage.getItem('profileData'));
            if (storedProfile) {
                const countryId = countryResponse.data.data.find(
                    (e) => e.phone_code === storedProfile.data.country_code
                )?.id || '229';

                // console.log(storedProfile.data.phone);
                // console.log(storedProfile.data.country_code);
                setProfileData({
                    name: storedProfile.data.name,
                    email: storedProfile.data.email,
                    country_id: countryId,
                    contactNumber: storedProfile.data.phone,
                    address: storedProfile.data.address
                });
            }
        } catch (error) {

        }
    }

    const handleProfileCancel = () => {
        setBlnProfileModal(false); // Close the Profile section
        setBlnCalendarModal(true); // Reopen the Calendar section
    };

    const handleUplodCancel = () => {
        setBlnUploadModal(false);
        setBlnProfileModal(true);
    }

    const handleDateCancel = () => {
        // setBlnProfileModal(false); // Close the Profile section
        // setBlnCalendarModal(false); // Reopen the Calendar section
        close();
    };

    const selectedTypeChange = (event, type, label) => {
        console.log(type);
        setSelectedPosition(type);
        // getDocuments(type);

        // Add any additional logic here if needed
    };

    const closeModal = () =>{
        close();
    }


    const confirmationNext = async (status) => {
        const token = localStorage.getItem('token');
        const data = {
            booking_id: bookingId,
            status: status
        }
        const headers = {
            'X-Localization': currentLanguage,
            Authorization: `Bearer ${token}`,
            'Access-Control-Max-Age': '3600',
        };
        try {
            setBlnConfirm(true);
            ApiService.postData(AppEndPoints.confirm_booking, data, headers)
                .then((res) => {
                    console.log(res);
                    setBlnConfirm(false);
                    if(res.data.data.errorCode === 0){
                        
                        setBlnCalendarModal(false);
                        setBlnProfileModal(false);
                        setBlnUploadModal(false);
                        setBlnConfirmationModal(false);
                        setBlnSuccessModal(true);
                    }else{
                        setBlnCalendarModal(false);
                        setBlnProfileModal(false);
                        setBlnUploadModal(false);
                        setBlnConfirmationModal(false);
                        setBlnSuccessModal(true);
                    }
                })
        } catch (error) {
            setBlnConfirm(false);
        }
    }

    return (
        <>
            <div className={`language-${currentLanguage}`}>
                <div class="booking-sec">

                    {/* Progress Steps */}
                    <div className="container">
                        {!blnSuccessModal && (
                            <div className="progress-bar">
                            {/* Step 1 */}
                            <div className="step">
                                <div
                                    className={`bullet ${blnCalendarModal ? 'active' : ''} 
                ${blnProfileModal || blnUploadModal || blnConfirmationModal || blnSuccessModal ? 'activated' : ''}`}
                                >
                                    <span>01</span>
                                </div>
                                <div
                                    className={`check ${blnCalendarModal || blnProfileModal || blnUploadModal || blnConfirmationModal || blnSuccessModal ? 'active' : ''}`}
                                >
                                    <img src={active} alt="" />
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="step">
                                <div
                                    className={`bullet ${blnProfileModal ? 'active' : ''} 
                ${blnUploadModal || blnConfirmationModal || blnSuccessModal ? 'activated' : ''}`}
                                >
                                    <span>02</span>
                                </div>
                                <div
                                    className={`check ${blnProfileModal || blnUploadModal || blnConfirmationModal || blnSuccessModal ? 'active' : ''}`}
                                >
                                    <img src={active} alt="" />
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="step">
                                <div
                                    className={`bullet ${blnUploadModal ? 'active' : ''} 
                ${blnConfirmationModal || blnSuccessModal ? 'activated' : ''}`}
                                >
                                    <span>03</span>
                                </div>
                                <div
                                    className={`check ${blnUploadModal || blnConfirmationModal || blnSuccessModal ? 'active' : ''}`}
                                >
                                    <img src={active} alt="" />
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="step">
                                <div
                                    className={`bullet ${blnConfirmationModal ? 'active' : ''} 
                ${blnSuccessModal ? 'activated' : ''}`}
                                >
                                    <span>04</span>
                                </div>
                                <div
                                    className={`check ${blnConfirmationModal || blnSuccessModal ? 'active' : ''}`}
                                >
                                    <img src={active} alt="" />
                                </div>
                            </div>
                        </div>
                        ) }
                        
                    </div>
                    {/*    <!-------End Progress Steps---------->*/}

                    {/*    <!-------Choose Date section---------->*/}
                    {
                        blnCalendarModal && (
                            <div className='details'>
                                <div class="container">
                                    <h4 style={{ textAlign: 'start' }} class="choose-h4">{t('BOOKNOW.CHOOSEDATES')}</h4>
                                </div>

                                <div className="leftSec">
                                    {/* Calendar */}
                                    <div className="calendar">
                                        <div className="month">
                                            <a onClick={prevMonth} className="nav">
                                                <img src={left} alt="" />
                                            </a>

                                            <div className="selectDate">
                                                <div className="selectMonth">
                                                    <select
                                                        className="form-select"
                                                        aria-label="Default select example"
                                                        //onChange={monthChanged}
                                                        onChange={monthChanged}
                                                    >
                                                        {lstMonth.map((item, index) => (
                                                            <option key={index} value={item.id} selected={item.id === currentMonth - 1}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                        {/* {lstMonth.map((month, index) => (
                                                            <option key={index} value={month.id}>
                                                                {month.name}
                                                            </option>
                                                        ))} */}
                                                    </select>
                                                </div>
                                                <div className="selectYear">
                                                    <select
                                                        className="form-select"
                                                        aria-label="Default select example"
                                                        // onChange={yearChanged}
                                                        onChange={yearChanged}
                                                    >
                                                        {lstYear.map((year) => (
                                                            <option key={year} value={year}>{year}</option>
                                                        ))}
                                                        {/* {[...Array(100)].map((_, i) => (
                                                            <option key={i} value={moment().year() - 50 + i}>
                                                                {moment().year() - 50 + i}
                                                            </option>
                                                        ))} */}
                                                    </select>
                                                </div>
                                            </div>

                                            <a onClick={nextMonth} className="nav">
                                                <img src={right} alt="" />
                                            </a>
                                        </div>
                                        <div className="days">
                                            <span>{t('BOOKNOW.MON')}</span>
                                            <span>{t('BOOKNOW.TUE')}</span>
                                            <span>{t('BOOKNOW.WED')}</span>
                                            <span>{t('BOOKNOW.THU')}</span>
                                            <span>{t('BOOKNOW.FRI')}</span>
                                            <span>{t('BOOKNOW.SAT')}</span>
                                            <span>{t('BOOKNOW.SUN')}</span>
                                            {/* {weeks.map((week, index) => (
                                                <button key={index} className={week.today ? 'today' : ''}>
                                                    {week.mDate ? week.mDate.date() : ''}
                                                </button>
                                            ))} */}
                                        </div>
                                        <div className="dates">
                                            {/* {weeks.map((week, index) => (
                                                week.map((day, dayIndex) => day ? (
                                                    <button
                                                        key={`${index}-${dayIndex}`}
                                                        onClick={() => dateClicked(day)}
                                                        onMouseOver={() => dateHover(day)}
                                                        disabled={day.disabled}
                                                        className={`
                    ${day.today ? 'today' : ''} 
                    ${day.disabled ? 'disabled' : ''} 
                `}
                                                    >
                                                        <time>{day.mDate ? day.mDate.date() : ''}</time>
                                                    </button>
                                                ) : (
                                                    // Empty slot for days before the start of the month
                                                    <div key={`${index}-${dayIndex}`} className="empty-slot"></div>
                                                ))
                                            ))} */}
                                            {weeks.map((week, weekIndex) => (
                                                week.map((day, dayIndex) => day ? (
                                                    <button
                                                        key={`${weekIndex}-${dayIndex}`}
                                                        onClick={() => dateClicked(day)}
                                                        onMouseOver={() => dateHover(day)}
                                                        disabled={day.disabled}
                                                        className={`
                    ${day.today ? 'today' : ''} 
                    ${day.disabled ? 'disabled' : ''} 
                    ${(startDate && endDate && day.mDate.isBetween(startDate, endDate, null, '[]')) ? 'dateRange' : ''}
                    ${day.mDate && day.mDate.isSame(startDate, 'day') ? 'startDate' : ''}
                    ${day.mDate && day.mDate.isSame(endDate, 'day') ? 'endDate' : ''}
                `}
                                                    >
                                                        <time>{day.mDate ? day.mDate.date() : ''}</time>
                                                    </button>
                                                ) : (
                                                    // Empty slot for days before the start of the month
                                                    <div key={`${weekIndex}-${dayIndex}`} className="empty-slot"></div>
                                                ))
                                            ))}
                                        </div>



                                        {/* {weeks.map((week, index) => (
                                                <button
                                                    key={index}
                                                    disabled={week.disabled && !week.today}
                                                    onClick={() => dateClicked(week)}
                                                    onMouseOver={() => dateHover(week)}
                                                    className={`${week.today && week.mDate.month() === currentDate.month() ? 'today' : ''} 
                          ${(blnStartDateSelected && startMoment < week.mDate && hoverDate > week.mDate && week.sameMonth) ||
                                                            (startMoment < week.mDate && endMoment > week.mDate && week.sameMonth) ? 'dateHover' : ''} 
                          ${startDate === week.mDate.format('DD-MM-YYYY') || endDate === week.mDate.format('DD-MM-YYYY') ? 'startAndEndDate' : ''} 
                          ${week.disabled && !week.today ? 'disabled' : ''}`}
                                                >
                                                    <time style={{ display: week.sameMonth ? 'block' : 'none' }}>{week.mDate.date()}</time>
                                                </button> 
                                            ))} */}
                                        {/* {weeks.map((week, index) => (
                                                <button
                                                    key={index}
                                                    disabled={week.disabled && !week.today}
                                                    onClick={() => dateClicked(week)}
                                                    onMouseOver={() => dateHover(week)}
                                                    className={`
                ${week.today && week.mDate && week.mDate.month() === currentDate.month() ? 'today' : ''} 
                ${week.mDate && week.mDate.month() === currentDate.month() ? '' : 'disabled'}
            `}
                                                >
                                                    <time style={{ display: week.sameMonth ? 'block' : 'none' }}>
                                                        {week.mDate ? week.mDate.date() : ''}
                                                    </time>
                                                </button>
                                            ))} */}



                                    </div>
                                    {/* End Calendar */}
                                </div>


                                <div className="rightSec" style={{ textAlign: 'start' }}>
                                    <h4>{/* Replace with your translation method */}{t('BOOKNOW.SUMMARY')}</h4>

                                    <div className="box-combonents">
                                        <div className="car-image">
                                            <img
                                                style={{

                                                    objectFit: 'contain' /* Change to 'contain' if you want to fit the image inside the container */
                                                }}
                                                src={carImg} alt="" className="img-fluid" />
                                        </div>

                                        <div className="car-name">
                                            <h5>{brandName}</h5>
                                            <h3>{carName}</h3>
                                        </div>
                                    </div>

                                    {/* Start and End date */}

                                    <div className="start-end-dates" style={{ position: 'relative' }}>
                                        <div className="start-date">
                                            <p>{/* Replace with your translation method */}{t('BOOKING.STARTDATE')}</p>
                                            <input
                                                type="tel"
                                                id="startdate"
                                                value={startDate ? startDate.format('DD-MM-YYYY') : ''}  // Fallback to an empty string if startDate is null
                                                name="startdate"
                                                readOnly
                                                placeholder={t('PLACEHOLDER.ADDDATE')}
                                                required
                                            />
                                        </div>
                                        {!startDate && blnCalSubmitted && (
                                            <span style={{ position: 'absolute', bottom: '-20px', color: 'red', fontSize: '10px' }}>
                                                {/* Replace with your translation method */}{t('VALIDATION.STARTDATEREQUIRED')}
                                            </span>
                                        )}
                                        <div className="end-date">
                                            <p>{/* Replace with your translation method */}{t('BOOKING.ENDDATE')}</p>
                                            <input
                                                type="tel"
                                                id="enddate"
                                                value={endDate ? endDate.format('DD-MM-YYYY') : ''}  // Fallback to an empty string if endDate is null
                                                name="enddate"
                                                readOnly
                                                placeholder={t('PLACEHOLDER.ADDDATE')}
                                                required
                                            />
                                        </div>
                                        {!endDate && blnCalSubmitted && (
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '-20px',
                                                    right: '12px',
                                                    color: 'red',
                                                    fontSize: '10px',
                                                }}
                                            >
                                                {/* Replace with your translation method */}{t('VALIDATION.ENDATEISREDUIRED')}
                                            </span>
                                        )}
                                        {wrongDate && (
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '-20px',
                                                    right: '12px',
                                                    color: 'red',
                                                    fontSize: '10px',
                                                }}
                                            >
                                                {dateMessage}
                                            </span>
                                        )}
                                    </div>

                                    {/* End Start and End date Section */}

                                    {/* Cancel - Next Button */}

                                    <div className="nex-prev">
                                        <a
                                            onClick={handleDateCancel}
                                            className="cancel">
                                            {/* Replace with your translation method */}{t('BOOKNOW.CANCEL')}
                                        </a>

                                        <a className={`next ${blnConfirm ? 'btn-loading' : ''}`}

                                            onClick={calendarNext}
                                        >
                                            {/* Replace with your translation method */}{t('BOOKNOW.NEXT')}
                                        </a>
                                    </div>

                                    {/* End Cancel - Next Button */}
                                </div>


                            </div>
                        )

                    }
                    {/*    <!-------End Choose Date section---------->*/}

                    {/*    <!-------Profile section---------->*/}
                    {blnProfileModal && (
                        <div className="profile-section">
                            <div className="container">
                                <h4>{t('BOOKNOW.CHOOSEDATES')}</h4>
                                {/* <h4>Fill Information</h4> */}
                                <form onSubmit={handleProfileSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">{t('PROFILE.FULLNAME')}*</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleProfileChange}
                                            placeholder={t('PROFILE.ENTERYOURNAME')}
                                            required
                                        />
                                        {errors.name && (submitted) && (
                                            <p style={{ color: '#c41229', fontSize: '12px', marginTop: '10px', textAlign: 'left' }}>
                                                {t("VALIDATION.NAMEREQUIRED")}
                                            </p>
                                        )}
                                    </div>

                                    {/* <div className="form-group">
                    <label htmlFor="contactNumber">{t('PROFILE.CONTACTNUMBER')}</label>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={profileData.contactNumber}
                        onChange={handleProfileChange}
                        placeholder={t('PROFILE.ENTERCONTACTNUMBER')}
                        required

                    />
                </div> */}
                                    <div className="form-group posRelative" style={{ textAlign: 'start' }}>
                                        <label htmlFor="InputContact1">{t('PROFILE.CONTACTNUMBER')}*</label>
                                        <div className="d-flex">
                                            <select
                                                name="country_id"
                                                id="country-code"
                                                className="country-code-select"
                                                value={profileData.country_id}
                                                onChange={handleProfileChange}
                                                style={{ marginRight: '10px' }}  // Add horizontal margin
                                            >
                                                {/* Example options, replace with dynamic data */}
                                                {countries.map((country) => (
                                                    <option key={country.id} value={country.id} selected={country.id === 229}>
                                                        {country.phone_code}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                name="contactNumber"
                                                id="InputContact1"
                                                className="form-control"
                                                value={profileData.contactNumber}
                                                onChange={handleProfileChange}
                                                placeholder={t('PROFILE.ENTERCONTACTNUMBER')}
                                            />
                                        </div>
                                        {errors.phone && (submitted) && (
                                            <p style={{ color: '#c41229', fontSize: '12px', marginTop: '10px', textAlign: 'left' }}>
                                                {t("PROFILE.VALIDPHONENUMBER")}
                                            </p>
                                        )}
                                        {/* Optional validation message */}
                                        {/* {blnSubmitted && (!profileData.country_id || !profileData.contactNumber) && (
                                            <span className="validationMsg">
                                                {t('PROFILE.COUNTRYCODEANDPHNNUMBER')}
                                            </span>
                                        )} */}
                                    </div>



                                    <div className="form-group">
                                        <label htmlFor="email">{t('CONTACT.EMAIL')}*</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={profileData.email}
                                            placeholder={t('PROFILE.EMAIL')}
                                            onChange={handleProfileChange}
                                            required
                                        />
                                        {errors.email && (submitted) && (
                                            <p style={{ color: '#c41229', fontSize: '12px', marginTop: '10px', textAlign: 'left' }}>
                                                {t("VALIDATION.INVALIDEMAIL")}
                                            </p>
                                        )}
                                    </div>

                                    {/* {mailExistErrorMsg && (
                                            <p style={{ color: '#c41229', fontSize: '12px', marginTop: '10px', textAlign: 'left' }}>
                                                {t("PROFILE.EMAILALREADYEXISTS")}!
                                            </p>
                                        )} */}
                                    <div className="form-group">
                                        <label htmlFor="address">{t('PROFILE.ADDRESS')}</label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={profileData.address}
                                            onChange={handleProfileChange}
                                        />
                                    </div>
                                    {/* <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        {t('PROFILE.SAVE')}
                    </button>
                </div> */}
                                </form>
                                <div className="nex-prev">
                                    <a className="cancel"
                                        onClick={handleProfileCancel}
                                    >
                                        {t('BOOKNOW.BACK')}
                                    </a>
                                    <a className={`next ${blnConfirm ? 'btn-loading' : ''}`}
                                        onClick={handleProfileSubmit}
                                    >
                                        {t('BOOKNOW.NEXT')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/*    <!-------End Profile section---------->*/}


                    {/*  <!-----Uplaod document Section---->*/}

                    {blnUploadModal && (
                        <div className="upload-document" style={{ textAlign: 'start' }}>
                            <div className="selectType">
                                <h5>{t('VERIFICATION.RSIDENTORNOT')}</h5>
                                <div className="selectHere">
                                    <input
                                        type="radio"
                                        id="RESIDENT"
                                        name="fav_type"
                                        value="RESIDENT"
                                        onClick={(e) => selectedTypeChange(e, '1', 'RESIDENT')}
                                        checked={selectedPosition === '1'}
                                    />
                                    <label htmlFor="resident">{t('VERIFICATION.RESIDENT')}</label>

                                    <input
                                        type="radio"
                                        id="TOURISTS"
                                        name="fav_type"
                                        value="TOURISTS"
                                        onClick={(e) => selectedTypeChange(e, '2', 'TOURISTS')}
                                        checked={selectedPosition === '2'}
                                    />
                                    <label htmlFor="tourist">{t('VERIFICATION.TOURIST')}</label>
                                </div>
                            </div>

                            <h5>{t('BOOKNOW.UPLOADDOCUMENTS')}</h5>

                            <div className="boxDocuments">
                                <div className="drivers">
                                    {lstDocuments.map((doc, index) => (

                                        <div className="box" key={index}>
                                            <p>{doc.name}</p>



                                            {!doc.fileName && doc.is_approved === '2' && (
                                                <span style={{ fontSize: '10px' }}>{t('BOOKING.VERIFICATIONPENDING')}</span>
                                            )}
                                            {!doc.fileName && doc.is_approved === '1' && (

                                                <span style={{ fontSize: '10px' }}>{t('BOOKING.APPROVED')}</span>
                                            )}
                                            {!doc.fileName && doc.is_approved === '0' && (
                                                <span style={{ fontSize: '10px' }}>{t('BOOKING.REJECTED')}</span>
                                            )}
                                            {!doc.fileName && doc.is_approved === null && (
                                                <span style={{ fontSize: '10px' }}>{t('VERIFICATION.NOTUPLOADED')}</span>
                                            )}

                                            {doc.fileName && (
                                                <span style={{ fontSize: '10px' }}>{doc.fileName}</span>
                                            )}

                                            {doc.is_uploaded === false && (
                                                <input
                                                    type="file"
                                                    name="UploadyourCVResume"
                                                    size="40"
                                                    className="form-control"
                                                    id={`file-${index}`}
                                                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                                    aria-required="true"
                                                    aria-invalid="false"
                                                    onChange={(e) => onChangeDoc(e, doc)}
                                                    style={{ display: doc.is_uploaded ? 'none' : 'block' }}
                                                />
                                            )}

                                            {doc.is_uploaded && (
                                                <input
                                                    type="file"
                                                    name="UploadyourCVResume"
                                                    size="40"
                                                    className="form-control changeDoc"
                                                    id={`file-${index}`}
                                                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                                    aria-required="true"
                                                    aria-invalid="false"
                                                    onChange={(e) => onChangeDoc(e, doc)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="nex-prev">
                                <a
                                    onClick={handleUplodCancel}
                                    className="cancel">
                                    {t('BOOKNOW.BACK')}
                                </a>
                                <a
                                    onClick={uploadDocumentNext}
                                    className={`next ${blnUploadStart ? 'btn-loading' : ''}`}
                                >
                                    {t('BOOKNOW.NEXT')}
                                </a>
                            </div>
                        </div>

                    )}


                    {blnConfirmationModal && (
                        <div className="booking-confirmation" >
                            <h5>{t('BOOKNOW.BOOKINGCONFIRMATIONS')}</h5>
                            <div className="contents">
                                <div className="leftSec">
                                    <div className="car-image">
                                        <img src={carImg} alt="" className="img-fluid" />
                                    </div>

                                    <div className="car-name">
                                        <h5>{brandName}</h5>
                                        <h3>{brandName} {carName}</h3>

                                        <div className="start-end-dates-sec">
                                            <div className="start-date">
                                                <p>{t('BOOKING.STARTDATE')}</p>
                                                <h2>{fromDate}</h2>
                                            </div>
                                            <div className="end-date">
                                                <p>{t('BOOKING.ENDDATE')}</p>
                                                <h2>{toDate}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rightSec" style={{ textAlign: 'start', marginRight: '20px' }}>
                                    <div className="confirm-steps">
                                        <div className="left-side">
                                            <ul className="progress-bar-steps desktop-screen">
                                                <li className={data.is_submited ? 'active' : ''}>
                                                    {t('BOOKING.DOCUMENTSSUBMITTED')}
                                                </li>
                                                <li>{t('BOOKING.BOOKINGREQUESTED')}</li>
                                                {!data.is_verified && (
                                                    <li>{t('BOOKING.VERIFICATIONPENDING')}</li>
                                                )}
                                                {data.is_verified && (
                                                    <li className={data.is_verified ? 'active' : ''}>
                                                        {t('BOOKING.DOCUMENTSVERIFIED')}
                                                    </li>
                                                )}
                                                <li>{t('BOOKING.PENDING')}</li>
                                            </ul>
                                        </div>

                                        {/* Accordion for mobile */}
                                        <div className="accordion mobile-screen" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button
                                                        className="accordion-button"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseOne"
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        {t('BOOKING.STATUS')}
                                                    </button>
                                                </h2>
                                                <div
                                                    id="collapseOne"
                                                    className="accordion-collapse collapse show"
                                                    aria-labelledby="headingOne"
                                                    data-bs-parent="#accordionExample"
                                                >
                                                    <div className="left-side">
                                                        <ul className="progress-bar-steps">
                                                            <li className={data.is_submited ? 'active' : ''}>
                                                                {t('BOOKING.DOCUMENTSSUBMITTED')}
                                                                {data.is_submited}
                                                            </li>
                                                            <li>{t('BOOKING.BOOKINGREQUESTED')}</li>
                                                            {!data.is_verified && (
                                                                <li>{t('BOOKING.VERIFICATIONPENDING')}</li>
                                                            )}
                                                            {data.is_verified && (
                                                                <li className={data.is_verified ? 'active' : ''}>
                                                                    {t('BOOKING.DOCUMENTSVERIFIED')}
                                                                </li>
                                                            )}
                                                            <li>{t('BOOKING.PENDING')}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End Accordion for mobile */}
                                    </div>
                                </div>
                            </div>

                            {/* {modalNote != null && (
                            <div className="note-point">
                                <h4 className="note">{t('BOOKNOW.NOTE')}:</h4>
                                <p>{modalNote}</p>
                            </div>
                        )} */}

                            <div className="nex-prev">
                                <a onClick={backToUpload} className="cancel">
                                    {t('BOOKNOW.BACK')}
                                </a>
                                <a
                                    onClick={() => confirmationNext(1)}
                                    className={`next ${blnConfirm ? 'btn-loading' : ''}`}
                                >
                                    {t('BOOKNOW.REQUESTBOOKING')}
                                </a>
                            </div>
                        </div>
                    )}


                    {/*<!--------Thank You Section------>*/}

                    {blnSuccessModal && (
                        <div className="thank-you">
                            <div className="box-details">
                                <img src={thankq} alt="" />
                                <p style={{textAlign: 'center', }}>
                                    {t('BOOKNOW.DESCRIPTION')}
                                </p>
                                <div className="thank-you-btn">
                                    <a onClick={closeModal}>
                                        {t('BOOKNOW.THANKYOU')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/*<!--------End Thank You Section------>*/}



                    {/*  <!-----End Uplaod document Section---->*/}

                </div>
            </div></>
    )
}

export default BookSection;