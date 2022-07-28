/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */

import React from "react";
import PropTypes from "prop-types";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import MediaQuery from "react-responsive";

import ContactMeTitle from "./ContactMeTitle";

import linkedinLogo from "./LinkedinLogo.svg";
import "./ContactMe.scss";

const inputTresHold = 5;

class ContactMe extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      message: "",

      comeFromBelow: "",
      comeFromBelowDelayed: "",
      comeFromBelowDelayedMore: "",

      renderAnimation: false,
      visible: "invisible"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  componentDidUpdate() {
    const { refinview } = this.props;
    const { renderAnimation } = this.state;

    if (refinview === "contactMe" && !renderAnimation) {
      this.setState({
        comeFromBelow: "come-from-below",
        comeFromBelowDelayed: "come-from-below-delayed",
        comeFromBelowDelayedMore: "come-from-below-delayed-more",
        renderAnimation: true,
        visible: "visible"
      });
    }
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
    const { fullName, email, message } = this.state;

    if (
      fullName.length > 0 &&
      this.checkValidation("fullName") &&
      email.length > 0 &&
      this.checkValidation("email") &&
      message.length > 0 &&
      this.checkValidation("message")
    ) {
      const emailResponseApi = await this.sendEmail(event);
      if (emailResponseApi) {
        toast.success("Message sent 🙌", {
          className: "toast-general",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
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
        toast.error("Failed to send. Please use andreisvasile@gmail.com", {
          className: "toast-general",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
    } else {
      toast.error("Please complete all fields", {
        className: "toast-general",
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  }

  sendEmail(event) {
    const { REACT_APP_TEMPLATE_ID, REACT_APP_SERVICE_ID, REACT_APP_USER_ID } =
      process.env;
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
    if (target === "fullName") {
      if (fullName.length && fullName.length < inputTresHold) checkBool = false;
    }
    if (target === "email") {
      if (
        (email.length && email.length < inputTresHold) ||
        (email.length && !/.+@.+\.[A-Za-z]+$/.test(email))
      ) {
        checkBool = false;
      }
    }
    if (target === "message") {
      if (message.length && message.length < inputTresHold) checkBool = false;
    }

    return checkBool;
  }

  render() {
    const {
      fullName,
      email,
      message,
      comeFromBelow,
      comeFromBelowDelayed,
      comeFromBelowDelayedMore,
      visible
    } = this.state;
    const { headerTextHighlightRef, refinview } = this.props;

    return (
      <div
        className={`contactMe ${visible}`}
        id="contact"
        refinview={refinview}
      >
        <section className="contactMe--center-flex">
          <MediaQuery maxWidth={912}>
            <ContactMeTitle
              mode="mobile"
              headerTextHighlightRef={headerTextHighlightRef}
              refinview={refinview}
            />
          </MediaQuery>
          <MediaQuery minWidth={913}>
            <ContactMeTitle
              mode="desktop"
              headerTextHighlightRef={headerTextHighlightRef}
              refinview={refinview}
            />
          </MediaQuery>
          <div className={`contactMe--description ${comeFromBelow} `}>
            <p>
              Feel free to contact me for any questions, job opportunities or
              general questions by completing the following form.
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
              className={`contactMe--input ${comeFromBelowDelayed} ${
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
              className={`contactMe--input ${comeFromBelowDelayed} ${
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
              className={`contactMe--input ${comeFromBelowDelayed} contactMe--textarea ${
                !this.checkValidation("message")
                  ? "input-form-started"
                  : "input-form-finished"
              }`}
              onChange={this.handleChange}
            />

            <div
              className={`contactMe--submit-group ${comeFromBelowDelayedMore} `}
            >
              <input
                className="main-btn-style contactMe--submit-btn"
                type="submit"
                value="Send message!"
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
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};
