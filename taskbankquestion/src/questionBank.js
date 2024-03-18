import './questionBank.css';
import iconHome from './icon/home-svgrepo-com.svg'
import iconFind from './icon/find-magnifier-search-zoom-look-svgrepo-com.svg'
import iconNoi from './icon/bell-svgrepo-com.svg'
import iconExport from './icon/export-svgrepo-com.svg'
import iconImport from './icon/import-svgrepo-com.svg'
import iconFill from './icon/filter-svgrepo-com.svg'
import iconFindWhite from './icon/find-white.svg'
import React, { useEffect, useState } from "react";
import { loremIpsum } from 'lorem-ipsum';
 import { List } from 'react-virtualized';

const rowCount = 5000;
const listHeight = 400;
const rowHeight = 50;
const rowWidth = 700;

const list = [{
    "id": 0,
    "idQues": "mx01",
    "question": "Đơn phương, ai cũng có cho mình một câu chuyện để kể",
    "type": "Dạng câu 1 lựa chọn",
    "time": 30,
    "status": 0
  },
  {
    "id": 1,
    "idQues": "mx02",
    "question": "Đơn phương, ai cũng có cho mình một câu chuyện để kể",
    "type": "Dạng câu 1 lựa chọn",
    "group": "Thương hiệu, văn hóa công ty",
    "time": 30,
    "status": 0
  },
  {
    "id": 4,
    "idQues": "mx02",
    "question": "Đơn phương, ai cũng có cho mình một câu chuyện để kể",
    "type": "Dạng câu 1 lựa chọn",
    "group": "Thương hiệu, văn hóa công ty",
    "time": 30,
    "status": 0
  },
  {
    "id": 0,
    "idQues": "mx01",
    "question": "Đơn phương, ai cũng có cho mình một câu chuyện để kể",
    "type": "Dạng câu 1 lựa chọn"
  },
  {
    "id": 1,
    "idQues": "mx02",
    "question": "Đơn phương, ai cũng có cho mình một câu chuyện để kể",
    "type": "Dạng câu 1 lựa chọn",
    "group": "Thương hiệu, văn hóa công ty",
    "time": 30,
    "status": 0
  },
  {
    "id": 4,
    "idQues": "mx02",
    "question": "Đơn phương, ai cũng có cho mình một câu chuyện để kể",
    "type": "Dạng câu 1 lựa chọn",
    "group": "Thương hiệu, văn hóa công ty",
    "time": 30,
    "status": 0
  },
  {
    "id": 0,
    "idQues": "mx01",
    "question": "Đơn phương, ai cũng có cho mình một câu chuyện để kể",
    "type": "Dạng câu 1 lựa chọn"
  },
  {
    "id": 1,
    "idQues": "mx02",
    "question": "Đơn phương, ai cũng có cho mình một câu chuyện để kể",
    "type": "Dạng câu 1 lựa chọn",
    "group": "Thương hiệu, văn hóa công ty",
    "time": 30,
    "status": 0
  },
  {
    "id": 4,
    "idQues": "mx02",
    "question": "Đơn phương, ai cũng có cho mình một câu chuyện để kể",
    "type": "Dạng câu 1 lựa chọn",
    "group": "Thương hiệu, văn hóa công ty",
    "time": 30,
    "status": 0
  },]

