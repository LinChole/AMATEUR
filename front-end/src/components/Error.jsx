import React, { Component } from 'react';
class Error extends Component {
    state = {}
    render() {
        return (
            <div className='text-center' style={{ paddingTop: '200px' }}>
                <h1 className='text-muted'>查無此資料</h1>
            </div>
        );

    }
    componentDidMount = async () => {
        setTimeout(() =>
            window.location = "/"
            , 2000);
    }
}

export default Error;