import React, { Component } from 'react';
import axios from "axios";
// const { setToken } = useContext(context);

class Login extends React.Component {
    POST = () => {
        var userMail = document.getElementById('UserMail').value;
        var userPW = document.getElementById('UserPW').value;
        if (userMail !== "" && userPW !== "") {
            axios.post('http://localhost:9000/signin', {
                UserMail: userMail,
                UserPW: userPW,
            })
                .then((response) => {
                    if (response.data.error == "ACCOUNT_NOT_EXIST") {
                        document.getElementById('123').innerText = "此帳號並不存在";
                        document.getElementById("UserMail").setAttribute("class",
                            'form-control form-control-login fs-5 mb-8 p-4 bg-danger');
                    } else if (response.data.error == "WRONG_PASSWORD") {
                        document.getElementById('123').innerText = "密碼錯誤";
                        document.getElementById("UserMail").setAttribute("class",
                            'form-control form-control-login fs-5 mb-8 p-4');
                        document.getElementById("UserPW").setAttribute("class",
                            'form-control form-control-login fs-5 mb-8 p-4 bg-danger');
                        console.log(response.data.error);
                    } else {
                        document.cookie = response.data[0][0].UserID;
                        axios.defaults.headers.common["authorization"] = response.data.token; // axios 帶上 token
                        // setToken(response.data.token); // 保存至 context
                        // localStorage("token", response.data.token); // 保存到本地
                        document.location.href = " http://localhost:3000";
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        } else if (userMail === "") {
            document.getElementById('123').innerText = "請輸入帳號";
        } else {
            document.getElementById('123').innerText = "請輸入密碼";
        }

    }
    render() {
        return (
            <div className="bg-login get">
                <div className="container pt-30">
                    <div className="row justify-content-end pb-30">
                        <div className="col-5">
                            <div className="bg-white-opacity-10 backdrop-blur p-12">
                                <h2 className="fs-2 fw-bold mb-4">Login</h2>
                                <h4 className="fs-5 mb-12">Hello! Welcome Back!</h4>
                                <input className="form-control form-control-login fs-5 mb-8 p-4" type="email" name="UserMail" id='UserMail'
                                    placeholder="請輸入 Email 信箱" required></input>
                                <input className="form-control form-control-login fs-5 mb-8 p-4" type="password" name="UserPW" id='UserPW'
                                    placeholder="請輸入密碼" required></input>
                                <div className="text-end mb-6">
                                    <a className="fs-7 text-white hover-primary" href="forget_password.html">忘記密碼</a>
                                </div>
                                <div id='123' className='bg-danger content w-100 mb-4 text-center'></div>
                                <button className="btn btn-gradation-square btn-l w-100 mb-6" onClick={this.POST} type="submit" href="/index"><span>登入</span></button>
                                {/* <button className="btn btn-gradation-square btn-l w-100 mb-4" type="button"><span>使用 Google 登入</span></button> */}
                                <p className="text-center">沒有帳號嗎？立即 <a href="/register">註冊</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;