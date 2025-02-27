import React, { Fragment, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Define animation variants
const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeIn" } },
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const logoVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// AnimatedNumber component
const AnimatedNumber = ({ finalValue, duration = 1800, prefix = "", suffix = "" }) => {
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setValue(0); // Reset animation when out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let interval;
    let startTime = Date.now();

    const updateNumber = () => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= duration) {
        setValue(finalValue);
        clearInterval(interval);
      } else {
        setValue(Math.floor(Math.random() * finalValue * 1.2)); // Random number up to 20% more
      }
    };

    interval = setInterval(updateNumber, 130); // Update every 130ms

    return () => clearInterval(interval);
  }, [isVisible, finalValue, duration]);

  return (
    <span ref={ref} className="fw-bold">
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
};

const Testimony = () => {
  const { t } = useTranslation();

  // Define client logos
  const clients = [
    { id: 1, src: "/images/Clients/2.svg", alt: "Exabytes" },
    { id: 2, src: "/images/Clients/1.svg", alt: "App" },
    { id: 3, src: "/images/Clients/4.png", alt: "Minami Acoustic" },
    { id: 4, src: "/images/Clients/3.png", alt: "FDI Group" },
    { id: 5, src: "/images/Clients/5.webp", alt: "Allen Chee Ram, Advocates & Solicitors" },
  ];

  return (
    <Fragment>
      <div className="container py-5 py-md-7 mt-3 mb-5">
        {/* Header Section */}
        <motion.div
          className="row mb-7"
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="lc-block mb-3">
            <p>{t("testimony.clients", { defaultValue: "OUR CLIENTS" })}</p>
          </div>
          <div className="lc-block mb-3">
            <div className="display-6">
              {t("testimony.trusted", { defaultValue: "Trusted by over" })}{" "}
              <AnimatedNumber finalValue={900} suffix="+" />{" "}
              {t("testimony.clients_suffix", { defaultValue: "clients" })}
            </div>
          </div>
          <div className="lc-block">
            <p className="lead">
              {t("testimony.lead", {
                defaultValue: "We bring solutions to make life easier for our customers.",
              })}
            </p>
          </div>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          className="row row-cols-2 row-cols-md-3 row-cols-xl-5 g-5 g-xl-6 justify-content-center"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {clients.map((client) => (
            <motion.div key={client.id} className="col" variants={logoVariant}>
              <div
                className="card shadow h-100 align-items-center"
                style={{ minHeight: "190px" }}
              >
                <div className="card-body align-items-center justify-content-center d-flex py-7">
                  <img
                    className="col-10"
                    src={client.src}
                    alt={client.alt}
                    style={{ maxHeight: "90px" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Fragment>
  );
};

export default Testimony;