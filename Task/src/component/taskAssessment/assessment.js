import "./assessment.css";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import {
  faPencil,
  faCircleCheck,
  faCheck,
  faCircleXmark,
  faChevronDown,
  faListCheck,
  faChevronUp,
  faArrowRight,
  faChevronRight,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dataJson from "../../data/dataAssessment.json";
import { Prev } from "react-bootstrap/esm/PageItem";
const Icon24px = ({ classIcon, color, size }) => {
  const iconSize = {
    color: color,
    cursor: "pointer",
    fontSize: size,
  };
  return <FontAwesomeIcon icon={classIcon} style={iconSize} />;
};

const itemID = ["Trang chủ", "Thông tin", "Tài chính", "Nhân sự"];

function Assessment() {
  const [data, setData] = useState(dataJson);
  const [dataPosition, setDataPosition] = useState([]);
  const [dataCompetence, setDataCompetence] = useState([]);
  const [competenceLevel, setCompetenceLevel] = useState([]);
  const [dataItemCompetence, setDataItemCompetence] = useState([]);
  const [dataItemChange, setDataItemChange] = useState([]);
  const [indexItem, setIndexItem] = useState();
  const readPosition = async (data) => {
    const uniquePositionIDs = new Set();
    const uniquePositions = data.filter((item) => {
      if (!uniquePositionIDs.has(item.PositionID)) {
        uniquePositionIDs.add(item.PositionID);
        return true;
      }
      return false;
    });
    const positions = uniquePositions.map((item) => ({
      PositionID: item.PositionID,
      PositionName: item.PositionName,
    }));
    setDataPosition(positions);
  };

  const readCompetence = async (data) => {
    const uniqueCompetenceIDs = new Set();
    const uniquePositions = data.filter((item) => {
      if (!uniqueCompetenceIDs.has(item.CompetenceID)) {
        uniqueCompetenceIDs.add(item.CompetenceID);
        return true;
      }
      return false;
    });
    const positions = uniquePositions.map((item) => ({
      CompetenceID: item.CompetenceID,
      CompetenceName: item.CompetenceName,
    }));
    setDataCompetence(positions);
  };

  const readCompetenceLevel = async (data) => {
    const positions = data.map((item) => ({
      CompetenceLevel: item.CompetenceLevel,
      CompetenceLevelMax: item.CompetenceLevelMax,
    }));
    setCompetenceLevel(positions);
  };

  const handleChangeValue = (itemX, itemY, newMin, newMax) => {
    if (newMin < 0 || newMax < 0) {
      alert("Không hợp lệ!");
      return;
    } else {
      let newArr = [...dataItemCompetence];
      if (newMin > newMax) {
        newArr[itemX][itemY].CompetenceLevel = newMin;
        newArr[itemX][itemY].CompetenceLevelMax = newMin;
      } else {
        newArr[itemX][itemY].CompetenceLevel = newMin;
        newArr[itemX][itemY].CompetenceLevelMax = newMax;
      }
      setDataItemChange(newArr);
    }
  };

  const handleSaveChange = (status, newArr) => {
    if (status == true) {
      alert("Cập nhật thành công!");
      setDataItemCompetence(newArr);
    } else {
      alert("Không thành công!");
    }
  };

  const getValueCompetency = () => {
    let newArr = [];
    for (let i = 0; i < dataCompetence.length; i++) {
      let arr = [];
      for (let j = 0; j < data.length; j++) {
        if (dataCompetence[i].CompetenceID === data[j].CompetenceID) {
          arr.push(data[j]);
        }
      }
      newArr.push(arr);
    }
    setDataItemCompetence(newArr);
  };

  useEffect(() => {
    const fetchData = async () => {
      await readPosition(data);
      await readCompetence(data);
      await readCompetenceLevel(data);
    };

    fetchData();
  }, [1]);

  useEffect(() => {
    getValueCompetency();
  }, [dataCompetence]);

  console.log(dataItemCompetence);

  return (
    <div>
      <div className="body">
        <div className="head">
          <div className="head-road">
            <div style={{ marginLeft: 0, paddingLeft: 0 }}>
              Đánh giá nhân sự
            </div>
            <div>
              <Icon24px
                classIcon={faChevronRight}
                color={"#1A6634"}
                size={14}
              />
            </div>

            <div>Khung năng lực</div>
            <div>
              <Icon24px
                classIcon={faChevronRight}
                color={"#959DB3"}
                size={14}
              />
            </div>

            <div style={{ color: "#959DB3" }}>Chi tiết khung năng lực</div>
          </div>
          <div className="head-btn">
            <div className="btn-delete">
              <div>
                <Icon24px classIcon={faTrash} size={18} color={"white"} />
              </div>
              <p>XÓA KHUNG NL</p>
            </div>
            <div className="btn-action">
              <div>
                <Icon24px classIcon={faArrowRight} size={14} color={"white"} />
              </div>
              <p style={{ fontSize: 14 }}>Gửi duyệt</p>
            </div>
            <div className="btn-addNew">
              <div>
                <Icon24px classIcon={faPlus} size={18} color={"white"} />
              </div>
              <p>Thêm mới</p>
            </div>
          </div>
        </div>

        <div className="competency">
          <div className="text-infoCompetency">
            <p>THÔNG TIN KHUNG NĂNG LỰC</p>
          </div>
          <div className="form-competency">
            <div className="form-competency-layout">
              <div className="dataAndStatus-competency">
                <div>
                  <p style={{ color: "#959DB3", fontSize: 14 }}>
                    Ngày hiệu lực khung năng lực
                  </p>
                  <div className="competency-dateTimePicker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker />
                    </LocalizationProvider>
                  </div>
                </div>
                <div>
                  <p style={{ color: "#959DB3", fontSize: 14 }}>Tình trạng</p>
                  <div
                    style={{
                      color: "#1A6634",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    Đã phê duyệt
                  </div>
                </div>
              </div>
              <div className="input-competency">
                <div className="name-competency">
                  <p
                    style={{
                      color: "#959DB3",
                      fontSize: 14,
                      marginBottom: 0,
                      paddingBottom: 5,
                    }}
                  >
                    Tên Khung năng lực
                  </p>
                  <input className="input-name-competency" />
                </div>

                <div className="actor-competency">
                  <p
                    style={{
                      color: "#959DB3",
                      fontSize: 14,
                      marginBottom: 0,
                      paddingBottom: 5,
                    }}
                  >
                    Diễn giả
                  </p>
                  <textarea className="input-actor-competency" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-competency">
          <p style={{ fontSize: 17, fontWeight: "bold", color: "black" }}>
            CHI TIẾT KHUNG NĂNG LỰC
          </p>
          <div className="grid-competency">
            <div className="head-grib-competency">
              <div className="head-title">
                <div
                  style={{
                    display: "flex",
                    justifyItems: "right",
                    alignItems: "center",
                    textAlign: "right",
                    flexDirection: "row-reverse",
                    paddingRight: 10,
                    color: "#5A6276",
                    fontWeight: 500,
                  }}
                >
                  Năng lực
                </div>
                <div className="line-head"></div>
                <div
                  style={{ paddingLeft: 10, color: "#5A6276", fontWeight: 500 }}
                >
                  Chức danh
                </div>
              </div>
              <div className="competence">
                {dataCompetence.map((item, index) => (
                  <div className="competence-item" key={index}>
                    <div className="itemCompetence">{item.CompetenceID}</div>
                    <div className="minMaxItem">
                      <p className="min">Min</p>
                      <p className="max">Max</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="btn-add-competency">
                <div>
                  <Icon24px classIcon={faPlus} size={14} color={"#1A6634"} />
                </div>
                <p style={{ paddingLeft: 5, color: "#1A6634", fontSize: 14 }}>
                  Thêm năng lực
                </p>
              </div>
            </div>
            <div className="body-position">
              <div className="position">
                <div className="actor-area">
                  {dataPosition.map((item, index) => (
                    <div key={index} className="position-item">
                      <div className="positionID">{item.PositionID}</div>
                      <div
                        style={{
                          height: "100%",
                          width: "5%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <nav
                          style={{
                            height: 20,
                            width: 0.1,
                            backgroundColor: "black",
                          }}
                        ></nav>
                      </div>
                      <div className="positionName">{item.PositionName}</div>
                    </div>
                  ))}
                </div>

                <div className="addActor">
                  <div>
                    <Icon24px classIcon={faPlus} size={14} color={"#1A6634"} />
                  </div>
                  <p style={{ marginLeft: 10, color: "#1a6634", fontSize: 14 }}>
                    Thêm chức danh
                  </p>
                </div>
              </div>
              <div className="level">
                {dataItemCompetence.map((itemRow, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="layout-item-position"
                    style={{
                      backgroundColor: rowIndex % 2 === 0 ? "white" : "#DBDEE7",
                    }}
                  >
                    {itemRow.map((subItem, colIndex) => (
                      <div key={colIndex} className="level-item">
                        <input
                          style={{
                            backgroundColor:
                              rowIndex % 2 === 0 ? "white" : "#DBDEE7",
                          }}
                          // onBlur={(e) =>
                          //   handleChangeValue(
                          //     rowIndex,
                          //     colIndex,
                          //     e.target.value,
                          //     subItem.CompetenceLevelMax
                          //   )
                          // }
                          onChange={(e) =>
                            handleChangeValue(
                              rowIndex,
                              colIndex,
                              e.target.value,
                              subItem.CompetenceLevelMax
                            )
                          }
                          onBlur={() => handleSaveChange(dataItemChange)}
                          value={subItem.CompetenceLevel}
                          className="min"
                        />
                        <input
                          style={{
                            backgroundColor:
                              rowIndex % 2 === 0 ? "white" : "#DBDEE7",
                          }}
                          onChange={(e) =>
                            handleChangeValue(
                              rowIndex,
                              colIndex,
                              subItem.CompetenceLevel,
                              e.target.value
                            )
                          }
                          onBlur={() => handleSaveChange(dataItemChange)}
                          value={subItem.CompetenceLevelMax}
                          className="max"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assessment;
