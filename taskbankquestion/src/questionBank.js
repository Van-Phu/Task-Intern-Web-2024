import "./questionBank.css";
import iconHome from "./icon/home-svgrepo-com.svg";
import iconFind from "./icon/find-magnifier-search-zoom-look-svgrepo-com.svg";
import iconNoi from "./icon/bell-svgrepo-com.svg";
import iconExport from "./icon/export-svgrepo-com.svg";
import iconImport from "./icon/import-svgrepo-com.svg";
import iconFill from "./icon/filter-svgrepo-com.svg";
import iconFindWhite from "./icon/find-white.svg";
import iconThreeDot from "./icon/three-dot.png";
import iconDownArrow from "./icon/icon-down-arrow.png";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTriangleExclamation,
  faTrashCan,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import question from "./question.json";

function App() {
  const [dataQuestion, setDataQuestion] = useState();
  const [listQuestion, setListQuestion] = useState();
  const [activeDropdown, setActiveDropDown] = useState(false);
  const [draftChecked, setDraftChecked] = useState(false);
  const [sendChecked, setSendChecked] = useState(false);
  const [browserChecked, setBrowserChecked] = useState(false);
  const [stopBrowserChecked, setStopBrowserChecked] = useState(false);
  const [itemQuestionChecked, setItemQuestionChecked] = useState(false);
  const [dataQuestionChecked, setDataQuenstionChecked] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [numShowItem, setNumShowItem] = useState(25);
  const [checkAllChecked, setCheckAllChecked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [itemChoose, setItemChoose] = useState();
  const [statusFunction, setStatusFunction] = useState();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [isPopStatusVisible, setIsStatusVisible] = useState(false);
  const [status, setStatus] = useState("none");

  const messageStatusMap = {
    delete: "Xóa thành công!",
    send: "Gửi duyệt thành công!",
    update: "Cập nhật thành công!",
    approve: "Phê duyệt thành công!",
    return: "Trả về thành công!",
    stopDis: "Ngưng hiển thị thành công!",
    detail: "Xem chi tiết!",
  };

  useEffect(() => {
    setDataQuestion(question.listQuestion);
    setIsDataLoaded(true);
  }, []);

  if (!isDataLoaded) {
    return <div>Loading...</div>;
  }

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const togglePopupStatus = () => {
    setIsStatusVisible(!isPopStatusVisible);
  };

  const handlePopupAction = (action) => {
    const message = messageStatusMap[action];
    if (action == "delete") {
      togglePopup();
    } else {
      setStatus(message);
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 3000);
    }
  };

  const handleDeleteItem = (idItem) => {
    const newListItem = dataQuestion.filter((item) => item.idQues !== idItem);
    setDataQuestion(newListItem);
    setStatus("Xóa thành công!");
    setIsStatusVisible(true);
    setTimeout(() => {
      setIsStatusVisible(false);
    }, 3000);
    togglePopup();
  };

  const handlePopupClick = (event) => {
    event.stopPropagation();
  };

  const handleDraftChecked = () => {
    setDraftChecked(!draftChecked);
  };

  const handleSendChecked = () => {
    setSendChecked(!sendChecked);
  };

  const handleBrowserChecked = () => {
    setBrowserChecked(!browserChecked);
  };

  const handleStopBrowserChecked = () => {
    setStopBrowserChecked(!stopBrowserChecked);
  };

  const handleDropdowm = () => {
    setActiveDropDown(!activeDropdown);
  };

  const handleResetFilter = () => {
    setDraftChecked(false);
    setSendChecked(false);
    setStopBrowserChecked(false);
    setBrowserChecked(false);
    setStopBrowserChecked(false);
    setSearchKeyword("");
  };

  const handleCheckAll = () => {
    setCheckAllChecked(!checkAllChecked);
    if (checkAllChecked == false) {
      for (let i = 0; i < dataQuestion.length; i++) {
        setDataQuenstionChecked((prevItems) => [...prevItems, dataQuestion[i]]);
      }
    } else if (checkAllChecked == true) {
      for (let i = 0; i < dataQuestion.length; i++) {
        setDataQuenstionChecked([]);
      }
    }
  };

  const filterDataByStatus = (dataList) => {
    let filteredData = dataList;
    const selectedStatus = [];

    if (draftChecked) {
      selectedStatus.push(0);
    }
    if (sendChecked) {
      selectedStatus.push(1);
    }
    if (browserChecked) {
      selectedStatus.push(2);
    }
    if (stopBrowserChecked) {
      selectedStatus.push(3);
    }

    if (selectedStatus.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectedStatus.includes(item.status)
      );
    }
    return filteredData;
  };

  const getValueNumPage = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue > numShowItem) {
      setNumShowItem(dataQuestion.length);
    } else {
      setNumShowItem(selectedValue);
    }
  };

  const Icon24px = ({ classIcon, color, size }) => {
    const iconSize = {
      color: color,
      cursor: "pointer",
      fontSize: size,
    };
    return <FontAwesomeIcon icon={classIcon} style={iconSize} />;
  };

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  function renderRows(dataList) {
    const filteredData = filterDataByStatus(dataQuestion).filter((item) =>
      item.question.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    const slicedData = filteredData.slice(0, numShowItem);

    return slicedData.map((dataItem, index) => {
      const isChecked = dataQuestionChecked.includes(dataItem);
      const handleStatus = (status) => {
        if (status == "0") {
          return <p style={{}}>Đang soạn thảo</p>;
        } else if (status == "1") {
          return <p style={{ color: "#31ADFF" }}>Đã duyệt</p>;
        } else if (status == "2") {
          return <p style={{ color: "#008000" }}>Duyệt áp dụng</p>;
        } else if (status == "3") {
          return <p style={{ color: "#FB311C" }}>Ngưng áp dụng</p>;
        } else if (status == "4") {
          return <p style={{ color: "#B7B92F" }}>Trả về</p>;
        }
      };

      const handlefunctionStatus = (status) => {
        const statusOptions = {
          0: [
            { label: "Chỉnh sửa", action: "update" },
            { label: "Gửi duyệt", action: "send" },
            { label: "Xóa", action: "delete" },
          ],
          1: [
            { label: "Chỉnh sửa", action: "update" },
            { label: "Phê duyệt", action: "approve" },
            { label: "Trả về", action: "return" },
          ],
          2: [
            { label: "Xem chi tiết", action: "detail" },
            { label: "Ngưng hiển thị", action: "stopDis" },
          ],
          3: [
            { label: "Xem chi tiết", action: "detail" },
            { label: "Phê duyệt", action: "approve" },
            { label: "Trả về", action: "return" },
          ],
          4: [
            { label: "Chỉnh sửa", action: "update" },
            { label: "Gửi duyệt", action: "send" },
          ],
        };
        return (
          <div
            style={{
              width: "100%",
              marginRight: 220,
              marginTop: status === 2 || status == 4 ? 60 : 110,
              zIndex: 999,
            }}
          >
            <ul>
              {statusOptions[status].map((option, index) => (
                <li
                  key={index}
                  onClick={() => handlePopupAction(option.action)}
                  style={{
                    backgroundColor: "#BDC2D2",
                    width: 170,
                    height: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Icon24px classIcon={faPencil} color={"#FFFFFF"} />
                  <a
                    style={{
                      color: "white",
                      marginLeft: 10,
                      fontSize: 18,
                      cursor: "pointer",
                    }}
                  >
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      };

      const handleItemClick = () => {
        if (expandedIndex === index) {
          setExpandedIndex(null);
          setItemQuestionChecked(!itemQuestionChecked);
        } else {
          setExpandedIndex(index);
          setItemQuestionChecked(!itemQuestionChecked);
        }
      };

      const handleItemChecked = (event) => {
        const itemId = filteredData[index];
        const isChecked = event.target.checked;
        if (isChecked) {
          setDataQuenstionChecked((prevItems) => [...prevItems, itemId]);
          if (dataQuestionChecked.length == filteredData.length - 1) {
            setCheckAllChecked(true);
          }
        } else {
          setCheckAllChecked(false);
          setDataQuenstionChecked((prevItems) =>
            prevItems.filter((item) => item !== itemId)
          );
        }
      };
      return (
        <div
          key={index}
          className={`rowItem ${isChecked ? "selected" : ""}`}
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            padding: "0.5%",
            backgroundColor: isChecked ? "#1A6634B2" : "white",
            marginBottom: 5,
            height: 62,
            zIndex: 1,
          }}
        >
          <input
            onChange={(event) => handleItemChecked(event, index)}
            style={{ width: "1%" }}
            type="checkbox"
            checked={isChecked}
          />
          <div
            style={{
              width: "54%",
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              height: 62,
            }}
          >
            <div style={{ height: "100%", width: "100%" }}>
              <div>
                <div
                  style={{
                    marginLeft: "1%",
                    fontWeight: "600",
                    textOverflow: "ellipsis",
                    width: 500,
                    whiteSpace: "nowrap",
                    overflow: "hide",
                  }}
                >
                  {dataItem.question}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <div>
                  <div style={{ marginLeft: 20, marginRight: 10 }}>
                    {dataItem.idQues}
                  </div>
                </div>
                <div
                  style={{ height: 20, width: 1, backgroundColor: "#C4C4C4" }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                >
                  <p>Dạng câu hỏi: &nbsp;</p>
                  <div>{dataItem.type}</div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "15%",
              height: "100%",
              justifyContent: "left",
              display: "flex",
              alignItems: "left",
            }}
          >
            <div style={{}}>{dataItem.group}</div>
          </div>
          <div
            style={{
              width: "13%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontWeight: "500" }}>{dataItem.time}</div>
          </div>
          <div
            style={{
              width: "15%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            {handleStatus(dataItem.status)}
          </div>
          <div
            onClick={handleItemClick}
            style={{
              height: "100%",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              width: "7%",
            }}
          >
            <div
              style={{ height: "100%", width: 1, backgroundColor: "#C4C4C4" }}
            ></div>
            <div
              onClick={() => setItemChoose(dataItem.idQues)}
              style={{
                height: 40,
                width: 40,
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                backgroundColor: expandedIndex === index ? "#BDC2D2" : "",
                marginLeft: 20,
              }}
            >
              <img
                style={{ height: 20, width: 20 }}
                src={iconThreeDot}
                alt="Icon Home"
              />
            </div>
            <div style={{ position: "absolute", zIndex: 1 }}>
              {expandedIndex === index && handlefunctionStatus(dataItem.status)}
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="all-page">
      <div className="side-bar">
        <div className="logo">
          <div className="image"></div>
          <img className="logo-arrow" src={iconDownArrow} />
        </div>
        <div className="content-side-bar">
          <ul>
            <li onClick={handleDropdowm}>
              <img className="icon" src={iconHome} alt="Icon Home" />

              <a>ĐÁNH GIÁ NHÂN SỰ</a>
              <div className={`dropdown ${activeDropdown ? "active" : ""}`}>
                <Icon24px classIcon={faPencil} color={"#FFFFFF"} />
                <a href="">Ngân hàng câu hỏi</a>
              </div>
            </li>
          </ul>
        </div>
        {isPopStatusVisible && (
          <div className="popStatus-area">
            <div className="popStatus">
              <Icon24px classIcon={faCircleCheck} size={25} color={"white"} />
              <p>{status}</p>
            </div>
          </div>
        )}
      </div>

      <div className="content-area">
        <div className="head-action">
          <div className="btn-location">
            <ul>
              <li>
                <a href="">------------</a>
                <nav></nav>
              </li>
              <li>
                <a href="">------------</a>
                <nav></nav>
              </li>
              <li>
                <a href="">------------</a>
                <nav></nav>
              </li>
              <li>
                <a href="">------------</a>
                <nav></nav>
              </li>
              <li>
                <a href="">------------</a>
                <nav></nav>
              </li>
              <li>
                <a href="">------------</a>
                <nav></nav>
              </li>
              <li>
                <a href="">------------</a>
                <nav></nav>
              </li>
              <li>
                <a href="">Nhân sự</a>
              </li>
            </ul>
          </div>
          <div className="btn-individual">
            <ul>
              <li>
                <a className="head-find" href="">
                  <img className="icon" src={iconFind} alt="Icon Home" />
                </a>
              </li>
              <div>
                <li>
                  <a className="head-noi" href="">
                    <img className="icon" src={iconNoi} alt="Icon Home" />
                  </a>
                </li>
                <div className="red-point">20</div>
              </div>
              <div>
                <li>
                  <a className="head-avatar" href=""></a>
                </li>
                <div className="green-point"></div>
              </div>
            </ul>
          </div>
        </div>

        <div className="head-field">
          <div className="field-check">
            <div
              onClick={handleDraftChecked}
              id={draftChecked && "draftChecked"}
            >
              <a>Đang soạn thảo</a>
              <input
                checked={draftChecked}
                id="checkbox"
                value="draft"
                onChange={handleDraftChecked}
                type="checkbox"
              />
            </div>

            <div onClick={handleSendChecked} id={sendChecked && "sendChecked"}>
              <a>Gửi duyệt</a>
              <input
                checked={sendChecked}
                id="checkbox"
                value="draft"
                onChange={handleSendChecked}
                type="checkbox"
              />
            </div>

            <div
              onClick={handleBrowserChecked}
              id={browserChecked && "browserChecked"}
            >
              <a>Đã duyệt</a>
              <input
                checked={browserChecked}
                id="checkbox"
                value="draft"
                onChange={handleBrowserChecked}
                type="checkbox"
              />
            </div>

            <div
              onClick={handleStopBrowserChecked}
              id={stopBrowserChecked && "stopBrowserChecked"}
            >
              <a>Ngưng áp dụng</a>
              <input
                checked={stopBrowserChecked}
                id="checkbox"
                value="draft"
                onChange={handleStopBrowserChecked}
                type="checkbox"
              />
            </div>
          </div>
          <div className="field-btn">
            <div className="field-uploand">
              <img className="icon" src={iconExport} alt="Icon Home" />
            </div>

            <div className="field-downloand">
              <img className="icon" src={iconImport} alt="Icon Home" />
              <a>Template</a>
            </div>

            <div className="field-addNew">
              <icon>+</icon>
              <a>Thêm mới</a>
            </div>
          </div>
        </div>
        <div className="body-data">
          <div className="data-icon">
            <img className="icon" src={iconFill} alt="Icon Home" />
            <div></div>
          </div>
          <div className="data-reset">
            <div>
              <p>Lọc dữ liệu</p>
              <a onClick={handleResetFilter}>Reset bộ lộc</a>
            </div>
          </div>
          <div className="data-find">
            <p>Tìm kiếm</p>
            <div>
              <div className="input-find">
                <img className="icon" src={iconFind} alt="Icon Home" />
                <input
                  className="input-find"
                  onChange={handleSearchInputChange}
                  placeholder="Tìm theo mã và câu hỏi"
                  type="text"
                />
              </div>

              <div className="btn-find">
                <img className="icon" src={iconFindWhite} alt="Icon Home" />
                <a>Tìm</a>
              </div>
            </div>
          </div>
        </div>

        <div className="body-content">
          <div className="head-list">
            <div className="head-question">
              <div className="head-question-input">
                <input
                  type="checkbox"
                  checked={checkAllChecked}
                  onChange={handleCheckAll}
                />
              </div>
              <div>
                <p>Câu hỏi </p>
              </div>
            </div>
            <p className="head-group">Phân nhóm</p>
            <p className="head-time">Thời gian</p>
            <p className="head-status">Tình trạng</p>
            {/* <p className="head-end">Tình trạng</p> */}
          </div>
          <div className="body-list">
            <div className="list">{renderRows(dataQuestion)}</div>
          </div>
        </div>

        <div className="footer">
          <div className="footer-page-show">
            <p>Hiển thị mỗi trang</p>
            <div class="dropup">
              <select onChange={getValueNumPage} id="numberShow">
                <option value="1">25</option>
                <option value="2">50</option>
                <option value="3">75</option>
                <option value="4">100</option>
              </select>
            </div>
          </div>
          <div className="footer-page-number">
            <div>
              <a>Đầu</a>
            </div>
          </div>

          {isPopupVisible && (
            <div className="pop-area" onClick={togglePopup}>
              <div className="pop-up">
                <div className="pop-content" onClick={handlePopupClick}>
                  <div className="head-pop-delete">
                    <Icon24px
                      classIcon={faTriangleExclamation}
                      color={"#FD7676"}
                      size={20}
                    />
                    <p>Xóa câu hỏi</p>
                  </div>
                  <div className="body-pop-delete" onClick={handlePopupClick}>
                    <div>
                      <p>Bạn có chắc chắn muốn xóa phân nhóm</p>
                      <p className="itemChoose">HachaHahca</p>
                    </div>
                    <div>
                      <p>
                        Đơn vị bạn xóa sẽ{" "}
                        <span style={{ color: "#fd7676" }}>
                          &#160; KHÔNG &#160;
                        </span>{" "}
                        thể khôi phục lại
                      </p>
                    </div>
                  </div>
                  <div className="footer-pop-delete">
                    <button className="btn-cancel" onClick={togglePopup}>
                      KHÔNG XÓA
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteItem(itemChoose)}
                    >
                      <Icon24px
                        classIcon={faTrashCan}
                        size={25}
                        color={"white"}
                      />
                      <p>XÓA</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
