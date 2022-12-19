import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ContestSignUp from './components/ContestSignUp';
import MusicPlayer from './components/MusicPlayer';
import Navigation from './components/Navigation';
import login from './components/Login';
import signup from './components/Register';
import Index from './components/Index';
import ContestVote from "./components/ContestVote";
import Contest from "./components/ContestIndex";
import ContestResult from "./components/ContestResult";
import Channel from './components/Channel';
import Album from './components/Album';
import Blog from './components/Blog';
import SearchPageSinger from './components/SearchPageSinger';
import SearchPage from './components/SearchPage';
import SearchPage2 from './components/SearchPage2';
import SearchPage3 from './components/SearchPage3';
import SearchPage4 from './components/SearchPage4';
import SearchPage5 from './components/SearchPage5';
import SearchPage6 from './components/SearchPage6';
import Error from './components/Error';
import Member from './components/Member';
import NewArticle from './components/NewArticle';
import EditArticle from './components/EditArticle';
import Concert from './components/Concert';


class App extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log('app.js的' + prevProps.MusicIndex);
  }
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <div className="wrap">

          <Switch >
            <Route path="/" component={Index} exact />&ensp;&ensp;
            <Route path="/music" component={MusicPlayer} />&ensp;&ensp;
            <Route path="/login" component={login} />&ensp;&ensp;
            <Route path="/register" component={signup} />&ensp;&ensp;
            <Route path="/contestvote" component={ContestVote} />&ensp;&ensp;
            <Route path="/contest" component={Contest} />&ensp;&ensp;
            <Route path="/contestresult" component={ContestResult} />&ensp;&ensp;
            <Route path="/ContestSignUp" component={ContestSignUp} />&ensp;&ensp;


            <Route path="/channel/:id" component={Channel} />
            <Route path="/channelBlog/:id/blog/:id" component={Blog} />
            <Route path="/channelMusic/:id/AlbumMusic/:id" component={Album} />
            <Route path="/searchSinger/:id" component={SearchPageSinger} />
            <Route path="/search/情歌" component={SearchPage} />
            <Route path="/search/推薦" component={SearchPage2} />
            <Route path="/search/搖滾" component={SearchPage3} />
            <Route path="/search/Funk" component={SearchPage4} />
            <Route path="/search/重金屬" component={SearchPage5} />
            <Route path="/search/R&B" component={SearchPage6} />
            <Route path="/member/:id" component={Member} />

            <Route path="/newarticle/:id" component={NewArticle} />
            <Route path="/editarticle/:id" component={EditArticle} />
            <Route path="/concert" component={Concert} exact />
            <Route component={Error} />
          </Switch>
        </div>
        <MusicPlayer ></MusicPlayer>

      </BrowserRouter>

    );
  }
}

export default App;