import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';

class MemberChannel extends Component {
  state = {
    channelDefaultList: [
      {
        channelImg: '/images/channelCoverDefaultImg.svg',
      }
    ],
    channelSelectedList: [{ selectedFile: null }],
    MusicDefaultList: [
      {
        Singer: '',
        MusicName: '',
        Album: '',
        MusicType: '',
        MusicTime: '',
        MusicImage: '/images/albumDefaultImg.svg'
      }
    ],
    channelInfo: [{}],
    songList: [{}],
    songImgSelectedList: [{ selectedFile: null }],
    songSelectedList: [{ selectedFile: null }],
    articleList: [{}],
    messageList: [{}]
  }
  render() {
    return (
      <div>
        <h2 className="fs-2 fw-bold mb-md-10">創作者專區</h2>
        <section className="mb-md-12">
          <h3 className="d-inline-block fs-5 fw-bold bg-blue rounded-pill mb-md-8 px-6 py-3">頻道資料</h3>
          <div className="position-relative h-300px rounded-16 overflow-hidden mb-md-6">
            {/* <div className="coverFileImg"></div> */}
            <img className="coverFileImg" src={(this.state.channelInfo[0].ChannelImage === '') ? this.state.channelDefaultList[0].channelImg : this.state.channelInfo[0].ChannelImage} alt="封面照片" />
            <div className="position-absolute bottom-0 end-0 pb-4 pe-4">
              <form>
                <label>
                  <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary w-36px cursor-pointer hover-opacity-50 upload p-2">
                    <span className="material-icons">file_upload</span>
                  </div>
                  <input className="d-none" type="file" accept="image/*" name="channelImg"
                    onClick={
                      () => {
                        document.querySelector('.upload').classList.add('d-none');
                        document.querySelector('.done').classList.remove('d-none');
                      }
                    }
                    onChange={
                      (e) => {
                        // let fileImg = document.querySelector('.coverFileImg');
                        // fileImg.innerHTML = '';
                        // let img = document.createElement('img');
                        // console.log(URL.createObjectURL(e.target.files[0]));
                        // console.log(e.target.files[0]);
                        let img = document.querySelector('.coverFileImg');
                        img.src = URL.createObjectURL(e.target.files[0]);
                        img.onload = () => {
                          URL.revokeObjectURL(img.src);
                        }
                        // fileImg.appendChild(img);
                        let newState = { ...this.state };
                        newState.channelSelectedList[0].selectedFile = e.target.files[0];
                        this.setState({ newState });
                      }
                    } />
                </label>
                <label>
                  <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary w-36px cursor-pointer hover-opacity-50 done d-none p-2">
                    <span className="material-icons">done</span>
                  </div>
                  <input className="d-none" type="button" onClick={this.uploadChannelImg} />
                </label>
              </form>
            </div>
          </div>
          <form className="row align-items-stretch">
            <div className="col-5">
              <div className="bg-dark-gray rounded-16 p-6">
                <label className="fs-5 w-100 mb-4">
                  頻道名稱
                  <input className="d-inline form-control form-control-info text-gray mt-1" type="text" name="ChannelName" value={this.state.channelInfo[0].ChannelName} disabled />
                </label>
                <label className="fs-5 w-100 mb-4">
                  加入日期
                  <input className="d-inline form-control form-control-info text-gray mt-1" type="text" name="ChannelDate" value={this.state.channelInfo[0].ChannelDate} disabled />
                </label>
                <label className="fs-5 w-100">
                  社群連結
                  <input className="d-inline form-control form-control-info text-gray mt-1" type="text" name="ChannelLink" value={this.state.channelInfo[0].ChannelLink} disabled />
                </label>
              </div>
            </div>
            <div className="col-7 d-flex flex-column">
              <div className="bg-dark-gray rounded-16 mb-auto p-6">
                <label className="fs-5 w-100">
                  簡介
                  <textarea className="form-control form-control-info text-gray text-justify mt-1" name="ChannelIntro" rows="5" value={this.state.channelInfo[0].ChannelIntro} disabled />
                </label>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-gradation-square btn-m me-4 px-md-10" type="button" data-bs-toggle="modal" data-bs-target="#editCInfo"><span>編輯</span></button>
              </div>
            </div>
          </form>
          <div className="modal fade" id="editCInfo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
            <div className="modal-dialog modal-dialog-member modal-dialog-centered">
              <form className="modal-content modal-content-member p-md-10">
                <h4 className="fs-3 fw-bold text-center mb-md-10">我的頻道資料</h4>
                <div className="d-flex justify-content-between mb-md-10">
                  <div className="w-40">
                    <label className="fs-5 w-100 mb-4">
                      頻道名稱
                      <input className="d-inline form-control form-control-edit mt-1" type="text" name="ChannelName" value={this.state.channelInfo[0].ChannelName}
                        onChange={
                          (e) => {
                            let newState = { ...this.state };
                            newState.channelInfo[0].ChannelName = e.target.value;
                            this.setState({ newState });
                          }
                        } />
                    </label>
                    <label className="fs-5 w-100 mb-4">
                      加入日期
                      <input className="d-inline form-control form-control-edit mt-1" type="text" name="ChannelDate" value={this.state.channelInfo[0].ChannelDate}
                        onChange={
                          (e) => {
                            let newState = { ...this.state };
                            newState.channelInfo[0].ChannelDate = e.target.value;
                            this.setState({ newState });
                          }
                        } />
                    </label>
                    <label className="fs-5 w-100">
                      社群連結
                      <input className="d-inline form-control form-control-edit mt-1" type="text" name="ChannelLink" value={this.state.channelInfo[0].ChannelLink}
                        onChange={
                          (e) => {
                            let newState = { ...this.state };
                            newState.channelInfo[0].ChannelLink = e.target.value;
                            this.setState({ newState });
                          }
                        } />
                    </label>
                  </div>
                  <div className="w-60">
                    <label className="fs-5 w-100 ps-10">
                      簡介
                      <textarea className="form-control form-control-edit text-justify mt-1" name="ChannelIntro" rows="5" value={this.state.channelInfo[0].ChannelIntro}
                        onChange={
                          (e) => {
                            let newState = { ...this.state };
                            newState.channelInfo[0].ChannelIntro = e.target.value;
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
        <section className="mb-md-12">
          <div className="d-flex justify-content-between align-items-end mb-md-8">
            <h3 className="fs-5 fw-bold bg-blue rounded-pill px-6 py-3">我上傳的音樂作品</h3>
            <p className="fs-6 text-white pe-2">查看全部</p>
          </div>
          <ul className="row mb-2">
            <li className="col-md-6 mb-md-4">
              <div className="d-flex justify-content-center align-items-center bg-white-opacity-5 rounded-16 h-100">
                <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary cursor-pointer hover-scale-120 p-2" data-bs-toggle="modal" data-bs-target="#addNewSong">
                  <span className="material-icons">add</span>
                </div>
              </div>
              <div className="modal fade" id="addNewSong" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                <div className="modal-dialog modal-dialog-member modal-dialog-centered">
                  <form className="modal-content modal-content-member p-md-10">
                    <h4 className="fs-3 fw-bold text-center mb-md-10">我的音樂作品</h4>
                    <div className="d-flex justify-content-between align-items-center mb-md-10">
                      <div className="w-40">
                        <div className="position-relative rounded-8 overflow-hidden mb-4">
                          <img className="albumFileImg" src={this.state.MusicDefaultList[0].MusicImage} alt="封面照片" />
                          <div className="position-absolute bottom-0 end-0 pb-2 pe-2">
                            <label>
                              <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary w-36px cursor-pointer hover-opacity-50 p-2">
                                <span className="material-icons">file_upload</span>
                              </div>
                              <input className="d-none" type="file" accept="image/*" name="musicImg"
                                onChange={
                                  (e) => {
                                    let img = document.querySelector('.albumFileImg');
                                    img.src = URL.createObjectURL(e.target.files[0]);
                                    img.onload = () => {
                                      URL.revokeObjectURL(img.src);
                                    }
                                    let newState = { ...this.state };
                                    newState.songImgSelectedList[0].selectedFile = e.target.files[0];
                                    this.setState({ newState });
                                  }
                                } />
                            </label>
                          </div>
                        </div>
                        <input className="mt-1" type="file" name="musicFile"
                          onChange={
                            (e) => {
                              let newState = { ...this.state };
                              newState.songSelectedList[0].selectedFile = e.target.files[0];
                              this.setState({ newState });
                            }
                          } />
                      </div>
                      <div className="w-60">
                        <label className="fs-5 w-100 ps-10 mb-4">
                          創作者：
                          <input className=" w-100 form-control form-control-addNewSong mt-1" type="text" name="Singer" value={this.state.MusicDefaultList[0].Singer}
                            onChange={
                              (e) => {
                                let newState = { ...this.state };
                                newState.MusicDefaultList[0].Singer = e.target.value;
                                this.setState({ newState });
                              }
                            } />
                        </label>
                        <label className="fs-5 w-100 ps-10 mb-4">
                          歌曲名稱：
                          <input className=" w-100 form-control form-control-addNewSong mt-1" type="text" name="MusicName" value={this.state.MusicDefaultList[0].MusicName}
                            onChange={
                              (e) => {
                                let newState = { ...this.state };
                                newState.MusicDefaultList[0].MusicName = e.target.value;
                                this.setState({ newState });
                              }
                            } />
                        </label>
                        <label className="fs-5 w-100 ps-10 mb-4">
                          專輯名稱：
                          <input className=" w-100 form-control form-control-addNewSong mt-1" type="text" name="Album" value={this.state.MusicDefaultList[0].Album}
                            onChange={
                              (e) => {
                                let newState = { ...this.state };
                                newState.MusicDefaultList[0].Album = e.target.value;
                                this.setState({ newState });
                              }
                            } />
                        </label>
                        <div className="d-flex w-100">
                          <label className="fs-5 ps-10">
                            歌曲類型：
                            <input className=" w-100 form-control form-control-addNewSong mt-1" type="text" name="MusicType" value={this.state.MusicDefaultList[0].MusicType}
                              onChange={
                                (e) => {
                                  let newState = { ...this.state };
                                  newState.MusicDefaultList[0].MusicType = e.target.value;
                                  this.setState({ newState });
                                }
                              } />
                          </label>
                          <label className="fs-5 ps-10">
                            歌曲長度：
                            <input className=" w-100 form-control form-control-addNewSong mt-1" type="text" name="MusicTime" value={this.state.MusicDefaultList[0].MusicTime}
                              onChange={
                                (e) => {
                                  let newState = { ...this.state };
                                  newState.MusicDefaultList[0].MusicTime = e.target.value;
                                  this.setState({ newState });
                                }
                              } />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="button" className="btn btn-gradation-square btn-m me-4 px-md-8" data-bs-dismiss="modal"><span>取消</span></button>
                      <button type="button" className="btn btn-gradation-square btn-m px-md-8" onClick={this.addSongClicked}><span>上傳</span></button>
                    </div>
                  </form>
                </div>
              </div>
            </li>
            {this.state.songList.map((song, idx) =>
              <li className="col-md-6 mb-md-4">
                <div className="d-flex justify-content-between align-items-center bg-dark-gray rounded-16 p-6">
                  <img className="rounded-8 w-30" src={song.MusicImage} alt="專輯照片" />
                  <p className="fs-5 ps-md-6 pe-md-2 w-60">{song.MusicName}<br />{song.Album}</p>
                  <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary w-36px cursor-pointer hover-opacity-50 p-2">
                    <span className="material-icons" data-bs-toggle="modal" data-bs-target={`#deleteSong${song.MusicID}`}>delete</span>
                  </div>
                </div>
                <div className="modal fade" id={`deleteSong${song.MusicID}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                  <div className="modal-dialog modal-dialog-member modal-dialog-centered">
                    <div className="modal-content modal-content-member p-md-10">
                      <p className="fs-5 text-center mb-8">確定要刪除歌曲："{song.MusicName}"？</p>
                      <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-gradation-square btn-m me-4 px-md-8" data-bs-dismiss="modal"><span>取消</span></button>
                        <button type="button" className="btn btn-gradation-square btn-m px-md-8" onClick={() => { this.deleteSongClicked(song.MusicID) }}><span>確定</span></button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </section>
        <section className="mb-md-12">
          <div className="d-flex justify-content-between align-items-end mb-md-8">
            <h3 className="fs-5 fw-bold bg-blue rounded-pill px-6 py-3">我寫的部落格文章</h3>
            <p className="fs-6 text-white pe-2">查看全部</p>
          </div>
          <ul className="row">
            <li className="col-md-4">
              <div className="d-flex justify-content-center align-items-center bg-white-opacity-5 rounded-16 h-100">
                <a href={`/newarticle/${document.cookie}`}>
                  <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary cursor-pointer hover-scale-120 p-2">
                    <span className="material-icons text-white">add</span>
                  </div>
                </a>
              </div>
            </li>
            {this.state.articleList.map((article, idx) =>
              <li className="col-md-4">
                <div className="position-relative">
                  <img className="object-cover rounded-16" src={article.BlogImage} alt="文章照片" />
                  <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary w-36px cursor-pointer position-absolute bottom-0 end-0 hover-opacity-50 mb-2 me-2 p-2">
                    <a href={`/editarticle/${article.BlogID}`}><span className="material-icons text-white">edit</span></a>
                  </div>
                </div>
                <p className="fs-5 fw-bold text-truncate mt-4">{article.BlogTitle}</p>
                <div className="d-flex align-items-center">
                  <span className="material-icons fs-7 text-gray me-1">visibility</span>
                  <p className="fs-7 text-gray">{article.BlogView} 觀看次數</p>
                </div>
              </li>
            )}
          </ul>
        </section>
        <section>
          <div className="d-flex justify-content-between align-items-end mb-md-8">
            <h3 className="fs-5 fw-bold bg-blue rounded-pill px-6 py-3">頻道的留言評論</h3>
            <p className="fs-6 text-white pe-2">查看全部</p>
          </div>
          <ul className="row align-items-stretch">
            {this.state.messageList.map((message, idx) =>
              <li className="col-md-4">
                <div className="d-flex flex-column justify-content-between bg-dark-gray rounded-16 p-6 h-100">
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <img className="w-50px rounded-circle me-2" src={message.UserImage} alt="用戶大頭照" />
                      <p className="fs-5">{message.MessageName}</p>
                    </div>
                    <p className="fs-7 mb-4">{message.MessageDate}</p>
                    <p className="fs-6 text-truncate mb-1">re : {message.BlogTitle}</p>
                    <p className="fs-6 text-justify plural-text-hidden-five">{message.MessageText}</p>
                  </div>
                  <button className={`btn btn-s btn-${(message.MessageReply) ? 'secondary' : 'primary'}`} type="button" data-bs-toggle="modal" data-bs-target={`#replyMessage${message.MessageID}`}>{(message.MessageReply) ? '已回覆' : '回覆留言'}</button>
                </div>
                <div className="modal fade" id={`replyMessage${message.MessageID}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                  <div className="modal-dialog modal-dialog-member modal-dialog-centered">
                    <div className="modal-content modal-content-member p-md-10">
                      <div className="mb-4">
                        <div className="d-flex align-items-center mb-2">
                          <img className="w-50px rounded-circle me-2" src={message.UserImage} alt="用戶大頭照" />
                          <p className="fs-5">{message.MessageName}</p>
                        </div>
                        <p className="fs-7 mb-4">{message.MessageDate}</p>
                        <p className="fs-6 mb-1">re : {message.BlogTitle}</p>
                        <p className="fs-6 text-justify">{message.MessageText}</p>
                      </div>
                      <form>
                        <textarea className="form-control form-control-replyContent w-100 mb-4" name="replyContent" rows="5" value={message.MessageReply}
                          onChange={
                            (e) => {
                              let newState = { ...this.state };
                              newState.messageList[idx].MessageReply = e.target.value;
                              this.setState({ newState });
                            }
                          } />
                        <div className="d-flex justify-content-center">
                          <button type="button" className="btn btn-gradation-square btn-m me-4 px-md-8" data-bs-dismiss="modal"><span>取消</span></button>
                          <button type="button" className="btn btn-gradation-square btn-m px-md-8" onClick={() => { this.replyClicked(message.MessageID) }}><span>回覆</span></button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </section>
      </div>
    );
  }
  componentDidMount = async () => {
    let resultInfo = await Axios.get(`http://localhost:9000/channel/${this.props.match.params.id}`);
    this.setState({ channelInfo: resultInfo.data });

    let resultMusic = await Axios.get(`http://localhost:9000/channelMusic/${this.props.match.params.id}`);
    this.setState({ songList: resultMusic.data });

    let resultBlog = await Axios.get(`http://localhost:9000/blog/limit/${this.props.match.params.id}`);
    this.setState({ articleList: resultBlog.data });

    let resultMessage = await Axios.get(`http://localhost:9000/message/${this.props.match.params.id}`);
    this.setState({ messageList: resultMessage.data });
  }
  uploadChannelImg = async () => {
    const formData = new FormData();
    formData.append("channelImg", this.state.channelSelectedList[0].selectedFile, this.state.channelSelectedList[0].selectedFile.name);
    let resultCImg = await Axios.put(`http://localhost:9000/channel/image/${this.props.match.params.id}`, formData);
    console.log(resultCImg);
    document.querySelector('.done').classList.add('d-none');
    document.querySelector('.upload').classList.remove('d-none');

    swal({
      title: "更新成功",
      icon: "success",
      button: "確認"
    });
  }
  editInfoClicked = async () => {
    let result = await Axios.put('http://localhost:9000/channel/', this.state.channelInfo);
    // console.log(this.state.channelInfo);
    console.log(result);

    swal({
      title: "更新成功",
      icon: "success",
      button: "確認"
    }).then(() => {
      window.location = `/member/channel/${this.props.match.params.id}`;
    });
  }
  addSongClicked = async () => {
    const formData = new FormData();
    formData.append("musicImg", this.state.songImgSelectedList[0].selectedFile);
    let resultImg = await Axios.post(`http://localhost:9000/music/create/${this.props.match.params.id}`, formData);
    console.log(resultImg);

    let updateMP3 = async () => {
      const formData = new FormData();
      formData.append("musicFile", this.state.songSelectedList[0].selectedFile);
      let resultMP3 = await Axios.put(`http://localhost:9000/music/create/${this.props.match.params.id}`, formData);
      console.log(resultMP3);

      let updateContent = async () => {
        let resultContent = await Axios.put(`http://localhost:9000/music/update/${this.props.match.params.id}`, this.state.MusicDefaultList);
        console.log(resultContent);
      }
      updateContent();
    }
    updateMP3();

    swal({
      title: "新增成功",
      icon: "success",
      button: "確認"
    }).then(() => {
      window.location = `/member/channel/${this.props.match.params.id}`;
    });
  }
  deleteSongClicked = async (musicID) => {
    let obj = {};
    let arr = this.state.songList;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].MusicID === musicID) {
        obj = arr[i];
      }
    }
    let resultDelete = await Axios.delete(`http://localhost:9000/music/delete/${obj.MusicID}`, obj);
    console.log(resultDelete);

    swal({
      title: "刪除成功",
      icon: "success",
      button: "確認"
    }).then(() => {
      window.location = `/member/channel/${this.props.match.params.id}`;
    });
  }
  replyClicked = async (msgID) => {
    let obj = {};
    let arr = this.state.messageList;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].MessageID === msgID) {
        obj = arr[i];
      }
    }
    let resultReply = await Axios.put(`http://localhost:9000/message/items/`, obj);
    console.log(resultReply);

    swal({
      title: "留言已回覆",
      icon: "success",
      button: "確認"
    }).then(() => {
      window.location = `/member/channel/${this.props.match.params.id}`;
    });
  }
}

export default MemberChannel;