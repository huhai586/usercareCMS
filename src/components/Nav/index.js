import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import style from './style.less';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, hashHistory, RouterContext } from 'react-router';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  routeTo(path) {
    hashHistory.push(path);
  },
  isActive(path) {
    return this.context.router.isActive(path);
  },
  render() {
    return (
      <Navbar className={classnames(style.nav, 'clearfix')}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#" onClick={this.routeTo.bind(null, '/')}>General Management</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Nav>

          <NavItem eventKey={1} href="javascript:;"
                   className={this.isActive('/regions')?'active':''}
                   onClick={this.routeTo.bind(null, '/regions')}>regions</NavItem>
          <NavItem eventKey={2} href="javascript:;"
                   className={this.isActive('/models')?'active':''}
                   onClick={this.routeTo.bind(null, '/models')}>models</NavItem>
            <NavItem eventKey={3} href="javascript:;"
                     className={this.isActive('/labels')?'active':''}
                     onClick={this.routeTo.bind(null, '/labels')}>labels</NavItem>
          <NavItem eventKey={4} href="javascript:;"
                   className={this.isActive('/faqs')?'active':''}
                   onClick={this.routeTo.bind(null, '/faqs')}>FAQ</NavItem>




        </Nav>
      </Navbar>
    );
  }
});
