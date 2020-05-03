/*
Werry, Kristi
823386935
Assignment #7
*/

import React from 'react';
import {
  Navbar, Nav, NavItem, NavDropdown,
  MenuItem, Glyphicon,
  Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';
import ProductAddNavItem from './ProductAddNavItem.jsx';

function NavBar() {
  return (
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand>My Company Inventory</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/#/products">
          <NavItem>Product List</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <ProductAddNavItem />
      </Nav>
    </Navbar>
  );
}

function Footer() {
  return (
    <small>
      <p className="text-center">
        Full source code available at this
        {' '}
        <a href="https://github.com/KristiWerry/CS648-Assignment6">
          GitHub repository
        </a>
      </p>
    </small>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Grid fluid>
        <Contents />
      </Grid>
      <Footer />
    </div>
  );
}