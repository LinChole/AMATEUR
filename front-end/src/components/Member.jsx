import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Axios from 'axios';

import MemberList from './MemberList';
import MemberAccount from './MemberAccount';
import MemberFollow from './MemberFollow';
import MemberData from './MemberData';
import MemberDonate from './MemberDonate';
import MemberTicket from './MemberTicket';
import MemberChannel from './MemberChannel';

class Member extends Component {
  state = {
    userInfo: [{}]
  }
  render() {
    return (
      <BrowserRouter>
        <main>
          <div className="container pt-md-30 pb-md-50">
            <div className="row align-items-stretch">
              <aside className="col-md-3 text-center">
                <MemberList />
              </aside>
              <section className="col-md-8 offset-md-1 bg-member py-8">
                <Switch>
                  <Route path="/member/:id" component={MemberAccount} exact/>
                  <Route path="/member/account/:id" component={MemberAccount} />
                  <Route path="/member/follow/:id" component={MemberFollow} />
                  <Route path="/member/data/:id" component={MemberData} />
                  <Route path="/member/donate/:id" component={MemberDonate} />
                  <Route path="/member/ticket/:id" component={MemberTicket} />
                  <Route path="/member/channel/:id" component={MemberChannel} />
                </Switch>
              </section>
            </div>
          </div>
        </main>
      </BrowserRouter>
    );
  }
  componentDidMount = async () => {
    let resultInfo = await Axios.get(`http://localhost:9000/user/${document.cookie}`);
    this.setState({userInfo: resultInfo.data});
  }
}

export default Member;