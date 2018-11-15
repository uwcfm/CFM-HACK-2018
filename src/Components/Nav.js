import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class NavBar extends React.Component {
  render () {
    var numTeam = [];
    for(var i = 1; i < 11; i++) {
      numTeam.push(i);
    }
    const teamsNavLink = numTeam.map((num) => 
      <NavLink tag={Link} key={num} to={'/submission/team/'+num}>Team {num}</NavLink>
    )
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
              <DropdownItem>{teamsNavLink}</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </div>
  );
  }
}
export default NavBar;
