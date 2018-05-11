import React, {Component} from 'react';
import {Button, Col, ControlLabel, FormControl, FormGroup, Glyphicon, HelpBlock, Panel, Row,InputGroup} from "react-bootstrap";
import PropTypes from 'prop-types';


class CarForm extends Component {

  
    resetForm = () => {
        let car = this.state.car
        for(let model of Object.keys(car)){
            car[model] = ''
        }
        this.setState({car});
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const {model} = this.state.car

        // Validation - this is very simple
        // Usually external libraries handles validations more easily
        if(model === ''){
            this.setState({modelError: 'Model can not be empty!'})
        } else {
            this.setState({modelError: ''})
        }


        this.props.saveCar(this.state.car)
    }

    removeCar = () => {

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // This is new approach from react 16.3
        // When selected actor changes, set current state to this actor
        // Otherwise do nothing
        if(nextProps.selectedCar === prevState.car) return null;

        return {
            car: nextProps.selectedCar || prevState.car
        }
    }


    constructor(props, context) {
        super(props, context);
        this.state = {
            car : {},
            modelError: null,
        }

    }

    handleUserInput = (e) => {
        // Works fine for text files (like textfield or textarea)
        // In case of radio buttons you need to handle checked property!
        const name = e.target.name;
        const value = e.target.value;

        // Get previos object from state - we can only set root variables!
        let car = this.state.car;
        car[name] = value;

        this.setState({car});
    }

    render() {
        const car = this.state.car;
        return (
            <div>
                <Panel >
                    <Panel.Heading>Car information</Panel.Heading>
                    <Panel.Body>

                        <form
                            onSubmit={this.handleSubmit}>

                            <Row>
                                <Col xs={12}>
                                    <FormGroup >
                                        <ControlLabel>Brand</ControlLabel>
                                        <FormControl type="text" value={car.brand} name="brand" placeholder="Car brand" onChange={this.handleUserInput}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>

                                    <FormGroup validationState={!this.state.modelError ? null : 'error'}>
                                        <ControlLabel>Model</ControlLabel>
                                        <FormControl type="text" value={car.model} name="model" placeholder="Car model" onChange={this.handleUserInput}/>
                                        <FormControl.Feedback/>
                                        <HelpBlock>{this.state.modelError}</HelpBlock>
                                    </FormGroup>
                                </Col>
                               
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Cost</ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>€</InputGroup.Addon>
                                            <FormControl type="number" value={car.cost} name="cost" placeholder="Cost" onChange={this.handleUserInput}/>
                                            <InputGroup.Addon>.000</InputGroup.Addon>
                                        </InputGroup>
                                    </FormGroup>
                                </Col>

                                <Col xs={12}>
                                    <ControlLabel>Engine</ControlLabel>
                                    <FormGroup>
                                        <FormControl componentClass="select" value={car.engineType} name="engineType" onChange={this.handleUserInput}>
                                            <option value="Benzine">Benzine</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="LPG">LPG</option>
                                            <option value="Benzine + LPG">Benzine + LPG</option>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Engine capacity</ControlLabel>
                                        <FormControl type="number" value={car.engineCapacity} name="engineCapacity" step="0.1" placeholder="Engine capacity" onChange={this.handleUserInput}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Production</ControlLabel>
                                        <FormControl type="date" value={car.production} name="production" placeholder="Year of production" onChange={this.handleUserInput}/>
                                    </FormGroup>
                                </Col>  
                            </Row>

                            <Row>
                                <Col xs={4}>
                                    <div className="btn-toolbar">
                                        <Button onClick={this.resetForm}> <Glyphicon glyph="erase"/> Clear form</Button>
                                        <Button bsStyle="danger" onClick={this.props.deleteCar}><Glyphicon
                                            glyph="trash"/> Remove</Button>
                                    </div>
                                </Col>
                                <Col xs={8}>
                                    <div className="pull-right">
                                        <Button bsStyle="primary" type="submit"><Glyphicon className="btnIconText"
                                                                                           glyph="ok"/> Save</Button>
                                    </div>
                                </Col>
                            </Row>


                        </form>

                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

CarForm.propTypes = {
    selectedCar: PropTypes.object,
    saveCar: PropTypes.func.isRequired,
    deleteCar: PropTypes.func.isRequired,
};

CarForm.defaultProps = {

};

export default CarForm;
