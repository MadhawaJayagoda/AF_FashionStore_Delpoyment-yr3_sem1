import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ProductItem extends Component {
    render() {

        let {productId, productName, productBrand, productAverageRating, productDiscount, productDescription, dateAdded, imgSrc,
            alertOpen, alertClose, alertDialogOpen} = this.props;
        dateAdded = new Date(dateAdded).toLocaleString();
        imgSrc = String(imgSrc);
        return (
            <div className="card">
                <img className="card-img-top" src={imgSrc}  alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{productName}</h5>
                    <p className="card-text">
                        <span><b> Average rating  : &nbsp; </b> {productAverageRating} </span><br />
                        <span><b> Brand : &nbsp; </b> {productBrand} </span><br />
                        <span><b> Discount : &nbsp;  {productDiscount}% </b></span><br />
                        <span><b> Product Description : &nbsp;  {productDescription} </b></span><br />
                    </p>
                    <p className="card-text"><small className="text-muted">Date added : {dateAdded}</small></p>
                </div>
                <button className="btn btn-danger" onClick={alertOpen}> <i className="fas fa-trash fa-lg" style={{}}/> </button>
                <Dialog
                    open={alertDialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={alertClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <div className="d-flex justify-content-center">
                        <DialogTitle id="alert-dialog-slide-title"> <i className="fa fa-trash text-danger" style={{fontSize:"5rem"}} aria-hidden="true" /> </DialogTitle>
                    </div>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to Permanently delete this item ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={alertClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.props.onClickDelete(productId)} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ProductItem;