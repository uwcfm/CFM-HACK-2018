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
                <NavLink tag={Link} to='/submission/team-one'>Team 1</NavLink>
                <NavLink tag={Link} to='/submission/team-two'>Team 2</NavLink>
                <NavLink tag={Link} to='/submission/team-three'>Team 3</NavLink>
                <NavLink tag={Link} to='/submission/team-four'>Team 4</NavLink>
                <NavLink tag={Link} to='/submission/team-five'>Team 5</NavLink>
                <NavLink tag={Link} to='/submission/team-six'>Team 6</NavLink>
                <NavLink tag={Link} to='/submission/team-seven'>Team 7</NavLink>
                <NavLink tag={Link} to='/submission/team-eight'>Team 8</NavLink>
                <NavLink tag={Link} to='/submission/team-nine'>Team 9</NavLink>
                <NavLink tag={Link} to='/submission/team-ten'>Team 10</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </div>
  );
  }
}
export default NavBar;
