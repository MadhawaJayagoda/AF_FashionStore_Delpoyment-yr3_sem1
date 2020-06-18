import React, {Component} from 'react';
import ProductDisplay from "./products/ProductDisplay";
import OrderDisplay from "./orders/OrderDisplay";

class OrderNProductsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchDisplay : {
                products: true,
                orders : false
            }
        };
        this.handleOnClickOrdersSwitch = this.handleOnClickOrdersSwitch.bind(this);
        this.handleOnClickProductsSwitch = this.handleOnClickProductsSwitch.bind(this);
    }

    handleOnClickProductsSwitch = () => {
        this.setState({
            switchDisplay : {
                products: true,
                orders : false
            }
        })
    };

    handleOnClickOrdersSwitch = () => {
        this.setState({
            switchDisplay : {
                products: false,
                orders : true
            }
        })
    };

    render() {
        return (
            <div>
                <div className="jumbotron custom">
                <span>
                <h1 className="text-center font-weight-bold">
                  Online Fashion Store
                </h1>
                </span>
                    <br/>
                    <br/>
                    <span>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="collapse navbar-collapse">
                          <ul className="navbar-nav mt-2 mt-lg-0">
                              <li className="nav-item active">
                                <button type="button" className="btn btn-outline-secondary mx-2" style={{width:"8rem", color:"#DCDCDC"}} onClick={this.handleOnClickProductsSwitch}>Products</button>
                              </li>
                              <li className="nav-item active mx-3">
                                <button type="button" className="btn btn-outline-secondary" style={{width:"8rem", color:"#DCDCDC"}} onClick={this.handleOnClickOrdersSwitch}>Orders</button>
                              </li>
                          </ul>
                        </div>
                    </nav>
                </span>
                </div>
                <br/>
                <div>
                    <div className="card mainBody">
                        { this.state.switchDisplay.products ? <ProductDisplay /> :
                            this.state.switchDisplay.orders ? <OrderDisplay /> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderNProductsHome;