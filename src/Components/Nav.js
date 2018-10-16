import React from 'react';
import { Nav, NavLink } from 'reactstrap';

class NavBar extends React.Component {
  render () {
    return(
      <div className='home-container'>
        <Nav pills>
          <NavLink href='/'>Home</NavLink>
          <NavLink href='/example'>Example</NavLink>
        </Nav>
      </div>
  );
  }
}
export default NavBar;
