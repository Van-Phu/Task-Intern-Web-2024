import "./assessment.css";
import React, { useEffect, useState ,useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import {
  faArrowRight,
  faChevronRight,
  faPlus,
  faTrash,
  faCircleInfo,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dataJson from "../../data/dataAssessment.json";
import TextField from "@mui/material/TextField";
import { Icon } from "@mui/material";
const Icon24px = ({ classIcon, color, size }) => {
  const iconSize = {
    color: color,
    cursor: "pointer",
    fontSize: size,
  };
  return <FontAwesomeIcon icon={classIcon} style={iconSize} />;
};


function Assessment({sendMessage}) {
  const [data, setData] = useState(dataJson);
  const [dataPosition, setDataPosition] = useState([]);
  const [dataCompetence, setDataCompetence] = useState([]);
  const [dataItemCompetence, setDataItemCompetence] = useState([]);
  const [dataCategory, setDataCategory] = useState([])
  const [dataItemChange, setDataItemChange] = useState([]);
  const [valueOldItemMin, setValueOldItemMin] = useState();
  const [valueOldItemMax, setValueOldItemMax] = useState();
  const [openDatetimePicker, setOpenDateTimePicker] = useState(false)
  const [dateSelected, setDateSelected] = useState()

  const competenceRef = useRef(null);
  const levelRef = useRef(null);

  const handleScroll = (event) => {
    const { scrollLeft } = event.target;
    console.log(event.target)
    competenceRef.current.scrollLeft = scrollLeft;
  };

  const popDateTimePicker = () =>{
    setOpenDateTimePicker(!openDatetimePicker)
  }

  const handleClose = () =>{
    setOpenDateTimePicker(!openDatetimePicker)
  }

  const getDatePicker = (newDate) => {
    setDateSelected(newDate)
  }

  const readPostionAndCompetence = async (data) => {
    const uniquePositionIDs = new Set();
    const uniqueCompetenceIDs = new Set();
    const uniqueCategory = new Set();
    const listPosition = [];
    const listCompetence = [];
    const listCategory = [];
    data.forEach((element) => {
      if (!uniquePositionIDs.has(element.PositionID)) {
        listPosition.push(element);
        uniquePositionIDs.add(element.PositionID);
      }
      if (!uniqueCompetenceIDs.has(element.CompetenceID)) {
        listCompetence.push(element);
        uniqueCompetenceIDs.add(element.CompetenceID);
      }
      if(!uniqueCategory.has(element.CategoryID)){
        listCategory.push(element.CategoryID)
        uniqueCategory.add(element.CategoryID)
      }
    });
    setDataCategory(listCategory)
    setDataPosition(listPosition);
    setDataCompetence(listCompetence);
  };


  const sendDataToParentFunction = (data, status) => {
    sendMessage(data, status);
  };

  const handleChangeValue = (itemX, itemY, newMin, newMax) => {
    let newArr = [...dataItemCompetence];
    newArr[itemX][itemY][0].CompetenceLevel = newMin;
    newArr[itemX][itemY][0].CompetenceLevelMax = newMax;
    setDataItemChange(newArr);
  };

  const handleSaveChange = (event, itemX, itemY, newArr) => {
    let Min = Number(newArr[itemX][itemY][0].CompetenceLevel);
    let Max = Number(newArr[itemX][itemY][0].CompetenceLevelMax);
    let message = ""
    let status = false
    if (Min != Number(valueOldItemMin) || Max != Number(valueOldItemMax)) {
      if(isNaN(Min) || isNaN(Max)){
        message = "Giá trị nhập vào không hợp lệ!!";
        status = false
        newArr[itemX][itemY][0].CompetenceLevel = valueOldItemMin;
        newArr[itemX][itemY][0].CompetenceLevelMax = valueOldItemMax;
      }
      else if (Min < 0 || Min > 5) {
        message = "Lỗi Min";
        status = false
        if (valueOldItemMin == null) {
          newArr[itemX][itemY][0].CompetenceLevel = "";
        } else {
          newArr[itemX][itemY][0].CompetenceLevel = valueOldItemMin;
        }
      } else if (Max < 0 || Max > 5) {
        message = "Lỗi Max";
        status = false
        if (valueOldItemMax == null) {
          newArr[itemX][itemY][0].CompetenceLevelMax = "";
        } else {
          newArr[itemX][itemY][0].CompetenceLevel = valueOldItemMin;
          newArr[itemX][itemY][0].CompetenceLevelMax = valueOldItemMax;
        }
      }
      else if(Min == valueOldItemMin &&  Max == 0){
        console.log("err");
        if(Max != valueOldItemMax ){
          console.log("err")
          message = "Cập nhật thành công";
          status = true
          newArr[itemX][itemY][0].CompetenceLevelMax = "";
        } 
      }
 
      else {
        if(Min > Max && Max == 0){
          message = "Số Max sẽ thay đổi để lớn hơn hoặc bằng min";
          status = true
          newArr[itemX][itemY][0].CompetenceLevel = Min;
          newArr[itemX][itemY][0].CompetenceLevelMax = Min;
        }
        else if (Min > Max) {
          message = "Số Min đã vượt quá Max";
          status = false
          newArr[itemX][itemY][0].CompetenceLevel = valueOldItemMin;
        }
        else if(valueOldItemMin == null){
          message = "Số Min sẽ thay đổi để bằng số Max";
          status = true
          newArr[itemX][itemY][0].CompetenceLevel = Max;
          newArr[itemX][itemY][0].CompetenceLevelMax = Max;
        }
        else {
          status = true
          message =  "Cập nhật khung năng lực thành công " +
          newArr[itemX][itemY][0].CompetenceName +
          " " +
          newArr[itemX][itemY][0].PositionName;
        }
      }
      sendDataToParentFunction(message, status)
      setDataItemCompetence(newArr);
    }
  };

  const getValueCompetency = () => {
    let newArr = Array.from({ length: dataCompetence.length }, () =>
      Array(dataPosition.length)
        .fill()
        .map(() => [])
    );
    for (let i = 0; i < dataCompetence.length; i++) {
      for (let j = 0; j < dataPosition.length; j++) {
        data.forEach((element) => {
          if (
            dataCompetence[i].CompetenceID === element.CompetenceID &&
            dataPosition[j].PositionID === element.PositionID
          ) {
            newArr[i][j].push(element);
          }
        });
      }
    }
    setDataItemCompetence(newArr);
  };

  useEffect(() => {
    const fetchData = async () => {
      await readPostionAndCompetence(data);
    };
    fetchData();
  }, [1]);

  useEffect(() => {
    getValueCompetency();
  }, [dataCompetence]);


  return (
    <div>
      <div className="body">
        <div className="head">
          <div className="head-road">
            <div className="head-road-child">
              <div style={{ marginLeft: -10, paddingLeft: 0 }}>
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
            <div onClick={sendDataToParentFunction} className="btn-addNew">
              <div>
                <Icon24px classIcon={faPlus} size={18} color={"white"} />
              </div>
              <p>Thêm mới</p>
            </div>
          </div>
        </div>

        <div className="scroll-view">
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
                    <div onClick={popDateTimePicker} className="competency-dateTimePicker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <div style={{marginRight: 20}}>
                            {dateSelected == null ? "Không chọn" : dateSelected.$D + "/" + dateSelected.$M + "/" + dateSelected.$y}
                          </div>
                          <div>
                            <Icon24px classIcon={faCalendar} size={20} color={"#959DB3"}/>
                          </div>
                    </LocalizationProvider>
                 
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div style={{marginTop: -50, width: 0}}>
                        <DatePicker
                        value={dateSelected}
                        onChange={getDatePicker}
                        open={openDatetimePicker}
                        onClose={handleClose}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputProps={{
                              className: 'custom-datepicker-input'
                            }}
                          />
                        
                        )}
                        slotProps={{
                          popper: {
                            className: "pop-datePicker"
                          },
                        }}
                        />
                      </div>
                      </LocalizationProvider>
      
           
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
                    <textarea
                      style={{ resize: "inherit" }}
                      className="input-actor-competency"
                    />
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
                    style={{
                      paddingLeft: 10,
                      color: "#5A6276",
                      fontWeight: 500,
                    }}
                  >
                    Chức danh
                  </div>
                </div>
                <div ref={competenceRef} className="competence">
                  {dataCompetence.map((item, index) => (
                    <div className="competence-item" key={index}>
                      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <div className="itemCompetence">{item.CompetenceID}</div>
                        <div style={{marginTop: -15}}>
                        <Icon24px classIcon={faCircleInfo} size={8} color={"rgba(49, 173, 255, 1)"}/>
                        </div>
                       
                      </div>
                     
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
                      <di title={"Chức danh: " + item.PositionName} key={index} className="position-item">
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
                      </di>
                    ))}
                  </div>

                  <div className="addActor">
                    <div>
                      <Icon24px
                        classIcon={faPlus}
                        size={14}
                        color={"#1A6634"}
                      />
                    </div>
                    <p
                      style={{ marginLeft: 10, color: "#1a6634", fontSize: 14 }}
                    >
                      Thêm chức danh
                    </p>
                  </div>
                </div>
                <div onScroll={handleScroll}  ref={levelRef} className="level">
                  {dataItemCompetence.map((itemRow, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="layout-item-position"
                      style={{
                        backgroundColor:
                          rowIndex % 2 === 0 ? "white" : "#DBDEE7",
                      }}
                    >
                      {dataPosition.map((subItem, colIndex) => {
                        return((itemRow[colIndex] && itemRow[colIndex].length == 0) ? "" : (
                          <div title={"Mã loại: " + itemRow[colIndex][0].CategoryID} key={colIndex} className="level-item">
                          <input
                            style={{
                              backgroundColor:
                                rowIndex % 2 === 0 ? "white" : "#DBDEE7",
                            }}
                            onFocus={(e) => {
                              handleChangeValue(
                                rowIndex,
                                colIndex,
                                e.target.value,
                                itemRow[colIndex][0].CompetenceLevelMax
                              );
                              setValueOldItemMin(
                                itemRow[colIndex][0].CompetenceLevel
                              );
                              setValueOldItemMax(
                                itemRow[colIndex][0].CompetenceLevelMax
                              );
                            }}
                            onChange={(e) =>
                              handleChangeValue(
                                rowIndex,
                                colIndex,
                                e.target.value,
                                itemRow[colIndex][0].CompetenceLevelMax
                              )
                            }
                            onBlur={(e) =>
                              handleSaveChange(
                                e,
                                rowIndex,
                                colIndex,
                                dataItemChange
                              )
                            }
                            value={itemRow[colIndex][0].CompetenceLevel}
                            className="min"
                          />
                          <input
                            style={{
                              backgroundColor:
                                rowIndex % 2 === 0 ? "white" : "#DBDEE7",
                            }}
                            onFocus={(e) => {
                              handleChangeValue(
                                rowIndex,
                                colIndex,
                                itemRow[colIndex][0].CompetenceLevel,
                                e.target.value
                              );
                              setValueOldItemMin(
                                itemRow[colIndex][0].CompetenceLevel
                              );
                              setValueOldItemMax(
                                itemRow[colIndex][0].CompetenceLevelMax
                              );
                            }}
                            onChange={(e) =>
                              handleChangeValue(
                                rowIndex,
                                colIndex,
                                itemRow[colIndex][0].CompetenceLevel,
                                e.target.value
                              )
                            }
                            onBlur={(e) =>
                              handleSaveChange(
                                e,
                                rowIndex,
                                colIndex,
                                dataItemChange
                              )
                            }
                            value={itemRow[colIndex][0].CompetenceLevelMax}
                            className="max"
                          />
                        </div>))
                    })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assessment;
