import React, { Fragment, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"; 
import { Link } from "react-router-dom";

// Define the fade-in animation variant
const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeIn" } },
};

const Hero = () => {
  const { t } = useTranslation();
  const videoRef = useRef(null);

  useEffect(() => {
    const modalElement = document.getElementById("videoModal");

    if (modalElement) {
      modalElement.addEventListener("shown.bs.modal", () => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      });

      modalElement.addEventListener("hidden.bs.modal", () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      });
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("shown.bs.modal", () => {});
        modalElement.removeEventListener("hidden.bs.modal", () => {});
      }
    };
  }, []);

  return (
    <Fragment>
      <section className="position-relative d-flex align-items-center min-vh-100 bg-light overflow-hidden">
        {/* Background Image */}
        <div className="container-fluid g-0 col-xl-7 offset-xl-5 position-absolute top-0 h-100">
          <img
            className="w-100 h-100"
            style={{ objectFit: "cover", objectPosition: "50% 50%" }}
            src="/images/hero.jpg"
            sizes="(max-width: 1080px) 100vw, 1080px"
            width="1080"
            alt="Company Incorporation Services"
          />
        </div>

        {/* Hero Content */}
        <div className="container position-relative zindex-5 mt-5">
          <div className="row justify-content-md-start justify-content-center">
            <div className="col-11 col-sm-11 col-md-10 col-lg-8 text-center text-md-start mt-5">
              {/* Card with Motion */}
              <motion.div
                className="card card-body shadow mt-5 p-5"
                style={{ minHeight: "500px" }}
                variants={fadeInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
              >
                {/* Logo & Company Name */}
                <div className="lc-block mb-4">
                  <div className="d-inline-flex" role="button" data-bs-toggle="modal" data-bs-target="#videoModal">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path>
                      </svg>
                    </div>
                    <div className="ms-3 align-self-center">
                      <p className="lead">{t("Learn More")}</p>
                    </div>
                  </div>
                </div>

                {/* Hero Title */}
                <div className="lc-block mb-4">
                  <div>
                    <h1 className="display-3 fw-bold">{t("hero")}</h1>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="lc-block d-flex flex-column flex-md-row align-items-md-start">
                  <div className="lc-block flex-shrink-0 mb-4">
                    <Link to="/Contact" className="btn btn-primary btn-lg" role="button">
                      {t("Contact Us")}
                    </Link>
                  </div>
                  <div className="lc-block ms-md-3">
                    <div>
                      <p className="text-muted" style={{ fontSize: "1.2rem" }}>
                        {t("hero-desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Learn More Link with Motion */}
              <motion.div
                className="lc-block mt-4"
                variants={fadeInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
              >
                <div className="d-inline-flex">
                  <div>
                    <Link to="/Services">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                        />
                      </svg>
                    </Link>
                  </div>
                  <div className="ms-3 align-self-center">
                    <p>
                    <Link to="/Services" className="lead"> 
                        {t("Learn More")}
                      </Link>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <div
        className="modal fade"
        id="videoModal"
        tabIndex="-1"
        aria-labelledby="videoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg custom-modal-size">
          <div className="modal-content border-0">
            <div className="modal-header p-0 border-0 d-flex justify-content-end">
              <button
                type="button"
                className="btn-close m-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0 d-flex justify-content-center">
              <video ref={videoRef} width="100%" height="100%" controls>
                <source src="/videos/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;