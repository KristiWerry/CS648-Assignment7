/*
Werry, Kristi
823386935
Assignment #7
*/

import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
  Button, ButtonToolbar, Tooltip, OverlayTrigger,
} from 'react-bootstrap';

import graphQLFetch from './graphQLFetch.js';
import Toast from './Toast.jsx';

class ProductAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.productAddNav;
    const price = form.price.value.replace('$', '');
    const product = {
        Name: form.name.value,
        Price: price,
        Category: form.category.value,
        Image: form.image.value,
    };
    const query = `mutation productAdd($product: ProductInputs!) {
        productAdd(product: $product) {
          id
        }
    }`;

    const data = await graphQLFetch(query, { product }, this.showError);
    if (data) {
      const { history } = this.props;
      history.push(`/edit/${data.productAdd.id}`);
    }
  }

  render() {
    const { showing } = this.state;
    const { toastVisible, toastMessage, toastType } = this.state;
    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>
          <OverlayTrigger
            placement="left"
            delayShow={1000}
            overlay={<Tooltip id="create-product">Create Product</Tooltip>}
          >
            <Glyphicon glyph="plus" />
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="productAddNav">
                <FormGroup>
				    <ControlLabel>Category</ControlLabel>
					<FormControl
						componentClass="select"
                        name="category"
                        id="category"
					>
					<option defaultValue="Shirts">Shirts</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Jackets">Jackets</option>                        
                    <option value="Sweaters">Sweaters</option>
                    <option value="Accessories">Accessories</option>
					</FormControl>
				</FormGroup>
              <FormGroup>
                <ControlLabel>Product Name</ControlLabel>
                <FormControl name="name" id="name" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Price Per Unit</ControlLabel>
                <FormControl name="price" id="price" defaultValue="$" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Image URL</ControlLabel>
                <FormControl name="image" id="image"/>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                type="button"
                bsStyle="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </React.Fragment>
    );
  }
}

export default withRouter(ProductAddNavItem);