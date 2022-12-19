import React, { Component } from 'react';
import MusicID1 from '../Music/老王樂團-我還年輕 我還年輕.mp3'
class header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            musicData: [
                { music: '../Music/麋先生 MIXER [ 長成什麼樣子算愛情 Love, Loved, Loving ] Official Music Video.mp3' }
            ]
        }
        this.audioRef = React.createRef();

    }

    render() {
        return (
            <div>
                <h1>123</h1>
                <p>headerheaderheaderheader</p>
                <audio controls src={MusicID1} ref={this.audioRef} />

            </div>
        );
    }
}

export default header;




