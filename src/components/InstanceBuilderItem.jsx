import React, { Component } from 'react';

// Redux Imports
import { connect } from 'react-redux';
import { addInstanceItem, buildInstance } from "../actions/instanceActions";
import PropTypes from 'prop-types';

import {
  Table,
  Card,
  Badge,
  Modal,
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
} from "react-bootstrap";

class ModelBuilderItem extends Component {
  state = {
    itemAddDialog: false,
    itemInputs: {},
    typeInput: null,
  };

  toggleItemAddDialog = () => {
    // prepares states values to handles items inputs form change
    const inputs = {}
    const { fields } = this.props;
    fields.map((f) => {
      inputs[f.field] = '' // f.type.name.toUpperCase() // reset fields
    })

    this.setState({
      itemAddDialog: !this.state.itemAddDialog,
      itemInputs: inputs, // Reset modal input fields
      typeInput: null,
    });
  };

  // Build instance use to Create Item with submited values
  handleSubmit = (e) => {
    e.preventDefault(); // prevent form submit default action
    // create instance item
    const { instance, fields } = this.props;
    const itemValues = this.state.inputs;

    const instanceItem = new instance.build(fields);
    console.log(" INSTANCE ", instanceItem);
    console.log("Values", itemValues);

    let invalidInputs = false;

    fields.map((f) => {
      // map fields with values
      if(itemValues[f.field]) instanceItem[f.field] = itemValues[f.field];
      else invalidInputs = true;
    });

    if (!invalidInputs) {
      console.log("created item ", instanceItem);

      this.props.addInstanceItem({
        title: instance.title,
        item: instanceItem,
      });

      this.toggleItemAddDialog(); // then close the modal
    }
  };

  handleChange = (e) => {
    this.setState({ 
      inputs: { ...this.state.inputs, [e.target.name]: e.target.value }
    });
    console.log(e.target.name + ' input changed', e.target.value);
  };

  render() {
    const { itemAddDialog } = this.state;
    const { instance, fields } = this.props;

    // Map fields to value items 
    let entriesRow = []; // entries to display
    instance.items.length && instance.items.map((item) => {
      const entryRow = (
        <tr key={item._id}>
          {fields.map((f, i) => (
            <td key={i}>
              {item.hasOwnProperty(f.field)
                ? item[f.field]
                : <i>{`[${f.type.name}]`}</i>}
            </td>
          ))}
        </tr>
      );
      entriesRow.push(entryRow);
    });
    return (
      <div>
        <h5>
          <Badge variant="secondary" className="mr-auto ml-auto mb-1">
            <small>{instance.title}</small>
          </Badge>
        </h5>
        <Card border="secondary" style={{ minWidth: "200px" }}>
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                {fields &&
                  fields.map((fieldItem) => (
                    <th key={fieldItem.field}>
                      <small>
                        <b>{fieldItem.field}</b>
                      </small>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>{entriesRow}</tbody>
          </Table>

          <Button
            variant="outline-success"
            className="ml-auto mr-1 mb-1"
            style={{ marginTop: "-12px" }}
            size="sm"
            onClick={this.toggleItemAddDialog}
          >
            +
          </Button>

          <Modal show={itemAddDialog} onHide={this.toggleItemAddDialog}>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                  {fields &&
                    fields.map((fieldItem) => (
                      <FormGroup as={Col} md="6" key={fieldItem.field}>
                        <Form.Label>{fieldItem.field}</Form.Label>
                        <FormControl
                          onChange={this.handleChange}
                          className="form-control form-control-sm"
                          type="text"
                          name={fieldItem.field}
                          placeholder={`Entrer ${fieldItem.field.toLowerCase()}`}
                        />
                      </FormGroup>
                    ))}
                </Form.Row>
                <Form.Row>
                  <Button
                    size="sm"
                    variant="success"
                    className="ml-auto mr-2"
                    type="submit"
                  >
                    Creer
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={this.toggleItemAddDialog}
                  >
                    Annuler
                  </Button>
                </Form.Row>
              </Form>
            </Modal.Body>
          </Modal>
        </Card>
      </div>
    );
  }
}


ModelBuilderItem.protoTypes = {
  instance: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  addInstanceItem: PropTypes.func.isRequired,
  buildInstance: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({}); // no need here

export default connect(mapStateToProps, {
  addInstanceItem,
  buildInstance,
})(ModelBuilderItem);	