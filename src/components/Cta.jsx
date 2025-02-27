import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Define animation variant
const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeIn" } },
};

const Cta = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <motion.div
        className="d-flex text-center"
        lc-helper="background"
        style={{
          minHeight: "45vh",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundColor: "#eee",
          backgroundImage: "url(/images/cta.jpg)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInVariant}
      >
        <div className="lc-block my-3 align-self-center w-100 py-5">
          <div>
            <div className="display-4 fw-bold text-black mb-2">
              {t("cta.title", {
                defaultValue: "FREE CONSULTATION",
              })}
            </div>
            <p className="fw-bold text-black">
              {t("cta.description", {
                defaultValue:
                  "Let us help you with your business needs. We provide a range of services to help you set up and run your business in Malaysia.",
              })}
            </p>
          </div>
          <Link to="/Contact"
            className="btn btn-success btn-lg fw-bold py-3 px-5"
            role="button"
          >
            {t("cta.button", { defaultValue: "Contact us!" })}
          </Link>
        </div>
      </motion.div>
    </Fragment>
  );
};

export default Cta;