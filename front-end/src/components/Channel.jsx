import React, { Component } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Axios from "axios";
import swal from 'sweetalert';

import Music from "./Music";
import ChannelBlog from "./ChannelBlog";


class Channel extends Component {
  state = {
    trackListUser: [{}],
    userInfo: [{ UserID: this.props.match.params.id }],
    channelUser: [{}],
    creditCardInfo: [{}],
    defaultDonate: [{ ChannelID: this.props.match.params.id, UserID: document.cookie, money: "", Donate: this.getNowDate() }],
    userTrack: [{}],
    // trackListAll: [{}],
    defaulttrack: [{ UserID: "", ChannelID: this.props.match.params.id }],
    otherChannel: [{}]
  };

  render() {
    return (
      <BrowserRouter>
        <main className="pb-40">
          <div className="homeImg">
            {this.state.channelUser.map((item, idx) => (
              <img src={item.ChannelImage} alt="封面" className="w-100 h-100 object-cover" />
            ))}
          </div>
          <div className="container">
            <section className="channel_userInfo row">
              <div className="channel_userImgLeft col-md-5 col-12">
                <img
                  src={this.state.userInfo[0].UserImage}
                  alt="頭像"
                  className="channel_userImg imgRadius"
                />
                <div className="pt-3 d-sm-block d-md-none">
                  <div className="ps-5 d-flex">
                    <span className="fs-1 pt-2 ">
                      <ins className="" onClick={this.test}>
                        {this.state.userInfo[0].UserName}
                      </ins>
                    </span>
                    <a href={this.state.channelUser[0].ChannelLink}><img src="/images/icon/instagram.png" alt="" width={"30px"} className="ms-3 pt-4" /></a>
                  </div>
                </div>
                <div className="pt-5">
                  <div className="pt-2">
                    <button
                      type="button"
                      id="isFollow"
                      style={{ width: "120px" }}
                      className={this.getClasses()}
                      onClick={this.doFollow}
                    >{this.FollowCheck()}
                    </button>
                    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark w-100">
                          {this.state.channelUser.map((item, idx) => (
                            <div className="modal-header">
                              <h4 className="modal-title text-white" id="exampleModalToggleLabel">贊助「{item.ChannelName}」</h4>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                          ))}
                          {this.state.creditCardInfo.map((item, idx) => (
                            <div className="modal-body">
                              <div className="d-flex justify-content-between p-2">
                                <h6 className="w-30 m-auto fs-6">請輸入贊助金額</h6>
                                <input
                                  type="text"
                                  className="form-control w-70"
                                  value={this.state.defaultDonate[0].money}
                                  onChange={e => {
                                    let newState = { ...this.state }
                                    newState.defaultDonate[0].money = e.target.value
                                    this.setState({ newState });
                                  }}
                                />
                              </div>
                              <div className="d-flex justify-content-between p-2">
                                <h6 className="w-30 m-auto fs-6">請選擇卡片</h6>
                                <select
                                  name=""
                                  id="card"
                                  className="form-select w-70"
                                >
                                  <option value="">{item.CreditNum}</option>
                                </select>
                              </div>
                              <div
                                className="mt-5 bg-black"
                                style={{ height: "200px", borderRadius: "20px" }}
                              >
                                <div className=" text-center pt-5">
                                  <div className="d-flex justify-content-between">
                                    <div className="ps-5">
                                      <img src="/images/icon/MastercardLogo.jpeg" alt="" style={{ width: '80px' }} />
                                      {/* <span className="fw-bold">玉山銀行</span> */}
                                    </div>
                                    <div className="">
                                      <img src="/images/icon/outline_rss_feed_white_36dp.png" alt="" className="cardIcon" />
                                    </div>
                                  </div>
                                  <div>
                                    <p className="fw-bold fs-4" style={{ letterSpacing: '5px' }}>{item.CreditNum}</p>
                                  </div>
                                  <div className="text-start ps-18 pt-5">
                                    <p>{item.CreditDeadLine}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={this.doDonate} data-bs-toggle="modal">送出</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-secondary btn-m ms-4  px-4 hvr-bounce-to-right" data-bs-toggle="modal" href="#exampleModalToggle" role="button" id="donate" style={{ width: "120px" }}>&rarr; 抖內</button>
                  </div>
                </div>
                {this.state.channelUser.map((item, idx) => (
                  <div className="ps-6 mt-5 d-none d-md-block">
                    <span className="fs-5 followText">追蹤人數：</span>
                    <span className="fs-5 followText">{item.ChannelFollow} 粉絲</span>
                  </div>
                ))}
                {this.state.channelUser.map((item, idx) => (
                  <div className="mt-3 ps-6 d-none d-md-block">
                    <span className="fs-5 followText">成立時間：</span>
                    <span className="fs-5 followText">{item.ChannelDate}</span>
                  </div>
                ))}
              </div>
              <div className="col-md-7 col-12 channelInfoDiv d-none d-md-block" style={{ paddingTop: " 280px" }}>
                <div className="d-flex">
                  <div className="">
                    <span className="fs-1 pt-2">
                      <ins className="" onClick={this.test}>
                        {this.state.userInfo[0].UserName}
                      </ins>
                    </span>
                  </div>
                  <div>
                    <a href={this.state.channelUser[0].ChannelLink}><img src="/images/icon/instagram.png" alt="" width={"36px"} className="ms-3 pt-2" /></a>
                  </div>
                </div>
                {this.state.channelUser.map((item, idx) => (
                  <div className="pt-8 lh-lg">
                    <span className="text-justify ">{item.ChannelIntro}</span>

                  </div>
                ))}
              </div>
              {/* Info phoneSize */}
              <div className="col-md-7 col-12 channelInfoDiv d-sm-block d-md-none mt-6">
                {this.state.channelUser.map((item, idx) => (
                  <div className="mt-5 ps-6">
                    <span className="fs-5 followText">追蹤人數：</span>
                    <span className="fs-5 followText">{item.ChannelFollow} 粉絲</span>
                  </div>
                ))}
                {this.state.channelUser.map((item, idx) => (
                  <div className="mt-3 ps-6">
                    <span className="fs-5 followText">成立時間：</span>
                    <span className="fs-5 followText">{item.ChannelDate}</span>
                  </div>
                ))}
                {this.state.channelUser.map((item, idx) => (
                  <div className="pt-8 lh-lg">
                    <div className="text-end">
                      <a data-bs-toggle="collapse" className="fs-5 text-gray" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">more..</a>
                    </div>
                    <div className="collapse p-5 mt-3" id="collapseExample">
                      <span className="text-justify fs-5" >
                        {item.ChannelIntro}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="chaContent">
              <ul className="nav channelDiv mb-3 justify-content-center ">
                <li className="nav-item">
                  <NavLink
                    to={`/channel/${this.props.match.params.id}`}
                    className="btnLink btnActive btn btn-lg btn-outline-secondary"
                    style={{ width: "150px" }}
                  >
                    音樂創作
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <NavLink to="/channelBlog" className="btn tab_link"> */}
                  <NavLink
                    to={`/channelBlog/${this.props.match.params.id}`}
                    className="btnLink btnActive btn btn-lg btn-outline-secondary"
                    style={{ width: "150px" }}
                  >
                    部落格
                  </NavLink>
                </li>
              </ul>

              <Switch>
                <Route path="/channel" component={Music} exact />
                <Route path="/channel/:id" component={Music} exact />
                <Route path="/channelBlog/:id" component={ChannelBlog} />
                {/* <Route
                  path="/channel/channelBlog/:id"
                  component={ChannelBlog}
                /> */}
              </Switch>
            </section>
            <section>
              <h3>其他創作者頻道</h3>
              <div className="row">
                {this.state.otherChannel.map((item, idx) => (
                  <div className="col-md-2 col-6 mt-10">
                    <div className="imgContainer hvr-bob">
                      <NavLink
                        to={`/channel/${item.UserID}`}
                        className="text-white"
                        onClick={this.changePage}
                      >
                        <div className="imgDiv">
                          <img
                            src={item.UserImage}
                            alt=""
                            className="object-cover"
                          />
                        </div>
                        <p className="text-center text-truncate pt-8 fs-5">{item.ChannelName}</p>
                        {/* <p className="text-truncate">{item.Singer}</p> */}
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main >
      </BrowserRouter >
    );
  }
  componentDidMount = async () => {
    //頻道資料
    let result = await Axios.get(
      `http://localhost:9000/channel/${this.props.match.params.id}`
    );
    this.setState({ channelUser: result.data });

    //做作者登入資料
    let result2 = await Axios.get(
      `http://localhost:9000/channelUserInfo/${this.props.match.params.id}`);
    this.setState({ userInfo: result2.data });

    //登入創作者信用卡資料
    let result3 = await Axios.get(
      `http://localhost:9000/creditCardData/${document.cookie == "" ? 20 : document.cookie}`);
    this.setState({ creditCardInfo: result3.data });

    //指定追蹤名單
    let result4 = await Axios.get(`http://localhost:9000/trackList/${this.props.match.params.id}`)
    this.setState({ userTrack: result4.data })

    //其他創作者頻道
    let result5 = await Axios.get(`http://localhost:9000/otherchannel/${this.props.match.params.id}`)
    this.setState({ otherChannel: result5.data })

    //登入判斷ChannelID=UserID 不能點擊追蹤按鈕

    let channel = this.state.channelUser[0].ChannelID;
    let follow = document.querySelector('#isFollow');
    let donate = document.querySelector('#donate')
    let newState = { ...this.state };
    newState.defaulttrack[0].UserID = document.cookie
    this.setState({ newState });

    if (channel == this.state.defaulttrack[0].UserID || this.state.defaulttrack[0].UserID == "") {
      follow.setAttribute('disabled', 'disabled');
      donate.setAttribute('disabled', 'disabled');
    }
    let result6 = await Axios.get(`http://localhost:9000/tracklistdata/${document.cookie == "" ? 20 : document.cookie}/${this.props.match.params.id}`)
    this.setState({ trackListUser: result6.data })
    // console.log(result6)
    console.log(this.state.defaulttrack[0].UserID)
    // console.log(this.state.trackListUser[0])

  }



  //取得日期
  getNowDate() {
    var dd = new Date();
    return dd.toLocaleDateString()
  }
  test = async () => {

    console.log(this.state.trackListUser[0]);

  };

  //沒有資料就追蹤，有就刪除
  doFollow = async () => {
    let newState = { ...this.state }
    console.log(this.state.trackListUser[0]);
    if (this.state.trackListUser[0]) {
      newState.channelUser[0].ChannelFollow -= 1;
      let resultFollow = await Axios.post(`http://localhost:9000/followUpdate`, this.state.channelUser);
      let resultDelete = await Axios.delete(`http://localhost:9000/trackDelete/${this.props.match.params.id}`, this.state.userTrack);
    } else {
      let resultAdd = await Axios.post(`http://localhost:9000/trackAdd`, this.state.defaulttrack);
      newState.channelUser[0].ChannelFollow += 1
      this.setState({ newState });
      let resultFollow = await Axios.post(`http://localhost:9000/followUpdate`, this.state.channelUser)
      console.log(resultAdd);
    }
  }
  //追蹤button  text change
  FollowCheck() {
    let Listchecked = "";
    Listchecked += (this.state.trackListUser[0]) ? "取消追蹤" : "+ 追蹤";
    return Listchecked;
  }
  //追蹤button  color change
  getClasses() {
    let classes = "btn btn-m ms-5 px-4 hvr-bounce-to-right btn-";
    classes += (this.state.trackListUser[0]) ? "primary" : "secondary";
    return classes;
  }

  //抖內
  doDonate = async () => {
    let result5 = await Axios.post(
      "http://localhost:9000/create/donate",
      this.state.defaultDonate);
    swal({
      title: `感謝${this.state.creditCardInfo[0].CreditName}贊助`,
      // text:
      icon: 'success',
      button: '確認'
    })

  }
  componentDidUpdate = async () => {
    // window.scroll(0, 0);
    let result6 = await Axios.get(`http://localhost:9000/tracklistdata/${document.cookie == "" ? 20 : document.cookie}/${this.props.match.params.id}`)
    this.setState({ trackListUser: result6.data })

  }
  changePage = async () => {
    setTimeout(() => {
      document.location.reload();
    }, 0)
  }
}
export default Channel;
