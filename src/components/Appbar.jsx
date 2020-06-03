import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class Appbar extends Component {
  render () {
    return (
      <div>
        <Navbar fixed="top" sticky="top" bg="dark" variant="dark">
          <Navbar.Brand href="#">REACT MCD GUI</Navbar.Brand>
          <Navbar.Text className="ml-auto">
            Github : <a href="https://github.com/franklinkemta/ReactJs_GUI_MCD" target="_blank" rel="noopener noreferrer">Fanklin Kemta</a>
          </Navbar.Text>
        </Navbar>
      </div>
    );
  }
}
