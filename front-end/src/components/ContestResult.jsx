import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import './ContestVote';

class ContestResult extends Component {
    state = {
        data: [{}],
        data2: [{}],
        userVoteRes: [{}]
    }
    componentDidMount = async () => {
        var x = localStorage.getItem('contestID');
        let result = await Axios.get('http://localhost:9000/contest/groupid0/result');
        let result_2 = await Axios.get('http://localhost:9000/contest/groupid1/result');
        let userVote = await Axios.get(`http://localhost:9000/contest/${x}`);
        this.state.userVoteRes = userVote.data;
        this.state.data = result.data;
        this.state.data2 = result_2.data;
        this.setState({});
        console.log(userVote.data);
    }
    render() {
        var x = localStorage.getItem('contestID');
        return (
            <div className=' bg-SU-contest pb-30'>
                <div className='container py-md-20'>
                    <h2 className="text-center mb-5 mt-5">第八屆 聲聲不息創作新人選拔賽</h2>
                    <hr />
                    <h3 className="text-center mb-5 mt-5">投票成功，感謝您的參與</h3>
                    <div class="container col-xxl-8 px-4 py-5">
                        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                            <div class="col-10 col-sm-8 col-lg-6">
                                <img src={this.state.userVoteRes[0].ContestImg} class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
                            </div>
                            <div class="col-lg-6">
                                <h1 class="display-5 fw-bold lh-1 mb-3">{this.state.userVoteRes[0].ContestName}</h1>
                                <p class="lead">
                                    {this.state.userVoteRes[0].ContestInfo}
                                </p>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-start ">
                                    <NavLink to={'/ContestVote'} className="contestButtonPosition btn  container btn-gradation  float-end"><h3>返回投票頁面</h3></NavLink>
                                </div>

                            </div>
                        </div>
                    </div>
                    <hr />
                    <section class="row">
                        <div class="col-md-5">
                            <h3 class="pt-8">個人組</h3>
                            <h5>目前票數前五名!</h5>
                            {this.state.data.map(
                                (dataItem) =>
                                    <div class="row pt-8">
                                        <div class="col-md-1 col-2 m-auto">
                                            <span class="fs-2">{dataItem.UserID}</span>
                                        </div>
                                        <div class="col-md-5 col-10">
                                            <img src={dataItem.ContestImg} alt="" class="rounded-circle w-200px" />
                                        </div>
                                        <div class="col-md-6  col-12 m-auto">
                                            <div class="fs-4 float-end pe-1">
                                                <p>{dataItem.ContestVote}票</p>
                                            </div>
                                            <div class="progress w-100 height30px">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark width75"></div>
                                            </div>
                                        </div>
                                    </div>)}
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-1 border-start"></div>
                        <div class="col-md-5 col-12">
                            <h3 class="pt-8">樂團組</h3>
                            <h5>目前票數前五名!</h5>
                            {this.state.data2.map(
                                (dataItem) =>

                                    <div class="row pt-8">
                                        <div class="col-md-1 col-2 m-auto">
                                            <span class="fs-2">{dataItem.UserID}</span>
                                        </div>
                                        <div class="col-md-5 col-10">
                                            <img src={dataItem.ContestImg} alt="" class="rounded-circle w-200px" />
                                        </div>
                                        <div class="col-md-6  col-12 m-auto">
                                            <div class="fs-4 float-end pe-1">
                                                <p>{dataItem.ContestVote}票</p>
                                            </div>
                                            <div class="progress w-100 height30px">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark width75"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                            )}
                        </div>
                    </section>
                </div>
            </div>

        )
    }
}

export default ContestResult;