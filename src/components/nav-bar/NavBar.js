import React, { PureComponent } from 'react';

class NavBar extends PureComponent {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="/">Card Memory Game using React</a>
      </nav>
    );
  }
}

export default NavBar;
