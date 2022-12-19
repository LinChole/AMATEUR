import React, { Component } from 'react';

import Axios from "axios"




class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,
            pause: true,
            metud: false,
            random: false,
            progress: 0,
            MusicIndex: 0,
            MylocalStorage: localStorage.getItem('MusicIndex'),
            dataNum: 0,
            prevPropsIndexNum: 1,
            userID: 1,
            PropsMusicIndex: this.props.MusicIndex,
            MusicListID: [
                {
                    UserID: 1, //
                    MusicID: 1
                }
            ],
            MusicListText: '新增成功',
            deleteMusicListText: "刪除成功",
            musicData: [
                {
                    MusicID: 1,
                    UserID: 1,//
                    MusicName: "我還年輕 我還年輕",
                    Singer: "老王樂團",
                    Album: "吾十有五而志於學",
                    MusicType: "搖滾",
                    MusicTime: "5:55",
                    MusicImage: "../img/我還年輕我還年輕.jpeg",
                    MusicMp3: "../Music/老王樂團-我還年輕 我還年輕.mp3"
                }
            ],
            allMusicList: [
                {
                },
            ]

        }
        this.url = `http://localhost:9000/Music/老王樂隊｜這樣就好 這樣就好 Good, it would be good (Official).mp3`
        this.audio = new Audio(this.url);
        this.audio.onended = function () {
            this.nextMusic()
        }
    }

    componentDidMount = async () => {
        this.audio.addEventListener('ended', () => this.nextMusic());
        this.timerId = setInterval(() => {//一定要用箭頭函示 否則this會消失
            this.setState(this.audio);
            //使用setState()來修改狀態值
        }, 1000);//每1秒修改狀態值
        let result = await Axios.get('http://localhost:9000/music/')
        this.setState({ musicData: result.data })

        // 誰的user的所有歌單音樂
        let allMusicList = await Axios.get(`http://localhost:9000/MusicList/${document.cookie == "" ? "" : document.cookie}`)
        this.setState({ allMusicList: allMusicList.data })







    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('shouldComponentUpdate ' + nextProps, nextState);
    //     return false
    // }
    // 更新
    componentDidUpdate(prevProps, prevState) {
        //判斷即時更新歌單音樂 如果其他頁面新增就會執行
        let allMusicList = Axios.get(`http://localhost:9000/MusicList/${document.cookie == "" ? "" : document.cookie}`)
            .then((response) => response.data.length !== this.state.allMusicList.length ? this.setState({ allMusicList: response.data }) : "")

        if (localStorage.getItem('MusicIndex') == null && localStorage.getItem('MusicIndex') > this.state.musicData.length - 1) {
            localStorage.setItem('MusicIndex', 0)
        }

        // // this.state.MusicIndex <= localStorage.getItem('MusicIndex')
        if (this.state.MusicIndex !== localStorage.getItem('MusicIndex')) {

            this.setState({ MusicIndex: localStorage.getItem('MusicIndex') })
            this.audio.pause()
            this.url = `${this.state.musicData[localStorage.getItem('MusicIndex')].MusicMp3}`
            this.audio = new Audio(this.url);
            this.audio.addEventListener('ended', () => this.nextMusic());
            // console.log('有更新過的音樂' + this.url);
            // this.setState({ play: !this.state.play }, () => {
            //     this.state.play ? this.audio.play() : this.audio.pause();
            //     this.state.play ? document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;' : document.querySelector('.rotate').style = 'animation-play-state: paused; '
            // });
        }




    }


    componentWillUnmount() {
        this.audio.removeEventListener('ended', () => this.nextMusic());
    }

    togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
            this.state.play ? document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;' : document.querySelector('.rotate').style = 'animation-play-state: paused; '
        });

    }
    Clicklocal = () => {

        this.setState({ MylocalStorage: localStorage.getItem('MusicIndex') })
        console.log('MusicPlayer的local值' + this.state.MylocalStorage);
        console.log('props' + this.props.MusicIndex);
    }
    ClickCookie = () => {
        // console.log(this.state.allMusicList);
        // this.state.allMusicList.map(item => {
        //     console.log(item);
        // })
        let allMusicList = Axios.get(`http://localhost:9000/MusicList/${document.cookie == "" ? "" : document.cookie}`)
            .then((response) => console.log(response.data.length !== this.state.allMusicList.length))

    }
    render() {
        return (
            <>
                <div class=" MusicPlayer-Wrap" id="MusicPlayer-Wrap">
                    <img className='blur-wrap h-100' src={this.state.musicData[this.state.MusicIndex].MusicImage} alt="" />
                    <div id="audio" className="audio row mt-50">
                        <div className=" square col-12">
                            <img id="rotate" className='rotate' src={this.state.musicData[this.state.MusicIndex].MusicImage} alt="" />
                            <div className="square circle-img">
                            </div>
                        </div>
                    </div>



                    <div className="control-container" onClick={this.clickContentBtn}>
                        <div className="time-wrap">
                            <p id="nowTime" className="nowTime" >{this.formatTime(this.audio.currentTime)}</p>
                            <p id="totalTime" className="totalTime">{this.formatTime(this.audio.duration) || '0:00'}</p>
                        </div>
                        <progress onClick={this.scrub} id="videoProgress" class="progress mb-3" min="0" max="100" value={this.progressValue(this.audio.currentTime, this.audio.duration)}></progress>
                        <div class="control-wrap row" id="control">
                            <div class="col-4 control-data ps-3" id="control">
                                <img src={this.state.musicData[this.state.MusicIndex].MusicImage} alt="" />
                                <div class="control-text" id="control">
                                    <p>{this.state.musicData[this.state.MusicIndex].MusicName}</p>
                                    <small>{this.state.musicData[this.state.MusicIndex].Singer}</small>
                                </div>
                            </div>
                            <div class="button-control col-4" id="control">
                                <button class="btn-sm btn ps-0" onClick={this.backMusic}><img src={require('../icon/backward-step-solid 1.png')} alt="" /></button>
                                <button className='btn control-icon' onClick={this.togglePlay}><img className='isplay' src={this.state.play ? "http://localhost:9000/icon/pause-solid 1.png" : "http://localhost:9000/icon/Vector.png"} alt="" /></button>
                                <button class="btn pe-0" onClick={this.nextMusic}><img src={require('../icon/forward-step-solid 1.png')} alt="" /></button>
                            </div>
                            <div class="volume-control col-4" id="control">
                                <button id="btnRandom" class="btn  btnRandom me-3" onClick={this.clickRandom}>
                                    {this.state.random ? <img id="random" src={require("../icon/shuffle-solid 3.png")} alt="" /> : <img id="random" src={require("../icon/shuffle-solid 1.png")} alt="" />}
                                </button>
                                <label for="inputVolume"><img id="volume" onClick={this.soundMute} src={this.audio.muted ? require('../icon/volume-xmark-solid.png') : require('../icon/volume-low-solid.png')} alt="" /></label>
                                <input type="range" onChange={this.sound} id="inputVolume" class="inputVolume" min="0" max="1" step="0.1" value={this.audio.volume} />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="menu container" >
                    <button class="btn  menuBtn" id="menuBtn" onClick={this.clickMenuBtn}><img className='menu-active' src="http://localhost:9000/icon/left.png" alt="" /></button>
                    <ul class="nav NavTab nav-tabs row" id="myTab" role="tablist">
                        <li class="nav-item col ms-3 active" id="" role="presentation ">
                            <button class="nav-link active NavLink" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                                role="tab" aria-controls="home" aria-selected="true">播放清單</button>
                        </li>
                        <li class="nav-item col" role="presentation">
                            <button class="nav-link NavLink" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                                role="tab" aria-controls="profile" aria-selected="false">我的歌單</button>
                        </li>
                    </ul>
                    <div class="tab-content MusicTab" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                            {this.state.musicData.map((item, index) => (
                                <div class="row myPlayList alc mt-3" data-num={item.MusicID} onClick={this.clickMusic}>
                                    <div class="col-3" data-num={item.MusicID}>
                                        <img class="list-img" data-num={item.MusicID} src={item.MusicImage} alt="" />
                                    </div>
                                    <div class="col-6  d-flex alc" data-num={item.MusicID} >
                                        <div class="d-flex  flex-column  alc list-content" data-num={item.MusicID} >
                                            <p data-num={item.MusicID} >{item.MusicName}</p>
                                            <p data-num={item.MusicID} >{item.Singer}</p>
                                        </div>
                                        <p class="ms-auto" data-num={item.MusicID} >{item.MusicTime}</p>
                                    </div>
                                    <div class="col-2 jce">
                                        <button type="button" class="btn add-icon" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img data-num={item.MusicID} className='add-icon' src="http://localhost:9000/icon/plus-solid 1.png" alt="" onClick={this.ClickAddMusic} />
                                        </button>


                                    </div>
                                </div>
                            ))}

                        </div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                            {this.state.allMusicList.map((item, index) => (
                                <div class="row myPlayList ListMusic alc mt-3" data-num={item.MusicID} data-idx={index} onClick={this.clickListMusic}>
                                    <div class="col-3" data-num={item.MusicID}>
                                        <img class="list-img" data-num={item.MusicID} data-idx={index} src={item.MusicImage} alt="" />
                                    </div>
                                    <div class="col-6  d-flex alc" data-num={item.MusicID} data-idx={index}>
                                        <div class="d-flex  flex-column  alc list-content" data-num={item.MusicID} data-idx={index}>
                                            <p data-num={item.MusicID} data-idx={index}>{item.MusicName}</p>
                                            <p data-num={item.MusicID} data-idx={index}>{item.Singer}</p>
                                        </div>
                                        <p class="ms-auto" data-num={item.MusicID} data-idx={index}>{item.MusicTime}</p>
                                    </div>
                                    <div class="col-2 jce">
                                        <button type="button" class="btn delete-icon" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                            <img data-num={item.MusicID} className='delete-icon' src="http://localhost:9000/icon/trash-can-solid 1.png" alt="" onClick={this.ClickDeleteMusic} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>


                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content modal-bg bg-dark">

                            <div class="modal-body text-center">
                                {this.state.MusicListText}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">確定</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content modal-bg bg-dark">
                            <div class="modal-body text-center">
                                {this.state.deleteMusicListText}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    //歌曲選單展開
    clickMenuBtn = () => {
        const menuBtn = document.getElementById('menuBtn')
        const menu = document.querySelector('.menu')
        const menuActive = document.querySelector('.menu-active')
        console.log(menuActive.src == 'http://localhost:9000/icon/right.png');
        if (menuActive.src == 'http://localhost:9000/icon/right.png' || menuActive.src == 'none') {
            menuActive.src = 'http://localhost:9000/icon/right.png'
            menuActive.src = 'http://localhost:9000/icon/left.png'
            menu.classList.remove('active')
        } else {
            menuActive.src = 'http://localhost:9000/icon/right.png'
            menu.classList.add('active')
        }

        // menuBtn.onclick = function () {
        //     const menuActive = document.querySelector('.menu-active')
        //     if (menuActive.src == 'http://localhost:9000/icon/left.png') {
        //         menuActive.src = 'http://localhost:9000/icon/right.png'
        //         menu.classList.add('active')

        //     } else {
        //         menuActive.src = 'http://localhost:9000/icon/left.png'
        //         menu.classList.remove('active')
        //     }
        // }

    }
    //音樂播放器上下縮放內容
    clickContentBtn = (e) => {
        const audio = document.querySelector('.audio')
        const menuBtn = document.getElementById('menuBtn')
        const menu = document.querySelector('.menu')
        const wrap = document.querySelector('.wrap')
        const blurWrap = document.querySelector('.blur-wrap')
        const MusicPlayerWrap = document.querySelector('.MusicPlayer-Wrap')
        if (e.target.getAttribute('id') == 'control') {
            menu.classList.remove('active')
            audio.classList.toggle("active")
            menuBtn.classList.toggle("d-block")
            wrap.classList.toggle('active')
            blurWrap.classList.toggle('active')
            MusicPlayerWrap.classList.toggle('h-100')
        } else {
            return
        }
    }
    //隨機播放
    clickRandom = () => {
        var newRandom = this.state.random
        if (newRandom) {
            newRandom = false

        } else {
            newRandom = true
        }
        this.setState({ play: this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
            this.state.play ? document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;' : document.querySelector('.rotate').style = 'animation-play-state: paused; '

        });
        this.setState({ random: newRandom })
    }

    //點擊播放歌單指定音樂
    clickListMusic = (e) => {

        if (e.target.getAttribute('data-num') == null || e.target.getAttribute('src') != null) {
            return
        } else {

            localStorage.removeItem('MusicIndex')

            const ListMusic = document.querySelectorAll('.ListMusic')
            const myPlayList = document.querySelectorAll('.myPlayList')

            ListMusic.forEach((item, index) => {
                item.classList.remove('active')
            })
            myPlayList.forEach((item, index) => {
                item.classList.remove('active')
            })
            this.audio.pause()
            this.state.MusicIndex = (e.target.getAttribute('data-num')) - 1
            this.url = `${this.state.musicData[this.state.MusicIndex].MusicMp3}`
            this.audio = new Audio(this.url);
            ListMusic[e.target.getAttribute('data-idx')].classList.add('active')
            document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;'
            //暫停播放icon
            // const isplayIcon = document.querySelector('.isplay')
            // isplayIcon.src = "http://localhost:9000/icon/pause-solid 1.png"
            this.setState({ play: this.state.play }, () => {
                this.state.play ? this.audio.play() : this.audio.pause();
                this.state.play ? document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;' : document.querySelector('.rotate').style = 'animation-play-state: paused; '

            });
            localStorage.setItem('MusicIndex', this.state.MusicIndex)

            this.audio.addEventListener('ended', () => this.nextMusic());
            this.setState({})
            //現播放哪首歌紫色active效果

            myPlayList[this.state.MusicIndex].classList.add('active')
        }
    }
    //--播放清單--
    //點擊播放指定音樂
    clickMusic = (e) => {

        // this.setState({ dataNum: e.target.getAttribute('data-num') })
        // console.log(this.state.dataNum);
        if (e.target.getAttribute('data-num') == null || e.target.getAttribute('src') != null) {
            return
        } else {
            localStorage.removeItem('MusicIndex')

            const myPlayList = document.querySelectorAll('.myPlayList')
            const ListMusic = document.querySelectorAll('.ListMusic')

            ListMusic.forEach((item, index) => {
                item.classList.remove('active')
            })
            myPlayList.forEach((item, index) => {
                item.classList.remove('active')
            })
            this.audio.pause()
            this.state.MusicIndex = e.target.getAttribute('data-num') - 1
            this.url = `${this.state.musicData[this.state.MusicIndex].MusicMp3}`
            this.audio = new Audio(this.url);
            // this.audio.play()
            console.log(this.url);
            myPlayList[e.target.getAttribute('data-num') - 1].classList.add('active')
            document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;'
            //暫停播放icon
            if (this.url == Object.values(this.state.musicData[this.state.MusicIndex])[8]) {
                //現播放哪首歌紫色active效果
                myPlayList[this.state.MusicIndex].classList.add('active')
                document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;'
            }
            // const isplayIcon = document.querySelector('.isplay')
            // isplayIcon.src = "http://localhost:9000/icon/pause-solid 1.png"
            this.setState({ play: this.state.play }, () => {
                this.state.play ? this.audio.play() : this.audio.pause();
                this.state.play ? document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;' : document.querySelector('.rotate').style = 'animation-play-state: paused; '

            });
            localStorage.setItem('MusicIndex', this.state.MusicIndex)

            // this.setState({ MusicIndex: 0 })
            this.audio.addEventListener('ended', () => this.nextMusic());
            this.setState({})


        }
    }
    //新增音樂到歌單
    ClickAddMusic = async (e) => {
        console.log(e.target.getAttribute('data-num'));//musicID
        if (e.target.getAttribute('class') !== 'add-icon') {
            return
        } else {
            this.state.MusicListID[0].MusicID = e.target.getAttribute('data-num')
            this.state.MusicListID[0].UserID = document.cookie
            this.setState({})
            console.log(this.state.MusicListID);
            let result = await Axios.post
                ("http://localhost:9000/MusicList/add", this.state.MusicListID)
                .then((response) => { // 成功後要做的事
                    console.log(response);
                    if (response.data.affectedRows === 1) {

                        this.setState({ MusicListText: '新增成功' })
                    } else {

                        console.log('已有重複歌曲');
                        this.setState({ MusicListText: '已有重複歌曲' })
                    }

                })
                .catch((error) => console.log(error))

            this.setState({})
            let allMusicList = await Axios.get(`http://localhost:9000/MusicList/${document.cookie == "" ? "" : document.cookie}`)

            this.setState({ allMusicList: allMusicList.data })
        }

    }
    //刪除歌單音樂
    ClickDeleteMusic = async (e) => {
        console.log(e.target.getAttribute('data-num'));//musicID
        this.state.MusicListID[0].MusicID = e.target.getAttribute('data-num')
        this.state.MusicListID[0].UserID = document.cookie
        this.setState({})
        console.log(this.state.MusicListID);
        let result = await Axios.post
            ("http://localhost:9000/MusicList/delete", this.state.MusicListID)
            .then(function (response) { // 成功後要做的事
                console.log(response);
                if (response.data.affectedRows === 1) {
                    this.setState({ deleteMusicListText: '刪除成功' })

                } else {
                    this.setState({ deleteMusicListText: '刪除失敗' })
                }
            })
            .catch((error) => console.log(error))
        this.setState({})
        let allMusicList = await Axios.get(`http://localhost:9000/MusicList/${document.cookie == "" ? "" : document.cookie}`)
        this.setState({ allMusicList: allMusicList.data })
    }

    //下一首
    nextMusic = () => {
        localStorage.removeItem('MusicIndex')

        if (this.state.random == true) {
            this.audio.pause()
            let NewIndex = Math.floor(Math.random() * (this.state.musicData.length - 1))
            // this.state.MusicIndex = Math.floor(Math.random() * (this.state.musicData.length - 1))
            localStorage.setItem('MusicIndex', NewIndex)
            this.setState({ MusicIndex: NewIndex })
            this.url = `${this.state.musicData[this.state.MusicIndex].MusicMp3}`
            this.audio = new Audio(this.url);
            this.audio.addEventListener('ended', () => this.nextMusic());
            // this.audio.play()
            this.setState({ play: this.state.play }, () => {
                this.state.play ? this.audio.play() : this.audio.pause();
                this.state.play ? document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;' : document.querySelector('.rotate').style = 'animation-play-state: paused; '

            });
            const myPlayList = document.querySelectorAll('.myPlayList')
            const ListMusic = document.querySelectorAll('.ListMusic')

            ListMusic.forEach((item, index) => {
                item.classList.remove('active')
            })
            myPlayList.forEach((item, index) => {
                item.classList.remove('active')
            })
            myPlayList[localStorage.getItem('MusicIndex')].classList.add('active')
            this.setState({})
            //現播放哪首歌紫色active效果
            // const myPlayList = document.querySelectorAll('.myPlayList')
            // const ListMusic = document.querySelectorAll('.ListMusic')

            // ListMusic.forEach((item, index) => {
            //     item.classList.remove('active')
            // })
            // myPlayList.forEach((item, index) => {
            //     item.classList.remove('active')
            // })
            // myPlayList[this.state.MusicIndex].classList.add('active')
        } else {
            this.audio.pause()
            if (Number(this.state.MusicIndex) + 1 >= this.state.musicData.length) {
                // this.state.MusicIndex = 0
                localStorage.setItem('MusicIndex', 0)
                this.setState({ MusicIndex: 0 })

            } else {
                let New = Number(this.state.MusicIndex) + 1
                localStorage.setItem('MusicIndex', New)

                this.setState({ MusicIndex: New })


            }
            this.setState({ play: this.state.play }, () => {
                this.state.play ? this.audio.play() : this.audio.pause();
                this.state.play ? document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;' : document.querySelector('.rotate').style = 'animation-play-state: paused; '

            });
            // localStorage.setItem('MusicIndex', this.state.MusicIndex)
            this.url = `${this.state.musicData[this.state.MusicIndex].MusicMp3}`
            this.audio = new Audio(this.url);
            this.audio.addEventListener('ended', () => this.nextMusic());
            this.setState({})
            //現播放哪首歌紫色active效果
            const myPlayList = document.querySelectorAll('.myPlayList')
            const ListMusic = document.querySelectorAll('.ListMusic')

            ListMusic.forEach((item, index) => {
                item.classList.remove('active')
            })
            myPlayList.forEach((item, index) => {
                item.classList.remove('active')
            })
            myPlayList[localStorage.getItem('MusicIndex')].classList.add('active')
        }

    }
    //上一首
    backMusic = () => {
        if (this.state.random == true) {
            this.audio.pause()
            // this.state.MusicIndex = Math.floor(Math.random() * (this.state.musicData.length - 1))
            let NewIndex = Math.floor(Math.random() * (this.state.musicData.length - 1))
            localStorage.setItem('MusicIndex', NewIndex)
            this.setState({ MusicIndex: NewIndex })
            this.url = `${this.state.musicData[this.state.MusicIndex].MusicMp3}`
            this.audio = new Audio(this.url);
            this.audio.addEventListener('ended', () => this.nextMusic());
            this.setState({ play: this.state.play }, () => {
                this.state.play ? this.audio.play() : this.audio.pause();
                this.state.play ? document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;' : document.querySelector('.rotate').style = 'animation-play-state: paused; '
            });
            const myPlayList = document.querySelectorAll('.myPlayList')
            const ListMusic = document.querySelectorAll('.ListMusic')

            ListMusic.forEach((item, index) => {
                item.classList.remove('active')
            })
            myPlayList.forEach((item, index) => {
                item.classList.remove('active')
            })
            myPlayList[localStorage.getItem('MusicIndex')].classList.add('active')
            this.setState({})
        } else {
            this.audio.pause()
            console.log(this.state.MusicIndex);
            if (Number(this.state.MusicIndex) - 1 < 0) {
                localStorage.setItem('MusicIndex', this.state.musicData.length - 1)

                this.setState({ MusicIndex: this.state.musicData.length - 1 })
            } else {
                // this.state.MusicIndex -= 1
                let New = Number(this.state.MusicIndex) - 1
                localStorage.setItem('MusicIndex', New)

                this.setState({ MusicIndex: New })
            }
            this.setState({ play: this.state.play }, () => {
                this.state.play ? this.audio.play() : this.audio.pause();
                this.state.play ? document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;' : document.querySelector('.rotate').style = 'animation-play-state: paused; '

            });

            this.url = `${this.state.musicData[this.state.MusicIndex].MusicMp3}`
            this.audio = new Audio(this.url);
            this.audio.addEventListener('ended', () => this.nextMusic());
            this.setState({})

            //現播放哪首歌紫色active效果
            const myPlayList = document.querySelectorAll('.myPlayList')
            const ListMusic = document.querySelectorAll('.ListMusic')

            ListMusic.forEach((item, index) => {
                item.classList.remove('active')
            })
            myPlayList.forEach((item, index) => {
                item.classList.remove('active')
            })
            myPlayList[localStorage.getItem('MusicIndex')].classList.add('active')
        }

    }
    //-------------測試 首頁點擊後 收到資料並播放-----------//
    Clicklog = () => {
        localStorage.setItem('MusicIndex', this.state.MusicIndex)

    }
    remove = () => {
        localStorage.removeItem('MusicIndex')
    }
    formatTime(time) {
        return `${Math.floor(time / 60).toString().padStart(2, '0')}:${Math.floor(time % 60) < 10 ? '0' : ''}${Math.floor(time % 60)}`
    }
    progressValue(currentTime, duration) {
        return currentTime / duration * 100
    }
    scrub = (e) => {
        const progress = document.querySelector('progress')
        console.log(e.nativeEvent.offsetX);
        const scrubTime = (e.nativeEvent.offsetX / progress.offsetWidth) * this.audio.duration;
        this.audio.currentTime = scrubTime
        this.setState({})
    }
    sound = () => {
        const inputVolume = document.getElementById('inputVolume')
        this.audio.volume = inputVolume.value
    }
    soundMute = () => {
        if (this.audio.muted === false) {
            this.audio.muted = true;
        } else {
            this.audio.muted = false;
        }
    }
}

export default MusicPlayer;
