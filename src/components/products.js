import React, { Component } from 'react'
import formatCurrancy from '../util'

export default class Products extends Component {
    render() {
        return (
            <div>
               <ul className="products">
                 {this.props.products.map(product=>(
                     <li key={product._id}>
                         <div className="products">
                             <a href={"#"+ product._id}>
                                 <img src={product.image} alt={product.titel}></img>
                                 <p>{product.titel}</p>

                             </a>
                         </div>
                         <div className="prodct-price">
                             <div>{formatCurrancy(product.price)}</div>
                             <button className="button primary">Add to Cart</button>
                         </div>

                     </li>

                 ))}   
                </ul> 

            </div>
        )
    }
}
