import React, { Component } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";


class Music extends Component {
  state = {
    channelHotSong: [{}],
    defaultLike: [{}],
    albumList: [{}],
    albumItem: [{}],
    albumNum: [{}],
    musicData: [{}],
    MusicListID: [
      {
        UserID: 1, 
        MusicID: 1
      }
    ],
    MusicIndex: 0,
    MusicListText: '新增成功',
    deleteMusicListText: "刪除成功",
  };

  clickMusic = (e) => {

    if (e.target.getAttribute('class') == 'addMusic') {
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
  componentDidUpdate(prevProps, prevState) {
    if (localStorage.getItem('MusicIndex') !== this.state.MusicIndex) {
      this.setState({ MusicIndex: localStorage.getItem('MusicIndex') })
      console.log('index local 正確的' + this.state.MusicIndex);
    }
    if (localStorage.getItem('MusicIndex') == null) {
      localStorage.setItem('MusicIndex', 0)
    }
  }
  render() {
    return (
      <>
        <div className="tab-content" id="pills-content">
          <div className="tab-pane fade show active" id="music-tab">
            {/* <!-- 熱門播放區 --> */}
            <div className="hotSong">
              <h3 className="py-12">熱門播放曲目</h3>
              {this.state.channelHotSong.map((item, idx) => (
                <div className="channel_songList row pt-5 px-4">
                  <div className="col-md-2 col-4 imgContainer heartDiv" idx={item.MusicID}>
                    <div className="musicDiv" data-num={item.MusicID}>
                      <img src={item.MusicImage} alt="" className="imgContent musicImg" data-num={item.MusicID} />
                    </div>
                    <div className="imgPalyIconChannel" data-num={item.MusicID}>
                      <button type="button" className="btn" data-num={item.MusicID} onClick={this.clickMusic}>
                        <img
                          src="/images/icon/play_circle_outline_white_48dp.svg"
                          alt="play"
                          data-num={item.MusicID}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 m-auto col-6">
                    <NavLink
                      className="fs-5"
                      to={`/channel/${item.UserID}`}
                    >
                      {item.MusicName}
                    </NavLink>
                  </div>
                  <div className="col-md-2 m-auto  d-none d-md-block">
                    <NavLink
                      className="fs-5 "
                      to={`/channel/${item.UserID}`}
                    >
                      {item.Singer}
                    </NavLink>
                  </div>
                  <div className="col-md-3 m-auto d-none d-md-block">
                    <NavLink
                      className="fs-5"
                      to={`/channel/${item.UserID}`}
                    >
                      {item.Album}
                    </NavLink>
                  </div>
                  <div className="col-md-1 m-auto d-none d-md-block">
                    <span className="fs-5 time">{item.MusicTime}</span>
                  </div>
                  <div className="col-md-1 m-auto col-1">
                    <button onClick={this.ClickAddMusic} data-num={item.MusicID} type="button" className="btn hvr-bounce-in" data-bs-toggle="modal" data-bs-target="#exampleModal12">
                      <img data-num={item.MusicID} src="/images/icon/plus-solid 1.png" alt="like" />
                    </button>
                  </div>
                  <div className="col-md-1 m-auto col-2">
                    <button type="button" className="btn hvr-bounce-in" onClick={() => { this.changeHeart(item.MusicID) }}>
                      <img src={`/images/icon/${(item.CheckLike === 1) ? "heart2.png" : "heart.png"}`} alt="" className="heartIcon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <br />
            <hr />
            {/* <!-- 音樂專輯 --> */}
            <div className="row">
              <h3 className="py-12" onClick={this.test}>音樂專輯</h3>
              {this.state.albumList.map((item, idx) => (
                <div className="col-md-2 col-12">
                  <NavLink
                    to={`/channelMusic/${item.AlbumID}/AlbumMusic/${this.props.match.params.id}`}
                    className="text-white"
                    onClick={this.changePage}
                  >
                    <div class="musicBlog">
                      <img
                        src={item.AlbumImage}
                        className="musicBlogImg w-100 h-100"
                        alt=""
                      />
                    </div>
                    <div className="albumContent hover-primary pt-5">
                      <h5 className="albumTitle text-truncate">
                        {item.AlbumName}
                      </h5>
                      <p className="albumText mt-2 mb-4">{item.AlbumTime}</p>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div class="modal fade" id="exampleModal12" tabindex="-1" aria-labelledby="exampleModalLabel12" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content modal-bg bg-dark">
              <div class="modal-body text-center">
                {this.state.MusicListText}
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
    let result = await Axios.get(
      `http://localhost:9000/channelMusic/${(document.cookie == "") ? `${this.props.match.params.id}` : `${this.props.match.params.id}/CheckLike/${document.cookie}`}`
    );
    this.setState({ channelHotSong: result.data });

    //專輯列表
    let result2 = await Axios.get(`http://localhost:9000/channel/Album/${this.props.match.params.id}`);
    this.setState({ albumList: result2.data });

    //專輯歌曲
    var result3 = await Axios.get(
      `http://localhost:9000/channelMusic/${this.state.albumList[0].AlbumID}/AlbumMusic/${this.props.match.params.id}`
    );
    this.setState({ albumItem: result3.data });

    // 誰的user的所有歌單音樂
    let allMusicList = await Axios.get(`http://localhost:9000/MusicList/${document.cookie == "" ? "" : document.cookie}`)
    this.setState({ allMusicList: allMusicList.data })

    let MusicData = await Axios.get("http://localhost:9000/music");
    this.setState({ musicData: MusicData.data });

    if (localStorage.getItem('MusicIndex') == null) {
      localStorage.setItem('MusicIndex', 0)
    }
  }
  test = () => {
    console.log(this.state.albumList[0].AlbumID)
  }
  changeHeart = async (MusicID) => {
    let temp = document.querySelectorAll('.heartDiv');
    let icon = document.querySelectorAll('.heartIcon');
    let newState = { ...this.state };

    // console.log(MusicID);
    for (var i = 0; i < temp.length; i++) {
      if (parseInt(temp[i].attributes.idx.value) === MusicID) {
        if (this.state.channelHotSong[i].CheckLike === 1) {
          // console.log("1");
          newState.defaultLike[0] = this.state.channelHotSong[i];
          newState.defaultLike[0].CheckLike = 0;
          newState.defaultLike[0].LikeNum -= 1;
          this.setState({ newState });
          console.log(this.state.defaultLike[0].LikeNum);
          // console.log(this.state.defaultLike[0])
          let resultlike = await Axios.put(`http://localhost:9000/checkLikeAdd`, this.state.defaultLike);
          let likeNum = await Axios.put(`http://localhost:9000/likeNumAdd`, this.state.defaultLike);

        } else {
          // console.log("2")
          newState.defaultLike[0] = this.state.channelHotSong[i];
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
  // componentDidUpdate = async () => {
  //   window.scroll(0, 0);
  // }
  changePage = async () => {
    setTimeout(() => {
      document.location.reload();
    }, 0)
  }

}

export default Music;
