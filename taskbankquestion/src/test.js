import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = () => {
    // Xử lý xóa câu hỏi
    // ...

    // Ẩn popup sau khi xóa
    setShowPopup(false);
  };

  const handleCancel = () => {
    // Ẩn popup
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>Xóa câu hỏi</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Xóa câu hỏi</h2>
            <p>Bạn chắc chắn muốn xóa câu hỏi này?</p>
            <p>
              <strong>Hệ thống cửa hàng Hachi</strong>
              <br />
              Hachi có mặt từ năm nào?
            </p>
            <p>Đơn vị bị xóa sẽ KHÔNG thể khôi phục lại.</p>
            <div className="popup-actions">
              <button className="button-primary" onClick={handleDelete}>
                Xóa
              </button>
              <button className="button-secondary" onClick={handleCancel}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
