import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';

class MemberAccount extends Component {
  state = {
    userInfo: [{}],
    bankList: [{}]
  }
  render() {
    return (
      <div>
        <h2 className="fs-2 fw-bold mb-md-10">帳號管理</h2>
        <section>
          <h3 className="d-inline-block fs-5 fw-bold bg-blue rounded-pill mb-md-8 px-6 py-3">個人資料</h3>
          <form className="row align-items-stretch mb-md-12" method="" action="">
            <div className="col-5">
              <div className="bg-dark-gray rounded-16 p-6">
                <label className="fs-5 w-100 mb-4">
                  會員名稱
                  <input className="d-inline form-control form-control-info text-gray mt-1" type="text" name="UserName" value={this.state.userInfo[0].UserName} disabled />
                </label>
                <label className="fs-5 w-100 mb-4">
                  性別
                  <input className="d-inline form-control form-control-info text-gray mt-1" type="text" name="UserSex" value={this.state.userInfo[0].UserSex} disabled />
                </label>
                <label className="fs-5 w-100 mb-4">
                  聯絡電話
                  <input className="d-inline form-control form-control-info text-gray mt-1" type="text" name="UserPhone" value={this.state.userInfo[0].UserPhone} disabled />
                </label>
                <label className="fs-5 w-100">
                  生日
                  <input className="d-inline form-control form-control-info text-gray mt-1" type="text" name="UserBirth" value={this.state.userInfo[0].UserBirth} disabled />
                </label>
              </div>
            </div>
            <div className="col-7 d-flex flex-column">
              <div className="bg-dark-gray rounded-16 mb-auto p-6">
                <label className="fs-5 w-100 mb-4">
                  帳號
                  <input className="d-inline form-control form-control-info text-gray mt-1" type="text" name="UserMail" value={this.state.userInfo[0].UserMail} disabled />
                </label>
                <label className="fs-5 w-100 mb-4">
                  密碼
                  <input className="d-inline form-control form-control-info text-gray mt-1" type="text" name="UserPW" value="******" disabled />
                </label>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-gradation-square btn-m me-4 px-md-10" type="button" data-bs-toggle="modal" data-bs-target="#editUInfo"><span>編輯</span></button>
              </div>
            </div>
          </form>
          <div className="modal fade" id="editUInfo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
            <div className="modal-dialog modal-dialog-member modal-dialog-centered">
              <form className="modal-content modal-content-member p-md-10" method="" action="">
                <h4 className="fs-3 fw-bold text-center mb-md-10">我的個人資料</h4>
                <div className="d-flex justify-content-between mb-md-10">
                  <div className="w-40">
                    <label className="fs-5 w-100 mb-4">
                      會員名稱
                      <input className="d-inline form-control form-control-edit mt-1" type="text" name="UserName" value={this.state.userInfo[0].UserName}
                        onChange={
                          (e) => {
                            let newState = { ...this.state };
                            newState.userInfo[0].UserName = e.target.value;
                            this.setState({ newState });
                          }
                        } />
                    </label>
                    <label className="fs-5 w-100 mb-4">
                      性別
                      <input className="d-inline form-control form-control-edit mt-1" type="text" name="UserSex" value={this.state.userInfo[0].UserSex}
                        onChange={
                          (e) => {
                            let newState = { ...this.state };
                            newState.userInfo[0].UserSex = e.target.value;
                            this.setState({ newState });
                          }
                        } />
                    </label>
                    <label className="fs-5 w-100 mb-4">
                      聯絡電話
                      <input className="d-inline form-control form-control-edit mt-1" type="text" name="UserPhone" value={this.state.userInfo[0].UserPhone}
                        onChange={
                          (e) => {
                            let newState = { ...this.state };
                            newState.userInfo[0].UserPhone = e.target.value;
                            this.setState({ newState });
                          }
                        } />
                    </label>
                    <label className="fs-5 w-100">
                      生日
                      <input className="d-inline form-control form-control-edit mt-1" type="text" name="UserBirth" value={this.state.userInfo[0].UserBirth}
                        onChange={
                          (e) => {
                            let newState = { ...this.state };
                            newState.userInfo[0].UserBirth = e.target.value;
                            this.setState({ newState });
                          }
                        } />
                    </label>
                  </div>
                  <div className="w-60">
                    <label className="fs-5 w-100 mb-4 ps-md-10 ps-md-10">
                      帳號
                      <input className="d-inline form-control form-control-info mt-1" type="text" name="UserMail" value={this.state.userInfo[0].UserMail} disabled />
                    </label>
                    <label className="fs-5 w-100 mb-4 ps-md-10 ps-md-10">
                      密碼
                      <input className="d-inline form-control form-control-edit mt-1" type="text" name="UserPW" value="******"
                        onChange={
                          (e) => {
                            let newState = { ...this.state };
                            newState.userInfo[0].userPassword = e.target.value;
                            this.setState({ newState });
                          }
                        } />
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-gradation-square btn-m me-4 px-md-8" data-bs-dismiss="modal"><span>取消</span></button>
                  <button type="button" className="btn btn-gradation-square btn-m px-md-8" onClick={this.editInfoClicked}><span>確認</span></button>
                </div>
              </form>
            </div>
          </div>
        </section>
        <section>
          <h3 className="d-inline-block fs-5 fw-bold bg-blue rounded-pill mb-md-8 px-6 py-3">連結帳戶資訊</h3>
          <div className="bg-dark-gray rounded-16 p-6">
            <div className="row">
              <div className="col-md-5">
                <div className="d-flex flex-column justify-content-between bg-gradation rounded-16 w-100 h-100 overflow-hidden p-6">
                  <div className="d-flex align-items-center">
                    <span className="material-icons">currency_bitcoin</span>
                    <span className="material-icons">currency_bitcoin</span>
                    <span className="material-icons">currency_bitcoin</span>
                  </div>
                  <p className="display-2 fw-bold opacity-10 align-self-center">ACCOUNT</p>
                  <div className="d-flex align-items-center align-self-end">
                    <p className="fs-5 fw-bold me-2">Bank card</p>
                    <span className="material-icons fs-5">account_balance</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 offset-md-1">
                <ul>
                  <li className="fs-5 mb-2">
                    <button className="btn btn-link fs-5 active p-0" type="button">銀行帳戶</button>
                    ｜
                    <button className="btn btn-link fs-5 p-0" type="button">信用卡</button>
                  </li>
                  <li className="fs-5 mb-2">戶名：{this.state.bankList[0].BankName}</li>
                  <li className="fs-5 mb-2">銀行代碼：{this.state.bankList[0].BankCode}</li>
                  <li className="fs-5 mb-2">撥款帳號：{this.state.bankList[0].BankNum}</li>
                  <li>
                    <button className="btn btn-gradation-square btn-s active me-4 px-md-4" type="button" idx="2"><span>+ Add New</span></button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  componentDidMount = async () => {
    let resultInfo = await Axios.get(`http://localhost:9000/user/${this.props.match.params.id}`);
    this.setState({ userInfo: resultInfo.data });
    let resultBank = await Axios.get(`http://localhost:9000/BankData/${this.props.match.params.id}`);
    this.setState({ bankList: resultBank.data });

    let cellPhone = this.state.userInfo[0].UserPhone.toString().padStart(10, '0');
    let newState = { ...this.state };
    newState.userInfo[0].UserPhone = cellPhone;
    this.setState({ newState });
  }
  editInfoClicked = async () => {
    let result = await Axios.put('http://localhost:9000/user/', this.state.userInfo);
    console.log(result);

    swal({
      title: "更新成功",
      icon: "success",
      button: "確認"
    }).then(() => {
      window.location = `/member/account/${this.props.match.params.id}`;
    });
  }
}

export default MemberAccount;