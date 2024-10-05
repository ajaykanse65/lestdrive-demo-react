import React, { useState } from 'react';
import { useTranslation, } from "react-i18next";
import { Modal, Button, Form } from 'react-bootstrap';
import '../assets/css/english.css';
import '../assets/css/arabic.css';

const EnquireModal = ({ show, handleClose, countries, enquiryFor }) => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    country_id: '229',
    phone: '',
    enquiry_for_id: '',
    message: '',
  });
  const [blnEnquirySubmitted, setBlnEnquirySubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm({ ...enquiryForm, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!enquiryForm.name) newErrors.name = 'Name is required';
    if (!enquiryForm.email) newErrors.email = 'Email is required';
    if (enquiryForm.email && !/\S+@\S+\.\S+/.test(enquiryForm.email)) newErrors.email = 'Invalid email address';
    if (!enquiryForm.phone) newErrors.phone = 'Phone number is required';
    if (!enquiryForm.enquiry_for_id) newErrors.enquiry_for_id = 'Enquiry for is required';
    if (!enquiryForm.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const enquirySubmit = () => {
    setBlnEnquirySubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Submit form logic here
      console.log('Form submitted:', enquiryForm);
    }
  };

  return (
    // <div className={`modal modal-lg modal-right fade ${true ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
    // <div className="modal-dialog">
    //   <div className="main-content-section">
    //     <div className="enquire-show">
    //       <Button
    //         onClick={() => setEnquiryForm({ name: '', email: '', country_id: '229', phone: '', enquiry_for_id: '', message: '' })}
    //         className="enquire-btn"
    //       >
    //         Enquire
    //       </Button>
    //     </div>
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title">Get a Call</h5>
    //         <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
    //       </div>
    //       <div className="modal-body">
    // <div className={`language-${currentLanguage}`}>
      <div className="form-box" style={{textAlign:'start'}}>
        <div className="enquire">
          <form>
            <div className="row box">
              <div className="col-lg-6 posRelative">
                <label>{t('CONTACT.NAME')}*</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={enquiryForm.name}
                  onChange={handleChange}
                  aria-label="First name"
                />
                {blnEnquirySubmitted && errors.name && (
                  <span className="validationMessage">{t('VALIDATION.NAMEREQUIRED')}</span>
                )}
              </div>
              <div className="col-lg-6 posRelative">
                <label>{t('CONTACT.EMAIL')}*</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={enquiryForm.email}
                  onChange={handleChange}
                  aria-label="Email"
                />
                {blnEnquirySubmitted && errors.email && (
                  <span className="validationMessage">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="row box">
              <div className="col-lg-6 posRelative">
                <label>{t('CONTACT.PHONE')}*</label>
                <div className="d-flex">
                  <select
                    name="country_id"
                    value={enquiryForm.country_id}
                    onChange={handleChange}
                    id="country-code"
                    className="form-control"
                  >
                    {/* {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.phone_code}
                      </option>
                    ))} */}
                  </select>
                  <input
                    type="number"
                    className="form-control phne"
                    name="phone"
                    value={enquiryForm.phone}
                    onChange={handleChange}
                    aria-describedby="phoneHelp"
                  />
                  {blnEnquirySubmitted && (errors.phone || errors.country_id) && (
                    <span className="validationMessage">{errors.phone || errors.country_id}</span>
                  )}
                </div>
              </div>
              <div className="col-lg-6 posRelative">
                <label>{t('CONTACT.ENQUIREFOR')}*</label>
                <div className="d-flex">
                  <select
                    name="enquiry_for_id"
                    value={enquiryForm.enquiry_for_id}
                    onChange={handleChange}
                    className="form-control"
                    id="enquiry_for"
                  >
                    <option value="" disabled>Select category</option>
                    {/* {enquiryFor.map((enq) => (
                      <option key={enq.id} value={enq.id}>
                        {enq.name}
                      </option>
                    ))} */}
                  </select>
                  {blnEnquirySubmitted && errors.enquiry_for_id && (
                    <span className="validationMessage">{errors.enquiry_for_id}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="row box">
              <div className="col-lg-12 posRelative">
                <label>{t('CONTACT.MESSAGE')}*</label>
                <textarea
                  className="form-control"
                  name="comment"
                  value={enquiryForm.message}
                  onChange={handleChange}
                  aria-label="Message"
                ></textarea>
                {blnEnquirySubmitted && errors.message && (
                  <span className="validationMessage">{errors.message}</span>
                )}
              </div>
            </div>
            <div className="send-message" onClick={enquirySubmit}>
              <a>{t('HOME.SENDMESSAGE')}</a>
            </div>
          </form>
        </div>
      </div>
    // </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default EnquireModal;