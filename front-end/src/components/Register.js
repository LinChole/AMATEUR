import React, { Component } from 'react';
import axios from "axios";
class Register extends Component {
  SINGUP = () => {
    var userMail = document.getElementById('UserMail').value;
    var userPW = document.getElementById('UserPW').value;
    var userName = document.getElementById('UserName').value;
    var userBrith = document.getElementById('UserBrith').value;
    var userPW_check = document.getElementById('UserPW_check').value;
    if (userMail !== "" && userPW !== "" && userName !== "" && userBrith !== "" && userPW_check !== "" && userPW === userPW_check) {
      axios.post('http://localhost:9000/signup', {
        UserMail: userMail,
        UserPW: userPW,
        UserName: userName,
        UserBrith: userBrith,
      })
        .then((response) => {
          // console.log(response.data.error);
          if (response.data.error) {
            console.log(response.data.error);
            document.getElementById('456').innerText = "此帳號已註冊，請重新輸入";
          } else {
            document.location.href = "http://localhost:3000/login";
          }
        })
        .catch((e) => {
          if (e.response.error) {
            alert("帳號或密碼錯誤！");
          }
        });
    } else if (userMail === "") {
      document.getElementById('123').innerText = "請輸入帳號";
    } else if (userPW === "") {
      document.getElementById('123').innerText = "請輸入密碼";
    } else if (userName === "") {
      document.getElementById('123').innerText = "請輸入使用者名稱";
    } else if (userBrith === "") {
      document.getElementById('123').innerText = "請輸入使用者生日";
    } else if (userPW !== userPW_check) {
      console.log(userPW);
      console.log(userPW_check);
      document.getElementById('789').innerText = "密碼輸入請一致!";
    }

  }
  render() {
    return (
      <div className="bg-login">
        <div className="container pt-30">
          <div className="row justify-content-end pb-30">
            <div className="col-5">
              <form method='POST' action='htto:localhost:4000' className="bg-white-opacity-10 backdrop-blur p-12">
                <h2 className="fs-2 fw-bold mb-12 text-center">我們需要先蒐集一些資訊</h2>
                <p className='fs-5'>E-mail:</p>
                <input className="form-control form-control-login fs-5 mb-6 p-4" type="email" name="userMail" placeholder="E-Mail" id='UserMail' required></input>
                <div id='456' className='bg-danger content w-100 mb-4 text-center'></div>
                <p className='fs-5'>密碼:</p>
                <input className="form-control form-control-login fs-5 mb-6 p-4" type="password" id='UserPW' placeholder="請設定 6 個字元以上做為密碼" required></input>
                <div id='789' className='bg-danger content w-100 mb-4 text-center'></div>
                <input className="form-control form-control-login fs-5 mb-6 p-4" type="password" id='UserPW_check' placeholder="確認密碼" required></input>
                <p className='fs-5'>使用者名稱:</p>
                <input className="form-control form-control-login fs-5 mb-6 p-4" type="text" name="userName" id='UserName' placeholder="請輸入您的使用者名稱" required></input>
                <p className='fs-5'>出生日期:</p>
                <input className="form-control form-control-login fs-5 mb-6 p-4" type="tel" name="userBrith" id='UserBrith' placeholder="請輸入您的生日 EX:1999.12.31" required></input>
                <div id='123' className='bg-danger content w-100 mb-4 text-center'></div>
                <a className="btn btn-gradation-square btn-l w-100 mb-6" onClick={this.SINGUP}><span>下一步</span></a>
                <p className="text-center">已經註冊過了？ <a href="/login">上一步</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
