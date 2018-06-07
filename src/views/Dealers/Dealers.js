import React, {Component} from 'react';
import Navigation from "../../components/Navigation/Navigation";
import {Col, Grid, Row} from "react-bootstrap";
import DealersList from "./DealersList";
import DealerForm from "./DealerForm";
import axiosInstance from "../../services/axios";
import {withRouter} from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class Dealers extends Component {

    state = {
        dealersList: [],
        carsList:[],
        selectedDealer: {
            id: "",
            name:"",
            owner:"",
            cars:[]
        }
    }

    getDealers = () => {
        axiosInstance.get('/dealers')
            .then((response) => {
                this.setState({dealersList: response.data});
            })
            .catch((error) => {
                // handle errors - i.e notifications
            })
        axiosInstance.get('/cars')
            .then((response) => {
                this.setState({carsList: response.data});
            })
            .catch((error) => {
                // handle errors - i.e notifications
            })
    }

    handleSelectDealer = (dealer) => {
        axiosInstance.get(`/dealers/${dealer.id}`)
            .then((response) => {
                let dealer = response.data;
                // dealer.production = moment(new Date(dealer.production)).format('YYYY-MM-DD');  // Convert ISO-DATE to Date() to HTML date representation
                this.setState({selectedDealer: dealer});
            })
            .catch((error) => {

            })


    }

    handleDeleteDealer = () => {
        let dealer = this.state.selectedDealer
        axiosInstance.delete(`/dealers/${dealer.id}`)
            .then((response) => {
                this.getDealers()
            })
    }

    handleSaveDealer = (dealer) => {
        if(dealer.id){
            // actor exists -> edit
            axiosInstance.put(`/dealers/${dealer.id}`, dealer)
                .then((response) => {
                    // We don't need to call this here, just  edit an state - ID is the same
                    this.getDealers()
                })
                .catch((error) => {
                    this.navigateToLogin()
                })
        } else {
            // create new
            axiosInstance.post('/dealers', dealer)
                .then((response) => {
                    this.getDealers()
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
        this.getDealers()
    }


    render() {
        return (
            <div>
                <Navigation/>
                    <Grid >
                        <Row>
                            <Col sm={4}>
                                <DealersList dealers={this.state.dealersList} onDealerSelect={this.handleSelectDealer}/>
                            </Col>
                            <Col sm={8}>
                            <MuiThemeProvider>
                                <DealerForm deleteDealer={this.handleDeleteDealer} saveDealer={this.handleSaveDealer } selectedDealer={this.state.selectedDealer} cars={this.state.carsList}/>
                                </MuiThemeProvider>
                            </Col>
                        </Row>
                    </Grid>
            </div>
        );
    }
}

Dealers.propTypes = {};
Dealers.defaultProps = {};

export default withRouter(Dealers);
