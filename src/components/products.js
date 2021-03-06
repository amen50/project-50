import React, { Component } from 'react';
import formatCurrancy from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom'
import { connect } from 'react-redux';
import {fetchProducts} from '../actions/productAction'

class Products extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
          product:null,
        };

    } 
    componentDidMount(){
        this.props.fetchProducts()
    }
    openModal = (product) => {
        this.setState({product});
    }
    closeModal =() =>{
        this.setState({product:null});
    }
    render() {
        const {product} = this.state;
        return (
            <div>
                <Fade bottom cascade={true}>
                    {
                        !this.props.products ?
                        (<div>Loading... .</div> ):
                        (<ul className="products">
                        {this.props.products.map((product)=>(
                            <li key={product._id}>
                                <div className="products">
                                    <a href={"#"+ product._id} onClick={()=>this.openModal(product) }>
                                        <img src={product.image} alt={product.titel}></img>
                                        <p>{product.title}</p>
       
                                    </a>
                                
                                <div className="prodct-price">
                                    <div>{formatCurrancy(product.price)}
                                    {"  "}
                                     <span><button onClick={()=>this.props.addToCart(product)} className="button primary">Add to Cart</button></span>
                                    </div>
                                </div>
                                   </div>
                            </li>
       
                        ))}   
                       </ul>)
                    }
                
                </Fade>
                {product && (
                <Modal isOpen={true}
                onRequestClose={this.closeModal}
                >
                   <Zoom>
                  <button className="close_modal" 
                  onClick={this.closeModal}>x</button> 
                   <div className="product-details">
                       <img src={product.image} alt={product.title}></img>
                     <div className="product-details-description">
                         <p>
                             <strong>{product.title}</strong>
                         </p>
                         <p>
                             {product.description}
                          </p>
                          <p>
                           Avaiable Sizes:{" "}
                           {product.availableSizes.map(x=>(
                              <span>{" "}
                            <button className="button">{x}</button>  
                              </span>
                              ))}   
                         </p> 
                      <div className="product-price">
                        <div>
                              {formatCurrancy(product.price)}
                              </div>
                              <button className="button primary" onClick={()=>{
                                    this.props.addToCart(product);
                                    this.closeModal() }}>Add To cart{""}</button>
                                    
                                   
                   </div>
                   </div>
                   </div>
                    </Zoom> 
                </Modal>

                )}
            </div>
        )
    }
}

export default connect((state)=>({products: state.products.items}),
    {fetchProducts,
    }) 
    (Products);