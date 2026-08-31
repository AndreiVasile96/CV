/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */

import React from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser"; // Updated import
import { ToastContainer, toast } from "react-toastify";
import MediaQuery from "react-responsive";

import ContactMeTitle from "./ContactMeTitle";

// Import JSON data
import contactMeData from "../../data/contactMe.json";

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
      visible: "invisible",
      isLoading: false
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

    // Field names match state properties, so no mapping is needed. Validation
    // classes are recomputed from state during render.
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
        toast.success(contactMeData.toastMessages.success, {
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
        toast.error(contactMeData.toastMessages.error, {
          className: "toast-general",
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
    } else {
      toast.warn(contactMeData.toastMessages.validation, {
        className: "toast-general",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  }

  async sendEmail(event) {
    // EmailJS credentials. The public key is safe to ship; never add the
    // private key here, since CRA inlines REACT_APP_* into the public bundle.
    const {
      REACT_APP_EMAILJS_TEMPLATE_ID,
      REACT_APP_EMAILJS_SERVICE_ID,
      REACT_APP_EMAILJS_PUBLIC_KEY
    } = process.env;

    if (
      !REACT_APP_EMAILJS_TEMPLATE_ID ||
      !REACT_APP_EMAILJS_SERVICE_ID ||
      !REACT_APP_EMAILJS_PUBLIC_KEY) {
      // Without this the form fails identically to a network error, which is
      // how it stayed broken unnoticed: the build simply had no credentials.
      // eslint-disable-next-line no-console
      console.error(
        "Contact form disabled: EmailJS environment variables are missing from "
        + "this build. Set REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID "
        + "and REACT_APP_EMAILJS_PUBLIC_KEY (.env locally, repository secrets in CI)."
      );
      return false;
    }

    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      const result = await emailjs.sendForm(
        REACT_APP_EMAILJS_SERVICE_ID,
        REACT_APP_EMAILJS_TEMPLATE_ID,
        event.target,
        REACT_APP_EMAILJS_PUBLIC_KEY
      );

      this.setState({ isLoading: false });
      return result.status === 200;
    } catch (error) {
      this.setState({ isLoading: false });
      return false;
    }
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
      comeFromBelow,
      comeFromBelowDelayed,
      comeFromBelowDelayedMore,
      visible,
      isLoading,
      renderAnimation
    } = this.state;
    const { headerTextHighlightRef, refinview } = this.props;

    return (
      <div
        className={`contactMe ${visible}`}
        id="contact"
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
              {contactMeData.description}
            </p>
          </div>
          <form
            id="contact-form"
            className={`contactMe--form ${renderAnimation ? "" : "form-loading"}`}
            onSubmit={this.handleSubmit}
          >
            {/* Generate form fields from JSON data */}
            {contactMeData.form.fields.map((field) => {
              const { name, type, placeholder, className } = field;
              const { [name]: fieldValue } = this.state;
              if (type === "textarea") {
                return (
                  <textarea
                    key={name}
                    name={name}
                    placeholder={placeholder}
                    value={fieldValue}
                    aria-label={placeholder.replace(" *", "")}
                    aria-required={field.required}
                    className={`contactMe--input ${renderAnimation ? comeFromBelowDelayed : "input-loading"} ${className || ""} ${
                      !this.checkValidation(name)
                        ? "input-form-started"
                        : "input-form-finished"
                    }`}
                    onChange={this.handleChange}
                  />
                );
              }
              return (
                <input
                  key={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={fieldValue}
                  aria-label={placeholder.replace(" *", "")}
                  aria-required={field.required}
                  className={`contactMe--input ${renderAnimation ? comeFromBelowDelayed : "input-loading"} ${
                    !this.checkValidation(name)
                      ? "input-form-started"
                      : "input-form-finished"
                  }`}
                  onChange={this.handleChange}
                />
              );
            })}

            <div
              className={`contactMe--submit-group ${comeFromBelowDelayedMore} `}
            >
              <MediaQuery maxWidth={912}>
                <input
                  className="main-btn-style contactMe--submit-btn"
                  type="submit"
                  value={
                    isLoading
                      ? contactMeData.form.loadingText
                      : contactMeData.form.submitText.mobile
                  }
                  disabled={isLoading}
                />
              </MediaQuery>
              <MediaQuery minWidth={913}>
                <input
                  className="main-btn-style contactMe--submit-btn"
                  type="submit"
                  value={
                    isLoading
                      ? contactMeData.form.loadingText
                      : contactMeData.form.submitText.desktop
                  }
                  disabled={isLoading}
                />
              </MediaQuery>
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
