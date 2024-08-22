import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faTwitter,
    faFacebook,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow() {
    return (
        <div className="d-flex justify-content-center social-container" style={{ position: "fixed", bottom: 0, width: "100%", zIndex: 99999, background: "rgba(255,255,255,.4)", padding: "3px 0" }}>
            <span className="social-title" style={{ fontSize: "1.13em" }}><strong>@Sharity</strong></span>


            <a
                href="https://www.youtube.com/watch?v=NgvIuqfRVZw"
                className="Youtube social"
                style={{ color: "red", margin: "0 0.5rem", fontSize: "10px" }}

            >
                <FontAwesomeIcon icon={faYoutube} size="3x" />

            </a>
            <a
                href="https://www.instagram.com/zerohunger/?hl=en"
                className="Instagram social"
                style={{ color: "black", margin: "0 0.5rem", fontSize: "10px" }}
            >
                <FontAwesomeIcon icon={faInstagram} size="3x" />

            </a>
            <a
                href="https://twitter.com/zerohunger?lang=en"
                className="Twitter social"
                style={{ color: "light blue", margin: "0 0.5rem", fontSize: "10px" }}
            >
                <FontAwesomeIcon icon={faTwitter} size="3x" />

            </a>
            <a
                href="https://www.facebook.com/pg/Zero-Hunger-1685301724931744/posts/"
                className="Facebook social"
                style={{ color: "blue", margin: "0 0.5rem", fontSize: "10px" }}
            >
                <FontAwesomeIcon icon={faFacebook} size="3x" />

            </a>

        </div>
    );
}
