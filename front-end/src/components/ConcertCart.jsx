import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';

class ConcertCart extends Component {
  state = {
    concertDefaultList: [
      {
        checkTicket: 1
      }
    ],
    ticketList: [{}],
    paymentList: [{}]
  }
  render() {
    return (
      <section className="border border-2 border-dark rounded-8 mb-md-30 p-10">
        <div className="row align-items-center">
          <div className="col-md-5">
            <img src={this.state.ticketList[0].TicketImage} alt="演唱會座位圖" />
          </div>
          <div className="col-md-6 offset-md-1">
            <h2 className="fs-3 fw-bold mb-12">《一曲入魂音樂嘉年華》&nbsp;官方購票特典</h2>
            <ul className="bg-white-opacity-5 p-4 mb-8">
              <li className="fs-5">演出時間：{this.state.ticketList[0].TicketDate}</li>
              <li className="border-bottom border-2 border-dark my-2"></li>
              <li className="fs-5">演出地點：{this.state.ticketList[0].TicketLocation}</li>
            </ul>
            <div className="bg-white-opacity-5 p-4">
              <ul className="row">
                <li className="col-md-6 fs-5">票區 Seat</li>
                <li className="col-md-3 fs-5">票價 Price</li>
                <li className="col-md-3 fs-5">數量 Count</li>
              </ul>
              <div className="border-bottom border-2 border-dark my-2"></div>
              <ul className="row mb-12">
                <li className="col-md-6 fs-5">{this.state.ticketList[0].TicketSeat}</li>
                <li className="col-md-3 fs-5">{this.state.ticketList[0].TicketPrice}&nbsp;元</li>
                <li className="col-md-3 d-flex align-items-center fs-5">
                  <button className="btn btn-s p-0" type="button">
                    <span className="material-icons fs-6 hover-primary me-3" onClick={this.doRemove}>remove</span>
                  </button>
                  {this.state.ticketList[0].TicketCount}
                  <button className="btn btn-s p-0" type="button">
                    <span className="material-icons fs-6 hover-primary ms-3" onClick={this.doAdd}>add</span>
                  </button>
                </li>
              </ul>
              <ul className="row align-items-center">
                <li className="col-md-7 fs-4 fw-bold text-primary">總計 Total：NT$ {this.state.ticketList[0].TicketTotal}&nbsp;元</li>
                <li className="col-md-3 offset-md-2">
                  <button type="button" className="btn btn-gradation-square btn-m w-100" data-bs-toggle="modal" data-bs-target="#buyTicket"><span>確認購買</span></button>
                </li>
              </ul>
            </div>
            <div className="modal fade" id="buyTicket" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <form className="modal-content modal-content-member p-md-10">
                  <h4 className="fs-3 fw-bold text-center mb-md-10">訂單資訊</h4>
                  <ul className="bg-black-opacity-20 text-blue p-4 mb-8">
                    <li className="fs-5">產品：《一曲入魂音樂嘉年華》</li>
                    <li className="border-bottom border-1 border-blue opacity-25 my-2"></li>
                    <li className="fs-5">票區：{this.state.ticketList[0].TicketSeat}</li>
                    <li className="border-bottom border-1 border-blue opacity-25 my-2"></li>
                    <li className="fs-5">付款金額：{this.state.ticketList[0].TicketTotal} 元</li>
                  </ul>
                  <label className="fs-5 w-100 mb-4">
                    信用卡號碼：
                    <input className="w-100 form-control form-control-addNewSong mt-1" type="text" name="CreditNum" value={this.state.paymentList[0].CreditNum}
                    onChange={
                      (e) => {
                        let newState = {...this.state};
                        newState.paymentList[0].CreditNum = e.target.value;
                        this.setState({newState});
                      }
                    } />
                  </label>
                  <div className="d-flex mb-4">
                    <label className="fs-5 w-50 me-4">
                      到期日：
                      <input className="w-100 form-control form-control-addNewSong mt-1" type="text" name="CreditDeadLine" value={this.state.paymentList[0].CreditDeadLine}
                      onChange={
                        (e) => {
                          let newState = {...this.state};
                          newState.paymentList[0].CreditDeadLine = e.target.value;
                          this.setState({newState});
                        }
                      } />
                    </label>
                    <label className="fs-5 w-50">
                      安全驗證碼：
                      <input className="w-100 form-control form-control-addNewSong mt-1" type="text" name="CreditSSC" value={this.state.paymentList[0].CreditSSC}
                      onChange={
                        (e) => {
                          let newState = {...this.state};
                          newState.paymentList[0].CreditSSC = e.target.value;
                          this.setState({newState});
                        }
                      } />
                    </label>
                  </div>
                  <label className="fs-5 w-100 mb-4">
                    持卡者姓名：
                    <input className="w-100 form-control form-control-addNewSong mt-1" type="text" name="CreditName" value={this.state.paymentList[0].CreditName}
                    onChange={
                      (e) => {
                        let newState = {...this.state};
                        newState.paymentList[0].CreditName = e.target.value;
                        this.setState({newState});
                      }
                    } />
                  </label>
                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-gradation-square btn-m me-4 px-md-8" data-bs-dismiss="modal"><span>取消</span></button>
                    <button type="button" className="btn btn-gradation-square btn-m px-md-8" onClick={this.addOrderClicked}><span>付款</span></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  componentDidMount = async () => {
    let result = await Axios.get(`http://localhost:9000/TicketData/${this.props.match.params.id}`);
    this.setState({ ticketList: result.data });

    let resultCard = await Axios.get(`http://localhost:9000/CreditCardData/${document.cookie}`);
    this.setState({ paymentList: resultCard.data });

    const scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }
  doRemove = () => {
    let newState = {...this.state};
    if (newState.ticketList[0].TicketCount === 1) {
      alert('確定要清空購物車嗎？');
      window.location = '/concert';
    } else {
      newState.ticketList[0].TicketCount -= 1
    }
    newState.ticketList[0].TicketTotal = newState.ticketList[0].TicketCount * this.state.ticketList[0].TicketPrice;
    this.setState({newState});
  }
  doAdd = () => {
    let newState = {...this.state};
    newState.ticketList[0].TicketCount += 1;
    newState.ticketList[0].TicketTotal = newState.ticketList[0].TicketCount * this.state.ticketList[0].TicketPrice;
    this.setState({newState});
  }
  addOrderClicked = async () => {
    let resultOrder = await Axios.post(`http://localhost:9000/MyTicketData/create/${document.cookie}`, this.state.ticketList);
    console.log(resultOrder);

    let updateCheck = async () => {
      let resultCheck = await Axios.put(`http://localhost:9000/user/${document.cookie}`, {checkTicket:1});
      console.log(resultCheck);
    }
    updateCheck();
    
    swal({
      title: "購買成功",
      text: "請前往會員中心查看您的票券明細",
      icon: "success",
      button: "確認"
    }).then(function () {
      window.location = "/concert";
    });
  }
}

export default ConcertCart;