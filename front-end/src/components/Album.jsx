import Axios from "axios";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Album extends Component {
  state = {
    albumList: [{}],
    defaultLike: [{}],
    defaultAlbum: [{ num: "" }],
    albumItem: [{}]
  }
  render() {
    return (
      <main className="container py-md-40">
        <section className="row bg-white-opacity-10 p-15">
          <div className="col-md-5 AlbumDiv">
            <img
              src={this.state.albumItem[0].AlbumImage}
              alt=""
              className="channel_userImg w-100 h-100 object-cover"
            />
          </div>
          <div className="m-auto col-md-7 pt-10">
            <h2>{this.state.albumItem[0].Album}</h2>
            <p className="mt-3">專輯‧{this.state.albumItem[0].Singer}‧{this.state.albumItem[0].AlbumTime}</p>
            <p>{this.state.albumItem.length}首歌</p>
            <p className=" mt-5 ">
              {" "}
              {this.state.albumItem[0].AlbumIntro}
            </p>
          </div>
        </section>
        <section className="mt-12">
          {this.state.albumItem.map((item, idx) => (
            <div className="row hoverDiv border-bottom-secondery pb-5 heartDiv" idx={item.MusicID}>
              <div className="col-md-1 col-2 playIcon m-auto">
                <button type="button" className="btn " onClick={this.test}>
                  <img src="/images/icon/Vector.png" alt="play" />
                </button>
              </div>
              <div className="hoverContent col-md-10 col-8 row">
                <div className="col-md-1 col-2 m-auto">
                  <span className="m-auto fs-5">{idx + 1}</span>
                </div>
                <div className="col-md-10 col-8 m-auto">
                  <NavLink className="text-white fs-5" to={`/channel/${item.UserID}`}>
                    {item.MusicName}
                  </NavLink>
                </div>
                <div className="col-md-1 col-2 m-auto p-1">
                  <span className="fs-5">{item.MusicTime}</span>
                </div>
              </div>
              <div className="drop col-md-1 col-2">
                <div className="moreIcon">
                  <button type="button" className="btn dropbt">
                    <img
                      src="/images/icon/ellipsis-vertical-solid 1.png"
                      alt="more"
                    // className="iconSize m-1"
                    />
                  </button>
                  <div className="dropbox">
                    <button type="button" className="btn hvr-bounce-in" onClick={() => { this.changeHeart(item.MusicID) }}>
                      <img src={`/images/icon/${(item.CheckLike === 1) ? "heart2.png" : "heart.png"}`} alt="" className="heartIcon" />
                      喜歡
                    </button>
                    <button type="button" className="btn">
                      {" "}
                      <img src="/images/icon/plus-solid 1.png" alt="add" className="iconSize m-1" />
                      儲存
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <div className="mt-20 text-center">
          <NavLink to={`/channel/${this.props.match.params.id}`} className="btn btn-xl btn-gradation-pill"><span>返回</span></NavLink>
        </div>
      </main>
    );
  }
  componentDidMount = async () => {
    // let result2 = await Axios.get(`http://localhost:9000/channel/Album/${this.props.match.params.id}`);
    // this.setState({ albumList: result2.data });

    let urlNum = `${(this.props.match.url.slice(15, 15)== "") ? this.props.match.url.slice(14, 16):this.props.match.url.slice(14, 15)}`;
    var result = await Axios.get(
      `http://localhost:9000/channelMusic/${urlNum}/AlbumMusic/${(document.cookie == "") ? `${this.props.match.params.id}` : `${this.props.match.params.id}/user/${document.cookie} `}`
    );
    this.setState({ albumItem: result.data });
  }
  test = () => {
    console.log(this.props.match.url.slice(14, 15))
  }
  changeHeart = async (MusicID) => {
    let temp = document.querySelectorAll('.heartDiv');
    let icon = document.querySelectorAll('.heartIcon');
    let newState = { ...this.state };

    // console.log(MusicID);
    for (var i = 0; i < temp.length; i++) {
      if (parseInt(temp[i].attributes.idx.value) === MusicID) {
        if (this.state.albumItem[i].CheckLike === 1) {
          // console.log("1");
          newState.defaultLike[0] = this.state.albumItem[i];
          newState.defaultLike[0].CheckLike = 0;
          newState.defaultLike[0].LikeNum -= 1;
          this.setState({ newState });
          console.log(this.state.defaultLike[0].LikeNum);
          // console.log(this.state.defaultLike[0])
          let resultlike = await Axios.put(`http://localhost:9000/checkLikeAdd`, this.state.defaultLike);
          let likeNum = await Axios.put(`http://localhost:9000/likeNumAdd`, this.state.defaultLike);

        } else {
          // console.log("2")
          newState.defaultLike[0] = this.state.albumItem[i];
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
export default Album;