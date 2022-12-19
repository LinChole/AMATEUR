import React, { Component } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";

class Blog extends Component {
  state = {
    userInfo: [{}],
    blogPage: [{}],
    channelOther: [{}],
    otherPage: [{}],
    messenger: [{}],
    defaultMessenger: [{ BlogID: this.props.match.params.id, UserID: "", MessageText: "", MessageName: "" }]
  };
  render() {
    return (
      <main className="container py-md-40">
        {/* <!-- 分兩區塊 --> */}
        <div className="row">
          {/* <!-- left --> */}
          <article className="col-12 col-md-8">
            {this.state.blogPage.map((item, idx) => (
              <div className="text-center">
                <h2 className="fs-1">{this.state.blogPage[0].BlogTitle}</h2>
              </div>
            ))}
            {this.state.blogPage.map((item, idx) => (
              <div className="d-flex justify-content-between mt-15 border-bottom-secondery pb-5">
                <div className="userImg d-flex">
                  <div className="messengerDiv">
                    <img
                      src={this.state.blogPage[0].UserImage}
                      alt="userImg"
                      className="object-cover w-100 h-100" />
                  </div>
                  <NavLink to={`/channel/${item.ChannelID}`} className="fs-5 fw-bold ms-3 text-white m-auto">
                    {this.state.blogPage[0].UserName}
                  </NavLink>
                </div>
                <div className="text-end pt-3">
                  <span>{this.state.blogPage[0].BlogTime}</span>
                </div>
              </div>
            ))}

            <div className="mt-10">
              {/* {this.state.blogPage.map((item, idx) => ( */}
              <img src={this.state.blogPage[0].BlogImage} alt="blogImg" />
            </div>
            {/* <!-- 部落格文章 --> */}
            <section>
              {/* {this.state.blogPage.map((item, idx) => ( */}
              <pre className="fs-5 text-justify lh-lg mt-5 ">
                {this.state.blogPage[0].BlogText}
              </pre>
            </section>
            {/* <!-- 留言 --> */}
            <div className="mt-20">
              <h5 className="fs-5 fw-bold border-bottom-secondery pb-5">留言列表( {this.state.messenger.length} )</h5>
            </div>
            {this.state.messenger.map((item, idx) => (
              <div className="border-bottom-secondery mb-3 mt-10 pb-3 message" idx={item.MessageID}>
                <div >
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className="messengerDiv">
                        <img
                          src={item.UserImage}
                          alt="messenger1"
                          className="object-cover w-100 h-100"
                        />
                      </div>
                      <span className="ms-2 m-auto">{item.MessageName}</span>
                    </div>
                    <div>
                      <span className="ms-2 m-auto">{item.MessageDate}</span>
                    </div>
                  </div>
                  <p className="p-5">{item.MessageText}</p>
                </div>
                {/* 回覆留言 */}
                <div className="pt-5 reply bgColor-white-opacity-5">
                  <div className="d-flex">
                    <div className="replyDiv">
                      <img src={this.state.blogPage[0].UserImage} alt="" className="object-cover w-100 h-100" />
                    </div>
                    <div className="ms-3">
                      <span className="m-auto">{this.state.blogPage[0].UserName}</span>
                    </div>
                  </div>
                  <p className="pt-3 p-5"> &gt; {item.MessageReply}</p>
                </div>
              </div>
            ))}
            <h5 className="fw-bold mt-5 mb-5" onClick={this.test}>我要留言</h5>
            <textarea
              name=""
              id="mContent"
              cols="30"
              rows="10"
              className="w-100 mb-4"
              value={this.state.defaultMessenger[0].MessageText}
              onChange={e => {
                let newState = { ...this.state }
                newState.defaultMessenger[0].MessageText = e.target.value
                this.setState({ newState });
              }}
            />
            <input
              type="button"
              className="btn btn-gradation-square btn-s px-4 hvr-bounce-in"
              style={{ float: "right" }}
              value=" 送出"
              onClick={this.mSend}
            />
          </article>
          {/* <!-- right --> */}
          <aside className="col-md-3 offset-md-1 col-12 pt-5">
            {/* 自己的其他文章 */}
            <h4 className="fw-bold mb-8">
              <ins>其他文章</ins>
            </h4>
            <ul>
              {this.state.channelOther.map((item, idx) => (
                <li className="mb-md-6 pb-5 border-bottom-secondery">
                  <NavLink to={`/channelBlog/${item.ChannelID}/blog/${item.BlogID}`} className="linkHover" onClick={this.changePage}>
                    <img src={item.BlogImage} alt="" />
                    <p className="pt-3 fs-5 text-truncate">
                      {item.BlogTitle}
                    </p>
                  </NavLink>
                  <p className="text-end fs-7 mt-3">{item.BlogTime}</p>
                </li>
              ))}
            </ul>
            {/* 其他人的文章 */}
            <h4 className="fw-bold mb-8 mt-20">
              <ins>最新文章</ins>
            </h4>
            <ul>
              {this.state.otherPage.map((item, idx) => (
                <li className="mb-md-6 pb-5 border-bottom-secondery">
                  <NavLink to={`/channelBlog/${item.ChannelID}/blog/${item.BlogID}`} className="linkHover" onClick={this.changePage}>
                    <img src={item.BlogImage} alt="" />
                    <p className="pt-3 fs-5 text-truncate">
                      {item.BlogTitle}
                    </p>
                  </NavLink>
                  <p className="text-end fs-7 mt-3">{item.BlogTime}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
    );
  }
  componentDidMount = async () => {
    //登入資料
    let resultUser = await Axios.get(
      `http://localhost:9000/channelUserInfo/${(document.cookie == "" ? 20 : document.cookie)}`);
    this.setState({ userInfo: resultUser.data[0] })

    let newState = { ...this.state };
    newState.defaultMessenger[0].UserID = (document.cookie == "" ? 20 : document.cookie);
    newState.defaultMessenger[0].MessageName = resultUser.data[0].UserName;
    this.setState({ newState });
    console.log(this.state.defaultMessenger);


    //部落格文章內容

    let result2 = await Axios.get(
      `http://localhost:9000/blog/items/${this.props.match.params.id}`
    );
    this.setState({ blogPage: result2.data });



    let result = await Axios.get(
      `http://localhost:9000/channel/${this.state.blogPage[0].ChannelID}/blog/${this.props.match.params.id}/message`
    );
    this.setState({ messenger: result.data });
    //此Channel的其他文
    let result3 = await Axios.get(`http://localhost:9000/channelBlog/${this.state.blogPage[0].ChannelID}/blog/${this.props.match.params.id}`);
    this.setState({ channelOther: result3.data });

    // not Channel ?的其他部落格文章
    let result4 = await Axios.get(`http://localhost:9000/blogOtherPage/${this.state.blogPage[0].ChannelID}/blog/other/${this.props.match.params.id}`);
    this.setState({ otherPage: result4.data });

    let message = document.querySelectorAll('.message');
    let reply = document.querySelectorAll('.reply')
    // console.log(this.state.messenger[0].MessageID)
    for (var i = 0; i < message.length; i++) {
      // console.log(message[i].attributes.idx.value)
      // console.log(reply[i]);
      // console.log(this.state.messenger[i].MessageID)
      if (parseInt(message[i].attributes.idx.value) === this.state.messenger[i].MessageID) {
        // console.log(this.state.messenger[i].MessageID)
        // console.log(this.state.messenger[i].MessageReply)
        if (this.state.messenger[i].MessageReply == null) {
          // console.log("ok")
          reply[i].classList.add("d-none");
        }
      } else {
        console.log('no')
      }
    }
  };
  test = () => {
    console.log()
  }
  mSend = async () => {
    let result5 = await Axios.post(
      "http://localhost:9000/message/create/",
      this.state.defaultMessenger);
    console.log(this.state.defaultMessenger);
    console.log(result5);
    // window.location = `${this.props.match.params.id}`;

  }
  componentDidUpdate = async () => {
    // if (this.state.defaultMessenger[0].MessageText == "") {
    //   window.scroll(0, 0);

    // }
    let result = await Axios.get(
      `http://localhost:9000/channel/${this.state.blogPage[0].ChannelID}/blog/${this.props.match.params.id}/message`
    );
    this.setState({ messenger: result.data });
  }
  changePage = async () => {
    setTimeout(() => {
      document.location.reload();
    }, 0)
  }

}


export default Blog;