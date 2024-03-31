import "./assessment.css";
import React from "react";
import HeadAndSidebar from "../generalComponent/headAndSidebar/headAndSidebar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";

function Assessment() {
  return (
    <div>
      <HeadAndSidebar />
      <div className="body"></div>
    </div>
  );
}

export default Assessment;
