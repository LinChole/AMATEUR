import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';

import { NavLink } from 'react-router-dom';

class MemberList extends Component {
  state = {
    userDefaultList: [
      {
        userImg: '/images/userDefaultImg.svg',
      }
    ],
    userInfo: [{}],
    selectedList: [{selectedFile: null}]
  }
  render() {
    return (
      <div className="bg-dark-gray rounded-start-24 h-100 py-md-16">
        <div className="border border-3 border-primary rounded-circle w-150px position-relative mb-md-8 mx-auto p-1">
          <div className="rounded-circle w-100 h-100 overflow-hidden">
            <img src={(this.state.userInfo[0].UserImage === '') ? this.state.userDefaultList[0].userImg : this.state.userInfo[0].UserImage} alt="用戶大頭照" />
          </div>
          <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary position-absolute bottom-0 end-0 cursor-pointer hover-scale-120 p-2" data-bs-toggle="modal" data-bs-target="#editUImg">
            <span className="material-icons">photo_camera</span>
          </div>
          <div className="modal fade" id="editUImg" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <form className="modal-content modal-content-member p-md-10">
                <h4 className="fs-3 fw-bold text-center mb-md-10">上傳用戶及頻道照片</h4>
                <div className="position-relative w-50 rounded-8 overflow-hidden mx-auto mb-md-10">
                  <img className="infoFileImg" src={(this.state.userInfo[0].UserImage === '') ? this.state.userDefaultList[0].userImg : this.state.userInfo[0].UserImage} alt="用戶大頭照" />
                  <div className="position-absolute bottom-0 end-0 pb-2 pe-2">
                    <label>
                      <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary w-36px cursor-pointer hover-opacity-50 p-2">
                        <span className="material-icons">file_upload</span>
                      </div>
                      <input className="d-none" type="file" accept="image/*" name="userImg"
                      onChange={
                        (e) => {
                          let img = document.querySelector('.infoFileImg');
                          img.src = URL.createObjectURL(e.target.files[0]);
                          img.onload = () => {
                            URL.revokeObjectURL(img.src);
                          }
                          let newState = {...this.state};
                          newState.selectedList[0].selectedFile = e.target.files[0];
                          this.setState({newState});
                        }
                      } />
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-gradation-square btn-m me-4 px-md-8" data-bs-dismiss="modal"><span>取消</span></button>
                  <button type="button" className="btn btn-gradation-square btn-m px-md-8" onClick={this.uploadImg}><span>確認</span></button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <p className="fs-3 fw-bold mb-md-8">{this.state.userInfo[0].UserName}</p>
        <ul className="nav d-block" id="pills-tab" role="tablist">
          <li className="mb-md-6">
            <NavLink to={`/member/account/${document.cookie}`}>
              <p className="clickItem fs-5 text-gray cursor-pointer hover-black-20 mx-6 py-2 active" onClick={(e)=>this.addClass(e)} idx="1">
                <span className="material-icons fs-6 align-middle mb-1 me-2">security</span>
                帳號管理
              </p>
            </NavLink>
          </li>
          <li className="mb-md-6">
            <NavLink to={`/member/follow/${document.cookie}`}>
              <p className="clickItem fs-5 text-gray cursor-pointer hover-black-20 mx-6 py-2" onClick={(e)=>this.addClass(e)} idx="2">
                <span className="material-icons fs-6 align-middle mb-1 me-2">equalizer</span>
                追蹤清單
              </p>
            </NavLink>
          </li>
          <li className="mb-md-6">
            <NavLink to={`/member/data/${document.cookie}`}>
              <p className="clickItem fs-5 text-gray cursor-pointer hover-black-20 mx-6 py-2" onClick={(e)=>this.addClass(e)} idx="3">
                <span className="material-icons fs-6 align-middle mb-1 me-2">trending_up</span>
                數據分析
              </p>
            </NavLink>
          </li>
          <li className="mb-md-6">
            <NavLink to={`/member/donate/${document.cookie}`}>
              <p className="clickItem fs-5 text-gray cursor-pointer hover-black-20 mx-6 py-2" onClick={(e)=>this.addClass(e)} idx="4">
                <span className="material-icons fs-6 align-middle mb-1 me-2">currency_exchange</span>
                抖內資訊
              </p>
            </NavLink>
          </li>
          <li className={"mb-md-6"}>
            <NavLink to={`/member/ticket/${document.cookie}`} disabled="disabled" style={{pointerEvents: `${(this.state.userInfo[0].CheckTicket === 0) ? "none" : "true"}`}}>
              <p className={`clickItem fs-5 text-gray cursor-pointer hover-black-20 mx-6 py-2 ${(this.state.userInfo[0].CheckTicket === 0) ? 'opacity-25' : ''}`} onClick={(e)=>this.addClass(e)} idx="5">
                <span className="material-icons fs-6 align-middle mb-1 me-2">confirmation_number</span>
                我的票券
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/member/channel/${document.cookie}`}>
              <p className="clickItem fs-5 text-gray cursor-pointer hover-black-20 mx-6 py-2" onClick={(e)=>this.addClass(e)} idx="6">
                <span className="material-icons fs-6 align-middle mb-1 me-2">play_circle_outline</span>
                創作者專區
              </p>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
  componentDidMount = async () => {
    let resultInfo = await Axios.get(`http://localhost:9000/user/${document.cookie}`);
    this.setState({userInfo: resultInfo.data});
  }
  uploadImg = async () => {
    const formData = new FormData();
    formData.append("userImg", this.state.selectedList[0].selectedFile, this.state.selectedList[0].selectedFile.name);
    let resultImg = await Axios.put(`http://localhost:9000/user/image/${document.cookie}`, formData);
    console.log(resultImg);

    swal({
      title: "更新成功",
      icon: "success",
      button: "確認"
    }).then(() => {
      window.location= `/member/${document.cookie}`;
    });
  }
  addClass = (e) => {
    let itemNum = e.target.attributes.idx.value;
    let itemArr = document.querySelectorAll('.clickItem');
    for (let i = 0; i < itemArr.length; i++) {
      if (itemArr[i].attributes.idx.value === itemNum) {
        itemArr[i].classList.add('active');
      } else {
        itemArr[i].classList.remove('active');
      }
    }
  }
}

export default MemberList;