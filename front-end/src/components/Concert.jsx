import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ConcertContent from './ConcertContent';
import ConcertCart from './ConcertCart';

class Concert extends Component {
  state = {
    ticketList: [{}]
  }
  render() {
    return (
      <BrowserRouter>
        <main>
          <div>
            <img className="rounded-16" src="/images/bg-concert.png" alt="演唱會宣傳圖片" />
          </div>
          <ConcertContent/>
          <section className="container pb-md-20">
              <Switch>
                <Route path="/concert/:id" component={ConcertCart}/>
              </Switch>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

export default Concert;