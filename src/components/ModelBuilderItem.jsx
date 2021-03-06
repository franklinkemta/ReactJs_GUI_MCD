import React, { Component } from 'react';

// Redux Imports
import { connect } from 'react-redux';
import { addModelField, deleteModel } from "../actions/modelActions";
import { deleteModelType } from "../actions/modelTypeActions";
import { deleteInstance } from "../actions/instanceActions";
import PropTypes from 'prop-types';

import {
  Table,
  Card,
  Toast,
  Modal,
  Button,
  Form,
  FormGroup,
  FormControl, 
  Col
} from "react-bootstrap";

class ModelBuilderItem extends Component {
  state = {
    fieldAddDialog: false,
    fieldInput: '',
    typeInput: null,
  };

  toggleFieldAddDialog = () => {
    this.setState({
      fieldAddDialog: !this.state.fieldAddDialog,
      fieldInput: '', // Reset modal input fields
      typeInput: null
    });
  };
  

  handleFieldInputChange = (e) => {
    this.setState({ fieldInput: e.target.value });
  };

  handleTypeInputChange = (e) => {
    this.setState({ typeInput: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault(); // prevent form submit default action
    if (this.state.fieldInput && this.state.typeInput !== null) {

      const fieldType = this.props.fieldTypes.find((type) => type.name === this.state.typeInput )

      this.props.addModelField({
        // ADD_MODEL_FIELD
        title: this.props.title,
        newField: {
          field: this.state.fieldInput, // Field name
          type: fieldType, // Model Type Name
        },
      });
      this.toggleFieldAddDialog();
    }
  }

  // Delete Model Close Button
  deleteModel = () => {
    this.props.deleteModel(this.props.title); // delete model
    this.props.deleteModelType(this.props.title); // delete model
    this.props.deleteInstance(this.props.title); // delete instance
  };

  render() {
    const { fieldAddDialog } = this.state;
    const { title, fields, fieldTypes } = this.props;

    return (
      <div>
        <Card border="secondary" style={{ minWidth: "200px" }}>
          <Toast onClose={this.deleteModel} style={{ width: "100%" }}>
            <Toast.Header>
              <small>
                <b>Title</b>
              </small>
              <small className="ml-auto">{title}</small>
            </Toast.Header>
          </Toast>

          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>
                  <small>
                    <b>Field</b>
                  </small>
                </th>
                <th>
                  <small>
                    <b>Type</b>
                  </small>
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((fieldItem) => (
                <tr key={fieldItem.field}>
                  <td>{fieldItem.field}</td>
                  <td>{fieldItem.type.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button
            variant="outline-success"
            className="ml-auto mr-1 mb-1"
            style={{ marginTop: "-12px" }}
            size="sm"
            onClick={this.toggleFieldAddDialog}
          >
            +
          </Button>

          <Modal show={fieldAddDialog} onHide={this.toggleFieldAddDialog}>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                  <FormGroup as={Col} md="6">
                    <FormControl
                      onChange={this.handleFieldInputChange}
                      className="form-control form-control-sm"
                      type="text"
                      name="fieldInput"
                      placeholder="Enter field name"
                    />
                  </FormGroup>
                  <FormGroup as={Col} md="6">
                    <FormControl
                      onChange={this.handleTypeInputChange}
                      as="select"
                      name="typeInput"
                      size="sm"
                    >
                      <option value defaultValue>
                        Select Type
                      </option>
                      {fieldTypes.map((fieldType) => (
                        <option key={fieldType.name} value={fieldType.name}>
                          {fieldType.name}
                        </option>
                      ))}
                    </FormControl>
                  </FormGroup>
                </Form.Row>
                <Form.Row>
                  <Button
                    size="sm"
                    variant="success"
                    className="ml-auto mr-2"
                    type="submit"
                  >
                    Ajouter
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={this.toggleFieldAddDialog}
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
  title: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  fieldTypes: PropTypes.array.isRequired,
  addModelField: PropTypes.func.isRequired,
  deleteModel: PropTypes.func.isRequired,
  deleteModelType: PropTypes.func.isRequired,
  deleteInstance: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({}); // no need here

export default connect(mapStateToProps, {
  addModelField,
  deleteModel,
  deleteModelType,
  deleteInstance,
})(ModelBuilderItem);	