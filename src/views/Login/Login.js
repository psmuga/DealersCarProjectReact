import React, {Component} from 'react'
import {Alert, Button, Col, FormControl, FormGroup, Grid, Panel, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import axios, {setToken} from "../../services/axios";

import './Login.css'

class Login extends Component {

    handleUserInput = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;

        this.setState({[name]: value});
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        this.setState({loginEnabled: false});

        axios.post('/auth', null, {
            auth: {
                username: this.state.username.trim(),
                password: this.state.password.trim()
            }})
            .then((response) => {
                setToken(response.data.token)
                this.setState({error: false, loginEnabled: true});
                this.props.history.push('cars')

            })
            .catch((error) => {
                this.setState({error: true, loginEnabled: true});
                setTimeout(() => {
                    this.setState({error: false});
                }, 2000);
            })

    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',

            error: false,
            loginEnabled: true
        }
    }

    render() {

        return (
            <div className="login-root">
                <Grid>
                    <Row>
                        <Col xsOffset={4} xs={4} >
                            <Panel bsStyle="primary">
                                <Panel.Heading><strong>Login</strong></Panel.Heading>
                                <Panel.Body>
                                    <form onSubmit={this.handleSubmit}>

                                        <FormGroup>
                                            <FormControl type="text" placeholder="Username" name="username" onChange={this.handleUserInput}/>

                                            <FormControl type="password" placeholder="Password" name="password"
                                                         onChange={this.handleUserInput}/>

                                            <Button bsSize="large" bsStyle="primary" block type="submit"
                                                    disabled={!this.state.loginEnabled}>Login</Button>
                                        </FormGroup>
                                    </form>
                                </Panel.Body>
                            </Panel>
                            {
                                this.state.error && <Alert className='error-message' bsSize="small" bsStyle="danger">
                                    Wrong username or password
                                </Alert>
                            }
                        </Col>
                    </Row>
                </Grid>
            </div>
        )

    }


}

export default withRouter(Login)