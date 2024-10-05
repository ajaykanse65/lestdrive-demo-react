import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, } from "react-i18next";
import ApiService from '../service/ApiService';
import AppEndPoints from '../config/AppEndPoints';
import { ToastContainer, toast } from 'react-toastify';

// import './input.css';


const MyDocuments = () => {
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const [selectedType, setSelectedType] = useState('1');
    const [lstDocuments, setLstDocuments] = useState([]);
    const [showEmiratesUpload, setShowEmiratesUpload] = useState(false);
    const [frmData, setFrmData] = useState(new FormData());
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
    const [fileDetails, setFileDetails] = useState(null);

    const selectedTypeChange = (event, type, label) => {
        setSelectedType(type);
        getDocuments(type);

        // Add any additional logic here if needed
    };
    const getDocuments = async (type) => {
        const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
        // console.log(token);
        const headers = {
          'X-Localization': currentLanguage, // Example header to specify language
          Authorization: `Bearer ${token}`, // Example header to specify language
          'Access-Control-Max-Age': '3600',
          // Add other headers as needed
        };
        try {
            const response = await ApiService.getData(`${AppEndPoints.get_doc}/${type}`, headers);
            const documents = response.data.data.documents;
            console.log(response.data.data.documents);
            setLstDocuments(documents);

            if (type === 1) {
                setShowEmiratesUpload(true);
            } else {
                setShowEmiratesUpload(false);
            }

            documents.forEach((element) => {
                const updateStatus = (key, uploaded, approved) => {
                    setFileStatus((prevState) => ({
                        ...prevState,
                        [key]: uploaded ? (approved === '1' ? 'Approved' : approved === '0' ? 'Rejected' : 'Verification Pending') : 'Not uploaded',
                        [`is${key.charAt(0).toUpperCase() + key.slice(1)}Uploaded`]: uploaded
                    }));
                };

                switch (element.id) {
                    case 1:
                        updateStatus('fileLicenceFrontName', element.is_uploaded, element.is_approved);
                        break;
                    case 2:
                        updateStatus('fileLicenceBackName', element.is_uploaded, element.is_approved);
                        break;
                    case 3:
                        updateStatus('fileEmiratesFrontName', element.is_uploaded, element.is_approved);
                        break;
                    case 4:
                        updateStatus('fileEmiratesBackName', element.is_uploaded, element.is_approved);
                        break;
                    case 5:
                        updateStatus('filePassportName', element.is_uploaded, element.is_approved);
                        break;
                    case 6:
                        updateStatus('fileVisaName', element.is_uploaded, element.is_approved);
                        break;
                    case 9:
                        updateStatus('fileLicenceFrontName', element.is_uploaded, element.is_approved);
                        break;
                    case 10:
                        updateStatus('fileLicenceBackName', element.is_uploaded, element.is_approved);
                        break;
                    case 13:
                        updateStatus('filePassportName', element.is_uploaded, element.is_approved);
                        break;
                    case 14:
                        updateStatus('fileVisaName', element.is_uploaded, element.is_approved);
                        break;
                    default:
                        break;
                }
            });
        } catch (error) {
            console.error(error);
        }
    };


    const onChange = (event, doc) => {
        const file = event.target.files[0];
        doc.fileName = file.name;
        frmData.append(doc.id, file);
        setFrmData(frmData);
      };

      const uploadDoc = () => {
        frmData.append('type', selectedType);
        ApiService.postData(AppEndPoints.upload_document).then((res) => {
            if (res.data.errorCode === 0) {
              toast.success(res.data.message);
              getDocuments(selectedType);
              setFrmData(new FormData());
              window.location.reload();
            //   setLstDocuments((prevDocs) => prevDocs.map((doc) => ({ ...doc, fileName: null })));
            }
          });

      }

    useEffect(() => {
        window.scrollTo(0, 0);
        

        getDocuments(selectedType);
    }, [selectedType]);

    return (
        <>
            <div className={`language-${currentLanguage}`}>
                <div class="my-documents">
                    <div class="upload-document">
                        <div className="selectUpload" style={{ textAlign: 'start' }}>
                            <h5>{t('VERIFICATION.RSIDENTORNOT')}?</h5>
                            <div className="selectHere">
                                <input
                                    type="radio"
                                    id="residents"
                                    value="residents"
                                    onClick={(e) => selectedTypeChange(e, '1', 'resident')}
                                    checked={selectedType === '1'}
                                />

                                <label htmlFor="residents">{t('VERIFICATION.RESIDENT')}</label>

                                <input
                                    type="radio"
                                    id="tourists"
                                    name="fav_types"
                                    value="tourists"
                                    onClick={(e) => selectedTypeChange(e, '1', 'resident')}
                                    checked={selectedType === '2'}
                                />

                                <label htmlFor="tourists">{t('VERIFICATION.TOURIST')}</label>
                            </div>
                        </div>
                 

                    <h5 style={{ textAlign: 'start' }}>{t('VERIFICATION.VERIFICATIONDOCS')}</h5>


                    <div className="drivers">

                        {/*-----uncomment below code after API configuration*/}
                        {lstDocuments.map((doc, index) => (
                            <div className="box" key={index} style={{textAlign:'start'}}>
                                <p>{doc.name}</p>
                                {!doc.fileName && doc.is_approved === '2' && (
                                    <span style={{ fontSize: '10px' }}>
                                        {t('BOOKING.VERIFICATIONPENDING')}
                                    </span>
                                )}
                                {!doc.fileName && doc.is_approved === '1' && (
                                    <span style={{ fontSize: '10px' }}>
                                        {t('VERIFICATION.APPROVED')}
                                    </span>
                                )}
                                {!doc.fileName && doc.is_approved === '0' && (
                                    <span style={{ fontSize: '10px' }}>
                                        {t('VERIFICATION.REJECTED')}
                                    </span>
                                )}
                                {!doc.fileName && doc.is_approved === null && (
                                    <span style={{ fontSize: '10px' }}>
                                        {t('VERIFICATION.NOTUPLOADED')}
                                    </span>
                                )}
                                {doc.fileName && (
                                    <span style={{ fontSize: '10px' }}>{doc.fileName}</span>
                                )}
                                {!doc.is_uploaded && (
                                    <input
                                        type="file"
                                        name="UploadyourCVResume"
                                        size="40"
                                        className="form-control"
                                        id="file"
                                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                        aria-required="true"
                                        aria-invalid="false"
                                        onChange={(e) => onChange(e, doc)}
                                    />
                                )}
                                {doc.is_uploaded && (
                                    <input
                                        type="file"
                                        name="UploadyourCVResume"
                                        size="40"
                                        className="form-control changeDoc"
                                        id="file"
                                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                        aria-required="true"
                                        aria-invalid="false"
                                        onChange={(e) => onChange(e, doc)}
                                    />
                                )}
                            </div>
                        ))}
                        {/*-----End uncomment below code after API configuration*/}
                         {/* <div className="box" 
                         key={index}
                         >
                                <p>{doc.name}</p>
                                <p style={{textAlign:'start'}}>Passport copy</p>
                                {0 === 2 && (
                                    <span style={{ fontSize: '10px' }}>
                                        {t('BOOKING.VERIFICATIONPENDING')}
                                    </span>
                                )}
                                {1 === 1 && (
                                    <span style={{ fontSize: '10px' }}>
                                        {t('VERIFICATION.APPROVED')}
                                    </span>
                                )}
                                {1 === 0 && (
                                    <span style={{ fontSize: '10px' }}>
                                        {t('VERIFICATION.REJECTED')}
                                    </span>
                                )}
                                {1 === null && (
                                    <span style={{ fontSize: '10px' }}>
                                        {t('VERIFICATION.NOTUPLOADED')}
                                    </span>
                                )}
                                {false && (
                                    <span style={{ fontSize: '10px' }}>File Name</span>
                                )}
                                {true && (
                            
                               <input
                                   type="file"
                                   name="UploadyourCVResume"
                                   size="40"
                                   className="form-control file-input"
                                   id="file"
                                   accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                   aria-required="true"
                                   aria-invalid="false"
                                   onChange={onChange}
                               />
                           
                                )}
                                {false && (
                                    <input
                                        type="file"
                                        name="UploadyourCVResume"
                                        size="40"
                                        className="form-control changeDoc"
                                        id="file"
                                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                        aria-required="true"
                                        aria-invalid="false"
                                        onChange={(e) => onChange(e, doc)}
                                    />
                                )}
                            </div> */}
                    </div>

                    <div class="update-password" style={{textAlign:'start'}}>
                        <a>
                            {t('VERIFICATION.UPDATE')}
                        </a>
                    </div>
                    </div>

                </div>
                <ToastContainer />
            </div>

        </>
    );
}


export default MyDocuments;