function App() {
    const [activeDropdown, setActiveDropDown] = useState(false)

    const [checked, setChecked] = useState(false);
    const handleCheckboxChange = () => {
        setChecked(!checked);
    };


    const handleDropdowm = () => {
        setActiveDropDown(!activeDropdown)
    }

    function renderRow({ index, key, style }) {
        return (
          <div key={key} style={{alignItems:'center', display:'flex', padding: 10, backgroundColor:'white', marginBottom: 5}} className="row">
            <input style={{marginRight: 20, width: '%'}} type='checkbox'></input>
            <div style={{width: '45%', display:'flex', alignItems:'center' ,justifyContent: 'left', height: 65}}>
                <div>
                    <div>
                        <div style={{marginLeft: 20}}>{list[index].question}</div>
                    </div>
                    <div style={{display: 'flex', alignItems:'center',justifyItems:'center'}}>
                        <div>
                            <div style={{marginLeft: 20, marginRight: 20}}>{list[index].idQues}</div>
                        </div>
                        <div style={{height: 20, width: 1, backgroundColor:'red'}}></div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginLeft: '5%'}}>
                            <p>Dạng câu hỏi:</p>
                            <div>{list[index].type}</div>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div style={{width: '20%', height: '100%'}}>
                <div style={{marginLeft: 20, marginRight: 20}}>{list[index].group}</div>
            </div>
            <div style={{width: '10%', height: '100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div style={{marginLeft: 20, marginRight: 20}}>{list[index].time}s</div>
            </div>
            <div style={{width: '15%', height: '100%', display:'flex', alignItems:'center', justifyContent:'right'}}>
                <div style={{marginLeft: 20, marginRight: 20}}>{list[index].status}</div>
            </div>
            <div style={{height: 50, width: 1, backgroundColor:'red'}}></div>
          </div>
        );
      }

    const [checkStatus, setCheckStatus] = useState([])
    function handldCheck(e){
        if(e.target.checked){
            setCheckStatus([...checkStatus, e.target.value])
        }else{
            setCheckStatus(checkStatus.filter((item) => item != e.target.value))
        }
    }
  return (
   <div className='all-page'>
     <div className='side-bar'>
        <div className='logo'>
            <div className='image'></div>
        </div>
        <div className='content-side-bar'>
            <ul>
                <li>
                    <img className='icon' src={iconHome} alt="Icon Home" />
                    <a>XXX</a>
                </li>

                <li onClick={handleDropdowm}>
                    <img className='icon' src={iconHome} alt="Icon Home" />
                    <a >ĐÁNH GIÁ NHÂN SỰ</a>
                    <div className={`dropdown ${activeDropdown ? 'active' : ''}`}>
                        <a href=''>-------</a>
                        <a href=''>Ngân hàng câu hỏi</a>
                        <a href=''>-------</a>
                        <a href=''>-------</a>
                    </div>
                </li>

                <li>
                    <img className='icon' src={iconHome} alt="Icon Home" />
                    <a>XXX</a>
                </li>

                <li>
                    <img className='icon' src={iconHome} alt="Icon Home" />
                    <a>XXX</a>
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
                    <li><a className='head-noi' href=''><img className='icon' src={iconNoi} alt="Icon Home" /></a></li>
                    <li><a className='head-avatar' href=''></a></li>
                </ul>
            </div>
       </div>

       <div className='head-field'>
            <div className='field-check'>
                <div className='input'>
                    <a>Đang soạn thảo</a>
                    <input className={checked ? 'checked' : ''} value='draft' onChange={handleCheckboxChange} type='checkbox'></input>
                </div>

                <div>
                    <a>Gửi duyệt</a>
                    <input value='send' onChange={handldCheck} type='checkbox'></input>
                </div>

                <div>
                    <a>Đã duyệt</a>
                    <input value= 'browser' onChange={handldCheck} type='checkbox'></input>
                </div>

                <div>
                    <a>Ngưng áp dụng</a>
                    <input value= 'stop-browser' onChange={handldCheck} type='checkbox'></input>
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
                    <input type='checkbox'/>
                    <p>Câu hỏi </p>
                </div>
                <p className='head-group'>Phân nhóm</p>
                <p className='head-time'>Thời gian</p>
                <p className='head-status'>Tình trạng</p>
            </div>
            <div className='body-list'>
                <div className="list">
                <List
                    width={1650}
                    height={600}
                    rowHeight={100}
                    rowRenderer={renderRow}
                    rowCount={list.length}
                    overscanRowCount={3} />
                </div>
            </div>
       </div>

       <div className='footer'>
            <div className='footer-page-show'>
                <p>Hiển thị mỗi trang</p>
                <div class="dropup">
                    <select id="numberShow">
                        <optgroup name='' label="itemShow">
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                        </optgroup>
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
