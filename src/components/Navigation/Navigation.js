import React, {Component, Fragment} from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {withRouter} from "react-router";

class Navigation extends Component {

    logout = () => {
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect>
                    <Navbar.Header >
                        <Navbar.Brand>
                            <span>React Dealer Database</span>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown eventKey={1} title="Databases" id="database-nav">
                                <MenuItem eventKey={1.1} href="/cars">Cars</MenuItem>
                            </NavDropdown>
                        </Nav>


                        <Nav pullRight>
                            <NavDropdown eventKey={2} title={<Fragment><Glyphicon glyph="user"/> Profile</Fragment>}
                                         id="profile-nav">
                                <MenuItem eventKey={2.1} onClick={() => this.logout()}>Logout</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )

    }
}


Navigation.propTypes = {};
Navigation.defaultProps = {};

export default withRouter(Navigation); // https://reactjs.org/docs/higher-order-components.html
