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

import logo from '../../public/logo_nav.png';

import { logOut, isRegistered } from '../helpers/guardian';
import { signin } from '../helpers/fetcher';

import routes from '../constants/routes';
import translation from '../constants/translation';

function AppNavbar({ history }) {
  const [isSigninOpen, setSigninOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  function toggleNavbar() {
    setIsNavbarOpen(!isNavbarOpen);
  }

  function afterAuth({ registered }) {
    if (registered) {
      history.push(routes.home);
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
        <NavLink tag={Link} to={routes.post}>
          {translation.route.create}
        </NavLink>
      </NavItem>
    );
  }

  function logInOut() {
    if (isRegistered()) {
      return (
        <NavItem className='pl-4'>
          <NavLink onClick={logOut} tag={Link} to={routes.home}>
            {translation.profile.logout}
          </NavLink>
        </NavItem>
      );
    }

    return (
      <UncontrolledDropdown nav inNavbar className='pl-4'>
        <DropdownToggle nav caret>
          {translation.profile.login}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>{translation.profile.loginHint}</DropdownItem>
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
      <Navbar color='light' light expand='sm'>
        <NavbarBrand tag={Link} className='p-0' to={routes.home}>
          <img src={logo} className='responsive' height='auto' width='100%' alt='WIMP' />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isNavbarOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to={routes.home}>
                {translation.route.home}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={routes.list}>
                {translation.route.list}
              </NavLink>
            </NavItem>
            {createPost()}
            {/* <NavItem>
              <NavLink tag={Link} to={routes.help}>
                {translation.route.help}
              </NavLink>
            </NavItem> */}
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
