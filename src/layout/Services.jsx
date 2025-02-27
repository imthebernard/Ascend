import React, { useEffect, useRef, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Services = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const accordionRefs = useRef([]);

  const faqItems = [
    { id: "item1", titleKey: "faq.item1.title", contentKey: "faq.item1.content" },
    { id: "item2", titleKey: "faq.item2.title", contentKey: "faq.item2.content" },
    { id: "item3", titleKey: "faq.item3.title", contentKey: "faq.item3.content" },
    { id: "item4", titleKey: "faq.item4.title", contentKey: "faq.item4.content" },
    { id: "item5", titleKey: "faq.item5.title", contentKey: "faq.item5.content" },
    { id: "item6", titleKey: "faq.item6.title", contentKey: "faq.item6.content" },
  ];

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const targetIndex = faqItems.findIndex((item) => item.id === hash);
      if (targetIndex !== -1) {
        const collapseElement = document.getElementById(`flush-collapse${targetIndex + 1}`);
        if (collapseElement) {
          collapseElement.classList.add("show");
          const accordionItem = accordionRefs.current[targetIndex];
          if (accordionItem) {
            const navHeight = document.querySelector(".navbar")?.offsetHeight || 0;
            const elementPosition = accordionItem.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navHeight - 20;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });

            accordionItem.classList.add("highlight");
            setTimeout(() => accordionItem.classList.remove("highlight"), 2000);
          }
        }
      }
    }
  }, [location, faqItems]);

  return (
    <Fragment>
      <div className="spacer"></div>

      <div className="container py-5 mb-4 bg-light rounded-3">
        <div className="p-5 mb-4">
          <div>
            <div className="fw-bolder display-3 mb-3">   {t("What we do best", {
                defaultValue: "What we do best",
              })}</div>
          </div>
          <div className="col-md-8">
            <p className="lead">
            {t("service_desc", {
                defaultValue: "We ensure our clients enjoy assurance of compliance with all statutory and commercial regulations, as well as professional counsel on the latest corporate law and accounting standards.",
              })}
            </p>
          </div>
          <div>
            <a className="btn btn-outline-primary py-3 px-5" href="#" role="button">
            {t("cta.button")}
            </a>
          </div>
        </div>
      </div>

      <div className="container py-5">

        <div className="row">
          <div className="col-md-8">
            <div className="accordion accordion-flush" id="accordionFlushMyFAQ2">
              {faqItems.map((item, index) => (
                <div
                  key={item.id}
                  className="accordion-item mb-5"
                  ref={(el) => (accordionRefs.current[index] = el)}
                >
                  <a
                    className="fw-bold text-decoration-none text-dark h4 d-flex justify-content-between align-items-center accordion-header"
                    href={`#${item.id}`}
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapse${index + 1}`}
                    aria-expanded="false"
                    aria-controls={`flush-collapse${index + 1}`}
                  >
                    <span>{t(item.titleKey)}</span>
                    <span className="accordion-arrow">▼</span> {/* Downward arrow */}
                  </a>
                  <div
                    id={`flush-collapse${index + 1}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`flush-heading${index + 1}`}
                    data-bs-parent="#accordionFlushMyFAQ2"
                  >
                    <div
                      className="accordion-body"
                      id="accordionBody"
                      dangerouslySetInnerHTML={{ __html: t(item.contentKey) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Services;
