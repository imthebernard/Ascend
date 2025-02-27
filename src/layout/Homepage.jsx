import React, { Fragment } from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimony from "../components/Testimony";
import Cta from "../components/Cta";

const Homepage = () => {

  return (
    <Fragment>
    <Hero />
    <Services />
    <Testimony />
    <Cta />
    </Fragment>
  );
};

export default Homepage;