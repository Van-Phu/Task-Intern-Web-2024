import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const renderPaginationButtons = () => {
    const buttons = [];

    if (totalPages <= 1) {
      buttons.push(
        <button
          key={1}
          style={{
            backgroundColor: currentPage === 1 ? "#959DB3" : "",
            border: "none",
            margin: "0 5px",
            borderRadius: 5,
          }}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
    } else if (totalPages === 2) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            style={{
              backgroundColor: currentPage === i ? "#959DB3" : "",
              border: "none",
              margin: "0 5px",
              borderRadius: 5,
            }}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      buttons.push(
        <button
          style={{ backgroundColor: "#fff", border: "none", marginRight: 5 }}
          key="first"
          onClick={() => onPageChange(1)}
        >
          Đầu
        </button>
      );

      buttons.push(
        <button
          style={{ border: "none", marginRight: 10 }}
          key="prev"
          onClick={handlePrevPage}
        >
          <Icon24px classIcon={faChevronLeft} size={20} color={"#959DB3"} />
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
              }}
              key="ellipsis-start"
              disabled
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
                fontSize: 20,
              }}
              key="ellipsis-end"
              disabled
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
              fontSize: 20,
            }}
            key="ellipsis-middle"
            disabled
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
                fontSize: 20,
              }}
              key="ellipsis-end"
              disabled
            >
              ...
            </button>
          );
        }
      }

      buttons.push(
        <button
          style={{ marginLeft: 10, border: "none" }}
          key="next"
          onClick={handleNextPage}
        >
          <Icon24px classIcon={faChevronRight} size={20} color={"#959DB3"} />
        </button>
      );
      buttons.push(
        <button
          style={{ marginLeft: 10, border: "none" }}
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
