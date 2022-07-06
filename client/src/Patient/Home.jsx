import React from 'react';
import Header from './Header';
import Data from './Data';
import '../App.css';

function Home() {

  return (
    <div>
    <div className="App" id="home">
    <Header/>
      <Data />
    </div>
    </div>
  );
}


export default Home;
