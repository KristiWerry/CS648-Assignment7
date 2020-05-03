/*
Werry, Kristi
823386935
Assignment #7
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table,
} from 'react-bootstrap';

import graphQLFetch from './graphQLFetch';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';

export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;

    const query = `mutation productUpdate(
      $id: Int!
      $changes: ProductUpdateInputs!
    ) {
      productUpdate(
        id: $id
        changes: $changes
      ) {
        id Category Name Price Image
      }
    }`;
    const { id, ...changes } = product;
    const data = await graphQLFetch(query, { changes, id });
    
    if(data) {
      this.setState({ product: data.productUpdate });
      alert('Update Product Successfully'); // eslint-disable-line no-alert
    }
  }

  async loadData() {
    const query = `query product($id: Int!) {
      product(id: $id) {
        id Category Name Price Image 
      }
    }`;

    const { match: { params: { id } } } = this.props;
    const data = await graphQLFetch(query, { id });
    
    this.setState({ product: data ? data.product : {} });
  }

  render() {
    const { product: { id } } = this.state;
    const { match: { params: {id: propsId } } } = this.props;
    if (id == null) {
      if(propsId != null) {
        return <h3>{`Product with ID ${propsId} not found.`}</h3>
      }
      return null;
    }

    const { product: {Category, Name, Price, Image } } = this.state;
    const prevTooltip = (
      <Tooltip id="close-tooltip" placement="top">Previous Product</Tooltip>
    );
    const nextTooltip = (
      <Tooltip id="close-tooltip" placement="top">Next Product</Tooltip>
    );
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{`Editing product: ${id}`}</h3>
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <TextInput
                  name="Name"
                  value={Name}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr>
            <tr>
              <td>Category:</td>
              <td>
                <select name="Category" value={Category} onChange={this.onChange}>
                  <option value="Shirt">Shirt</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>
                <NumInput
                  name="Price"
                  value={Price}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr>
            <tr>
              <td>Image:</td>
              <td>
                <TextInput
                  name="Image"
                  value={Image}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr>
            <tr>
              <td />
              <td><Button bsStyle="primary" type="submit">Submit</Button></td>
            </tr>
          </tbody>
        </table>
        <LinkContainer to={`/edit/${id - 1}`}>
          <OverlayTrigger delayShow={1000} overlay={prevTooltip}>
            <Button bsSize="xsmall">
              <Glyphicon glyph="chevron-left" />
            </Button>
          </OverlayTrigger>
        </LinkContainer>
        {' '}
        <LinkContainer to={`/edit/${id + 1}`}>
          <OverlayTrigger delayShow={1000} overlay={nextTooltip}>
            <Button bsSize="xsmall">
              <Glyphicon glyph="chevron-right" />
            </Button>
          </OverlayTrigger>
        </LinkContainer>
      </form>
    );
  }
}