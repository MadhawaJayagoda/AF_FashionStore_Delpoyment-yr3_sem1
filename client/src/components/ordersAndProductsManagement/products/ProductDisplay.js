import React, {Component} from 'react';
import ProductItem from "./ProductItem";
import './ProductDisplay.css';
import ProductDeck from "./ProductDeck.js";
import { Tick } from 'react-crude-animated-tick';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

class ProductDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : [],
            currentProduct : {
                productName: "",
                productBrand: "",
                productDescription: "",
                product_category: "",
                product_unitprice: 0,
                product_discount: 0,
                supplier_name: "",
                product_expirationDate: "",
                product_expirationStatus: "",
                product_averageRating : 0
            },
            searchProductsByBrand : "",
            category : "",
            sort : "",
            modalForm : {
                product_name : "",
                product_brand : "",
                product_description : "",
                product_category : "",
                product_unitprice : 0,
                product_discount : 0,
                product_supplierName : "",
            },
            modalOpen : false,
            alertDialogOpen : false
        };
        this.callAPI = this.callAPI.bind(this);
        this.reOrderArray = this.reOrderArray.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleOnClickSearch = this.handleOnClickSearch.bind(this);
        this.handleOnClickCategory = this.handleOnClickCategory.bind(this);
        this.handleOnClickSort = this.handleOnClickSort.bind(this);
        this.handleOnClickProductDelete = this.handleOnClickProductDelete.bind(this);
        this.handleClickAlertOpen = this.handleClickAlertOpen.bind(this);
        this.handleClickAlertClose = this.handleClickAlertClose.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.isNumber = this.isNumber.bind(this);
        this.successfulSubmit = this.successfulSubmit.bind(this);
        this.handleModalButtonAction = this.handleModalButtonAction.bind(this);
        this.handleModalInputChange = this.handleModalInputChange.bind(this);
        this.handleModalFormSubmit = this.handleModalFormSubmit.bind(this);
    }

    async callAPI(){
        console.log("API call sent to the Server");
        const url = "/product";
        await fetch(url).then( res => res.json()).then( res => this.setState({ products : res }))
        .catch( err => {
            console.log(err)});
        this.setState({
            sort: "All Products",
            category : ""
        });
    }
    componentWillMount() {
        this.callAPI();
    }

    reOrderArray = () => {

        let allProducts = [...this.state.products];
        let i, j, accum = [];
        let chunkSize = 3;

        for (i=0,j=allProducts.length; i<j; i+=chunkSize) {
            accum = [...accum, allProducts.slice(i,i+chunkSize)];
        }

        return accum;
    };

    handleSearchInput(e){
        e.preventDefault();
        this.setState({
            searchProductsByBrand : e.target.value
        })
    }

    async handleOnClickSearch(e){
        //console.log(this.state.searchProductsByBrand);
        const brandName = this.state.searchProductsByBrand;
        console.log("brand name :", brandName);
        const url = "/product/brand/" + brandName.toString();
        await fetch(url).then( res => res.json()).then( data => {
            this.setState({
                products : data
            });
            console.log("Data", data)
        }).catch( err => {
            console.log({ Err_message : err})
        });
        //console.log(this.state.searchProductsByBrand);
        if( brandName.length === 1 && brandName.match(/[a-z]/i) && e.keyCode === 13){
            this.callAPI();
        }
    };

    async handleOnClickCategory(e){
        console.log(" onClick category : ", e.target.name, e.target.value);
        const { value } = e.target;
        this.setState({ category : value, sort : ""});
        let url = "/product/category/" + value;

        await fetch(url).then( res => res.json()).then( data => { this.setState({ products: data })}).catch(err => {
            console.log({Err_message : err})});
    }

    async handleOnClickSort(e){
        console.log("onClick Sort : ", e.target.name, e.target.value);
        const { value } = e.target;
        this.setState({ sort : value, category : ""});
        let url = "/product/sort/" + value;

        await fetch(url).then( res => res.json()).then( data => { this.setState({ products: data })}).catch(err => {
            console.log({Err_message : err})});
    }

    async handleOnClickProductDelete(productId){
        console.log("Product delete :" , productId);
        productId = productId.toString();
        const url = "/product/"+ productId;
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
        this.handleClickAlertClose();
        this.callAPI();
    }

    onOpenModal = () => {
        this.setState({ modalOpen: true });
    };

    onCloseModal = () => {
        this.setState({ modalOpen: false });
    };

    handleModalButtonAction = () => {
        console.log("Modal submit button clicked")
    };
    handleModalInputChange(e){
        let formValues = this.state.modalForm;
        formValues[e.target.name] = e.target.value;
        this.setState({
            modalForm: formValues
        })
    }

    isNumber = (val) => {
        let verifyNumb;
        if(Number(val) === val && val % 1 === 0 ){
            verifyNumb = true;
        }else if(Number(val) === val && val % 1 !== 0){
            verifyNumb = true;
        }else{
            verifyNumb = false;
        }
        return verifyNumb;
    };

    async handleModalFormSubmit(e){
        console.log("Modal Form submitted .......!!!");

        e.preventDefault();
        let modalForm = this.state.modalForm;
        if (modalForm !== "" && modalForm.product_name !== '' && modalForm.product_supplierName !== '' && modalForm.product_category !== '' &&
         modalForm.product_brand !== '') {
            //Validation of the Input Values
            if (this.isNumber(Number(modalForm.product_unitprice)) == true && this.isNumber(Number(modalForm.product_discount == true)) &&
                modalForm.product_unitprice > 0 ) {
                const url = "/product";
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(modalForm)
                };
                await fetch(url, requestOptions).then(res => res.json()).then(data => {
                    console.log(data)
                })
                    .catch(err => {
                        console.log({Err_message: err})
                    });
                this.successfulSubmit();
                this.setState({
                    modalForm: {
                        product_name: "",
                        product_brand: "",
                        product_description: "",
                        product_category: "",
                        product_unitprice: 0,
                        product_discount: 0,
                        product_supplierName: "",
                    }
                });
                this.onCloseModal();
                this.callAPI();
            }else{
                alert("Invalid Input of Product Unit Price or Product Discount ,  Please retry !");
            }
        } else{
            alert('Invalid input, Please try again !');
        }
    }

    successfulSubmit = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <div className="row d-flex justify-content-center">
                            <Tick size={100} />
                        </div>
                        <br/>
                        <h1> Thank you </h1>
                        <div className="row d-flex justify-content-center">
                            <p>  Product: {this.state.modalForm.product_name } added to the Database successfully </p>
                            <button onClick={onClose} className="btn btn-success w-25">Okay</button>
                        </div>
                    </div>
                );
            }
        });
    };

    handleClickAlertOpen = () => {
        this.setState({
            alertDialogOpen : true
        });
    };

    handleClickAlertClose = () => {
        this.setState({
            alertDialogOpen : false
        });
    };

    render() {
        console.log("All products", this.state.products);
        let newArr = this.reOrderArray();
        console.log( "productDeckArr : ", newArr);
        let allProductDeck = newArr.map( (prod, index) => {
            console.log("prod :", prod);
            return <ProductDeck key={index} proDeckArr={prod} onClickDelete={this.handleOnClickProductDelete} alertOpen={this.handleClickAlertOpen}
                                alertClose={this.handleClickAlertClose} alertDialogOpen={this.state.alertDialogOpen} />
        });
        return (
            <div className="card-body">
                <div className="card text-center">
                    <div className="card-header">
                        <div className="nav nav-pills card-header-pills ml-md-auto">
                            <form className="form-inline my-2 my-lg-0 mx-2" onSubmit={this.handleOnClickSearch}>
                                <input className="form-control mr-sm-2 w-auto" type="search"
                                       value={this.state.searchProductsByBrand}  placeholder="Search by Brand name" aria-label="Search" onChange={this.handleSearchInput}
                                       onKeyDown={this.handleOnClickSearch} />
                                <button className="btn btn-outline-success my-2 my-sm-0 mr-3" type="submit">Search</button>
                            </form>
                            <div className="dropdownButtons mx-2 " style={{ position : "absolute", right: "2em"}}>
                                <div className="btn-group mx-2">
                                    <button type="button" className="navbarButtonFirstDropDown btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                        Category
                                    </button>
                                    <div className="dropdown-menu dropdown-menu">
                                        <button className="dropdown-item" type="button" value="Apparels" onClick={this.handleOnClickCategory} > Apparels </button>
                                        <button className="dropdown-item" type="button" value="Accessories" onClick={this.handleOnClickCategory} > Accessories </button>
                                        <button className="dropdown-item" type="button" value="Cosmetics" onClick={this.handleOnClickCategory} >  Cosmetics </button>
                                        <button className="dropdown-item" type="button" value="Footwear" onClick={this.handleOnClickCategory} >  Footwear </button>
                                        <button className="dropdown-item" type="button" value="Sportswear" onClick={this.handleOnClickCategory} >  Sportswear </button>
                                    </div>
                                </div>
                                <div className="btn-group ml-3">
                                    <button type="button" className="navbarButtonSecondDropDown btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                        Sort
                                    </button>
                                    <div className="dropdown-menu dropdown-menu">
                                        <button className="dropdown-item" type="button" onClick={this.callAPI}> All Products</button>
                                        <button className="dropdown-item" type="button" value="latest" onClick={this.handleOnClickSort} > Latest </button>
                                        <button className="dropdown-item" type="button" value="rating" onClick={this.handleOnClickSort} > Rating </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div>
                    <span className="badge badge-pill badge-warning w-25">{ this.state.searchProductsByBrand !== "" ? this.state.searchProductsByBrand :
                        this.state.category !== "" ? this.state.category : this.state.sort !== "" ? this.state.sort : "All Products"} </span>
                </div>
                <br/>
                <div className="card-body mt-2">
                    {allProductDeck}
                    <div className="my-5 mx-5">
                        <button className="addProduct" onClick={this.onOpenModal}> + </button>
                        <Modal open={this.state.modalOpen} onClose={this.onCloseModal} styles={{ overlay : { background: "rgba(0,0,0,0.8)"}}} center>
                            <div className="card text-center">
                                <div className="card-header">
                                    <h5 className="card-title"> Add New Product Item</h5>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group row">
                                            <label
                                                className="col-sm-2 col-form-label"> Product Name </label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" name="product_name" value={this.state.modalForm.product_name}
                                                       onChange={this.handleModalInputChange} placeholder="Product Name " />
                                            </div>
                                            <label
                                                className="col-sm-2 col-form-label"> Product Brand </label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" name="product_brand" value={this.state.modalForm.product_brand}
                                                       onChange={this.handleModalInputChange} placeholder="Product Brand " />
                                            </div>
                                            <label
                                                className="col-sm-2 col-form-label"> Product Description </label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" name="product_description" value={this.state.modalForm.product_description}
                                                       onChange={this.handleModalInputChange} placeholder="Product Description " />
                                            </div>
                                            <label
                                                className="col-sm-2 col-form-label"> Product Category </label>
                                            <div className="col-sm-10">
                                                <select className="form-control form-control-sm" name="product_category" value={this.state.modalForm.product_category}
                                                        onChange={this.handleModalInputChange}>
                                                    <option hidden>Please select a Category </option>
                                                    <option>Apparel</option>
                                                    <option>Footwear</option>
                                                    <option>Accessories</option>
                                                    <option>Sportswear</option>
                                                    <option>Formal Wear</option>
                                                    <option>Watches & Jewelry</option>
                                                    <option>Cosmetics</option>
                                                </select>
                                            </div>
                                            <label
                                                className="col-sm-2 col-form-label"> Product unit price </label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" name="product_unitprice" value={this.state.modalForm.product_unitprice}
                                                       onChange={this.handleModalInputChange} placeholder="Product unit price" />
                                            </div>
                                            <label
                                                className="col-sm-2 col-form-label"> Product Discount percentage  </label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" name="product_discount" value={this.state.modalForm.product_discount}
                                                       onChange={this.handleModalInputChange} placeholder="Product Discount percentage " />
                                            </div>
                                            <label
                                                className="col-sm-2 col-form-label"> Product supplier name </label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" name="product_supplierName" value={this.state.modalForm.product_supplierName}
                                                       onChange={this.handleModalInputChange} placeholder="Product supplier name" />
                                            </div>
                                            <input className="btn btn-success w-25" style={{marginTop : "20px", marginLeft: "20rem"}} type="submit" value="Add Product" onClick={this.handleModalFormSubmit} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDisplay;