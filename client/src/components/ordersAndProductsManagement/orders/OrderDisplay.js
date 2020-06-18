import React, {Component} from 'react';
import OrderItem from './OrderItem';
import OrderInputPanel from "./OrderInputPanel";
import ViewOrderPanel from "./ViewOrderPanel";
import 'react-responsive-modal/styles.css';
import { Tick } from 'react-crude-animated-tick';
import { Modal } from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class OrderDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            orderUpdateDisplay:{},
            currentOrder:{
                order_productName: "",
                order_type : "",
                partyName : "",
                order_productCategory : "",
                productUnitPrice : 0,
                order_quantity : 0,
                order_discount : 0,
                order_paymentStatus : "",
                order_description : ""
            },
            addNewOrder : true,
            viewOrder : false,
            openModal: false,
            openAlert : false
        };

        this.callAPIGetAllOrders = this.callAPIGetAllOrders.bind(this);
        /*this.handleOnClickButton = this.handleOnClickButton.bind(this);*/
        this.handleFormChange = this.handleFormChange.bind(this);
        this.isNumber = this.isNumber.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.switchTabAddOrder = this.switchTabAddOrder.bind(this);
        this.switchTabViewOrders = this.switchTabViewOrders.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.updateOrderAPICal = this.updateOrderAPICal.bind(this);
        this.handleClickAlertOpen = this.handleClickAlertOpen.bind(this);
        this.handleClickAlertClose = this.handleClickAlertClose.bind(this);
    }

    async callAPIGetAllOrders(){
        const url = "/order";
        await fetch(url).then( res => res.json()).then(data => { this.setState({ orders: data })}).catch( err => {
            console.log({ Err_message: err})});
    };
    componentWillMount() {
        this.callAPIGetAllOrders();
    };

    handleFormChange = (e) => {
        e.preventDefault();
        let formValues = {...this.state.currentOrder};
        let att_name = e.target.name;
        let value = e.target.value;

        formValues[att_name] = value;

        this.setState({
            currentOrder : formValues
        });

        console.log("Form update values : ", formValues );
    };

    isNumber(val){
        let verifyNumb;
        if(Number(val) === val && val % 1 === 0 ){
            verifyNumb = true;
        }else if(Number(val) === val && val % 1 !== 0){
            verifyNumb = true;
        }else{
            verifyNumb = false;
        }
        return verifyNumb;
    }

    onOpenModal = () => {
    this.setState({openModal: true});
    };

    onCloseModal = () => {
    this.setState({openModal: false});
    };

    async addOrder(e){
        e.preventDefault();
        let newOrder = this.state.currentOrder;
        console.log(newOrder);
        if(newOrder !== "" && newOrder.order_productName !== '' && newOrder.partyName !== '' && newOrder.order_paymentStatus !== '' &&
         newOrder.order_type !== '' && newOrder.order_productCategory !== ''){
            if(this.isNumber(Number(newOrder.productUnitPrice)) && this.isNumber(Number(newOrder.order_quantity)) &&
                this.isNumber(Number(newOrder.order_discount)) && newOrder.productUnitPrice > 0 && newOrder.order_quantity > 0){
                const url = "/order";
                const requestOptions = {
                    method : 'POST',
                    headers : { 'Content-Type': 'application/json' },
                    body : JSON.stringify(newOrder)
                };
                await fetch(url, requestOptions).then(res => res.json()).then( data => {
                    console.log(data)}).catch( err => {
                    console.log({ Err_message : err})} );
                this.callAPIGetAllOrders();
                this.onOpenModal();
                this.setState({
                    currentOrder:{
                        order_productName: "",
                        order_type : "",
                        partyName : "",
                        order_productCategory : "",
                        productUnitPrice : 0,
                        order_quantity : 0,
                        order_discount : 0,
                        order_paymentStatus : "",
                        order_description : ""
                    }
                });
            }else{
                this.handleClickAlertOpen();
                alert("Invalid input of quantity or unit price or discount, Please check again ! ");
            }
        }else{
            this.handleClickAlertOpen();
        }
        //console.log("Add order finished, clear fields");
    };

    async deleteOrder(orderId){
        console.log(orderId);
        orderId = orderId.toString();
        const url = "/order/"+ orderId;
        const requestOptions = {
            method : 'DELETE'
        };
        await fetch(url, requestOptions)
            .then(res => res.json())
            .then( data => {
                console.log(data)
            })
            .catch( err => {
                console.log({ Err_message : err})}
            );
        this.callAPIGetAllOrders();
    }

    updateOrder(orderId, property, value){
        console.log("All orders :", this.state.orders);
        console.log("update order : ", orderId, "Property : ", property, "Value : ", value );
        let orders = [...this.state.orders];
        let updateOrderItem = orders.filter( order => {
            return order._id == orderId;
        });
        console.log("Updating order object : ", updateOrderItem);

        updateOrderItem[property] = value;
        console.log("Updated order object ,, updateOrderItem:", updateOrderItem[0]);

        orders.find( item => {
            if( item._id == orderId){
                item[property] = value;
            }
        });
        this.setState({
            orders : orders,
            orderUpdateDisplay : updateOrderItem[0]
        });
    }

    async updateOrderAPICal(orderId){
        console.log("Update API call", this.state.orderUpdateDisplay);
        let updatedOrder = this.state.orderUpdateDisplay;
        if(this.state.orderUpdateDisplay !== "" && this.state.orderUpdateDisplay !== null){
            const url = "/order/" + orderId;
            const requestOptions = {
                method : 'PUT',
                headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify(updatedOrder)
            };
            await fetch(url, requestOptions)
                .then(res => res.json())
                .then( data => {
                    console.log(data)
                })
                .catch( err => {
                    console.log( err)}
                );
            alert("Order details updated successfully ....!");
            this.callAPIGetAllOrders();
        }
    }

    switchTabAddOrder(){
        this.setState({
            addNewOrder : true,
            viewOrder : false
        });
    }
    switchTabViewOrders(){
        this.setState({
            viewOrder : true,
            addNewOrder : false
        });
    }

    handleClickAlertOpen = () => {
        this.setState({
            openAlert : true
        });
    };

    handleClickAlertClose = () => {
        this.setState({
            openAlert : false
        });
    };

    render(){
        return (
            <div className="card">
                <div className="card-header text-center">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <button className="btn btn-info" onClick={this.switchTabAddOrder}>Add new order</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-info" onClick={this.switchTabViewOrders} style={{marginLeft: "5px"}}>View Orders</button>
                        </li>
                    </ul>
                </div>
                { this.state.addNewOrder ?
                    <OrderInputPanel orderProductName={this.state.currentOrder.order_productName}
                                     orderType={this.state.currentOrder.order_type}
                                     orderPartyName={this.state.currentOrder.partyName}
                                     orderProductCategory={this.state.currentOrder.order_productCategory}
                                     orderProductUnitPrice={this.state.currentOrder.productUnitPrice}
                                     orderQuantity={this.state.currentOrder.order_quantity}
                                     orderDiscountAllowed={this.state.currentOrder.order_discount}
                                     orderPaymentStatus={this.state.currentOrder.order_paymentStatus}
                                     orderDescription={this.state.currentOrder.order_description}
                                     onFormSubmit={this.addOrder}
                                     onChangeForm={this.handleFormChange}
                    /> : <ViewOrderPanel allOrders={this.state.orders}
                                         onClickDelete={this.deleteOrder}
                                         onUpdateValues={this.updateOrder}
                                         onClickUpdateAPICAll = {this.updateOrderAPICal}   />}

                <OrderItem />
                <Modal open={this.state.openModal} onClose={this.onCloseModal} center>
                    <div className="custom-ui">
                        <div className="d-flex justify-content-center">
                            <Tick size={100} />
                        </div>
                        <h1> Thank you </h1>
                        <div>
                            <p>  Order added to the Database successfully </p>
                        </div>
                        <span className="row d-flex justify-content-center">
                            <button onClick={this.onCloseModal} className="mt-3 btn btn-success w-25">Okay</button>
                        </span>
                    </div>
                </Modal>
                <Dialog
                    open={this.state.openAlert}
                    onClose={this.handleClickAlertClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <div className="row d-flex justify-content-center my-3">
                            <i className="fa fa-exclamation-triangle text-warning" style={{fontSize: "7rem"}} aria-hidden="true" />
                        </div>
                        <h3> Invalid input or Multiple empty fields </h3>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This Error is caused due to either multiple empty fields or invalid input data types. Please check again !
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClickAlertClose} color="primary">
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default OrderDisplay;