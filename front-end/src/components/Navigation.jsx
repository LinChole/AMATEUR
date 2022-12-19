import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogin: [{ userID: "" }],
            searchSinger: [{}],
            defaultSearch: [{ searchName: "" }],
            defaultUserId: [{ UserId: "" }]
        }
    }

    render() {
        return (
            <div className="navBackground">
                <nav className="navbar navbar-expand-lg d-flex justify-content-between bg-black py-3">
                    <div className="container">
                        {/* logo */}
                        <div>
                            <NavLink to="/" onClick={this.MusicPlayerBlock}>
                                <img src="/images/icon/AMATEURLog.png" alt="" />
                            </NavLink>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="box me-10">
                                {/* search button */}
                                <div className="d-flex align-items-center searchDropdown text-gray hover-primary cursor-pointer">
                                    <span className="fs-4 me-4" onClick={this.dropdownClose}>
                                        <i className="fa fa-search"></i>
                                    </span>
                                    <p className="fs-5 fw-bold" onClick={this.mysearchFunction}>搜尋歌手</p>
                                    {/* <input
                                        type="search"
                                        id="search"
                                        placeholder="Search..."
                                        onClick={this.mysearchFunction}
                                        className="searchDropbtn"
                                    /> */}
                                </div>
                                <div
                                    id="mySearchDropdown"
                                    className="searchDropdown-content container bg-opacity-30 backdrop-blur-10 mt-2"
                                >
                                    <div className="text-end pt-3">
                                        <button type="button" className="btn-close btn-close-white" aria-label="Close"
                                            onClick={this.CloseShow}></button>
                                    </div>
                                    <div className="searchContainer py-5 d-flex align-items-center w-100">
                                        <input
                                            type="search"
                                            id="search"
                                            name="search"
                                            placeholder="請輸入創作者名稱"
                                            className="w-100 ms-2 ps-9"
                                            value={this.state.defaultSearch[0].searchName}
                                            onChange={e => {
                                                let newState = { ...this.state }
                                                newState.defaultSearch[0].searchName = e.target.value
                                                this.setState({ newState });
                                            }}
                                        />
                                        <div>
                                            <a href={`/searchSinger/${this.state.defaultUserId[0].UserId}`} className="btn btn-m btn-gradation-pill rounded-pill ms-5 me-2"
                                                style={{ width: '110px' }}
                                                onClick={this.searchSinger}
                                            ><span>搜尋</span></a>
                                        </div>
                                    </div>
                                    {/* type button */}
                                    <div className="d-flex">
                                        <NavLink to="/search/情歌"
                                            className="btn btn-xl btn-gradation-pill m-2 rounded-pill"
                                        >
                                            <span>情歌</span>
                                        </NavLink>
                                        <NavLink to="/search/推薦"
                                            className="btn btn-xl btn-gradation-pill m-2 rounded-pill"
                                        >
                                            <span>推薦</span>
                                        </NavLink>
                                        <NavLink to="/search/搖滾"
                                            className="btn btn-xl btn-gradation-pill m-2 rounded-pill"
                                        >
                                            <span>搖滾</span>
                                        </NavLink>
                                    </div>
                                    <div className="d-flex pb-5">
                                        <NavLink to="/search/Funk"
                                            className="btn btn-xl btn-gradation-pill m-2 rounded-pill"
                                        >
                                            <span>Funk</span>
                                        </NavLink>
                                        <NavLink to="/search/重金屬"
                                            className="btn btn-xl btn-gradation-pill m-2 rounded-pill"
                                        >
                                            <span>重金屬</span>
                                        </NavLink>
                                        <NavLink to="/search/R&B"
                                            className="btn btn-xl btn-gradation-pill m-2 rounded-pill"
                                        >
                                            <span>R&B</span>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            {/* login button */}
                            <div>{(document.cookie == "") ?
                                <NavLink to="/login" className="btn btn-xl btn-gradation-pill"><span>登入</span></NavLink> :
                                
                                <div className="dropdown">
                                    <button className="btn btn-m dropdown-toggle text-gray hover-primary" type="button" data-bs-toggle="dropdown">
                                        {/* <img src="/images/icon/person_white_24dp.svg" alt="" className="navLoginIcon " /> */}
                                        <span className="fs-5 fw-bold mt-5">會員中心</span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end m-0 p-0" style={{ width: '180px' }}>
                                        <li className="text-center mt-4">
                                            <img src={this.state.userLogin[0].UserImage} alt="" className="border border-secondary border-3 rounded-circle" width="100px" />
                                        </li>
                                        {/* <li className="text-center mt-2"><p className="fs-5 text-decoration-underline">{this.state.userLogin[0].UserName}</p></li> */}
                                        <li className="text-center mt-5">
                                            <NavLink to={`/channel/${document.cookie}`} className="dropdown-item fs-5 py-3" onClick={(e)=>this.addBackground(e)} idx="1">我的頻道</NavLink>
                                        </li>
                                        <li className="text-center">
                                            <NavLink to={`/member/${document.cookie}`} className="dropdown-item fs-5 py-3" onClick={(e)=>this.addBackground(e)} idx="2">後台管理</NavLink>
                                        </li>
                                        <li className="text-center">
                                            <a className="dropdown-item fs-5 py-3" href="#" onClick={this.logout}>登出</a>
                                        </li>
                                        {/* <li className="text-center mt-5"><button className="dropdown-item btn btn-s btn-gradation rounded-pill w-75 m-auto">登出</button></li> */}
                                    </ul>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                </nav >
            </div >
        )
    }
    addBackground = (e) => {
        let itemNum = e.target.attributes.idx.value;
        let itemArr = document.querySelectorAll('.dropdown-item');
        for (let i = 0; i < itemArr.length - 1; i++) {
            if (itemArr[i].attributes.idx.value === itemNum) {
                itemArr[i].classList.add('dropdown-item');
            } else {
                itemArr[i].classList.remove('active');
            }
        }
    }
    // //點擊進入會員中心 音樂播放器消失
    // MusicPlayerNone = () => {
    //     document.querySelector('.control-container').classList.add('d-none')


    // }
    // //點擊首頁LOGO和登出 音樂播放器出來
    // MusicPlayerBlock = () => {
    //     document.querySelector('.control-container').classList.remove('d-none')
    // }
    logout = (e) => {
        var cookies = document.cookie.split(";");
        var cookie = cookies[0];
        var eqPos = cookie.indexOf("=");
        document.cookie = cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.location.href = "http://localhost:3000/";
    }
    componentDidMount = async () => {
        let result = await Axios.get("http://localhost:9000/search/singer");
        this.setState({ searchList: result.data });

        let resultUser = await Axios.get("http://localhost:9000/loginUser/1");
        this.setState({ userLogin: resultUser.data })

    };

    searchSinger = () => {
        var searchUserID = "";
        if (this.state.defaultSearch[0].searchName === "老王樂團") {
            searchUserID = 1;
        } else if (this.state.defaultSearch[0].searchName === "怕胖團") {
            searchUserID = 2;
        } else if (this.state.defaultSearch[0].searchName === "麋先生") {
            searchUserID = 3;
        } else if (this.state.defaultSearch[0].searchName === "康士坦") {
            searchUserID = 4;
        } else if (this.state.defaultSearch[0].searchName === "血肉果汁機") {
            searchUserID = 5;
        } else if (this.state.defaultSearch[0].searchName === "冰球樂團") {
            searchUserID = 6;
        } else if (this.state.defaultSearch[0].searchName === "P!SCO") {
            searchUserID = 7;
        } else if (this.state.defaultSearch[0].searchName === "草東沒有派對") {
            searchUserID = 8;
        } else if (this.state.defaultSearch[0].searchName === "美秀集團") {
            searchUserID = 14;
        } else if (this.state.defaultSearch[0].searchName === "Multiverse") {
            searchUserID = 15;
        } else if (this.state.defaultSearch[0].searchName === "原子邦妮") {
            searchUserID = 16;
        } else if (this.state.defaultSearch[0].searchName === "FUTURE AFTER A SECOND") {
            searchUserID = 17;
        } else if (this.state.defaultSearch[0].searchName === "告五人") {
            searchUserID = 18;
        }
        window.location = Error

        let newState = { ...this.state }
        newState.defaultUserId[0].UserId = searchUserID;
        this.setState({ newState });
        console.log(searchUserID)
        console.log(this.state.defaultUserId[0].UserId)
        // let result = Axios.get(`http://localhost:9000/search/singer/${searchUserID}`);
        // this.setState({ defaultSearch: result.data });


        console.log(this.state.defaultUserId[0])





    }
    mysearchFunction = () => {
        document.getElementById("mySearchDropdown").classList.toggle("show");
    }
    CloseShow = () => {
        document.getElementById("mySearchDropdown").classList.remove("show");
    }
    // Close the dropdown if the user clicks outside of it
    dropdownClose = (event) => {
        if (!event.target.matches('.searchDropbtn')) {
            var dropdowns = document.getElementsByClassName("searchDropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }


}

export default Navigation;