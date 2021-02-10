import React from 'react';
import Home from './pages/Home';
import Shifr from './pages/Shifr';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <Home />} />
      <Route path="/Shifr" component={Shifr} />
    </div>
  );
}

export default App;
