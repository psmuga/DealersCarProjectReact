import React, {Component} from 'react';
import Navigation from "../../components/Navigation/Navigation";
import {Col, Grid, Row} from "react-bootstrap";
import CarsList from "./CarsList";
import CarForm from "./CarForm";
import axiosInstance from "../../services/axios";
import moment from "moment";
import {withRouter} from "react-router-dom";

class Actors extends Component {

    state = {
        carsList: [],
        selectedCar: {
            id: "",
            model: "",
            brand: "",
            vin: "",
            production: "",
            engineType: "",
            engineCapacity:"",
            seats:"",
            cost:""
        }
    }

    getCars = () => {
        axiosInstance.get('/cars')
            .then((response) => {
                this.setState({carsList: response.data});
            })
            .catch((error) => {
                // handle errors - i.e notifications
            })
    }

    handleSelectCar = (car) => {
        axiosInstance.get(`/cars/${car.id}`)
            .then((response) => {
                let car = response.data;
                car.production = moment(new Date(car.production)).format('YYYY-MM-DD');  // Convert ISO-DATE to Date() to HTML date representation
                this.setState({selectedCar: car});
            })
            .catch((error) => {

            })


    }

    handleDeleteCar = () => {
        let car = this.state.selectedCar
        axiosInstance.delete(`/cars/${car.id}`)
            .then((response) => {
                this.getCars()
            })
    }

    handleSaveCar = (car) => {
        if(car.id){
            // actor exists -> edit
            axiosInstance.put(`/cars/${car.id}`, car)
                .then((response) => {
                    // We don't need to call this here, just  edit an state - ID is the same
                    this.getCars()
                })
                .catch((error) => {
                    this.navigateToLogin()
                })
        } else {
            // create new
            axiosInstance.post('/cars', car)
                .then((response) => {
                    this.getCars()
                })
                .catch((error) => {
                    this.navigateToLogin()
                })
        }
    }

    navigateToLogin = () => {
        this.props.history.push('/')
    }

    constructor(props, context) {
        super(props, context);
        this.getCars()
    }


    render() {
        return (
            <div>
                <Navigation/>
                    <Grid >
                        <Row>
                            <Col sm={4}>
                                <CarsList cars={this.state.carsList} onCarSelect={this.handleSelectCar}/>
                            </Col>
                            <Col sm={8}>
                                <CarForm deleteCar={this.handleDeleteCar} saveCar={this.handleSaveCar } selectedCar={this.state.selectedCar}/>
                            </Col>
                        </Row>
                    </Grid>
            </div>
        );
    }
}

Actors.propTypes = {};
Actors.defaultProps = {};

export default withRouter(Actors);
