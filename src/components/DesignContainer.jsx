import React, { Component } from 'react';

// Redux Imports
import { connect } from 'react-redux';
import { getModels, addModel } from '../actions/modelActions';
import { getModelTypes, addModelType } from '../actions/modelTypeActions';
import PropTypes from 'prop-types';

// Principal layout
import {
  Container, 
  Row,
  Button, 
  Col, 
  Modal,
  FormControl
  } from 'react-bootstrap';

// Components
import ModelBuilderItem from './ModelBuilderItem';

class DesignContainer extends Component {

  state = {
    titleInputValue: '',
    modelAddDialog: false,
  };

  componentDidMount() {
    this.props.getModels(); // Refresh models list
    this.props.getModelTypes(); // Refresh modelTypes list
  }

  // Create new Model
  createModel = async () => {
    if (this.state.titleInputValue) {
      const { modelTypes } = this.props.modelType;

      // check if the ModelType already exist before creating it.
      const modelTypeAlreadyExist = modelTypes.some((modelType) => modelType.type === this.state.titleInputValue);
      
      if (!modelTypeAlreadyExist) {
        const createdModel = await this.props.addModel(this.state.titleInputValue); // need a promise later 
        console.log('created model', createdModel);
        // if the model was created successfuly use it as a new ModelType
        this.props.addModelType({
          core: false,
          name: createdModel.title,
          modelId: createdModel._id,
        }); // wait the promise

        this.toggleModalAddDialog(); // then close the modal
      }
    }
  };

  toggleModalAddDialog = () => {
    this.setState({
      modelAddDialog: !this.state.modelAddDialog,
    });
  };

  // Model Title Input Value
  handleModelTitleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { modelAddDialog } = this.state;
    const { models } = this.props.model; // Model Reducer
    const { modelTypes } = this.props.modelType; // ModelType Reducer

    return (
      <div className="mt-1">
        <Button
          size="sm"
          variant="success"
          style={{ marginBottom: "2.1rem" }}
          onClick={this.toggleModalAddDialog}
        >
          Ajouter un modele
        </Button>

        <Modal show={modelAddDialog} onHide={this.toggleModalAddDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un Modele</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              onChange={this.handleModelTitleInputChange}
              name="titleInputValue"
              placeholder="Saisir le nom du modele"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button block variant="outline-success" onClick={this.createModel}>
              Creer le modele
            </Button>
          </Modal.Footer>
        </Modal>

        <Container>
          <Row
            className="justify-content-left"
            style={{
              marginTop: "-30px",
              minHeight: "30vh",
              backgroundColor: "#F2F2F2",
              paddingBottom: "10px",
              border: "solid 1px grey",
            }}
          >
            {models.map(({ _id, title, fields }) => (
              <Col key={_id} className="col-3 pt-2">
                <ModelBuilderItem
                  _id={_id}
                  title={title}
                  fields={fields}
                  fieldTypes={modelTypes}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

DesignContainer.protoTypes = {
  getModels: PropTypes.func.isRequired,
  getModelTypes: PropTypes.func.isRequired,
  addModel: PropTypes.func.isRequired,
  addModelType: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired,
  modelType: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  model: state.model,
  modelType: state.modelType
});

export default connect(mapStateToProps, {
  getModels,
  getModelTypes,
  addModel,
  addModelType,
})(DesignContainer);	
