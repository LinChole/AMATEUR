import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MemberDonateIn from './MemberDonateIn';
import MemberDonateOut from './MemberDonateOut';
import { NavLink } from 'react-router-dom';

class MemberDonate extends Component {
  state = {}
  render() {
    return (
      <BrowserRouter>
        <div className="d-flex justify-content-between align-items-end mb-md-10">
          <h2 className="fs-2 fw-bold">抖內資訊</h2>
          <div className="dropdown">
            <button className="btn btn-dark-gray dropdown-toggle px-6" type="button" data-bs-toggle="dropdown">
              抖內清單
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li className="dropdown-item">
                <NavLink className="text-white" to={`/member/donate/${this.props.match.params.id}/in`}>被贊助清單</NavLink>
              </li>
              <li className="dropdown-item">
                <NavLink className="text-white" to={`/member/donate/${this.props.match.params.id}/out`}>已贊助清單</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Switch>
          <Route path="/member/donate/:id" component={MemberDonateIn} exact/>
          <Route path="/member/donate/:id/in" component={MemberDonateIn} />
          <Route path="/member/donate/:id/out" component={MemberDonateOut} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default MemberDonate;