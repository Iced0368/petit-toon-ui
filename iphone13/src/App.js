import React from 'react';
import Header from './screen/Header';
import CenterPage from './screen/CenterPage';
import { DisLike, Like, Comment, Subscribe, Setting } from './Buttons/BottomButton';

import './App.css';

const App = () => {
  return (
    <div className="container">
      <div className="item">
        <Header />
      </div>
      <div className="item">
        <CenterPage />
      </div>
      <div name="bottomBar" className="item">
        <DisLike />
        <Like />
        <Comment />
        <Subscribe />
        <Setting />
      </div>
    </div>
  );
};

export default App;