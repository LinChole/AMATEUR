import React, { Component } from 'react';
import Axios from 'axios';

class MemberTicket extends Component {
  state = {
    myTicketList: [{}]
  }
  render() {
    return (
      <div>
        <h2 class="fs-2 fw-bold mb-md-10">我的票券</h2>
        <div className="w-90">
          <img className="rounded-16 mb-4" src={this.state.myTicketList[0].myTicketImage} alt="票劵圖片" />
          <div className="d-flex align-items-center mb-8">
          <span class="material-icons fs-4 text-primary me-2">circle_notifications</span>
            <p className="fs-5">請開啟本頁出示票券或將票券儲存至手機內掃描 QR Code 入場。</p>
            <a className="btn btn-s btn-gradation-square px-4" href="/images/一曲入魂演唱會門票.png" download="一曲入魂演唱會門票.png"><span>下載票券</span></a>
          </div>
          <ul className="bg-white-opacity-5 p-4">
            <li className="fs-5">演出時間：{this.state.myTicketList[0].TicketDate}</li>
            <li className="border-bottom border-2 border-dark my-2"></li>
            <li className="fs-5">演出地點：{this.state.myTicketList[0].TicketLocation}</li>
            <li className="border-bottom border-2 border-dark my-2"></li>
            <li className="fs-5">票區位置：{this.state.myTicketList[0].TicketSeat}</li>
            <li className="border-bottom border-2 border-dark my-2"></li>
            <li className="fs-5">購票數量：{this.state.myTicketList[0].myTicketCount} 張</li>
            <li className="border-bottom border-2 border-dark my-2"></li>
            <li className="fs-5">購票金額：{this.state.myTicketList[0].myTicketTotal} 元</li>
          </ul>
        </div>
      </div>
    );
  }
  componentDidMount = async () => {
    let result = await Axios.get(`http://localhost:9000/MyTicketData/${this.props.match.params.id}`);
    this.setState({myTicketList: result.data});

  }
}

export default MemberTicket;