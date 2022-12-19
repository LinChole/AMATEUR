import React, { Component } from 'react';
import Axios from 'axios';

class MemberDonateOut extends Component {
  state = {
    myDonateList: [{}]
  }
  render() {
    return (
      <div>
        <h3 class="d-inline-block fs-5 fw-bold bg-blue rounded-pill mb-md-8 px-6 py-3">已贊助清單</h3>
        <ul class="row">
          {this.state.myDonateList.map((myDonate,idx) =>
            <li class="col-md-6 mb-md-4">
              <div class="bg-primary-opacity-15 border-start border-primary border-5">
                <ul class="d-flex align-items-center p-md-4">
                  <li class="d-flex align-items-center">
                    <img class="w-50px rounded-circle" src={myDonate.UserImage} alt="用戶大頭照" />
                      <div class="ms-4">
                        <p class="fs-6">{myDonate.ChannelName}</p>
                        <p class="fs-6">{myDonate.DonateDate}</p>
                      </div>
                  </li>
                  <li class="fs-5 fw-bold text-green animate__animated animate__fadeInUp ms-auto">
                    - NT$ {myDonate.DonateMoney}
                  </li>
                </ul>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
  componentDidMount = async () => {
    let resultInfo = await Axios.get(`http://localhost:9000/MyDonateData/${this.props.match.params.id}`);
    this.setState({myDonateList: resultInfo.data});
  }
}

export default MemberDonateOut;