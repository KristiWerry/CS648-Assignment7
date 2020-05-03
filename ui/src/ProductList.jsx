/*
Werry, Kristi
823386935
Assignment #7
*/

import React from 'react';
import { Panel } from 'react-bootstrap';

import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    this.loadCount();
    const query = `query {
      productList {
        id Category Name Price Image 
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ products: data.productList });
    }
  }

  async loadCount() {
    const query = `query {
      productCount
    }`;
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ count: data.productCount });
    }
  }

  async createProduct(product) {
    const query = `mutation productAdd($product: ProductInputs!) {
      productAdd(product: $product) {
        id Category Name Price
      }
    }`;
    const data = await graphQLFetch(query, { product });
    if (data) {
      this.loadData();
      this.loadCount();
    }
  }

  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { products } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = products[index];
    const data = await graphQLFetch(query, { id });
    if (data && data.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        if(pathname === `/products/${id}`) {
          history.push({pathname: '/products', search });
        }
        newList.splice(index, 1);
        return { products: newList };
      });
    } else {
      this.loadData();
    }
    this.loadCount();
  }

  render() {
    const { products, count } = this.state;
    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title>Product List</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <h3>The list contains { count } products</h3>
            <br />
            <ProductTable products={products} deleteProduct={this.deleteProduct}/>
          </Panel.Body>
        </Panel>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Add Product</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ProductAdd createProduct={this.createProduct} />
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }
}
