import React, { Component } from 'react';
import Axios from 'axios';

class MemberDonateIn extends Component {
  state = {
    donateList: [{}]
  }
  render() {
    return (
      <div>
        <h3 class="d-inline-block fs-5 fw-bold bg-blue rounded-pill mb-md-8 px-6 py-3">被贊助清單</h3>
        <ul class="row">
          {this.state.donateList.map((donate,idx) =>
            <li class="col-md-6 mb-md-4">
              <div class="bg-primary-opacity-15 border-start border-primary border-5">
                <ul class="d-flex align-items-center p-md-4">
                  <li class="d-flex align-items-center">
                    <img class="w-50px rounded-circle" src={donate.UserImage} alt="用戶大頭照" />
                      <div class="ms-4">
                        <p class="fs-6">{donate.UserName}</p>
                        <p class="fs-6">{donate.DonateDate}</p>
                      </div>
                  </li>
                  <li class="fs-5 fw-bold text-danger animate__animated animate__fadeInDown ms-auto">
                    + NT$ {donate.DonateMoney}
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
    let resultInfo = await Axios.get(`http://localhost:9000/DonateData/${this.props.match.params.id}`);
    this.setState({donateList: resultInfo.data});
  }
}

export default MemberDonateIn;