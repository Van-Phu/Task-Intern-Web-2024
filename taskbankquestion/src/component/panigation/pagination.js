import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./pagination.css";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const Icon24px = ({ classIcon, color, size }) => {
    const iconSize = {
      color: color,
      cursor: "pointer",
      fontSize: size,
    };
    return <FontAwesomeIcon icon={classIcon} style={iconSize} />;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleEllipsisNextClick = () => {
    let nextPage = 0;
    if (currentPage == 1) {
      nextPage += currentPage + 4;
    } else {
      nextPage += currentPage + 3;
    }

    onPageChange(nextPage);
  };

  const handleEllipsisPrevClick = () => {
    let nextPage = currentPage - 3;
    onPageChange(nextPage);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    if (totalPages <= 1) {
      buttons.push(
        <button
          style={{
            backgroundColor: currentPage == 1 ? "#F4F5F7" : "#FFFFFF",
            backgroundColor: "#F4F5F7",
            border: "none",
            marginRight: 5,
            borderRadius: 5,
            fontSize: 14,
            padding: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
          }}
          key="first"
        >
          Đầu
        </button>
      );
      buttons.push(
        <button
          style={{
            backgroundColor: currentPage == 1 ? "#F4F5F7" : "#FFFFFF",
            border: "none",
            marginRight: 10,
            cursor: "poiter",
          }}
          key="prev"
          onClick={handlePrevPage}
        >
          <Icon24px classIcon={faChevronLeft} size={14} color={"#959DB3"} />
        </button>
      );
      buttons.push(
        <button
          key={1}
          style={{
            backgroundColor: currentPage === 1 ? "#959DB3" : "",
            border: "none",
            margin: "0 5px",
            borderRadius: 5,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
          }}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      buttons.push(
        <button
          style={{
            marginLeft: 10,
            border: "none",
            backgroundColor: "#F4F5F7",
            backgroundColor: currentPage == totalPages ? "#F4F5F7" : "#F4F5F7",
            cursor: "default",
          }}
          key="next"
          onClick={handleNextPage}
        >
          <Icon24px
            style={{ cursor: "default" }}
            classIcon={faChevronRight}
            size={14}
            color={"#959DB3"}
          />
        </button>
      );
      buttons.push(
        <button
          style={{
            marginLeft: 10,
            border: "none",
            backgroundColor: "#F4F5F7",
            borderRadius: 5,
            fontSize: 14,
            backgroundColor: currentPage == totalPages ? "#F4F5F7" : "#F4F5F7",
            cursor: "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
          }}
          key="last"
        >
          Cuối
        </button>
      );
    } else if (totalPages <= 3) {
      buttons.push(
        <button
          style={{
            backgroundColor: currentPage == 1 ? "#F4F5F7" : "#FFFFFF",
            border: "none",
            marginRight: 5,
            borderRadius: 5,
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
          }}
          key="first"
          onClick={() => onPageChange(1)}
        >
          Đầu
        </button>
      );
      buttons.push(
        <button
          style={{
            border: "none",
            marginRight: 10,
            fontSize: 14,
            backgroundColor: "#F4F5F7",
            backgroundColor: currentPage == 1 ? "#F4F5F7" : "#FFFFFF",
            cursor: "pointer",
          }}
          key="prev"
          onClick={handlePrevPage}
        >
          <Icon24px classIcon={faChevronLeft} size={14} color={"#959DB3"} />
        </button>
      );
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            style={{
              backgroundColor: currentPage === i ? "#959DB3" : "",
              border: "none",
              margin: "0 5px",
              borderRadius: 5,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 30,
            }}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
      buttons.push(
        <button
          style={{
            marginLeft: 10,
            border: "none",
            backgroundColor: "#F4F5F7",
            fontSize: 14,
            backgroundColor: currentPage == totalPages ? "#FFFFFF" : "#FFFFFF",
            cursor: "pointer",
          }}
          key="next"
          onClick={handleNextPage}
        >
          <Icon24px classIcon={faChevronRight} size={14} color={"#959DB3"} />
        </button>
      );
      buttons.push(
        <button
          style={{
            marginLeft: 10,
            border: "none",
            backgroundColor: "#F4F5F7",
            borderRadius: 5,
            fontSize: 18,
            backgroundColor: currentPage == totalPages ? "#F4F5F7" : "#FFFFFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
          }}
          key="last"
          onClick={() => onPageChange(totalPages)}
        >
          Cuối
        </button>
      );
    } else {
      buttons.push(
        <button
          style={{
            backgroundColor: "#fff",
            border: "none",
            marginRight: 5,
            fontSize: 14,
            borderRadius: 5,
            backgroundColor: currentPage == 1 ? "#F4F5F7" : "#FFFFFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
          }}
          key="first"
          onClick={() => onPageChange(1)}
        >
          Đầu
        </button>
      );

      buttons.push(
        <button
          style={{
            border: "none",
            marginRight: 10,
            backgroundColor: "#FFFFFF",
            fontSize: 14,
            backgroundColor: currentPage == 1 ? "#F4F5F7" : "#FFFFFF",
            cursor: "pointer",
          }}
          key="prev"
          onClick={handlePrevPage}
        >
          <Icon24px classIcon={faChevronLeft} size={14} color={"#959DB3"} />
        </button>
      );

      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              style={{
                backgroundColor: currentPage === i ? "#959DB3" : "",
                border: "none",
                margin: "0 5px",
                borderRadius: 5,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
              }}
            >
              {i}
            </button>
          );
        }
        if (currentPage !== 0 && totalPages > 5) {
          buttons.push(
            <button
              style={{
                border: "none",
                background: "#edeff3",
                margin: "0 5px",
                borderRadius: 5,
                fontSize: 20,
                fontSize: 14,
                backgroundColor: currentPage == 1 ? "#FFFFFF" : "#FFFFFF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
              }}
              key="ellipsis-start"
              // disabled
              onClick={handleEllipsisNextClick}
            >
              ...
            </button>
          );
        }
      } else if (currentPage >= totalPages - 2) {
        if (totalPages > 5) {
          buttons.push(
            <button
              style={{
                border: "none",
                background: "#edeff3",
                margin: "0 5px",
                borderRadius: 5,
                borderRadius: 5,
                fontSize: 14,
                backgroundColor: currentPage == 1 ? "#F4F5F7" : "#FFFFFF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
              }}
              key="ellipsis-end"
              // disabled
              onClick={handleEllipsisPrevClick}
            >
              ...
            </button>
          );
        }
        for (let i = totalPages - 2; i <= totalPages; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              style={{
                backgroundColor: currentPage === i ? "#959DB3" : "",
                border: "none",
                margin: "0 5px",
                borderRadius: 5,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
              }}
            >
              {i}
            </button>
          );
        }
      } else {
        buttons.push(
          <button
            style={{
              border: "none",
              background: "#edeff3",
              margin: "0 5px",
              borderRadius: 5,
              fontSize: 14,
              backgroundColor: currentPage == 1 ? "#F4F5F7" : "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 30,
            }}
            key="ellipsis-middle"
            // disabled
            onClick={handleEllipsisPrevClick}
          >
            ...
          </button>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              style={{
                backgroundColor: currentPage === i ? "#959DB3" : "",
                border: "none",
                margin: "0 5px",
                borderRadius: 5,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
              }}
            >
              {i}
            </button>
          );
        }
        if (totalPages > 4) {
          buttons.push(
            <button
              style={{
                border: "none",
                background: "#edeff3",
                margin: "0 5px",
                borderRadius: 5,
                fontSize: 14,
                backgroundColor: currentPage == 1 ? "#F4F5F7" : "#FFFFFF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
              }}
              key="ellipsis-end"
              onClick={handleEllipsisNextClick}
            >
              ...
            </button>
          );
        }
      }

      buttons.push(
        <button
          style={{
            marginLeft: 10,
            border: "none",
            backgroundColor: "#FFFFFF",
            backgroundColor: currentPage == totalPages ? "#F4F5F7" : "#FFFFFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
          }}
          key="next"
          onClick={handleNextPage}
        >
          <Icon24px classIcon={faChevronRight} size={14} color={"#959DB3"} />
        </button>
      );
      buttons.push(
        <button
          style={{
            marginLeft: 10,
            border: "none",
            borderRadius: 5,
            backgroundColor: "#FFFFFF",
            fontSize: 14,
            backgroundColor: currentPage == totalPages ? "#F4F5F7" : "#FFFFFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
          }}
          key="last"
          onClick={() => onPageChange(totalPages)}
        >
          Cuối
        </button>
      );
    }

    return buttons;
  };

  return <div>{renderPaginationButtons()}</div>;
}

export default Pagination;
