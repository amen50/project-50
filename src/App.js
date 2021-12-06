import React from "react";
import data from "./data.json";
import Products from "./components/products";
import Filter from "./components/filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort:"",
      cartItems: [],
    }
  }
  addToCart =(product) =>{
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item=>{
      if(item._id === product.id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart){
      cartItems.push({...product, count: 1});
    }
     this.setState({cartItems});
  };
  sortProducts = (event) => {
    console.log(event.target.value);
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
      .slice()
        .sort((a,b) =>
          sort==="lowest"
          ? a.price > b.price 
             ? 1
             :-1
          :sort==="highest"
          ?a.price <  b.price 
            ? 1:
            -1
          : a._id > b._id 
             ? 1 : 
             -1
      )

  }));
  }
  filterProduct = (event) => {
    console.log(event.target.value);
    if(event.target.value ===" "){
      this.setState({size:event.target.value, products: data.products});
    }
    else {
      
      this.setState({
      size: event.target.value,
      products: data.products.filter(product => product.availableSizes.indexOf(event.target.value)>= 0)

    })}
  }
  render()
  {
    return (
    <div className="grid-container">
      <header>
         <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProduct}
              sortProducts={this.sortProducts}>
            </Filter>
            <Products products={this.state.products}
            addToCart={this.addToCart}
            ></Products>
            </div>
          <div className="sidebar">
            <Cart cartItems={this.state.cartItems}/>
            </div>
        </div>
      </main>
      <footer>
        all right are reiseved
      </footer>
    </div>
  );
}
}
export default App;
