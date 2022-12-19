import React, { Component } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";

class Index extends Component {
  constructor(props) {
    super(props);
    this.url = `${this.state.musicData[this.state.MusicIndex].MusicMp3}`
    this.audio = new Audio(this.url);
  }
  state = {
    MusicListID: [
      {
        UserID: 1, //
        MusicID: 1
      }
    ],
    MusicListText: '新增成功',
    deleteMusicListText: "刪除成功",
    musicData: [{}],
    MusicIndex: 0,
    hotSong: [{}],
    defaultLike: [{}],
    songList1: [{}],
    songList1_6: [{}],
    songList2: [{}],
    songList2_6: [{}],
    songList3: [{}],
    songList3_6: [{}],
    songList4: [{}],
    songList4_6: [{}],
    songList5: [{}],
    songList5_6: [{}],
    blogList: [{}],
  };
  componentDidUpdate(prevProps, prevState) {
    if (localStorage.getItem('MusicIndex') !== this.state.MusicIndex) {
      this.setState({ MusicIndex: localStorage.getItem('MusicIndex') })
      console.log('index local 正確的' + this.state.MusicIndex);
    }
    if (localStorage.getItem('MusicIndex') == null) {
      localStorage.setItem('MusicIndex', 0)
    }
  }
  changeHeart = (MusicID) => {
    let temp = document.querySelectorAll('.heartDiv');
    let icon = document.querySelectorAll('.heartIcon');
    let icon2 = document.querySelectorAll('.heartIcon2');

    console.log(MusicID);
    for (var i = 0; i < temp.length; i++) {
      if (parseInt(temp[i].attributes.idx.value) === MusicID) {
        console.log(MusicID, "ok");
        // // console.log(icon[i].attributes.class.value)
        // icon[i].classList.add("d-none");
        // icon2[i].classList.remove("d-none");
        console.log(icon[i])
        console.log(icon2[i])
        // console.log('test', icon[i].attributes.class.value.indexOf("d-none"))
        if (icon[i].attributes.class.value.indexOf("d-none") > -1) {
          icon[i].classList.remove("d-none");
          icon2[i].classList.add("d-none")
        } else {
          icon[i].classList.add("d-none");
          icon2[i].classList.remove("d-none")
        }
      } else {
        console.log("NO")
      }

    }

  }
  clickMusic = (e) => {
    // console.log(this.state.musicData[this.state.MusicIndex].MusicMp3);
    // console.log(this.state.musicData);
    // console.log(this.state.MusicIndex);
    // localStorage.removeItem('MusicIndex')
    // console.log('這是什麼' + e.target.getAttribute('class'));
    if (e.target.getAttribute('class') == 'addMusic' && e.target.getAttribute('class') == 'btn btn-black hvr-bounce-in') {
      return
    } else {
      this.state.MusicIndex = (e.target.getAttribute('data-num')) - 1
      this.url = `${this.state.musicData[this.state.MusicIndex].MusicMp3}`
      console.log(this.url);
      this.setState({})
      console.log('index 正確的' + this.state.MusicIndex);
      localStorage.setItem('MusicIndex', JSON.stringify(this.state.MusicIndex))
      const myPlayList = document.querySelectorAll('.myPlayList')
      const ListMusic = document.querySelectorAll('.ListMusic')

      ListMusic.forEach((item, index) => {
        item.classList.remove('active')
      })
      myPlayList.forEach((item, index) => {
        item.classList.remove('active')
      })
      myPlayList[localStorage.getItem('MusicIndex')].classList.add('active')
      this.setState({})
    }



  }

