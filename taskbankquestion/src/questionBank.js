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
  faPlus,
  faSleigh,
  faEdit,
  faCheck,
  faTrash,
  faTimes,
  faArrowLeft,
  faEye,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import question from "./question.json";

function App() {
  const [dataQuestion, setDataQuestion] = useState();
  const [listQuestion, setListQuestion] = useState(question.listQuestion);
  const [activeDropdown, setActiveDropDown] = useState(false);
  const [draftChecked, setDraftChecked] = useState(true);
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
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isPopStatusVisible, setIsStatusVisible] = useState(false);
  const [isPopCheckedVisible, setIsCheckedVisible] = useState(false);
  const [dataItemChecked, setDataItemChecked] = useState([]);
  const [isStatusPopChecked, setIsStatusPopChecked] = useState(false);
  const [isStatusHeader, setIsStatusHeader] = useState(false);
  const [functionChecked, setFunctionChecked] = useState([]);

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

  const functionIconMap = {
    1: faEdit,
    2: faCheck,
    3: faTrash,
    4: faCheck,
    5: faArrowLeft,
    6: faTimes,
    7: faEye,
  };

  const functionTitleMap = {
    1: "Chỉnh sửa",
    2: "Gửi duyệt",
    3: "Xóa",
    4: "Duyệt áp dụng",
    5: "Trả về",
    6: "Ngưng hiển thị",
    7: "Xem chi tiết",
  };

  useEffect(() => {
    setDataQuestion(listQuestion);
    setIsDataLoaded(true);
  }, [listQuestion]);

  useEffect(() => {
    setDataItemChecked(dataQuestionChecked);
    if (dataQuestionChecked != 0) {
      setIsStatusPopChecked(true);
      setIsStatusHeader(true);
      setIsCheckedVisible(true);
      getFunctionChecked(dataQuestionChecked);
    } else {
      setIsStatusPopChecked(false);
      setIsStatusHeader(false);
      setIsCheckedVisible(false);
    }
  }, [dataQuestionChecked]);

  const functionMap = {
    update: 1,
    send: 2,
    delete: 3,
    approve: 4,
    return: 5,
    stopDis: 6,
    detail: 7,
  };

  const Icon24px = ({ classIcon, color, size }) => {
    const iconSize = {
      color: color,
      cursor: "pointer",
      fontSize: size,
    };
    return <FontAwesomeIcon icon={classIcon} style={iconSize} />;
  };

  const getFunctionChecked = (data) => {
    const selectedFunctions = [];
    data.forEach((item) => {
      const itemStatus = item.status;
      if (statusOptions[itemStatus]) {
        statusOptions[itemStatus].forEach((option) => {
          if (functionMap[option.action]) {
            selectedFunctions.push(functionMap[option.action]);
          }
        });
      }
    });
    const uniqueFunctions = Array.from(new Set(selectedFunctions));
    setFunctionChecked(uniqueFunctions);
  };

  if (!isDataLoaded) {
    return <div>Loading...</div>;
  }

  function fomatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds}s`;
    } else if (remainingSeconds === 0) {
      return `${minutes}m`;
    } else {
      return `${minutes}m${remainingSeconds}s`;
    }
  }

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handlePopupAction = (action) => {
    const message = messageStatusMap[action];
    if (action == "delete") {
      togglePopup();
    } else if (action == "send") {
      handleSendItem(itemChoose);
    } else if (action == "approve") {
      handleApproveItem(itemChoose);
    } else if (action == "stopDis") {
      handleStopApproveItem(itemChoose);
    } else if (action == "return") {
      handleReturnItem(itemChoose);
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

  const handleSendItem = (idItem) => {
    const updatedItemIndex = dataQuestion.findIndex(
      (item) => item.idQues === idItem
    );
    console.log(updatedItemIndex);
    if (updatedItemIndex !== -1) {
      const updatedItem = { ...dataQuestion[updatedItemIndex] };
      updatedItem.status = 1;
      const newDataQuestion = [...dataQuestion];
      newDataQuestion[updatedItemIndex] = updatedItem;
      setDataQuestion(newDataQuestion);
      setStatus("Gửi duyệt thành công!");
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 3000);
    } else {
      console.error("Lỗi");
    }
  };

  const handleApproveItem = (idItem) => {
    const updatedItemIndex = dataQuestion.findIndex(
      (item) => item.idQues === idItem
    );
    if (updatedItemIndex !== -1) {
      const updatedItem = { ...dataQuestion[updatedItemIndex] };
      updatedItem.status = 2;
      const newDataQuestion = [...dataQuestion];
      newDataQuestion[updatedItemIndex] = updatedItem;
      setDataQuestion(newDataQuestion);
      setStatus("Phê duyệt thành công!");
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 3000);
    } else {
      console.error("Lỗi");
    }
  };

  const handleStopApproveItem = (idItem) => {
    const updatedItemIndex = dataQuestion.findIndex(
      (item) => item.idQues === idItem
    );
    console.log(updatedItemIndex);
    if (updatedItemIndex !== -1) {
      const updatedItem = { ...dataQuestion[updatedItemIndex] };
      updatedItem.status = 3;
      const newDataQuestion = [...dataQuestion];
      newDataQuestion[updatedItemIndex] = updatedItem;
      setDataQuestion(newDataQuestion);
      setStatus("Ngưng hiển thị thành công!");
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 3000);
    } else {
      console.error("Lỗi");
    }
  };

  const handleFunctionClick = (action) => {
    switch (action) {
      case 1:
        console.log("Update action");
        break;
      case 2:
        console.log("Send action");
        break;
      case 3:
        console.log("Delete action");
        const newListItem = dataQuestion.filter((item) => item.status !== 0);
        setDataQuestion(newListItem);
        console.log(newListItem);
        setStatus("Xóa thành công!");
        setIsStatusVisible(true);
        handleUnCheckAll();
        setTimeout(() => {
          setIsStatusVisible(false);
        }, 3000);
        break;
      case 4:
        console.log("Approve action");
        break;
      case 5:
        console.log("Return action");
        break;
      case 6:
        console.log("Stop display action");
        break;
      case 7:
        console.log("Detail action");
        break;
      default:
        break;
    }
  };

  const listItems = functionChecked.map((item, index) => {
    const functionName = functionTitleMap[item];
    // const icon = functionIconMap[item];
    const handleClick = () => {
      handleFunctionClick(item);
    };
    return (
      <li onClick={handleClick} className="itemsFunction" key={index}>
        {/* <Icon24px classIcon={faTrashCan} size={20} color={"white"} /> */}
        <p>icon</p>
        <div>{functionName}</div>
      </li>
    );
  });

  const handleReturnItem = (idItem) => {
    const updatedItemIndex = dataQuestion.findIndex(
      (item) => item.idQues === idItem
    );
    if (updatedItemIndex !== -1) {
      const updatedItem = { ...dataQuestion[updatedItemIndex] };
      updatedItem.status = 4;
      const newDataQuestion = [...dataQuestion];
      newDataQuestion[updatedItemIndex] = updatedItem;
      setDataQuestion(newDataQuestion);
      setStatus("Trả về thành công!");
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 3000);
    } else {
      console.error("Lỗi");
    }
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
    setDataQuenstionChecked([]);
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

  const handleUnCheckAll = () => {
    setDataQuenstionChecked([]);
    setCheckAllChecked(false);
  };

  const filterDataByStatus = (dataList) => {
    let filteredData = dataList;
    const selectedStatus = [];

    if (draftChecked) {
      selectedStatus.push(0);
      selectedStatus.push(4);
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

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  function renderRows(dataList) {
    const filteredData = filterDataByStatus(dataList).filter((item) =>
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
          if (dataQuestionChecked.length === filteredData.length - 1) {
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
            width: "99%",
            alignItems: "center",
            display: "flex",
            padding: "0.5%",
            backgroundColor: isChecked ? "#1A6634B2" : "white",
            marginBottom: 5,
            height: 62,
            zIndex: 0,
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
              alignItems: "center",
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
            <div style={{ fontWeight: "500" }}>{fomatTime(dataItem.time)}</div>
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
            <div
              style={{
                position: "absolute",
                zIndex: 1,
              }}
            >
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

        <div
          className="head-field"
          style={{ pointerEvents: isStatusHeader ? "none" : "auto" }}
        >
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
              <Icon24px classIcon={faPlus} size={20} color={"white"} />
              <a>Thêm mới</a>
            </div>
          </div>
        </div>
        <div
          className="body-data"
          style={{ pointerEvents: isStatusHeader ? "none" : "auto" }}
        >
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
                <option value="1">1</option>
                <option value="2">50</option>
                <option value="3">75</option>
                <option value="4">100</option>
              </select>
            </div>
          </div>
          <div className="footer-page-number">
            <div>
              <a className="firstNumberPage">Đầu</a>
              <a className="itemNumber"> ... </a>
              <a className="lastNumberPage">Cuối</a>
            </div>
          </div>

          {isPopupVisible && (
            <div className="pop-delete-area" onClick={togglePopup}>
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

          {isPopCheckedVisible && (
            <div className="pop-itemchecked-area">
              <div className="popupItemChecked">
                <div className="itemChecked">
                  <div className="numberCheck">
                    <p>{dataQuestionChecked.length}</p>
                  </div>
                  <div className="textCheck">
                    <p>Đã chọn</p>
                  </div>
                </div>
                <ul className="list-function">{listItems}</ul>
                <div className="close-pop-checked" onClick={handleUnCheckAll}>
                  <div>
                    <Icon24px classIcon={faX} size={20} color={"#BDC2D2"} />
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
