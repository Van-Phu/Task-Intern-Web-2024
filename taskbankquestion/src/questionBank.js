import './questionBank.css';
import iconHome from './icon/home-svgrepo-com.svg'
import iconFind from './icon/find-magnifier-search-zoom-look-svgrepo-com.svg'
import iconNoi from './icon/bell-svgrepo-com.svg'
import iconExport from './icon/export-svgrepo-com.svg'
import iconImport from './icon/import-svgrepo-com.svg'
import iconFill from './icon/filter-svgrepo-com.svg'
import iconFindWhite from './icon/find-white.svg'
import iconThreeDot from './icon/three-dot.png'
import iconDownArrow from './icon/icon-down-arrow.png'
import React, { useEffect, useState } from "react";
import { loremIpsum } from 'lorem-ipsum';
 import { List } from 'react-virtualized';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Last } from 'react-bootstrap/esm/PageItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faCircleCheck, faCircleMinus, faEye, faPencil, faShare, faTrash} from "@fortawesome/free-solid-svg-icons"
import question from './question.json'
import CustomPopup from './custom-popup';

function App() {
    const [dataQuestion, setDataQuestion] = useState(question.listQuestion)
    const [listQuestion, setListQuestion] = useState()

    const [activeDropdown, setActiveDropDown] = useState(false)
    const [draftChecked, setDraftChecked] = useState(false);
    const [sendChecked, setSendChecked] = useState(false);
    const [browserChecked, setBrowserChecked] = useState(false);
    const [stopBrowserChecked, setStopBrowserChecked] = useState(false);
    const [itemQuestionChecked, setItemQuestionChecked] = useState(false)
    const [dataQuestionChecked, setDataQuenstionChecked] = useState([])
    const [expandedIndex, setExpandedIndex] = useState(null)
    const [numShowItem ,setNumShowItem] = useState(dataQuestion.length);
    const [checkAllChecked, setCheckAllChecked] = useState(false)
    const [dataQuesChoose, setDataQuesChoose] = useState('');

    const [visibility, setVisibility] = useState(false);

    const popupCloseHandler = (e) => {
      setVisibility(e);
    };



    const [dataFilter, setDataFielter] = useState([])

  
    useEffect(() => {
        filterQuestions();
    },[dataQuestion])

    const filterQuestions = () => {
        const status0Items = dataQuestion.filter(item => item.status === 0);
        console.log(listQuestion)
        setListQuestion(status0Items)
    };


    const handleDraftChecked = () => {
        setDraftChecked(!draftChecked);
        filterQuestions()
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
        setActiveDropDown(!activeDropdown)
    }

    const handleCheckAll = () =>{ 
        setCheckAllChecked(!checkAllChecked)
        if(checkAllChecked == false){
            for(let i = 0; i < dataQuestion.length; i++){
                setDataQuenstionChecked(prevItems => [...prevItems, dataQuestion[i]]);
            }
        }else if(checkAllChecked == true){
            for(let i = 0; i < dataQuestion.length; i++){
                setDataQuenstionChecked([]);
            }
        }
    }

    const getValueNumPage = (event) => {
        const selectedValue = event.target.value;
        if(selectedValue > numShowItem){
            setNumShowItem(dataQuestion.length)
        }else{
            setNumShowItem(selectedValue);
        }
        
      };

    const Icon24px = ({ classIcon, color }) => {
        const iconSize = {
            width: "20px",
            height: "20px",
            color: color,
            cursor: "pointer"
        };
        return (
            <FontAwesomeIcon icon={classIcon} style={iconSize} />
        )
      }

    function renderRow({ index, key, dataList}) {
        const isChecked = dataQuestionChecked.includes(dataList[index]);
        const handleStatus = (status) => {
            if(status == '0'){
                return <p style={{}}>Đang soạn thảo</p>
            }else if(status == '1'){
                return <p style={{color: '#31ADFF'}} >Đã duyệt</p>
            }else if(status == '2'){
                return <p style={{color:'#008000'}} >Duyệt áp dụng</p>
            }else if(status == '3'){
                return <p style={{color:'#FB311C'}} >Ngưng áp dụng</p>
            }else if(status == '4'){
                return <p style={{color:'#B7B92F'}} >Trả về</p>
            }
        }
        const handlefunctionStatus = (status) => {
            if(status == '0'){
                return (
                    <ul style={{position: 'absolute', marginRight: '14.5%', alignItems:'center', marginTop:'7.9%'}}>
                        <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                            <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Chỉnh sửa</a>
                        </li>
                        <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                            <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Gửi duyệt</a>
                        </li>
                        <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                            <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Xóa</a>
                        </li>
                    </ul>
                )
            }else if(status == '1'){
                return (
                    <ul style={{position: 'absolute', marginRight: '14.5%', alignItems:'center', marginTop:'7.9%'}}>
                    <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                        <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Chỉnh sửa</a>
                    </li>
                    <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                        <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Phê duyệt</a>
                    </li>
                    <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                        <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Trả về</a>
                    </li>
                </ul>
                )
            }
            else if(status == '2'){
                return (
                    <ul style={{position: 'absolute', marginRight: '14.5%', alignItems:'center', marginTop:'4.8%'}}>
                        <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                            <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Xem chi tiết</a>
                        </li>
                        <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                            <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Ngưng hiển thị</a>
                        </li>
                    </ul>
                )
            }
            else if(status == '3'){
                return (
                    <ul style={{position: 'absolute', marginRight: '14.5%', alignItems:'center', marginTop:'7.9%'}}>
                        <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                            <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Xem chi tiết</a>
                        </li>
                        <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                            <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Phê duyệt</a>
                        </li>
                        <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                            <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Trả về</a>
                        </li>
                    </ul>
                )
            }
            else if(status == '4'){
                return (
                    <ul style={{position: 'absolute', marginRight: '14.5%', alignItems:'center', marginTop:'4.8%'}}>
                        <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                            <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Chỉnh sửa</a>
                        </li>
                        <li style={{backgroundColor:'#BDC2D2', width: 170, height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                            <a style={{color:'white', marginLeft: 10, fontSize: 18}}>Gửi duyệt</a>
                        </li>
                    </ul>
                )
            }
        };
        const handleItemClick = (index, data) => {
            if (expandedIndex === index) {
                setExpandedIndex(null);
                setItemQuestionChecked(!itemQuestionChecked);
            } else {
                setExpandedIndex(index);
                setItemQuestionChecked(!itemQuestionChecked);
            }
        };
        
        const handleItemChecked = (event) => {
            const itemId = dataList[index];
            const isChecked = event.target.checked;
        
            if (isChecked) {
                setDataQuenstionChecked(prevItems => [...prevItems, itemId]);
                if(dataQuestionChecked.length == dataList.length - 1){
                    setCheckAllChecked(true)
                }
            } else {
                setCheckAllChecked(false)
                setDataQuenstionChecked(prevItems => prevItems.filter(item => item !== itemId));
        }
        };


      
            return (
                <div
                    id={isChecked ? 'itemQuestionChecked' : ''}
                    key={key}
                    className={`rowItem ${isChecked ? 'selected' : ''}`}
                    style={{
                        alignItems:'center',
                        display:'flex',
                        padding: 10,
                        backgroundColor: isChecked ? '#1A6634B2' : 'white',
                        marginBottom: 5,
                        height: 62,
                        
                    }}
                >
                    <input
                    onChange={handleItemChecked}
                    style={{ width: '1%' }}
                    type='checkbox'
                    checked={isChecked}
                    />
                    <div style={{width: '45%', display:'flex', alignItems:'center' ,justifyContent: 'left', height: 62}}>
                        <div style={{height: '100%', width: '100%'}}>
                            <div>
                                <div style={{marginLeft: 20, fontWeight:'600', textOverflow: "ellipsis", width: 500, whiteSpace:'nowrap', overflow:'hide'}}>{dataList[index].question}</div>
                            </div>
                            <div style={{display: 'flex', alignItems:'center',justifyItems:'center'}}>
                                <div>
                                    <div style={{marginLeft: 20, marginRight: 20}}>{dataList[index].idQues}</div>
                                </div>
                                <div style={{height: 20, width: 1, backgroundColor:'#C4C4C4'}}></div>
                                <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginLeft: '5%'}}>
                                    <p>Dạng câu hỏi: &nbsp;</p>
                                    <div>{dataList[index].type}</div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                    <div style={{width: '20%', height: '100%', justifyContent:'left', display:'flex', alignItems:'center'}}>
                        <div style={{}}>{dataList[index].group}</div>
                    </div>
                    <div style={{width: '15%', height: '100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <div style={{fontWeight: '500'}}>{dataList[index].time}s</div>
                    </div>
                    <div style={{width: '13%', height: '100%', display:'flex', alignItems:'center', justifyContent:'right', marginRight: '2%'}}>
                        {handleStatus(dataList[index].status)}
                    </div>
                    <div key={index} onClick={() => handleItemClick(index, dataList[index])} style={{height: '100%', alignItems:'center', display:'flex', justifyContent:'center', width: '5%'}}>
                        <div style={{height: '100%', width: 1, backgroundColor:'#C4C4C4'}}></div>
                        <div style={{ height:40, width:40,alignItems:'center', display:'flex', justifyContent:'center',  backgroundColor: expandedIndex === index ? '#BDC2D2' : '', marginLeft: 20}}>
                            <img style={{height: 20, width: 20 }} src={iconThreeDot} alt="Icon Home" />
                        </div>
                        {expandedIndex === index && handlefunctionStatus(dataList[index].status)}
                    </div>
            </div>
            );
        }

     

  return (
   <div className='all-page'>
     <div className='side-bar'>
        <div className='logo'>
            <div className='image'></div>
            <img className='logo-arrow' src={iconDownArrow}/>
        </div>
        <div className='content-side-bar'>
            <ul>
                <li onClick={handleDropdowm}>
                    <img className='icon' src={iconHome} alt="Icon Home" />
                    
                    <a >ĐÁNH GIÁ NHÂN SỰ</a>
                    <div className={`dropdown ${activeDropdown ? 'active' : ''}`}>
                        <Icon24px classIcon={faPencil} color={'#FFFFFF'}/>
                        <a href=''>Ngân hàng câu hỏi</a>
                    </div>
                </li>
            </ul>
        </div>
     </div>

     <div className='content-area'>
       <div className='head-action'>
            <div className='btn-location'>
                <ul>
                    <li><a href=''>------------</a><nav></nav></li>
                    <li><a href=''>------------</a><nav></nav></li>
                    <li><a href=''>------------</a><nav></nav></li>
                    <li><a href=''>------------</a><nav></nav></li>
                    <li><a href=''>------------</a><nav></nav></li>
                    <li><a href=''>------------</a><nav></nav></li>
                    <li><a href=''>------------</a><nav></nav></li>
                    <li><a href=''>Nhân sự</a></li>
                </ul>
            </div>
            <div className='btn-individual'>
                <ul>
                    <li><a className='head-find' href=''><img className='icon' src={iconFind} alt="Icon Home" /></a></li>
                    <div>
                        <li><a className='head-noi' href=''><img className='icon' src={iconNoi} alt="Icon Home" /></a></li>
                        <div className='red-point'>
                            20
                        </div>
                    </div>
                    <div>
                        <li><a className='head-avatar' href=''></a></li>
                        <div className='green-point'></div>
                    </div>
                </ul>
            </div>
       </div>

       <div className='head-field'>
            <div className='field-check'>
                <div
                    onClick={handleDraftChecked} 
                    id={draftChecked && 'draftChecked'}>
                    <a>Đang soạn thảo</a>
                    <input
                        checked={draftChecked}
                        id='checkbox'
                        value='draft'
                        onChange={handleDraftChecked}
                        type='checkbox'
                    />
                </div>

                <div 
                    onClick={handleSendChecked} 
                    id={sendChecked && 'sendChecked'}>
                    <a>Gửi duyệt</a>
                    <input
                        checked={sendChecked}
                        id='checkbox'
                        value='draft'
                        onChange={handleSendChecked}
                        type='checkbox'
                    />
                </div>

                <div 
                    onClick={handleBrowserChecked} 
                    id={browserChecked && 'browserChecked'}>
                    <a>Đã duyệt</a>
                    <input
                        checked={browserChecked}
                        id='checkbox'
                        value='draft'
                        onChange={handleBrowserChecked}
                        type='checkbox'
                    />
                </div>

                <div 
                    onClick={handleStopBrowserChecked} 
                    id={stopBrowserChecked && 'stopBrowserChecked'}>
                    <a>Ngưng áp dụng</a>
                    <input
                        checked={stopBrowserChecked}
                        id='checkbox'
                        value='draft'
                        onChange={handleStopBrowserChecked}
                        type='checkbox'
                    />
                </div>
            </div>
            <div className='field-btn'>
                <div className= 'field-uploand'>
                    <img className='icon' src={iconExport} alt="Icon Home" />
                </div>

                <div className='field-downloand'>
                    <img className='icon' src={iconImport} alt="Icon Home" />   
                    <a>Template</a>
                </div>

                <div className='field-addNew'>
                    <icon>+</icon>
                    <a>Thêm mới</a>
                </div>
            </div>
       </div>
       <div className='body-data'>
            <div className='data-icon'>
                <img className='icon' src={iconFill} alt="Icon Home" /> 
                <div></div>
            </div>
            <div className='data-reset'>
                <div>
                    <p>Lọc dữ liệu</p>
                    <a href=''>Reset bộ lộc</a>
                </div>
            </div>
            <div className='data-find'>
                <p>Tìm kiếm</p>
                <div>
                    <div className='input-find'>
                        <img className='icon' src={iconFind} alt="Icon Home" /> 
                        <input placeholder='Tìm theo mã và câu hỏi' type='text'></input>
                    </div>

                    <div className='btn-find'>
                    <img className='icon' src={iconFindWhite} alt="Icon Home" /> 
                        <a>Tìm</a>
                    </div>
                </div>
            </div>
            
       </div>

       <div className='body-content'>
            <div className='head-list'>
                <div className='head-question'>
                    <input type='checkbox' checked={checkAllChecked} onChange={handleCheckAll}/>
                    <p>Câu hỏi </p>
                </div>
                <p className='head-group'>Phân nhóm</p>
                <p className='head-time'>Thời gian</p>
                <p className='head-status'>Tình trạng</p>
            </div>
            <div className='body-list'>
                <div className="list">
                <List
                    width={1600}
                    height={600}
                    rowHeight={100}
                    rowRenderer={({ index, key, style }) => renderRow({ index, key, style, dataList: dataQuestion })}
                    rowCount={numShowItem}
                    overscanRowCount={0} />
                </div>
            </div>
       </div>

       <div className='footer'>
            <div className='footer-page-show'>
                <p>Hiển thị mỗi trang</p>
                <div class="dropup">
                    <select onChange={getValueNumPage} id="numberShow">
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                </div>

            </div>
            <div className='footer-page-number'>
                <div>
                    <a>Đầu</a>
                </div>
            </div>
       </div>
     </div>
   </div>
  );
}

export default App;
