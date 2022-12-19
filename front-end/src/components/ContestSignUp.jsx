import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';

import axios from "axios";
import "../css/CSU.css"
import "../css/contest.css"
class ContestSignUp extends React.Component {
    state = {
        img: "http://localhost:9000/Img/albumDefaultImg.svg"
    }
    onFileUpload = event => {
        console.log(event.target.files[0])
    };
    onChange = e => {
        const file = e.target.files.item(0); // 取得選中檔案們的一個檔案
        const fileReader = new FileReader(); // FileReader為瀏覽器內建類別，用途為讀取瀏覽器選中的檔案
        fileReader.addEventListener("load", this.fileLoad);
        fileReader.readAsDataURL(file); // 讀取完檔案後，變成URL
    };
    fileLoad = e => {
        this.setState({
            img: e.target.result // 讀取到DataURL後，儲存在result裡面，指定為img
        });
    };
    submit = () => {
        // json base64
        // axios.post("/img", { img: this.state.img });
        swal({
            title: "報名成功",
            icon: "success",
            button: "確認"
          }).then(() => {
            window.location = `/contestvote`;
          });
    };
    render() {
        return (
            <div className=' bg-SU-contest py-30'>
                <div className='container'>
                    <div>
                        <div class="container col-xxl-8 px-4 py-5">
                            <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                                <div class="col-10 col-sm-8 col-lg-6">
                                    <img src={this.state.img} class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
                                    <hr />
                                    <input type="file" onChange={this.onChange} className="btn btn-gradation d-block mx-lg-auto img-fluid" />
                                </div>
                                <div class="col-lg-6">
                                    <h1 class="display-5 fw-bold lh-1 mb-3">參賽者資料上傳</h1>
                                    <input className="form-control form-control-login fs-5 mb-8 p-4" type="text" name="ContestName" id='ContestName'
                                        placeholder="姓名" required></input>
                                    <input className="form-control form-control-login fs-5 mb-8 p-4" type="text" name="ContestSong" id='ContestSong'
                                        placeholder="歌曲名稱" required></input>
                                    <select name="contestgroup" id="pet-select" className='form-control form-control-login fs-5 mb-8 p-4'>
                                        <option value="" className='text-black'>--您想報名的組別--</option>
                                        <option value="個人組" className='text-black'>個人組</option>
                                        <option value="樂團組" className='text-black'>樂團組</option>
                                    </select>
                                    <input className="form-control form-control-login fs-5 mb-8 p-4" type="text" name="ContestInfo" id='ContestInfo' style={{ height: '160px' }}
                                        placeholder="向大家介紹一下自己吧~" required></input>
                                    <div class="d-grid gap-2 d-md-flex fs-5 mb-8 p-4">
                                    </div>
                                </div>
                                <div class="text-center justify-content-md-start">
                                    <div className='d-grid gap-2'>

                                        <button type="button" class="btn btn-outline-info btn-lg px-4 me-md-2" onClick={this.submit} ><NavLink to="/ContestVote">上傳資料</NavLink></button>
                                        <a type="button" class="btn btn-dark btn-lg px-4 me-md-2" href='/contest'>前往投票</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} export default ContestSignUp;