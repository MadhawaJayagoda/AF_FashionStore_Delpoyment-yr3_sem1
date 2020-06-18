import React from 'react';
import '../App.css';
import { Navbar , Nav, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonContainer, ButtonProducts, ButtonWishlist, ButtonFeedback, ButtonProfile} from './CartNWishlist/Button'
import {NavLink, Link} from 'react-router-dom';

class nav extends React.Component {
  
  LogoutFn = () => {
    localStorage.clear();
    window.location.href = '/login'
  }

  myProfile = () => {
    window.location.href = "/profile/"+localStorage.getItem('uid');
}

  render() {
    if(localStorage.getItem('email')){
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand >Fashion Store</Navbar.Brand>
                <NavItem>
                    <Link to="/prdcts" className="nav-link text-light">Purchase</Link>
                </NavItem>
    
          <Navbar.Collapse className="collapse navbar-collapse">
            <Nav className="navbar-nav ml-auto">

                <NavLink to="/productsAndOrders">
                    <ButtonProducts>
                        <i className="fa fa-gift mr-sm-2" aria-hidden="true" />
                        Products and Order Management
                    </ButtonProducts>
                </NavLink>
              <Link to="/cart">
                  <ButtonContainer>
                      <i className="fas fa-cart-plus mr-2"/>
                      my cart
                  </ButtonContainer>
              </Link>

              <Link to="/wishlist">
                <ButtonWishlist>
                    <i className="fas fa-heart mr-2"/>
                    my wishlist
                </ButtonWishlist>
              </Link>

              <Link to="/feedback">
                <ButtonFeedback>
                    <i className="fas fa-comments mr-2"/>
                    Feedback
                </ButtonFeedback>
              </Link>

              <ButtonProfile onClick={ this.myProfile }><i className="fas fa-user mr-2"/>{localStorage.getItem('name')}</ButtonProfile>
              <Nav.Link onClick={ this.LogoutFn } >Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }else{
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand >Fashion Store</Navbar.Brand>
    
          <Navbar.Collapse className="collapse navbar-collapse">
            <Nav className="navbar-nav ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

  }
}

export default nav;
