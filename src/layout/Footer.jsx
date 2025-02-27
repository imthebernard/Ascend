import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  // Animation variants for Framer Motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Fragment>
      <motion.section
        className="text-dark bg-light pt-5 pb-5" // Changed bg-dark to bg-light, text-light to text-dark
        style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }} // Full viewport width
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <div className="container-fluid px-4 py-5">
          <div className="row g-4">
            {/* Company Info Section */}
            <div className="col-sm-6 col-lg-3 px-4">
              <div className="lc-block mb-4">
                <Link to="/"
                  className="navbar-brand"
                >
                  <img
                    src="/images/Ascend-Logo.png"
                    width="250"
                    height="250"
                    className="d-inline-block align-middle img-fluid"
                    alt="Accounting Services Malaysia"
                  />
                </Link>
              </div>
              <div className="lc-block text">
                <p className="text-dark text-opacity-75 justify-text"> {/* Changed text-light to text-dark */}
                  {t("footer.companyDescription", {
                    defaultValue:
                      "We bring solutions to make life easier for our customers.",
      "footer.companyDescription": "We are a well-established Corporate Secretarial and Business Process Services (BPS) service provider in providing quality corporate secretarial and outsourcing services to companies of all sizes and needs that span across various industry segments. We are passionate about helping businesses grow. We provide a range of services to help you set up and run your business in Malaysia.",
                  })}
                </p>
              </div>
            </div>

            {/* Primary Menu */}
            <div className="col-sm-6 col-lg-3 px-4">
              <div className="lc-block">
                <div className="fs-6 fw-bold text-dark"> {/* Changed text-light to text-dark */}
                 
                </div>
                <ul className="nav flex-column">
                  {/* Add menu items here as needed */}
                </ul>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="col-sm-6 col-lg-3 px-4">
              <div className="lc-block mb-4">
                <div className="display-6 fw-bolder text-dark"> {/* Changed text-light to text-dark */}
                  {t("footer.findUs", { defaultValue: "Find us!" })}
                </div>
              </div>
              <div className="lc-block mb-4">
                <p className="lead text-dark"> {/* Changed text-light to text-dark */}
                  Suite 16.06 MWE Plaza, No .8 Lebuh Farquhar, 10200 George Town, Penang, Malaysia
                </p>
                <p className="lead text-dark"> {/* Changed text-light to text-dark */}
                  +604-226 2188
                </p>
                <p className="lead text-dark"> {/* Changed text-light to text-dark */}
                  enquiry@ascendbps.com
                </p>
              </div>
            
            </div>

            {/* Map Section (50% smaller) */}
            <div className="col-sm-6 col-lg-3 px-4">
              <div className="lc-block mb-4">
                <div
                  className="ratio ratio-1x1"
                  style={{ height: "30vh", maxWidth: "45vh", margin: "0 auto" }}
                  lc-helper="gmap-embed"
                >
                  <iframe
                    src="https://maps.google.com/maps?width=600&height=400&hl=en&q=MWE%20Plaza&t=&z=17&ie=UTF8&iwloc=B&output=embed"
                    style={{ border: 0, width: "100%", height: "100%" }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-6 small">
              <div className="lc-block">
                <p className="text-dark"> {/* Changed text-light to text-dark */}
                  Copyright © Ascend BPS Sdn Bhd. 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </Fragment>
  );
};

export default Footer;