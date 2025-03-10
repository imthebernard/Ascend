import { Fragment, useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Link } from "react-router-dom";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "",
    recaptchaToken: "",
    honeypot: "",
    website: "ascend.com",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadRecaptchaScript = () => {
    if (!document.getElementById("recaptcha-script")) {
      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  };

  const handleRecaptcha = useCallback((token) => {
    setFormData((prev) => ({ ...prev, recaptchaToken: token }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.name === "honeypot" ? "" : e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    if (formData.honeypot) {
      setStatus("Submission rejected. Please try again.");
      return;
    }

    if (!formData.preferredContact) {
      setStatus("Please select a preferred contact method.");
      return;
    }

    if (!formData.recaptchaToken) {
      setStatus("Please complete the reCAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const apiUrl = "https://5a7smy6ulh.execute-api.ap-southeast-1.amazonaws.com/send-email";
      const response = await axios.post(apiUrl, formData);
      setStatus("Message queued successfully! Check your email soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        preferredContact: "",
        recaptchaToken: "",
        honeypot: "",
        website: "ascend.com",
      });
      window.grecaptcha.reset();
      console.log("Response:", response.data);
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    loadRecaptchaScript();

    window.recaptchaCallback = (token) => {
      handleRecaptcha(token);
    };

    return () => {
      delete window.recaptchaCallback;
      const script = document.getElementById("recaptcha-script");
      if (script) {
        script.remove();
      }
    };
  }, [handleRecaptcha]);

  return (
    <Fragment>
      <div className="spacer"></div>
      <div className="contact-page d-flex align-items-center justify-content-center fs_1">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumbs mb-5">
                <Link to="/" className="contact-links">{t("home")}</Link>
                <span className="mx-1">/</span>
                <Link to="/Contact" className="contact-links">{t("contact")}</Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="pr-0 pr-lg-4">
                <div className="content">
                  <div className="h5">{t("Contact_Us_Statement")}</div>
                  <div className="mt-5">
                    <p className="mb-3 font-weight-normal">
                      <div className="text-dark">enquiry@ascendbps.com</div>
                    </p>
                    <p className="mb-3">
                      <a className="text-dark" href="tel:+60">+60 4-226 2188</a>
                    </p>
                    <p className="mb-2">
                      Suite 16.06 MWE Plaza, No .8 Lebuh Farquhar, 10200 George Town, Penang, Malaysia
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("name")}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control mb-4"
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t("Preferred Contact")}</option>
                    <option value="email">{t("email")}</option>
                    <option value="phone">{t("phone")}</option>
                  </select>
                </div>
                {formData.preferredContact && (
                  <div className="col-12">
                    {formData.preferredContact === "email" ? (
                      <input
                        type="email"
                        className="form-control mb-4"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    ) : (
                      <input
                        type="tel"
                        className="form-control mb-4"
                        placeholder="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    )}
                  </div>
                )}
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("subject")}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    className="form-control mb-4"
                    placeholder={t("Type Message")}
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                {/* Honeypot Field - Hidden from users */}
                <div style={{ display: "none" }}>
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>
                <div className="col-12 mb-4">
                  <div
                    className="g-recaptcha"
                    data-sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    data-callback="recaptchaCallback"
                  ></div>
                </div>
                <div className="col-12 contact_button">
                  <button
                    className="btn btn-outline-primary contact_button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Message sending..." : t("Send Message")}
                  </button>
                </div>
              </form>
              {status && <p className="mt-3">{status}</p>}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;