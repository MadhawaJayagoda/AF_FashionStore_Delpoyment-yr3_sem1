import React, { Component } from 'react'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/user/login';
import Register from './components/user/register';
import Nav from './components/navbar';
import Order from './components/order';
import Users from './components/user/users';
import userProfile from "./components/user/userProfile";

import Cart from './components/CartNWishlist/Cart/Cart'
import Wishlist from './components/CartNWishlist/Wishlist/Wishlist'
import Payment from './components/CartNWishlist/Cart/Payment'
import Default from './components/CartNWishlist/Default'
import Details from './components/CartNWishlist/Details'
import ProductList from './components/CartNWishlist/ProductList'
import Modal from './components/CartNWishlist/Modal'
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import OrderNProductsHome from "./components/ordersAndProductsManagement/OrderNProductsHome";
import Feedback from './components/feedback/Feedback';
import FeedbackList from './components/feedback/FeedbackList';

class App extends Component {

  render () {
      if (localStorage.getItem('email')) {
          return (
              <React.Fragment>

                  <Router>
                      <div>
                          <Nav/>
                          <Switch>
                              <Route exact path="/" component={Order}></Route>
                              <Route path="/users" component={Users}></Route>
                              <Route path="/profile/:id" component={userProfile}></Route>

                              <Route path="/prdcts" component={ProductList}/>
                              <Route path="/details" component={Details}/>
                              <Route path='/productsAndOrders' component={OrderNProductsHome}/>
                              <Route path="/cart" component={Cart}/>
                              <Route path="/payment" component={Payment}/>
                              <Route path="/wishlist" component={Wishlist}/>
                              <Route path="/feedback" component={FeedbackList}/>
                              <Route path="/comment/:id" component={Feedback}/>

                              <Cart></Cart>
                              <Default></Default>


                          </Switch>
                          <Modal/>
                      </div>
                  </Router>
              </React.Fragment>
          );
      } else {
          return (
              <React.Fragment>

                  <Router>
                      <div className="App">
                          <Nav/>
                          <Switch>
                              <Route exact path="/login" component={Login}></Route>
                              <Route path="/register" component={Register}></Route>
                          </Switch>
                      </div>
                  </Router>
              </React.Fragment>

          );
      }
  }
}

export default App;
