import "./headAndSidebar.css";
import iconFind from "../../../icon/find-magnifier-search-zoom-look-svgrepo-com.svg";
import iconNoi from "../../../icon/bell-svgrepo-com.svg";
import iconFill from "../../../icon/filter-svgrepo-com.svg";
import iconFindWhite from "../../../icon/find-white.svg";
import iconDownArrow from "../../../icon/icon-down-arrow.png";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../../panigation/pagination";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import QuestionBank from "../../taskQuestionBank/questionBank";
import Assessment from "../../taskAssessment/assessment";

import {
  faPencil,
  faCircleCheck,
  faCheck,
  faCircleXmark,
  faChevronDown,
  faListCheck,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

function HeadAndSidebar() {
  const [activeDropdown, setActiveDropDown] = useState(true);
  const [selectedItemHeader, setSelectedItemHeader] = useState(3);
  const [selectedSidebar, setSelectedSidebar] = useState(0);
  const [sidebarItems, setSidebarItems] = useState([
    {
      label: "Đánh giá nhân sự",
      icon: faListCheck,
      link: "/danh-gia-nhan-su",
      dropdowns: [{ label: "Quản lí dợt đánh giá", link: "/ngan-hang-cau-hoi" }],
    },
    {
      label: "Mục khác",
      icon: faCheck,
      link: "/other-link",
      dropdowns: [
        { label: "Dropdown Label A", link: "/dropdown-a" },
        { label: "Dropdown Label B", link: "/dropdown-b" },
      ],
    },
  ]);
  const items = ["Trang chủ", "Thông tin", "Tài chính", "Nhân sự"];
  const handleDropdowm = () => {
    setActiveDropDown(!activeDropdown);
  };
  const [isPopStatusVisible, setIsStatusVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState(true);
  const [status, setStatus] = useState("none");

  const receiveDataFromAssessment = (data, status) => {
    setStatusMessage(status);
      setStatus(data);
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 2000);
  };
  

  const changeHeaderFunction = (fun) => {
    setSelectedItemHeader(fun);
    setSelectedSidebar(-1);
    setActiveDropDown(false);
  };

  const Icon24px = ({ classIcon, color, size }) => {
    const iconSize = {
      color: color,
      cursor: "pointer",
      fontSize: size,
    };
    return <FontAwesomeIcon icon={classIcon} style={iconSize} />;
  };

  return (
    <div className="all-page">
      <div className="side-bar">
        <div className="logo">
          <div className="logo-image">
            <div className="image"></div>
          </div>

          <img className="logo-arrow" src={iconDownArrow} />
        </div>
        <div
          style={{ display: selectedItemHeader == 3 ? "" : "none" }}
          className="content-side-bar"
        >
          {sidebarItems.map((item, index) => (
            <div key={index}>
              <ul>
                <li style={{ cursor: "pointer" }} onClick={handleDropdowm}>
                  <div style={{ marginLeft: 10 }}>
                    <Icon24px
                      classIcon={item.icon}
                      color={activeDropdown ? "#5CB800" : "white"}
                      size={20}
                    />
                  </div>
                  <a style={{ color: activeDropdown ? "#5CB800" : "white" }}>
                    {item.label}
                  </a>
                  <div className="iconSideBar">
                    <Icon24px
                      className="iconSidebar"
                      classIcon={activeDropdown ? faChevronDown : faChevronUp}
                      color={activeDropdown ? "#5CB800" : "white"}
                      size={15}
                    />
                  </div>
                  <div className={`dropdown ${activeDropdown ? "active" : ""}`}>
                    {item.dropdowns.map((dropdown, idx) => (
                      <div onClick={() => setSelectedSidebar(idx)} key={idx}>
                        <Icon24px classIcon={faPencil} color={"#FFFFFF"} />
                        <a>{dropdown.label}</a>
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {isPopStatusVisible && (
          <div className="popStatus-area">
            <div
              className="popStatus"
              style={{ backgroundColor: statusMessage ? "#1a6634" : "#FD7676"}}
            >
              <Icon24px
                classIcon={statusMessage ? faCircleCheck : faCircleXmark}
                size={25}
                color={"white"}
              />
              <p>{status}</p>
            </div>
          </div>
        )}
      </div>

      <div className="content-area">
        <div className="head-action">
          <div className="btn-location">
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <div className="item-header">
                    <a
                      onClick={() => changeHeaderFunction(index)}
                      className={selectedItemHeader === index ? "selected" : ""}
                      style={{
                        color:
                          selectedItemHeader === index ? "#008000" : "#C4C4C4",
                      }}
                    >
                      {item}
                    </a>
                    <p
                      className={`underline-title-header ${
                        selectedItemHeader === index ? "show" : ""
                      }`}
                      style={{
                        backgroundColor:
                          selectedItemHeader === index ? "#008000" : "",
                      }}
                    ></p>
                  </div>
                  {index !== items.length - 1 && <nav></nav>}
                </li>
              ))}
            </ul>
          </div>

          <div className="btn-individual">
            <ul>
              <li title="Tìm kiếm">
                <a className="head-find" href="">
                  <img className="icon" src={iconFind} alt="Icon Home" />
                </a>
              </li>
              <div>
                <li title="Thông báo">
                  <a className="head-noi" href="">
                    <img className="icon" src={iconNoi} alt="Icon Home" />
                  </a>
                </li>
                <div className="red-point">20</div>
              </div>
              <div>
                <li title="Ảnh đại diện">
                  <a className="head-avatar" href=""></a>
                </li>
                <div className="green-point"></div>
              </div>
            </ul>
          </div>
        </div>
        <div className="content">
          <Assessment sendMessage={receiveDataFromAssessment}/>
        </div>
      </div>
    </div>
  );
}

export default HeadAndSidebar;
