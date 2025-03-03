import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Updated CSS for transparent background on smaller screens
const styles = `
  @media (max-width: 550px) {
    .custom-offcanvas {
      background-color: rgba(221, 221, 221, 0.85) !important;
    }
  }
`;

const Navigation = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const faqItems = [
    { id: "item1", titleKey: "faq.item1.title" },
    { id: "item2", titleKey: "faq.item2.title" },
    { id: "item3", titleKey: "faq.item3.title" },
    { id: "item4", titleKey: "faq.item4.title" },
    { id: "item5", titleKey: "faq.item5.title" },
    { id: "item6", titleKey: "faq.item6.title" },
  ];

  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById("offcanvasNavbar");
    if (offcanvasElement) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement) || new window.bootstrap.Offcanvas(offcanvasElement);
      bsOffcanvas.hide();
    }
  };

  return (
    <Fragment>
      <style>{styles}</style>
      
      <nav className="navbar navbar-light bg-light px-3 py-4 position-fixed top-0 start-0 w-100 shadow fs_1" style={{ zIndex: 1050 }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src="/images/Ascend-Logo.png"
              className="me-2 img-fluid nav-logo"
              style={{ width: "30vw", maxWidth: "250px", minWidth: "180px", height: "auto" }}
              alt="Company Secretary Services"
            />
          </Link>

          <div className="d-flex align-items-center gap-3">
            <div className="language-selector-top d-flex align-items-center">
              <div
                className={`lang-option ${i18n.language === "en" ? "lang-active" : ""}`}
                onClick={() => changeLanguage("en")}
              >
                English
              </div>
              <span className="separator">|</span>
              <div
                className={`lang-option ${i18n.language === "cn" ? "lang-active" : ""}`}
                onClick={() => changeLanguage("cn")}
              >
                中文
              </div>
            </div>

            <div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>

          <div
            className="offcanvas offcanvas-end custom-offcanvas"  // Updated class name
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <div className="language-selector-offcanvas d-flex align-items-center mb-3">
                <div
                  className={`lang-option ${i18n.language === "en" ? "lang-active" : ""}`}
                  onClick={() => changeLanguage("en")}
                >
                  English
                </div>
                <span className="separator">|</span>
                <div
                  className={`lang-option ${i18n.language === "cn" ? "lang-active" : ""}`}
                  onClick={() => changeLanguage("cn")}
                >
                  中文
                </div>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body d-flex flex-column">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={closeOffcanvas}>
                    {t("home") || "Home"}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Services" className="nav-link" onClick={closeOffcanvas}>
                    {t("Services") || "Services"}
                  </Link>
                </li>
                <li className="nav-item mt-3">
                  <span className="fw-bold">{t("faq.title") || "What We Do Best"}</span>
                  <ul className="list-unstyled ps-3 mt-3">
                    {faqItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={`/Services#${item.id}`}
                          className="nav-link"
                          onClick={closeOffcanvas}
                        >
                          {t(item.titleKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <div className="mt-auto">
                <Link
                  to="/Contact"
                  className="btn btn-primary w-100 nav-cta-btn"
                  onClick={closeOffcanvas}
                >
                  {t("cta.button") || "Contact us!"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navigation;