import React, { Fragment, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link

// Define the fade-in animation variant
const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeIn" } },
};

const Services = () => { // Renamed to avoid confusion
  const { t } = useTranslation();
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScrollAndResize = () => {
      if (contentRef.current && imageRef.current) {
        const contentHeight = contentRef.current.offsetHeight;
        imageRef.current.style.height = `${contentHeight}px`;

        const scrolled = window.scrollY;
        const imageTop = imageRef.current.getBoundingClientRect().top;
        if (imageTop < window.innerHeight && imageTop > -contentHeight) {
          imageRef.current.style.transform = `translateY(${-scrolled * 0.3}px)`;
        }
      }
    };

    window.addEventListener("scroll", handleScrollAndResize);
    window.addEventListener("resize", handleScrollAndResize);
    handleScrollAndResize();

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, []);

  const alternateStyles = {
    mypath: {
      width: "80%",
      "--mypath-radius": "31px",
      "--mypath-border": "2px dashed",
      marginLeft: "auto",
      marginRight: "auto",
    },
    mypathDiv: {
      borderTop: "var(--mypath-border)",
      borderColor: "#777 !important",
      paddingLeft: "var(--mypath-radius)",
      paddingRight: "var(--mypath-radius)",
      paddingTop: "2rem",
      paddingBottom: "2rem",
    },
    evenDiv: {
      borderLeft: "var(--mypath-border)",
      borderTopLeftRadius: "var(--mypath-radius)",
      borderBottomLeftRadius: "var(--mypath-radius)",
      marginRight: "var(--mypath-radius)",
      paddingRight: 0,
      paddingTop: "2rem",
      paddingBottom: "2rem",
    },
    oddDiv: {
      borderRight: "var(--mypath-border)",
      borderTopRightRadius: "var(--mypath-radius)",
      borderBottomRightRadius: "var(--mypath-radius)",
      marginLeft: "var(--mypath-radius)",
      paddingLeft: 0,
      paddingTop: "2rem",
      paddingBottom: "2rem",
    },
    firstDiv: {
      borderTop: 0,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      paddingTop: 0,
    },
    lastDiv: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
  };

  const blocks = [
    {
      id: 1,
      title: "service1.title",
      text: "service1.text",
      link: "/Services#item1", // Redirects to /Services#item1
      imageSrc: "/images/SVG/case.svg",
    },
    {
      id: 2,
      title: "service2.title",
      text: "service2.text",
      link: "/Services#item1", // Redirects to /Services#item1
      imageSrc: "/images/SVG/plane.svg",
    },
    {
      id: 3,
      title: "service3.title",
      text: "service3.text",
      link: "/Services#item4", // Redirects to /Services#item5
      imageSrc: "/images/SVG/gear.svg",
    },
  ];

  return (
    <Fragment>
      <section className="position-relative bg-light overflow-hidden">
        <div className="container-fluid g-0">
          <div className="row g-0 align-items-stretch">
            {/* Left Side - Image (Hidden below xl) */}
            <div className="col-xl-5 col-12 position-relative overflow-hidden d-xl-block d-none">
              <img
                ref={imageRef}
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                  minHeight: "120%",
                  transition: "transform 0.1s linear",
                  willChange: "transform",
                }}
                src="/images/hero3.jpg"
                sizes="(max-width: 1080px) 100vw, 1080px"
                width="1080"
                alt="Corporate Secretary Services"
              />
            </div>

            {/* Right Side - Alternate Content with Framer Motion */}
            <div
              ref={contentRef}
              className="col-xl-7 col-12 position-relative zindex-5 d-flex align-items-xl-center align-items-start"
            >
              <div className="container py-5">
                <div className="row justify-content-center">
                  <div className="col-12 text-center">
                    <div style={alternateStyles.mypath}>
                      {blocks.map((block, index) => (
                        <motion.div
                          key={block.id}
                          className="lc-block"
                          style={{
                            ...alternateStyles.mypathDiv,
                            ...(index % 2 === 0 ? alternateStyles.evenDiv : alternateStyles.oddDiv),
                            ...(index === 0 ? alternateStyles.firstDiv : {}),
                            ...(index === blocks.length - 1 ? alternateStyles.lastDiv : {}),
                          }}
                          variants={fadeInVariant}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, amount: 0.5 }}
                        >
                          <div>
                            <div className="d-inline-flex align-items-center mb-2">
                              <h2 className="me-3 service-title">{t(block.title)}</h2>
                              <img
                                src={block.imageSrc}
                                alt="Secretarial Services"
                                style={{ width: "3em", height: "3em" }}
                              />
                            </div>
                            <p className="mb-3">{t(block.text)}</p>
                            <br />
                            <Link to={block.link} className="btn btn-outline-primary" role="button">
                              {t("Learn More")}
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Services;