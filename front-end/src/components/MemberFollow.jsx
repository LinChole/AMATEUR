import React, { Component } from 'react';
import Axios from 'axios';

class MemberFollow extends Component {
  state = {
    followList: [{}]
  }
  render() {
    return (
      <div>
        <h2 className="fs-2 fw-bold mb-md-10">追蹤清單</h2>
        <ul className="row">
          {this.state.followList.map((follow,idx) =>
            <li className="col-md-3 cursor-pointer">
              <div className="hover-outline-primary hover-scale-105 position-relative p-4">
                <div className="squareRounded squareRounded-topLeft position-absolute top-0 start-0"></div>
                <div className="squareRounded squareRounded-topRight position-absolute top-0 end-0"></div>
                <div className="squareRounded squareRounded-bottomLeft position-absolute bottom-0 start-0"></div>
                <div className="squareRounded squareRounded-bottomRight position-absolute bottom-0 end-0"></div>
                <img className="mb-2 rounded-8" src={follow.UserImage} alt="頻道照片" />
                <div className="d-flex justify-content-between align-items-center">
                  <p className="fs-5">{follow.ChannelName}</p>
                  <span className="material-icons text-primary">verified_user</span>
                </div>
                <a href={`/channel/${follow.UserID}`} className="stretched-link"></a>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
  componentDidMount = async () => {
    let resultFollow = await Axios.get(`http://localhost:9000/trackList/${this.props.match.params.id}`);
    this.setState({followList: resultFollow.data});
  }
}

export default MemberFollow;