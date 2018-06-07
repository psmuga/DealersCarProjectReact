import React, {Component} from 'react';
import {Button, Col, ControlLabel, FormControl, FormGroup, Glyphicon, HelpBlock, Panel, Row,ListGroup,ListGroupItem} from "react-bootstrap";
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class DealerForm extends Component {

  
    resetForm = () => {
        let dealer = this.state.dealer
        for(let model of Object.keys(dealer)){
            dealer[model] = ''
        }
        this.setState({dealer});
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const {model} = this.state.dealer

        // Validation - this is very simple
        // Usually external libraries handles validations more easily
        if(model === ''){
            this.setState({modelError: 'Name can not be empty!'})
        } else {
            this.setState({modelError: ''})
        }


        this.props.saveDealer(this.state.dealer)
    }

    removeDealer = () => {

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // This is new approach from react 16.3
        // When selected actor changes, set current state to this actor
        // Otherwise do nothing
        if(nextProps.selectedDealer === prevState.dealer) return null;

        return {
            listOfCars: nextProps.cars,
            dealer: nextProps.selectedDealer || prevState.dealer
        }
    }


    constructor(props, context) {
        super(props, context);
        this.state = {
            dealer : {},
            listOfCars: [],
            hasCar: false,
            modelError: null
        }
    }


    handleUserInput = (e) => {
        // Works fine for text files (like textfield or textarea)
        // In case of radio buttons you need to handle checked property!
        const name = e.target.name;
        const value = e.target.value;

        // Get previos object from state - we can only set root variables!
        let dealer = this.state.dealer;
        dealer[name] = value;

        this.setState({dealer});
    }
    handleChange = (event, index, values) => {
        let dealer = this.state.dealer;
        dealer.cars = values;
        console.log(values);
        this.setState({dealer})
    
    };

    selectionRenderer = (cars) => {
      switch (cars.length) {
        case 0:
          return '';
        case 1:
          return "one car selected";
        default:
          return `${cars.length} cars selected`;
      }
    }
  
    menuItems(cars) {
      return cars==null?"":cars.map((car) => (
        <MenuItem
          key={car.id}
          insetChildren={true}
          checked={this.state.listOfCars.indexOf(car.id) > -1}
          value={car}
          primaryText={car.brand + ' ' + car.model }
        />
      ));
    }
  
    render() {
        const listCarsItems = this.state.dealer.cars.length > 0? (this.state.dealer.cars.map((car)=>{
            return <ListGroupItem key={car.id} href="#">{car.brand} {car.model}</ListGroupItem>
                                   
        })):("")
        const carsView = this.state.dealer.cars.length <=0? (
          "" 
        ):(
            <Row>
                <Col xs={12}>
                <FormGroup >
                    <ControlLabel>Cars</ControlLabel>
                    
                    <ListGroup>
                        {listCarsItems}
                    </ListGroup>
                </FormGroup>
                </Col>
            </Row>
        );



        const dealer = this.state.dealer;
        return (
            <div>
                <Panel >
                    <Panel.Heading>Dealer information</Panel.Heading>
                    <Panel.Body>

                        <form
                            onSubmit={this.handleSubmit}>

                            <Row>
                                <Col xs={12}>
                                    <FormGroup validationState={!this.state.modelError ? null : 'error'}>
                                        <ControlLabel>Name</ControlLabel>
                                        <FormControl type="text" value={dealer.name} name="name" placeholder="Name" onChange={this.handleUserInput}/>
                                        <FormControl.Feedback/>
                                        <HelpBlock>{this.state.modelError}</HelpBlock>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup >
                                        <ControlLabel>Owner</ControlLabel>
                                        <FormControl type="text" value={dealer.owner} name="owner" placeholder="Owner" onChange={this.handleUserInput}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <ControlLabel>Add cars</ControlLabel>
                                    <SelectField
                                        multiple={true}
                                        fullWidth={true}
                                        hintText="Select a car"
                                        value={this.state.dealer.cars}
                                        onChange={this.handleChange}
                                        input={this.state.dealer.cars}
                                        selectionRenderer={this.selectionRenderer}
                                    >
                                        {this.menuItems(this.state.listOfCars)}
                                    </SelectField>      
                                </Col>
                            </Row>
                            {carsView}
                            <Row>
                                <Col xs={4}>
                                    <div className="btn-toolbar">
                                        <Button onClick={this.resetForm}> <Glyphicon glyph="erase"/> Clear form</Button>
                                        <Button bsStyle="danger" onClick={this.props.deleteDealer}><Glyphicon
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

DealerForm.propTypes = {
    selectedDealer: PropTypes.object,
    saveDealer: PropTypes.func.isRequired,
    deleteDealer: PropTypes.func.isRequired,
};

DealerForm.defaultProps = {

};

export default DealerForm;
