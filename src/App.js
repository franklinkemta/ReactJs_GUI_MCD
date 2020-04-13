import React, { Component } from "react";

// Components
import Appbar from "./components/Appbar";
import ModelContainer from "./components/ModelContainer";
import InstanceContainer from "./components/InstanceContainer";

import { Container } from 'react-bootstrap';

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
          <Container>
            <ModelContainer />
            <InstanceContainer />
          </Container>
        </div>
      </Provider>
    );
  }

}


export default App;
