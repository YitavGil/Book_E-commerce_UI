import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import {DataProvider} from './GlobalState';
import Header from "./comps/Header/Header";
import Pages from "./comps/MainPages/Pages";

function App() {
  
  return (
    <DataProvider>
      <Router>
        <div className="App">
        <Header />
        <Pages />
        </div>
    </Router>
    </DataProvider>
  );
}

export default App;
