import React, { Component } from "react";

// Components
import Appbar from "./components/Appbar";
import DesignContainer from "./components/DesignContainer";

// Add Redux Store
import { Provider } from "react-redux";
import store from "./store";

// Css
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Appbar />
          <DesignContainer />
        </div>
      </Provider>
    );
  }

}


export default App;
