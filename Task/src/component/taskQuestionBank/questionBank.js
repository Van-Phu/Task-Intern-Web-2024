import "./questionBank.css";
import iconFind from "../../icon/find-magnifier-search-zoom-look-svgrepo-com.svg";
import iconNoi from "../../icon/bell-svgrepo-com.svg";
import iconFill from "../../icon/filter-svgrepo-com.svg";
import iconFindWhite from "../../icon/find-white.svg";
import iconDownArrow from "../../icon/icon-down-arrow.png";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../panigation/pagination";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";

import {
  faPencil,
  faTriangleExclamation,
  faTrashCan,
  faCircleCheck,
  faPlus,
  faEdit,
  faCheck,
  faTrash,
  faTimes,
  faArrowLeft,
  faEye,
  faX,
  faCircleXmark,
  faChevronDown,
  faListCheck,
  faChevronUp,
  faArrowUpFromBracket,
  faArrowDownTo,
  faDownload,
  faUpload,
  faArrowRight,
  faBan,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

import question from "../../question.json";
function App() {
  //Data đầu
  const [dataQuestion, setDataQuestion] = useState();
  const [listQuestion, setListQuestion] = useState(question.listQuestion);
  const [activeDropdown, setActiveDropDown] = useState(true);
  const [selectedItemHeader, setSelectedItemHeader] = useState(3);
  const [selectedSidebar, setSelectedSidebar] = useState(0);
  //check item
  const [draftChecked, setDraftChecked] = useState(true);
  const [sendChecked, setSendChecked] = useState(false);
  const [browserChecked, setBrowserChecked] = useState(false);
  const [stopBrowserChecked, setStopBrowserChecked] = useState(false);
  const [itemQuestionChecked, setItemQuestionChecked] = useState(false);
  const [dataQuestionChecked, setDataQuenstionChecked] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [checkAllChecked, setCheckAllChecked] = useState(false);
  //search
  const [searchKeyword, setSearchKeyword] = useState("");
  const [itemChoose, setItemChoose] = useState("hello");
  const [searchKey, setSearchKey] = useState("");
  //popups
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isPopStatusVisible, setIsStatusVisible] = useState(false);
  const [isPopCheckedVisible, setIsCheckedVisible] = useState(false);
  const [dataItemChecked, setDataItemChecked] = useState([]);
  const [isPopDeleteChecked, setIsPopDeleteChecked] = useState(false);
  //status
  const [isStatusPopChecked, setIsStatusPopChecked] = useState(false);
  const [isStatusHeader, setIsStatusHeader] = useState(false);
  const [functionChecked, setFunctionChecked] = useState([]);
  const [statusMessage, setStatusMessage] = useState(true);
  const [status, setStatus] = useState("none");
  const [comfirmDeleteChecked, setComfimDeleteChecked] = useState(false);
  //page
  const [currentPage, setCurrentPage] = useState(1);
  const [numShowItem, setNumShowItem] = useState(1);
  const [numberPage, setNumberPage] = useState();
  const [newNumberItem, setNewNumberItem] = useState();
  const handlefunctionStatusRef = useRef(null);
  const [itemDelete, setItemDelete] = useState();
  const [showCheckAll, setShowCheckAll] = useState(true);
  const [numberItemList, setNumberItemList] = useState();
  const [statusPageItem, setStatusPageItem] = useState();

  let numberItem = 0; //total Item in list
  let itemSliceShow = 0;
  let StartIndex = 0;
  let EndIndex = 0;
  let CheckedStatus = false;
  let itemSlice = 0;

  const [sidebarItems, setSidebarItems] = useState([
    {
      label: "Đánh giá nhân sự",
      icon: faListCheck,
      link: "/danh-gia-nhan-su",
      dropdowns: [{ label: "Ngân hàng câu hỏi", link: "/ngan-hang-cau-hoi" }],
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
  const messageStatusMap = {
    failApprove: "Đã xảy ra lỗi khi phê duyệt: Câu hỏi phải đầy đủ thông tin!",
    failSend: "Đã xảy ra lỗi khi gửi: Câu hỏi phải đầy đủ thông tin!",
    faildeltete: "Đã xảy ra lỗi khi xóa: Không được phép xóa câu hỏi này",
    delete: "Xóa thành công!",
    send: "Gửi duyệt thành công!",
    update: "Cập nhật thành công!",
    approve: "Phê duyệt thành công!",
    return: "Trả về thành công!",
    stopDis: "Ngưng hiển thị thành công!",
    detail: "Xem chi tiết!",
  };

  const items = ["Trang chủ", "Thông tin", "Tài chính", "Nhân sự"];

  const statusOptions = {
    0: [
      { label: "Chỉnh sửa", action: "update", icon: faPencil },
      { label: "Gửi duyệt", action: "send", icon: faArrowRight },
      { label: "Xóa", action: "delete", icon: faTrash },
    ],
    1: [
      { label: "Chỉnh sửa", action: "update", icon: faPencil },
      { label: "Phê duyệt", action: "approve", icon: faCheck },
      { label: "Trả về", action: "return", icon: faArrowLeft },
    ],
    2: [
      { label: "Xem chi tiết", action: "detail", icon: faEye },
      { label: "Ngưng hiển thị", action: "stopDis", icon: faBan },
    ],
    3: [
      { label: "Xem chi tiết", action: "detail", icon: faEye },
      { label: "Phê duyệt", action: "approve", icon: faCheck },
      { label: "Trả về", action: "return", icon: faArrowLeft },
    ],
    4: [
      { label: "Chỉnh sửa", action: "update", icon: faPencil },
      { label: "Gửi duyệt", action: "send", icon: faArrowRight },
    ],
  };

  const functionIconMap = {
    1: { icon: faEdit, color: "#959DB3" },
    2: { icon: faCheck, color: "#959DB3" },
    4: { icon: faCheck, color: "#959DB3" },
    5: { icon: faArrowLeft, color: "#959DB3" },
    6: { icon: faTimes, color: "#959DB3" },
    7: { icon: faEye, color: "#959DB3" },
    3: { icon: faTrash, color: "red" },
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

  const functionMap = {
    send: 2,
    delete: 3,
    approve: 4,
    return: 5,
    stopDis: 6,
  };

  const filterData = (dataList) => {
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

  const calculatePageNumber = (newNumberItem, numShowItem) => {
    let pageNum = newNumberItem / numShowItem;
    return pageNum;
  };

  const togglePopupStatusItem = () => {
    setStatusPageItem(!statusPageItem);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSetPage = () => {
    const pageNumSend = Math.ceil(numberItem / numShowItem);
    console.log(currentPage);
    console.log(pageNumSend);
    setNumberPage(pageNumSend);
    if (currentPage >= pageNumSend) {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    handleSetPage();
  }, [statusPageItem]);

  useEffect(() => {
    setDataQuestion(listQuestion);
    setIsDataLoaded(true);
  }, [listQuestion]);

  useEffect(() => {
    const filter = filterData(listQuestion);
    const pageNum = calculatePageNumber(filter.length, numShowItem);
    setNumberPage(pageNum);
    setCurrentPage(1);
    setNumShowItem(numShowItem);
  }, [draftChecked, sendChecked, browserChecked, stopBrowserChecked]);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        handlefunctionStatusRef.current &&
        !handlefunctionStatusRef.current.contains(event.target)
      ) {
        setExpandedIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (CheckedStatus == true) {
      setCheckAllChecked(true);
    } else {
      setCheckAllChecked(false);
    }
  }, [handlePageChange]);

  const changeHeaderFunction = (fun) => {
    setSelectedItemHeader(fun);
    setSelectedSidebar(-1);
    setActiveDropDown(false);
  };

  const handleDraftChecked = () => {
    setCurrentPage(1);
    setDataQuestion((prevDataQuestion) => {
      const filteredData = filterDataByStatus(prevDataQuestion);
      // console.log(filteredData);
      setNewNumberItem(filteredData.length);
      return prevDataQuestion;
    });
    console.log(dataQuestion);
    setDraftChecked(!draftChecked);
    const pageNum = calculatePageNumber(newNumberItem, numShowItem);
    setNumberPage(pageNum);
    setCurrentPage(1);
    setNumShowItem(numShowItem);
  };

  const handleSendChecked = () => {
    setCurrentPage(1);
    setDataQuestion((prevDataQuestion) => {
      const filteredData = filterDataByStatus(prevDataQuestion);
      setNewNumberItem(filteredData.length);
      return prevDataQuestion;
    });
    setSendChecked(!sendChecked);
    const pageNum = calculatePageNumber(newNumberItem, numShowItem);
    setNumberPage(pageNum);
    setCurrentPage(1);
    setNumShowItem(numShowItem);
  };

  const handleBrowserChecked = () => {
    setCurrentPage(1);
    setBrowserChecked(!browserChecked);
    setDataQuestion((prevDataQuestion) => {
      const filteredData = filterDataByStatus(prevDataQuestion);
      setNewNumberItem(filteredData.length);
      return prevDataQuestion;
    });
    let pageNum = newNumberItem / numShowItem;
    setNumberPage(pageNum);
    setCurrentPage(1);
    setNumShowItem(numShowItem);
  };

  const handleStopBrowserChecked = () => {
    setCurrentPage(1);
    setStopBrowserChecked(!stopBrowserChecked);
    setDataQuestion((prevDataQuestion) => {
      const filteredData = filterDataByStatus(prevDataQuestion);
      setNewNumberItem(filteredData.length);
      return prevDataQuestion;
    });
    let pageNum = newNumberItem / numShowItem;
    setNumberPage(pageNum);
    setCurrentPage(1);
    setNumShowItem(numShowItem);
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

  const togglePopupDeleteChecked = () => {
    setIsCheckedVisible(true);
    setIsPopDeleteChecked(!isPopDeleteChecked);
  };
  const getItemDeleteChecked = () => {
    let result = "";
    for (let i = 0; i < dataItemChecked.length; i++) {
      if (dataItemChecked[i].status === 0) {
        if (dataItemChecked[i].idQues == undefined) {
          result += "Không xác định";
        } else {
          result += dataItemChecked[i].idQues;
        }
        if (i < dataItemChecked.length - 1) {
          result += " ,";
        }
      }
    }
    return result;
  };

  const handleDeleteItemChecked = () => {
    const deletedItems = dataQuestion.filter((item) => {
      return !dataQuestionChecked.includes(item) || item.status !== 0;
    });
    setDataQuestion(deletedItems);
    handleUnCheckAll();
    setStatusMessage(true);
    setStatus(messageStatusMap.delete);
    setIsStatusVisible(true);
    setTimeout(() => {
      setIsStatusVisible(false);
    }, 2000);
    togglePopupDeleteChecked();
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
      setStatusMessage(true);
      setStatus(message);
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 2000);
    }
  };

  //delete 1 item
  const handleDeleteItem = (idItem) => {
    const newListItem = dataQuestion.filter((item) => item.idQues !== idItem);
    togglePopupStatusItem();
    setDataQuestion(newListItem);
    setStatusMessage(true);
    setStatus(messageStatusMap.delete);
    setIsStatusVisible(true);
    setTimeout(() => {
      setIsStatusVisible(false);
    }, 2000);
    togglePopup();
  };

  //send 1 item
  const handleSendItem = (idItem) => {
    const data = dataQuestion.find((item) => item.idQues == idItem);
    if (
      data.idQues == undefined ||
      data.question == undefined ||
      data.type == undefined ||
      data.group == undefined ||
      data.status == undefined
    ) {
      setStatusMessage(false);
      setStatus(messageStatusMap.failSend);
      setIsStatusVisible(true);

      setTimeout(() => {
        setIsStatusVisible(false);
      }, 2000);
    } else {
      const updatedItemIndex = dataQuestion.findIndex(
        (item) => item.idQues === idItem
      );
      if (updatedItemIndex !== -1) {
        const updatedItem = { ...dataQuestion[updatedItemIndex] };
        updatedItem.status = 1;
        const newDataQuestion = [...dataQuestion];
        newDataQuestion[updatedItemIndex] = updatedItem;
        setStatusMessage(true);
        setDataQuestion(newDataQuestion);
        console.log(dataQuestion);
        setStatus("Gửi duyệt thành công!");
        setIsStatusVisible(true);
        setTimeout(() => {
          setIsStatusVisible(false);
        }, 2000);
      } else {
        console.error("Lỗi");
      }
    }
  };

  //approve 1 item
  const handleApproveItem = (idItem) => {
    const data = dataQuestion.find((item) => item.idQues == idItem);
    if (
      data.idQues == undefined ||
      data.question == undefined ||
      data.type == undefined ||
      data.group == undefined ||
      data.status == undefined
    ) {
      setStatusMessage(false);
      setStatus(messageStatusMap.failApprove);
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 2000);
    } else {
      const updatedItemIndex = dataQuestion.findIndex(
        (item) => item.idQues === idItem
      );
      if (updatedItemIndex !== -1) {
        const updatedItem = { ...dataQuestion[updatedItemIndex] };
        updatedItem.status = 2;
        const newDataQuestion = [...dataQuestion];
        newDataQuestion[updatedItemIndex] = updatedItem;
        setStatusMessage(true);
        setDataQuestion(newDataQuestion);
        setStatus(messageStatusMap.approve);
        setIsStatusVisible(true);
        setTimeout(() => {
          setIsStatusVisible(false);
        }, 2000);
      } else {
        console.error("Lỗi");
      }
    }
  };

  //stop display 1 item
  const handleStopApproveItem = (idItem) => {
    const updatedItemIndex = dataQuestion.findIndex(
      (item) => item.idQues === idItem
    );
    if (updatedItemIndex !== -1) {
      const updatedItem = { ...dataQuestion[updatedItemIndex] };
      updatedItem.status = 3;
      const newDataQuestion = [...dataQuestion];
      newDataQuestion[updatedItemIndex] = updatedItem;
      setStatusMessage(true);
      setDataQuestion(newDataQuestion);
      setStatus(messageStatusMap.stopDis);
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 2000);
    } else {
      console.error("Lỗi");
    }
  };

  const handleFunctionClick = (action) => {
    const itemSuccess = [];
    switch (action) {
      case 2:
        //Send Action checked
        let foundErrorSend = false;
        const updatedItemsSend = dataQuestion.map((item) => {
          if (
            dataQuestionChecked.includes(item) &&
            item.idQues != undefined &&
            item.question != undefined &&
            item.group != undefined &&
            item.type != undefined &&
            (item.status === 0 || item.status === 4)
          ) {
            if (!foundErrorSend) {
              foundErrorSend = true;
            }
            itemSuccess.push(item.idQues);
            return { ...item, status: 1 };
          } else {
            return item;
          }
        });
        console.log(itemSuccess);
        setDataQuestion(updatedItemsSend);
        const foundSendItem = foundErrorSend;
        handleSetPage();

        if (foundSendItem == true) {
          togglePopupStatusItem();
          setStatusMessage(true);
          setStatus(messageStatusMap.send);
          setIsStatusVisible(true);
          handleUnCheckAll();
          setTimeout(() => {
            setIsStatusVisible(false);
          }, 2000);
          break;
        } else {
          setStatusMessage(false);
          setStatus(messageStatusMap.failSend);
          setIsStatusVisible(true);
          handleUnCheckAll();
          setTimeout(() => {
            setIsStatusVisible(false);
          }, 2000);
          break;
        }

      case 3:
        togglePopupDeleteChecked();
        setIsCheckedVisible(false);
        break;

      case 4:
        let foundError = false;
        const approveItem = dataQuestion.map((item) => {
          if (
            dataQuestionChecked.includes(item) &&
            item.idQues != undefined &&
            item.question != undefined &&
            item.group != undefined &&
            item.type != undefined &&
            (item.status === 1 || item.status === 3)
          ) {
            if (!foundError) {
              foundError = true;
            }
            itemSuccess.push(item.idQues);
            return { ...item, status: 2 };
          } else {
            return item;
          }
        });
        console.log(itemSuccess);
        setDataQuestion(approveItem);
        const foundApprovedItem = foundError;
        if (foundApprovedItem == true) {
          togglePopupStatusItem();
          setStatusMessage(true);
          setStatus(messageStatusMap.approve);
          setIsStatusVisible(true);
          handleUnCheckAll();
          setTimeout(() => {
            setIsStatusVisible(false);
          }, 2000);
          break;
        } else {
          setStatusMessage(false);
          setStatus(messageStatusMap.failApprove);
          setIsStatusVisible(true);
          handleUnCheckAll();
          setTimeout(() => {
            setIsStatusVisible(false);
          }, 2000);
          break;
        }

      case 5:
        //return Action checked
        const returnItem = dataQuestion.map((item) => {
          if (
            dataQuestionChecked.includes(item) &&
            (item.status === 1 || item.status === 3)
          ) {
            itemSuccess.push(item.idQues);
            return { ...item, status: 4 };
          }
          return item;
        });
        togglePopupStatusItem();
        console.log(itemSuccess);
        handleSetPage();
        setStatusMessage(true);
        setDataQuestion(returnItem);
        setStatus(messageStatusMap.return);
        setIsStatusVisible(true);
        handleUnCheckAll();
        setTimeout(() => {
          setIsStatusVisible(false);
        }, 2000);
        break;
      case 6:
        const stopItem = dataQuestion.map((item) => {
          if (dataQuestionChecked.includes(item) && item.status === 2) {
            itemSuccess.push(item.idQues);
            return { ...item, status: 3 };
          }
          return item;
        });
        togglePopupStatusItem();
        console.log(itemSuccess);
        handleSetPage();
        setStatusMessage(true);
        setDataQuestion(stopItem);
        setStatus(messageStatusMap.stopDis);
        setIsStatusVisible(true);
        handleUnCheckAll();
        setTimeout(() => {
          setIsStatusVisible(false);
        }, 2000);
        break;
    }
  };

  const listItems = functionChecked.map((item, index) => {
    const functionName = functionTitleMap[item];
    const functionIcon = functionIconMap[item];
    const handleClick = () => {
      handleFunctionClick(item);
    };
    return (
      <li onClick={handleClick} className="itemsFunction" key={index}>
        <div>
          {
            <FontAwesomeIcon
              icon={functionIcon.icon}
              style={{
                color: functionIcon.color,
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            />
          }
          <div className="itemFunctionName">{functionName}</div>
        </div>
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
      setStatusMessage(true);
      setDataQuestion(newDataQuestion);
      setStatus(messageStatusMap.return);
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 2000);
    } else {
      console.error("Lỗi");
    }
  };

  const handlePopupClick = (event) => {
    event.stopPropagation();
  };

  const handleDropdowm = () => {
    setActiveDropDown(!activeDropdown);
  };

  const handleCheckAll = (numItem) => {
    let startIndex = Number(numItem) * Number(currentPage) - Number(numItem);
    setCheckAllChecked(!checkAllChecked);
    const visibleItems = filterDataByStatus(dataQuestion).slice(
      startIndex,
      startIndex + Number(numItem)
    );

    if (!checkAllChecked) {
      const newDataQuestionChecked = visibleItems.filter(
        (item) =>
          !dataQuestionChecked.some(
            (checkedItem) => checkedItem.idQues === item.idQues
          )
      );
      setDataQuenstionChecked((prevItems) => [
        ...prevItems,
        ...newDataQuestionChecked,
      ]);

      const allItemsChecked = visibleItems.every((item) =>
        dataQuestionChecked.some(
          (checkedItem) => checkedItem.idQues === item.idQues
        )
      );

      if (allItemsChecked) {
        setShowCheckAll(true);
      } else {
        setShowCheckAll(false);
      }
    } else {
      const newDataQuestionChecked = dataQuestionChecked.filter(
        (item) =>
          !visibleItems.some(
            (visibleItem) => visibleItem.idQues === item.idQues
          )
      );
      setDataQuenstionChecked(newDataQuestionChecked);
      setShowCheckAll(true);
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
    let pageNum = numberItem / selectedValue;
    pageNum = Math.ceil(pageNum);
    setNumberPage(pageNum);
    setCurrentPage(1);
    setNumShowItem(selectedValue);
  };

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchButtonClick = (searchKeyword) => {
    togglePopupStatusItem();
    // handleSetPage();
    setSearchKey(searchKeyword);
  };

  const handleResetFilter = () => {
    setDraftChecked(true);
    setSendChecked(false);
    setStopBrowserChecked(false);
    setBrowserChecked(false);
    setStopBrowserChecked(false);
    setSearchKeyword("");
    handleSearchButtonClick("");
    // setNumShowItem(25);
  };

  function renderRows(dataList) {
    const filteredData = filterDataByStatus(dataList).filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchKey.toLowerCase())
      )
    );

    numberItem = filteredData.length;
    const startIndex = (currentPage - 1) * numShowItem;
    const endIndex = Number(startIndex) + Number(numShowItem);
    const slicedData = filteredData.slice(startIndex, endIndex);
    itemSliceShow = slicedData.length;
    StartIndex = startIndex;
    EndIndex = endIndex;
    const handlefunctionStatus = (status) => {
      return (
        <div
          style={{
            width: "100%",
            marginRight: 230,
            marginTop: status === 2 || status == 4 ? 60 : 110,
            zIndex: 9999,
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
                  justifyContent: "left",
                  cursor: "pointer",
                  zIndex: 9999,
                }}
              >
                <div style={{ paddingLeft: 20 }}>
                  <Icon24px classIcon={option.icon} color={"#FFFFFF"} />
                </div>

                <a
                  style={{
                    color: "white",
                    marginLeft: 20,
                    fontSize: 14,
                    cursor: "pointer",
                    paddingRight: 20,
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

    const allChecked = slicedData.every((item) =>
      dataQuestionChecked.includes(item)
    );
    CheckedStatus = allChecked;
    itemSlice = slicedData.length;

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

      const handleItemClick = () => {
        setItemDelete(dataItem);
        if (expandedIndex === index) {
          setExpandedIndex(null);
          setItemQuestionChecked(!itemQuestionChecked);
        } else {
          setExpandedIndex(index);
          setItemQuestionChecked(!itemQuestionChecked);
        }
      };

      const handleItemChecked = (event, item) => {
        const isChecked = event.target.checked;
        if (isChecked) {
          setDataQuenstionChecked((prevItems) => [...prevItems, item]);
          if (dataQuestionChecked.length === numShowItem - 1) {
            setCheckAllChecked(true);
          } else if (filteredData.length === dataQuestionChecked.length + 1) {
            setCheckAllChecked(true);
          }
        } else {
          setCheckAllChecked(false);
          setDataQuenstionChecked((prevItems) =>
            prevItems.filter((checkedItem) => checkedItem.id !== item.id)
          );
        }
      };

      return (
        <div
          key={index}
          className={`rowItem ${isChecked ? "selected" : ""}`}
          style={{
            backgroundColor: isChecked ? "#1A6634B2" : "",
            width: "100%",
            overflowY: "scroll",
          }}
        >
          <input
            className="input-item"
            onChange={(event) => handleItemChecked(event, dataItem)}
            style={{ width: 15, cursor: "pointer" }}
            type="checkbox"
            checked={isChecked}
          />
          <div
            style={{
              width: "52%",
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              height: 62,
              marginRight: "2%",
            }}
          >
            <div style={{ height: "100%", width: "100%" }}>
              <div>
                <div
                  title={dataItem.question}
                  style={{
                    fontSize: 14,
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
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <div>
                  <div
                    title={dataItem.idQues}
                    style={{
                      fontSize: 14,
                      marginLeft: 10,
                      marginRight: 10,
                      display: dataItem.idQues != undefined ? "block" : "none",
                    }}
                  >
                    {dataItem.idQues}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    height: 20,
                    width: 1,

                    display: dataItem.idQues != undefined ? "block" : "none",
                  }}
                ></div>
                <div
                  style={{
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                >
                  <p>Dạng câu hỏi: &nbsp;</p>
                  <div title={dataItem.type}>{dataItem.type}</div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "13%",
              height: "100%",
              justifyContent: "left",
              display: "flex",
              alignItems: "center",
              marginRight: "2%",
            }}
          >
            <div title={dataItem.group} style={{ fontSize: 14 }}>
              {dataItem.group}
            </div>
          </div>
          <div
            style={{
              width: "10%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              marginLeft: "3%",
            }}
          >
            <div title={dataItem.time} style={{ fontWeight: "500" }}>
              {fomatTime(dataItem.time)}
            </div>
          </div>
          <div
            style={{
              width: "15%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
              fontSize: 14,
            }}
            title={dataItem.status}
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
              width: "5%",
              borderLeft: "solid",
              marginLeft: "2%",
              paddingTop: 10,
              borderColor: "#BDC2D2",
              paddingBottom: 10,
              borderWidth: 1,
            }}
          >
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
                position: "relative",
              }}
            >
              <div style={{ marginRight: 20 }}>
                <Icon24px classIcon={faEllipsis} size={20} color={"#959DB3"} />
              </div>
            </div>
            <div
              className="itemAbsolute"
              style={{
                position: "absolute",
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
              style={{ backgroundColor: statusMessage ? "#1a6634" : "#FD7676" }}
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

        <div
          className="body-data"
          style={{
            pointerEvents: isStatusHeader ? "none" : "auto",
            display: selectedSidebar == 0 ? "" : "none",
          }}
        >
          <div className="data-icon">
            <img className="icon" src={iconFill} alt="Icon Home" />
            <div></div>
          </div>
          <div className="data-reset">
            <div>
              <p>Lọc dữ liệu</p>
              <a onClick={handleResetFilter}>Reset bộ lộc</a>
            </div>
          </div>
          <div className="data-find">
            <p>Tìm kiếm</p>
            <div>
              <div className="input-find">
                <img className="icon" src={iconFind} alt="Icon Home" />
                <input
                  value={searchKeyword}
                  id="inputSearch"
                  className="input-find"
                  onChange={handleSearchInputChange}
                  placeholder="Tìm theo mã và câu hỏi"
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchButtonClick(searchKeyword);
                    }
                  }}
                />
              </div>

              <div
                onClick={() => handleSearchButtonClick(searchKeyword)}
                className="btn-find"
              >
                <img className="icon" src={iconFindWhite} alt="Icon Home" />
                <a>Tìm</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 5 }} className="under-line"></div>
        <div
          style={{ display: selectedSidebar == 0 ? "" : "none" }}
          className="body-content"
        >
          <div className="head-list">
            <div className="head-question">
              <div className="head-question-input">
                <input
                  type="checkbox"
                  checked={checkAllChecked}
                  onChange={() => handleCheckAll(numShowItem)}
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

        <div
          style={{ display: selectedSidebar == 0 ? "" : "none" }}
          className="footer"
        >
          <div
            style={{ pointerEvents: isStatusHeader ? "none" : "auto" }}
            className="footer-page-show"
          >
            <p>Hiển thị mỗi trang</p>
            <div class="dropup">
              <select
                onChange={getValueNumPage}
                id="numberShow"
                value={numShowItem}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="25">25</option>
              </select>
            </div>
          </div>
          <div
            // style={{ pointerEvents: isStatusHeader ? "none" : "auto" }}
            className="footer-page-number"
          >
            <div>
              <Pagination
                currentPage={currentPage}
                totalPages={numberPage}
                onPageChange={handlePageChange}
              />
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
                      <div className="itemChoose" title={itemDelete.question}>
                        {itemDelete.question}
                      </div>
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

          {isPopDeleteChecked && (
            <div className="pop-delete-area" onClick={togglePopupDeleteChecked}>
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
                      <div className="itemChoose">
                        <p>{getItemDeleteChecked()}</p>
                      </div>
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
                    <button
                      className="btn-cancel"
                      onClick={togglePopupDeleteChecked}
                    >
                      KHÔNG XÓA
                    </button>
                    <button
                      className="btn-delete"
                      onClick={handleDeleteItemChecked}
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
