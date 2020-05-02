/*
Werry, Kristi
823386935
Assignment #6
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default class ProductAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.productAdd;
      const price = form.price.value.replace('$', '');
  
      const product = {
        Name: form.name.value,
        Price: price,
        Category: form.category.value,
        Image: form.image.value,
      };
      const { createProduct } = this.props;
      createProduct(product);
      form.name.value = '';
      form.price.value = '$';
      form.category.value = 'Shirts';
      form.image.value = '';
    }
  
    render() {
      return (
        <form name="productAdd" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="column">
            <h2>Category</h2>
            <select name="category">
              <option defaultValue="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Jackets">Jackets</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Accessories">Accessories</option>
            </select>
            <h2>Product Name</h2>
            <input type="text" name="name" placeholder="Name" />
          </div>
          <div className="column">
            <h2>Price Per Unit</h2>
            <input type="text" name="price" defaultValue="$" />
            <h2>Image URL</h2>
            <input type="text" name="image" placeholder="Image Url" />
          </div>
        </div>
        <Button bsStyle="primary" type="submit">Add Product</Button>
      </form>
      );
    }
  }
  
  
  ProductAdd.propTypes = {
    createProduct: PropTypes.func.isRequired,
  };