  //新增音樂到歌單
  ClickAddMusic = async (e) => {
    console.log(e.target.getAttribute('data-num'));//musicID
    if (e.target.getAttribute('class') !== 'addMusic' && document.cookie == "") {
      return
    } else {
      this.state.MusicListID[0].MusicID = e.target.getAttribute('data-num')
      this.state.MusicListID[0].UserID = document.cookie
      this.setState({})
      console.log(this.state.MusicListID);
      let result = await Axios.post
        ("http://localhost:9000/MusicList/add", this.state.MusicListID)
        .then((response) => { // 成功後要做的事
          console.log(response);
          if (response.data.affectedRows === 1) {

            this.setState({ MusicListText: '新增成功' })
          } else {

            console.log('已有重複歌曲');
            this.setState({ MusicListText: '已有重複歌曲' })
          }

        })
        .catch((error) => console.log(error))

      this.setState({})
      let allMusicList = await Axios.get(`http://localhost:9000/MusicList/${document.cookie == "" ? "" : document.cookie}`)

      this.setState({ allMusicList: allMusicList.data })
    }

  }
  clickLog = (e) => {
    console.log(e.target.getAttribute('data-num'));//musicID
    console.log(e.target.getAttribute('class'));
  }
  render() {

    return (
      <>
        {/* <MusicPlayer MusicIndex={this.state.MusicIndex} url={this.url} ></MusicPlayer> */}
        <main>
          <section
            className="sloganBanner-lg d-none d-md-block"
            style={{
              backgroundImage: 'url("./images/index/sloganBannerLg.png")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "90vh",
            }}
          ></section>
          <section
            class="vh-100 sloganBanner-md d-sm-block d-md-none pt-15"
            style={{
              backgroundImage: 'url("./images/index/sloganBannerMd.png")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          ></section>
          {/* <!-- 熱門單曲 --> */}
          <section className=" container pt-20">
            <h2 className="fs-1 ">全站熱門單曲</h2>
            <div className="d-none d-md-block">
              <ul className="row pt-14 px-8">
                <li className="col-md-1 col-3  m-auto"></li>
                <li className="col-md-3 col-4  m-auto">歌名</li>
                <li className="col-md-3 col-3  m-auto">創作人</li>
                <li className="col-md-2 d-none d-md-block  m-auto">專輯</li>
                <li className="col-md-1 d-none d-md-block  m-auto">時間</li>
                <li className="col-md-1 col-1  m-auto"></li>
                <li className="col-md-1 col-1  m-auto"></li>
              </ul>
            </div>
            <div className="scrollbar d-none d-md-block" id="style-3">
              {this.state.hotSong.map((item, idx) => (
                <ul onClick={this.clickMusic} data-num={item.MusicID} className="row pt-4 pb-3  px-8 border-bottom-secondery imgContainer cursor-pointer heartDiv" idx={item.MusicID}>
                  <li className="col-md-1 col-3 px-0 my-0"
                    style={
                      {
                        height: '48px',
                        width: "48px",
                      }
                    }>
                    <img
                      src={item.MusicImage}
                      data-num={item.MusicID}
                      alt=""
                      className="rounded-circle cursor-pointer"
                      style={
                        {
                          maxWidth: "48px",
                          width: '100%',
                          height: '100%'
                        }
                      }
                    />
                    <div class="imgPalyIcon">
                      <button data-num={item.MusicID} type="button" class="btn p-0" >
                        <img
                          data-num={item.MusicID}
                          src="./images/icon/play_circle_outline_white_48dp.svg"
                          alt="play"
                        />
                      </button>
                    </div>
                  </li>
                  <li className="col-md-3 col-4 m-auto" data-num={item.MusicID}>
                    <NavLink to={`/channel/${item.UserID}`} className="linkHover">
                      {item.MusicName}
                    </NavLink>
                  </li>
                  <li className="col-md-3 col-3  m-auto">
                    <NavLink to={`/channel/${item.UserID}`} className="linkHover">
                      {item.Singer}
                    </NavLink>
                  </li>
                  <li className="col-md-2 d-none d-md-block  m-auto">
                    <NavLink to={`/channel/${item.UserID}`} className="linkHover">
                      {item.Album}
                    </NavLink>
                  </li>
                  <li className="col-md-1 d-none d-md-block  m-auto">
                    {item.MusicTime}
                  </li>
                  <li className="col-md-1 col-1  m-auto">
                    <button className="btn btn-black hvr-bounce-in" type="button" data-num={item.MusicID} data-bs-toggle="modal" data-bs-target="#exampleModal3" onClick={this.ClickAddMusic}>
                      <img className="addMusic" data-num={item.MusicID} src="./images/icon/plus-solid 1.png" alt="" />
                    </button>
                  </li>
                  <li className="col-md-1 col-1  m-auto">
                    <button type="button" className="btn hvr-bounce-in" onClick={() => { this.changeHeart(item.MusicID) }}>
                      <img src={`/images/icon/${(item.CheckLike === 1) ? "heart2.png" : "heart.png"}`} alt="" className="heartIcon" />
                    </button>
                  </li>
                </ul>
              ))}
            </div>
            {/* <!-- 熱門單曲 Phone Size --> */}
            <div
              className="scrollbar d-sm-block d-md-none border-bottom-seconder"
              id="style-3"
            >
              {this.state.hotSong.map((item, idx) => (

                <div onClick={this.clickMusic} data-num={item.MusicID} className="row px-2 pt-8 pb-3 border-bottom-secondery imgContainer heartDiv">
                  <div className="col-2">

                    <img
                      src={item.MusicImage}
                      alt=""
                      className="rounded-circle"
                      style={{ maxWidth: "48px" }}
                      data-num={item.MusicID}
                    />
                    <div class="imgPalyIconSm">
                      <button type="button" class="btn">
                        <img
                          src="../images/icon/play_circle_outline_white_48dp.svg"
                          alt="play"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="col-6" data-num={item.MusicID}>
                    <NavLink to={`/channel/${item.UserID}`} className="linkHover">
                      <h6 className="">{item.MusicName}</h6>
                      <p className="fs-8 mt-2">
                        {item.Singer}。{item.Album}
                      </p>
                    </NavLink>
                  </div>
                  <div className="col-1 m-auto">
                    <p className="">{item.MusicTime}</p>
                  </div>
                  <div className="col-2 me-8 ms-1" data-num={item.MusicID}>
                    <div className="drop">
                      <button className="dropbt btn" data-num={item.MusicID}>
                        <img
                          src="./images/icon/ellipsis-vertical-solid 1.png"
                          alt=""
                        />
                      </button>
                      <div className="dropbox">
                        <button type="button" className="btn hvr-bounce-in" onClick={() => { this.changeHeart(item.MusicID) }}>
                          <img src={`/images/icon/${(item.CheckLike === 1) ? "heart2.png" : "heart.png"}`} alt="" className="heartIcon" />喜歡
                        </button>
                        <button onClick={this.ClickAddMusic} type="button" className="btn" data-num={item.MusicID} data-bs-toggle="modal" data-bs-target="#exampleModal4">
                          <img className="addMusic" data-num={item.MusicID} src="./images/icon/plus-solid 1.png" alt="" /> 儲存
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* <!-- 競賽活動、演唱會 --> */}
          <section
            className="activityBanner w-100 d-none d-md-block"
            style={{
              backgroundImage: 'url("./images/index/活動演唱會banner.png")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="container activityContent py-20 carousel slide"
              id="carouselActivity"
              data-bs-ride="carousel"
            >
              <h2 className="fs-1">創作競賽 | 演唱會</h2>
              <div className="float-end">
                <button
                  className="control-prev btn btn-outline-secondary"
                  type="button"
                  data-bs-target="#carouselActivity"
                  data-bs-slide="prev"
                >
                  <img src="./images/icon/chevron-left-solid 1.png" alt="" />
                </button>
                <button
                  className="control-next btn btn-outline-secondary"
                  type="button"
                  data-bs-target="#carouselActivity"
                  data-bs-slide="next"
                >
                  <img src="./images/icon/chevron-right-solid 1.png" alt="" />
                </button>
              </div>
              {/* <!-- 活動1 --> */}
              <div className="carousel-inner mySwiperActivityImg">
                <div className="carousel-item active" data-bs-interval="100000">
                  <div className="row align-items-center px-12">
                    <div className=" col-md-8 mt-14">
                      <img src="http://localhost:9000/img/演唱會bg.png" alt="" className="object-cover w-100 VoteImg" />
                    </div>
                    <div className="activityContent col-md-4 mt-14">
                      <p className="fs-4">AMATEUR｜一曲入魂音樂嘉年華</p>
                      {/* 修改mt,mb */}
                      <div className="mt-5 mb-3">
                        <button className="btn-xs btn-blue text-white">
                          售票中
                        </button>
                        <span className="ms-3 text-blue">
                          2022-12-23 23:59 截止
                        </span>
                      </div>
                      <p className="ctivityText text-justify">
                        AMATEUR 音樂創作平台致力於打造適合音樂素人及樂團展現創作、演唱、傳承的舞台，一步步引領他們更接近夢想。活動邀請1~7屆入圍音樂創作者、樂團一同演出。台灣獨立樂團樂迷每年絕對要參加的一大盛事，起步較早的野台開唱走入歷史後，AMATEUR繼續在獨立樂團界吸收養分，現已成為跨足主流及地下的國際級音樂節，今年鐵鳥票開賣15秒之內全部完售，有興趣的朋友可以關注售票的動態。
                      </p>
                      <NavLink to="/concert" className="btn btn-xl btn-gradation-pill mt-6">
                        <span>查看活動</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
                {/* <!-- 活動2 --> */}
                <div className="carousel-item" data-bs-interval="100000">
                  <div className="row align-items-center px-12">
                    <div className=" col-md-8 mt-14" >
                      <img src="http://localhost:9000/img/創作競賽bg.png" alt="" className="object-cover w-100 VoteImg" />
                    </div>
                    <div className="activityContent col-md-4 mt-14">
                      <p className="fs-4">第八屆聲聲不息創作選拔賽</p>
                      {/* 修改mt,mb */}
                      <div className="mt-5 mb-3">
                        <button className="btn-xs btn-blue text-white">
                          售票中
                        </button>
                        <span className="ms-3 text-blue">
                          2022-12-31 23:59 截止
                        </span>
                      </div>
                      <p className="ctivityText text-justify">
                        第八屆 發現新星選拔賽 舉辦至今邁向第八年時光,目的是提供一個可以盡情展現熱情,展現音樂,勇敢追夢的你一個舞台去發光發熱, 不管是樂團或是素人歌手可以藉此活動分享音樂,作品及理念,甚至是獲得娛樂公司的專業培訓機會, 本次選拔賽也提供豐厚獎金等你來拿,不想錯過這次的機會,趕快來報名2022第八屆 發現新星選拔賽吧！！
                      </p>
                      <NavLink to="/contest" className="btn btn-xl btn-gradation-pill mt-6">
                        <span>查看活動</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!--活動、演唱會 Phone Size --> */}
          <section className="w-100 d-sm-block d-md-none">
            <div
              className="container activityContent py-20 carousel slide"
              id="carouselActivitySm"
              data-bs-ride="carousel"
            >
              <h2 className="fs-1">創作競賽 | 演唱會</h2>
              <div className="float-end">
                <button
                  className="control-prev btn btn-secondary"
                  type="button"
                  data-bs-target="#carouselActivitySm"
                  data-bs-slide="prev"
                >
                  <img src="./images/icon/chevron-left-solid 1.png" alt="" />
                </button>
                <button
                  className="control-next btn btn-secondary"
                  type="button"
                  data-bs-target="#carouselActivitySm"
                  data-bs-slide="next"
                >
                  <img src="./images/icon/chevron-right-solid 1.png" alt="" />
                </button>
              </div>
              <div className="mySwiperActivityImg pt-8 carousel-inner">
                <div className="carousel-item active" data-bs-interval="100000">
                  <div className="row">
                    <div className="col-md-8 mt-14">
                      <img src="./images/index/activityImg.png" alt="" />
                    </div>
                    <div className="activityContent col-md-4 mt-14">
                      <p className="fs-4">AMATEUR｜一曲入魂音樂嘉年華</p>
                      <div className="mt-10 mb-8">
                        <button className="btn-xs btn-blue text-white">
                          售票中
                        </button>
                        <span className="ms-3 text-blue">
                          2022-12-10 23:59 截止
                        </span>
                      </div>
                      <p className="ctivityText">
                        AMATEUR 一曲入魂音樂嘉年華,邀請1~7屆入圍音樂創作者、
                        樂團一同演出。台灣獨立樂團樂迷每年絕對要參加的一大盛事，
                        起步較早的野台開唱走入歷史後，AMATEUR繼續在獨立樂團界吸收養分，
                        現已成為跨足主流及地下的國際級音樂節，今年鐵鳥票開賣15秒之內全部完售，
                        有興趣的朋友可以關注售票的動態。
                      </p>
                      <NavLink to="/contest" className="btn btn-xl btn-gradation-pill mt-10">
                        查看活動
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="carousel-item" data-bs-interval="100000">
                  <div className="row">
                    <div className="activityImg col-md-8 mt-10">
                      <img src="./images/index/activityImg.png" alt="" />
                    </div>
                    <div className="activityContent col-md-4 mt-10">
                      <p className="fs-4">一曲入魂音樂嘉年華</p>
                      <div className="mt-10 mb-8">
                        <button className="btn-xs btn-blue text-white">
                          售票中
                        </button>
                        <span className="ms-3 text-blue">
                          2022-12-10 23:59 截止
                        </span>
                      </div>
                      <p className="ctivityText">
                        AMATEUR 一曲入魂音樂嘉年華,邀請1~7屆入圍音樂創作者、
                        樂團一同演出。台灣獨立樂團樂迷每年絕對要參加的一大盛事，
                        起步較早的野台開唱走入歷史後，AMATEUR繼續在獨立樂團界吸收養分，
                        現已成為跨足主流及地下的國際級音樂節，今年鐵鳥票開賣15秒之內全部完售，
                        有興趣的朋友可以關注售票的動態。
                      </p>
                      <NavLink to="" className="btn btn-xl btn-gradation-pill mt-10">
                        查看活動
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- 抒情 --> */}
          <section
            className=" container pt-20 carousel slide px-0"
            id="carouselMusic1"
            data-bs-ride="carousel"
          >
            <div className="d-flex justify-content-between">
              <div>
                <h2 className="fs-1">抒情</h2>
              </div>
              <div className="controlIcon">
                <button
                  className="control-prev btn btn-outline-secondary"
                  type="button"
                  data-bs-target="#carouselMusic1"
                  data-bs-slide="prev"
                >
                  <img src="./images/icon/chevron-left-solid 1.png" alt="" />
                </button>
                <button
                  className="control-next btn btn-outline-secondary"
                  type="button"
                  data-bs-target="#carouselMusic1"
                  data-bs-slide="next"
                >
                  <img src="./images/icon/chevron-right-solid 1.png" alt="" />
                </button>
              </div>
            </div>
            <div className="carousel-inner pt-14">
              <div className="carousel-item active ps-2" data-bs-interval="100000">
                {/* <div className=""> */}
                <div className="row">
                  {this.state.songList1.map((item, idx) => (
                    <div className="col-md-2 col-6 mt-10" onClick={this.clickMusic} data-num={item.MusicID}>
                      <div className="imgContainer hvr-bob">
                        <div className="imgDiv " data-num={item.MusicID}>
                          <img
                            src={item.MusicImage}
                            alt=""
                            className="object-cover"
                            data-num={item.MusicID}
                          />
                        </div>
                        <div className="imgPalyIconLg">
                          <button type="button" class="btn">
                            <img
                              src="./images/icon/play_circle_outline_white_48dp.svg"
                              alt="play"
                              style={{ minWidth: '96px' }}
                              data-num={item.MusicID}
                            />
                          </button>
                        </div>
                        <NavLink
                          to={`/channel/${item.UserID}`}
                          className="text-white"
                        >
                          <p className="text-truncate pt-8" data-num={item.MusicID}>{item.MusicName}</p>
                          <p className="text-truncate" data-num={item.MusicID}>{item.Singer}</p>
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="carousel-item ps-2" data-bs-interval="100000">
                <div className="row">
                  {this.state.songList1_6.map((item, idx) => (
                    <div className="col-md-2 col-6 mt-10" onClick={this.clickMusic} data-num={item.MusicID} >
                      <div className="imgContainer hvr-bob">
                        <div className="imgDiv" data-num={item.MusicID} >
                          <img
                            src={item.MusicImage}
                            alt=""
                            className="object-cover"
                            data-num={item.MusicID}
                          />
                        </div>
                        <div className="imgPalyIconLg">
                          <button type="button" class="btn">
                            <img
                              src="./images/icon/play_circle_outline_white_48dp.svg"
                              alt="play"
                              style={{ minWidth: '96px' }}
                              data-num={item.MusicID}

                            />
                          </button>
                        </div>
                        <NavLink
                          to={`/channel/${item.UserID}`}
                          className="text-white"
                        >
                          <p className="text-truncate pt-8">{item.MusicName}</p>
                          <p className="text-truncate">{item.Singer}</p>
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Funk --> */}
          <section
            className=" container pt-20 carousel slide px-0"
            id="carouselMusic2"
            data-bs-ride="carousel"
          >
            <div className="d-flex justify-content-between">
              <div>
                <h2 className="fs-1">Funk</h2>
              </div>
              <div className="controlIcon">
                <button
                  className="control-prev btn btn-outline-secondary"
                  type="button"
                  data-bs-target="#carouselMusic2"
                  data-bs-slide="prev"
                >
                  <img src="./images/icon/chevron-left-solid 1.png" alt="" />
                </button>
                <button
                  className="control-next btn btn-outline-secondary"
                  type="button"
                  data-bs-target="#carouselMusic2"
                  data-bs-slide="next"
                >
                  <img src="./images/icon/chevron-right-solid 1.png" alt="" />
                </button>
              </div>
            </div>
            <div className="carousel-inner pt-14">
              <div className="carousel-item active ps-2" data-bs-interval="100000">
                <div className="row">
                  {this.state.songList2.map((item, idx) => (
                    <div className="col-md-2 col-6 mt-10" onClick={this.clickMusic} data-num={item.MusicID}>
                      <div className="imgContainer hvr-bob">
                        <div className="imgDiv" data-num={item.MusicID}>
                          <img
                            src={item.MusicImage}
                            alt=""
                            className="object-cover"
                            data-num={item.MusicID}
                          />
                        </div>
                        <div className="imgPalyIconLg">
                          <button type="button" class="btn">
                            <img
                              src="./images/icon/play_circle_outline_white_48dp.svg"
                              alt="play"
                              style={{ minWidth: '96px' }}
                              data-num={item.MusicID}

                            />
                          </button>
                        </div>
                        <NavLink
                          to={`/channel/${item.UserID}`}
                          className="text-white"
                        >
                          <p className="text-truncate pt-8">{item.MusicName}</p>
                          <p className="text-truncate">{item.Singer}</p>
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="carousel-item ps-2" data-bs-interval="100000">
                <div className="row">
                  {this.state.songList2_6.map((item, idx) => (
                    <div className="col-md-2 col-6 mt-10" onClick={this.clickMusic} data-num={item.MusicID}>
                      <div className="imgContainer hvr-bob">
                        <div className="imgDiv" data-num={item.MusicID}>
                          <img
                            src={item.MusicImage}
                            alt=""
                            className="object-cover"
                            data-num={item.MusicID}
                          />
                        </div>
                        <div className="imgPalyIconLg">
                          <button type="button" class="btn">
                            <img
                              src="./images/icon/play_circle_outline_white_48dp.svg"
                              alt="play"
                              style={{ minWidth: '96px' }}
                              data-num={item.MusicID}

                            />
                          </button>
                        </div>
                        <NavLink
                          to={`/channel/${item.UserID}`}
                          className="text-white"
                        >
                          <p className="text-truncate pt-8">{item.MusicName}</p>
                          <p className="text-truncate">{item.Singer}</p>
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* <!-- 搖滾經典-- > */}
          <section
            className=" container pt-20 carousel slide px-0"
            id="carouselMusic3"
            data-bs-ride="carousel"
          >
            <div className="d-flex justify-content-between">
              <div>
                <h2 className="fs-1">搖滾經典</h2>
              </div>
              <div className="controlIcon">
                <button
                  className="control-prev btn btn-outline-secondary"
                  type="button"
                  data-bs-target="#carouselMusic3"
                  data-bs-slide="prev"
                >
                  <img src="./images/icon/chevron-left-solid 1.png" alt="" />
                </button>
                <button
                  className="control-next btn btn-outline-secondary"
                  type="button"
                  data-bs-target="#carouselMusic3"
                  data-bs-slide="next"
                >
                  <img src="./images/icon/chevron-right-solid 1.png" alt="" />
                </button>
              </div>
            </div>
            <div className="carousel-inner pt-14">
              <div className="carousel-item active ps-2" data-bs-interval="100000">
                <div className="row">
                  {this.state.songList3.map((item, idx) => (
                    <div className="col-md-2 col-6 mt-10" onClick={this.clickMusic} data-num={item.MusicID}>
                      <div className="imgContainer hvr-bob">
                        <div className="imgDiv" data-num={item.MusicID}>
                          <img
                            src={item.MusicImage}
                            alt=""
                            className="object-cover"
                            data-num={item.MusicID}
                          />
                        </div>
                        <div className="imgPalyIconLg">
                          <button type="button" class="btn">
                            <img
                              src="./images/icon/play_circle_outline_white_48dp.svg"
                              alt="play"
                              style={{ minWidth: '96px' }}
                              data-num={item.MusicID}

                            />
                          </button>
                        </div>
                        <NavLink
                          to={`/channel/${item.UserID}`}
                          className="text-white"
                        >
                          <p className="text-truncate pt-8">{item.MusicName}</p>
                          <p className="text-truncate">{item.Singer}</p>
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="carousel-item ps-2" data-bs-interval="100000">
                <div className="row">
                  {this.state.songList3_6.map((item, idx) => (
                    <div className="col-md-2 col-6 mt-10" onClick={this.clickMusic} data-num={item.MusicID}>
                      <div className="imgContainer hvr-bob">
                        <div className="imgDiv" data-num={item.MusicID}>
                          <img
                            src={item.MusicImage}
                            alt=""
                            className="object-cover"
                            data-num={item.MusicID}
                          />
                        </div>
                        <div className="imgPalyIconLg">
                          <button type="button" class="btn">
                            <img
                              src="./images/icon/play_circle_outline_white_48dp.svg"
                              alt="play"
                              style={{ minWidth: '96px' }}
                              data-num={item.MusicID}

                            />
                          </button>
                        </div>
                        <NavLink
                          to={`/channel/${item.UserID}`}
                          className="text-white"
                        >
                          <p className="text-truncate pt-8">{item.MusicName}</p>
                          <p className="text-truncate">{item.Singer}</p>
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* < !--R&B一-- > */}
          <section
            className=" container pt-20 carousel slide px-0"
            id="carouselMusic4"
            data-bs-ride="carousel"
          >
            <div className="d-flex justify-content-between">
              <div>
                <h2 className="fs-1">R&B</h2>
              </div>
              <div className="controlIcon">
                <button
                  className="control-prev btn btn-outline-secondary"
                  type="button"
                  data-bs-target="#carouselMusic4"
                  data-bs-slide="prev"
                >
                  <img src="./images/icon/chevron-left-solid 1.png" alt="" />
                </button>
                <button
                  className="control-next btn btn-outline-secondary"
                  type="button"
                  data-bs-target="#carouselMusic4"
                  data-bs-slide="next"
                >
                  <img src="./images/icon/chevron-right-solid 1.png" alt="" />
                </button>
              </div>
            </div>
            <div className="carousel-inner pt-14">
              <div className="carousel-item active ps-2" data-bs-interval="100000">
                <div className="row">
                  {this.state.songList4.map((item, idx) => (
                    <div className="col-md-2 col-6 mt-10" onClick={this.clickMusic} data-num={item.MusicID}>
                      <div className="imgContainer hvr-bob">
                        <div className="imgDiv" data-num={item.MusicID}>
                          <img
                            src={item.MusicImage}
                            alt=""
                            className="object-cover"
                            data-num={item.MusicID}
                          />
                        </div>
                        <div className="imgPalyIconLg">
                          <button type="button" class="btn">
                            <img
                              src="./images/icon/play_circle_outline_white_48dp.svg"
                              alt="play"
                              style={{ minWidth: '96px' }}
                              data-num={item.MusicID}

                            />
                          </button>
                        </div>
                        <NavLink
                          to={`/channel/${item.UserID}`}
                          className="text-white"
                        >
                          <p className="text-truncate pt-8">{item.MusicName}</p>
                          <p className="text-truncate">{item.Singer}</p>
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="carousel-item ps-2" data-bs-interval="100000">
                <div className="row">
                  {this.state.songList4_6.map((item, idx) => (
                    <div className="col-md-2 col-6 mt-10" onClick={this.clickMusic} data-num={item.MusicID}>
                      <div className="imgContainer hvr-bob">
                        <div className="imgDiv" data-num={item.MusicID}>
                          <img
                            src={item.MusicImage}
                            alt=""
                            className="object-cover"
                            data-num={item.MusicID}
                          />
                        </div>
                        <div className="imgPalyIconLg">
                          <button type="button" class="btn">
                            <img
                              src="./images/icon/play_circle_outline_white_48dp.svg"
                              alt="play"
                              style={{ minWidth: '96px' }}
                              data-num={item.MusicID}

                            />
                          </button>
                        </div>
                        <NavLink
                          to={`/channel/${item.UserID}`}
                          className="text-white"
                        >
                          <p className="text-truncate pt-8">{item.MusicName}</p>
                          <p className="text-truncate">{item.Singer}</p>
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* < !--重金屬 --> */}
          <section
            className=" container pt-20 carousel slide px-0"
            id="carouselMusic5"
            data-bs-ride="carousel"
          >
            <div className="d-flex justify-content-between">
              <div>
                <h2 className="fs-1">重金屬</h2>
              </div>
              <div className="controlIcon">
                <button
                  className="control-prev btn btn-outline-secondary"
                  type="button"
                  data-bs-target="#carouselMusic5"
                  data-bs-slide="prev"
                >
                  <img src="./images/icon/chevron-left-solid 1.png" alt="" />
                </button>
                <button
                  className="control-next btn btn-outline-secondary"
                  type="button"
                  data-bs-target="#carouselMusic5"
                  data-bs-slide="next"
                >
                  <img src="./images/icon/chevron-right-solid 1.png" alt="" />
                </button>
              </div>
            </div>
            <div className="carousel-inner pt-14">
              <div className="carousel-item active ps-2" data-bs-interval="100000">
                <div className="row">
                  {this.state.songList5.map((item, idx) => (
                    <div className="col-md-2 col-6 mt-10" onClick={this.clickMusic} data-num={item.MusicID}>
                      <div className="imgContainer hvr-bob">
                        <div className="imgDiv" data-num={item.MusicID}>
                          <img
                            src={item.MusicImage}
                            alt=""
                            className="object-cover"
                            data-num={item.MusicID}
                          />
                        </div>
                        <div className="imgPalyIconLg">
                          <button type="button" class="btn">
                            <img
                              src="./images/icon/play_circle_outline_white_48dp.svg"
                              alt="play"
                              style={{ minWidth: '96px' }}
                              data-num={item.MusicID}

                            />
                          </button>
                        </div>
                        <NavLink
                          to={`/channel/${item.UserID}`}
                          className="text-white"
                        >
                          <p className="text-truncate pt-8">{item.MusicName}</p>
                          <p className="text-truncate">{item.Singer}</p>
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="carousel-item ps-2" data-bs-interval="100000">
                <div className="row">
                  {this.state.songList5_6.map((item, idx) => (
                    <div className="col-md-2 col-6 mt-10" onClick={this.clickMusic} data-num={item.MusicID}>
                      <div className="imgContainer hvr-bob">
                        <div className="imgDiv" data-num={item.MusicID}>
                          <img
                            src={item.MusicImage}
                            alt=""
                            className="object-cover"
                            data-num={item.MusicID}
                          />
                        </div>
                        <div className="imgPalyIconLg">
                          <button type="button" class="btn">
                            <img
                              src="./images/icon/play_circle_outline_white_48dp.svg"
                              alt="play"
                              style={{ minWidth: '96px' }}
                              data-num={item.MusicID}

                            />
                          </button>
                        </div>
                        <NavLink
                          to={`/channel/${item.UserID}`}
                          className="text-white"
                        >
                          <p className="pt-8">{item.MusicName}</p>
                          <p>{item.Singer}</p>
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* <!--部落格 --> */}
          <section
            className="container carousel slide"
            id="carouselBlog"
            data-bs-ride="carousel"
            style={{ paddingTop: "108px", paddingBottom: "160px" }}
          >
            <h2 className="fs-1">部落格</h2>
            <div className="carousel-inner pt-14">
              <div className="carousel-item active row  mx-0" data-bs-interval="100000">
                <div className="row">
                  {this.state.blogList.map((item, idx) => (
                    <div className="col-md-3 col-12 mt-10 ">
                      <NavLink to={`/channelBlog/${item.ChannelID}/blog/${item.BlogID}`} class="linkHover">
                        <div class="indexBlog">
                          <img
                            src={item.BlogImage}
                            alt=""
                            className="object-cover indexBlogImg"
                          />
                        </div>
                        <h4 className="fs-4 my-3 text-decoration-underline text-truncate">
                          {item.BlogTitle}
                        </h4>

                        <p className="text pt-0" style={{ maxWidth: "306px" }}>
                          {item.BlogText}
                        </p>
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </main>
        <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content modal-bg bg-dark">

              <div class="modal-body text-center">
                {this.state.MusicListText}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">確定</button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel4" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content modal-bg bg-dark">
              <div class="modal-body text-center">
                {this.state.deleteMusicListText}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </>

    );
  }
  componentDidMount = async () => {
    let result = await Axios.get(`http://localhost:9000/${(document.cookie == "") ? "Limitmusic" : `likeTop10/${document.cookie}`}`);
    this.setState({ hotSong: result.data });
    let result2 = await Axios.get("http://localhost:9000/search/抒情/1");
    this.setState({ songList1: result2.data });
    let result2_6 = await Axios.get("http://localhost:9000/search/抒情/6");
    this.setState({ songList1_6: result2_6.data });
    let result3 = await Axios.get("http://localhost:9000/search/Funk/1");
    this.setState({ songList2: result3.data });
    let result3_6 = await Axios.get("http://localhost:9000/search/Funk/6");
    this.setState({ songList2_6: result3_6.data });
    let result4 = await Axios.get("http://localhost:9000/search/搖滾/1");
    this.setState({ songList3: result4.data });
    let result4_6 = await Axios.get("http://localhost:9000/search/搖滾/6");
    this.setState({ songList3_6: result4_6.data });
    let result5 = await Axios.get("http://localhost:9000/search/R&B/1");
    this.setState({ songList4: result5.data });
    let result5_6 = await Axios.get("http://localhost:9000/search/R&B/6");
    this.setState({ songList4_6: result5_6.data });
    let result6 = await Axios.get("http://localhost:9000/search/金屬/1");
    this.setState({ songList5: result6.data });
    let result6_6 = await Axios.get("http://localhost:9000/search/金屬/6");
    this.setState({ songList5_6: result6_6.data });
    let result7 = await Axios.get(`http://localhost:9000/blogIndex`);
    this.setState({ blogList: result7.data });
    let MusicData = await Axios.get("http://localhost:9000/music");
    this.setState({ musicData: MusicData.data });

    if (localStorage.getItem('MusicIndex') == null) {
      localStorage.setItem('MusicIndex', 0)
    }
  };
  changeHeart = async (MusicID) => {
    let temp = document.querySelectorAll('.heartDiv');
    let icon = document.querySelectorAll('.heartIcon');
    let newState = { ...this.state };

    // console.log(MusicID);
    for (var i = 0; i < temp.length; i++) {
      if (parseInt(temp[i].attributes.idx.value) === MusicID) {
        if (this.state.hotSong[i].CheckLike === 1) {
          // console.log("1");
          newState.defaultLike[0] = this.state.hotSong[i];
          newState.defaultLike[0].CheckLike = 0;
          newState.defaultLike[0].LikeNum -= 1;
          this.setState({ newState });
          console.log(this.state.defaultLike[0].LikeNum);
          // console.log(this.state.defaultLike[0])
          let resultlike = await Axios.put(`http://localhost:9000/checkLikeAdd`, this.state.defaultLike);
          let likeNum = await Axios.put(`http://localhost:9000/likeNumAdd`, this.state.defaultLike);

        } else {
          // console.log("2")
          newState.defaultLike[0] = this.state.hotSong[i];
          newState.defaultLike[0].CheckLike = 1;
          newState.defaultLike[0].LikeNum += 1;
          this.setState({ newState });
          console.log(this.state.defaultLike[0].LikeNum)
          let resultlike = await Axios.put(`http://localhost:9000/checkLikeAdd`, this.state.defaultLike);
          let likeNum = await Axios.put(`http://localhost:9000/likeNumAdd`, this.state.defaultLike);
        }
      }
      // console.log(this.state.checkLikeList[i].CheckLike)

    }
  }
}

export default Index;
