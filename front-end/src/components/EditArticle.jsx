import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';

class EditArticle extends Component {
  state = {
    blogList: [{}],
    selectedList: [{selectedFile: null}]
  }
  render() {
    return (
      <main>
        <div className="container py-md-20">
          <div className="row justify-content-center">
            <section className="col-md-8">
              <form className="bg-dark-gray rounded-16 p-6">
                <input className="form-control form-control-addNewArticle mb-md-8" type="text" name="BlogTitle" placeholder="請輸入標題" value={this.state.blogList[0].BlogTitle}
                  onChange={
                    (e) => {
                      let newState = {...this.state};
                      newState.blogList[0].BlogTitle = e.target.value;
                      this.setState({newState});
                    }
                  } />
                <div className="position-relative rounded-8 overflow-hidden">
                  <img className="blogFileImg w-100 object-cover" src={this.state.blogList[0].BlogImage} alt="文章照片" />
                  <div className="position-absolute bottom-0 end-0 pb-4 pe-4">
                    <label>
                      <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary w-36px cursor-pointer hover-opacity-50 upload p-2">
                        <span className="material-icons">file_upload</span>
                      </div>
                      <input className="d-none" type="file" accept="image/*" name="blogImg"
                        // onClick={
                        //   () => {
                        //     document.querySelector('.upload').classList.add('d-none');
                        //   }
                        // }
                        onChange={
                          (e) => {
                            let img = document.querySelector('.blogFileImg');
                            img.src = URL.createObjectURL(e.target.files[0]);
                            img.onload = () => {
                              URL.revokeObjectURL(img.src);
                            }
                            let newState = {...this.state};
                            newState.selectedList[0].selectedFile = e.target.files[0];
                            this.setState({newState});
                            console.log(this.state.selectedList[0]);
                          }
                        } />
                    </label>
                  </div>
                </div>
                <textarea className="form-control form-control-addNewArticle my-md-8" name="BlogText" rows="20" placeholder="請輸入內容" value={this.state.blogList[0].BlogText}
                  onChange={
                    (e) => {
                      let newState = {...this.state};
                      newState.blogList[0].BlogText = e.target.value;
                      this.setState({newState});
                    }
                  } />
                <div className="d-flex justify-content-center">
                  <a href={`/member/channel/${document.cookie}`} type="button" className="btn btn-gradation-square btn-m me-4 px-md-8"><span>取消</span></a>
                  <button onClick={this.editBlogClicked} type="button" className="btn btn-gradation-square btn-m px-md-8"><span>確認</span></button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    );
  }
  componentDidMount = async () => {
    let resultContent = await Axios.get(`http://localhost:9000/blog/items/${this.props.match.params.id}`);
    this.setState({blogList: resultContent.data});
  }
  editBlogClicked = async () => {
    const formData = new FormData();
    formData.append("blogImg", this.state.selectedList[0].selectedFile);
    let resultImg = await Axios.put(`http://localhost:9000/blog/image/${this.props.match.params.id}`, formData);
    console.log(resultImg);

    let updateContent = async () => {
      let result = await Axios.put(`http://localhost:9000/blog/items/${this.props.match.params.id}`, this.state.blogList);
      console.log(result);
    }
    updateContent();
    
    swal({
      title: "更新成功",
      text: "即將引導您回頻道首頁",
      icon: "success",
      button: "確認"
    }).then(() => {
      window.location = `/member/channel/${this.state.blogList[0].ChannelID}`;
    });
  }
}

export default EditArticle;