import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {ListGroup, ListGroupItem, Panel} from "react-bootstrap";
import _ from 'lodash-es'

class CarsList extends Component {

    componentDidMount() {
    }


    state = {
        selectedCar: {}
    }

    selectCar = (car) => (evt) => {
        this.props.onCarSelect(car)
        this.setState({selectedCar: car})
    }

    render() {
        const carsList = _.sortBy(this.props.cars, ['brand']).map(car =>
            <ListGroupItem
                active={car.id === this.state.selectedCar.id}
                onClick={this.selectCar(car)}
                key={car.id}>
                {car.brand +" " + car.model}
            </ListGroupItem>
        )

        return (
            <div className='cars-list'>
                <Panel >
                    <Panel.Heading>Cars</Panel.Heading>
                    <ListGroup className='scrollable'>
                        {carsList}
                    </ListGroup>
                </Panel>

            </div>
        );
    }
}

CarsList.propTypes = {
    cars: PropTypes.array.isRequired,
    onCarSelect: PropTypes.func.isRequired
};

CarsList.defaultProps = {};


export default CarsList;
