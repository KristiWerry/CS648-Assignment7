/*
Werry, Kristi
823386935
Assignment #6
*/

import React from 'react';
import { Link } from 'react-router-dom';

import graphQLFetch from './graphQLFetch';

export default class ProductImage extends React.Component {
    constructor() {
      super();
      this.state = {
        product: {},
      };
    }
  
    componentDidMount() {
      this.loadData();
    }
  
    async loadData() {
      const query = `query product($id: Int!) {
        product(id: $id) {
          id Category Name Price Image 
        }
      }`;
  
      const { match: { params: { id } } } = this.props;
      const data = await graphQLFetch(query, { id });
      if(data) {
        const { product } = data;
        //make sure the product name and image are not null
        product.Name = product.Name != null ? product.Name.toString() : '';
        product.Image = product.Image != null ? product.Image.toString() : '';
        this.setState({ product });
      } else {
        this.setState({ product: {} });
      }
    }
  
    render() {
      const { product: { id } } = this.state;
      const { match: { params: {id: propsId } } } = this.props;
      if (id == null) {
        if(propsId != null) {
          return <h3>{`Product with ID ${propsId} loading.`}</h3>
        }
        return null;
      }
  
      const { product: {Category, Name, Price, Image } } = this.state;

      if(Image == '') { //If the image does not exist
          return <h3>{`Product with ID ${propsId} has no image.`}</h3>
      }
      else { //if the image string is there
        return (
            <form>
            <img src={Image} alt={Name}></img>
        </form>        
        );
      }
    }
  }