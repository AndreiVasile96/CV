/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */

import React from "react";
import PropTypes from "prop-types";

import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";

import linkedinLogo from "./LinkedinLogo.svg";

import "./ContactMe.scss";

const inputTresHold = 5;

class ContactMe extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { value, name } = target;

    this.checkValidation();

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const emailResponseApi = await this.sendEmail(event);
    if (emailResponseApi) {
      toast.success("Message sent 🙌", {
        className: "toast-general",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      this.setState({
        fullName: "",
        email: "",
        message: ""
      });
    } else {
      toast.success("Failed to send ❌", {
        className: "toast-general",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  }

  sendEmail(event) {
    const REACT_APP_TEMPLATE_ID = "template_i2onlaf";
    const REACT_APP_SERVICE_ID = "service_dvgtg3m";
    const REACT_APP_USER_ID = "BTmRlBP5An9ebTjlH";

    // const { REACT_APP_TEMPLATE_ID, REACT_APP_SERVICE_ID, REACT_APP_USER_ID } =
    //   process.env;
    if (!REACT_APP_TEMPLATE_ID || !REACT_APP_SERVICE_ID || !REACT_APP_USER_ID) {
      return false;
    }

    event.preventDefault();

    const apiSuccessful = emailjs
      .sendForm(
        REACT_APP_SERVICE_ID,
        REACT_APP_TEMPLATE_ID,
        event.target,
        REACT_APP_USER_ID
      )
      .then(
        (result) => {
          if (result.text === "OK") return true;
          return false;
        },
        () => false
      );

    return apiSuccessful;
  }

  // return True = valid
  checkValidation(target) {
    let checkBool = true;
    const { fullName, email, message } = this.state;
    if (target === "fullName" || target === "all") {
      if (fullName.length && fullName.length < inputTresHold) checkBool = false;
    }
    if (target === "email" || target === "all") {
      if (
        (email.length && email.length < inputTresHold) ||
        (email.length && !/.+@.+\.[A-Za-z]+$/.test(email))
      ) {
        checkBool = false;
      }
    }
    if (target === "message" || target === "all") {
      if (message.length && message.length < inputTresHold) checkBool = false;
    }

    if (target === "all") {
      if (!fullName.length || !email.length || !message.length) {
        checkBool = false;
      }
    }
    return checkBool;
  }

  render() {
    const { fullName, email, message } = this.state;
    const { headerTextHighlightRef } = this.props;

    return (
      <div className="contactMe" id="contact">
        <section className="contactMe--center-flex">
          <div className="contactMe--title">
            <h1 ref={headerTextHighlightRef}>Contact me</h1>
          </div>
          <div className="contactMe--description">
            <p>
              Don&apos;t hesitate to contact me for job opprtunities, questions
              or general enquiries
            </p>
          </div>
          <form
            id="contact-form"
            className="contactMe--form"
            onSubmit={this.handleSubmit}
          >
            <input
              name="fullName"
              type="text"
              placeholder="Name"
              value={fullName}
              className={`contactMe--input ${
                !this.checkValidation("fullName")
                  ? "input-form-started"
                  : "input-form-finished"
              }`}
              onChange={this.handleChange}
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              className={`contactMe--input ${
                !this.checkValidation("email")
                  ? "input-form-started"
                  : "input-form-finished"
              }`}
              onChange={this.handleChange}
            />

            <textarea
              name="message"
              type="textarea"
              placeholder="Message"
              value={message}
              className={`contactMe--input contactMe--textarea ${
                !this.checkValidation("message")
                  ? "input-form-started"
                  : "input-form-finished"
              }`}
              onChange={this.handleChange}
            />

            <div className="contactMe--submit-group">
              <input
                className="main-btn-style contactMe--submit-btn"
                type="submit"
                value="Send message!"
                disabled={!this.checkValidation("all")}
              />
              <a href="https://www.linkedin.com/in/andrei-vasile/">
                <img
                  className="contactMe--lkdn-logo"
                  src={linkedinLogo}
                  alt="Linkedin Logo"
                />
              </a>
            </div>
          </form>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="toast-class"
          />
        </section>
      </div>
    );
  }
}

export default ContactMe;

ContactMe.propTypes = {
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired
};
