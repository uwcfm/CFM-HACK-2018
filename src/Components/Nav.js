import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class NavBar extends React.Component {
  render () {
    return(
      <div className='home-container'>
        <Nav pills>
          <NavLink tag={Link} to='/'>Home</NavLink>
          <NavLink tag={Link} to='/example'>Example</NavLink>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Submission
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Team A
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </div>
  );
  }
}
export default NavBar;
