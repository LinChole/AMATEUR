import React, { Component } from 'react';
import { NavLink } from "react-router-dom";


class home extends Component {
    state = {}
    render() {
        return (
            <>
                <div className="bg-login">
                    <h1 className='title'>Home</h1>
                    <p>Home page body content</p>
                    <img src="images/user01.jpg" alt="照片" />
                    <span className="material-icons icon-20 align-middle cursor-pointer ps-1">edit</span>
                    <NavLink to={"/"}>首頁</NavLink>

                </div>
            </>
        )
    };
}


export default home;