import React, { Component } from "react";

// Redux Imports
import { connect } from "react-redux";
import { addInstance } from "../actions/instanceActions";
import PropTypes from "prop-types";

// Principal layout
import {
  Row,
  Button,
  Col,
  Modal,
  FormControl,
} from "react-bootstrap";

// Components
import InstanceBuilderItem from "./InstanceBuilderItem";

class InstanceContainer extends Component {
  state = {
    selectedModel: '', // Model to build instances from - Select
    modelSelectDialog: false,
  };

  // add instance of the selected model
  addInstance =() => {
    // add instance only if the model has fields
    if (this.state.selectedModel) {
      if (this.getFields(this.state.selectedModel).length) {
        this.props.addInstance(this.state.selectedModel);
        this.toggleSelectModelDialog(); // then close the modal
      } else console.log('Please add fiedls to model');
    }
  }

  toggleSelectModelDialog = () => {
    this.setState({
      modelSelectDialog: !this.state.modelSelectDialog,
      selectedModel: ''
    });
  };

  // Instance Select Input Value
  handleSelectModelInputChange = (e) => {
    this.setState({ selectedModel: e.target.value });
  };

  // return instance model fields
  getFields = (title) => {
    const { models } = this.props.model; // Model Reducer
    const model = models.find((m) => m.title === title);
    if (model) return model.fields;
    // return fields
    else return []; // empty
  };

  render() {
    const { modelSelectDialog } = this.state;
    const { modelTypes } = this.props.modelType; // ModelType Reducer
    const { instances } = this.props.instance; // Instance Reducer

    return (
      <div className="mt-3 mb-3">
        <Button
          size="sm"
          variant="success"
          style={{ marginBottom: "2.1rem" }}
          onClick={this.toggleSelectModelDialog}
        >
          Instancier le model
        </Button>

        <Modal show={modelSelectDialog} onHide={this.toggleSelectModelDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Instancier le modele</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              onChange={this.handleSelectModelInputChange}
              as="select"
              name="typeInput"
              size="sm"
            >
              <option value defaultValue>
                Selectionner le modele
              </option>
              {modelTypes
                .filter((modelType) => !modelType.core)
                .map((modelType) => (
                  <option key={modelType.name} value={modelType.name}>
                    {modelType.name}
                  </option>
                ))}
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button block variant="outline-success" onClick={this.addInstance}>
              Selectionner
            </Button>
          </Modal.Footer>
        </Modal>

        <Row
          className="justify-content-left"
          style={{
            marginTop: "-30px",
            minHeight: "30vh",
            backgroundColor: "#F2F2F2",
            paddingBottom: "10px",
            border: "solid 1px #208838",
          }}
        >
          {instances &&
            instances.map((instance) => (
              <Col key={instance.title} lg="auto" sm="auto" md="auto" xs="auto" className="pt-2">
                <InstanceBuilderItem instance={instance} fields={this.getFields(instance.title)} />
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}

InstanceContainer.protoTypes = {
  addInstance: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired,
  modelType: PropTypes.object.isRequired,
  instance: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  model: state.model,
  modelType: state.modelType,
  instance: state.instance,
});

export default connect(mapStateToProps, {
  addInstance,
})(InstanceContainer);
