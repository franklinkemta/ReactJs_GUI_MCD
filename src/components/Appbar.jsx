import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class Appbar extends Component {
  render () {
    return (
      <div>
        <Navbar fixed="bottom" sticky="bottom" bg="dark" variant="dark">
          <Navbar.Brand href="#">REACT MCD GUI</Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}