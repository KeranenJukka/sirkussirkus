
import React from 'react';
import {connect} from 'react-redux';

import cartPic from './pictures/shopping-cart.png';

import LogoFooter from './logofooter';
import SocialFooter from './socialfooter';


class ProductOptions extends React.Component {

    
constructor(props) {
    super(props);

    this.state = {
        picture: "",
        product: "",
        selected: "",
        price: "",
        quantity: "",
        pictures: ""
    }

}

handleChange = (arg) => {

var options = this.props.product.options.slice();
var selProduct;

for (var k in options) {
    if (options[k].id === arg.target.value) {
        selProduct = options[k];
    }
}

this.setState({
    selected: arg.target.value,
    price: selProduct.price
})


}

quantity = (arg) => {
    
if (arg.target.value === "+") {
    this.setState({
        quantity: this.state.quantity + 1
    })
}

if (arg.target.value === "-" && this.state.quantity !== 1) {
    this.setState({
        quantity: this.state.quantity - 1
    })
}

}

changePic = (arg) => {
    
if (arg.target.className === "small-product-pic") {
    
    this.setState({
       picture: arg.target.src 
    })

}

}

sendToStore = () => {
    
    var object = {
        product: this.state.product,
        quantity: this.state.quantity,
        selected: this.state.selected
    }

    this.props.addProduct(object);
}


componentDidMount () {

    window.scrollTo(0, 0);

    var pictures = this.props.product.pics.slice();

   
    pictures = pictures.map(function (x, change) {
        return (
            <img className="small-product-pic" src={x} alt="Product" key={x}></img>
        )
    })

    this.setState({
        product: this.props.product,
        selected: this.props.product.options[0].id,
        price: this.props.product.options[0].price,
        quantity: 1,
        picture: this.props.product.pic,
        pictures: pictures   
    })

}



render () {

var product = this.props.product;    

var options = this.props.product.options;

var lineBreak = <br></br>;
if (product.text2.length === 0) {lineBreak = null}

var style = {};

if (product.pics.length === 0) {
    style = {display: "none"}
}


var selection = options.map(function (x){


return (
    <option className="options" key={x.id} value={x.id}>{x.name} {x.price} €</option>
)
})



return (

<div className="product-page-wrapper">

        <div className="product-main-wrapper">

        <div className="product-wrapper2">

        <div className="product-pics">

        <div className="product-pic">
            <img className="the-pic" alt={product.name} src={this.state.picture}></img>
        </div>

        <div onClick={this.changePic} className="small-product-pics">
        <img className="small-product-pic" src={product.pic} alt="Product" style={style}></img>
        {this.state.pictures}

        </div>


        </div>

        <div className="product-info">

            <h1>{product.name}</h1>
            <h2>{this.state.price} €</h2>

            <p className="choice">{product.choice}:</p>
            <label>
            <select value={this.state.selected} onChange={this.handleChange}>
            {selection}
            </select>
            </label>

        <div className="product-quantity-wrap">
        <p className="quantity-number">Kappalemäärä:</p>
        <div className="quantity-button-wrap">
            <button value="-" onClick={this.quantity}>-</button><p className="quantity1234">{this.state.quantity}</p><button value="+" onClick={this.quantity}>+</button>
        </div>
        </div>

        <div className="add-cart">
            <button onClick={this.sendToStore}><img alt="Shopping Cart" src={cartPic}></img>Lisää ostoskoriin</button>
        </div>

        

        <div className="product-text">

            <p>{product.text}</p>
            {lineBreak}
            <p>{product.text2}</p>

         </div>

         

        </div>


        </div>

        <div className="product-line"></div>
        <div className="emptyspace"></div>
        <LogoFooter />
        <div className="emptyspace"></div>
        <SocialFooter />


        </div>
    </div>

)


}

}


const mapStateToProps = (state) => {
    return {
        products: state.products,
        shoppingCart: state.shoppingCart
    }
}

function mapDispatchToProps (dispatch) {
  
    return {
      addProduct: function (arg) {dispatch({
          type: "add",
          product: arg
      })}
      
    }
    
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductOptions);