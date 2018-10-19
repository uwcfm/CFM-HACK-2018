import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavLink } from 'reactstrap';

class NavBar extends React.Component {
  render () {
    return(
      <div className='home-container'>
        <Nav pills>
          <NavLink tag={Link} to='/'>Home</NavLink>
          <NavLink tag={Link} to='/example'>Example</NavLink>
        </Nav>
      </div>
  );
  }
}
export default NavBar;
