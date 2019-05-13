import React, { useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

import ModalSignup from './ModalSignup';
import TelegramLogin from './TelegramLoginWidget';

import { logOut, isRegistered } from '../helpers/guardian';
import { signin } from '../helpers/fetcher';

function AppNavbar({ history }) {
  const [isSigninOpen, setSigninOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  function toggleNavbar() {
    setIsNavbarOpen(!isNavbarOpen);
  }

  function afterAuth({ registered }) {
    if (registered) {
      history.push('/home');
      return;
    }

    setSigninOpen(true);
  }

  function onAuth(user) {
    signin(user)
      .then(payload => afterAuth(payload))
      .catch(reject => console.error(reject)); // TODO: show toast
  }

  function createPost() {
    if (!isRegistered()) return <div />;

    return (
      <NavItem>
        <NavLink tag={Link} to='/post'>
          Create request
        </NavLink>
      </NavItem>
    );
  }

  function logInOut() {
    if (isRegistered()) {
      return (
        <NavItem>
          <NavLink onClick={logOut} tag={Link} to='/'>
            Log out
          </NavLink>
        </NavItem>
      );
    }

    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Log in
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>Select a service to log in</DropdownItem>
          <TelegramLogin className='container' botName='wimp_web_test_bot' onAuth={onAuth} />
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  return (
    <div>
      <div>
        <ModalSignup isOpen={isSigninOpen} handleOpen={setSigninOpen} />
      </div>
      <Navbar color='light' light expand='md'>
        <NavbarBrand tag={Link} to='/'>
          WIMP
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isNavbarOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to='/'>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/list'>
                List
              </NavLink>
            </NavItem>
            {createPost()}
            <NavItem>
              <NavLink tag={Link} to='/help'>
                Help
              </NavLink>
            </NavItem>
            {logInOut()}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

AppNavbar.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(AppNavbar);
