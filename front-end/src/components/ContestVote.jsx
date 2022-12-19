import React, { Component } from 'react';
import Axios from 'axios';

class ContestVote extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [{}],
            data2: [{}],
        }
        // 需綁定 this，否則會找不到 hello method
        this.contestPost = this.contestPost.bind(this);
    }
    componentDidMount = async () => {
        let result = await Axios.get('http://localhost:9000/contest/groupid0');
        let result_2 = await Axios.get('http://localhost:9000/contest/groupid1');
        this.state.data = result.data;
        this.state.data2 = result_2.data;
        this.setState({});
        // console.log(this.state.data)
        // var x = 0;
        // var i = 0;
        // for (i; i <= result_2.data.length; i++) {
        //     x += result_2.data[i].ContestVote;
        //     console.log(x);
        // };
    }
    contestPost = (e) => {
        var contestID = e.target.getAttribute("data-id");
        this.state.parentName = contestID;
        var contestVote = e.target.getAttribute('data-voteNum');
        Axios.post('http://localhost:9000/contestvote', {
            ContestID: contestID,
            ContestVote: contestVote
        })
        localStorage.setItem('contestID', contestID);
        if (document.cookie) {
            document.location.href = "http://localhost:3000/contestresult";
        } else {
            document.location.href = "http://localhost:3000/logintovote";
        }
    }
    test1 = (e) => {
        var contestID = e.target.getAttribute("data-id");
        this.state.parentName = contestID;
        this.setState({});
        console.log(this.state.parentName);
    }
    // VoteContent
    clickTabNoteNum = () => {
        document.querySelector('.tabNoteNum').classList.remove('d-none')
        document.querySelector('.VoteContent').classList.add('d-none')
    }
    clickTabVote = () => {
        document.querySelector('.tabNoteNum').classList.add('d-none')
        document.querySelector('.VoteContent').classList.remove('d-none')
    }
    render() {
        return (
            <div>
                <div className='text-center bg-contest'>
                    <div className='container py-md-20'>

                        <h2 className="text-center mb-5 mt-5">第八屆 聲聲不息創作新人選拔賽</h2>
                        <figcaption class="blockquote-footer">
                            Amateur Music <cite title="Source Title">Need You're Voice</cite>
                        </figcaption>
                        <img src="http://localhost:9000/contest/contest-BG.png" alt="" />

                        <div className=''>
                            <ul className="nav nav-tabs " id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button onClick={this.clickTabVote} className="nav-link active text-white fs-4" id="ing-tab" data-bs-toggle="tab"
                                        data-bs-target="#ing" type="button">投票進行中</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button onClick={this.clickTabNoteNum} className="nav-link text-white fs-4" id="nav-end-tab" data-bs-toggle="tab" data-bs-target="#end"
                                        type="button">目前票數</button>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content" id="myTabContent">
                            <section className="tab-pane fade show active VoteContent" id="ing" role="tabpanel">
                                <h3 className="mt-8">個人組</h3>
                                <div className="swiper mySwiper">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="row mt-8 ms-8">
                                                {this.state.data.map(
                                                    (dataItem) =>
                                                        <div className="col-md-4 col-12 mb-2">
                                                            <div className="row img-thumbnail contestid" >
                                                                <div className="col-md-6 col-6 ">
                                                                    <img src={dataItem.ContestImg} className="mt-8"></img>
                                                                    <p className="text-center mt-3">{dataItem.ContestName}</p>
                                                                </div>
                                                                <div className="col-md-6 col-6 contestInfoBox">
                                                                    <p className="text-center mt-8">{dataItem.ContestMusicName}</p>
                                                                    <p className="mt-3 ContestInfoText">{dataItem.ContestInfo}</p>
                                                                    <br />
                                                                    <a className="contestButtonPosition btn container btn-gradation mb-2 float-end"
                                                                        data-id={dataItem.ContestId} data-voteNum={dataItem.ContestVote} onClick={this.contestPost}
                                                                    >投票</a>                                                                </div>
                                                            </div>
                                                        </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <hr />
                                <h3 class="mt-8">樂團組</h3>
                                <div class="swiper mySwiper">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                            <div class="row mt-8 ms-8">
                                                {this.state.data2.map((dataItem) =>
                                                    <div className="col-md-6 col-12 mb-2">
                                                        <div className="row contestBandImg contestGroupimg-thumbnail p-3">
                                                            <div className="col-md-6 col-6">
                                                                <img src={dataItem.ContestImg} alt="" className="rounded-circle"></img>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <p className="text-center mt-3">{dataItem.ContestMusicName}</p>
                                                                <p className="text-center mt-4">{dataItem.ContestName}</p>
                                                                <p className='mt-3'>{dataItem.ContestInfo}</p>
                                                                <a href="/contestresult" className="btn container btn-gradation mb-2 float-end mt-3"
                                                                    data-id={dataItem.ContestId} data-voteNum={dataItem.ContestVote} onClick={this.contestPost}
                                                                >投票</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <section class="tab-pane fade d-none tabNoteNum" id="end" role="tabpanel">
                            <section class="row">
                                <div class="col-md-5">
                                    <h3 class="pt-8">個人組</h3>
                                    <h5>目前票數 : 4011</h5>
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
                                    <h5>目前票數 : 2990</h5>
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
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContestVote;