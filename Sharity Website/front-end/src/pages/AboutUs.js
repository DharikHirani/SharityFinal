import React from "react";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SectionMedium from "../components/sections/SectionMedium";
import TitleSectionMedium from "../components/sections/TitleSectionMedium";
import TitleSectionSmall from "../components/sections/TitleSectionSmall";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about mb-5">
      <TitleSectionMedium>
        <h1 className="mb-0">About us</h1>
      </TitleSectionMedium>
      <SectionMedium>
        <h2>Our Mission</h2>
        <p>
          To make an impact on the world by getting one step closer to
          solving world hunger
        </p>
        <h2> Our Vision </h2>
        <p>A world where hunger is no more</p>
        <h2> Our Goals </h2>
        <p>
          <strong>DEVELOP</strong> our community to try and get as many eyes on as possible and <strong>ACHIEVE</strong> zero hunger by providing for those who seek food on a web.
        </p>
        <h2>Who are we?</h2>
        <p>
          We are group 13 and are aiming to solve one of the UN
          sustainable goals being zero hunger. Our aim is to guide those
          who are willing to help to locations that offer to resolve their
          hunger with either hot food provided at the location or with
          non-perishable goods.We aim to achieve this by providing for
          both the providers and those who seek food on a web platform.
        </p>
        <p>
          Providers will provide detailed descriptions on what they offer,
          where they’re located, opening times, interest gained etc.
        </p>
        <p>
          For
          those who are in need have be given a functional map that showd
          the locations of these events in an orderly format, depending on
          their zoom.
        </p>
        {/* <h2>Services:</h2>
        <ul>
          <li>
            Guide those who are willing to help to locations that offer to
            resolve their hunger with either hot food provided at the
            location or with non-perishable goods.
          </li>
          <li>Allow charities or external providers to host events</li>
          <li>Sufficient food</li>
        </ul> */}
      </SectionMedium>
    </div >
  );
}
